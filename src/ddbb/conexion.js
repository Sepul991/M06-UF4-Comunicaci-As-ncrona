import  pg  from "pg"

export default async function dbclient(){
    const config = {
        user: 'postgres',
        host: 'localhost',
        database: 'demo',
        password: 'alubbdd',
        port: 5432,
    }
    const client = new pg.Client(config);
    await client.connect()   
    return client;
}

