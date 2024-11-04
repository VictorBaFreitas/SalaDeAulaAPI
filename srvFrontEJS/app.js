const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = 25000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/manutSalaDeAula', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:40000/api/salasdeaula');
        const salas = response.data;

        res.render('manutSalaDeAula', { salas });
    } catch (error) {
        console.error("Erro ao buscar salas de aula:", error);
        res.status(500).send("Erro ao carregar as salas de aula.");
    }
});

app.listen(PORT, () => {
    console.log(`Servidor EJS rodando na porta ${PORT}`);
});
