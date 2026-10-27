# Asistente de estudio C4 (prototipo sin API)

## Qué incluye
- `index.html`: interfaz pública.
- `assets/css/asistente.css`: estilos responsivos.
- `assets/js/asistente.js`: tarjetas, cuestionario y búsqueda local.
- `assets/data/contenido.json`: contenido estructurado extraído del Excel suministrado.

## Restricciones respetadas
- No utiliza API, servidor, cuenta de usuario ni claves secretas.
- Funciona en el navegador del visitante sobre GitHub Pages.
- No llama a servicios externos.
- No guarda progreso personal entre sesiones.

## Publicación en el repositorio existente
1. En GitHub, abre `equipocapacitacionc4/operadoresC4` y cambia a la rama `sitio-web`.
2. Crea una carpeta para la herramienta, por ejemplo `asistente-estudio/`.
3. Sube dentro de ella el archivo `index.html` y las carpetas `assets/` completas, conservando las rutas.
4. La herramienta quedará en `https://equipocapacitacionc4.github.io/operadoresC4/asistente-estudio/` si GitHub Pages publica esa rama y ruta.
5. Prueba las pestañas Inicio, Tarjetas, Cuestionario y Explorar códigos desde la URL publicada.
6. Cuando esté validada, agrega un enlace desde la biblioteca o la sección de formación del portal.

## Consideraciones importantes
- El banco de preguntas se genera desde las tablas del Excel; algunas celdas de continuación pueden estar incompletas o combinar texto de varias filas. Revisar los ejercicios antes de usarlos como material oficial.
- La guía es de marzo de 2021. Confirmar con la institución que sea la versión autorizada y vigente antes de difundirla para formación operativa.
- No usar el prototipo para tomar decisiones en incidentes reales; es exclusivamente una herramienta educativa.
- Para mantener el costo en cero, la búsqueda y el cuestionario son locales y basados en datos precompilados; no existe generación abierta de texto mediante IA.
