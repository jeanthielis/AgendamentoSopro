<?php
$servidor = "localhost";
$usuario = "root";
$senha = "";
$dbname = "Agendamento";

//Criar a conexao
$conn = mysqli_connect($servidor, $usuario, $senha, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>