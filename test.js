const spawner = require('child_process').spawn;

payload = "None";

console.log('Data sent to pyhton script:', payload);

const python_process = spawner('python3', ['./rx.py', payload]);

python_process.stdout.on('data', (data) => {
    console.log('Data received from python script:', data.toString());
});