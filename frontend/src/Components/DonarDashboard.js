import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DonorDashboard = ({ user, setUser }) => {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ ...user });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.put(`http://localhost:5000/api/donors/${user.id}`, formData);
            setMessage(response.data.message);
            setUser({ ...formData, type: 'donor' });
            setEditMode(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update details.');
        }
    };

    const handleLogout = () => {
        setUser(null);
        navigate('/');
    };

    return (
        <>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
         <div className="container dashboard-container">
            
            <h2>Welcome, {user.name}</h2>
            <h3>Your Donor Profile</h3>

            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!editMode ? (
                <div>
                    <p><strong>Contact :</strong> {user.contact}</p>
                    <p><strong>Email :</strong> {user.email}</p>
                    <p><strong>Age :</strong> {user.age}</p>
                    <p><strong>Blood Group :</strong> {user.blood_group}</p>
                    <p><strong>Weight :</strong> {user.weight} kg</p>
                    <p><strong>Location :</strong> {user.location}</p>
                    <button onClick={() => setEditMode(true)} className="dashboard-btn">Edit Profile</button>
                </div>
            ) : (
                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label>Name:<br /><input type="text" name="name" value={formData.name} onChange={handleChange} required /></label>
                    </div>
                    <div className="form-group">
                        <label>Email:<br /><input type="email" name="email" value={formData.email} onChange={handleChange} required /></label>
                    </div>
                    <div className="form-group">
                        <label>Age:<br /><input type="number" name="age" value={formData.age} onChange={handleChange} required /></label>
                    </div>
                    <div className="form-group">
                        <label>Blood Group:<br /><input type="text" name="blood_group" value={formData.blood_group} onChange={handleChange} required /></label>
                    </div>
                    <div className="form-group">
                        <label>Weight:<br /><input type="number" name="weight" value={formData.weight} onChange={handleChange} required /></label>
                    </div>
                    <div className="form-group">
                        <label>Location:<br /><input type="text" name="location" value={formData.location} onChange={handleChange} required /></label>
                    </div>
                    <div className="form-group">
                        <label>Contact:<br /><input type="text" name="contact" value={formData.contact} onChange={handleChange} required /></label>
                    </div>
                    <button type="submit" className="dashboard-btn">Save Changes</button>
                    <button type="button" onClick={() => setEditMode(false)} className="dashboard-btn" style={{ backgroundColor: '#7f8c8d' }}>Cancel</button>
                </form>
            )}
        </div>
        </>
       
    );
};

export default DonorDashboard;