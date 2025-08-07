```markdown
# Plan Detallado para la Aplicación "Auto-Envío de CV a 100 Trabajos"

Este plan abarca la creación de una nueva página de carga de CV, una ruta API para procesar el envío a múltiples portales de trabajo simulados y una función auxiliar para gestionar el proceso.

---

## 1. Archivo: src/app/cargar-cv/page.tsx

**Objetivo:**  
Crear una página de interfaz que permita al usuario subir su CV y activar el proceso de envío a 100 portales de empleo. Se utilizarán estilos modernos (Tailwind CSS) sin iconografía externa.

**Implementación paso a paso:**
- **Importaciones y Setup:**  
  - Importar React, hooks (useState) y el componente de botón e input desde los componentes UI existentes si es posible (o usar HTML nativo).
  - Importar el componente de progreso de `src/components/ui/progress.tsx` (reutilizable) para mostrar el avance.
- **Estructura UI:**  
  - Crear un contenedor centrado con un diseño tipo "card" que incluya título, descripción instructiva, y un input de archivo (tipo "file") con validaciones (solo PDF o DOCX, por ejemplo).
  - Agregar un botón moderno “Enviar a Trabajos” con estados deshabilitado mientras se procesa.
- **Manejo de Estado y Eventos:**  
  - Gestionar el estado para el archivo seleccionado, un indicador de carga (spinner o progress bar) y un mensaje de éxito/error.
  - Al enviar, usar un formulario controlado que cree un objeto FormData y realice una solicitud fetch POST a la ruta `/api/apply`.
  - Implementar control de errores: mostrar un mensaje si no se selecciona un archivo o si ocurre un fallo en la llamada al API.
- **Diseño Moderno:**  
  - Aplicar clases Tailwind para márgenes, rellenos, tipografía (por ejemplo: `text-xl`, `font-semibold`) y colores coherentes con la paleta del sistema definido en globals.css.
  - Estructurar la interfaz de manera simple y limpia, sin imágenes externas.

---

## 2. Archivo: src/app/api/apply/route.ts

**Objetivo:**  
Crear una ruta de API en Next.js que reciba el CV cargado y simule el envío a 100 portales de trabajo.

**Implementación paso a paso:**
- **Validación de Método:**  
  - Asegurarse de que solo se aceptan solicitudes POST.
- **Procesamiento del FormData:**  
  - Usar `await request.formData()` para extraer el archivo enviado (por ejemplo, con el nombre de campo "cvFile").
  - Verificar que el archivo exista y cumpla con el tipo/ tamaño requerido.
- **Llamada a la Lógica de Envío:**  
  - Invocar la función `applyToJobs` (ubicada en `src/lib/jobBoards.ts`) pasando el archivo.
- **Manejo de Errores:**  
  - Implementar bloques try-catch para capturar errores y devolver una respuesta HTTP 500 con detalles mínimos de error.
- **Respuesta:**  
  - Devolver un JSON con un array de resultados por cada portal simulado, en el formato: `{ jobBoard: string, status: "success" | "failed", message: string }`.

---

## 3. Archivo: src/lib/jobBoards.ts

**Objetivo:**  
Crear la función auxiliar que simula el envío del CV a 100 portales de empleo combinando métodos gratuitos y de pago (simulación).

**Implementación paso a paso:**
- **Definir Lista de Portales:**  
  - Crear un array de 100 elementos usando `Array.from({ length: 100 }, (_, i) => \`Job Board ${i + 1}\`)`.
- **Función applyToJobs:**  
  - Exportar una función asíncrona `applyToJobs(cvFile: FormDataEntryValue)` que itere sobre la lista.
  - Para cada portal, simular una “solicitud de aplicación” usando una pequeña demora (usar `await new Promise(resolve => setTimeout(resolve, delay))` donde delay sea aleatorio o fijo).
  - Incluir manejo de errores en cada iteración (por ejemplo, usando try-catch) para marcar el estado "failed" en caso de error simulado.
- **Retorno de Resultados:**  
  - Armar y devolver un array de objetos con la información de cada portal (nombre, estado y mensaje descriptivo).

---

## 4. Pruebas y Consideraciones de Integración

**Pruebas con cURL:**  
- Ejemplo de comando:
  ```bash
  curl -X POST http://localhost:8000/api/apply \
       -F "cvFile=@/ruta/al/archivo.pdf" \
       -w "\nHTTP: %{http_code}\nTime: %{time_total}s\n"
  ```
- Verificar que se retorne un JSON con resultados para cada uno de los 100 portales.

**Error Handling y Buenas Prácticas:**  
- Validar el tipo y tamaño del archivo en el lado del cliente y del servidor.
- Envolver las operaciones de envío en try-catch asegurando que una falla en un portal no impida el resto.
- Informar al usuario mediante mensajes claros (éxito, error, progreso).

**UI/UX:**  
- La interfaz de carga será limpia y moderna, con un contenedor central, tipografía legible y uso efectivo del espacio y colores definidos en globals.css.
- La progresión se visualiza mediante una barra de progreso reutilizable y mensajes de estado en texto.

---

## Resumen

- Se creará la página `cargar-cv/page.tsx` para subir y enviar el CV usando una interfaz moderna.
- Se implementa la ruta API en `api/apply/route.ts` que procesa el archivo y simula el envío a 100 portales.
- Se añade la función auxiliar `applyToJobs` en `lib/jobBoards.ts` para simular la integración con portales usando métodos asíncronos y manejo de errores.
- Se utilizarán validaciones tanto en el cliente como en el servidor para garantizar la calidad del archivo y la robustez del proceso.
- La UI será minimalista y estilizada con Tailwind, sin depender de iconos externos.
- Se probará el endpoint mediante cURL para verificar respuestas y tiempos.
- La solución combina métodos gratuitos simulados con la preparación para integrar APIs de pago en el futuro.
