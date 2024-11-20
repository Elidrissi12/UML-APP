    import React, { useEffect, useState } from 'react';
    import { dia, shapes } from 'jointjs';

    const UmlCanvas = () => {
        const [graph, setGraph] = useState(null);
        const [paper, setPaper] = useState(null);
        const [classes, setClasses] = useState([]);
        const [className, setClassName] = useState('');
        const [attributes, setAttributes] = useState('');
        const [methods, setMethods] = useState('');
        const [sourceClassId, setSourceClassId] = useState(null);
        const [targetClassId, setTargetClassId] = useState(null);
        const [relationshipType, setRelationshipType] = useState('Association');
        const [sourceCardinality, setSourceCardinality] = useState('');
        const [targetCardinality, setTargetCardinality] = useState('');
        const [generatedCode, setGeneratedCode] = useState('');
        const [attributeName, setAttributeName] = useState('');
        const [attributeType, setAttributeType] = useState('');
        const [attributeList, setAttributeList] = useState([]);

        
        useEffect(() => {
            const newGraph = new dia.Graph();
            const newPaper = new dia.Paper({
                el: document.getElementById('canvas'),
                model: newGraph,
                width: 800,
                height: 600,
                gridSize: 10,
            });

            setGraph(newGraph);
            setPaper(newPaper);
        }, []);

        const addAttribute = () => {
            if (!attributeName || !attributeType) {
                alert("Both name and type are required for an attribute.");
                return;
            }
            setAttributeList(prev => [...prev, { name: attributeName, type: attributeType }]);
            setAttributeName('');
            setAttributeType('');
        };
        

        const addClass = () => {
            if (!className) return alert("Class name is required.");
        
            const umlClass = new shapes.uml.Class({
                position: { x: Math.random() * 600, y: Math.random() * 400 },
                size: { width: 200, height: 100 },
                name: className,
                attributes: attributeList.map(attr => `${attr.name}: ${attr.type}`),
                methods: methods.split(',').map(method => method.trim()).filter(method => method),
            });
        
            graph.addCell(umlClass);
            setClasses(prev => [...prev, umlClass]);
            resetClassInputs();
        };
        

        const resetClassInputs = () => {
            setClassName('');
            setMethods('');
            setAttributeList([]);
            setAttributeName('');
            setAttributeType('');
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
                setLinkStyle(link);

            // Set cardinalities as labels on each end of the link
            link.appendLabel({
                attrs: {
                    text: {
                        text: sourceCardinality || '1', // Source cardinality
                        fill: 'black',
                    },
                },
                position: {
                    distance: 0.2, // Position of source cardinality
                    offset: { x: -10, y: -10 },
                },
            });

            link.appendLabel({
                attrs: {
                    text: {
                        text: targetCardinality || '1', // Target cardinality
                        fill: 'black',
                    },
                },
                position: {
                    distance: 0.8, // Position of target cardinality
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

        const handleGenerateCode = async () => {
            const diagramData = {
                classes: classes.map(cls => ({
                    name: cls.attributes.name,
                    attributes: cls.attributes.attributes,
                    methods: cls.attributes.methods,
                })),
            };

            try {
                const response = await fetch('http://localhost:5000/api/generateCode', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        diagramData: diagramData,
                        language: 'Java',
                    }),
                });

                if (!response.ok) throw new Error('Failed to generate code');

                const result = await response.json();
                alert(result.code);
            } catch (error) {
                console.error("Error generating code:", error);
                alert("An error occurred while generating code.");
            }
        };


        
        
         return (
            
            <div className="container">
                {/* Class input fields */}
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Class Name"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Attributes (comma-separated)"
                        value={attributes}
                        onChange={(e) => setAttributes(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Methods (comma-separated)"
                        value={methods}
                        onChange={(e) => setMethods(e.target.value)}
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
    <input
        type="text"
        placeholder="Attribute Type"
        value={attributeType}
        onChange={(e) => setAttributeType(e.target.value)}
    />
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

    
                {/* Relationship input fields with cardinalities */}
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
    
                    {/* Cardinality inputs */}
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
    
                {/* Canvas for UML Diagram */}
                <div className="canvas-container">
                    <div className="canvas-title">UML Diagram Canvas</div>
                    <div id="canvas" style={{ height: '100%', width: '100%' }}></div>
                </div>
            </div>
        );
    };
        

    export default UmlCanvas;
