<?php

$host = 'localhost';
$dbname = 'doodle';
$username = 'root';
$password = 'root';

try {
  $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");

  // echo "Connexion to $dbname on $host successful";

} catch (PDOException $e) {
  die('Connexion failed: ' . $e->getMessage());
}
$request = $pdo->query('SELECT * FROM player');
$sauce = $request->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($sauce);

?>