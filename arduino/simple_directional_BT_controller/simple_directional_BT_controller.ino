#include <SoftwareSerial.h>
int l1 = 4;
int l2 = 5;
int l3 = 6;
int l4 = 7;
char val;

SoftwareSerial mySerial(10, 11); // RX, TX

void setup()  
{
  // Open serial communications and wait for port to open:
  // set the data rate for the SoftwareSerial port
  mySerial.begin(9600);
  mySerial.println("Hello, world?");
  pinMode(l1, OUTPUT);
  pinMode(l2, OUTPUT);
  pinMode(l3, OUTPUT);
  pinMode(l4, OUTPUT);

}

void loop() // run over and over
{
  if (mySerial.available()){
    val = mySerial.read(); 
    digitalWrite(l1, LOW);
    digitalWrite(l2, LOW);
    digitalWrite(l3, LOW);    // read it and store it in 'val'
    digitalWrite(l4, LOW);    // read it and store it in 'val'
    //mySerial.println(val);
    delay(50);
  }
  
  
  //digitalWrite(l2, HIGH);
   // digitalWrite(l4, HIGH);
  
    switch (val) {
  case 'a':    // your hand is on the sensor
    digitalWrite(l1, HIGH);
    digitalWrite(l3, HIGH);
    
    break;
  case 'c':    // your hand is close to the sensor
    digitalWrite(l1, HIGH);
    digitalWrite(l4, HIGH);
    
    break;
  case 'b':    // your hand is a few inches from the sensor
    digitalWrite(l2, HIGH);
    digitalWrite(l4, HIGH);
    
    break;
  case 'd':    // your hand is nowhere near the sensor
    
    digitalWrite(l2, HIGH);
    digitalWrite(l3, HIGH);
    break;
  } 
  
  val='q'; 
    
}
