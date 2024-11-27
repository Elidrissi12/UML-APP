import React, { useState } from 'react';
import './Style.css';

const Toolbar = ({ attributeList, methodList }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const onGenerateCode = (language) => {
    let code = '';

    if (language === 'Java') {
      code += 'public class MyClass {\n';
      attributeList.forEach((attr) => {
        code += `    private ${attr.type} ${attr.name};\n`;
      });
      code += '\n';
      methodList.forEach((method) => {
        code += `    public ${method.type} ${method.name}() {\n        // TODO: Implement\n    }\n`;
      });
      code += '}';
    } else if (language === 'PHP') {
      code += '<?php\n\nclass MyClass {\n';
      attributeList.forEach((attr) => {
        code += `    private $${attr.name}; // Type: ${attr.type}\n`;
      });
      code += '\n';
      methodList.forEach((method) => {
        code += `    public function ${method.name}() {\n        // TODO: Implement\n    }\n`;
      });
      code += '}';
    } else if (language === 'Python') {
      code += 'class MyClass:\n';
      code += '    def __init__(self):\n';
      attributeList.forEach((attr) => {
        code += `        self.${attr.name} = None  # Type: ${attr.type}\n`;
      });
      code += '\n';
      methodList.forEach((method) => {
        code += `    def ${method.name}(self):\n        # TODO: Implement\n        pass\n`;
      });
    }

    setGeneratedCode(code);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setGeneratedCode('');
  };

  return (
    <div>
      <button className="toolBtn" onClick={() => onGenerateCode('Java')}>
        Generate Java Code
      </button>
      <button className="toolBtn" onClick={() => onGenerateCode('PHP')}>
        Generate PHP Code
      </button>
      <button className="toolBtn" onClick={() => onGenerateCode('Python')}>
        Generate Python Code
      </button>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Generated Code</h3>
            <pre>{generatedCode}</pre>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
