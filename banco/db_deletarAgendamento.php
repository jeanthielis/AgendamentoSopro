<?php
include_once('db_connect.php');

 $id = intval($_POST['id']);


 $sql="delete from agenda where id_agenda='$id'";
    mysqli_query($conn,$sql);
    mysqli_close($conn);
?>