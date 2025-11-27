# 🏗️ Arquitectura Unificada de Módulos - Kbra Learning Platform

## 📋 Visión General

Este documento define la arquitectura estandarizada que **TODOS** los módulos de aprendizaje deben seguir. Esta unificación garantiza una experiencia de usuario consistente, facilita el mantenimiento y permite un seguimiento robusto del progreso.

## 🎯 Objetivos Principales

1. **Uniformidad**: Todos los módulos tienen la misma estructura de pestañas
2. **Persistencia**: El progreso se guarda durante 7 días de inactividad
3. **Gamificación Robusta**: Sistema unificado de puntos, trofeos y logros
4. **Evaluación Final**: Examen final con 10-30 preguntas aleatorias
5. **Criterio de Completitud**: 70% o más en el examen final para aprobar
6. **Idioma**: Todo el contenido en español

## 📑 Estructura de Pestañas Estándar

Cada módulo **DEBE** tener exactamente **6 pestañas** en el siguiente orden:

### 1. 📖 Glosario
**Propósito**: Definir términos clave utilizados en el módulo

**Contenido**:
- Lista de términos importantes con definiciones claras
- Ejemplos de uso cuando sea apropiado
- Términos ordenados alfabéticamente o por relevancia
- Formato accesible para consulta rápida

**Ejemplo**:
```html
<div class="tab-content" id="glosario">
    <h2>📖 Glosario de Términos</h2>
    <div class="glossary-section">
        <div class="glossary-item">
            <h3>Término 1</h3>
            <p>Definición clara y concisa del término.</p>
            <div class="example">
                <strong>Ejemplo:</strong> Uso práctico del término.
            </div>
        </div>
        <!-- Más términos... -->
    </div>
</div>
```

### 2. 🔣 Símbolos
**Propósito**: Introducir símbolos matemáticos, científicos o especializados

**Contenido**:
- Símbolos relevantes al tema con explicaciones
- Cómo leer/interpretar cada símbolo
- Ejemplos de uso en contexto
- Representación visual clara

**Ejemplo**:
```html
<div class="tab-content" id="simbolos">
    <h2>🔣 Símbolos y Notación</h2>
    <div class="symbols-grid">
        <div class="symbol-card">
            <div class="symbol-display">+</div>
            <div class="symbol-name">Suma</div>
            <div class="symbol-description">
                Se lee "más" y representa la adición de dos o más números.
            </div>
            <div class="symbol-example">
                <strong>Ejemplo:</strong> 3 + 5 = 8
            </div>
        </div>
        <!-- Más símbolos... -->
    </div>
</div>
```

### 3. 📚 Introducción
**Propósito**: Presentar el tema y su importancia

**Contenido**:
- ¿Qué es el concepto?
- ¿Por qué es importante?
- ¿Dónde se aplica en la vida real?
- Visión general de lo que se aprenderá
- Motivación para el estudiante

**Ejemplo**:
```html
<div class="tab-content" id="introduccion">
    <h2>📚 Introducción al Tema</h2>
    <div class="intro-section">
        <div class="what-is">
            <h3>¿Qué es?</h3>
            <p>Explicación clara del concepto principal.</p>
        </div>
        <div class="why-matters">
            <h3>¿Por qué es importante?</h3>
            <p>Relevancia práctica y aplicaciones.</p>
        </div>
        <div class="real-world">
            <h3>En el mundo real</h3>
            <p>Ejemplos cotidianos donde se usa este conocimiento.</p>
        </div>
    </div>
</div>
```

### 4. 📖 Teoría y Práctica
**Propósito**: Enseñar el concepto con explicaciones detalladas y ejemplos interactivos

**Contenido**:
- Explicación teórica paso a paso
- Demostraciones visuales interactivas
- Calculadoras o herramientas de práctica
- Múltiples ejemplos con diferentes niveles de dificultad
- Datos curiosos y consejos útiles

**Estructura sugerida**:
```html
<div class="tab-content" id="teoria">
    <h2>📖 Teoría y Práctica</h2>
    
    <!-- Sección interactiva -->
    <div class="input-section">
        <h3>🧮 Calculadora Práctica</h3>
        <div class="input-group">
            <label>Campo 1:</label>
            <input type="number" id="field1">
        </div>
        <button class="calc-button" onclick="calculate()">Calcular</button>
        <div class="result" id="result">Resultado aparecerá aquí</div>
    </div>

    <!-- Demostración visual -->
    <div id="visual-demo"></div>

    <!-- Explicación teórica -->
    <div class="explanation">
        <h3>📝 ¿Cómo funciona?</h3>
        <p>Explicación paso a paso del proceso.</p>
        <ol>
            <li>Paso 1</li>
            <li>Paso 2</li>
            <li>Paso 3</li>
        </ol>
    </div>

    <!-- Datos curiosos -->
    <div class="fun-facts">
        <h3>💡 Datos Curiosos</h3>
        <ul>
            <li>Dato interesante 1</li>
            <li>Dato interesante 2</li>
        </ul>
    </div>
</div>
```

### 5. 🎯 Entrenamiento
**Propósito**: Practicar con preguntas para ganar puntos y experiencia

**Contenido**:
- Preguntas de práctica generadas dinámicamente
- Sistema de puntos (+10 correcto, -5 incorrecto)
- Feedback inmediato
- Sin límite de intentos
- Muestra de puntuación actual y nivel
- Progreso no afecta la completitud del módulo

**Estructura obligatoria**:
```html
<div class="tab-content" id="entrenamiento">
    <h2>🎯 Entrenamiento</h2>
    
    <!-- Mostrar puntuación -->
    <div id="score-container"></div>

    <div class="practice-area">
        <h3 id="practice-question">Pregunta aparecerá aquí</h3>
        <div class="input-group">
            <input type="number" id="practice-answer" placeholder="Tu respuesta...">
        </div>
        <button class="calc-button" onclick="checkPracticeAnswer()">✅ Comprobar</button>
        <button class="calc-button" onclick="generatePracticeQuestion()">🔄 Nueva Pregunta</button>
        <div class="result" id="practice-result"></div>
    </div>

    <div class="fun-facts">
        <h3>💡 Consejos</h3>
        <ul>
            <li>Práctica sin presión - ¡equivocarse está bien!</li>
            <li>Cada respuesta correcta suma puntos</li>
            <li>Usa esta sección para prepararte para el examen final</li>
        </ul>
    </div>
</div>
```

### 6. 📝 Examen Final
**Propósito**: Evaluar el dominio del tema y determinar la completitud del módulo

**Requisitos obligatorios**:
- Entre 10 y 30 preguntas aleatorias
- 70% o más para aprobar (completar el módulo)
- Una pregunta a la vez o todas juntas (a discreción del diseñador)
- Tracking de intentos
- Mostrar resultados detallados al final
- Opción para reintentar si no se aprueba
- Al aprobar: otorgar trofeo del módulo y marcar como completado

**Estructura obligatoria**:
```html
<div class="tab-content" id="examen">
    <h2>📝 Examen Final</h2>
    
    <div class="exam-intro" id="exam-intro">
        <div class="exam-info">
            <h3>Información del Examen</h3>
            <p><strong>Preguntas:</strong> <span id="exam-total-questions">20</span></p>
            <p><strong>Calificación para aprobar:</strong> 70%</p>
            <p><strong>Intentos realizados:</strong> <span id="exam-attempts">0</span></p>
        </div>
        <button class="calc-button btn-large" onclick="startFinalExam()">🚀 Comenzar Examen</button>
    </div>

    <div class="exam-area hidden" id="exam-area">
        <div class="exam-progress">
            <span>Pregunta <span id="current-q">1</span> de <span id="total-q">20</span></span>
        </div>
        <div id="exam-question-container"></div>
    </div>

    <div class="exam-results hidden" id="exam-results">
        <h3>Resultados del Examen</h3>
        <div class="result-stats">
            <div class="stat-item">
                <span class="stat-value" id="correct-answers">0</span>
                <span class="stat-label">Correctas</span>
            </div>
            <div class="stat-item">
                <span class="stat-value" id="final-percentage">0%</span>
                <span class="stat-label">Calificación</span>
            </div>
        </div>
        <div id="exam-feedback"></div>
        <button class="calc-button" onclick="retryExam()">🔄 Reintentar</button>
    </div>
</div>
```

## 🎮 Sistema de Gamificación Unificado

### Puntos
- **+10 puntos**: Respuesta correcta en entrenamiento
- **-5 puntos**: Respuesta incorrecta en entrenamiento
- **0 puntos**: Durante el examen final (no afecta puntuación global)
- Los puntos nunca pueden ser negativos (mínimo 0)

### Niveles
- **Principiante**: 0-199 puntos
- **Intermedio**: 200-499 puntos
- **Experto**: 500+ puntos

### Trofeos
Cada módulo otorga **al menos UN trofeo** al completarse exitosamente:
- **Trofeo de Módulo**: Al aprobar el examen final con 70%+
- **Trofeo Adicional** (opcional): Por logros especiales en el módulo

**Implementación**:
```javascript
// Al aprobar el examen final
if (percentage >= 70) {
    // Otorgar trofeo del módulo
    Storage.awardTrophy(`${MODULE_ID}-completado`, MODULE_ID);
    Gamification.showTrophyToast(`${MODULE_ID}-completado`);
    
    // Marcar como completado
    Storage.saveFinalTestResults(MODULE_ID, correctAnswers, totalQuestions, true);
}
```

### Logros Globales Expandidos

**Logros Básicos**:
1. 🎯 **Primeros Pasos** - Completa tu primer módulo
2. ⭐ **Estudiante Estrella** - Gana 100 puntos
3. 🏆 **Campeón** - Completa 5 módulos
4. 🎓 **Erudito** - Completa 15 módulos
5. 💯 **Perfeccionista** - Obtén 100% en cualquier examen final
6. 🔥 **¡En Llamas!** - Gana 500 puntos

**Logros por Categoría**:
7. 📚 **Maestro de Matemáticas** - Completa todos los módulos de matemáticas básicas
8. 🔷 **Gurú de Geometría** - Completa todos los módulos de geometría
9. ⏰ **Viajero del Tiempo** - Completa todos los conceptos de tiempo
10. 🔢 **Experto en Números** - Completa todos los conceptos numéricos
11. 🧮 **Aprendiz Avanzado** - Completa 5 módulos avanzados

**Logros de Racha**:
12. 🌟 **Racha de 3 Días** - Aprende durante 3 días consecutivos
13. 💫 **Racha de 7 Días** - Aprende durante 7 días consecutivos
14. ✨ **Racha de 30 Días** - Aprende durante 30 días consecutivos

**Logros de Excelencia**:
15. 🎖️ **Cinco Perfectos** - Obtén 100% en 5 exámenes finales
16. 👑 **Maestro Supremo** - Completa TODOS los módulos con 70%+
17. ⚡ **Relámpago** - Completa un módulo en menos de 15 minutos
18. 🎨 **Coleccionista** - Obtén 20 trofeos

## 💾 Persistencia de Datos (7 Días)

### Configuración de Cookies
El sistema usa `localStorage` con verificación de expiración:

```javascript
// En storage.js
const EXPIRATION_DAYS = 7;

function getExpirationDate() {
    const date = new Date();
    date.setDate(date.getDate() + EXPIRATION_DAYS);
    return date.toISOString();
}

function isExpired(expirationDate) {
    if (!expirationDate) return false;
    return new Date() > new Date(expirationDate);
}
```

### Extensión de Expiración
Cada vez que el usuario visita la plataforma:
1. Se verifica si los datos han expirado
2. Si no, se extiende la fecha de expiración por 7 días más
3. Si han expirado, se reinician a valores predeterminados

### Estructura de Datos
```javascript
{
    version: "2.0.0",
    user: {
        totalPoints: 0,
        currentLevel: "Principiante",
        createdAt: "2025-11-27T11:00:00.000Z",
        lastVisit: "2025-11-27T11:00:00.000Z",
        expirationDate: "2025-12-04T11:00:00.000Z" // 7 días después
    },
    achievements: [...],
    trophies: [
        {
            id: "suma-completado",
            lessonId: "suma",
            awarded: true,
            date: "2025-11-27T11:00:00.000Z"
        }
    ],
    modules: {
        "suma": {
            completed: true,
            score: 150,
            bestScore: 150,
            finalTestScore: 18,
            finalTestPassed: true,
            finalTestAttempts: 2,
            ...
        }
    },
    stats: {
        totalModulesCompleted: 1,
        perfectScores: 1,
        finalTestsPassed: 1,
        ...
    }
}
```

## 🎨 Diseño y Estilos

### Clases CSS Estándar
Todos los módulos deben usar estas clases:

```css
/* Contenedores principales */
.container          /* Contenedor principal */
.content            /* Área de contenido */
.tab-content        /* Panel de cada pestaña */

/* Navegación */
.tabs               /* Contenedor de pestañas */
.tab-button         /* Botón de pestaña */
.tab-button.active  /* Pestaña activa */

/* Secciones de contenido */
.input-section      /* Sección de calculadora/entrada */
.practice-area      /* Área de práctica */
.exam-area          /* Área de examen */
.glossary-section   /* Sección de glosario */
.symbols-grid       /* Grid de símbolos */

/* Elementos interactivos */
.input-group        /* Grupo de input con label */
.calc-button        /* Botón de acción */
.result             /* Mostrar resultados */
.explanation        /* Caja de explicación */
.fun-facts          /* Datos curiosos/consejos */

/* Componentes especiales */
.visual-demo        /* Demostraciones visuales */
.glossary-item      /* Item de glosario */
.symbol-card        /* Tarjeta de símbolo */
```

### Tema de Colores
- **Primario**: Púrpura (matemáticas)
- **Secundario**: Rosa (geometría)
- **Acento**: Turquesa (ciencias)
- **Éxito**: Verde
- **Error**: Rojo
- **Advertencia**: Naranja

## 📱 Responsividad

Todos los módulos deben ser completamente responsivos:
- **Móvil**: < 768px - Una columna, botones grandes
- **Tablet**: 768px-1024px - Dos columnas cuando sea apropiado
- **Escritorio**: > 1024px - Diseño completo

## 🔧 Plantilla de Módulo

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Título del Módulo - Kbra Learning</title>
    
    <!-- CSS Compartido -->
    <link rel="stylesheet" href="../../css/core.css">
    <link rel="stylesheet" href="../../css/components.css">
    
    <style>
        /* Solo estilos específicos del módulo */
    </style>
</head>
<body>
    <div class="container">
        <div id="header-container"></div>
        <div id="tabs-container"></div>
        
        <div class="content">
            <!-- 6 tabs aquí -->
            <div class="tab-content active" id="glosario">...</div>
            <div class="tab-content" id="simbolos">...</div>
            <div class="tab-content" id="introduccion">...</div>
            <div class="tab-content" id="teoria">...</div>
            <div class="tab-content" id="entrenamiento">...</div>
            <div class="tab-content" id="examen">...</div>
        </div>
    </div>

    <!-- JavaScript Compartido -->
    <script src="../../lib/storage.js"></script>
    <script src="../../lib/gamification.js"></script>
    <script src="../../lib/components.js"></script>

    <!-- JavaScript del Módulo -->
    <script>
        const MODULE_ID = 'nombre-modulo';
        
        function init() {
            // Renderizar header
            document.getElementById('header-container').innerHTML = 
                Components.createHeader({
                    title: 'Título del Módulo',
                    subtitle: 'Subtítulo descriptivo',
                    icon: '➕',
                    backLink: '../index.html'
                });

            // Renderizar tabs
            const tabs = [
                { id: 'glosario', label: 'Glosario' },
                { id: 'simbolos', label: 'Símbolos' },
                { id: 'introduccion', label: 'Introducción' },
                { id: 'teoria', label: 'Teoría' },
                { id: 'entrenamiento', label: 'Entrenamiento' },
                { id: 'examen', label: 'Examen Final' }
            ];
            document.getElementById('tabs-container').innerHTML = 
                Components.createTabs(tabs, showTab);

            // Cargar progreso
            const moduleData = Storage.getModuleData(MODULE_ID);
            // Inicializar componentes...
        }

        function showTab(tabName) {
            // Implementación estándar de cambio de pestaña
        }

        // Más funciones del módulo...

        // Inicializar al cargar
        document.addEventListener('DOMContentLoaded', init);
    </script>
</body>
</html>
```

## 📋 Checklist de Conversión de Módulo

Al convertir un módulo existente al nuevo sistema, verifica:

- [ ] Tiene exactamente 6 pestañas en el orden correcto
- [ ] Pestaña Glosario con términos relevantes
- [ ] Pestaña Símbolos con notación explicada
- [ ] Pestaña Introducción con contexto
- [ ] Pestaña Teoría con contenido educativo interactivo
- [ ] Pestaña Entrenamiento con preguntas de práctica
- [ ] Pestaña Examen Final con 10-30 preguntas
- [ ] Examen requiere 70% para aprobar
- [ ] Otorga trofeo al completar
- [ ] Usa Storage.js para persistencia
- [ ] Usa Gamification.js para puntos
- [ ] Usa Components.js para UI
- [ ] Todo el texto está en español
- [ ] Es completamente responsivo
- [ ] No tiene errores de consola
- [ ] Tracking de tiempo implementado

## 🚀 Próximos Pasos

1. **Actualizar módulos existentes**: Adaptar todos los módulos al nuevo estándar
2. **Crear agent de conversión**: Automatizar el proceso de conversión
3. **Documentar ejemplos**: Crear módulos de referencia
4. **Validar consistencia**: Asegurar que todos cumplan los estándares

---

**Versión**: 2.0.0  
**Fecha**: 27 de Noviembre, 2025  
**Estado**: Definición Completa ✅
