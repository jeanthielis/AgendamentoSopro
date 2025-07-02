<?php
include_once('db_connect.php');


$sql="SELECT date_format(data,'%a') as dia, date_format(data, '%d/%m/%Y' ) as dataformatada, date_format(hora,'%H:%i') as horaformatada,id_agenda,cliente,servico,valor,restante,cores,bairro,cidade,situacao,celular FROM agenda WHERE situacao=0 ORDER BY data" ;
$semana = array('Sun'=>'Dom','Mon'=>'Seg','Tue'=>'Ter','Wed'=>'Qua','Thu'=>'Qui','Fri'=>'Sex','Sat'=>'Sáb');
$sql2="SELECT sum(restante) as soma,count(id_agenda) as festa  FROM agenda WHERE situacao=0" ;

$resultado = mysqli_query($conn,$sql);
$resultadoSoma = mysqli_query($conn,$sql2);


while($result = mysqli_fetch_assoc($resultadoSoma)){
?>                   
       <div class="row text-light">
              <div class="col">

              </div>
              <div class="col-5 text-center">
              <span  class="badge badge-secondary p-2">
                     <i class="fas fa-1x fa-gift"></i>
                     <label><?php echo $result['festa']?></label>
              </span>
              <span  class="badge  badge-success p-2">
                     <i class="fas fa-1x fa-dollar-sign"></i>
                     <label><?php echo number_format($result['soma'],2,',','.')?></label>
              </span>     
                    
              </div>
              <div class="col">
               
              </div>
       </div>
       <div class="row">

       
       
<?php
}
?>
                    
<?php
while($linha=mysqli_fetch_assoc($resultado)){
      
       
?>           
              
                     <div class="col-md-6 ">
                            <div  class="card agendamento-card status-confirmado">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h6 class="card-title"><?php echo $linha['cliente']?></h6>
                                            <h6 class="card-subtitle mb-2 text-muted"><?php echo $semana[$linha['dia']].' - '. $linha['dataformatada'].' - '. $linha['horaformatada']?></h6>
                                        </div>
                                        <span class="badge ${getStatusBadgeClass(agendamento.status)}">${statusText}</span>
                                    </div>
                                    
                                    <div class="mt-2">
                                        <p class="card-text mb-1"><i class="bi bi-balloon"></i></i> <?php echo $linha['servico']?></p>
                                        <p class="card-text mb-1"><i class="bi bi-cash-coin"></i> <?php echo 'R$'.number_format($linha['valor'],2,',','.').' / R$'. number_format($linha['restante'],2,',','.')?></p>
                                        
                                    </div>
                                    
                                    <div class="mt-2">
                                        <p class="card-text mb-1"><i class="bi bi-telephone"></i> <?php echo $linha['celular']?></p>
                                        <p class="card-text mb-1"><i class="bi bi-geo-alt"></i><?php echo $linha['bairro'].' - '.$linha['cidade'] ?></p>
                                        <p class="card-text mb-1"><i class="bi bi-palette"></i> <?php echo $linha['cores']?></p>
                                        <p class="card-text"><i class="bi bi-chat-left-text"></i> </p>
                                    </div>
                                    
                                    <div class="mt-3 d-flex justify-content-end">
                                        <button class="btn btn-sm btn-outline-primary me-2" onclick="editarAgendamento(${agendamento.id})">
                                            <i class="bi bi-pencil"></i> Editar
                                        </button>
                                        <button class="btn btn-sm btn-outline-danger" onclick="cancelarAgendamento(${agendamento.id})">
                                            <i class="bi bi-x-circle"></i> Cancelar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                   
              
              
            
     
<?php
}
mysqli_close($conn);
?>