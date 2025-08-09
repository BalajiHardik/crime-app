import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CrimeForm({ fetchCrimes, editCrime, setEditCrime }) {
  const [criminalName, setCriminalName] = useState('');
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    if (editCrime) {
      setCriminalName(editCrime.criminalName);
      setDetails(editCrime.details);
      setStatus(editCrime.criminalStatus);
    }
  }, [editCrime]);

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    // ✅ Validation
    if (!criminalName.trim() || !details.trim()) {
      alert('Please fill in both Criminal Name and Details.');
      return;
    }

    const payload = {
      criminalName: criminalName.trim(),
      details: details.trim(),
      criminalStatus: status,
      userId: user.id,
      userEmail: user.email
    };

    if (editCrime) {
      await axios.put(`http://localhost:3001/crimes/${editCrime.id}`, payload);
      setEditCrime(null);
    } else {
      await axios.post('http://localhost:3001/crimes', payload);
    }

    // ✅ Reset form
    setCriminalName('');
    setDetails('');
    setStatus('Active');
    fetchCrimes();
  };

  return (
    <div style={styles.formContainer}>
      <input
        style={styles.input}
        placeholder="Criminal Name"
        value={criminalName}
        onChange={e => setCriminalName(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Details"
        value={details}
        onChange={e => setDetails(e.target.value)}
      />
      <select
        style={styles.input}
        value={status}
        onChange={e => setStatus(e.target.value)}
      >
        <option value="Active">Active</option>
        <option value="Arrested">Arrested</option>
        <option value="Released">Released</option>
      </select>
      <button style={styles.button} onClick={handleSubmit}>
        {editCrime ? 'Update Crime' : 'Add Crime'}
      </button>
      {editCrime && (
        <button
          style={{ ...styles.button, backgroundColor: '#6c757d' }}
          onClick={() => {
            setEditCrime(null);
            setCriminalName('');
            setDetails('');
            setStatus('Active');
          }}
        >
          Cancel Edit
        </button>
      )}
    </div>
  );
}

const styles = {
  formContainer: {
    marginBottom: '30px'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px'
  }
};

export default CrimeForm;
