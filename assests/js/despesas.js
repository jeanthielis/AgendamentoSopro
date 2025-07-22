$(document).ready(function () {
    const agendaModal = new bootstrap.Modal('#modalDespesa');
    document.getElementById('teste').onclick = () => agendaModal.show();



   //Cadastrar Dispesas

   $(document).on("click","#btn-despesa",function(){

    var descricao = $("#descricao").val();
    var valor = $("#valor").val();
    var motivo = $("#motivo").val();
    var dados = {descricao:descricao,valor:valor,motivo:motivo,action:"salvar"}
        $.ajax({
            type: "post",
            url: "banco/db_despesas.php",
            data:dados,
            dataType:'html',
            success: function (response) {
                Swal.fire('Sucesso!', 'Operação concluída com sucesso!', 'success');
                agendaModal.hide();
                renderizarDespesa();
                $('#form-despesas')[0].reset();


                

                
            },
            error: function(){
                Swal.fire('Erro!', 'Algo deu errado!', 'error');

            }
        });
   });

   $(document).on("click",'#fecharDespesa',function(){
        agendaModal.hide();
   })

   //renderizarDespesas

   function renderizarDespesa(){
    $.ajax({
        url: "banco/db_despesas.php",
        type: "post",
        data:{action:"listar"},
        success: function (response) {
            $("#listar-despesa").html(response);
        }
    });
   }

   renderizarDespesa();

    
});
