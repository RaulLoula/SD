-- cria a base
CREATE DATABASE IF NOT EXISTS hospital;
-- informa ao MySQL Server qual a base sobre a qual desejamos operar
USE hospital;

-- cria tabela medico
CREATE TABLE IF NOT EXISTS tb_medico (
crm INT PRIMARY KEY,
nome VARCHAR(200) NOT NULL
);
-- cria tabela paciente
CREATE TABLE IF NOT EXISTS tb_paciente (
cpf BIGINT PRIMARY KEY,
nome VARCHAR (200) NOT NULL,
idade SMALLINT NOT NULL
);
-- cria tabela consulta
CREATE TABLE IF NOT EXISTS tb_consulta (
crm INT NOT NULL,
cpf BIGINT NOT NULL,
data_hora DATETIME NOT NULL,
PRIMARY KEY (crm, cpf, data_hora),
CONSTRAINT fk_medico FOREIGN KEY (crm) REFERENCES tb_medico(crm),
CONSTRAINT fk_paciente FOREIGN KEY (cpf) REFERENCES tb_paciente(cpf)
);