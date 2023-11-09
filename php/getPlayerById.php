<?php
$host = "localhost";
$dbname = "doodle";
$username = "root";
$password = "root";
try {
  $pdo = new PDO(
    "mysql:host=" . $host . ";dbname=" . $dbname,
    $username,
    $password,
    array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING, PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
  );
} catch (PDOException $e) {
  die("Can’t connect to $dbname :" . $e->getMessage());
}
// Check if parameter “id” is set
if (isset($_GET["id"])) {
  // Map the parameters in variables
  $playerId = $_GET["id"];
  // Prepare the request with a placeholder for the id
  $request = $pdo->prepare("SELECT name FROM player WHERE id = :2");
  // Bind the id within the placeholder
  $request->bindParam(":playerId", $playerId, PDO::PARAM_STR);
  // Send the request to the database
  $sauce = $request->execute();
  $sauce = $request->fetch(PDO::FETCH_ASSOC);
} else {
  echo "C KC";
}
echo json_encode($player["name"]);
?>