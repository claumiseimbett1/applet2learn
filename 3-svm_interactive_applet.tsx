import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Plus, Minus, Info } from 'lucide-react';

const SVMApplet = () => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [currentClass, setCurrentClass] = useState(1);
  const [svmResult, setSvmResult] = useState(null);
  const [isTraining, setIsTraining] = useState(false);
  const [showMargin, setShowMargin] = useState(true);
  const [showSupportVectors, setShowSupportVectors] = useState(true);
  const [C, setC] = useState(1.0);
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const canvasWidth = 500;
  const canvasHeight = 400;

  // Función para añadir puntos al hacer clic
  const addPoint = (e) => {
    if (isTraining) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / canvasWidth;
    const y = (e.clientY - rect.top) / canvasHeight;
    
    const newPoint = { x, y, class: currentClass, id: Date.now() };
    setPoints([...points, newPoint]);
  };

  // Algoritmo SVM simplificado (2D)
  const trainSVM = () => {
    if (points.length < 2) return;
    
    setIsTraining(true);
    
    // Separar por clases
    const class1Points = points.filter(p => p.class === 1);
    const class2Points = points.filter(p => p.class === -1);
    
    if (class1Points.length === 0 || class2Points.length === 0) {
      setIsTraining(false);
      alert('Necesitas puntos de ambas clases para entrenar el SVM');
      return;
    }

    console.log('Entrenando SVM con:', class1Points.length, 'puntos clase +1 y', class2Points.length, 'puntos clase -1');

    // Implementación simplificada de SVM para visualización
    let bestW = { x: 1, y: 0 };
    let bestB = 0;
    let maxMargin = 0;
    let supportVectors = [];
    let foundSeparation = false;
    
    // Búsqueda de hiperplano óptimo (simplificada)
    for (let angle = 0; angle < Math.PI * 2; angle += 0.05) {
      const w = { x: Math.cos(angle), y: Math.sin(angle) };
      
      // Para cada orientación, encontrar el mejor sesgo
      let bestBForAngle = 0;
      let bestMarginForAngle = 0;
      let validSeparation = false;
      
      // Probar diferentes valores de sesgo
      for (let bTest = -2; bTest <= 2; bTest += 0.1) {
        let correctClass1 = 0;
        let correctClass2 = 0;
        let minDistClass1 = Infinity;
        let minDistClass2 = Infinity;
        
        // Verificar clasificación correcta para clase +1
        class1Points.forEach(p => {
          const value = w.x * p.x + w.y * p.y + bTest;
          if (value > 0) correctClass1++;
          minDistClass1 = Math.min(minDistClass1, Math.abs(value));
        });
        
        // Verificar clasificación correcta para clase -1
        class2Points.forEach(p => {
          const value = w.x * p.x + w.y * p.y + bTest;
          if (value < 0) correctClass2++;
          minDistClass2 = Math.min(minDistClass2, Math.abs(value));
        });
        
        // Si clasifica correctamente todos los puntos
        if (correctClass1 === class1Points.length && correctClass2 === class2Points.length) {
          const margin = Math.min(minDistClass1, minDistClass2);
          if (margin > bestMarginForAngle) {
            bestMarginForAngle = margin;
            bestBForAngle = bTest;
            validSeparation = true;
          }
        }
      }
      
      // Si encontramos una separación válida mejor que la actual
      if (validSeparation && bestMarginForAngle > maxMargin) {
        maxMargin = bestMarginForAngle;
        bestW = { x: w.x, y: w.y };
        bestB = bestBForAngle;
        foundSeparation = true;
        
        console.log('Nueva mejor separación:', 'ángulo:', angle, 'margen:', maxMargin);
      }
    }
    
    if (!foundSeparation) {
      alert('No se pudo encontrar una separación lineal perfecta. Intenta con puntos más separados.');
      setIsTraining(false);
      return;
    }
    
    // Encontrar vectores de soporte
    supportVectors = [];
    const tolerance = maxMargin * 0.1; // 10% de tolerancia
    
    points.forEach(p => {
      const distance = Math.abs(bestW.x * p.x + bestW.y * p.y + bestB);
      if (Math.abs(distance - maxMargin) <= tolerance) {
        supportVectors.push(p);
      }
    });
    
    console.log('SVM entrenado:', {
      w: bestW,
      b: bestB,
      margin: maxMargin,
      supportVectors: supportVectors.length
    });
    
    setSvmResult({
      w: bestW,
      b: bestB,
      margin: maxMargin,
      supportVectors: supportVectors
    });
    
    setIsTraining(false);
  };

  // Función de dibujo
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Dibujar grid
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = (i / 10) * canvasWidth;
      const y = (i / 10) * canvasHeight;
      
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasHeight);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasWidth, y);
      ctx.stroke();
    }
    
    // Dibujar hiperplano y márgenes
    if (svmResult && showMargin) {
      const { w, b, margin } = svmResult;
      
      // Evitar división por cero
      if (Math.abs(w.y) < 0.001) {
        // Línea casi vertical
        const x = -b / w.x;
        
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x * canvasWidth, 0);
        ctx.lineTo(x * canvasWidth, canvasHeight);
        ctx.stroke();
        
        // Márgenes
        if (showMargin) {
          ctx.strokeStyle = '#60a5fa';
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          
          const marginOffset = margin / Math.abs(w.x);
          
          ctx.beginPath();
          ctx.moveTo((x + marginOffset) * canvasWidth, 0);
          ctx.lineTo((x + marginOffset) * canvasWidth, canvasHeight);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo((x - marginOffset) * canvasWidth, 0);
          ctx.lineTo((x - marginOffset) * canvasWidth, canvasHeight);
          ctx.stroke();
          
          ctx.setLineDash([]);
        }
      } else {
        // Línea normal: wx + wy + b = 0 -> y = (-wx - b) / wy
        const y1 = (-w.x * 0 - b) / w.y;
        const y2 = (-w.x * 1 - b) / w.y;
        
        // Hiperplano principal
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, y1 * canvasHeight);
        ctx.lineTo(canvasWidth, y2 * canvasHeight);
        ctx.stroke();
        
        // Márgenes
        if (showMargin) {
          ctx.strokeStyle = '#60a5fa';
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          
          // Margen superior: wx + wy + b = +margin
          const y1_upper = (-w.x * 0 - b + margin) / w.y;
          const y2_upper = (-w.x * 1 - b + margin) / w.y;
          ctx.beginPath();
          ctx.moveTo(0, y1_upper * canvasHeight);
          ctx.lineTo(canvasWidth, y2_upper * canvasHeight);
          ctx.stroke();
          
          // Margen inferior: wx + wy + b = -margin
          const y1_lower = (-w.x * 0 - b - margin) / w.y;
          const y2_lower = (-w.x * 1 - b - margin) / w.y;
          ctx.beginPath();
          ctx.moveTo(0, y1_lower * canvasHeight);
          ctx.lineTo(canvasWidth, y2_lower * canvasHeight);
          ctx.stroke();
          
          ctx.setLineDash([]);
        }
      }
    }
    
    // Dibujar puntos
    points.forEach(point => {
      const x = point.x * canvasWidth;
      const y = point.y * canvasHeight;
      
      // Determinar si es vector de soporte
      const isSupportVector = svmResult && showSupportVectors && 
        svmResult.supportVectors.some(sv => sv.id === point.id);
      
      if (point.class === 1) {
        ctx.fillStyle = '#ef4444';
        ctx.strokeStyle = isSupportVector ? '#000000' : '#ef4444';
      } else {
        ctx.fillStyle = '#3b82f6';
        ctx.strokeStyle = isSupportVector ? '#000000' : '#3b82f6';
      }
      
      ctx.lineWidth = isSupportVector ? 3 : 1;
      
      ctx.beginPath();
      if (point.class === 1) {
        // Círculos para clase 1
        ctx.arc(x, y, 8, 0, Math.PI * 2);
      } else {
        // Cuadrados para clase -1
        ctx.rect(x - 8, y - 8, 16, 16);
      }
      ctx.fill();
      ctx.stroke();
    });
  };

  useEffect(() => {
    draw();
  }, [points, svmResult, showMargin, showSupportVectors]);

  const clearAll = () => {
    setPoints([]);
    setSvmResult(null);
    setAnimationStep(0);
    setIsAnimating(false);
  };

  const removeLastPoint = () => {
    if (points.length > 0) {
      setPoints(points.slice(0, -1));
      setSvmResult(null);
    }
  };

  const startAnimation = () => {
    setIsAnimating(true);
    // Aquí podrías implementar una animación paso a paso del entrenamiento
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        SVM Interactive Learning Applet
      </h1>
      
      {/* Panel de información */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <Info className="text-blue-600 mr-2 mt-1" size={16} />
          <div className="text-sm text-blue-800">
            <p><strong>Instrucciones:</strong></p>
            <p>• Haz clic en el canvas para añadir puntos de datos</p>
            <p>• <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span> Círculos rojos = Clase +1</p>
            <p>• <span className="inline-block w-3 h-3 bg-blue-500 mr-1"></span> Cuadrados azules = Clase -1</p>
            <p>• Los vectores de soporte aparecen con borde negro</p>
            <p>• La línea azul es el hiperplano de separación óptimo</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Canvas */}
        <div className="flex-1">
          <div className="border-2 border-gray-300 rounded-lg p-2 bg-gray-50">
            <canvas
              ref={canvasRef}
              width={canvasWidth}
              height={canvasHeight}
              onClick={addPoint}
              className="cursor-crosshair bg-white rounded border"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>

        {/* Panel de control */}
        <div className="lg:w-80 space-y-4">
          {/* Selección de clase */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Clase a añadir:</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentClass(1)}
                className={`flex-1 py-2 px-4 rounded-lg border-2 ${
                  currentClass === 1 
                    ? 'border-red-500 bg-red-100 text-red-700' 
                    : 'border-gray-300 bg-white'
                }`}
              >
                🔴 Clase +1
              </button>
              <button
                onClick={() => setCurrentClass(-1)}
                className={`flex-1 py-2 px-4 rounded-lg border-2 ${
                  currentClass === -1 
                    ? 'border-blue-500 bg-blue-100 text-blue-700' 
                    : 'border-gray-300 bg-white'
                }`}
              >
                🔷 Clase -1
              </button>
            </div>
          </div>

          {/* Controles de entrenamiento */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Entrenamiento SVM:</h3>
            <div className="space-y-2">
              <button
                onClick={trainSVM}
                disabled={isTraining || points.length < 2}
                className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isTraining ? 'Entrenando...' : 'Entrenar SVM'}
              </button>
              
              <div className="flex gap-2">
                <button
                  onClick={removeLastPoint}
                  className="flex-1 py-2 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center justify-center"
                >
                  <Minus size={16} className="mr-1" />
                  Quitar último
                </button>
                <button
                  onClick={clearAll}
                  className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center"
                >
                  <RotateCcw size={16} className="mr-1" />
                  Limpiar
                </button>
              </div>
            </div>
          </div>

          {/* Opciones de visualización */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Visualización:</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showMargin}
                  onChange={(e) => setShowMargin(e.target.checked)}
                  className="mr-2"
                />
                Mostrar márgenes
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showSupportVectors}
                  onChange={(e) => setShowSupportVectors(e.target.checked)}
                  className="mr-2"
                />
                Destacar vectores de soporte
              </label>
            </div>
          </div>

          {/* Parámetros */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Parámetros:</h3>
            <div>
              <label className="block text-sm font-medium mb-1">
                Parámetro C: {C.toFixed(1)}
              </label>
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={C}
                onChange={(e) => setC(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-gray-600 mt-1">
                Controla el balance entre margen y errores
              </div>
            </div>
          </div>

          {/* Resultados */}
          {svmResult && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Resultados:</h3>
              <div className="text-sm space-y-1">
                <p><strong>Vectores de soporte:</strong> {svmResult.supportVectors.length}</p>
                <p><strong>Margen:</strong> {(svmResult.margin * 100).toFixed(2)}%</p>
                <p><strong>Vector normal w:</strong> ({svmResult.w.x.toFixed(3)}, {svmResult.w.y.toFixed(3)})</p>
                <p><strong>Sesgo b:</strong> {svmResult.b.toFixed(3)}</p>
              </div>
            </div>
          )}

          {/* Información matemática */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Ecuación del hiperplano:</h3>
            <div className="text-sm">
              {svmResult ? (
                <div className="font-mono">
                  {svmResult.w.x.toFixed(3)}x + {svmResult.w.y.toFixed(3)}y + {svmResult.b.toFixed(3)} = 0
                </div>
              ) : (
                <div className="text-gray-500 italic">
                  Entrena el modelo para ver la ecuación
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pie con información adicional */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>Este applet demuestra los conceptos básicos de SVM en 2D. En aplicaciones reales, SVM puede trabajar en espacios de alta dimensionalidad usando kernels.</p>
      </div>
    </div>
  );
};

export default SVMApplet;