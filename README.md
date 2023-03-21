
# signalk-raspberry-pi-sx1262-rx

This plugin is designed to receive data from a SX1262 LoRa module.

The plugin has been developped for SX1262 LoRa Hat for Raspberry Pi.

This plugin can be downloaded via the SignalK application.

**WARNING** In order to properly use this plugin you need to have another Raspberry Pi equiped with the SX1262 LoRa module and the plugin signalk-raspberry-pi-sx1262-tx.

**WARNING** The SX1262 and this plugin is **NOT** compatible with **LoRaWAN**. However, it is ideal if you need high frequency LoRa messages with heavy payload.

Some examples of possible uses are found below:
* Receiving telemetry from your boat *at the distance up to 2km without internet*,
* Receiving critical alarms,
* or receiving any field values of your choice such as, position, water temperature, wind speed, etc.

## Getting Started
You will need a raspberry pi with SignalK installed along with a SX1262 LoRa hat to used it.

### The SX1262 LoRa hat
I am using the SX1262 LoRa HAT found at the following [link](https://www.waveshare.com/sx1262-868m-lora-hat.htm) on waveshare. However there are other distributors to pick from. 

![SX1262](../main/Pictures/SX1262.png)

The datasheet and valuable information are available here: http://www.waveshare.com/wiki/SX1262_868M_LoRa_HAT

### Connecting the SX1262 LoRa hat
All you need here is place correctly the hat at the top of the Raspberry Pi. 
However, **WARNING**, you need to remove the M0 and M1 jumpers and place the COMM jumbers in position "B" as shown in figure below.

![SX1262](../main/Pictures/PiWithHat.png)

### Plugin configuration
Install the plugin in signalk app store. After installation, restart the SignalK server. Go to Server and then Plugin Config.

The following parameters can be configured:
* The receiving rate of the LoRa messages in seconds.
* The SignalK path where you want to store the message in the SignalK server.

## Authors
* **Jean-David Caprace** - *Author of this plugin*
