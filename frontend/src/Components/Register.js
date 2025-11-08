import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [registerType, setRegisterType] = useState('donor');
    const [formData, setFormData] = useState({
    name: '', age: '', blood_group: '', weight: '', location: '', contact: '', email: '', password: '', // Added email
    hospital_name: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            if (registerType === 'donor') {
                await axios.post('http://localhost:5000/api/donors/register', { ...formData });
                setMessage('Donor registered successfully! Please log in.');
                setTimeout(() => navigate('/'), 3000);
            } else {
                await axios.post('http://localhost:5000/api/hospitals/register', { 
                    hospital_name: formData.hospital_name, 
                    location: formData.location, 
                    email: formData.email, // Ensure email is passed for hospitals
                    password: formData.password 
                });
                setMessage('Hospital registered successfully! Please log in.');
                setTimeout(() => navigate('/'), 3000);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        }
    };

    return (
       <div className="container">
            <h2>Register</h2>
            <div className="tab-buttons">
                <button onClick={() => setRegisterType('donor')} className={registerType === 'donor' ? 'active' : ''}>Donor Register</button>
                <button onClick={() => setRegisterType('hospital')} className={registerType === 'hospital' ? 'active' : ''}>Hospital Register</button>
            </div>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                {registerType === 'donor' && (
                    <>
                        <div className="form-group"><label>Name:<br /><input type="text" name="name" value={formData.name} onChange={handleChange} required /></label></div>
                        <div className="form-group"><label>Age:<br /><input type="number" name="age" value={formData.age} onChange={handleChange} required /></label></div>
                        <div className="form-group"><label>Blood Group:<br /><input type="text" name="blood_group" value={formData.blood_group} onChange={handleChange} required /></label></div>
                        <div className="form-group"><label>Weight:<br /><input type="number" name="weight" value={formData.weight} onChange={handleChange} required /></label></div>
                        <div className="form-group"><label>Email:<br /><input type="email" name="email" value={formData.email} onChange={handleChange} required /></label></div>
                        <div className="form-group"><label>Location:<br /><input type="text" name="location" value={formData.location} onChange={handleChange} required /></label></div>
                        <div className="form-group"><label>Contact:<br /><input type="text" name="contact" value={formData.contact} onChange={handleChange} required /></label></div>
                        <div className="form-group"><label>Password:<br /><input type="password" name="password" value={formData.password} onChange={handleChange} required /></label></div>
                    </>
                )}
                {registerType === 'hospital' && (
                    <>
                        <div className="form-group"><label>Hospital Name:<br /><input type="text" name="hospital_name" value={formData.hospital_name} onChange={handleChange} required /></label></div>
                        <div className="form-group"><label>Location:<br /><input type="text" name="location" value={formData.location} onChange={handleChange} required /></label></div>
                        <div className="form-group"><label>Password:<br /><input type="password" name="password" value={formData.password} onChange={handleChange} required /></label></div>
                        <div className="form-group"><label>Email:<br /><input type="email" name="email" value={formData.email} onChange={handleChange} required /></label></div>
                    </>
                )}
                <button type="submit" style={{ marginTop: '15px' }}>Register</button>
            </form>
            <p>
                Already have an account? <Link to="/">Login here</Link>
            </p>
        </div>
    );
};

export default Register;