import React from 'react';


const Toolbar = ({ onGenerateCode }) => {
  return (
    <div style={styles.toolbarContainer}>
      <button style={styles.button} onClick={() => onGenerateCode('Java')}>
        Generate Java Code
      </button>
      <button style={styles.button} onClick={() => onGenerateCode('PHP')}>
        Generate PHP Code
      </button>
      <button style={styles.button} onClick={() => onGenerateCode('Python')}>
        Generate Python Code
      </button>
    </div>
  );
};


const styles = {
  toolbarContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#f4f4f4',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  button: {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px 20px',
    margin: '0 5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};


const styles = {
  toolbarContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#f4f4f4',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  button: {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px 20px',
    margin: '0 5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default Toolbar;
