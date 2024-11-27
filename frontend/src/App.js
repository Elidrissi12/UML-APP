import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';
import UmlCanvas from './components/UmlCanvas';
import Toolbar from './components/Toolbar';

const App = () => {
  // Function to handle code generation
  const handleGenerateCode = async (language) => {
    const diagramData = {}; // Collect data from JointJS graph
    try {
      const response = await axios.post('http://localhost:5000/api/generateCode', {
        diagramData,
        language,
      });
      console.log('Generated Code:', response.data.code);
    } catch (error) {
      console.error('Error generating code:', error);
    }
  };

  return (
    <div className="App">
      <div className='toolbar'>
      </div>
      <div className='umlCanvas'> 
      <UmlCanvas />
      </div>
      <div>
      <Toolbar onGenerateCode={handleGenerateCode} />
      </div>
    </div>
  );
};


export default App;
