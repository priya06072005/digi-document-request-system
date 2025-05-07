import React, { useEffect, useState } from 'react';
import profileImage from "./profile.jpeg";

const UserDashboard = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userData = JSON.parse(userString);
      setLoggedInUser(userData);
    }
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>User Dashboard</h1>

      <div style={styles.contentWrapper}>
        {/* DigiDoc Information Section */}
        <div style={styles.leftSection}>
          <h2 style={styles.digiDocTitle}>Welcome to DigiDoc</h2>
          <p style={styles.digiDocText}>
            DigiDoc is a Smart Document Request and Management System built with cutting-edge technologies
            including AI and OCR. It allows users to request documents like Bonafide, Study Certificates, and Transfer Certificates seamlessly.
          </p>
          <ul style={styles.featureList}>
            <li>📄 Upload and request official documents</li>
            <li>🔍 Real-time document status tracking</li>
            <li>🤖 AI-powered verification and classification</li>
            <li>📧 Automated email notifications</li>
            <li>🛡️ Secure and fraud detection mechanisms</li>
          </ul>
        </div>

        {/* User Card Section */}
        <div style={styles.rightSection}>
          {loggedInUser && (
            <div style={styles.card}>
              <img src={profileImage} alt="Profile" style={styles.profileImage} />
              <h2 style={styles.subHeader}>Logged-in User</h2>
              <p style={styles.text}><strong>Name:</strong> {loggedInUser.username}</p>
              <p style={styles.text}><strong>Email:</strong> {loggedInUser.email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f9',
    minHeight: '100vh',
  },
  header: {
    color: '#333',
    borderBottom: '2px solid #ddd',
    paddingBottom: '0.5rem',
    marginBottom: '1rem',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  leftSection: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  rightSection: {
    width: '350px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '1.5rem',
    textAlign: 'center',
  },
  profileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '1rem',
    border: '2px solid #ddd',
    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
  },
  subHeader: {
    color: '#555',
    marginBottom: '1rem',
  },
  text: {
    color: '#666',
    lineHeight: '1.6',
  },
  digiDocTitle: {
    fontSize: '1.5rem',
    color: '#222',
    marginBottom: '1rem',
  },
  digiDocText: {
    color: '#444',
    lineHeight: '1.6',
    marginBottom: '1rem',
  },
  featureList: {
    color: '#444',
    paddingLeft: '1rem',
    lineHeight: '1.8',
  },
};

export default UserDashboard;
