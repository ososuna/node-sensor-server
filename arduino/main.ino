
#include <Adafruit_Sensor.h>
#include <DHT_U.h>
#include <DHT.h>
#include <EEPROM.h>

#define DHTPin 8 // pin for DHT11 sensor
#define LED_GREEN 10 // pin for green led
#define LED_RED 11 // pin for red led
#define DHTTYPE DHT11 // type DHT11 sensor 

DHT dht(DHTPin, DHTTYPE);

void setup()
{
	Serial.begin(9600);
	dht.begin();
    pinMode(LED_GREEN, OUTPUT);  // define output pin
    pinMode(LED_RED, OUTPUT);  // define output pin
}

int count = 0; // counter variable
float temp_sum = 0; // temperature acumulator variable

void loop()
{
    float h = dht.readHumidity();
	float t = dht.readTemperature();

    // Validate if DHT11 sensor is working
    if (isnan(h) || isnan(t))
    {
        Serial.println("Failed to read from DHT sensor!");
	    return;
	}

    // Sum the temperature on each iteration and store the value in temp_sum
    temp_sum += t;

    // Print temperature and humidity in Serial
	Serial.print(h);
	Serial.print("\n");
	Serial.print(t);
    Serial.println("");

    // If temperature is above 25 turn on red led, else turn on green led
    if (t > 25)
    {
        digitalWrite(LED_GREEN, LOW);
        digitalWrite(LED_RED, HIGH);
    } else
    {
        digitalWrite(LED_RED, LOW);
        digitalWrite(LED_GREEN, HIGH);
    }
    
    // Store in EEPROM every 10 seconds the average temperature at the moment
    if (count % 10 == 0)
    {
        EEPROM.update(0, temp_sum / count);
    }
    
    // Run loop function every second
    delay(1000);

    // Incremen count every second
    count++;
}
