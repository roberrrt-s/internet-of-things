#include <ESP8266WiFi.h>
#include <ESP8266WiFiAP.h>
#include <ESP8266WiFiGeneric.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WiFiScan.h>
#include <ESP8266WiFiSTA.h>
#include <ESP8266WiFiType.h>
#include <WiFiClient.h>
#include <WiFiClientSecure.h>
#include <WiFiServer.h>
#include <WiFiUdp.h>

#include <ESP8266HTTPClient.h>

char ssid[] = "iPhone van Robert Spier"; //  your network SSID (name) 
char pass[] = "vixgm9fruiida"; // your network password
int status = WL_IDLE_STATUS;
WiFiClient client;

char* host = "www.robertspier.nl";
String path = "hva/festireport/input/reports.json";
const int httpPort = 80;

void setup() {
  
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
  
}

// the loop function runs over and over again forever
void loop() {

    HTTPClient http;

    http.begin("http://robertspier.nl/hva/festireport/output/data.txt"); 
    int httpCode = http.GET();        
    String payload = http.getString();

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

    delay(5000);
    
}
