import React from 'react';


const Toolbar = ({ onGenerateCode }) => {
  return (
    <div className='toolbarContainer'>
      <button className='toolBtn' onClick={() => onGenerateCode('Java')}>
        Generate Java Code
      </button>
      <button className='toolBtn' onClick={() => onGenerateCode('PHP')}>
        Generate PHP Code
      </button>
      <button className='toolBtn' onClick={() => onGenerateCode('Python')}>
        Generate Python Code
      </button>
    </div>
  );
};




export default Toolbar;
