<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Process the POST request

    if (!$_POST) exit;

    function isEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    $fname = $_POST['first_name'];
    $lname = $_POST['last_name'];
    $email = $_POST['email'];
    $phone = $_POST['phone_number'];
    $homeland = $_POST['country'];
    $company_type = $_POST['choice_company'];
    $services = implode(", ", $_POST['services']);
    $message = $_POST['message'];
    $budget = isset($_POST['budget']) ? $_POST['budget'] : 'Not specified';
    $privacy_policy_accept = isset($_POST['privacy_policy_accept']) ? $_POST['privacy_policy_accept'] : '0';

    if (empty($fname)) {
        echo '<div class="alert alert-error">You must enter your first name.</div>';
        exit();
    } elseif (empty($lname)) {
        echo '<div class="alert alert-error">You must enter your last name.</div>';
        exit();
    } elseif (empty($email)) {
        echo '<div class="alert alert-error">You must enter your email address.</div>';
        exit();
    } elseif (!isEmail($email)) {
        echo '<div class="alert alert-error">You must enter a valid email address.</div>';
        exit();
    } elseif (empty($phone)) {
        echo '<div class="alert alert-error">Please fill in the phone number field!</div>';
        exit();
    } elseif (empty($homeland)) {
        echo '<div class="alert alert-error">Please fill in the country field!</div>';
        exit();
    } elseif (empty($company_type)) {
        echo '<div class="alert alert-error">Please select the type of your company!</div>';
        exit();
    } elseif (empty($services)) {
        echo '<div class="alert alert-error">Please select the services you need!</div>';
        exit();
    } elseif (empty($message)) {
        echo '<div class="alert alert-error">You must enter your message.</div>';
        exit();
    } elseif (!isset($privacy_policy_accept) || $privacy_policy_accept != '1') {
        echo '<div class="alert alert-error">You must agree to our terms and conditions!</div>';
        exit();
    }

    $to = "wordpressriver@gmail.com";
    $subject = "Contact Form Submission from $fname $lname";
    $message = "You have received a contact form submission from $fname $lname. Below are the details:" . PHP_EOL . PHP_EOL;
    $message .= "First Name: $fname" . PHP_EOL;
    $message .= "Last Name: $lname" . PHP_EOL;
    $message .= "Email: $email" . PHP_EOL;
    $message .= "Phone Number: $phone" . PHP_EOL;
    $message .= "Country: $homeland" . PHP_EOL;
    $message .= "Company Type: $company_type" . PHP_EOL;
    $message .= "Services Needed: $services" . PHP_EOL;
    $message .= "Budget: $budget" . PHP_EOL . PHP_EOL;
    $message .= "Privacy_policy_accept: $privacy_policy_accept" . PHP_EOL . PHP_EOL;
    $message .= "Message: " . PHP_EOL . $message;

    // Implement the recommended email sending method
    $success = mail($to, $subject, $message, "From: $email" . PHP_EOL);

    if ($success) {
        echo '<div class="alert alert-success">';
        echo '<h3>Email Sent Successfully.</h3>';
        echo "<p>Thank you <strong>$fname</strong>, your message has been submitted to us.</p>";
        echo '</div>';
    } else {
        echo 'ERROR!';
    }
} else {
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>
