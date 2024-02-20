## **Nodejs**
- NodeJS es un intérprete de JavaScript que se ejecuta en servidor.
- Está basado en el motor de JavaScript que utiliza Google Chrome (V8), escrito en C++
## **Características principales**
- El tener el mismo lenguaje en cliente y servidor
  - Permite a cualquier persona desarrollar en backend o en frontend
  - Permite reusar código o incluso mover código de cliente a servidor o al revés
- Está orientado a eventos y utiliza un modelo asíncrono (propio de JavaScript).
- Al contrario que en el navegador, encontramos muchas llamadas asíncronas: 
  - Llamadas a APIs
  - Lectura y escritura de ficheros
  - Ejecución de cálculos en el servidor
  - ....
- Llamadas síncronas en servidor serían fatales: 
  - ¡Bloqueariamos las conexiones al servidor hasta que acabase la instrucción bloqueante!
  - Al ser asíncrono podremos tener muchas sesiones concurrentes
- Es monohilo 
  - Utiliza un solo procesador
  - Si queremos usar toda la potencia de la CPU, tendremos que levantar varias instancias de node y utilizar un balanceador de carga ([por ejemplo con pm2](https://github.com/Unitech/pm2))
## **npm**
- Es el gestor de paquetes de node
## **ES Modules**
- Es el sistema de importacion y exportacion oficial de modulos en node 
  - Para utilizar es modules los archivos deben utilizar la extensión .mjs
  - Para exportar un modulo se usa la palabra reservada Export,(pueden ser funciones o un objeto)

    ![ref1] 

  - Para Importar hay que indicar un objeto el cual hay que desestructurar segun las funciones que se quieran del modulo

    ![ref1]
## **Express**
- Express.js es un framework web de código abierto para Node.js, diseñado para construir aplicaciones web y APIs de manera rápida y sencilla. Proporciona una serie de características y utilidades que simplifican el proceso de desarrollo web en Node.js. 
- Algunas de las características principales de Express.js son: 
  - Routing: Permite definir rutas para manejar distintas peticiones HTTP (GET, POST, PUT, DELETE, etc.) y responder a ellas de manera adecuada.
  - Middleware: Express utiliza un sistema de middleware que permite realizar acciones como procesar datos de entrada, realizar validaciones, manejar errores, entre otras cosas, antes de que la solicitud llegue a su ruta final.
  - Manejo de peticiones y respuestas: Express simplifica el manejo de solicitudes HTTP y respuestas, permitiendo configurar encabezados, enviar archivos, manejar sesiones, cookies, y más.
  - ...
## **Primeros pasos en express**
Para instalar express hay que abrir una consola en la ruta del proyecto y ejecutar el comando npm install expres -e

![ref1] 

- En la primer linea importamos el modulo de Express
- En la segunda guardamos en una variable el objeto express

[ref1]: Aspose.Words.0c6cde61-4a97-4d9d-9e0b-42c7767aa604.001.png
