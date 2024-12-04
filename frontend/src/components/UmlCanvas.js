import React, { useEffect, useState } from 'react';
import {dia, shapes } from 'jointjs';
import './Style.css';
    const UmlCanvas = () => {
        const [selectedClass, setSelectedClass] = useState(null); // For editing/deleting
        const [graph, setGraph] = useState(null);
        const [paper, setPaper] = useState(null);
        const [classes, setClasses] = useState([]);
        const [className, setClassName] = useState('');
        const [sourceClassId, setSourceClassId] = useState(null);
        const [targetClassId, setTargetClassId] = useState(null);
        const [relationshipType, setRelationshipType] = useState('Association');
        const [sourceCardinality, setSourceCardinality] = useState('');
        const [targetCardinality, setTargetCardinality] = useState('');
        const [attributeName, setAttributeName] = useState('');
        const [attributeType, setAttributeType] = useState('');
        const [attributeList, setAttributeList] = useState([]);
        const [methodName, setMethodName] = useState('');
        const [methodType, setMethodType] = useState('');
        const [methodList, setMethodList] = useState([]);
        const [showPopup, setShowPopup] = useState(false);
        const [popupMode, setPopupMode] = useState('');
        const [showDeletePopup, setShowDeletePopup] = useState(false);
        const [selectedClassToDelete, setSelectedClassToDelete] = useState(null);
        const [generatedCode, setGeneratedCode] = useState('');
        const [showPopup1, setShowPopup1] = useState(false);
        useEffect(() => {
            const newGraph = new dia.Graph();
            setGraph(newGraph);
    
            const newPaper = new dia.Paper({
                el: document.getElementById('canvas'),
                model: newGraph,
                width: 800,
                height: 600,
                gridSize: 1,
                interactive: true,
            });
            setPaper(newPaper);
            newPaper.on('cell:pointerdblclick', (cellView) => {
                const cell = cellView.model;
                if (cell.isElement()) {
                    setSelectedClass(cell);
                    setClassName(cell.get('name') || '');
    
                    const attributes = (cell.get('attributes') || []).map(attr => {
                        const [name, type] = attr.split(': ');
                        return { name, type };
                    });
                    setAttributeList(attributes);
    
                    const methods = (cell.get('methods') || []).map(method => {
                        const [name, type] = method.split('(): ');
                        return { name, type };
                    });
                    setMethodList(methods);
    
                    setPopupMode('edit');
                    // extractCanvasData(newPaper);
                    setShowPopup(true);
                }
            });
        }, []);
        const fetchDataFromPaper = () => {
            if (!paper) {
              console.error('Paper is not initialized.');
              return [];
            }
          
            const graph = paper.model;
            const elements = graph.getElements();
          
            const classes = elements.map((element) => {
              const className = element.get('name') || 'UnnamedClass';
              const attrs = element.get('attributes') || [];
              const meths = element.get('methods') || [];
          
              const attributes = attrs.map((attr) => {
                if (typeof attr === 'string') {
                  const [name, type] = attr.split(': ').map((v) => v.trim());
                  return { name: name || 'UnnamedAttribute', type: type || 'Object' };
                } else if (typeof attr === 'object') {
                  return { name: attr.name || 'UnnamedAttribute', type: attr.type || 'Object' };
                }
                return { name: 'UnnamedAttribute', type: 'Object' };
              });
          
              const methods = meths.map((method) => {
                if (typeof method === 'string') {
                  const [name, type] = method.split('(): ').map((v) => v.trim());
                  return { name: name || 'UnnamedMethod', type: type || 'void' };
                } else if (typeof method === 'object') {
                  return { name: method.name || 'UnnamedMethod', type: method.type || 'void' };
                }
                return { name: 'UnnamedMethod', type: 'void' };
              });
          
              return { className, attributes, methods };
            });
          
            return classes;
          };
          
          
          
          const onGenerateCode = (language) => {
            const classes = fetchDataFromPaper();
          
            if (!classes.length) {
              alert('No classes found to generate code.');
              return;
            }
          
            let code = '';
          
            classes.forEach(({ className, attributes, methods }) => {
              if (language === 'Java') {
                code += `public class ${className} {\n`;
                attributes.forEach((attr) => {
                  code += `    private ${attr.type} ${attr.name};\n`;
                });
                code += '\n';
                methods.forEach((method) => {
                  code += `    public ${method.type} ${method.name}() {\n        // TODO: Implement\n    }\n`;
                });
                code += '}\n\n';
              } else if (language === 'PHP') {
                code += `<?php\n\nclass ${className} {\n`;
                attributes.forEach((attr) => {
                  code += `    private $${attr.name}; // Type: ${attr.type}\n`;
                });
                code += '\n';
                methods.forEach((method) => {
                  code += `    public function ${method.name}() {\n        // TODO: Implement\n    }\n`;
                });
                code += '}\n\n';
              } else if (language === 'Python') {
                code += `class ${className}:\n`;
                code += '    def __init__(self):\n';
                attributes.forEach((attr) => {
                  code += `        self.${attr.name} = None  # Type: ${attr.type}\n`;
                });
                code += '\n';
                methods.forEach((method) => {
                  code += `    def ${method.name}(self):\n        # TODO: Implement\n        pass\n`;
                });
                code += '\n\n';
              }
            });
          
            setGeneratedCode(code.trim());
            setShowPopup1(true);
          };
          
          
          
        
          // Close the popup
          const closePopup = () => {
            setShowPopup1(false);
            setGeneratedCode('');
          };
        const addAttribute = () => {
            if (!attributeName || !attributeType) {
                alert("Both name and type are required for an attribute.");
                return;
            }
            setAttributeList(prev => [...prev, { name: attributeName, type: attributeType }]);
            setAttributeName('');
            setAttributeType('');
        };
        

        const addMethod = () => {
            if (!methodName || !methodType) {
                alert("Both name and type are required for a method.");
                return;
            }
            setMethodList((prev) => [...prev, { name: methodName, type: methodType }]);
            setMethodName('');
            setMethodType('');
        };        
        

        const addClass = () => {
            if (!className) return alert("Class name is required.");
        
            const umlClass = new shapes.uml.Class({
                position: { x: Math.random() * 600, y: Math.random() * 400 },
                size: { width: 200, height: 100 },
                name: className,
                attributes: attributeList.map(attr => `${attr.name}: ${attr.type}`),
                methods: methodList.map((method) => `${method.name}(): ${method.type}`),
            });
        
            graph.addCell(umlClass);
            setClasses(prev => [...prev, umlClass]);
            resetClassInputs();
        };        
    
        const resetClassInputs = () => {
            setClassName('');
            setMethodList([]);
            setAttributeList([]);
            setAttributeName('');
            setAttributeType('');
            setMethodName('');
            setMethodType('');
        };
        const saveEdits = () => {
            if (selectedClass) {
                // Update the attributes and methods of the selected class
                selectedClass.set({
                    name: className,
                    attributes: attributeList.map((attr) => `${attr.name}: ${attr.type}`),
                    methods: methodList.map((method) => `${method.name}(): ${method.type}`),
                });
        
                // Rerender the text in the element (if necessary)
                const text = `
                    <<${className}>>\n
                    ${attributeList.map((attr) => `${attr.name}: ${attr.type}`).join('\n')}\n
                    ${methodList.map((method) => `${method.name}(): ${method.type}`).join('\n')}
                `;
                selectedClass.attr('label/text', text);
        
            setShowPopup(false);
            resetClassInputs(false);
        };
        }
        const updateAttribute = (index, key, value) => {
            const updatedAttributes = [...attributeList];
            updatedAttributes[index][key] = value;
            setAttributeList(updatedAttributes);
        };
        
        const updateMethod = (index, key, value) => {
            const updatedMethods = [...methodList];
            updatedMethods[index][key] = value;
            setMethodList(updatedMethods);
        };
        
    
        const handlePopupClose = () => {
            setShowPopup(false);
            resetClassInputs(false);
        };
        const handleDeleteClick = (classToDelete) => {
            setSelectedClassToDelete(classToDelete);
            setShowDeletePopup(true); // Show the confirmation popup
        };
    
        const confirmDelete = () => {
            if (selectedClassToDelete) {
                // Perform the delete action
                graph.removeCells([selectedClassToDelete]);
            }
            setShowDeletePopup(false);
            setShowPopup(false);
            resetClassInputs(false);
            setSelectedClassToDelete(null);
        };
    
        const cancelDelete = () => {
            setShowDeletePopup(false); // Close the popup without deleting
            setSelectedClassToDelete(null);
        };
        const deleteAttribute = (index) => {
            setAttributeList((prev) => prev.filter((_, i) => i !== index));
        };
        
        const deleteMethod = (index) => {
            setMethodList((prev) => prev.filter((_, i) => i !== index));
        };
        
        const addRelationship = () => {
            if (!sourceClassId || !targetClassId) {
                return alert("Please select both source and target classes.");
            }
        
            const sourceClass = graph.getCell(sourceClassId);
            const targetClass = graph.getCell(targetClassId);
        
            if (sourceClass && targetClass) {
                const link = new shapes.standard.Link();
                link.source(sourceClass);
                link.target(targetClass);
        
                // Set the style based on the relationship type
                setLinkStyle(link, relationshipType);
        
                link.appendLabel({
                    attrs: {
                        text: {
                            text: sourceCardinality || '1',
                            fill: 'black',
                        },
                    },
                    position: {
                        distance: 0.2,
                        offset: { x: -10, y: -10 },
                    },
                });
        
                link.appendLabel({
                    attrs: {
                        text: {
                            text: targetCardinality || '1',
                            fill: 'black',
                        },
                    },
                    position: {
                        distance: 0.8,
                        offset: { x: 10, y: 10 },
                    },
                });
        
                link.addTo(graph);
            }
        };
        
        

       const setLinkStyle = (link) => {
        const commonStyles = {
            stroke: 'black',
            'stroke-width': 2,
        };
        
        switch (relationshipType) {
            case 'Directed Association':
                    link.attr({
                        line: {
                            stroke: '#000',                  // Solid black line for association
                            'stroke-width': 2,               // Standard line width
                            'target-marker': {
                                type: 'path',
                                d: 'M 10 -5 0 0 10 5 z',     // Simple arrowhead shape for directed association
                                fill: '#000',                // Solid fill for the arrowhead
                                stroke: '#000',              // Black stroke color to match line color
                                'stroke-width': 2,           // Standard border width for the marker
                            },
                        },
                    });
                    break;
            case 'Composition':
                    link.attr({
                        line: {
                            stroke: '#4b0082', // Use a custom color for the line
                            'stroke-width': 3, // Increase the width of the line
                            'stroke-dasharray': '5, 5', // Dashed line for emphasis
                            'target-marker': {
                                type: 'path',
                                d: 'M 15 -7.5 0 0 15 7.5 30 0 z', // Larger diamond path
                                fill: '#4b0082', // Solid fill to match line color
                                stroke: '#4b0082',
                                'stroke-width': 2, // Border of the marker
                            },
                        },
                    });
                    
                
                
                break;
            case 'Aggregation':
                    link.attr({
                        line: {
                            stroke: '#00008b', // Set to a deep blue color for contrast
                            'stroke-width': 2, // Slightly thinner line
                            'stroke-dasharray': '3, 3', // Dashed line for visual distinction
                            'target-marker': {
                                type: 'path',
                                d: 'M 15 -7.5 0 0 15 7.5 30 0 z', // Larger diamond path for better visibility
                                fill: 'none', // No fill for a hollow effect
                                stroke: '#00008b', // Match stroke color with the line
                                'stroke-width': 2, // Border width for the marker
                            },
                        },
                    });
                    break;
            case 'Dependency':
                    link.attr({
                        line: {
                            stroke: '#00008b',               // Set to a deep blue color for contrast
                            'stroke-width': 1.5,             // Thinner line for a lighter visual impact
                            'stroke-dasharray': '3, 3',      // Dashed line to signify dependency
                            'target-marker': {
                                type: 'path',
                                d: 'M 10 -5 0 0 10 5 z',     // Simple arrowhead for dependency
                                fill: '#00008b',             // Fill to match the line color
                                stroke: '#00008b',           // Same color as the line
                                'stroke-width': 1.5,         // Consistent border width for the marker
                            },
                        },
                    });
                    break;
            case 'Realization':
                    link.attr({
                        line: {
                            stroke: '#00008b',               // Set to a deep blue color for contrast
                            'stroke-width': 1.5,             // Thinner line for a lighter visual impact
                            'stroke-dasharray': '5, 5',      // Dashed line to represent a realization
                            'target-marker': {
                                type: 'path',
                                d: 'M 10 -5 0 0 10 5 z',     // Hollow triangle path for realization
                                fill: 'none',                // Hollow fill to indicate an interface implementation
                                stroke: '#00008b',           // Match stroke color with the line
                                'stroke-width': 1.5,         // Thin border for the arrow
                            },
                        },
                    });
                    break;
            case 'Inheritance':
                    link.attr({
                        line: {
                            stroke: '#000',                  // Solid black line for inheritance
                            'stroke-width': 2,               // Standard width for a solid line
                            'target-marker': {
                                type: 'path',
                                d: 'M 10 -5 0 0 10 5 z',     // Hollow triangle path for inheritance
                                fill: 'none',                // No fill to make the triangle hollow
                                stroke: '#000',              // Black stroke color to match line color
                                'stroke-width': 2,           // Standard border width for the marker
                            },
                        },
                    });                             
                    break;
                                
                    
                
            case 'Association':
            default:
                link.attr({
                    line: {
                        ...commonStyles,
                        'target-marker': null,
                    },
                });
                break;
        }
    };
         return (
            <>
                <div className="toolbarContainer">
                    <button className="toolBtn" onClick={() => onGenerateCode('Java')}>
                        Generate Java Code
                    </button>
                    <button className="toolBtn" onClick={() => onGenerateCode('PHP')}>
                        Generate PHP Code
                    </button>
                    <button className="toolBtn" onClick={() => onGenerateCode('Python')}>
                        Generate Python Code
                    </button>
                    </div>
                    {showPopup1 && (
                        <div className="popup1">
                            <div className="popup-content1">
                                <h3>Generated Code</h3>
                                <pre className="code-preview">{generatedCode}</pre>
                                <button className="close-button" onClick={closePopup}>Close</button>
                            </div>
                        </div>
                    )}

            <div className='form-container'>
            <div className="cont1">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Class Name"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                    />
                    <button onClick={addClass}>Add Class</button>
                </div>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Attribute Name"
                        value={attributeName}
                        onChange={(e) => setAttributeName(e.target.value)}
                    />
                    <select
                        value={attributeType}
                        onChange={(e) => setAttributeType(e.target.value)}
                    >
                        <option value="" disabled>Select Attribute Type</option>
                        <option value="String">String</option>
                        <option value="int">int</option>
                        <option value="Boolean">Boolean</option>
                        <option value="double">double</option>
                        <option value="Date">Date</option>
                    </select>
                    <button onClick={addAttribute}>Add Attribute</button>
                </div>
                <div>
                    <ul>
                        {attributeList.map((attr, index) => (
                            <li key={index}>
                                {attr.name}: {attr.type}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Method Name"
                        value={methodName}
                        onChange={(e) => setMethodName(e.target.value)}
                    />
                    <select
                        value={methodType}
                        onChange={(e) => setMethodType(e.target.value)}
                    >
                        <option value="" disabled>Select Return Type</option>
                        <option value="String">String</option>
                        <option value="int">int</option>
                        <option value="Boolean">boolean</option>
                        <option value="double">double</option>
                        <option value="void">void</option>
                    </select>
                    <button onClick={addMethod}>Add Method</button>
                </div>
            <div>
                <ul>
                    {methodList.map((method, index) => (
                        <li key={index}>
                            {method.name}(): {method.type}
                        </li>
                    ))}
                </ul>
            </div>
            </div>
            <div className='cont2'>
                <div className="input-group">
                    <select onChange={(e) => setSourceClassId(e.target.value)} value={sourceClassId}>
                        <option value="">Select Source Class</option>
                        {classes.map(cls => (
                            <option key={cls.id} value={cls.id}>
                                {cls.attributes.name}
                            </option>
                        ))}
                    </select>
                    <select onChange={(e) => setTargetClassId(e.target.value)} value={targetClassId}>
                        <option value="">Select Target Class</option>
                        {classes.map(cls => (
                            <option key={cls.id} value={cls.id}>
                                {cls.attributes.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Source Cardinality"
                        value={sourceCardinality}
                        onChange={(e) => setSourceCardinality(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Target Cardinality"
                        value={targetCardinality}
                        onChange={(e) => setTargetCardinality(e.target.value)}
                    />
                    <select onChange={(e) => setRelationshipType(e.target.value)} value={relationshipType}>
                        <option value="Association">Association</option>
                        <option value="Inheritance">Inheritance</option>
                        <option value="Composition">Composition</option>
                        <option value="Aggregation">Aggregation</option>
                        <option value="Dependency">Dependency</option>
                        <option value="Realization">Realization</option>
                        <option value="Directed Association">Directed Association</option>
                    </select>
                    <button onClick={addRelationship}>Add Relationship</button>
                
                </div>
            </div>
            <div className="canvas-container">
            <div className="canvas-title">UML Diagram Canvas</div>
            <div id="canvas" style={{ height: '100%', width: '100%' }}>
            </div>
        </div>
        {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                    <button id="delete" onClick={() => handleDeleteClick(selectedClass)}>
                    Delete
                </button>
                {showDeletePopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Confirm Deletion</h3>
                        <p>Are you sure you want to delete this class?</p>
                        <div className="popup-footer">
                            <button onClick={confirmDelete} className="confirm-button">
                                Yes, Delete
                            </button>
                            <button onClick={cancelDelete} className="cancel-button">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
                        <h3>{popupMode === 'edit' ? 'Edit Class' : 'Delete Class'}</h3>
                        {popupMode === 'edit' ? (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Class Name"
                                    value={className}
                                    onChange={(e) => setClassName(e.target.value)}
                                />
                                <div>
                                <hr></hr>
                                    <h4>Attributes</h4>
                                    {attributeList.map((attr, index) => (
                                        <div key={`attr-${index}`} className="inputs">
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                value={attr.name}
                                                onChange={(e) => updateAttribute(index, 'name', e.target.value)}
                                            />
                                            <select
                                                value={attr.type}
                                                onChange={(e) => updateAttribute(index, 'type', e.target.value)}
                                            >
                                                <option value="">-- Select Type --</option>
                                                <option value="String">String</option>
                                                <option value="int">int</option>
                                                <option value="Boolean">Boolean</option>
                                                <option value="double">double</option>
                                                <option value="Date">Date</option>
                                            </select>
                                            <button onClick={() => deleteAttribute(index)} id="delete-button">
                                            <ion-icon name="trash-outline"></ion-icon>
                                            </button>
                                        </div>
                                    ))}
                                <div>
                                    <hr></hr>
                                    <h4>Methods</h4>
                                    {methodList.map((method, index) => (
                                        <div key={`method-${index}`} className="inputs">
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                value={method.name}
                                                onChange={(e) => updateMethod(index, 'name', e.target.value)}
                                            />
                                            <select
                                                value={method.type}
                                                onChange={(e) => updateMethod(index, 'type', e.target.value)}
                                            >
                                                <option value="" disabled>Select Return Type</option>
                                                <option value="String">String</option>
                                                <option value="int">int</option>
                                                <option value="Boolean">boolean</option>
                                                <option value="double">double</option>
                                                <option value="void">void</option>
                                            </select>
                                            <button onClick={() => deleteMethod(index)} id="delete-button">
                                            <ion-icon name="trash-outline"></ion-icon>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                </div>
                                <button onClick={saveEdits} id='save'>Save</button>
                                <button onClick={handlePopupClose} id='close'>Close</button>
                            </div>
                        ):(
                            <h1>Hello</h1>
                        )}
                    </div>
                </div>
            )}
        </div>
        </>
        );
    };
        

export default UmlCanvas;
