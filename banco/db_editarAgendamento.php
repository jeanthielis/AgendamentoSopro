<?php

include_once('db_connect.php');
$action = intval($_POST['action']);
$id = intval($_POST['id']);
$data = $_POST['data'];
$hora = $_POST['hora'];
$cliente = $_POST['cliente'];
$entrada = floatval($_POST['entrada']);
$celular = $_POST['celular'];
$servico = $_POST['servico'];
$valor = floatval($_POST['valor']);
$restante = floatval($_POST['restante']);
$cores = $_POST['cores'];
$bairro = $_POST['bairro'];
$cidade = $_POST['cidade'];
$situacao = intval($_POST['situacao']);

if($action == 1) {
    // Update existing appointment
    $sql = "UPDATE agenda SET data='$data', hora='$hora', cliente='$cliente', celular='$celular', servico='$servico', valor='$valor', restante='$restante', cores='$cores', bairro='$bairro', cidade='$cidade', situacao='$situacao',entrada='$entrada' WHERE id_agenda = $id";
    $resultado = mysqli_query($conn, $sql);

} else {
    $sql = "SELECT date_format(data,'%a') as dia,data, date_format(hora,'%H:%i') as horaformatada,id_agenda,cliente,servico,valor,restante,cores,bairro,cidade,situacao,celular,entrada FROM agenda WHERE id_agenda = $id";
    $resultado = mysqli_query($conn, $sql);
    while ($linha = mysqli_fetch_assoc($resultado)) {
       ?>
       <form id="formDetalhes" class="row g-3">
        <input style="display: none;" type="text" value="<?php echo $linha['id_agenda']?>" id="id_agendaAtualizar"> 
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="data" class="form-label">Data</label>
                                <input value="<?php echo $linha['data']?>" type="date" class="form-control" id="dataAtualizar" required>
                            </div>
                            <div class="col-md-6">
                                <label for="hora" class="form-label">Hora</label>
                                <input value="<?php echo $linha['horaformatada']?>" type="time" class="form-control" id="horaAtualizar" required>
                            </div>
                            
                            <div class="col-md-6">
                                <label for="cliente" class="form-label">Cliente</label>
                                <input value="<?php echo $linha['cliente']?>" type="text" class="form-control" id="clienteAtualizar" name="clienteAtualizar" required>
                            </div>
                            <div class="col-md-6">
                                <label for="celular" class="form-label">Celular</label>
                                <input value="<?php echo $linha['celular']?>" type="tel" class="form-control" id="celularAtualizar" required>
                            </div>
                            
                            <div class="col-md-6">
                                <label for="servico" class="form-label">Serviço</label>                  
                                    <input value="<?php echo $linha['servico']?>" type="text" id="servicoAtualizar" class="form-control" placeholder="Digite o nome do item...">
                            </div>
                            <div class="col-md-6">
                                <label for="valor" class="form-label">Valor (R$)</label>
                                <input value="<?php echo $linha['valor']?>" type="number" step="0.01" class="form-control" id="valorAtualizar" required>
                            </div>
                            
                            <div class="col-md-6">
                                <label for="entrada" class="form-label">Entrada (R$)</label>
                                <input value="<?php echo $linha['entrada']?>" type="number" step="0.01" class="form-control" id="entradaAtualizar">
                            </div>
                            <div class="col-md-6">
                                <label for="cores" class="form-label">Cores</label>
                                <input value="<?php echo $linha['cores']?>" type="text" class="form-control" id="coresAtualizar" placeholder="Ex: Vermelho, Loiro...">
                            </div>
                            
                            <div class="col-md-6">
                                <label for="bairro" class="form-label">Local do Evento</label>
                                <input value="<?php echo $linha['bairro']?>" type="text" class="form-control" id="bairroAtualizar">
                            </div>
                            <div class="col-md-6">
                                <label for="cidade" class="form-label">Cidade</label>
                                <input value="<?php echo $linha['cidade']?>" type="text" class="form-control" id="cidadeAtualizar">
                            </div>
                            <div class="col-md-6">
                                <label for="situacao" class="form-label">Situação</label>
                                <select id="situacao" class="form-select">
                                    <option value="0" <?php if($linha['situacao'] == 0) echo 'selected'; ?>>Agendado</option>
                                    <option value="1" <?php if($linha['situacao'] == 1) echo 'selected'; ?>>Concluído</option>
                                    <option value="3" <?php if($linha['situacao'] == 3) echo 'selected'; ?>>Cancelado</option>
                                </select>
                            </div>
                            
                            <div class="col-12">
                                <label for="observacoes" class="form-label">Observações</label>
                                <textarea class="form-control" id="observacoes" rows="3"></textarea>
                            </div>
                        </div>
                    </form>


       <?php

    }

}

      

mysqli_close($conn);
?>



