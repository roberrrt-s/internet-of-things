// Includes
#include <EIoTCloudRestApi.h>
#include <EIoTCloudRestApiConfig.h>
#include <ThingSpeak.h>
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

int ldr = A0;
int led = LED_BUILTIN;
int val = 0;
int soundPin = D0;

const char* ssid = "iPhone van Robert Spier";
const char* password = "vixgm9fruiida";
WiFiClient client;

EIoTCloudRestApi eiotcloud;
#define AP_USERNAME "roberrrt-s"
#define AP_PASSWORD "hallo123"
#define INSTANCE_ID "570ca65cc943a022c0d2c47a/fudha2v0CNaM5kcK"
#define INSTANCE_ID2 "570ca65cc943a022c0d2c47a/tvPfnWpOPc7pZDHj"

unsigned long CHANNEL_ID  = 107766;
const char * API_KEY = "TT4G9M50BJ39NDPZ";
#define AUTHOR_ID "roberrrt-s"

void setup() {
  Serial.begin(9600);
  pinMode(ldr, INPUT);
  pinMode (soundPin, INPUT) ;

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    digitalWrite(led, HIGH);
    delay(250);
    digitalWrite(led, LOW);
    delay(250);
    Serial.print(".");
  }

  Serial.print("Connected to WiFi");
  ThingSpeak.begin(client);
  
}

void loop () {
  int LDRReading = analogRead(ldr); 
  int soundReading = digitalRead(soundPin); 
  Serial.print("Signal is ");
  Serial.println(LDRReading);
  if(LDRReading > 0) {
     Serial.println("Light detected!");
     ThingSpeak.setField(1, LDRReading);
     eiotcloud.sendParameter(INSTANCE_ID2, soundReading);
  }

    ThingSpeak.setField(2, soundReading);
    eiotcloud.sendParameter(INSTANCE_ID, LDRReading);

    ThingSpeak.writeFields(CHANNEL_ID, API_KEY);
    
    Serial.print("Sound is ");
  Serial.println(soundReading);
 
  delay(15000);
}
