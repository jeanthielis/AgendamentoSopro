   $(document).ready(function() {
        listarProximos();


    const agendaModal = new bootstrap.Modal('#modalAgendamento');
    document.getElementById('btnAgendaModal').onclick = () => agendaModal.show();
    const detalhesModal = new bootstrap.Modal('#detalhesModal');
    const atualizaModal = new bootstrap.Modal("#atualizarAgendamento");

function downloadDivAsImage(divId, fileName) {
    const element = document.getElementById(divId);

    // Configurações do html2canvas para melhor compatibilidade mobile
    const options = {
        scale: 2,                   // Melhora a qualidade em dispositivos com alta resolução (ex: Retina)
        useCORS: true,              // Permite carregar imagens de outros domínios (se necessário)
        logging: false,             // Desativa logs para melhor desempenho
        allowTaint: false,          // Evita problemas com imagens externas
        scrollX: 0,                 // Garante que a captura não seja afetada pelo scroll
        scrollY: 0,
    };

    html2canvas(element, options)
        .then(function(canvas) {
            // Converte o canvas para imagem (usando JPEG para reduzir tamanho)
            const imageData = canvas.toDataURL('image/jpeg', 0.9);

            // Tenta fazer o download automaticamente
            try {
                const link = document.createElement('a');
                link.href = imageData;
                link.download = fileName || 'captura.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                // Fallback: Abre a imagem em uma nova aba se o download falhar
                window.open(imageData, '_blank');
            }
        })
        .catch(function(error) {
            console.error("Erro ao capturar a div:", error);
            Swal.fire('Erro!', 'Algo deu errado tente eu outro navegador!', 'error');

        });
}

// Uso com jQuery (ou puro JavaScript)
    $('#btn-comprovante').on('click touchstart', function(e) {
        e.preventDefault(); // Evita comportamento padrão do touch
        downloadDivAsImage('comprovante', 'comprovante_agendamento.jpg');
    });




    





    // Abir filtro de pesquisa
    $(document).on('click','.btn-pesquisar',function(){
        $("#filtro-pesquisar").fadeToggle();

    })

        // Função para exibir lista de Concluidos ou Pendentes
        $(document).on('change', '#filtroSituacao', function() {
            const situacao = $(this).val();
            $.ajax({
                url: 'banco/db_listarAgendamento.php',
                type: 'POST',
                data: { situacao: situacao,action:0 },
                success: function(response) {
                    $('#lista-agendamentos').html(response);
                    
                },
                error: function() {
                    Swal.fire('Erro!', 'Algo deu errado!', 'error');

                }   
            })              
        });


        // Função para exibir data
        $(document).on('change', '#filtro-data', function() {
            const data = $(this).val();
            $.ajax({
                url: 'banco/db_listarAgendamento.php',
                type: 'POST',
                data: {data_evento: data,action:1 },
                success: function(response) {
                    $('#lista-agendamentos').html(response);
                    
                },
                error: function() {
                    Swal.fire('Erro!', 'Algo deu errado!', 'error');

                }   
            })             
        });

        // Função buscar por nome
        $(document).on('keyup', '#pesquisarNome', function() {
            const nome = $(this).val();
            $.ajax({
                url: 'banco/db_listarAgendamento.php',
                type: 'POST',
                data: { cliente: nome, action:0 },
                success: function(response) {
                    $('#lista-agendamentos').html(response);
                },
                error: function() {
                    Swal.fire('Erro!', 'Algo deu errado!', 'error');

                }
            });
        });

// Função para renderizar a lista de agendamentos
    function renderizarAgendamentos() {
        $.ajax({
            url: "banco/db_listarAgendamento.php",
            data:{situacao:0, action:0},
            type: 'POST',
            success: function (response) {
                $('#lista-agendamentos').html(response);
                Swal.close();
            }
        });
    }
     function listarProximos() {
        $.ajax({
            url: "banco/db_listarAgendamento.php",
            data:{situacao:0, action:2},
            type: 'POST',
            success: function (response) {
                $("#listar-proximos").html(response);
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
        



// Exibir detalhes do agendamento
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
                Swal.fire('Erro!', 'Algo deu errado!', 'error');

            }
        });
    });

                
            
    // Função para abrir a tela de edição agendamento
  $(document).on('click','.btnAtualizaModal', function() {
        var id = $("#id_agenda").val();
        var id = $(this).attr('id');
        $.ajax({
            url: 'banco/db_editarAgendamento.php',
            type: 'POST',           
            data: { id: id, action: 0 }, // 0 para buscar detalhes
            success: function(response) {
                $("#bodyAtualiza").html(response);
                $("#lbl-comprovante").text("Gerar Comprovante");
                atualizaModal.show();
                detalhesModal.hide();

            },
            error: function() {
                Swal.fire('Erro!', 'Algo deu errado!', 'error');

            }
        });
    });

     $(document).on('click','#btnEditar', function() {
        var id = $("#id_agenda").val();
        $.ajax({
            url: 'banco/db_editarAgendamento.php',
            type: 'POST',           
            data: { id: id, action: 0 }, // 0 para buscar detalhes
            success: function(response) {
                $("#lbl-comprovante").text("Gerar Comprovante");
                $("#bodyAtualiza").html(response);
                atualizaModal.show();
                detalhesModal.hide();

            },
            error: function() {
                Swal.fire('Erro!', 'Algo deu errado!', 'error');

            }
        });
    });


    $(document).on("click","#fechar",function(){
        detalhesModal.hide();
        atualizaModal.hide();

    })
               
    // Função para editar agendamento
  $(document).on('click', '#atualizarAgenda', function() {
        var id = $("#id_agendaAtualizar").val();
        var data = $("#dataAtualizar").val();
        var hora = $("#horaAtualizar").val();
        var cliente = $("#clienteAtualizar").val();
        var celular = $("#celularAtualizar").val();
        var servico = $("#servicoAtualizar").val();
        var valor = $("#valorAtualizar").val();
        var entrada = $("#entradaAtualizar").val();
        var cores = $("#coresAtualizar").val();
        var bairro = $("#bairroAtualizar").val();
        var cidade = $("#cidadeAtualizar").val();
        var restante = parseFloat(valor) - parseFloat(entrada);
        var situacao = $("#situacaoAtualizar").val();
        var dados = {
            id: id,
            data: data,
            hora: hora,
            cliente: cliente,
            celular: celular,
            servico: servico,
            valor: valor,
            entrada: entrada,
            restante: restante,
            cores: cores,
            bairro: bairro,
            cidade: cidade,
            situacao: situacao,
            action: 1, // 1 para editar
        };
        $.ajax({
            url: 'banco/db_editarAgendamento.php',
            type: 'POST',           
            data: dados, // 1 para editar
            dataType: 'html',
            success: function(response) {
                $('#btnEditar').css('display', 'block');
                $('#atualizarAgendamento').css('display', 'none');
                 detalhesModal.hide();   
                renderizarAgendamentos();
                Swal.fire('Sucesso!', 'Operação concluída com sucesso!', 'success');
                $('#modalTitleDetalhes').text('Detalhes do Agendamento');
                $('#formDetalhes')[0].reset();
            },
            error: function() {
                Swal.fire('Erro!', 'Algo deu errado!', 'error');

            }
        });


       
    });
            
    // Função para cancelar agendamento
     $(document).on('click','.deletarAgenda', function() {
        var id = this.id;
        
            // Confirmação
            Swal.fire({
            title: 'Deseja cancelar o agendamento?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, confirmar!'
            }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: 'banco/db_marcarConcluido.php',
                    type: 'POST',
                    data: { id: id , situacao: 3 }, // 3 para cancelado
                    success: function(response) {
                        Swal.fire('Sucesso!', 'Operação concluída com sucesso!', 'success');
                        renderizarAgendamentos();
                    
                    },
                    error: function() {
                        Swal.fire('Erro!', 'Algo deu errado!', 'error');

                    }
                });               
            }
        });

    });
    //Marca agendamento como concluído
    $(document).on('click','.marcarConcluido', function() {
        var id = this.id;

            // Confirmação
            Swal.fire({
            title: 'Deseja marcar como concluído?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, confirmar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: 'banco/db_marcarConcluido.php',
                        type: 'POST',
                        data: { id: id, situacao: 1 },
                        success: function(response) {
                            renderizarAgendamentos();
                            Swal.fire('Confirmado!','Sua ação foi executada.','success')
                        },                                   
    
                        error: function() {
                            Swal.fire('Erro!', 'Algo deu errado!', 'error');

                        }
                    });
                }
        
            }); })                        

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
                $('#formAgendamento')[0].reset();
                Swal.fire('Sucesso!', 'Agendado com sucesso!', 'success');
                $('#modalAgendamentoLabel').text('Novo Agendamento');
                $("#btnSalvarAgendamento").prop('disabled', false);
                $("#btnSalvarAgendamento").text('Salvar Agendamento');
                renderizarAgendamentos();



            },
            error: function(result) {
               Swal.fire('Erro!', 'Algo deu errado!', 'error');
              $("#btnSalvarAgendamento").prop('disabled', false);
              $("#btnSalvarAgendamento").text('Salvar Agendamento');
          }
     
        });
     
    });
 
            
           
    // Inicializar a lista de agendamentos
    renderizarAgendamentos();
});
