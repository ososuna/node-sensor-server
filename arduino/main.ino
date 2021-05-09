
#include <Adafruit_Sensor.h>
#include <DHT_U.h>
#include <DHT.h>

#define DHTPin 8
#define LED_GREEN 10
#define LED_RED 11
#define DHTTYPE DHT11

DHT dht(DHTPin, DHTTYPE);

void setup()
{
	Serial.begin(9600);
	dht.begin();
    pinMode(LED_GREEN, OUTPUT);  //definir pin como salida
    pinMode(LED_RED, OUTPUT);  //definir pin como salida
}

void loop()
{
    float h = dht.readHumidity();
	float t = dht.readTemperature();

    if (isnan(h) || isnan(t))
    {
        Serial.println("Failed to read from DHT sensor!");
	    return;
	}

	Serial.print("Humidity: ");
	Serial.print(h);
	Serial.print(" %\t\n");
    // Serial.print("\n");
	Serial.print("Temperature: ");
	Serial.print(t);
	Serial.print(" *C ");
    Serial.println("");

    if (t > 28.1)
    {
        digitalWrite(LED_GREEN, LOW);
        digitalWrite(LED_RED, HIGH);
    } else
    {
        digitalWrite(LED_RED, LOW);
        digitalWrite(LED_GREEN, HIGH);
    }
    
    delay(2000);
    
}
