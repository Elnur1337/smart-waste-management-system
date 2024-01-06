require('dotenv/config');
const mysql = require('mysql');
const fs = require('node:fs');
const readline = require('readline');

class Row {
    constructor(dateAndTime, serial, fillLevel, address, lat, lng) {
        this.dateAndTime = dateAndTime;
        this.id = serial;
        this.fillLevel = fillLevel;
        this.address = address;
        this.lat = lat;
        this.lng = lng;
    }
}

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
        const dateAndTime = line.slice(0, pos);

        line = line.slice(pos + 1, line.length);

        //Serial
        pos = line.indexOf(',');
        const serial = line.slice(0, pos);

        pos = line.indexOf(',');
        line = line.slice(pos + 1, line.length);
        pos = line.indexOf(',');
        line = line.slice(pos + 1, line.length);


        //Fill level
        pos = line.indexOf(',');
        const fillLevel = Number(line.slice(0, pos));

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
        const address = line.slice(0, pos);
        line = line.slice(pos + 2, line.length);

        //Lat and lng
        line = line.slice(1, line.length);
        pos = line.indexOf('"');
        let latLng = line.slice(0, pos);

        if (!latLng) {
            continue;
        }

        pos = latLng.indexOf(',');
        const lat = Number(latLng.slice(0, pos));
        latLng = latLng.slice(pos + 2, latLng.length);
        const lng = Number(latLng);

        values.push(new Row(dateAndTime, serial, fillLevel, address, lat, lng));
        
    }
        
    console.log(values);

    let inputs = [];

    values.forEach((row) => {
        if (!inputs.includes(row.address)) {
            inputs.push(row.address);
            database.query('INSERT INTO locations(lat, lng, address) VALUES (?, ?, ?)', [row.lat, row.lng, row.address], (err, res) => {
                if (err) {
                    console.log(err);
                }
                if (res) {
                    console.log(res);
                }
            });
        }
    });

    inputs = [];

    values.forEach((row) => {
        if (!inputs.includes(row.id)) {
            inputs.push(row.id);
            database.query('SELECT id FROM locations WHERE address = ?', [row.address], (err, res) => {
                if (err) {
                    console.log(err);
                }
                database.query('INSERT INTO trashBins(id, locationId) VALUES (?, ?)', [row.id, res[0].id], (err, res) => {
                    if (err) {
                        console.log(err);
                    }
                    if (res) {
                        console.log(res);
                    }
                });
            });
        }
    });

    inputs = [];
    setTimeout(() => {
        values.forEach((row) => {
            database.query('INSERT INTO updates(trashBinId, fillLevel, dateAndTime) VALUES (?, ?, ?)', [row.id, row.fillLevel, row.dateAndTime], (err, res) => {
                if (err) {
                    console.log(err);
                }
                if (res) {
                    console.log(res);
                }
            });
        });
    }, 10000);
}

processLineByLine();