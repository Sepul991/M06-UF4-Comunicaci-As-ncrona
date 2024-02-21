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

    `````javascript
    export function suma(a,b){
      return a+b;
    }
    `````

  - Para Importar hay que indicar un objeto el cual hay que desestructurar segun las funciones que se quieran del modulo **super importante poner la extension del archivo**

    `````javascript
    import {suma} from './suma.mjs' 
    console.log(suma(1,2))
    `````
## **Express**
- Express.js es un framework web de código abierto para Node.js, diseñado para construir aplicaciones web y APIs de manera rápida y sencilla. Proporciona una serie de características y utilidades que simplifican el proceso de desarrollo web en Node.js. 
- Algunas de las características principales de Express.js son: 
  - Routing: Permite definir rutas para manejar distintas peticiones HTTP (GET, POST, PUT, DELETE, etc.) y responder a ellas de manera adecuada.
  - Middleware: Express utiliza un sistema de middleware que permite realizar acciones como procesar datos de entrada, realizar validaciones, manejar errores, entre otras cosas, antes de que la solicitud llegue a su ruta final.
  - Manejo de peticiones y respuestas: Express simplifica el manejo de solicitudes HTTP y respuestas, permitiendo configurar encabezados, enviar archivos, manejar sesiones, cookies, y más.
  - ...
## **Primeros pasos en express**
Para instalar express hay que abrir una consola en la ruta del proyecto y ejecutar el comando npm install expres -e


    `````javascript
    import express from 'express';
    const app = express();
    const PORT = 1234;
    app.disable('x-powered-by')
    app.get('/',(req,res)=>{
        res.send('<h1>Hola Mundo<h1/>')
    })
    app.listen(PORT,()=>{
    console.log('servidor corriendo en el puerto:' + PORT)
    })
    `````
- En la primer linea importamos el modulo de Express
- En la segunda guardamos en una variable el objeto express
- En la 4ta desactivamos la cabecera de express, es importante desactivarla por seguridad
- El metodo get indica que cada request a travez de metodo get va a pasar por esta funcion, en este ejemplo una request a "/" entraria en esta funcion y nos devuelve un hola mundo
- Por ultimo el metodo listen levanta el servidor
## **Conexion DDBB Mysql**
- npm install mysql2

     `````javascript
      import mysql from 'mysql2/promise'
      const config = {
      host:'localhost',
      user: 'root',
      port: 3306,
      password: '',
      database: 'hakai'
      }
      const connection = await mysql.createConnection(config);
    `````

- Primero importar la dependencia
- Luego declarar un objeto con la configuracion para la conexion
- Por ultimo ejecutar el metodo createConnection 
## **Hacer un get** 
El metodo query nos permite hacer querys en la base de datos, en este caso un select nos devuelve los usuarios que buscamos. Esta query se realiza en el app.get de la ruta que queramos que lo ejecute y la devolvemos con res.json 
 `````javascript
     app.get('/',async (req,res)=>{
    const usuarios = await connection.query('SELECT * FROM usuarios')
    if(usuarios){
        res.json(usuarios);
    }else{
        res.status(404).json({message:'Usuarios no encontrados'})
    }
    })
  `````
## **Ejecutar el servidor**
Para ejecutar el servidor simplemente abrimos una terminal en la carpeta raiz del proyecto y ejecutamos el comando **node --watch "nombreDelArchivo.js"**, de esta manera se reinicia el servidor automaticamente cada vez que detecte algun cambio.
## **Propuesta de ejercicio:**
Con toda la informacion brindada anteriormente crea un metodo que accediendo a la ruta /usuarios devuelva un documento html con una card por cada usuario

[ref1]: Aspose.Words.b794e243-73a3-4d68-96a6-0ff05f21c705.001.png
