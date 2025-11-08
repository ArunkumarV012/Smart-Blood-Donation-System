const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'blood_donation.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the blood_donation database.');
        createTables();
    }
});

const createTables = () => {
    db.serialize(() => {
        // Table 1: Blood Donar Details - Now with 'email'
        db.run(`
            CREATE TABLE IF NOT EXISTS donars (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                age INTEGER NOT NULL,
                blood_group TEXT NOT NULL,
                weight INTEGER NOT NULL,
                location TEXT NOT NULL,
                contact TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            )
        `);

        // Table 2: Hospital Details - Now with 'email'
        db.run(`
            CREATE TABLE IF NOT EXISTS hospitals (
                hospital_id INTEGER PRIMARY KEY AUTOINCREMENT,
                hospital_name TEXT NOT NULL,
                location TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            )
        `);

        // Table 3: Blood Request Details
        db.run(`
            CREATE TABLE IF NOT EXISTS blood_requests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                patient_name TEXT NOT NULL,
                patient_location TEXT NOT NULL,
                blood_group TEXT NOT NULL,
                blood_unit INTEGER NOT NULL,
                hospital_id INTEGER,
                status TEXT NOT NULL DEFAULT 'Pending',
                FOREIGN KEY (hospital_id) REFERENCES hospitals(hospital_id)
            )
        `);
    });
};

module.exports = db;