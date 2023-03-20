/*
 * Copyright 2022 Jean-David Caprace <jd.caprace@gmail.com>
 *
 * Add the MIT license
 */

const spawner = require('child_process').spawn;

module.exports = function (app) {
  let timer = null
  let plugin = {}

  plugin.id = 'signalk-raspberry-pi-read-sx1262-rx'
  plugin.name = 'Raspberry-Pi sx1262-rx'
  plugin.description = 'Raspberry-Pi listener of LoRa message for Signalk using sx1262'

  plugin.schema = {
    type: 'object',
    properties: {
      rate: {
        title: "Sample Rate (in seconds)",
        type: 'number',
        default: 1
      },
      enable: {
        type: 'boolean',
        title: 'Enable the reading of the variable',
        default: false
      },
      skpath: {
        type: 'string',
        title: 'SignalK path',
        description: 'This is used to store the value of the value of the LoRa params.',
        default: 'environment.inside.engineroom'
      }  
    }
  }


  plugin.start = function (options) {

    
    
    function createDeltaMessage(paramvalue) {
      app.debug('Create Delta Message for path: ', options.path);
      values = [
        {
          'path': options.path,
          'value': paramvalue
        }
      ];
 
      return {
        'context': 'vessels.' + app.selfId,
        'updates': [
          {
            'source': {
              'label': plugin.id
            },
            'timestamp': (new Date()).toISOString(),
            'values': values
          }
        ]
      }
    }


    //Init listening
    payload = "None";
    var loramessage = "";
    console.log('Data sent to pyhton script:', payload);
    const python_process = spawner('python3', ['/home/pi/.signalk/node_modules/signalk-raspberry-pi-sx1262-tx/rx.py', payload]);

	  // Read LoRa message
    function readmessage() {
      //If they are some pins configured
	      if (options.enable == true) {
	          
          python_process.stdout.on('data', (data) => {
            loramessage = data.toString();
            console.log('loramessage: ', loramessage);
          });
          
          app.debug('loramessage: ', loramessage);          
          
          // create message
          var delta = createDeltaMessage(loramessage);
          // send data
          app.handleMessage(plugin.id, delta);
	      }
        
      }//End of readlora
      
    timer = setInterval(readmessage, options.rate * 1000);
  }//End plugin.start

  plugin.stop = function () {
    if(timer){
      clearInterval(timer);
      timeout = null;
    }
  }

  return plugin
}


