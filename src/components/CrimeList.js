import React from 'react';
import axios from 'axios';

function CrimeList({ crimes, fetchCrimes, setEditCrime }) {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/crimes/${id}`);
    fetchCrimes();
  };

  return (
    <div>
      <h3>All Crime Records</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.left}>Name</th>
            <th style={styles.left}>Details</th>
            <th style={styles.center}>Status</th>
            <th style={styles.left}>Added By</th>
            <th style={styles.center}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {crimes.map(c => (
            <tr key={c.id} style={styles.row}>
              <td style={styles.left}>{c.criminalName}</td>
              <td style={styles.left}>{c.details}</td>
              <td style={styles.center}>{c.criminalStatus}</td>
              <td style={styles.left}>{c.userEmail}</td>
              <td style={styles.center}>
                {c.userId === user.id && (
                  <>
                    <button style={styles.editButton} onClick={() => setEditCrime(c)}>Edit</button>
                    <button style={styles.deleteButton} onClick={() => handleDelete(c.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px'
  },
  row: {
    transition: 'background 0.3s',
    cursor: 'default'
  },
  left: {
    textAlign: 'left',
    padding: '12px',
    borderBottom: '1px solid #ddd'
  },
  center: {
    textAlign: 'center',
    padding: '12px',
    borderBottom: '1px solid #ddd'
  },
  editButton: {
    padding: '6px 10px',
    marginRight: '6px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  deleteButton: {
    padding: '6px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default CrimeList;
