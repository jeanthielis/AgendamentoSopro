<?php
include_once('db_connect.php');

$situacao= intval($_POST['situacao']);
$cliente = mysqli_real_escape_string($conn, $_POST['cliente']);
$action = $_POST['action'];

if($action == true){
$sql="SELECT date_format(data,'%a') as dia, date_format(data, '%d/%m/%Y' ) as dataformatada, date_format(hora,'%H:%i') as horaformatada,id_agenda,cliente,servico,valor,restante,cores,bairro,cidade,situacao,celular FROM agenda WHERE cliente LIKE '%$cliente%' ORDER BY data ASC" ;
} else {
    $sql="SELECT date_format(data,'%a') as dia, date_format(data, '%d/%m/%Y' ) as dataformatada, date_format(hora,'%H:%i') as horaformatada,id_agenda,cliente,servico,valor,restante,cores,bairro,cidade,situacao,celular FROM agenda WHERE situacao=$situacao AND cliente LIKE '%$cliente%' ORDER BY data ASC" ;
}

$semana = array('Sun'=>'Dom','Mon'=>'Seg','Tue'=>'Ter','Wed'=>'Qua','Thu'=>'Qui','Fri'=>'Sex','Sat'=>'Sáb');

$resultado = mysqli_query($conn,$sql);

while($linha=mysqli_fetch_assoc($resultado)){

    // Verifica a situação e define a classe CSS correspondente
    if ($linha['situacao'] == 0) {
        $status = "status-pendente"; // Pendente
    } elseif ($linha['situacao'] == 1) {
        $status = "status-confirmado"; // Concluído
    } elseif ($linha['situacao'] == 3) {
        $status = "status-cancelado"; // Cancelado
    } else {
        $status = ""; // Default para Pendente
    }
            
?>    
<div class="col-md-6">
        <div class="card <?php echo $status;?>">
            <!-- Área do título sem card-header -->
            <div class="card-title-container">
                <h5 class="card-title mb-0 btnDetalhesModal" id='<?php echo $linha['id_agenda']?>'  ><?php echo $linha['cliente']?></h5>
                 <div class="dropdown">
                    <button class="three-dots-btn" type="button" id="cardOptions" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-three-dots-vertical fs-5"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="cardOptions">
                        <li><a  class="dropdown-item btnDetalhesModal" id='<?php echo $linha['id_agenda']?>'><i class="bi bi-eye me-2"></i> Visualizar</a></li>
                        <li><a class="dropdown-item" ><i class="bi bi-pencil me-2"></i> Editar</a></li>
                        <li><a class="dropdown-item marcarConcluido" id='<?php echo $linha['id_agenda']?>' ><i class="bi bi-check-circle me-2"></i> Marcar Concluído</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a  class="dropdown-item text-danger deletarAgenda" id='<?php echo $linha['id_agenda']?>'><i class="bi bi-trash me-2"></i> Cancelar</a></li>
                    </ul>
                </div>
            </div>


            
            <div class="card-body pt-2 btnDetalhesModal" id='<?php echo $linha['id_agenda']?>'>
                <p class='card-subtitle '><i class="bi bi-calendar"></i> <?php echo $semana[$linha['dia']].' - '.$linha['dataformatada'].' - '. $linha['horaformatada']?></p>
                <p class="card-text"><i class="bi bi-balloon"></i> <?php echo $linha['servico']?></p>
            </div>
        </div>

</div>
  
<?php
}
mysqli_close($conn);
?>