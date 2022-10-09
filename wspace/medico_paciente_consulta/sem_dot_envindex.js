const express = require ('express')
const app = express()
app.use(express.json())

//mysql é o nome de uma variável, pode ser qualquer coisa
//mysql parece mais intuitivo do que mysql2
const mysql = require('mysql2')

/*
app.get('/medicos', (req, res) => {
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
database: 'hospital',
password: 'root'
})
connection.query('SELECT * FROM tb_medico', (err, results, fields) => {
//results tem as linhas
//fields tem meta dados sobre os resultados, caso estejam disponível
console.log(results)
console.log(fields)
res.send('ok')
})
})
*/

app.get('/medicos', (req, res) => {
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
database: 'hospital',
password: 'root'
})
connection.query('SELECT * FROM tb_medico', (err,
results, fields) => {
res.json(results)
})
})


app.get('/pacientes', (req, res) => {
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
database: 'hospital',
password: 'root'
})
connection.query('SELECT * FROM tb_paciente', (err,
results, fields) => {
res.json(results)
})
})

app.post('/medicos', (req, res) => {
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
database: 'hospital',
password: 'root'
})
const crm = req.body.crm
const nome = req.body.nome
const sql = "INSERT INTO tb_medico (crm, nome) VALUES (?, ?)"
connection.query(
sql,
[crm, nome],
(err, results, fields) => {
console.log (results)
console.log(fields)
res.send('ok')
})
})


const porta = 3000
app.listen(porta, () => console.log(`Executando. Porta ${porta}`))