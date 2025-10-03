import React, { useState, useEffect } from 'react';
import api from '../api/api';
import Illustration from './Illustration';

export default function PolicyCalc() {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await api.get('/policies'); // API should return array of policies
        setPolicies(res.data);
      } catch (err) {
        console.error('Error fetching policies:', err);
      }
    };
    fetchPolicies();
  }, []);

  const handleSelect = (e) => {
    const policy = JSON.parse(e.target.value);
    setSelectedPolicy(policy);
  };

  return (
    <div className="container mt-5">
      <h2>Policy Calculation</h2>
      <div className="mb-3">
        <label>Select Policy</label>
        <select className="form-select" onChange={handleSelect}>
          <option value="">--Select--</option>
          {policies.map(p => (
            <option key={p.id} value={JSON.stringify(p)}>
              {p.name} ({p.code})
            </option>
          ))}
        </select>
      </div>

      {selectedPolicy && <Illustration policy={selectedPolicy} />}
    </div>
  );
}
