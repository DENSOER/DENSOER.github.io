<?php
header('Content-Type: application/json');

require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
    exit;
}

$nombre  = filter_input(INPUT_POST, 'nombre', FILTER_SANITIZE_STRING);
$entidad = filter_input(INPUT_POST, 'entidad', FILTER_SANITIZE_STRING);
$email   = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$phone   = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
$asunto  = filter_input(INPUT_POST, 'asunto', FILTER_SANITIZE_STRING);

if (!$email) {
    echo json_encode(['success' => false, 'message' => 'Correo inválido.']);
    exit;
}

$mail = new PHPMailer(true);

try {
    // SMTP
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'cesardensoer@gmail.com';
    $mail->Password   = 'wjlbfnzhtglsjgnp';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // From / To
    $mail->setFrom($email, $nombre);
    $mail->addAddress('racoo.ventas@gmail.com', 'Racoo Ventas');
    $mail->addAddress('ventas@soporteracoo.com', 'Soporte Racoo');

    $mail->isHTML(false);
    $mail->Subject = "Contacto web: $asunto";
    $mail->Body    = "Nombre:   $nombre\n"
                   . "Entidad:  $entidad\n"
                   . "Email:    $email\n"
                   . "Teléfono: $phone\n\n"
                   . "Mensaje:\n$asunto\n";

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado correctamente.']);
} catch (Exception $e) {
    echo json_encode([
      'success' => false,
      'message' => 'Error al enviar: ' . $mail->ErrorInfo
    ]);
}
