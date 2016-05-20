# Festireport
#### A toolkit to develop your own monitoring system for crowded area's

##### Introduction

Festireport is an experimental toolkit in discovering a way to measure the amount and intensity of people at large gatherings (such as festivals). It involves a combination of sensors, a dashboard and a small NodeMCU chip that uses the sensors to measure several forms of data. This prototype will not make use of all those sensors, but will depend on a potentiometer to establish an idea of a 'crowd'

##### Requirements

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

##### Setup

The setup is as following:

###### Hardware

Connect your NodeMCU to the breadboard, and connect the 3 leds through resistors to digital ports, make sure you connect the output to the ground (gnd). In addition, connect a 3.3v port to the input of your potentiometer, and the output to the ground (gnd). The middle port should be connected to your A0 (analog input).
This is the most basic setup possible, it's recommended to use another sensor instead of the potentiometer to measure actual data, instead of faking it.

###### Software

Setup a webserver or buy hosting from an external provider (as I did, so I will not go into depth about setting it up). Make sure you have FTP access to the server so you can upload your files. In addition, install the Arduino SDK and make sure you can upload to ESP8266 boards. A guide can be found here:

https://learn.sparkfun.com/tutorials/esp8266-thing-hookup-guide/installing-the-esp8266-arduino-addon

###### Visualisation of the setup

##### Back-end (NodeMCU)

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



##### Front-end (Server)

##### Conclusion