
const express = require('express');
const path = require('path');
const configs = require("./configs.json")
const { networkInterfaces } = require('os');


function getHostIP() {

    const nets = networkInterfaces();
    const results = Object.create(null); // Or just '{}', an empty object

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
            if (net.family === familyV4Value && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }

    return results["en0"][0]
}

const app = express();
const PORT = configs.PORT || 9000;
const HOST = configs.HOST || "localhost";

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const HOST_IP = getHostIP()
app.listen(PORT, HOST, (req,res) => {
  console.log(`server on ${HOST_IP}:${PORT}`)
});