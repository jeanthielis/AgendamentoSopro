<?php

include_once('db_connect.php');


$id = intval($_POST['id']);

$sql = "SELECT date_format(data,'%a') as dia, date_format(data, '%d/%m/%Y' ) as dataformatada, date_format(hora,'%H:%i') as horaformatada,id_agenda,cliente,servico,valor,restante,cores,bairro,cidade,situacao,celular,entrada FROM agenda WHERE id_agenda = $id";
$resultado = mysqli_query($conn, $sql);

   
    while ($linha = mysqli_fetch_assoc($resultado)) {
        if ($linha['entrada']==0){
            $mensagem = '<strong><label class="text-dark" >Entrada: R$ '.number_format($linha["entrada"], 2, ',', '.').'</label></strong>';
        }else{
            $mensagem = '<strong><label class="text-success" >Entrada: R$ '.number_format($linha["entrada"], 2, ',', '.').' (pago)</label></strong>';

        }

        
    ?>
    <div class="row">
      
        <div class="col-md-2">
            <img src="assests/imagens/logoOriginal.png" alt="Logo" class="img-fluid mb-3" width="100" height="100">
            
        </div>
        <div class="col-md-5">
           <input type="hidden" id="id_agenda" value="<?php echo $linha['id_agenda']?>">
            <label><strong>Nome Fantasia:</strong> Sopro de Alegria Vix</label>
            <br>
            <label><strong>Telefone:</strong> (27) 98107-1336</label>
            <br>
            <label><strong>Email:</strong> soprodealegriavix.com</label>

        </div>
        <div class="col-md-5">
            <label><strong>CNPJ:</strong> 47.861.674/0001-44</label>
            <br>
            <label><strong>Endereço:</strong> Rua São Pedro, 696 - Conjunto Jacaraípe - Serra - ES</label>



        </div>
    </div>
    <hr>
    <div class="row">
        <h4>Informações Cliente</h4>
        <div class="col-md-6">
            <label><strong>Cliente:</strong> <?php echo $linha['cliente']?></label>
            <br>
            <label><strong>Data do Evento:</strong> <?php echo $linha['dataformatada']?></label>
            <br>
            <label><strong>Local do Evento:</strong> <?php echo $linha['bairro']?></label>
            <br>
            <label><strong>Cores:</strong> <?php echo $linha['cores']?></label>
    

        </div>
        <div class="col-md-6">
            <label><strong>Celular:</strong> <?php echo $linha['celular']?></label>
            <br>
            <label><strong> Horario de Inicio:</strong> <?php echo $linha['horaformatada']?></label>
            <br>
            <label><strong> Cidade: </strong><?php echo $linha['cidade']?></label>
            <br>
            <label><strong>Situação:</strong> 
                <?php 
                if($linha['situacao'] == 0) {
                    echo '<span class="badge rounded-pill bg-primary">Agendado</span>';
                } elseif($linha['situacao'] == 1) {
                    echo "<span class='badge rounded-pill bg-success'>Concluído</span>";
                } elseif($linha['situacao'] == 3) {
                    echo "<span class='badge rounded-pill bg-danger'>Cancelado</span>";
                }
                ?>
            </label>
        </div>
    </div>
    <hr>
    <div class="row">
        <h4>Serviços</h4>
        <div class="col-md-12">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Valor (R$)</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><?php echo $linha['servico']?></td>
                        <td>R$ <?php echo number_format($linha['valor'], 2, ',', '.')?></td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <strong><label class="text-primary">Total: R$ <?php echo number_format($linha['valor'], 2, ',', '.')?></label></strong>
            <br>
            <?php echo $mensagem?>
            <br>
            <strong><label class="text-danger">Restante: R$ <?php echo number_format($linha['restante'], 2, ',', '.')?></label></strong>
        </div>
    </div>
    <?php   
    }
    

mysqli_close($conn);
?>



