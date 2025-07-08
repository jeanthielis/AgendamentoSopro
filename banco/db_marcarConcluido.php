<?php
include_once('db_connect.php');



 $id = intval($_POST['id']);
 $situacao = intval($_POST['situacao']);

 if($situacao ===3){
     $sql="UPDATE agenda SET situacao = $situacao, restante = 0 , entrada = 0, valor= 0 where id_agenda='$id'";

 }else{
     $sql="UPDATE agenda SET situacao = $situacao, restante = 0 where id_agenda='$id'";

 }

    mysqli_query($conn,$sql);
    mysqli_close($conn);
?>