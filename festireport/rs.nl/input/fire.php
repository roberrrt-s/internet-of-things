<?php 
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = $_POST["pot"];

    $timestamp = new DateTime();
    $time = $timestamp->format('Y-m-d H:i:s');
    $message = array("time" => $time, "pot" => $data);

      $inp = file_get_contents('output.json');
      $tempArray = json_decode($inp);

      $jsonData = json_encode($message);
      file_put_contents('output.json', $jsonData);
    }

    echo 'hello world!';
?>
