module.exports = function() {

    this.parse = function() {
const fs = require('fs');
const Papa = require('papaparse');
const { Client } = require('mysql');

const csvFirstFile = fs.readFileSync('assets/csv/EXP_PLANNING.csv', 'utf8');
const csvSecondFile = fs.readFileSync('assets/csv/EXP_ELEVE.csv', 'utf8');

const parsedFirstData = Papa.parse(csvFirstFile, {
    header: true,
    dynamicTyping: true,
  });

const parsedSecondData = Papa.parse(csvSecondFile, {
    header: true,
    dynamicTyping: true,
  });

  const client = new Client({
    user: 'root',
    host: 'localhost',
    database: 'arqam',
    password: 'strong_password',
    port: 3306,
  });
  
  client.connect();

  console.log("yes")
parsedFirstData.data.forEach((row) => {
    const columnNames = Object.keys(row);
    const placeholders = columnNames.map(() => '$').join(', ');
    const insertQuery = `INSERT INTO schedule (${columnNames.join(', ')}) VALUES (${placeholders});`;
  
    const values = Object.values(row);
  
    client.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error(err.stack);
      } else {
        console.log('Inserted row:', res.rows[0]);
      }
    });
  });

  return parsedFirstData;
}
}