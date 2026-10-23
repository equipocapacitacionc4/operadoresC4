
# Procedimiento para incorporar documentos al Portal C4

## 1. Preparar el archivo

- Verificar que el documento esté autorizado para publicación.
- Comprobar que no contenga información reservada ni datos personales que no deban divulgarse.
- Utilizar un nombre descriptivo, preferiblemente en minúsculas, sin tildes y con guiones bajos.
- Confirmar que el formato sea compatible con el uso previsto.

## 2. Subir el documento

1. Abrir la carpeta `assets/documentos/` en la rama `sitio-web`.
2. Seleccionar `Add file` y luego `Upload files`.
3. Subir el archivo.
4. Guardar el cambio mediante `Commit changes`.

## 3. Registrar el recurso

Editar `assets/documentos/catalogo.json` y agregar una entrada dentro del arreglo `recursos`.

Cada entrada debe incluir:

- `id`: identificador único.
- `titulo`: nombre visible del recurso.
- `categoria`: categoría correspondiente.
- `descripcion`: resumen del contenido.
- `archivo`: nombre del archivo.
- `ruta`: ubicación del documento.
- `tipo`: formato del recurso.
- `disponibilidad`: estado de publicación.

## 4. Validar la publicación

- Confirmar que el archivo existe en la ruta indicada.
- Verificar que el JSON conserve su sintaxis válida.
- Comprobar que el documento abra desde GitHub Pages.
- Probar la búsqueda del título y de la categoría.
- Confirmar que la biblioteca muestre el recurso correctamente.

## 5. Mantener el catálogo

- No reutilizar identificadores de recursos.
- Actualizar la ruta si cambia el nombre del archivo.
- Mantener las categorías consistentes.
- No registrar como disponible un documento que todavía no esté publicado.
