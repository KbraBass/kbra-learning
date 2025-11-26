#!/usr/bin/env python3
"""
Script to add mathematical symbol glossaries to all math topic pages
"""

import os
import re

# Define symbol glossaries for different topics
SYMBOL_GLOSSARIES = {
    'polinomios': {
        'title': 'Símbolos utilizados en Polinomios y Álgebra:',
        'symbols': [
            ('<strong>P(x)</strong>', 'Polinomio en la variable x'),
            ('<strong>a<sub>n</sub></strong>', 'Coeficiente del término de grado n'),
            ('<strong>deg(P)</strong>', 'Grado del polinomio P (mayor exponente)'),
            ('<strong>x<sup>n</sup></strong>', 'x elevado a la potencia n'),
            ('<strong>±</strong>', 'Más o menos (indica dos posibles signos)'),
            ('<strong>÷</strong>', 'División'),
            ('<strong>≡</strong>', 'Idéntico a / identidad algebraica'),
            ('<strong>∀x</strong>', 'Para todo valor de x'),
            ('<strong>(x-a)</strong>', 'Factor lineal (a es raíz del polinomio)'),
            ('<strong>√</strong>', 'Raíz cuadrada'),
            ('<strong>∛</strong>', 'Raíz cúbica'),
        ]
    },
    'geometria': {
        'title': 'Símbolos utilizados en Geometría y Trigonometría:',
        'symbols': [
            ('<strong>∠</strong>', 'Ángulo'),
            ('<strong>°</strong>', 'Grados (unidad de medida angular)'),
            ('<strong>π</strong>', 'Pi ≈ 3.14159... (constante matemática)'),
            ('<strong>rad</strong>', 'Radianes (unidad de medida angular)'),
            ('<strong>sin(x)</strong>', 'Seno de x (función trigonométrica)'),
            ('<strong>cos(x)</strong>', 'Coseno de x (función trigonométrica)'),
            ('<strong>tan(x)</strong>', 'Tangente de x = sin(x)/cos(x)'),
            ('<strong>⊥</strong>', 'Perpendicular a'),
            ('<strong>∥</strong>', 'Paralelo a'),
            ('<strong>≅</strong>', 'Congruente (misma forma y tamaño)'),
            ('<strong>∼</strong>', 'Semejante (misma forma, diferente tamaño)'),
            ('<strong>Δ</strong>', 'Triángulo / diferencia'),
            ('<strong>⊙</strong>', 'Círculo'),
        ]
    },
    'matrices': {
        'title': 'Símbolos utilizados en Matrices y Determinantes:',
        'symbols': [
            ('<strong>A</strong>', 'Matriz (generalmente mayúscula)'),
            ('<strong>a<sub>ij</sub></strong>', 'Elemento en fila i, columna j de la matriz'),
            ('<strong>A<sup>T</sup></strong>', 'Matriz transpuesta de A'),
            ('<strong>A<sup>-1</sup></strong>', 'Matriz inversa de A'),
            ('<strong>|A|</strong> o <strong>det(A)</strong>', 'Determinante de la matriz A'),
            ('<strong>I</strong>', 'Matriz identidad'),
            ('<strong>0</strong>', 'Matriz nula (todos los elementos son 0)'),
            ('<strong>m×n</strong>', 'Dimensión de matriz (m filas, n columnas)'),
            ('<strong>rango(A)</strong>', 'Rango de la matriz A'),
            ('<strong>A·B</strong> o <strong>AB</strong>', 'Producto de matrices A y B'),
            ('<strong>λ</strong> (lambda)', 'Autovalor / valor propio'),
        ]
    },
    'sistemas': {
        'title': 'Símbolos utilizados en Sistemas de Ecuaciones:',
        'symbols': [
            ('<strong>x, y, z</strong>', 'Variables / incógnitas del sistema'),
            ('<strong>{ }</strong>', 'Llaves que agrupan las ecuaciones del sistema'),
            ('<strong>≡</strong>', 'Sistema compatible indeterminado (infinitas soluciones)'),
            ('<strong>∅</strong>', 'Sin solución (sistema incompatible)'),
            ('<strong>|A|</strong>', 'Determinante de la matriz de coeficientes'),
            ('<strong>Δ</strong>', 'Determinante (notación alternativa)'),
            ('<strong>rango</strong>', 'Número de filas linealmente independientes'),
            ('<strong>~</strong>', 'Equivalente (tras operaciones elementales)'),
        ]
    },
    'vectores': {
        'title': 'Símbolos utilizados en Geometría Vectorial:',
        'symbols': [
            ('<strong>→</strong>', 'Vector (ej: AB→ es el vector de A a B)'),
            ('<strong>v⃗</strong> o <strong><u>v</u></strong>', 'Notaciones alternativas para vector'),
            ('<strong>(x, y)</strong> o <strong>(x, y, z)</strong>', 'Componentes del vector'),
            ('<strong>|v⃗|</strong> o <strong>∥v⃗∥</strong>', 'Módulo/norma del vector (su longitud)'),
            ('<strong>u⃗·v⃗</strong>', 'Producto escalar (resultado: número)'),
            ('<strong>u⃗×v⃗</strong>', 'Producto vectorial (resultado: vector perpendicular)'),
            ('<strong>θ</strong> (theta)', 'Ángulo entre dos vectores'),
            ('<strong>0⃗</strong>', 'Vector nulo (todos sus componentes son 0)'),
            ('<strong>cos θ</strong>', 'Coseno del ángulo θ'),
            ('<strong>√</strong>', 'Raíz cuadrada (para calcular módulos)'),
            ('<strong>⊥</strong>', 'Perpendicular (u⃗⊥v⃗ significa u·v=0)'),
        ]
    },
    'funciones': {
        'title': 'Símbolos utilizados en Funciones:',
        'symbols': [
            ('<strong>f(x)</strong>', 'Función f evaluada en x'),
            ('<strong>Dom(f)</strong>', 'Dominio de f (valores permitidos de x)'),
            ('<strong>Im(f)</strong> o <strong>Ran(f)</strong>', 'Imagen/rango de f (valores de salida)'),
            ('<strong>f: A → B</strong>', 'Función de A en B'),
            ('<strong>→</strong>', 'Se transforma en / mapea a'),
            ('<strong>↦</strong>', 'x mapea a f(x) (ej: x ↦ x²)'),
            ('<strong>f<sup>-1</sup>(x)</strong>', 'Función inversa de f'),
            ('<strong>f∘g</strong>', 'Composición de funciones: f(g(x))'),
            ('<strong>e</strong>', 'Número de Euler ≈ 2.71828...'),
            ('<strong>ln(x)</strong>', 'Logaritmo natural (base e)'),
            ('<strong>log(x)</strong>', 'Logaritmo (base 10 o especificada)'),
        ]
    },
    'limites': {
        'title': 'Símbolos utilizados en Límites y Continuidad:',
        'symbols': [
            ('<strong>lim</strong>', 'Límite'),
            ('<strong>x→a</strong>', 'x tiende a a / se aproxima a a'),
            ('<strong>x→∞</strong>', 'x tiende a infinito'),
            ('<strong>x→a<sup>+</sup></strong>', 'Límite lateral por la derecha'),
            ('<strong>x→a<sup>-</sup></strong>', 'Límite lateral por la izquierda'),
            ('<strong>∞</strong>', 'Infinito'),
            ('<strong>-∞</strong>', 'Menos infinito'),
            ('<strong>∞/∞</strong>', 'Indeterminación (infinito dividido infinito)'),
            ('<strong>0/0</strong>', 'Indeterminación (cero dividido cero)'),
            ('<strong>∞-∞</strong>', 'Indeterminación (infinito menos infinito)'),
            ('<strong>ε</strong> (épsilon)', 'Número pequeño positivo arbitrario'),
            ('<strong>δ</strong> (delta)', 'Número pequeño positivo (definición de límite)'),
        ]
    },
    'derivadas': {
        'title': 'Símbolos utilizados en Derivadas:',
        'symbols': [
            ('<strong>f\'(x)</strong>', 'Derivada de f respecto a x (notación de Lagrange)'),
            ('<strong>dy/dx</strong>', 'Derivada de y respecto a x (notación de Leibniz)'),
            ('<strong>df/dx</strong>', 'Derivada de f respecto a x'),
            ('<strong>d/dx</strong>', 'Operador derivada respecto a x'),
            ('<strong>f\'\'(x)</strong>', 'Segunda derivada de f'),
            ('<strong>d²y/dx²</strong>', 'Segunda derivada'),
            ('<strong>f<sup>(n)</sup>(x)</strong>', 'Derivada n-ésima de f'),
            ('<strong>∂f/∂x</strong>', 'Derivada parcial respecto a x'),
            ('<strong>Δx</strong>', 'Incremento de x'),
            ('<strong>dx</strong>', 'Diferencial de x (incremento infinitesimal)'),
        ]
    },
    'integrales': {
        'title': 'Símbolos utilizados en Integrales:',
        'symbols': [
            ('<strong>∫</strong>', 'Símbolo de integral'),
            ('<strong>∫ f(x) dx</strong>', 'Integral indefinida de f respecto a x'),
            ('<strong>∫<sub>a</sub><sup>b</sup></strong>', 'Integral definida de a a b'),
            ('<strong>dx</strong>', 'Diferencial de x (indica variable de integración)'),
            ('<strong>C</strong>', 'Constante de integración'),
            ('<strong>F(x)</strong>', 'Primitiva/antiderivada de f(x)'),
            ('<strong>|<sub>a</sub><sup>b</sup></strong>', 'Evaluación de a a b'),
            ('<strong>∫∫</strong>', 'Integral doble'),
            ('<strong>∫∫∫</strong>', 'Integral triple'),
            ('<strong>∂</strong>', 'Símbolo de derivada parcial'),
        ]
    }
}

def get_glossary_html(topic_key, color='#667eea'):
    """Generate HTML for symbol glossary"""
    if topic_key not in SYMBOL_GLOSSARIES:
        return ""
    
    glossary = SYMBOL_GLOSSARIES[topic_key]
    symbols_html = '\n'.join([
        f'                    <li>{symbol} = {description}</li>'
        for symbol, description in glossary['symbols']
    ])
    
    return f"""
            <h3 style="color:{color};margin:30px 0 15px 0">📖 Glosario de Símbolos Matemáticos</h3>
            <div style="background:linear-gradient(135deg,{color},#764ba2);color:white;padding:25px;margin:20px 0;border-radius:15px">
                <h4 style="color:white;margin:0 0 15px 0">{glossary['title']}</h4>
                <ul style="list-style:none;padding-left:0;line-height:2">
{symbols_html}
                </ul>
                <p style="margin-top:20px;padding-top:20px;border-top:2px solid rgba(255,255,255,0.3)">
                    <strong>💡 Consejo:</strong> Familiarízate con estos símbolos antes de comenzar el estudio del tema. Te ayudará a leer y comprender las fórmulas matemáticas con mayor facilidad.
                </p>
            </div>
"""

def add_glossary_to_file(filepath, topic_key, volume):
    """Add symbol glossary to a template file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if glossary already exists
        if '📖 Glosario de Símbolos Matemáticos' in content:
            print(f"  ⏭️  Glossary already exists in {os.path.basename(filepath)}")
            return False
        
        # Determine color based on volume
        color = '#f5576c' if volume == 2 else '#667eea'
        
        # Generate glossary HTML
        glossary_html = get_glossary_html(topic_key, color)
        
        if not glossary_html:
            print(f"  ⚠️  No glossary defined for topic: {topic_key}")
            return False
        
        # Find insertion point (after "Contenido del Tema" h2)
        pattern = r'(<h2[^>]*>📚 Contenido del Tema</h2>)\s*\n\s*\n'
        match = re.search(pattern, content)
        
        if not match:
            print(f"  ❌ Could not find insertion point in {os.path.basename(filepath)}")
            return False
        
        # Insert glossary
        insertion_point = match.end()
        new_content = content[:insertion_point] + glossary_html + '\n            ' + content[insertion_point:]
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"  ✅ Added glossary to {os.path.basename(filepath)}")
        return True
        
    except Exception as e:
        print(f"  ❌ Error processing {filepath}: {e}")
        return False

def main():
    """Main execution"""
    base_dir = '/var/www/html/admin/custom/mates_avanzadas'
    
    # Define files to process with their topic keys
    files_to_process = [
        # Volume I
        ('VOLUMEN_I/tema2_polinomios.html', 'polinomios', 1),
        ('VOLUMEN_I/tema3_geometria_trig.html', 'geometria', 1),
        ('VOLUMEN_I/tema4_matrices.html', 'matrices', 1),
        ('VOLUMEN_I/tema5_sistemas.html', 'sistemas', 1),
        ('VOLUMEN_I/tema6_vectorial_plano.html', 'vectores', 1),
        ('VOLUMEN_I/tema7_vectorial_espacio.html', 'vectores', 1),
        # Volume II
        ('VOLUMEN_II/tema1_funciones_elem1.html', 'funciones', 2),
        ('VOLUMEN_II/tema2_funciones_elem2.html', 'funciones', 2),
        ('VOLUMEN_II/tema3_limites.html', 'limites', 2),
        ('VOLUMEN_II/tema4_derivadas.html', 'derivadas', 2),
        ('VOLUMEN_II/tema5_representacion.html', 'funciones', 2),
        ('VOLUMEN_II/tema6_integral.html', 'integrales', 2),
    ]
    
    print("\n🔧 Adding Symbol Glossaries to Math Topics\n")
    print("=" * 60)
    
    success_count = 0
    for relative_path, topic_key, volume in files_to_process:
        filepath = os.path.join(base_dir, relative_path)
        print(f"\n📄 Processing: {relative_path}")
        if add_glossary_to_file(filepath, topic_key, volume):
            success_count += 1
    
    print("\n" + "=" * 60)
    print(f"\n✨ Complete! Added glossaries to {success_count}/{len(files_to_process)} files\n")

if __name__ == '__main__':
    main()
