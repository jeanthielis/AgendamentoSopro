<?php

include_once('db_connect.php');


$id = intval($_POST['id']);

$sql = "SELECT date_format(data,'%a') as dia,data, date_format(hora,'%H:%i') as horaformatada,id_agenda,cliente,servico,valor,restante,cores,bairro,cidade,situacao,celular FROM agenda WHERE id_agenda = $id";
$resultado = mysqli_query($conn, $sql);

   
    while ($linha = mysqli_fetch_assoc($resultado)) {
       ?>
       <form id="formDetalhes" class="row g-3">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="data" class="form-label">Data</label>
                                <input value="<?php echo $linha['data']?>" type="date" class="form-control" id="data" required>
                            </div>
                            <div class="col-md-6">
                                <label for="hora" class="form-label">Hora</label>
                                <input value="<?php echo $linha['horaformatada']?>" type="time" class="form-control" id="hora" required>
                            </div>
                            
                            <div class="col-md-6">
                                <label for="cliente" class="form-label">Cliente</label>
                                <input value="<?php echo $linha['cliente']?>" type="text" class="form-control" id="cliente" name="cliente" required>
                            </div>
                            <div class="col-md-6">
                                <label for="celular" class="form-label">Celular</label>
                                <input value="<?php echo $linha['celular']?>" type="tel" class="form-control" id="celular" required>
                            </div>
                            
                            <div class="col-md-6">
                                <label for="servico" class="form-label">Serviço</label>                  
                                    <input type="text" id="servico" class="form-control" placeholder="Digite o nome do item..." autocomplete="off">
                                    <div id="autocompleteList" class="autocomplete-items d-none"></div>
                            </div>
                            <div class="col-md-6">
                                <label for="valor" class="form-label">Valor (R$)</label>
                                <input value="<?php echo $linha['valor']?>" type="number" step="0.01" class="form-control" id="valor" required>
                            </div>
                            
                            <div class="col-md-6">
                                <label for="entrada" class="form-label">Entrada (R$)</label>
                                <input value="<?php echo $linha['entrada']?>" type="number" step="0.01" class="form-control" id="entrada">
                            </div>
                            <div class="col-md-6">
                                <label for="cores" class="form-label">Cores</label>
                                <input value="<?php echo $linha['cores']?>" type="text" class="form-control" id="cores" placeholder="Ex: Vermelho, Loiro...">
                            </div>
                            
                            <div class="col-md-6">
                                <label for="bairro" class="form-label">Bairro</label>
                                <input value="<?php echo $linha['bairro']?>" type="text" class="form-control" id="bairro">
                            </div>
                            <div class="col-md-6">
                                <label for="cidade" class="form-label">Cidade</label>
                                <input value="<?php echo $linha['cidade']?>" type="text" class="form-control" id="cidade">
                            </div>
                            
                            <div class="col-12">
                                <label for="observacoes" class="form-label">Observações</label>
                                <textarea class="form-control" id="observacoes" rows="3"></textarea>
                            </div>
                        </div>
                    </form>









       <?php
    }
    

mysqli_close($conn);
?>



