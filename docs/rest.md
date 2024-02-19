# Tecnologia REST

## Introducció
REST o  _Respresentational State Transfer_ és un estil arquitectonic que defineix el conjunt de restriccions per la creació del servei web.
<!-- Representational State Transfer (REST) es un estilo arquitectónico que define un conjunto de restricciones para la creación de servicios web. Es ampliamente utilizado en el desarrollo de aplicaciones web para permitir la comunicación entre sistemas distribuidos. A continuación, se detallan los elementos esenciales de REST y cómo se aplican en el desarrollo de APIs. -->

## Elements REST
### Recursos
Els recursos són entitats d'informació que es poden accedir o manipular a través de l'API. Són identificats per URIs, _Uniform Resource Identifiers_

### Métodes HTTP
Utilitza 4 métodes estandars per realitzar les operacions en els recursos:

**GET**: Recupera un recurs.

**POST**: Crea un recurs.

**PUT**: Actualiza un recurs.

**DELETE**: Elimina un recurs.

### Representaciones
Els recursos poden estar en diversos formats, com _JSON_, _XML_ o _HTML_.  

El client podrà especificar el format mitjançant la clau _Accept_ i contingut _application/{format}_ a l'encapçalat

### Estat de l'Aplicació
Cada solicitud ha de ser independent i no ha de guardar-se l'estat al servidor, per tant, cada solicitud ha de contenir tota la informació necessaria per ser processada


## Implementación de REST con Node.js y Express
Node.js y Express son tecnologías populares para crear servicios web RESTful. A continuación, se muestra cómo implementar un CRUD básico utilizando estas tecnologías:

Instalación de Node.js y Express: Se deben instalar Node.js y Express en el entorno de desarrollo.

Definición de rutas: En Express, se definen las rutas para cada operación CRUD (GET, POST, PUT, DELETE) en los recursos.

Manejo de solicitudes y respuestas: Se implementan controladores para manejar las solicitudes HTTP y realizar operaciones en la base de datos.

Interacción con la base de datos: Se utiliza un ORM (Object-Relational Mapping) o una librería para interactuar con la base de datos y realizar las operaciones CRUD en los recursos.

# Ejercicio Práctico
Para comprender mejor el funcionamiento de REST con Node.js y Express, se propone el siguiente ejercicio:

Desarrollo de una API RESTful de Usuarios
Crear una base de datos simple con una tabla de usuarios que contenga los campos id, nombre, email y edad.

Implementar una API RESTful utilizando Node.js y Express que permita realizar las siguientes operaciones:

Obtener todos los usuarios.
Obtener un usuario por su ID.
Crear un nuevo usuario.
Actualizar un usuario existente.
Eliminar un usuario.
Probar la API utilizando herramientas como Postman o cURL para enviar solicitudes HTTP y verificar las respuestas.

Documentar el proceso de desarrollo y los pasos necesarios para ejecutar la aplicación.