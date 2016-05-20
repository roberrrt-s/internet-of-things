# Festireport
#### A toolkit to develop your own monitoring system for crowded area's

#### Introduction

Festireport is an experimental toolkit in discovering a way to measure the amount and intensity of people at large gatherings (such as festivals). It involves a combination of sensors, a dashboard and a small NodeMCU chip that uses the sensors to measure several forms of data. This prototype will not make use of all those sensors, but will depend on a potentiometer to establish an idea of a 'crowd'

#### Requirements

 - Hardware
 	- NodeMCU ESP8266.
 	- A set of male-male connectors.
 	- A set of female-female connectors.
 	- A breadboard to connect internally.
 	- 3 LED lights.
 	- 3 resistors.
 	- A Potentio (POT) meter.

 - Software
 	- Arduino SDK
 	- Webserver running PHP
 	- Text editor (I personally use Sublime)
 	- FTP client

#### Setup

The setup is as following:

##### Hardware

Connect your NodeMCU to the breadboard, and connect the 3 leds through resistors to digital ports, make sure you connect the output to the ground (gnd). In addition, connect a 3.3v port to the input of your potentiometer, and the output to the ground (gnd). The middle port should be connected to your A0 (analog input).
This is the most basic setup possible, it's recommended to use another sensor instead of the potentiometer to measure actual data, instead of faking it.

##### Software

Setup a webserver or buy hosting from an external provider (as I did, so I will not go into depth about setting it up). Make sure you have FTP access to the server so you can upload your files. In addition, install the Arduino SDK and make sure you can upload to ESP8266 boards. A guide can be found here:

https://learn.sparkfun.com/tutorials/esp8266-thing-hookup-guide/installing-the-esp8266-arduino-addon

##### Visualisation of the setup

![alt tag](https://i.gyazo.com/eee8337f0a680d5754f6509f7a6c5fc2.png)

#### Back-end (NodeMCU)

To start, we'll have to upload the proper code to connect the NodeMCU to your network, before the setup, we'll declare the global variables containing this data:

```c
char ssid[] = "name"; // your network SSID (name) 
char pass[] = "pass"; // your network password
int status = WL_IDLE_STATUS; // regular status
WiFiClient client; // client as wifi
```

Next up, we set up the basic setup to connect with the wifi network, and place the pins on input/output:

```c
pinMode(D2, OUTPUT);
pinMode(D3, OUTPUT);
pinMode(D4, OUTPUT);
pinMode(A0, INPUT);

Serial.begin(9600);

Serial.print("Connecting to the WiFi");

while (WiFi.status() != WL_CONNECTED) {
delay(500);
Serial.print(".");
}

Serial.println("");
Serial.println("Connection established");
```

At last, the loop, first we handle the LED status:

```c
HTTPClient http;

http.begin("http://robertspier.nl/hva/festireport/output/data.txt"); 
int httpCode = http.GET();        
String payload = http.getString();

// initialize a GET request to a txt file to see which LEDs should be lit.

Serial.println(payload);

if(payload == "0") {
  digitalWrite(D2, LOW); 
  digitalWrite(D3, LOW); 
  digitalWrite(D4, LOW);
}

if(payload == "1") {
  digitalWrite(D2, HIGH); 
  digitalWrite(D3, LOW); 
  digitalWrite(D4, LOW);
  }
if(payload == "2") {
  digitalWrite(D2, HIGH); 
  digitalWrite(D3, HIGH); 
  digitalWrite(D4, LOW);
}
if(payload == "3") {
  digitalWrite(D2, HIGH); 
  digitalWrite(D3, HIGH); 
  digitalWrite(D4, HIGH);
}
```

Next up, we read the analog value of our pot meter, and post it to the server with a POST request.

```c

int pot = analogRead(A0);
Serial.print("Pot: ");
Serial.println(pot);

String conv = String(pot);    
String data = "pot=" + conv;

 //check if and connect the nodeMCU to the server
 if (client.connect(host, httpPort)) {
   //make the POST headers and add the data string to it
   client.println("POST /hva/festireport/input/fire.php HTTP/1.1");
   client.println("Host: www.robertspier.nl:80");
   client.println("Content-Type: application/x-www-form-urlencoded");
   client.println("Connection: close");
   client.print("Content-Length: ");
   client.println(data.length());
   client.println();
   client.print(data);
   client.println();
   Serial.println(data);
   Serial.println("Data send");

 } else {
   Serial.println("Something went wrong");
 }

// Add delay 
delay(5000);
```
 
Remember, make sure to change the 'robertspier.nl' values into your own server, otherwise you'll be uploading to mine, which isn't possible anymore since I removed the files from there.

#### Front-end (Server)

I have divided my client side into 3 folders.

 - Input (used to catch NodeMCU post requests)
 - Output (used by the NodeMCU to switch LEDs)
 - Dashboard (for oversight of the application)

![alt tag](https://i.gyazo.com/1804237df25640848bcb0f6d9cd8a681.png)

Fire.php is the PHP script that deals with the incoming requests, and places them in the corresponding txt or json file. As example:

```php
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
```

Information about the files can be found in the files themselves, I have commented all my front end code for clarification. the txt and json file are placeholder dummies, waiting for data to be transmitted beforehand.
The dashboard is the main part of my front end. It contains a static HTML page that changes when data is added by the NodeMCU, or options are pressed.

```javascript
var checkNodeMcu = setInterval(function() {
	// Perform a GET request to read the JSON file.
	$.getJSON("../input/output.json", function(data) {

		// If the time doesn't match with the last entry, replace it, and push the new variables into the list.
		if(data.time !== current.time) {
			current = data;
			list.push(data);

			// Redraw the line chart
			drawLineChart();
		}
		else {
			console.log('nothing new!')
		}
	})
}, 2000)
```

checkNodeMcu is an interval that checks for new data every 2 seconds. When there is no data, the interval does nothing, but when new data is found, the data gets pushed into the array in which it saves the data, and makes a reference of it to check for new data.

```javascript
var checkCheckBoxes = setInterval(function() {

	// Query for the checked radio box
	var checked = document.querySelector('input[type="radio"]:checked');

	// Invoke sendData() based on the radio button.
	switch(checked.id) {
		case "off":
			sendData(0);
		break;
		case "low":
			sendData(1);
		break;
		case "medium":
			sendData(2);
		break;
		case "high":
			sendData(3);
		break;
	}


}, 1000);
```
checkCheckBoxes is an interval that checks if the user has changed any of the input fields on the dashboard, and sends data to the output folder based upon this. this data gets handled by the sendData function, which checks for the input, and sends a post request to the fire.php to handle it

#### Structural oversight

#### Conclusion