# 🎮 Centro de Aprendizaje Matemático - Juegos Educativos

## 📚 Módulos Completos

### 🔢 Aritmética (5 juegos)
1. **Suma** (suma.html) - Aprende a sumar con llevadas
2. **Resta** (resta.html) - Aprende a restar con préstamos
3. **Multiplicación** (multiplicacion.html) - Tablas del 1-12
4. **División** (division.html) - División con cociente y resto
5. **Redondeo** (redondeo.html) - Redondeo a decenas, centenas, millares

### 🔷 Geometría (3 juegos)
1. **Formas Geométricas** (formas.html)
   - 12 formas: círculo, triángulo, cuadrado, rectángulo, pentágono, hexágono
   - Formas avanzadas: óvalo, rombo, trapecio, paralelogramo, estrella, octágono
   - Propiedades y variantes (triángulos equilátero, isósceles, escaleno, etc.)

2. **Ángulos** (angulos.html)
   - Tipos: agudo, recto, obtuso, llano, reflejo
   - Soporte hasta 3600° (10 vueltas completas)
   - Tab interactivo con drag para crear ángulos

3. **Perímetro y Área** (perimetro-area.html)
   - Cálculo visual de perímetros y áreas
   - Ejercicios interactivos

### 🕐 Tiempo y Fechas (2 módulos NUEVOS)

#### 1. **La Hora y el Reloj** (reloj.html)
**Características:**
- ✅ **Reloj Analógico**: Manecillas de hora, minuto y segundo
- ✅ **Reloj Digital**: Formatos 12h (AM/PM) y 24h
- ✅ **Lenguaje Natural**: 
  - "Tres y cuarto" (3:15)
  - "Siete y media" (7:30)
  - "Catorce menos cuarto" (1:45 / 13:45)
  - Reglas de "y" (0-30 min) y "menos" (31-59 min)
- ✅ **Zonas Horarias**: 
  - Madrid, Londres, Nueva York, Tokio, Sídney, Río de Janeiro
  - Búsqueda de ciudades con diferencia horaria
  - Mapa interactivo con +30 ciudades
- ✅ **Conversión**: Entre formatos 12h y 24h
- ✅ **Práctica**: Leer el reloj analógico con puntuación

**5 Tabs:**
1. Reloj Analógico - Aprender a leer manecillas
2. Reloj Digital - Formatos 12h/24h
3. Lenguaje Natural - "Tres y cuarto", "menos cuarto"
4. Zonas Horarias - Ciudades del mundo con búsqueda
5. Práctica - Ejercicios con puntuación

#### 2. **Calendario y Fechas** (calendario.html)
**Características:**
- ✅ **Calendario Interactivo**: Navegación mes a mes
- ✅ **Conceptos Básicos**:
  - Día (24 horas)
  - Semana (7 días: Lunes-Domingo)
  - Mes (12 meses con días específicos)
  - Año (365/366 días)
- ✅ **Festivos Oficiales Madrid 2025**:
  - 14 festivos: Año Nuevo, Reyes, Semana Santa, Día del Trabajo
  - 2 Mayo (Comunidad de Madrid), Santiago, Virgen Almudena
  - Constitución, Inmaculada, Navidad
  - Cálculo de días hasta próximo festivo
- ✅ **Calculadora de Fechas**:
  - Calcular edad exacta
  - Días vividos
  - Días hasta próximo cumpleaños
  - Día de la semana en que naciste
- ✅ **Año Bisiesto**:
  - Explicación de reglas (divisible por 4, excepto 100, pero sí 400)
  - Verificador de años bisiestos
- ✅ **Práctica**: Preguntas sobre días del mes, orden, años bisiestos

**5 Tabs:**
1. Calendario - Vista mensual interactiva con festivos
2. Conceptos - Día, semana, mes, año, días de semana
3. Festivos Madrid - Lista completa 2025 con contador
4. Calculadora de Fechas - Edad, cumpleaños, año bisiesto
5. Práctica - Ejercicios con puntuación

## 🎨 Características Generales

### Diseño Kid-Friendly
- ✨ Comic Sans MS (tipografía amigable)
- 🌈 Gradientes coloridos únicos por juego
- 🎭 Animaciones suaves (fadeIn, bounce, pulse)
- 📱 Responsive design (móvil, tablet, desktop)
- 🎯 Emojis y elementos visuales

### Sistema de Aprendizaje
- 📊 Sistema de puntuación (+10 correcto, -5 incorrecto)
- 🏆 Niveles: Principiante → Intermedio → Experto
- 🎮 Práctica interactiva en cada módulo
- 💡 Datos curiosos y trucos para recordar
- ✅ Validación de respuestas en tiempo real

### Estructura de Tabs (Pestañas)
Todos los juegos tienen 3-5 tabs:
1. **Aprendizaje** - Explicación del concepto
2. **Demostración** - Visualización interactiva
3. **Práctica** - Ejercicios con puntuación
4. **Extra** - Características avanzadas (según el juego)

## 📁 Archivos

```
/var/www/html/admin/custom/
├── index.html          # Hub principal (11 juegos)
├── suma.html          # Suma con llevadas
├── resta.html         # Resta con préstamos
├── multiplicacion.html # Tablas 1-12
├── division.html      # División con resto
├── redondeo.html      # Redondeo numérico
├── formas.html        # 12 formas geométricas
├── angulos.html       # Ángulos hasta 3600°
├── perimetro-area.html # Perímetro y área
├── reloj.html         # ⭐ NUEVO - La hora completa
└── calendario.html    # ⭐ NUEVO - Calendario completo
```

## 🚀 Uso

1. Abrir `index.html` en navegador
2. Seleccionar categoría: Aritmética, Geometría o Tiempo/Fechas
3. Elegir juego específico
4. Navegar por tabs para aprender
5. Practicar y ganar puntos

## 🎯 Público Objetivo

Niños menores de 10 años (especialmente diseñado para Yago)

## 💻 Tecnología

- HTML5 puro
- CSS3 (gradientes, animaciones, grid/flexbox)
- JavaScript vanilla (sin dependencias)
- Canvas API (para ángulos y relojes)
- Standalone files (cada juego es independiente)

## ✨ Mejoras Recientes

### Módulo Reloj (reloj.html)
- Reloj analógico en vivo con manecillas
- Conversión 12h ↔ 24h
- Lenguaje natural español ("tres y cuarto", "menos cuarto")
- 30+ ciudades con zonas horarias
- Búsqueda interactiva de ciudades
- Práctica de lectura de reloj

### Módulo Calendario (calendario.html)
- Calendario navegable con festivos Madrid
- 14 festivos oficiales 2025
- Calculadora de edad y cumpleaños
- Verificador de años bisiestos
- Contador hasta próximo festivo
- Día de la semana de nacimiento

### Módulo Formas (formas.html)
- 6 formas avanzadas añadidas
- Propiedades de triángulos (equilátero, isósceles, etc.)
- Tab de propiedades detalladas

### Módulo Ángulos (angulos.html)
- Soporte hasta 3600° (10 vueltas)
- Tab interactivo con drag
- Visualización de rotaciones múltiples
- Ángulos reflexos (180°-360°)

## 📊 Estadísticas

- **Total Juegos**: 11
- **Total Líneas de Código**: ~15,000
- **Total Conceptos**: 50+
- **Ciudades con Zona Horaria**: 30+
- **Festivos Madrid**: 14
- **Formas Geométricas**: 12
- **Rango de Ángulos**: 0-3600°

---

Hecho con ❤️ para que aprender sea divertido 🎉
