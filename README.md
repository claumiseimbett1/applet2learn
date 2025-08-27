# 🎯 Interactive Educational Applets Collection

Una colección completa de applets educativos interactivos para el aprendizaje de **Machine Learning**, **Redes Neuronales** y **Análisis de Sistemas de Control**. Todos los applets están diseñados para funcionar directamente en el navegador sin necesidad de instalación.

## 📚 Contenido

### 🤖 Machine Learning & Deep Learning

| Applet | Descripción | Algoritmo | Características |
|--------|-------------|-----------|-----------------|
| **K-means Clustering** | Algoritmo de agrupamiento no supervisado | K-means | 5 distribuciones de datos, K-means++, modo manual |
| **PCA Analysis** | Análisis de Componentes Principales | PCA | Reducción dimensional real, visualización 2D→1D |
| **SVM Interactive** | Support Vector Machine | SVM | Kernels, margen máximo, vectores soporte |
| **Random Forest** | Bosques aleatorios para clasificación | Random Forest | Visualización de árboles, importancia de características |
| **XGBoost Training** | Extreme Gradient Boosting | XGBoost | Boosting real, early stopping, regularización |
| **Neural Network** | Red neuronal simple | Backpropagation | 3 funciones activación, entrenamiento real |

### 🎛️ Análisis de Sistemas de Control

| Applet | Descripción | Conceptos Clave | Aplicaciones |
|--------|-------------|-----------------|--------------|
| **Transformada de Laplace** | Análisis en dominio de frecuencia | Polos, ceros, ROC | Análisis de estabilidad |
| **Función de Transferencia** | Modelado de sistemas LTI | H(s), respuesta frecuencial | Diseño de controladores |
| **Regla de Mason** | Reducción de diagramas de bloques | Grafos de flujo, lazos | Análisis de sistemas complejos |
| **Diagramas de Bode** | Respuesta en frecuencia | Magnitud, fase, década | Análisis de estabilidad |
| **Diagrama de Nyquist** | Criterio de estabilidad | Plano complejo, encerramiento | Margen de estabilidad |
| **Sistemas de Primer Orden** | Modelo térmico | Constante de tiempo, ganancia | Control de temperatura |
| **Sistemas de Segundo Orden** | Modelo masa-resorte-amortiguador | ζ, ωn, sobrepaso | Control mecánico |

### 🚁 Aplicaciones Especializadas

- **Drone FOV Simulator** - Simulador de campo de visión para drones
- **Sistema de Control Térmico** - Modelado de sistemas de temperatura
- **Análisis de Estabilidad** - Visualización en plano complejo

## 🚀 Características Principales

- **🌐 Sin instalación**: Ejecuta directamente en el navegador
- **📱 Responsive**: Optimizado para móviles y tablets  
- **🎨 Visualización interactiva**: Gráficos en tiempo real
- **⚡ Algoritmos reales**: Implementaciones matemáticamente correctas
- **🎓 Educativo**: Diseñado para el aprendizaje y experimentación
- **🔧 Configurable**: Parámetros ajustables en tiempo real

## 💻 Uso

1. **Clona el repositorio**:
```bash
git clone [URL_DEL_REPOSITORIO]
cd applet-sr-ml
```

2. **Abre cualquier applet**:
```bash
# Usando un servidor local (recomendado)
python -m http.server 8000
# O simplemente abre el archivo HTML en tu navegador
```

3. **Navega a**: `http://localhost:8000`

## 🎯 Casos de Uso

### 👨‍🏫 Para Educadores
- Demostrar conceptos complejos de forma visual
- Ejercicios interactivos en clase
- Tareas y laboratorios virtuales

### 👨‍🎓 Para Estudiantes  
- Experimentar con algoritmos reales
- Visualizar efectos de parámetros
- Validar conocimientos teóricos

### 🔬 Para Investigadores
- Prototipado rápido de ideas
- Validación de conceptos
- Presentaciones interactivas

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Visualización**: Canvas API, CSS Animations
- **Algoritmos**: Implementaciones nativas en JavaScript
- **Responsive**: CSS Grid, Flexbox, Media Queries

## 📖 Ejemplos de Algoritmos Implementados

### Machine Learning
```javascript
// K-means con inicialización K-means++
function kmeansInit(data, k) {
    const centroids = [data[Math.floor(Math.random() * data.length)]];
    for (let i = 1; i < k; i++) {
        const distances = data.map(point => 
            Math.min(...centroids.map(c => distance(point, c)))
        );
        // Selección probabilística...
    }
}
```

### Análisis de Sistemas
```javascript
// Función de transferencia s-domain
function transferFunction(s, num, den) {
    const numerator = evaluatePolynomial(num, s);
    const denominator = evaluatePolynomial(den, s);
    return numerator / denominator;
}
```

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### 📋 Guidelines para Contribuciones

- **Código limpio**: Sigue las convenciones de JavaScript
- **Responsive**: Todos los applets deben funcionar en móviles
- **Documentado**: Incluye comentarios explicativos
- **Educativo**: Enfoque en el aprendizaje, no solo funcionalidad

## 🔧 Estructura del Proyecto

```
applet-sr-ml/
├── README.md
├── index.html                 # Landing page principal
├── 1-drone-fov-simulator.html
├── 2-random-forest-teaching-app.html
├── 3-svm_interactive_applet.tsx
├── 4-svm_standalone_html.html
├── 5-kmeans-applet.html
├── 6-pca-applet.html
├── 7-xgboost-applet.html
├── 8-simple-neural-network.html
└── assets/
    ├── css/
    ├── js/
    └── images/
```

## 📱 Compatibilidad

- ✅ **Chrome/Chromium** 80+
- ✅ **Firefox** 75+  
- ✅ **Safari** 13+
- ✅ **Edge** 80+
- ✅ **Móviles**: iOS Safari, Android Chrome

## 🎓 Recursos Educativos

### Machine Learning
- [Elementos de Aprendizaje Estadístico](https://web.stanford.edu/~hastie/ElemStatLearn/)
- [Pattern Recognition and Machine Learning](https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/)

### Control Systems
- [Modern Control Engineering - Ogata](https://www.pearson.com/store/p/modern-control-engineering/P100000843607)
- [Control Systems Engineering - Nise](https://www.wiley.com/en-us/Control+Systems+Engineering%2C+8th+Edition-p-9781119721420)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

### MIT License

```
MIT License

Copyright (c) 2024 Interactive Educational Applets Collection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Agradecimientos

- Comunidad de Machine Learning por algoritmos de referencia
- Investigadores en Control Systems por modelos matemáticos
- Contribuidores open source por librerías de visualización

## 📞 Contacto

- **Issues**: [GitHub Issues](https://github.com/usuario/applet-sr-ml/issues)
- **Discussions**: [GitHub Discussions](https://github.com/usuario/applet-sr-ml/discussions)
- **Email**: tu-email@ejemplo.com

---

⭐ **Si este proyecto te resulta útil, considera darle una estrella!** ⭐

![GitHub stars](https://img.shields.io/github/stars/usuario/applet-sr-ml?style=social)
![GitHub forks](https://img.shields.io/github/forks/usuario/applet-sr-ml?style=social)
![GitHub issues](https://img.shields.io/github/issues/usuario/applet-sr-ml)
![GitHub license](https://img.shields.io/github/license/usuario/applet-sr-ml)