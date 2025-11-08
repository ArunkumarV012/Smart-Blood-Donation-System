// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const HospitalDashboard = ({ user, setUser }) => {
//     const [requestForm, setRequestForm] = useState({
//         patient_name: '',
//         patient_location: '',
//         blood_group: '',
//         blood_unit: ''
//     });
//     const [donors, setDonors] = useState([]);
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setRequestForm({ ...requestForm, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage('');
//         setError('');
//         setDonors([]);

//         try {
//             const response = await axios.post('http://localhost:5000/api/hospitals/request-blood', {
//                 ...requestForm,
//                 hospital_id: user.hospital_id,
//                 patient_location: user.location // Use hospital's location for the search
//             });
//             setMessage(response.data.message);
//             setDonors(response.data.donors);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to submit request.');
//         }
//     };

//     const handleLogout = () => {
//         setUser(null);
//         navigate('/');
//     };

//     return (
//         <>
//         <button onClick={handleLogout} className="logout-btn">Logout</button>
//         <div className="container dashboard-container">
            
//             <h2>Welcome, {user.hospital_name}</h2>
//             <h3>Request Blood</h3>

//             {message && <p style={{ color: 'green' }}>{message}</p>}
//             {error && <p style={{ color: 'red' }}>{error}</p>}

//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label>Patient Name:<br /><input type="text" name="patient_name" value={requestForm.patient_name} onChange={handleChange} required /></label>
//                 </div>
//                 <div className="form-group">
//                     <label>Blood Group:<br /><input type="text" name="blood_group" value={requestForm.blood_group} onChange={handleChange} required /></label>
//                 </div>
//                 <div className="form-group">
//                     <label>Blood Unit:<br /><input type="number" name="blood_unit" value={requestForm.blood_unit} onChange={handleChange} required /></label>
//                 </div>
//                 <button type="submit" className="dashboard-btn">Find Donors</button>
//             </form>

//             {donors.length > 0 && (
//                 <div>
//                     <h3>Matching Donors</h3>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Name</th>
//                                 <th>Age</th>
//                                 <th>Blood Group</th>
//                                 <th>Location</th>
//                                 <th>Contact</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {donors.map((donor) => (
//                                 <tr key={donor.id}>
//                                     <td>{donor.name}</td>
//                                     <td>{donor.age}</td>
//                                     <td>{donor.blood_group}</td>
//                                     <td>{donor.location}</td>
//                                     <td>{donor.contact}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//         </>
        
//     );
// };

// export default HospitalDashboard;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const HospitalDashboard = ({ user, setUser }) => {
//     const [requestForm, setRequestForm] = useState({
//         patient_name: '',
//         patient_location: '',
//         blood_group: '',
//         blood_unit: ''
//     });
//     const [donors, setDonors] = useState([]);
//     const [requests, setRequests] = useState([]); // New state for past requests
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     // Fetch all blood requests for the hospital on component load
//     useEffect(() => {
//         const fetchRequests = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/hospitals/${user.hospital_id}/blood-requests`);
//                 setRequests(response.data.requests);
//             } catch (err) {
//                 console.error('Failed to fetch blood requests:', err);
//             }
//         };

//         fetchRequests();
//     }, [user.hospital_id]);

//     const handleChange = (e) => {
//         setRequestForm({ ...requestForm, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage('');
//         setError('');
//         setDonors([]);

//         try {
//             const response = await axios.post('http://localhost:5000/api/hospitals/request-blood', {
//                 ...requestForm,
//                 hospital_id: user.hospital_id,
//                 patient_location: user.location
//             });
//             setMessage(response.data.message);
//             setDonors(response.data.donors);

//             // Re-fetch the requests to update the list
//             const updatedRequests = await axios.get(`http://localhost:5000/api/hospitals/${user.hospital_id}/blood-requests`);
//             setRequests(updatedRequests.data.requests);

//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to submit request.');
//         }
//     };

//     const handleLogout = () => {
//         setUser(null);
//         navigate('/');
//     };

//     return (
//         <div>
//             <button onClick={handleLogout} className="logout-btn">Logout</button>
//             <div className="container dashboard-container">
//                 <h2>Welcome, {user.hospital_name}</h2>
//                 <h3>Request Blood</h3>

//                 {message && <p style={{ color: 'green' }}>{message}</p>}
//                 {error && <p style={{ color: 'red' }}>{error}</p>}

//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label>Patient Name:<br /><input type="text" name="patient_name" value={requestForm.patient_name} onChange={handleChange} required /></label>
//                     </div>
//                     <div className="form-group">
//                         <label>Blood Group:<br /><input type="text" name="blood_group" value={requestForm.blood_group} onChange={handleChange} required /></label>
//                     </div>
//                     <div className="form-group">
//                         <label>Blood Unit:<br /><input type="number" name="blood_unit" value={requestForm.blood_unit} onChange={handleChange} required /></label>
//                     </div>
//                     <button type="submit" className="dashboard-btn">Find Donors</button>
//                 </form>

//                 {donors.length > 0 && (
//                     <div>
//                         <h3>Matching Donors</h3>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Age</th>
//                                     <th>Blood Group</th>
//                                     <th>Location</th>
//                                     <th>Contact</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {donors.map((donor) => (
//                                     <tr key={donor.id}>
//                                         <td>{donor.name}</td>
//                                         <td>{donor.age}</td>
//                                         <td>{donor.blood_group}</td>
//                                         <td>{donor.location}</td>
//                                         <td>{donor.contact}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
                
//                 {requests.length > 0 && (
//                     <div style={{ marginTop: '40px' }}>
//                         <h3>Recent Blood Requests</h3>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Patient Name</th>
//                                     <th>Blood Group</th>
//                                     <th>Blood Unit</th>
//                                     <th>Patient Location</th>
//                                     <th>Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {requests.map((req) => (
//                                     <tr key={req.id}>
//                                         <td>{req.patient_name}</td>
//                                         <td>{req.blood_group}</td>
//                                         <td>{req.blood_unit}</td>
//                                         <td>{req.patient_location}</td>
//                                         <td>{req.status}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default HospitalDashboard;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HospitalDashboard = ({ user, setUser }) => {
    const [requestForm, setRequestForm] = useState({
        patient_name: '',
        patient_location: '',
        blood_group: '',
        blood_unit: ''
    });
    const [donors, setDonors] = useState([]);
    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/hospitals/${user.hospital_id}/blood-requests`);
            setRequests(response.data.requests);
        } catch (err) {
            console.error('Failed to fetch blood requests:', err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [user.hospital_id]);

    const handleChange = (e) => {
        setRequestForm({ ...requestForm, [e.target.name]: e.target.value });
    };

    const handleSendRequest = async (donor) => {
    try {
        const payload = {
            donorEmail: donor.email, // Use the new 'email' field
            hospitalName: user.hospital_name,
            bloodGroup: donor.blood_group,
            bloodUnit: requestForm.blood_unit
        };

        const response = await axios.post('http://localhost:5000/api/donors/send-request', payload);
        setMessage(response.data.message);
    } catch (err) {
        setError(err.response?.data?.message || 'Failed to send email request.');
    }
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setDonors([]);

        try {
            const response = await axios.post('http://localhost:5000/api/hospitals/request-blood', {
                ...requestForm,
                hospital_id: user.hospital_id,
                patient_location: user.location
            });
            setMessage(response.data.message);
            setDonors(response.data.donors);

            fetchRequests();

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit request.');
        }
    };
    
    // The corrected function to update the request status
    const handleMarkAsCompleted = async (requestId) => {
        try {
            // First, make the PUT request to update the status in the backend
            const response = await axios.put(`http://localhost:5000/api/blood-requests/${requestId}/status`, { status: 'Completed' });
            
            // Log the response to verify success
            console.log(response.data.message);
            setMessage(response.data.message);

            // After a successful update, re-fetch the data to update the UI
            fetchRequests(); 
        } catch (err) {
            setError('Failed to update request status. Check the backend console for more details.');
            console.error('Frontend error during status update:', err);
        }
    };

    const handleLogout = () => {
        setUser(null);
        navigate('/');
    };

    return (
        <div>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
            <div className="container dashboard-container">
                <h2>Welcome, {user.hospital_name}</h2>
                <h3>Request Blood</h3>

                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Patient Name:<br /><input type="text" name="patient_name" value={requestForm.patient_name} onChange={handleChange} required /></label>
                    </div>
                    <div className="form-group">
                        <label>Blood Group:<br /><input type="text" name="blood_group" value={requestForm.blood_group} onChange={handleChange} required /></label>
                    </div>
                    <div className="form-group">
                        <label>Blood Unit:<br /><input type="number" name="blood_unit" value={requestForm.blood_unit} onChange={handleChange} required /></label>
                    </div>
                    <button type="submit" className="dashboard-btn">Find Donors</button>
                </form>

                {donors.length > 0 && (
                    <div>
                        <h3>Matching Donors</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Blood Group</th>
                                    <th>Location</th>
                                    <th>Contact</th>
                                    <th>Email</th>
                                    <th>Request</th> {/* New Header */}
                                </tr>
                            </thead>
                            <tbody>
                                {donors.map((donor) => (
                                    <tr key={donor.id}>
                                        <td>{donor.name}</td>
                                        <td>{donor.age}</td>
                                        <td>{donor.blood_group}</td>
                                        <td>{donor.location}</td>
                                        <td>{donor.contact}</td>
                                        <td>{donor.email}</td>
                                        <td>
                                            <button
                                                className="dashboard-btn"
                                                style={{ padding: '5px 10px', fontSize: '12px', width: 'auto' }}
                                                onClick={() => handleSendRequest(donor)}
                                            >
                                                Send Request
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                
                {requests.length > 0 && (
                    <div style={{ marginTop: '40px' }}>
                        <h3>Recent Blood Requests</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Patient Name</th>
                                    <th>Blood Group</th>
                                    <th>Blood Unit</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((req) => (
                                    <tr key={req.id}>
                                        <td>{req.patient_name}</td>
                                        <td>{req.blood_group}</td>
                                        <td>{req.blood_unit}</td>
                                        <td style={{ color: req.status === 'Completed' ? 'green' : 'red' }}>{req.status}</td>
                                        <td>
                                            <button 
                                                onClick={() => handleMarkAsCompleted(req.id)}
                                                disabled={req.status === 'Completed'}
                                                className="dashboard-btn"
                                                style={{ padding: '5px 10px', fontSize: '12px', width: 'auto', backgroundColor: req.status === 'Completed' ? '#5d6d7e' : '' }}
                                            >
                                                {req.status === 'Completed' ? 'Completed' : 'Mark as Completed'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HospitalDashboard;