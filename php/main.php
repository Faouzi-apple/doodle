<?php
$host = "localhost";
$dbname = "doodle";
$username = "root";
$password = "root";
try {
    $pdo = new PDO(
        "mysql:host=" .$host . ";dbname=" . $dbname,
        $username,
        $password,
        array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING, PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8' )

    );
    echo "Connected to $dbname on $host with success";
} catch (PDOException $e) {
    die("Can't connect to $dbname:" . $e->getMessage());
}
?>

