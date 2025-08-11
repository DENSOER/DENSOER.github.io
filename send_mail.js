document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const btnSend = document.getElementById('btn-send');
  const captchaCheckbox = document.getElementById('captcha-checkbox');
  const captchaLabel = document.getElementById('captcha-label');

  // campos obligatorios: ahora TODOS
  const nombre = document.getElementById('nombre');
  const entidad = document.getElementById('entidad');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const asunto = document.getElementById('asunto');

  if (!form || !btnSend || !captchaCheckbox || !captchaLabel || !nombre || !entidad || !email || !phone || !asunto) {
    console.error('Faltan elementos del formulario. Revisa los IDs.');
    return;
  }

  // Toast (igual)
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.textContent = message;
    Object.assign(toast.style, {
      position: 'fixed', top: '1rem', left: '50%',
      transform: 'translateX(-50%)',
      padding: '0.75rem 1rem', borderRadius: '4px', fontSize: '0.9rem',
      color: '#fff', opacity: '0', transition: 'opacity 0.3s ease, transform 0.3s ease',
      zIndex: '9999', pointerEvents: 'none',
      background: type === 'success' ? '#4caf50' : '#f44336'
    });
    document.body.appendChild(toast);
    requestAnimationFrame(() => { toast.style.opacity = '1'; toast.style.transform = 'translateX(-50%) translateY(0)'; });
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(-10px)';
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, 3000);
  }

  // helpers para marcas visuales en el wrapper .form-group
  function wrap(el) {
    return el.closest('.form-group') || el.parentElement;
  }
  function markError(el) {
    const w = wrap(el);
    if (!w) return;
    w.classList.add('field-error');
    w.classList.remove('field-valid');
  }
  function markValid(el) {
    const w = wrap(el);
    if (!w) return;
    w.classList.remove('field-error');
    w.classList.add('field-valid');
  }
  function clearMark(el) {
    const w = wrap(el);
    if (!w) return;
    w.classList.remove('field-error', 'field-valid');
  }

  // validación individual: retorna true si válido
  function validateField(el) {
    const v = el.value.trim();
    if (el.type === 'email') {
      // usa valididad nativa si está disponible
      if (v === '' || !el.checkValidity()) return false;
      return true;
    }
    return v.length > 0;
  }

  // valida todos los campos, retorna array de elementos faltantes
  function validateAllFields() {
    const fields = [nombre, entidad, email, phone, asunto];
    const missing = [];
    fields.forEach(f => {
      if (!validateField(f)) {
        missing.push(f);
        markError(f);
      } else {
        markValid(f);
      }
    });
    return missing;
  }

  // Quitar error cuando el usuario escribe
  [nombre, entidad, email, phone, asunto].forEach(inp => {
    inp.addEventListener('input', () => {
      if (validateField(inp)) markValid(inp);
      else {
        // si está vacío lo ponemos como no marcado (pero no necesariamente error hasta que intenten marcar captcha)
        clearMark(inp);
      }
      updateSubmitState();
    });
    // quitar clase error solo cuando el usuario empiece a escribir
    inp.addEventListener('input', () => {
      if (validateField(inp)) {
        markValid(inp);
      } else {
        clearMark(inp); // quita colores si está vacío
      }
      updateSubmitState();
    });
  });

  // Estado inicial
  btnSend.disabled = true;
  captchaLabel.classList.toggle('checked', captchaCheckbox.checked);

  // Actualiza estado del botón
  function updateSubmitState() {
    // todos deben ser válidos y captcha marcado
    const allValid = [nombre, entidad, email, phone, asunto].every(validateField);
    btnSend.disabled = !(captchaCheckbox.checked && allValid);
  }

  // Manejo del click en la label:
  // prevenimos el toggle nativo (evitamos for/default) y validamos primero.
  captchaLabel.addEventListener('click', (e) => {
    e.preventDefault(); // impedir que el checkbox se altere por el for/label automáticamente
    const missing = validateAllFields();
    if (missing.length > 0) {
      // construye lista de nombres de campos faltantes
      const names = missing.map(f => {
        switch (f.id) {
          case 'nombre': return 'Nombre';
          case 'entidad': return 'Empresa / Notaría / Entidad';
          case 'email': return 'Correo';
          case 'phone': return 'Teléfono/WhatsApp';
          case 'asunto': return 'Asunto';
          default: return f.name || f.id;
        }
      });
      showToast('Faltan campos: ' + names.join(', '), 'error');
      // enfocar el primer faltante
      missing[0].focus();
      // no permitimos marcar el captcha
      captchaCheckbox.checked = false;
      captchaLabel.classList.remove('checked');
      updateSubmitState();
      return;
    }

    // si todo OK, toggleamos manualmente el checkbox y disparamos change
    captchaCheckbox.checked = !captchaCheckbox.checked;
    captchaCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
    // reflejamos visualmente
    captchaLabel.classList.toggle('checked', captchaCheckbox.checked);

    if (captchaCheckbox.checked) {
      showToast('Captcha activado — listo para enviar.', 'success');
    } else {
      showToast('Captcha desactivado.', 'error');
    }
    updateSubmitState();
  });

  // soporte teclado para la label: similar al click, evitar default
  captchaLabel.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      captchaLabel.click();
    }
  });

  // si por cualquier razón el checkbox cambia (por script), actualizamos estado
  captchaCheckbox.addEventListener('change', () => {
    captchaLabel.classList.toggle('checked', captchaCheckbox.checked);
    updateSubmitState();
  });

  // submit del form (igual que antes)
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validación final antes de enviar
    const missing = validateAllFields();
    if (missing.length > 0) {
      showToast('Por favor completa todos los campos obligatorios.', 'error');
      missing[0].focus();
      return;
    }
    if (!captchaCheckbox.checked) {
      showToast('Por favor confirma "No soy un robot".', 'error');
      return;
    }

    showToast('Enviando…', 'success');

    const formData = new FormData(form);
    try {
      const resp = await fetch(form.action, {
        method: 'POST',
        body: formData
      });
      const text = await resp.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch (err) {
        console.error('Respuesta no JSON del servidor:', text);
        showToast('Error del servidor. Revisa la consola (respuesta no JSON).', 'error');
        return;
      }
      if (json.success) {
        form.reset();
        // Reset visual marks
        [nombre, entidad, email, phone, asunto].forEach(i => clearMark(i));
        captchaCheckbox.checked = false;
        captchaLabel.classList.remove('checked');
        updateSubmitState();
        showToast(json.message, 'success');
      } else {
        showToast(json.message || 'Error al enviar', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error de red: ' + err.message, 'error');
    }
  });

}); // DOMContentLoaded
