require('dotenv/config');
const mysql = require('mysql');
const fs = require('node:fs');
const readline = require('readline');

const database = mysql.createConnection({
    host: 'localhost',
    user: 'elnurdev',
    password: process.env.MYSQL_PASSWORD,
    database: 'swms'
});

async function processLineByLine() {
    const fileStream = fs.createReadStream('./data.csv');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let pos;
    let values = [];
    let iteration = 0;
    for await (let line of rl) {
        if (iteration === 0) {
            ++iteration;
            continue;
        }
        //Date and time
        pos = line.indexOf(',');
        values.push(line.slice(0, pos));

        line = line.slice(pos + 1, line.length);
        pos = line.indexOf(',');
        line = line.slice(pos + 1, line.length);
        pos = line.indexOf(',');
        line = line.slice(pos + 1, line.length);
        
        //Fill level
        pos = line.indexOf(',');
        values.push(Number(line.slice(0, pos)));

        line = line.slice(pos + 1, line.length);
        pos = line.indexOf(',');
        line = line.slice(pos + 1, line.length);
        pos = line.indexOf(',');
        line = line.slice(pos + 1, line.length);
        pos = line.indexOf(',');
        line = line.slice(pos + 1, line.length);
        pos = line.indexOf(',');
        line = line.slice(pos + 1, line.length);
        pos = line.indexOf(',');

        //Address
        line = line.slice(1, line.length);
        pos = line.indexOf('"');
        values.push(line.slice(0, pos));
        line = line.slice(pos + 2, line.length);

        //Lat and lng
        line = line.slice(1, line.length);
        pos = line.indexOf('"');
        let latLng = line.slice(0, pos);
        pos = latLng.indexOf(',');
        values.push(Number(latLng.slice(0, pos)));
        latLng = latLng.slice(pos + 2, latLng.length);
        values.push(Number(latLng));

        values = [];
    }
        console.log(values);
}

processLineByLine();