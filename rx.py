from sx1262 import sx1262
from terpreter import terpreter
import RPi.GPIO as GPIO
import time
import serial
import traceback
import sys

def init_serial(commport, baudrate, to):
    try:
        return serial.Serial(port=commport, baudrate=baudrate, timeout=to, parity=serial.PARITY_NONE, stopbits=serial.STOPBITS_ONE, bytesize=serial.EIGHTBITS)
    except Exception as e: raise e
 
def main():
    radio = sx1262()
    
    #configs
    commport = "/dev/ttyS0"
    baudrate = "9600"
    to = 60 #Timeout of the connection

    #GPIO configs
    M0 = 22
    M1 = 27
    GPIO.setmode(GPIO.BCM)
    GPIO.setwarnings(False)
    GPIO.setup(M0, GPIO.OUT)
    GPIO.setup(M1, GPIO.OUT)
    GPIO.output(M0, False)
    GPIO.output(M1, False)
    time.sleep(.5)

    while True:
        ser = init_serial(commport, baudrate, to)
        #radio.rcv_message(ser)
        data = ser.read_until()
        print(data.decode("utf-8"))
        sys.stdout.flush()

if __name__ == "__main__":
    main()