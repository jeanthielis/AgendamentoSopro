   $(document).ready(function() {

        const agendaModal = new bootstrap.Modal(document.getElementById('modalAgendamento'));
        document.getElementById('btnAgendaModal').onclick = () => agendaModal.show();
        const detalhesModal = new bootstrap.Modal('#detalhesModal');


    $(document).on('click', '.btnDetalhesModal', function() {
        const id = $(this).attr('id');
        $.ajax({
            url: 'banco/db_exibirDetalhes.php',
            type: 'POST',
            data: { id: id },
            success: function(response) {
                $('#modalBodyDetalhes').html(response);
                detalhesModal.show();
            },
            error: function() {
                showAlert('Erro ao carregar detalhes do agendamento.', 'danger');
            }
        });
    });
    $(document).on('click','.btn-pesquisar',function(){
        $("#filtro-pesquisar").fadeToggle();

    })

        // Função para exibir lista de Concluidos ou Pendentes
        $(document).on('change', '#filtroSituacao', function() {
            const situacao = $(this).val();
            $.ajax({
                url: 'banco/db_listarAgendamento.php',
                type: 'POST',
                data: { situacao: situacao },
                success: function(response) {
                    $('#lista-agendamentos').html(response);
                    
                },
                error: function() {
                    showAlert('Erro ao carregar agendamentos.', 'danger');
                }   
            })              
        });

        // Função buscar por nome
        $(document).on('keyup', '#pesquisarNome', function() {
            const nome = $(this).val();
            $.ajax({
                url: 'banco/db_listarAgendamento.php',
                type: 'POST',
                data: { cliente: nome, situacao:" " },
                success: function(response) {
                    $('#lista-agendamentos').html(response);
                },
                error: function() {
                    showAlert('Erro ao buscar agendamentos.', 'danger');
                }
            });
        });

        // Função para renderizar a lista de agendamentos
        function renderizarAgendamentos() {
            const situacao = $('#situacao').val() ||0;
            $.ajax({
                url: "banco/db_listarAgendamento.php",
                data:{situacao:situacao},
                type: 'POST',
                success: function (response) {
                    $('#lista-agendamentos').html(response);
                }
            });
        }
      
   // Função servicoAutocomplete
        $(function() {
            const itens = [
                "Arco Desconstruído Mini",
                "Arco Desconstruído Médio",
                "Arco Desconstruído Mega",
                "Mural Desconstruído",
                "Mão de Obras",
                "Coluna de Balões"
            ];
            //Buscar do banco de dados
            /*function showResults() {
                const term = $input.val().trim();
                if (term.length < 2) return;
                
                $.get('busca_itens.php', { termo: term })
                .done(data => {
                    // Processa os dados retornados
                    displayResults(data);
                })
                .fail(() => alert('Erro na busca'));
            }*/

            const $input = $('#servico');
            const $list = $('#autocompleteList');
            let activeIndex = -1;

            // Mostra resultados
            function showResults() {
                const term = $input.val().trim().toLowerCase();
                activeIndex = -1;
                $list.empty().addClass('d-none');
                
                if (!term) return;
                
                const matches = itens.filter(item => 
                    item.toLowerCase().includes(term)
                );
                
                if (matches.length) {
                    matches.forEach(item => {
                        $('<div>')
                            .addClass('autocomplete-item')
                            .html(item.replace(
                                new RegExp(term, 'gi'),
                                '<strong>$&</strong>'
                            ))
                            .on('click', () => {
                                $input.val(item);
                                $list.addClass('d-none');
                            })
                            .appendTo($list);
                    });
                    $list.removeClass('d-none');
                } else {
                    $list.html('<div class="autocomplete-item text-muted">Nenhum item encontrado</div>')
                        .removeClass('d-none');
                }
            }

            // Navegação por teclado
            $input.on('keydown', function(e) {
                const $items = $list.children();
                if (!$items.length) return;
                
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    activeIndex = (activeIndex + 1) % $items.length;
                    updateActiveItem($items, activeIndex);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    activeIndex = (activeIndex - 1 + $items.length) % $items.length;
                    updateActiveItem($items, activeIndex);
                } else if (e.key === 'Enter' && activeIndex > -1) {
                    e.preventDefault();
                    $items.eq(activeIndex).click();
                }
            });
            
            // Atualiza item ativo
            function updateActiveItem($items, index) {
                $items.removeClass('autocomplete-active')
                    .eq(index).addClass('autocomplete-active')
                    [0]?.scrollIntoView({ block: 'nearest' });
            }
            
            // Fecha ao clicar fora
            $(document).on('click', e => {
                if (!$(e.target).closest('.autocomplete-container').length) {
                    $list.addClass('d-none');
                }
            });
            
            $input.on('input', showResults);
        });

                
            
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
     $(document).on('click','.deletarAgenda', function() {
        var id = this.id;
        if (confirm('Você tem certeza que deseja cancelar este agendamento?')) {
            $.ajax({
                url: 'banco/db_deletarAgendamento.php',
                type: 'POST',
                data: { id: id },
                success: function(response) {
                        showAlert('Agendamento deletado com sucesso!', 'success');
                        renderizarAgendamentos();
                        renderizarConcluidos();
                   
                },
                error: function() {
                    showAlert('Erro ao conectar com o servidor. Tente novamente.', 'danger');
                }
            });
        }
    });
    //Marca agendamento como concluído
    $(document).on('click','.marcarConcluido', function() {
        var id = this.id;
        if (confirm('Você tem certeza que deseja marcar este agendamento como concluído?')) {
            $.ajax({
                url: 'banco/db_marcarConcluido.php',
                type: 'POST',
                data: { id: id },
                success: function(response) {
                    showAlert('Agendamento marcado como concluído!', 'success');
                    renderizarAgendamentos();
                },                                   
 
                error: function() {
                    showAlert('Erro ao conectar com o servidor. Tente novamente.', 'danger');
                }
            });
        }   
    })                        

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
                renderizarAgendamentos();



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
