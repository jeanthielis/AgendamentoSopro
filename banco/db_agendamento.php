<?php
include_once('db_connect.php');

// Coletar dados do formulário
$data = $_POST['data'];
$hora = $_POST['hora'];
$cliente = $_POST['cliente'];
$servico = $_POST['servico'];
$valor = $_POST['valor'];
$entrada = $_POST['entrada'];
$cores = $_POST['cores'];
$bairro = $_POST['bairro'];
$cidade = $_POST['cidade'];
$restante = $_POST['restante'];
$celular = $_POST['celular'];
$situacao = 0;

 
// Inserir dados no banco de dados
$sql = "INSERT INTO agenda (data, hora, cliente,celular, servico, valor, entrada,restante, cores, bairro, cidade,situacao)
        VALUES ('$data', '$hora','$cliente','$celular','$servico', $valor, $entrada,$restante, '$cores', '$bairro', '$cidade','$situacao')";

if ($conn->query($sql) === TRUE) {
    echo "Cadastro realizado com sucesso!";
} else {
    echo "Erro: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>