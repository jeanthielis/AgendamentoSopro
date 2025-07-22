<?php
include_once ('db_connect.php');

$action = $_POST['action'] ?? '';

if($action == "salvar"){
    $tipo = $_POST['motivo'];
    $descricao = $_POST['descricao'];
    $valor = floatVal($_POST['valor']);

    $sql = "INSERT INTO despesas (data_despesa, descricao,valor,tipo) VALUES (NOW(),'$descricao',$valor,'$tipo')";


    if ($conn->query($sql) === TRUE) {
        echo "Cadastro realizado com sucesso!";
    } else {
        echo "Erro: " . $sql . "<br>" . $conn->error;
    }
}elseif($action == "listar"){

    $sql="SELECT date_format(data_despesa,'%d/%m/%Y - %H:%i') as data, valor, descricao,tipo FROM despesas ORDER BY data_despesa DESC";

    $resultado = mysqli_query($conn,$sql);
    echo "<h4><i class='bi bi-wallet2'></i> Despesas</h4>";
    while($linha = mysqli_fetch_assoc($resultado)){
        ?>
        <div class="col-md-6">
        <div class="card status-cancelado" >
            <!-- Área do título sem card-header -->
            <div class="card-title-container">
                <div class="card-title"><h4><?php echo $linha['descricao']?></h4></div>
                 <div class="dropdown">
                    <button class="three-dots-btn" type="button" id="cardOptions" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-three-dots-vertical fs-5"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="cardOptions">
                        <li><a  class="dropdown-item btnDetalhesModal" id='<?php echo $linha['id_agenda']?>'><i class="bi bi-eye me-2"></i> Visualizar</a></li>
                        <li><a class="dropdown-item btnAtualizaModal" id='<?php echo $linha['id_agenda']?>'><i class="bi bi-pencil me-2"></i> Editar</a></li>
                        <li><a class="dropdown-item marcarConcluido" id='<?php echo $linha['id_agenda']?>' ><i class="bi bi-check-circle me-2"></i> Marcar Concluído</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a  class="dropdown-item text-danger deletarAgenda" id='<?php echo $linha['id_agenda']?>'><i class="bi bi-trash me-2"></i> Cancelar</a></li>
                    </ul>
                </div>
            </div>


            
            <div class="card-body pt-2">
                <p class='card-subtitle '><i class="bi bi-calendar"></i> <?php echo $linha['data']?></p>
                <p class="card-text">
                    <i class="bi bi-palette"></i> <?php echo $linha['tipo']?><br>
                    <i class="bi bi-palette"></i> R$ <?php echo number_format($linha['valor'], 2, ',', '.')?>

                </p>


            </div>
        </div>

</div>


        <?php
    };

}


$conn->close();
?>