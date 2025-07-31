document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
  
    form.addEventListener('submit', async e => {
      e.preventDefault();
      showToast('Enviando…', 'success');
  
      const formData = new FormData(form);
      try {
        const resp = await fetch(form.action, {
          method: 'POST',
          body: formData
        });
        const json = await resp.json();
  
        if (json.success) {
          form.reset();
          showToast(json.message, 'success');
        } else {
          showToast(json.message, 'error');
        }
      } catch (err) {
        showToast('Error de red: ' + err.message, 'error');
      }
    });
  
    /**
     * Crea un toast, lo muestra y lo elimina tras timeout.
     * @param {string} message Texto a mostrar.
     * @param {'success'|'error'} type Tipo de toast (define color).
     */
    function showToast(message, type = 'success') {
      // 1) Crear elemento
      const toast = document.createElement('div');
      toast.textContent = message;
  
      // 2) Estilos inline básicos
      Object.assign(toast.style, {
        position: 'fixed',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '0.75rem 1rem',
        borderRadius: '4px',
        fontSize: '0.9rem',
        color: '#fff',
        opacity: '0',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        zIndex: '9999',
        pointerEvents: 'none',
        // color según tipo
        background: type === 'success' ? '#4caf50' : '#f44336'
      });
  
      // 3) Insertarlo en el DOM
      document.body.appendChild(toast);
  
      // 4) Forzar reflow y mostrar
      requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
      });
  
      // 5) Ocultarlo y eliminarlo tras 3s
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(-10px)';
        toast.addEventListener('transitionend', () => {
          toast.remove();
        }, { once: true });
      }, 3000);
    }
  });
  