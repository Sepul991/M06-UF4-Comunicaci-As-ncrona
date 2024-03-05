import dbclient from "../ddbb/conexion.js";

export class Tickets {
    static async get_tickets() {
        const client = await dbclient();
        let tickets = await client.query("SELECT * FROM Tickets");
        console.log(tickets);
        await client.end();
        return tickets.rows;
    }
}
