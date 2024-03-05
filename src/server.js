import express from "express";
import { router } from "./rutas/router.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.disable("x-powered-by");

app.use(express.json());

app.use("/", express.static("public"));

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});
