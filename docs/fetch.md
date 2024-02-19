# 1. Introducción a Fetch
### Qué es Fetch y su propósito.
  
Fetch es una API (Interfaz de Programación de Aplicaciones, por sus siglas en inglés) de JavaScript que proporciona una forma moderna y más flexible de realizar solicitudes HTTP desde un navegador web o desde un entorno de ejecución de JavaScript, como Node.js. Su propósito principal es permitir a los desarrolladores realizar peticiones de recursos a través de la red, como archivos, datos JSON, o cualquier otro tipo de datos disponibles en servidores remotos.

Fetch se diseñó para reemplazar las antiguas APIs de XMLHttpRequest (XHR), ofreciendo una sintaxis más sencilla y promesas nativas de JavaScript, lo que facilita la gestión de solicitudes asíncronas y la manipulación de respuestas. Permite enviar diferentes tipos de datos, como texto, JSON, blob (Binary Large Object), ArrayBuffer, FormData, etc., y trabajar con encabezados personalizados y opciones de configuración avanzadas.

El propósito de Fetch es mejorar la eficiencia y la facilidad de uso en la comunicación entre el cliente y el servidor en aplicaciones web y aplicaciones basadas en JavaScript, ofreciendo una interfaz más moderna y flexible para manejar solicitudes y respuestas HTTP.


# 2. Fundamentos de Fetch
### Descripción de la sintaxis básica de Fetch.
La sintaxis básica de Fetch es bastante simple. Se utiliza el método fetch() para realizar una solicitud HTTP y devuelve una promesa que se resuelve con la respuesta a esa solicitud:

``` javascript
fetch(url, options)
  .then(response => {
    // Manipulación de la respuesta
  })
  .catch(error => {
    // Manejo de errores
  });

```
#### Ejemplos de uso de Fetch para realizar peticiones:

1. GET:
```` javascript
fetch('URL del recurso al que se hace la solicitud.')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
````
2. POST:
```` javascript
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ key: 'value' })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

````
3. PUT:
```` javascript
fetch('URL del recurso al que se hace la solicitud.', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ key: 'updated_value' })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
````
4. DELETE:
```` javascript
fetch('https://api.example.com/data/123' // URL del recurso al que se hace la solicitud., {
  method: 'DELETE'
})
.then(response => {
  if (response.ok) {
    console.log('Data deleted successfully');
  } else {
    console.error('Failed to delete data');
  }
})
.catch(error => console.error('Error:', error));
````

- A la función fetch(), al margen de la url a la que hacemos petición, se le puede pasar un segundo parámetro de opciones de forma opcional, un  con opciones de la petición HTTP:

````javascript
const options = {
  method: "GET"
};

fetch("/robots.txt", options)
  .then(response => response.text())
  .then(data => {
    /** Procesar los datos **/
  });
````
| Campo        | Descripción                                                          |
|--------------|----------------------------------------------------------------------|
| STRING method       | Método HTTP de la petición. Por defecto, GET. Otras opciones: HEAD, POST, etc... |
|OBJECT headers      | Cabeceras HTTP. Por defecto, {}.                                     |
|OBJECT body         | Cuerpo de la petición HTTP. Puede ser de varios tipos: String, FormData, Blob, etc... |
|STRING credentials  | Modo de credenciales. Por defecto, omit. Otras opciones: same-origin e include.   |

Lo primero, y más habitual, suele ser indicar el método HTTP a realizar en la petición. Por defecto, se realizará un GET, pero podemos cambiarlos a HEAD, POST, PUT o cualquier otro tipo de método. En segundo lugar, podemos indicar objetos para enviar en el body de la petición, así como modificar las cabeceras en el campo headers:

````JAVASCRIPT
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(jsonData)
};
````
En este ejemplo, estamos enviando una petición POST, indicando en la cabecera que se envía contenido JSON y en el cuerpo de los datos, enviando el objeto jsonData, codificado como texto mediante stringify().

Por último, el campo credentials permite modificar el modo en el que se realiza la petición. Por defecto, el valor omit hace que no se incluyan credenciales en la petición, pero es posible indicar los valores same-origin, que incluye las credenciales si estamos sobre el mismo dominio, o include que incluye las credenciales incluso en peticiones a otros dominios.
- Ejemplos de cómo usar estos parámetros en las peticiones Fetch.

# 3. Manejo de Respuestas
- Explicación de cómo manejar las respuestas obtenidas de Fetch.
- Descripción de cómo extraer datos de la respuesta usando métodos como json(), text(), blob(), etc.
- Ejemplos de cómo utilizar estos métodos para obtener y manipular datos de la respuesta.

# 4. Headers y Opciones de Configuración
- Detalles sobre cómo configurar headers personalizados en las peticiones Fetch.
- Explicación de otras opciones de configuración disponibles, como mode, credentials, cache, etc.
- Ejemplos de cómo utilizar estas opciones en las peticiones Fetch.

# 5. Gestión de Errores
- Discusión sobre cómo manejar errores en las peticiones Fetch.
- Ejemplos de cómo verificar el estado de la respuesta y lanzar errores en caso de que la petición no tenga éxito.
- Recomendaciones sobre las mejores prácticas para manejar errores en Fetch.

# 6. Cross-Origin Resource Sharing (CORS)
- Explicación de qué es CORS y cómo afecta a las peticiones Fetch.
- Detalles sobre cómo configurar CORS en el servidor y cómo trabajar con las restricciones CORS en el cliente.

# 7. Casos de Uso y Ejemplos Avanzados
- Ejemplos de casos de uso comunes de Fetch en aplicaciones web modernas.
- Ejemplos de cómo utilizar Fetch en situaciones más complejas, como la autenticación de usuarios, el manejo de archivos grandes, etc.

# 8. Comparación con Otras Tecnologías
- Comparación de Fetch con otras tecnologías de peticiones HTTP en JavaScript, como XMLHttpRequest.
- Discusión sobre las ventajas y desventajas de Fetch en comparación con estas tecnologías.

# 9. Recursos Adicionales y Referencias
- Lista de enlaces a documentación oficial, tutoriales, artículos y otras fuentes de información sobre Fetch.
- Recomendaciones sobre dónde encontrar más recursos para aprender sobre Fetch y peticiones HTTP en JavaScript.

# 10. Conclusión
