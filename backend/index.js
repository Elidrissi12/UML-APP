const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/generateCode', (req, res) => {
  const { diagramData, language } = req.body;

  if (!diagramData || !language) {
    return res.status(400).json({ error: 'Missing diagram data or language.' });
  }

  try {
    const generatedCode = generateCodeFromDiagram(diagramData, language);
    res.json({ code: generatedCode });
  } catch (error) {
    res.status(500).json({ error: 'Error generating code: ' + error.message });
  }
});

const generateJavaClass = (className, attributes, methods) => {
  let code = `public class ${className} {\n`;
  attributes.forEach(attr => {
    code += `    private ${attr.type} ${attr.name};\n`;
  });
  methods.forEach(method => {
    code += `    public ${method.returnType} ${method.name}() {\n        // TODO: Implement method\n    }\n`;
  });
  code += '}\n';
  return code;
};

const generatePythonClass = (className, attributes, methods) => {
  let code = `class ${className}:\n`;
  if (attributes.length === 0 && methods.length === 0) {
    code += '    pass\n';
  } else {
    code += '    def __init__(self):\n';
    attributes.forEach(attr => {
      code += `        self.${attr.name} = None  # type: ${attr.type}\n`;
    });
    code += '\n';
    methods.forEach(method => {
      code += `    def ${method.name}(self):\n        # TODO: Implement method\n        pass\n\n`;
    });
  }
  return code;
};

const generateCodeFromDiagram = (diagramData, language) => {
  switch (language) {
    case 'Java':
      return generateJavaClass(diagramData.className, diagramData.attributes, diagramData.methods);
    case 'Python':
      return generatePythonClass(diagramData.className, diagramData.attributes, diagramData.methods);
    // Add more cases for other languages
    default:
      throw new Error(`Language ${language} is not supported.`);
  }
};

app.listen(5000, () => console.log('Server running on port 5000'));
