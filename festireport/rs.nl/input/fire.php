<?php 
    
    // Grab value of the POST request
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
      $data = $_POST["pot"];

      // Create timestamp and include both values into an array
      $timestamp = new DateTime();
      $time = $timestamp->format('Y-m-d H:i:s');
      $message = array("time" => $time, "pot" => $data);

      // Encode the array value, and place it into the json file
      $jsonData = json_encode($message);
      file_put_contents('output.json', $jsonData);
    }

    // Manual error logging
    echo 'hello world!';
?>
