 // const express = require('express');
// const cors = require('cors');
// const db = require('./database');
// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());

// // A simple test route to check if the server is running
// app.get('/', (req, res) => {
//     res.send('Welcome to the Smart Blood Donation API!');
// });

// // --- DONOR API ROUTES ---

// // Donor Registration
// app.post('/api/donors/register', (req, res) => {
//     const { name, age, blood_group, weight, location, contact, password } = req.body;
//     db.run(
//         `INSERT INTO donars (name, age, blood_group, weight, location, contact, password) VALUES (?, ?, ?, ?, ?, ?, ?)`,
//         [name, age, blood_group, weight, location, contact, password],
//         function(err) {
//             if (err) {
//                 return res.status(500).json({ error: err.message });
//             }
//             res.status(201).json({ message: 'Donor registered successfully!', donorId: this.lastID });
//         }
//     );
// });

// // Donor Login
// app.post('/api/donors/login', (req, res) => {
//     const { contact, password } = req.body;
//     db.get(`SELECT * FROM donars WHERE contact = ? AND password = ?`, [contact, password], (err, row) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         if (!row) {
//             return res.status(401).json({ message: 'Invalid contact or password' });
//         }
//         res.status(200).json({ message: 'Login successful', user: row });
//     });
// });

// // Update Donor Details
// app.put('/api/donors/:id', (req, res) => {
//     const { name, age, blood_group, weight, location, contact } = req.body;
//     {name : Arunkumar V}
//     const { id } = req.params;
//     db.run(
//         `UPDATE donars SET name = ?, age = ?, blood_group = ?, weight = ?, location = ?, contact = ? WHERE id = ?`,
//         [name, age, blood_group, weight, location, contact, id],
//         function(err) {
//             if (err) {
//                 return res.status(500).json({ error: err.message });
//             }
//             if (this.changes === 0) {
//                 return res.status(404).json({ message: 'Donor not found or no changes made.' });
//             }
//             res.status(200).json({ message: 'Donor details updated successfully.' });
//         }
//     );
// });

// // --- HOSPITAL API ROUTES ---

// // Hospital Registration (Optional, but good practice for a complete system)
// app.post('/api/hospitals/register', (req, res) => {
//     const { hospital_name, location, password } = req.body;
//     db.run(
//         `INSERT INTO hospitals (hospital_name, location, password) VALUES (?, ?, ?)`,
//         [hospital_name, location, password],
//         function(err) {
//             if (err) {
//                 return res.status(500).json({ error: err.message });
//             }
//             res.status(201).json({ message: 'Hospital registered successfully!', hospitalId: this.lastID });
//         }
//     );
// });

// // Hospital Login
// app.post('/api/hospitals/login', (req, res) => {
//     const { hospital_name, password } = req.body;
//     db.get(`SELECT * FROM hospitals WHERE hospital_name = ? AND password = ?`, [hospital_name, password], (err, row) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         if (!row) {
//             return res.status(401).json({ message: 'Invalid hospital name or password' });
//         }
//         res.status(200).json({ message: 'Login successful', hospital: row });
//     });
// });

// // Blood Request and Donor Search
// app.post('/api/hospitals/request-blood', (req, res) => {
//     const { patient_name, patient_location, blood_group, blood_unit, hospital_id } = req.body;

//     // First, save the blood request
//     db.run(
//         `INSERT INTO blood_requests (patient_name, patient_location, blood_group, blood_unit, hospital_id) VALUES (?, ?, ?, ?, ?)`,
//         [patient_name, patient_location, blood_group, blood_unit, hospital_id],
//         function(err) {
//             if (err) {
//                 return res.status(500).json({ error: err.message });
//             }

//             // Then, search for matching donors
//             db.all(`SELECT id, name, age, blood_group, location, contact FROM donars WHERE blood_group = ? AND location = ?`, 
//                 [blood_group, patient_location], 
//                 (err, rows) => {
//                 if (err) {
//                     return res.status(500).json({ error: err.message });
//                 }
//                 res.status(200).json({ 
//                     message: 'Blood request saved and donors found.',
//                     donors: rows
//                 });
//             });
//         }
//     );
// });




// // Get all blood requests for a specific hospital
// app.get('/api/hospitals/:hospital_id/blood-requests', (req, res) => {
//     const { hospital_id } = req.params;
//     db.all(`SELECT * FROM blood_requests WHERE hospital_id = ? ORDER BY id DESC`, [hospital_id], (err, rows) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.status(200).json({ requests: rows });
//     });
// });



// // Update the status of a blood request
// app.put('/api/blood-requests/:request_id/status', (req, res) => {
//     const { request_id } = req.params;
//     const { status } = req.body;
//     db.run(`UPDATE blood_requests SET status = ? WHERE id = ?`, [status, request_id], function(err) {
//         if (err) {
//             // This will log the specific database error to your console
//             console.error('Database update error:', err.message);
//             return res.status(500).json({ error: err.message });
//         }
//         if (this.changes === 0) {
//             return res.status(404).json({ message: 'Request not found or status is the same.' });
//         }
//         res.status(200).json({ message: 'Request status updated successfully.' });
//     });
// });


// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

const sendBloodRequestEmail = require('./emailService');
const express = require('express');
const cors = require('cors');
const db = require('./database');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// A simple test route to check if the server is running
app.get('/', (req, res) => {
    res.send('Welcome to the Smart Blood Donation API!');
});

// --- DONOR API ROUTES ---

// Donor Registration
app.post('/api/donors/register', (req, res) => {
    const { name, age, blood_group, weight, location, contact, email, password } = req.body;
    db.run(
        `INSERT INTO donars (name, age, blood_group, weight, location, contact, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, age, blood_group, weight, location, contact, email, password],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Donor registered successfully!', donorId: this.lastID });
        }
    );
});

// Donor Login
app.post('/api/donors/login', (req, res) => {
    const { contact, password } = req.body;
    db.get(`SELECT * FROM donars WHERE contact = ? AND password = ?`, [contact, password], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(401).json({ message: 'Invalid contact or password' });
        }
        res.status(200).json({ message: 'Login successful', user: row });
    });
});

// Update Donor Details
app.put('/api/donors/:id', (req, res) => {
    const { name, age, blood_group, weight, location, contact } = req.body;
    const { id } = req.params;
    db.run(
        `UPDATE donars SET name = ?, age = ?, blood_group = ?, weight = ?, location = ?, contact = ? WHERE id = ?`,
        [name, age, blood_group, weight, location, contact, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Donor not found or no changes made.' });
            }
            res.status(200).json({ message: 'Donor details updated successfully.' });
        }
    );
});

// --- HOSPITAL API ROUTES ---

// Hospital Registration
app.post('/api/hospitals/register', (req, res) => {
    const { hospital_name, location, email, password } = req.body;
    db.run(
        `INSERT INTO hospitals (hospital_name, location, email, password) VALUES (?, ?, ?, ?)`,
        [hospital_name, location, email, password],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Hospital registered successfully!', hospitalId: this.lastID });
        }
    );
});

// Hospital Login
app.post('/api/hospitals/login', (req, res) => {
    const { hospital_name, password } = req.body;
    db.get(`SELECT * FROM hospitals WHERE hospital_name = ? AND password = ?`, [hospital_name, password], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(401).json({ message: 'Invalid hospital name or password' });
        }
        res.status(200).json({ message: 'Login successful', hospital: row });
    });
});

// Blood Request and Donor Search
app.post('/api/hospitals/request-blood', (req, res) => {
    const { patient_name, patient_location, blood_group, blood_unit, hospital_id } = req.body;

    // First, save the blood request
    db.run(
        `INSERT INTO blood_requests (patient_name, patient_location, blood_group, blood_unit, hospital_id) VALUES (?, ?, ?, ?, ?)`,
        [patient_name, patient_location, blood_group, blood_unit, hospital_id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Then, search for matching donors
            db.all(`SELECT id, name, age, blood_group, location, contact, email FROM donars WHERE blood_group = ? AND location = ?`, 
                [blood_group, patient_location], (err, rows) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(200).json({ 
                    message: 'Blood request saved and donors found.',
                    donors: rows
                });
            });
        }
    );
});

// Get all blood requests for a specific hospital
app.get('/api/hospitals/:hospital_id/blood-requests', (req, res) => {
    const { hospital_id } = req.params;
    db.all(`SELECT * FROM blood_requests WHERE hospital_id = ? ORDER BY id DESC`, [hospital_id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ requests: rows });
    });
});

// Update the status of a blood request
app.put('/api/blood-requests/:request_id/status', (req, res) => {
    const { request_id } = req.params;
    const { status } = req.body;
    db.run(`UPDATE blood_requests SET status = ? WHERE id = ?`, [status, request_id], function(err) {
        if (err) {
            // This will log the specific database error to your console
            console.error('Database update error:', err.message);
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Request not found or status is the same.' });
        }
        res.status(200).json({ message: 'Request status updated successfully.' });
    });
});


// Endpoint to send an email to a specific donor
app.post('/api/donors/send-request', async (req, res) => {
    const { donorEmail, hospitalName, bloodGroup, bloodUnit } = req.body;

    // Input validation
    if (!donorEmail || !hospitalName || !bloodGroup || !bloodUnit) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const emailSent = await sendBloodRequestEmail(donorEmail, hospitalName, bloodGroup, bloodUnit);

    if (emailSent) {
        res.status(200).json({ message: 'Blood request sent successfully via email.' });
    } else {
        res.status(500).json({ message: 'Failed to send email. Please check server logs.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});