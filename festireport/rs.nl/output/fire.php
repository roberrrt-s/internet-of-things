<?php  

	$string = $_POST['string'];
	$file = fopen("data.txt", "w") or die("can't open file");
	fwrite($file, $string);
	fclose($file);

	echo "Hello world"
?>