   $(document).ready(function() {
            const agendaModal = new bootstrap.Modal(document.getElementById('modalAgendamento'));
            document.getElementById('btnAgendaModal').onclick = () => agendaModal.show();
      

            // Função para renderizar a lista de agendamentos
            function renderizarAgendamentos() {
                
            $.ajax({
                url: "banco/db_listarAgendamento.php",
                success: function (response) {
                    $('#lista-agendamentos').html(response);
                }
            });
        }
            
            // Função para formatar data (DD/MM/YYYY)
            function formatarData(dataString) {
                const data = new Date(dataString);
                return data.toLocaleDateString('pt-BR');
            }
            
            // Função para retornar a classe do badge de status
            function getStatusBadgeClass(status) {
                return status === 'confirmado' ? 'bg-success' : 
                       status === 'pendente' ? 'bg-warning text-dark' : 'bg-danger';
            }            
            
            // Função para editar agendamento
            window.editarAgendamento = function(id) {
                const agendamento = agendamentos.find(a => a.id === id);
                if (agendamento) {
                    // Preencher o modal com os dados do agendamento
                    $('#data').val(agendamento.data);
                    $('#hora').val(agendamento.hora);
                    $('#cliente').val(agendamento.cliente);
                    $('#celular').val(agendamento.celular);
                    $('#servico').val(agendamento.servico);
                    $('#valor').val(agendamento.valor);
                    $('#entrada').val(agendamento.entrada);
                    $('#cores').val(agendamento.cores);
                    $('#bairro').val(agendamento.bairro);
                    $('#cidade').val(agendamento.cidade);
                    $('#observacoes').val(agendamento.observacoes);
                    
                    // Alterar o título do modal
                    $('#modalAgendamentoLabel').text('Editar Agendamento');
                    
                    // Abrir o modal
                    const modal = new bootstrap.Modal(document.getElementById('modalAgendamento'));
                    modal.show();
                }
            };
            
            // Função para cancelar agendamento
            window.cancelarAgendamento = function(id) {
                if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
                    const index = agendamentos.findIndex(a => a.id === id);
                    if (index !== -1) {
                        agendamentos[index].status = 'cancelado';
                        renderizarAgendamentos();
                    }
                }
            };
            

    // Botão para salvar agendamento        
    $(document).on('click','#btnSalvarAgendamento',function(){
       var data = $("#data").val();
       var hora = $("#hora").val();
       var cliente = $("#cliente").val();
       var servico = $("#servico").val();
       var valor = $("#valor").val();
       var entrada = $("#entrada").val();
       var cores = $("#cores").val();
       var bairro = $("#bairro").val();
       var cidade = $("#cidade").val();
       var celular = $("#celular").val();
       var restante = parseFloat(valor)-parseFloat(entrada);
       var dados = {data:data,hora:hora,cliente:cliente,celular:celular,servico:servico,valor:valor,entrada:entrada,restante:restante,cores:cores,bairro:bairro,cidade:cidade};
        $.ajax({
            url:"banco/db_agendamento.php",
            type:'post',
            data:dados,
            dataType:'html',
            beforeSend:function(){
                $("#btnSalvarAgendamento").prop('disabled', true);
                $("#btnSalvarAgendamento").text('Salvando...');
            },
            success:function(response){
                agendaModal.hide();
                showAlert('Cadastro realizado com sucesso!', 'success');
                $("#btnSalvarAgendamento").prop('disabled', false);
                $("#btnSalvarAgendamento").text('Salvar Agendamento');


            },
            error: function(result) {
              alert("Erro ao salvar agendamento. Tente novamente.");
              $("#btnSalvarAgendamento").prop('disabled', false);
              $("#btnSalvarAgendamento").text('Salvar Agendamento');
          }
     
        });
     
    });
 
            
            // Quando o modal é fechado, limpar o formulário
            $('#modalAgendamento').on('hidden.bs.modal', function () {
                $('#formAgendamento')[0].reset();
                $('#modalAgendamentoLabel').text('Novo Agendamento');
            });
            
            // Inicializar a lista de agendamentos
            renderizarAgendamentos();
        });
