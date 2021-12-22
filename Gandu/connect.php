<?php
    $name = $_POST ["name"];
    $userName = $_POST ["userName"];
    $password = $_POST ["password"];
    $passwordRepeat = $_POST ["passwordRepeat"];
    $gender = $_POST ["gender"];
    $email = $_POST ["email"];
    $number = $_POST ("number");

    // database connection
    $conn = new mySqli ("localhost", "root", "", "test");
    if ($conn->connect_error) {
        die ('Connection Failed  : ' $conn -> connect_error);

    }else {
        $stmt = $conn -> prepare ("Intsert into registration (name,userName,password,passwordRepeat,gender,email, number )value (?,?,?,?,?,?)");
        $stmt -> bind_param("ssssssi", $name, $userName, $password, $passwordRepeat, $gender, $email, $number);
        echo "Registration successful...";
        $stmt -> close ();
        $conn -> close();
    }
?>

