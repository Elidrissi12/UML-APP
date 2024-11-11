// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/generateCode', (req, res) => {
  const { diagramData, language } = req.body;
  // Implement code generation based on `diagramData` and `language`
  const generatedCode = generateCodeFromDiagram(diagramData, language);
  res.json({ code: generatedCode });
});

const generateJavaClass = (className, attributes, methods) => {
    let code = `public class ${className} {\n`;
    attributes.forEach(attr => {
      code += `    private ${attr.type} ${attr.name};\n`;
    });
    methods.forEach(method => {
      code += `    public ${method.returnType} ${method.name}() {\n        // TODO\n    }\n`;
    });
    code += '}\n';
    return code;
  };
  
  const generateCodeFromDiagram = (diagramData, language) => {
    // Process the diagramData based on the language
    if (language === 'Java') {
      return generateJavaClass(diagramData.className, diagramData.attributes, diagramData.methods);
    }
    // Implement other languages as needed
    return '';
  };
  

app.listen(5000, () => console.log('Server running on port 5000'));
