import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setUser }) => {
    const [loginType, setLoginType] = useState('donor');
    const [contactOrName, setContactOrName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            let response;
            if (loginType === 'donor') {
                response = await axios.post('http://localhost:5000/api/donors/login', { contact: contactOrName, password });
                setUser({ ...response.data.user, type: 'donor' });
                navigate('/donordashboard');
            } else {
                response = await axios.post('http://localhost:5000/api/hospitals/login', { hospital_name: contactOrName, password });
                setUser({ ...response.data.hospital, type: 'hospital' });
                navigate('/hospitaldashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div>
            <h1 style={{color:"red", fontFamily:"Roboto"}}>Smart Blood Donation System</h1>
            <div className="container">
            <h2>Login</h2>
            <div className="tab-buttons">
                <button onClick={() => setLoginType('donor')} className={loginType === 'donor' ? 'active' : ''}>Donor Login</button>
                <button onClick={() => setLoginType('hospital')} className={loginType === 'hospital' ? 'active' : ''}>Hospital Login</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>
                        {loginType === 'donor' ? 'Contact Number:' : 'Hospital Name:'}
                        <br />
                        <input
                            type="text"
                            value={contactOrName}
                            onChange={(e) => setContactOrName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Password:<br />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                New user? <Link to="/register">Register here</Link>
            </p>
        </div>
        </div>
        
    );
};

export default Login;