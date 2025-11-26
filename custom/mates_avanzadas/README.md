# 📚 Matemáticas Avanzadas - Plataforma Interactiva Gamificada

## 🎯 Descripción del Proyecto

Plataforma educativa interactiva y gamificada para el aprendizaje de matemáticas avanzadas, dirigida a adolescentes y adultos. Cubre el programa completo de dos volúmenes con enfoque en álgebra, geometría, cálculo y análisis matemático.

---

## 📁 Estructura del Proyecto

```
mates_avanzadas/
├── index.html                          # Página principal con estadísticas y navegación
├── plan.md                             # Documentación completa del proyecto
├── README.md                           # Este archivo
│
├── VOLUMEN_I/                          # Fundamentos Matemáticos
│   ├── volume1_index.html             # Índice del Volumen I
│   ├── preliminares_numeros.html      # Números y Conjuntos
│   ├── tema1_estadistica.html         # Estadística y Probabilidad (Combinatoria)
│   ├── tema2_polinomios.html          # Polinomios y Fracciones Algebraicas
│   ├── tema3_geometria_trig.html      # Geometría y Trigonometría
│   ├── tema4_matrices.html            # Matrices y Determinantes
│   ├── tema5_sistemas.html            # Sistemas de Ecuaciones Lineales
│   ├── tema6_vectorial_plano.html     # Geometría Vectorial del Plano
│   └── tema7_vectorial_espacio.html   # Geometría Vectorial del Espacio
│
└── VOLUMEN_II/                         # Cálculo y Análisis
    ├── volume2_index.html             # Índice del Volumen II
    ├── preliminares_reales.html       # Números Reales
    ├── tema1_funciones_elem1.html     # Funciones Elementales I
    ├── tema2_funciones_elem2.html     # Funciones Elementales II
    ├── tema3_limites.html             # Límites y Continuidad
    ├── tema4_derivadas.html           # Funciones Derivables
    ├── tema5_representacion.html      # Representación de Funciones
    └── tema6_integral.html            # La Integral
```

**Total:** 20 archivos (19 HTML + 1 MD de planificación)

---

## 🎮 Características Principales

### ✨ Gamificación
- **Sistema de Puntos:** Gana puntos por cada ejercicio resuelto correctamente
- **Niveles:** Avanza de nivel según tu progreso
- **Logros Desbloqueables:** 🥉 🥈 🥇 💎 🔥
- **Racha Diaria:** Mantén tu racha de estudio activa
- **Estadísticas:** Seguimiento completo de tu rendimiento

### 🎨 Diseño Moderno
- **Interfaz Atractiva:** Gradientes modernos y animaciones fluidas
- **Responsive:** Funciona perfectamente en móvil, tablet y desktop
- **Paleta de Colores Profesional:**
  - Volumen I: Púrpura/Índigo (#667eea → #764ba2)
  - Volumen II: Rosa/Coral (#f093fb → #f5576c)

### 📚 Estructura Pedagógica

Cada tema incluye **5 secciones principales:**

1. **📚 Teoría**
   - Conceptos fundamentales
   - Definiciones y propiedades
   - Fórmulas importantes
   - Cajas conceptuales destacadas

2. **💡 Ejemplos Resueltos**
   - Problemas paso a paso
   - Explicaciones detalladas
   - Aplicaciones prácticas

3. **🧮 Herramientas Interactivas**
   - Calculadoras especializadas
   - Visualizadores gráficos
   - Simuladores interactivos

4. **✏️ Práctica Guiada**
   - Ejercicios autocorregibles
   - Sistema de pistas (hints)
   - Feedback inmediato
   - Puntuación automática

5. **📋 Resumen**
   - Puntos clave
   - Fórmulas esenciales
   - Consejos de estudio

---

## 📖 Contenido por Volumen

### 📘 VOLUMEN I - Fundamentos Matemáticos

#### Preliminares: Números y Conjuntos
- Conjuntos numéricos (ℕ, ℤ, ℚ, ℝ)
- Operaciones con conjuntos
- Intervalos y valor absoluto

#### Tema 1: Estadística y Probabilidad ⚠️
**Nota:** Solo es materia de examen:
- ✅ Principios Básicos de Combinatoria
- ✅ Fórmula de combinaciones sin repetición C(n,r)

#### Tema 2: Polinomios y Fracciones
- Operaciones con polinomios
- Regla de Ruffini
- Factorización
- Fracciones algebraicas

#### Tema 3: Geometría y Trigonometría
- Teoremas fundamentales
- Círculo trigonométrico
- Razones e identidades trigonométricas

#### Tema 4: Matrices y Determinantes
- Operaciones matriciales
- Cálculo de determinantes
- Matriz inversa
- Método de Gauss

#### Tema 5: Sistemas de Ecuaciones
- Métodos de resolución
- Regla de Cramer
- Discusión de sistemas

#### Tema 6: Geometría Vectorial del Plano
- Vectores 2D
- Producto escalar
- Ecuaciones de rectas

#### Tema 7: Geometría Vectorial del Espacio
- Vectores 3D
- Producto vectorial y mixto
- Planos y rectas en el espacio

---

### 📕 VOLUMEN II - Cálculo y Análisis

#### Preliminares: Números Reales
- Axiomas y propiedades
- Supremo e ínfimo

#### Tema 1: Funciones Elementales I
- Funciones polinómicas
- Funciones racionales
- Funciones radicales

#### Tema 2: Funciones Elementales II
- Funciones exponenciales
- Funciones logarítmicas
- Funciones trigonométricas

#### Tema 3: Límites y Continuidad
- Concepto de límite
- Cálculo de límites
- Indeterminaciones
- Continuidad

#### Tema 4: Funciones Derivables
- Concepto de derivada
- Reglas de derivación
- Aplicaciones

#### Tema 5: Representación de Funciones
- Estudio completo
- Asíntotas
- Máximos y mínimos
- Representación gráfica

#### Tema 6: La Integral
- Integral indefinida
- Integral definida
- Métodos de integración
- Aplicaciones (áreas y volúmenes)

---

## 💾 Persistencia de Datos

Los datos se guardan automáticamente en **localStorage** del navegador:

```javascript
{
  "puntos": 0,
  "nivel": 1,
  "ejerciciosCompletados": 0,
  "racha": 0,
  "progreso": {
    "volumen1": {
      "preliminares": { "completado": 0, "total": 5 },
      "tema1": { "completado": 0, "total": 5 },
      // ...
    },
    "volumen2": {
      // ...
    }
  },
  "logros": []
}
```

---

## 🎯 Sistema de Puntuación

- **Ejercicio correcto:** +10 puntos
- **Ejercicio incorrecto:** 0 puntos (pero cuenta para la estadística)
- **Completar un tema:** +100 puntos bonus
- **Racha de 7 días:** +50 puntos bonus

### Niveles

| Nivel | Puntos Necesarios | Categoría |
|-------|-------------------|-----------|
| 1-5   | 0-500            | Principiante |
| 6-10  | 500-1500         | Intermedio |
| 11-15 | 1500-3000        | Avanzado |
| 16-20 | 3000-5000        | Experto |
| 21+   | 5000+            | Maestro |

---

## 🏆 Logros Desbloqueables

| Logro | Icono | Requisito |
|-------|-------|-----------|
| Bronce | 🥉 | 5 ejercicios completados |
| Plata | 🥈 | 25 ejercicios completados |
| Oro | 🥇 | 100 ejercicios completados |
| Diamante | 💎 | Completar un volumen completo |
| Fuego | 🔥 | 7 días de racha consecutiva |

---

## 🚀 Cómo Usar

### Inicio Rápido

1. **Acceder a la plataforma:**
   - Abrir `index.html` en cualquier navegador moderno
   - No requiere instalación ni servidor

2. **Seleccionar un volumen:**
   - Volumen I: Fundamentos
   - Volumen II: Cálculo

3. **Elegir un tema:**
   - Navega por los temas disponibles
   - Revisa tu progreso en cada uno

4. **Estudiar:**
   - Lee la teoría
   - Revisa los ejemplos
   - Usa las herramientas
   - Practica con ejercicios

5. **Ganar puntos:**
   - Completa ejercicios correctamente
   - Desbloquea logros
   - Sube de nivel

---

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Estructura semántica
- **CSS3:** 
  - Flexbox y Grid
  - Gradientes lineales
  - Animaciones y transiciones
  - Diseño responsive
- **JavaScript Vanilla:**
  - Interactividad
  - Sistema de puntuación
  - LocalStorage API
  - Validación de ejercicios

---

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Dispositivos
- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1024px)
- ✅ Móvil (< 768px)

---

## 🎓 Público Objetivo

- **Adolescentes:** A partir de 15-16 años
- **Adultos:** Estudiantes universitarios o autodidactas
- **Nivel:** Pre-universitario y universitario básico

---

## 📊 Estadísticas del Proyecto

- **Total de archivos:** 20
- **Líneas de código:** ~4,162
- **Temas cubiertos:** 15 (8 Vol I + 7 Vol II)
- **Ejercicios estimados:** 75+ (5 por tema mínimo)
- **Horas de contenido:** 60-70 horas estimadas

---

## 🔮 Mejoras Futuras

### Corto Plazo
- [ ] Más ejercicios por tema (10-15)
- [ ] Graficadores matemáticos avanzados
- [ ] Sistema de exportación de progreso

### Medio Plazo
- [ ] Modo oscuro
- [ ] Calculadora científica integrada
- [ ] Vídeos explicativos embebidos
- [ ] Foro de discusión

### Largo Plazo
- [ ] App móvil nativa
- [ ] Modo multijugador/competitivo
- [ ] IA para recomendaciones personalizadas
- [ ] Certificados de completación

---

## 🤝 Contribuciones

Este proyecto es de código abierto educativo. Las contribuciones son bienvenidas:

1. Mejoras en ejercicios
2. Corrección de errores matemáticos
3. Optimizaciones de código
4. Nuevas herramientas interactivas
5. Traducciones a otros idiomas

---

## 📄 Licencia

Este proyecto es material educativo de libre uso para fines de aprendizaje.

---

## 👨‍💻 Autor

Creado como plataforma educativa interactiva para facilitar el aprendizaje de matemáticas avanzadas.

---

## 📞 Soporte

Para dudas o problemas:
1. Revisa el archivo `plan.md` para documentación detallada
2. Consulta los ejemplos resueltos en cada tema
3. Utiliza el sistema de pistas en los ejercicios

---

## 🎉 ¡Comienza tu Aprendizaje!

Abre `index.html` en tu navegador y comienza tu viaje hacia el dominio de las matemáticas avanzadas.

**¡Buena suerte y que disfrutes aprendiendo! 🚀📚**

---

**Última actualización:** 13 de noviembre de 2025  
**Versión:** 1.0  
**Estado:** ✅ Completado y funcional
