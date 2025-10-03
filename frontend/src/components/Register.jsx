import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();

const handleRegister = async (e) => {
  e.preventDefault();
  try {
    await api.post('auth/register', { name, email, password, dob, mobile });
    alert('Registered successfully!');
    navigate('/login');
  } catch (err) {
    console.error(err.response?.data); // show backend error
    alert(err.response?.data?.message || 'Error registering user!');
  }
};

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3"><label>Name</label><input type="text" className="form-control" value={name} onChange={e=>setName(e.target.value)} required/></div>
        <div className="mb-3"><label>Email</label><input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
        <div className="mb-3"><label>Password</label><input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} required/></div>
        <div className="mb-3"><label>Date of Birth</label><input type="date" className="form-control" value={dob} onChange={e=>setDob(e.target.value)} required/></div>
        <div className="mb-3"><label>Mobile</label><input type="text" className="form-control" value={mobile} onChange={e=>setMobile(e.target.value)} required/></div>
        <button className="btn btn-success">Register</button>
      </form>
    </div>
  );
}
