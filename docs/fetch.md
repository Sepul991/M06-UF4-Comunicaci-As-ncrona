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

Lo primero, y más habitual, suele ser indicar el método HTTP a realizar en la petición. Por defecto, se realizará un GET, pero podemos cambiarlos a HEAD, POST, PUT o cualquier otro tipo de método. En segundo lugar, podemos indicar objetos para enviar en el body de la petición, así como modificar las cabeceras en el campo headers (**lo veremos mas adelante**):

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

- omit: Este es el valor predeterminado si no se especifica el campo credentials. Significa que no se incluirán credenciales en la solicitud, independientemente del origen.

- same-origin: Indica que las credenciales se incluirán en la solicitud si el origen de la solicitud y el origen del recurso solicitado son el mismo. Es decir, si la solicitud se hace dentro del mismo dominio.

- include: Este valor indica que las credenciales se incluirán en todas las solicitudes, incluso en las peticiones a otros dominios. Esto puede ser útil en situaciones de autenticación cruzada (CORS) cuando se necesita pasar credenciales a un servidor diferente del origen.

````javascript
fetch('https://api.example.com/data', {
  credentials: 'same-origin', // o 'include' según sea necesario
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

````
## Métodos

````javascript
| Método                              | Descripción                                                  |
|-------------------------------------|--------------------------------------------------------------|
| BOOLEAN.has(STRING name)            | Comprueba si la cabecera `name` está definida.               |
| STRING.get(STRINGname)              | Obtiene el valor de la cabecera `name`.                      |
| .set(STRINGname, STRINGvalue)       | Establece o modifica el valor `value` a la cabecera `name`.  |
| .append(STRING name, STRING value)  | Añade un nuevo valor `value` a la cabecera `name`.           |
| .delete(STRING name)                | Elimina la cabecera `name`.                                  |

````

# 3. Manejo de Respuestas
- **Cómo manejar las respuestas obtenidas de Fetch.:**
  
  Al hacer una solicitud Fetch en JavaScript, puedes manejar la respuesta obtenida de varias maneras utilizando diferentes métodos proporcionados por el objeto Response.
  Por el lado de las propiedades, tenemos las siguientes:
````javascript
| Propiedad   | Descripción                                                   |
|-------------|---------------------------------------------------------------|
| NUMBER .status     | Código de error HTTP de la respuesta (100-599).               |
| STRING .statusText | Texto representativo del código de error HTTP anterior.      |
| BOOLEAN .ok         | Devuelve true si el código HTTP es 200 (o empieza por 2).    |
| OBJECT .headers    | Cabeceras de la respuesta.                                    |
| STRING .url        | URL de la petición HTTP.                                      |

````
Las propiedades .status y statusText nos devuelven el código de error HTTP de la respuesta en formato numérico y cadena de texto respectivamente.

Sin embargo, existe una novedad respecto a XHR, y es que tenemos una propiedad .ok que nos devuelve true si el código de error de la respuesta es un valor del rango 2xx, es decir, que todo ha ido correctamente. Así pues, tenemos una forma práctica y sencilla de comprobar si todo ha ido bien al realizar la petición.

Por último, tenemos la propiedad .headers que nos devuelve las cabeceras de la respuesta y la propiedad .url que nos devuelve la URL completa de la petición que hemos realizado.

**Por otra parte, la instancia response también tiene algunos métodos interesantes, la mayoría de ellos para procesar mediante una promesa los datos recibidos y facilitar el trabajo con ellos:**

````javascript
| Método          | Descripción                                                            |
|-----------------|------------------------------------------------------------------------|
| STRING.text()         | Devuelve una promesa con el texto plano de la respuesta.              |
| OBJECT.json()         | Idem, pero con un objeto json. Equivale a usar JSON.parse().          |
| OBJECT.blob()         | Idem, pero con un objeto Blob (binary large object).                  |
| OBJECT.arrayBuffer()  | Idem, pero con un objeto ArrayBuffer (buffer binario puro).           |
|OBJECT .formData()     | Idem, pero con un objeto FormData (datos de formulario).               |
| OBJECT.clone()        | Crea y devuelve un clon de la instancia en cuestión.                  |
|OBJECT Response.error()| Devuelve un nuevo objeto Response con un error de red asociado.       |
|OBJECT Response.redirect(url, code) | Redirige a una url, opcionalmente con un code de error.           |

````

**Ejemplo**:
````javascript
fetch("/contents.json")
  .then(response => response.text())
  .then(data => {
    const json = JSON.parse(data);
    console.log(json);
  });
  (utilizando .json() no haría falta parsearlo)
````

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


# 10. Conclusión
