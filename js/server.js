const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql'); // ou mongoose para MongoDB
const app = express();
const port = 3000;

// Configurar o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sua-senha',
    database: 'seu-banco-de-dados'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados.');
});

app.use(bodyParser.json());
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'

// Rota de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro no servidor.' });
        }

        if (results.length > 0) {
            res.status(200).json({ message: 'Autenticação bem-sucedida!' });
        } else {
            res.status(401).json({ message: 'Credenciais inválidas.' });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
