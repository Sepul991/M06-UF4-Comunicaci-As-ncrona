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

## Enunciado del ejercicio:

Utilizando la API pública "JSONPlaceholder" (https://jsonplaceholder.typicode.com), tu tarea es obtener la lista de usuarios y mostrarla en la consola del navegador. Debes utilizar la función fetch para realizar la solicitud a la API y manejar la respuesta para mostrar los datos en la consola.

Solución del ejercicio:

````javascript
// Utilizamos la función fetch para obtener los datos de la API de JSONPlaceholder
fetch('https://jsonplaceholder.typicode.com/users')
  // Manejamos la respuesta obtenida de la API
  .then(response => {
    // Verificamos si la respuesta fue exitosa (código de estado 200)
    if (!response.ok) {
      throw new Error('Hubo un problema al obtener los datos.');
    }
    // Convertimos la respuesta a formato JSON y la retornamos
    return response.json();
  })
  // Manejamos los datos obtenidos en formato JSON
  .then(data => {
    // Mostramos los datos en la consola
    console.log('Lista de usuarios:');
    console.log(data);
  })
  // Capturamos cualquier error que pueda ocurrir durante el proceso
  .catch(error => {
    // Mostramos el error en la consola
    console.error('Error:', error);
  });

````

**Explicación:**

Utilizamos la función fetch para hacer una solicitud GET a la URL de la API de JSONPlaceholder que nos proporciona la lista de usuarios.
Utilizamos el método .then() para manejar la respuesta obtenida de la API. En este método, verificamos si la respuesta fue exitosa y convertimos la respuesta a formato JSON utilizando el método .json().
Utilizamos otro método .then() para manejar los datos obtenidos en formato JSON. En este método, simplemente mostramos los datos en la consola del navegador.
Utilizamos el método .catch() para capturar cualquier error que pueda ocurrir durante el proceso de solicitud y manejo de datos, y lo mostramos en la consola.


## RESUMEN:

**fetch paso a paso:**

Solicitud HTTP: Cuando llamas a fetch, debes proporcionar la URL del recurso al que deseas acceder y, opcionalmente, un objeto de opciones que incluya configuraciones como el método HTTP a utilizar, encabezados personalizados, y más.

Promesa devuelta: fetch devuelve una promesa. Esto significa que la solicitud se realiza de forma asíncrona y puedes encadenar métodos .then() y .catch() para manejar la respuesta o cualquier error que pueda ocurrir durante el proceso.

Manejo de la respuesta: Una vez que la solicitud se completa y la respuesta está disponible, la promesa se resuelve. Puedes encadenar un método .then() a la promesa devuelta por fetch para manejar la respuesta. Dentro de este método .then(), puedes verificar si la respuesta fue exitosa (código de estado 200-299) o no y realizar las acciones necesarias en consecuencia.

Conversiones de datos: Después de verificar que la respuesta es exitosa, puedes convertir los datos de la respuesta a diferentes formatos, como JSON, texto, o blobs, según el tipo de datos que estés esperando. Esto se hace generalmente utilizando los métodos proporcionados por la propia respuesta (response.json(), response.text(), response.blob(), etc.).

Manejo de errores: Si la solicitud no se puede completar correctamente, como en el caso de un error de red o un código de estado de error en la respuesta (por ejemplo, 404 Not Found), la promesa se rechazará. Puedes encadenar un método .catch() para manejar estos errores y tomar medidas apropiadas, como mostrar un mensaje de error al usuario o intentar la solicitud nuevamente.