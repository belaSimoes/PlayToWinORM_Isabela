require("dotenv").config();
const connection = require("./db/conn");

const Usuario = require("./models/Usuario");
connection.
sync()
.then(() => {
    console.log("Conectando e sincronizando!");
})
.catch((err) => {
    console.log("Ocorreu um erro: " + err);
});

const express = require("express");

const handlebars = require("express-handlebars");

const app = express();
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/usuarios/novo", (req, res) => {
    res.render(`formUsuario`);
});

app.get("/", (req, res) => {
    res.render(`home`);
});

app.get("/usuarios", (req, res) => {
    res.render(`usuarios`);
});


app.post("/usuarios/novo", async (req, res) => {
    const nickname = req.body.nickname;
    const nome = req.body.nome;
    
    const dadosUsuario = {
        nickname,
        nome,
    };


    const usuario = await Usuario.create(dadosUsuario);
    res.send("Usuário inserido sob o id " + usuario.id);
});

app.listen(8000, () => {
    console.log("Server rodando na porta 8000¹");
});

