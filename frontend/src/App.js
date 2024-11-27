import logo from './logo.svg';
import './App.css';
import './components/Style.css';
import React, { useState } from 'react';
import UmlCanvas from './components/UmlCanvas';
import Toolbar from './components/Toolbar';

const App = () => {
  const [attributeList, setAttributeList] = useState([]);
  const [methodList, setMethodList] = useState([]);

  return (
    <div className="App">
      <div className='toolbarContainer'>
        <Toolbar attributeList={attributeList} methodList={methodList} />
      </div>
      <div className='umlCanvas'>
        <UmlCanvas attributeList={attributeList} methodList={methodList} />
      </div>
    </div>
  );
};

export default App;
