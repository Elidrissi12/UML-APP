// frontend/src/components/Toolbar.js
import React from 'react';

const Toolbar = ({ onGenerateCode }) => {
  return (
    <>
    <div>
      <button onClick={() => onGenerateCode('Java')}>Generate Java Code</button>
      <button onClick={() => onGenerateCode('PHP')}>Generate PHP Code</button>
      <button onClick={() => onGenerateCode('Python')}>Generate Python Code</button>
    </div>
    </>
  );
};

export default Toolbar;
