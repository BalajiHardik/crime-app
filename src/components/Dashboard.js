import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CrimeForm from './CrimeForm';
import CrimeList from './CrimeList';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [crimes, setCrimes] = useState([]);
  const [editCrime, setEditCrime] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/');
    } else {
      fetchCrimes();
    }
  }, [navigate]);

  const fetchCrimes = async () => {
    const res = await axios.get('http://localhost:3001/crimes');
    setCrimes(res.data);
  };

  return (
    <div style={styles.container}>
      <h2>Crime Tracker Dashboard</h2>
      <CrimeForm
        fetchCrimes={fetchCrimes}
        editCrime={editCrime}
        setEditCrime={setEditCrime}
      />
      <CrimeList
        crimes={crimes}
        fetchCrimes={fetchCrimes}
        setEditCrime={setEditCrime}
      />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '40px auto',
    padding: '30px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'sans-serif'
  }
};

export default Dashboard;
