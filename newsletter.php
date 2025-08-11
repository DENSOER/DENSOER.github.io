<?php
header('Content-Type: application/json');

// Comprobar que exista autoload
if (!file_exists(__DIR__ . '/vendor/autoload.php')) {
    error_log('newsletter.php: vendor/autoload.php no encontrado en ' . __DIR__);
    echo json_encode(['success' => false, 'message' => 'Error interno: librerías no encontradas.']);
    exit;
}

require __DIR__ . '/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
    exit;
}

$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
if (!$email) {
    echo json_encode(['success' => false, 'message' => 'Correo electrónico inválido.']);
    exit;
}

$mail = new PHPMailer(true);

try {
    // Opcional: volcar debug a error_log para pruebas
    $mail->SMTPDebug = 0; // 0 para producción. Poner 2 para debug.
    $mail->Debugoutput = function($str, $level) {
        error_log("PHPMailer: $str");
    };

    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'cesardensoer@gmail.com';
    $mail->Password   = 'wjlbfnzhtglsjgnp'; // usa contraseña de aplicación
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom('cesardensoer@gmail.com', 'Boletín Web');
    $mail->addAddress('minotaria.mx@gmail.com', 'Minotaria');

    $mail->CharSet = 'UTF-8';
    $mail->isHTML(false);
    $mail->Subject = 'Nueva suscripción al boletín';
    $mail->Body    = "Se ha suscrito el correo: $email";

    $mail->send();

    echo json_encode(['success' => true, 'message' => '¡Suscripción enviada correctamente!']);
} catch (Exception $e) {
    // Registrar error detallado en el log del servidor
    error_log('newsletter.php - Error PHPMailer: ' . $mail->ErrorInfo . ' / Exception: ' . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Error al enviar: ' . $mail->ErrorInfo]);
}
