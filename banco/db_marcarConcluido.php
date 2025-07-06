<?php
include_once('db_connect.php');

 $id = intval($_POST['id']);

 $sql="UPDATE agenda SET situacao = 1, restante = 0 where id_agenda='$id'";
    mysqli_query($conn,$sql);
    mysqli_close($conn);
?>