USE hospital;
INSERT INTO tb_medico (crm, nome) VALUES (12345, 'José');
INSERT INTO tb_paciente (cpf, nome, idade) VALUES (998877, 'Maria', 22);
INSERT INTO tb_paciente (cpf, nome, idade) VALUES (11111111, 'Antônio', 30);
INSERT INTO tb_consulta (crm, cpf, data_hora) VALUES (12345, 998877,
'2021-10-12 13:53:00');
INSERT INTO tb_consulta (crm, cpf, data_hora) VALUES (12345, 998877,
'2021-10-13 18:00:00');
INSERT INTO tb_consulta (crm, cpf, data_hora) VALUES (12345, 11111111,
'2021-10-17 22:00:00');