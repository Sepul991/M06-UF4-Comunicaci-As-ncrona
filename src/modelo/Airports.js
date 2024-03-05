import dbclient from '../ddbb/conexion.js';

export class Airport{

    static async get_airports(){
        const client = await dbclient();
        let airports = await client.query('SELECT * FROM Airports');
        console.log(airports)       
        await client.end()
        return airports.rows;
    }
}