
require("dotenv").config();
const conn = require("./db/conn");

const Usuario = require("./models/Usuario");
const Jogo = require("./models/Jogo")


conn
    .authenticate()
    .then(() => {
     console.log("Banco de Dados conectado e estrutura sicronizada!"); 
    })
    .catch(() => {
     console.log("Erro ao concetar/sincronizar o banco de dados:" + err);
    });

const express = require("express");
const app = express();

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(expresse.json());

app.get("/usuarios/novo", (req, res) => {
    res.sendFile(`${__dirname}/views/formUsuario.htlm`)
});
app.get("/jogos/novo", (req, res) =>{
    res.sendFile(`${__dirname}/views/formJogo.html`)
});

app.post("/usuarios/novo", async (req, res) => {
    const nickname = req.body.nickname;
    const nome = req.body.nome;

    const dadosUsuario = {
        nickname,
        nome,
    };


const usuario = await Usuario.create(dadosUsuario);

res.send("Usuário inserido sob o id" + usuario.id)
});

app.listen(8000, () =>{
    console.log("Server rodando na porta 8000!");
});

app.post("/jogos/novo", async (req, res) => {
    const titulo = req.body.titulo;
    const desc = req.body.desc;
    const prec = req.body.prec;

    const dadosJogo = {
        titulo,
        desc,
        prec,
    };


const jogo = await Jogo.create(dadosJogo);

res.send("Usuário inserido sob o id" + jogo.id)
});

app.listen(8000, () =>{
    console.log("Server rodando na porta 8000!");
});