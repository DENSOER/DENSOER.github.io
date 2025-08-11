<?php
header('Content-Type: application/json');

require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
    exit;
}

// Sanitización básica
$nombre  = filter_input(INPUT_POST, 'nombre', FILTER_SANITIZE_STRING);
$entidad = filter_input(INPUT_POST, 'entidad', FILTER_SANITIZE_STRING);
$email   = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$phone   = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
$asunto  = filter_input(INPUT_POST, 'asunto', FILTER_SANITIZE_STRING);

// Validar los campos obligatorios: nombre y phone
if (!$nombre || trim($nombre) === '') {
    echo json_encode(['success' => false, 'message' => 'El campo Nombre es obligatorio.']);
    exit;
}
if (!$phone || trim($phone) === '') {
    echo json_encode(['success' => false, 'message' => 'El campo Teléfono/WhatsApp es obligatorio.']);
    exit;
}

$mail = new PHPMailer(true);

try {
    // SMTP (ajusta credenciales si hace falta)
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'cesardensoer@gmail.com';
    $mail->Password   = 'wjlbfnzhtglsjgnp';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // From fijo (evita rechazos por usar direcciones externas)
    $mail->setFrom('cesardensoer@gmail.com', 'Contacto Web');

    // Si el visitante dejó correo válido, lo ponemos como reply-to
    if ($email) {
        $mail->addReplyTo($email, $nombre);
    }

    $mail->addAddress('racoo.ventas@gmail.com', 'Racoo Ventas');
    $mail->addAddress('ventas@soporteracoo.com', 'Soporte Racoo');

    $mail->isHTML(false);
    $mail->Subject = "Contacto web: " . ($asunto ?: 'Sin asunto');
    $mail->Body    = "Nombre:   $nombre\n"
                   . "Entidad:  $entidad\n"
                   . "Email:    " . ($email ?: 'No proporcionado') . "\n"
                   . "Teléfono: $phone\n\n"
                   . "Mensaje:\n" . ($asunto ?: '') . "\n";

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado correctamente.']);
} catch (Exception $e) {
    echo json_encode([
      'success' => false,
      'message' => 'Error al enviar: ' . $mail->ErrorInfo
    ]);
}
