<?php
$to = "infomejdi@hotmail.com,yoav@mocart.io,royal@mocart.io";
$from = $_POST['from'];
$cname = $_POST['cname'];
$email = $_POST['email'];
$message = $_POST['message'];
$to_array = explode(',', $to); // Split email addresses by commas into an array

$headers = "Full name: $from\r\n";
$headers .= "Company name: $cname\r\n";

$success = true;

if (empty($from) || empty($cname) || empty($email) || empty($message)) {
    $success = false;
    echo "Please fill in all fields.";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $success = false;
    echo "Invalid email address.";
} else {
    foreach ($to_array as $emailAddress) {
        $emailAddress = trim($emailAddress); // Trim any extra whitespace

        if (filter_var($emailAddress, FILTER_VALIDATE_EMAIL)) {
            // Send email
            $success = mail($emailAddress, $headers, $message);

            if (!$success) {
                echo "Failed to send email to: $emailAddress<br>";
            }
        } else {
            echo "Invalid email address: $emailAddress<br>";
        }
    }
}

if ($success) {
    echo "success"; // Notify the JavaScript code of success
} else {
    echo "Failed to send email.";
}
?>
