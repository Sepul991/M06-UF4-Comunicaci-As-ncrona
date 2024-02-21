# Introducció

REST o  _Respresentational State Transfer_ és un estil arquitectonic que defineix el conjunt de restriccions per la creació del servei web.
# Elements REST
## Recursos
Els recursos són entitats d'informació que es poden accedir o manipular a través d'una API. Són identificats per URIs, _Uniform Resource Identifiers_

> _URI_ -> direcció que defineix la ubicació exacta d'un recurs 
## Estat de l'Aplicació
Cada solicitud és independent i no guarda l'estat al servidor, per tant, cada solicitud conté tota la informació necessaria per ser processada
## Métodes HTTP
Utilitza 4 métodes estandars per realitzar les operacions en els recursos:

- **GET**: Recupera un informació pel client.
- **POST**: Crea un recurs dins del servidor. (Agregar un registre a la base de dades)
- **PUT**: Actualiza un recurs ja extistent dins del servidor.
- **DELETE**: Elimina un recurs.
## Header
Són components que s'intercanvien client i servidor. Proporcionen informació sobre les dades que estan rebent o enviant.
#### Solicitud
S'envien per part del client al servidor.
- **Accept** - Indica el format de resposta que es rebrà _aplication/json_
- **Content-Type** - Indica el format de les dades que està enviant el client _aplication/json_
- **Authorization** - Serveix per enviar les credenciales d'autentificació del servidor
#### Resposta
S'envien per part del servidor al client.
- **Status** - Indica l'estat de la solicitud
- **Content-Type** - Indica el format de les dades que se li estan enviant al client _aplication/json_
## Resposta HTTP
Són les respostes que dona la pàgina per informar sobre el resultat de l'operació:

- **200** - OK
- **201** - Created
- **204** - No Content
- **400** - Bad Request
- **401** - Unauthorized
- **403** - Forbidden
- **404** - Not Found
- **500** - Internal Server Error

## Exemples de solicituds HTTP
####  GET
```bash
GET /api/users
```

```bash
GET /api/users/{id}
```
####  POST
```bash
POST /api/users
Content-Type: application/json

{
  "nombre": "Example",
  "email": "ejemplo@example.com",
  "edad": 30
}
```
####  PUT
```bash
POST /api/users/{id}
Content-Type: application/json

{
  "nombre": "Example",
  "email": "ejemplo@example.com",
  "edad": 30
}
```
####  DELETE
```bash
DELETE /api/users/{id}
```

# Aplicacions i Plugins

| Extensió      | Descripció                                                                                                        | Ventatges                                                                                                    | Desventatges                                                                                     |
|----------------|-------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| Postman        | És una eina per provar i desenvolupar APIs. L'extensió permet accedir a les funcions principals des de l'editor. | - Permet crear i enviar solicituds HTTP. <br>- Facilita la definición y organización de colecciones de solicitudes. <br>- Permet exriure i executar proves automatitzades per APIs. | - Requereix coneixements previs sobre l'ús de Postman. <br>- Pot tenir uan curva d'aprenentatge inicial. |
| REST Client    | És una extensió que permet enviar solicituds HTTP i veure la resposta directament a l'editor utilitzant un arxiu de text amb sintaxi similar a cURL. | - Permet definir i executar solicituds HTTP directament des d'un arxiu. <br>- Facilita la documentació i prova d'APIs a prop del codi font. | - Pot ser menys intuiriva per usuaris nous en l'ús de cURL o arxius de text estructurats. <br>- No ofereix tantas característiques avançades com Postman. |
# Exercici pràctic

## Objectiu
Familiaritzar-se amb les solicituds HTTP GET, POST, PUT i DELETE utilitzant Node.js i la funció `fetch()`.
## Enunciat

1. Obtenir usuaris (GET):
	1. Fes la consulta adient per aconseguir tots els _posts_
		- Printa per consola l'estat de la consulta i si retorna alguna cosa
	
	1. Fes la consulta adient per aconseguir el _post_ amb _ID_ 1
		- Printa per consola l'estat de la consulta i si retorna alguna cosa

3. Agregar usuari (POST):
	- Crea un nou _post_: 
		- _userId_ = 1
		- _title_ = "Nom i cognom" 
		- _body_ = "Això és un post de prova"
	- Printa per consola l'estat de la consulta i si retorna alguna cosa
	
1. Actualitzar ususari (PUT):
	-  Actualitza les dades del _post_ amb _ID_ 1: 
		- _title_ = "Congom i Nom" 
		- _body_ = "Aquest és un post actualitzat"
	- Printa per consola l'estat de la consulta i si retorna alguna cosa

3. Eliminar ususari (DELETE):
	- Elimina l'usuari amb _ID_ 1
	- Printa per consola l'estat de la consulta i si retorna alguna cosa
## Eines
- **Aplicacions**: Per tal de poder realitzar aquest exercici s'haurà de fer ús d'un dels plugins esmentats anteriorment, o de les seves respectives aplicacions.

- **API**: la API necessaria per poder dur a terme els exercicis és la seguent:
	https://jsonplaceholder.typicode.com/posts/