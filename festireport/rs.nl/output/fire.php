<?php  
	// Receive a POST request, and put the value inside data.txt
	$string = $_POST['string'];
	$file = fopen("data.txt", "w") or die("can't open file");
	fwrite($file, $string);
	fclose($file);

	// Manual error 
	echo "Hello world"
?>