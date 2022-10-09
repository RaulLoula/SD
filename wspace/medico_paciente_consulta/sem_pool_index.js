require ('dotenv').config()

const express = require ('express')
const app = express()
app.use(express.json())

//mysql é o nome de uma variável, pode ser qualquer coisa
//mysql parece mais intuitivo do que mysql2
const mysql = require('mysql2')

const {DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE} = process.env;


app.get('/medicos', (req, res) => {
const connection = mysql.createConnection({
host: DB_HOST,
user: DB_USER,
database: DB_DATABASE,
password: DB_PASSWORD
})
connection.query('SELECT * FROM tb_medico', (err,
results, fields) => {
res.json(results)
})
})


app.get('/pacientes', (req, res) => {
const connection = mysql.createConnection({
host: DB_HOST,
user: DB_USER,
database: DB_DATABASE,
password: DB_PASSWORD
})
connection.query('SELECT * FROM tb_paciente', (err,
results, fields) => {
res.json(results)
})
})

app.post('/medicos', (req, res) => {
const connection = mysql.createConnection({
host: DB_HOST,
user: DB_USER,
database: DB_DATABASE,
password: DB_PASSWORD
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

app.get('/consultas', (req, res) => {
const connection = mysql.createConnection({
host: DB_HOST,
user: DB_USER,
database: DB_DATABASE,
password: DB_PASSWORD
})
const sql = `
SELECT
m.nome as nome_medico, c.data_hora, p.nome as
nome_paciente
FROM
tb_medico m, tb_consulta c, tb_paciente p
WHERE
m.crm = c.crm AND c.cpf = p.cpf
`
connection.query(
sql,
(err, results, fields) => {
res.json(results)
}
)
})



const porta = 3000
app.listen(porta, () => console.log(`Executando. Porta ${porta}`))