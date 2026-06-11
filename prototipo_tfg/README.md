# Prototipo TFG - Concienciación en ciberseguridad

Este repositorio contiene el prototipo desarrollado como prueba de concepto para el Trabajo de Fin de Grado centrado en una metodología adaptativa de concienciación en ciberseguridad basada en escenarios simulados para empleados sin perfil técnico.

## Descripción

El prototipo representa de forma simplificada algunos de los elementos principales de la metodología propuesta. Su finalidad no es constituir una plataforma completa de formación en ciberseguridad, sino mostrar cómo podrían aplicarse determinados componentes de la metodología en un entorno digital sencillo.

Como mejora respecto a una versión básica, el prototipo incorpora una selección inicial de perfil de empleado. Esta selección no almacena datos personales ni implica una gestión real de usuarios, sino que actúa como una simulación básica del diagnóstico inicial y de la clasificación por perfil definidos en la metodología.

## Perfiles incluidos

El prototipo permite seleccionar uno de los siguientes perfiles:

- Administración.
- Recursos humanos.
- Comercial / atención al cliente.
- Usuario general de oficina.

A partir del perfil seleccionado, se muestran escenarios orientados a situaciones relacionadas con dicho puesto.

## Funcionalidades principales

- Selección inicial de perfil de empleado.
- Presentación de escenarios simulados relacionados con riesgos habituales de ciberseguridad.
- Adaptación básica de los escenarios al perfil seleccionado.
- Toma de decisiones por parte del usuario.
- Retroalimentación inmediata tras cada respuesta.
- Sistema básico de puntuación.
- Visualización del progreso durante la actividad.
- Resultado final con valoración formativa.
- Enfoque no punitivo y orientado al aprendizaje.

## Sistema de puntuación

Cada escenario incluye diferentes opciones de respuesta con puntuación parcial:

- Respuesta óptima: 10 puntos.
- Respuesta parcialmente correcta: 5 puntos.
- Respuesta insegura o insuficiente: 0 puntos.

## Tecnologías utilizadas

El prototipo se ha desarrollado como una web estática utilizando:

- HTML.
- CSS.
- JavaScript.

No utiliza backend, base de datos, autenticación de usuarios ni almacenamiento persistente de información.

## Estructura del proyecto

```text
prototipo-tfg/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Ejecución del prototipo

Para ejecutar el prototipo, basta con descargar los archivos y abrir `index.html` en un navegador web.

Es importante que los archivos `index.html`, `styles.css` y `script.js` se encuentren en la misma carpeta para que la página cargue correctamente los estilos y la lógica de interacción.

## Alcance del prototipo

Este prototipo tiene un alcance limitado y demostrativo. No pretende ser una aplicación empresarial completa ni sustituir a una plataforma real de concienciación en ciberseguridad.

Quedan fuera del alcance de esta versión:

- Registro y autenticación real de usuarios.
- Gestión persistente de perfiles.
- Base de datos.
- Almacenamiento permanente de resultados.
- Panel de administración.
- Informes automáticos.
- Integración con sistemas corporativos.

Estas funcionalidades se consideran posibles líneas de trabajo futuro.

## Relación con la metodología propuesta

El prototipo sirve como apoyo para representar de forma práctica algunos elementos de la metodología definida en el TFG, especialmente:

- Diagnóstico inicial y clasificación básica por perfil.
- Entrenamiento mediante escenarios simulados.
- Evaluación de la toma de decisiones.
- Retroalimentación inmediata.
- Gamificación básica mediante puntuación.
- Progreso del usuario.
- Enfoque formativo y no punitivo.

Aunque los escenarios se presentan mediante textos y opciones de respuesta, esta representación debe entenderse como una simplificación propia de una prueba de concepto. La metodología propuesta no se limita a un cuestionario, sino que plantea el uso de situaciones simuladas basadas en casos realistas del entorno laboral.

## Autor

Trabajo desarrollado por Óscar Figueira Rodríguez-Rey como parte de su Trabajo de Fin de Grado.
