const express = require ('express');
const bodyParser = require('body-parser');
const observacoesPorLembreteId = {};
const app = express();
app.use(bodyParser.json());
const { v4: uuidv4 } = require('uuid');
const axios = require ('axios');
//:id é um placeholder
//exemplo: /lembretes/123456/observacoes
app.put('/lembretes/:id/observacoes', async (req, res) => {
 const idObs = uuidv4();
 const { texto } = req.body;
 //req.params dá acesso à lista de parâmetros da URL
 const observacoesDoLembrete =
 observacoesPorLembreteId[req.params.id] || [];
 observacoesDoLembrete.push({ id: idObs, texto , status:'Aguardando'});
 observacoesPorLembreteId[req.params.id]
 = observacoesDoLembrete;
 await axios.post("http://localhost:10000/eventos", {
 tipo: "ObservacaoCriada",
 dados: {
  lembreteId: req.params.id, id: idObs, texto: req.body,status: 'aguardando'
 }
 });
 res.status(201).send(observacoesDoLembrete);
 });

app.get('/lembretes/:id/observacoes', (req, res) => {
res.send(observacoesPorLembreteId[req.params.id] || []);
});

const funcoes = {
 ObservacaoClassificada: (observacao) => {
 const observacoes = observacoesPorLembreteId[observacao.lembreteId];
 const obsParaAtualizar = observacoes.find(o => o.id ===observacao.id)
 obsParaAtualizar.status = observacao.status;
 axios.post('http://localhost:10000/eventos', {
 tipo: "ObservacaoAtualizada",
 dados: {
 id: observacao.id,
 texto: observacao.texto,
 lembreteId: observacao.lembreteId,
 status: observacao.status
 }
 });
 }
 }

app.post("/eventos", (req, res) => {
	try{
		funcoes[req.body.tipo](req.body.dados);
	}
	catch (err){}
 res.status(200).send({ msg: "ok" });
 });

app.listen(5000, (() => {
console.log('Observacoes. Porta 5000');
}));