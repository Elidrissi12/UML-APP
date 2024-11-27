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




export default Toolbar;
