<?php

include_once('db_connect.php');

 $id = intval($_POST['id']);
    $sql = "SELECT date_format(data,'%a') as dia, date_format(data, '%d/%m/%Y' ) as dataformatada, date_format(hora,'%H:%i') as horaformatada,id_agenda,cliente,servico,valor,restante,cores,bairro,cidade,situacao,celular FROM agenda WHERE id_agenda = $id";
    $resultado = mysqli_query($conn, $sql);
   
    
    while ($linha = mysqli_fetch_assoc($resultado)) {
     
        echo "<p><strong>Cliente:</strong> " . $linha['cliente']. "</p>";

        echo "<p><strong>Data:</strong> " . $linha['dataformatada']." - ".$linha['horaformatada']."</p>";

        echo "<p><strong>Serviço:</strong> " . $linha['servico']. "</p>";

        echo "<p><strong>Cor:</strong> <span style='color: " . $linha['cores'] . ";'>" . $linha['cores'] . "</span></p>";

        echo "<p><strong>Valor:</strong> R$ " . number_format($linha['valor'], 2, ',', '.').' - '. "<strong>Restante:</strong> R$" . number_format($linha['restante'], 2, ',', '.'). "</p>";

        echo "<p><strong>Bairro:</strong> " . $linha['bairro'].' - '. "<strong>Cidade:</strong> " . $linha['cidade']. "</p>";

        echo "<p><strong>Celular:</strong> " . $linha['celular']. "</p>";

        echo "<p><strong>Situação:</strong> " . ($linha['situacao'] == 0 ? 'Pendente' : 'Concluído'). "</p>";
                                    
    }
?>



