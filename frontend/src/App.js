import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import DonorDashboard from './Components/DonarDashboard';
import HospitalDashboard from './Components/HospitalDashboard';
import './App.css'; 

function App() {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            user ? (
                                user.type === 'donor' ? (
                                    <Navigate to="/donordashboard" />
                                ) : (
                                    <Navigate to="/hospitaldashboard" />
                                )
                            ) : (
                                <Login setUser={setUser} />
                            )
                        }
                    />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/donordashboard"
                        element={user && user.type === 'donor' ? <DonorDashboard user={user} setUser={setUser} /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/hospitaldashboard"
                        element={user && user.type === 'hospital' ? <HospitalDashboard user={user} setUser={setUser} /> : <Navigate to="/" />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;