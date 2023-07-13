<?php
$to = $_POST['to'];
$from = $_POST['from'];
$cname = $_POST['cname'];
$email = $_POST['email'];
$message = $_POST['message'];
$to_array = explode(',', $to); // Split email addresses by commas into an array

$headers = "Full name: $from\r\n";
$headers .= "Company name: $cname\r\n";
// $headers .= "Content-Type: text/html\r\n";

foreach ($to_array as $email) {
    $email = trim($email); // Trim any extra whitespace

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Send email
        $success = mail($email, $message, $headers);

        if ($success) {
            echo "Email sent to: $cname<br>";
        } else {
            echo "Failed to send email to: $email<br>";
        }
    } else {
        echo "Invalid email address: $email<br>";
    }
}
?>
