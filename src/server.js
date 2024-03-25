import express from "express";
import { getRoutes } from "./rutas/getRoutesTickets.js";
import { postRoutes } from "./rutas/postRoutesTickets.js";
import { deleteRoutes } from "./rutas/deleteRoutes.js";

const app = express();
const PORT = process.env.PORT || 1234;

// Middleware para analizar datos de formularios en el cuerpo de la solicitud
app.use(express.urlencoded({ extended: true }));

app.disable("x-powered-by");

app.use(express.json());

app.use("/", express.static("view"));
// app.use("/tickets", express.static("public/tickets.html"));

app.use("/", getRoutes);
app.use("/", postRoutes);
app.use("/", deleteRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});
