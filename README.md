# 🎓 Kbra Learning Platform

Una plataforma de aprendizaje gamificada construida con HTML, CSS y JavaScript simple para GitHub Pages. ¡Perfecta para aprendizaje familiar con lecciones interactivas, cuestionarios y logros!

## 🌟 Características

- **Módulos de Aprendizaje Interactivos**: 28+ módulos cubriendo varios temas
  - 🔢 Matemáticas Básicas (4 módulos)
  - 📐 Geometría (3 módulos)
  - 🎯 Conceptos Numéricos (3 módulos)
  - ⏰ Conceptos de Tiempo (3 módulos)
  - 🎓 Matemáticas Avanzadas (15+ módulos)

- **Sistema de Gamificación Unificado**:
  - ⭐ Sistema de puntos global - Gana puntos basados en el rendimiento
  - 🏆 Sistema de trofeos - Un trofeo por módulo completado
  - 🎖️ 18 logros desbloqueables
  - 📊 Seguimiento de progreso - Ve las lecciones completadas de un vistazo
  - 💾 Almacenamiento local - El progreso persiste durante 7 días
  - 🔥 Sistema de rachas diarias

- **Estructura de Módulo Estándar**:
  - 📖 **Glosario**: Términos clave y definiciones
  - 🔣 **Símbolos**: Notación matemática y símbolos
  - 📚 **Introducción**: Contexto y aplicaciones del mundo real
  - 📖 **Teoría y Práctica**: Lecciones interactivas con herramientas
  - 🎯 **Entrenamiento**: Preguntas de práctica para ganar puntos
  - 📝 **Examen Final**: 10-30 preguntas, 70% requerido para aprobar

- **Sistema de Niveles**:
  - 🌱 Principiante (0-199 puntos)
  - ⭐ Intermedio (200-499 puntos)
  - 💫 Experto (500+ puntos)

- **Diseño Responsivo**:
  - UI hermosa con gradientes
  - Funciona en dispositivos de escritorio y móviles
  - Animaciones y transiciones suaves
  - Navegación intuitiva

## 🚀 Comenzar

### Ver en Línea
Visita el sitio en vivo en: `https://kbrabass.github.io/kbra-learning/`

### Ejecutar Localmente
1. Clona el repositorio:
   ```bash
   git clone https://github.com/KbraBass/kbra-learning.git
   cd kbra-learning
   ```

2. Abre `index.html` en tu navegador web, o inicia un servidor local:
   ```bash
   # Usando Python 3
   python3 -m http.server 8080
   
   # Usando Node.js
   npx http-server -p 8080
   ```

3. Navega a `http://localhost:8080` en tu navegador

## 📖 Cómo Usar

1. **Comenzar a Aprender**: Haz clic en "Start Learning" en la pantalla de bienvenida
2. **Explorar Módulos**: Navega a través de categorías en el hub de módulos
3. **Seleccionar un Módulo**: Elige cualquier tarjeta de módulo para comenzar
4. **Navegar Pestañas**: Usa las 6 pestañas para explorar el contenido
5. **Practicar**: Usa la pestaña Entrenamiento para practicar y ganar puntos
6. **Tomar el Examen**: Completa el Examen Final con 70%+ para aprobar
7. **Ganar Trofeos**: Desbloquea trofeos al completar módulos
8. **Seguir Progreso**: Ve tus estadísticas en el encabezado y logros desbloqueados

## 🎯 Logros

### Logros Básicos
- 🎯 **Primeros Pasos** - Completa tu primera lección
- ⭐ **Estudiante Estrella** - Gana 100 puntos
- 🏆 **Campeón** - Completa 5 lecciones
- 🎓 **Erudito** - Completa 15 lecciones
- 💯 **Perfeccionista** - Obtén 100% en cualquier examen final
- 🔥 **¡En Llamas!** - Gana 500 puntos

### Logros por Categoría
- 📚 **Maestro de Matemáticas** - Completa todos los módulos de matemáticas básicas
- 🔷 **Gurú de Geometría** - Completa todos los módulos de geometría
- ⏰ **Viajero del Tiempo** - Completa todos los conceptos de tiempo
- 🔢 **Experto en Números** - Completa todos los conceptos numéricos
- 🧮 **Aprendiz Avanzado** - Completa 5 módulos avanzados

### Logros de Racha
- 🌟 **Racha de 3 Días** - Aprende durante 3 días consecutivos
- 💫 **Racha de 7 Días** - Aprende durante 7 días consecutivos
- ✨ **Racha de 30 Días** - ¡Un mes de aprendizaje continuo!

### Logros de Excelencia
- 🎖️ **Cinco Perfectos** - Obtén 100% en 5 exámenes finales
- 👑 **Maestro Supremo** - Completa TODOS los módulos con 70%+
- ⚡ **Relámpago** - Completa un módulo en menos de 15 minutos
- 🎨 **Coleccionista** - Obtén 20 trofeos

## 🛠️ Detalles Técnicos

- **Frontend Puro**: No se requiere backend o proceso de compilación
- **Tecnologías**: HTML5, CSS3, JavaScript Vanilla
- **Almacenamiento**: localStorage del navegador para persistencia de progreso (7 días)
- **Hosting**: Compatible con GitHub Pages
- **Sin Dependencias**: No se necesitan bibliotecas externas

## 📁 Estructura de Archivos

```
kbra-learning/
├── index.html                  # Página principal/hub
├── app.js                      # Lógica de aplicación original
├── styles.css                  # Estilos originales
├── lib/                        # Bibliotecas JavaScript compartidas
│   ├── storage.js             # Gestión de localStorage (v2.0.0)
│   ├── gamification.js        # Sistema de puntos, logros, trofeos
│   └── components.js          # Generadores de componentes UI reutilizables
├── css/                        # Hojas de estilo compartidas
│   ├── core.css               # Estilos base y utilidades
│   └── components.css         # Estilos específicos de componentes
├── modules/                    # Todos los módulos de aprendizaje
│   ├── index.html             # Hub de módulos
│   ├── basic-math/            # Operaciones aritméticas
│   ├── geometry/              # Conceptos geométricos
│   ├── number-concepts/       # Teoría de números
│   ├── time-concepts/         # Aprendizaje relacionado con tiempo
│   └── advanced/              # Matemáticas avanzadas
├── UNIFIED_MODULE_ARCHITECTURE.md    # Especificación de arquitectura
├── CONVERSION_AGENT_GUIDE.md         # Guía de conversión de módulos
├── IMPLEMENTATION_GUIDE.md           # Guía técnica detallada
├── PROJECT_SUMMARY.md                # Resumen del proyecto
└── README.md                          # Este archivo
```

## 🎨 Personalización

### Agregar Nuevos Módulos

Los módulos siguen una estructura estandarizada de 6 pestañas. Ver `UNIFIED_MODULE_ARCHITECTURE.md` para la especificación completa y `CONVERSION_AGENT_GUIDE.md` para el proceso de conversión.

Estructura básica:
1. **Glosario**: Define términos clave
2. **Símbolos**: Explica notación
3. **Introducción**: Proporciona contexto
4. **Teoría**: Enseña con herramientas interactivas
5. **Entrenamiento**: Preguntas de práctica
6. **Examen Final**: 10-30 preguntas, 70% para aprobar

### Agregar Nuevos Logros

Agrega al array `achievementDefinitions` en `lib/gamification.js`:

```javascript
{
    id: 'achievement-id',
    icon: '🌟',
    name: 'Nombre del Logro',
    description: 'Cómo desbloquear este logro',
    condition: (stats) => {
        // Devuelve true cuando el logro debe desbloquearse
        return stats.totalPoints >= 1000;
    }
}
```

### Agregar Nuevos Trofeos

Agrega al objeto `trophyDefinitions` en `lib/gamification.js`:

```javascript
'modulo-id-completado': {
    icon: '🏆',
    name: 'Nombre del Trofeo',
    description: 'Descripción del logro'
}
```

## 📱 Compatibilidad del Navegador

- ✅ Chrome/Edge (última versión)
- ✅ Firefox (última versión)
- ✅ Safari (última versión)
- ✅ Navegadores móviles (iOS Safari, Chrome Mobile)

**Características Requeridas**:
- localStorage (soporte universal)
- CSS Grid & Flexbox (2017+)
- Propiedades Personalizadas CSS (2018+)
- JavaScript ES6 (2015+)

## 💾 Persistencia de Datos

- Los datos del usuario se almacenan en `localStorage` del navegador
- **Expiración**: Los datos expiran después de 7 días de inactividad
- **Extensión Automática**: Visitar la plataforma extiende la expiración 7 días más
- **Exportar/Importar**: Los usuarios pueden hacer copia de seguridad y restaurar el progreso

## 🤝 Contribuir

Esta es una plataforma de aprendizaje familiar personal, ¡pero las sugerencias son bienvenidas! Siéntete libre de:
- Reportar bugs
- Sugerir nuevas características
- Proponer nuevas lecciones o preguntas de cuestionario
- Mejorar el contenido educativo

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍👩‍👧‍👦 Hecho Para

Construido con ❤️ para el aprendizaje y educación familiar

---

**Versión**: 2.0.0  
**Última Actualización**: 27 de Noviembre, 2025  
**Estado**: Arquitectura Unificada Implementada ✅
