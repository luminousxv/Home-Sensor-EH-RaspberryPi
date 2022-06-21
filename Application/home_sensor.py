import Adafruit_DHT
import time
import math
import json
import requests
import busio
import digitalio
import board
import adafruit_mcp3xxx.mcp3008 as MCP
from adafruit_mcp3xxx.analog_in import AnalogIn
sensor = Adafruit_DHT.DHT11
pin = 4

RLOAD= 10.0
RZERO=76.63
PARA = 116.6020682
PARB = 2.769034857
CORA = 0.00035
CORB = 0.02718
CORC = 1.39538
CORD = 0.0018
CORE = -0.003333333
CORF = -0.001923077
CORG = 1.130128205

ATMOCO2 = 397.13

def getCorrectionFactor(t, h, CORA, CORB, CORC, CORD, CORE, CORF, CORG):
    if t<20:
        return CORA * t * t - CORB *t +CORC - (h-33.)*CORD
    else:
        return CORE * t + CORF * h + CORG

def getResistance(value_pin, RLOAD):
    return ((1023./value_pin) - 1.)*RLOAD

def getCorrectedResistance(t,h,CORA,CORB,CORC,CORD,CORE,CORF,CORG,value_pin,RLOAD):
	return getResistance(value_pin,RLOAD) / getCorrectionFactor(t,h,CORA,CORB,CORC,CORD,CORE,CORF,CORG)

def getPPM(PARA,RZERO,PARB,value_pin,RLOAD):
	return PARA * math.pow((getResistance(value_pin,RLOAD)/RZERO), -PARB)

def getCorrectedPPM(t,h,CORA,CORB,CORC,CORD,CORE,CORF,CORG,value_pin,RLOAD,PARA,RZERO,PARB):
	return PARA * math.pow((getCorrectedResistance(t,h,CORA,CORB,CORC,CORD,CORE,CORF,CORG,value_pin,RLOAD)/RZERO), -PARB)

def getRZero(value_pin,RLOAD,ATMOCO2,PARA,PARB):
	return getResistance(value_pin,RLOAD) * math.pow((ATMOCO2/PARA), (1./PARB))

def getCorrectedRZero(t,h,CORA,CORB,CORC,CORD,CORE,CORF,CORG,value_pin,RLOAD,ATMOCO2,PARA,PARB):
	return getCorrectedResistance(t,h,CORA,CORB,CORC,CORD,CORE,CORF,CORG,value_pin,RLOAD) * math.pow((ATMOCO2/PARA), (1./PARB))

def map(x,in_min,in_max,out_min,out_max):
	return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min


spi = busio.SPI(clock=board.SCK, MISO=board.MISO, MOSI=board.MOSI)

cs = digitalio.DigitalInOut(board.D22)

mcp = MCP.MCP3008(spi, cs)

chan0 = AnalogIn(mcp, MCP.P0)

humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)

while (True):
    if humidity is not None and temperature is not None:
        print(temperature)
        print(humidity)
    else:
        print('Failed to get reading. Try again!')
    
    value_ads = chan0.value
    value_pin = map((value_ads - 565), 0, 26690, 0, 1023)
    rzero = getRZero(value_pin,RLOAD,ATMOCO2,PARA,PARB)
    correctedRZero = getCorrectedRZero(temperature,humidity,CORA,CORB,CORC,CORD,CORE,CORF,CORG,value_pin,RLOAD,ATMOCO2,PARA,PARB)
    resistance = getResistance(value_pin,RLOAD)
    ppm = getPPM(PARA,RZERO,PARB,value_pin,RLOAD)
    correctedPPM = getCorrectedPPM(temperature,humidity,CORA,CORB,CORC,CORD,CORE,CORF,CORG,value_pin,RLOAD,PARA,RZERO,PARB)
    print('CO2: %s ppm' % round(correctedPPM))
    request1 = requests.post('http://3.35.57.189:8080/home-sensor/rpi/temperature/', json={"value": temperature})
    request1 = requests.post('http://3.35.57.189:8080/home-sensor/rpi/humidity/', json={"value": humidity})
    request3 = requests.post('http://3.35.57.189:8080/home-sensor/rpi/co2', json={"value": round(correctedPPM)})
    time.sleep(60)