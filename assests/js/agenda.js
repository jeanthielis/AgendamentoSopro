   $(document).ready(function() {
            const agendaModal = new bootstrap.Modal(document.getElementById('modalAgendamento'));
            document.getElementById('btnAgendaModal').onclick = () => agendaModal.show();
      
      // Inicializar o modal de agendamento
     
            // Dados fictícios de agendamentos (simulando banco de dados)
            const agendamentos = [
                {
                    id: 1,
                    data: '2023-06-15',
                    hora: '09:00',
                    cliente: 'Maria Silva',
                    celular: '(11) 98765-4321',
                    servico: 'Coloração',
                    valor: 120.00,
                    entrada: 50.00,
                    cores: 'Castanho escuro',
                    bairro: 'Centro',
                    cidade: 'São Paulo',
                    status: 'confirmado',
                    observacoes: 'Cliente pediu para não usar amônia'
                },
                {
                    id: 2,
                    data: '2023-06-15',
                    hora: '10:30',
                    cliente: 'João Santos',
                    celular: '(11) 91234-5678',
                    servico: 'Corte Masculino',
                    valor: 40.00,
                    entrada: 0.00,
                    cores: '',
                    bairro: 'Jardins',
                    cidade: 'São Paulo',
                    status: 'pendente',
                    observacoes: 'Corte social'
                },
                {
                    id: 3,
                    data: '2023-06-16',
                    hora: '14:00',
                    cliente: 'Ana Oliveira',
                    celular: '(11) 99876-5432',
                    servico: 'Hidratação',
                    valor: 80.00,
                    entrada: 30.00,
                    cores: '',
                    bairro: 'Moema',
                    cidade: 'São Paulo',
                    status: 'confirmado',
                    observacoes: 'Trazer o próprio shampoo'
                },
                {
                    id: 4,
                    data: '2023-06-17',
                    hora: '11:00',
                    cliente: 'Carlos Mendes',
                    celular: '(11) 94567-1234',
                    servico: 'Corte Masculino',
                    valor: 35.00,
                    entrada: 0.00,
                    cores: '',
                    bairro: 'Vila Mariana',
                    cidade: 'São Paulo',
                    status: 'cancelado',
                    observacoes: 'Cancelado pelo cliente'
                }
            ];
            
            // Função para renderizar a lista de agendamentos
            function renderizarAgendamentos() {
                const lista = $('#lista-agendamentos');
                lista.empty();
                
                agendamentos.forEach(agendamento => {
                    const statusClass = `status-${agendamento.status}`;
                    const statusText = agendamento.status === 'confirmado' ? 'Confirmado' : 
                                     agendamento.status === 'pendente' ? 'Pendente' : 'Cancelado';
                    
                    const card = `
                        <div class="col-md-6">
                            <div class="card agendamento-card ${statusClass}">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h5 class="card-title">${agendamento.cliente}</h5>
                                            <h6 class="card-subtitle mb-2 text-muted">${formatarData(agendamento.data)} às ${agendamento.hora}</h6>
                                        </div>
                                        <span class="badge ${getStatusBadgeClass(agendamento.status)}">${statusText}</span>
                                    </div>
                                    
                                    <div class="mt-2">
                                        <span class="badge bg-primary servico-badge">${agendamento.servico}</span>
                                        <span class="badge bg-success servico-badge">R$ ${agendamento.valor.toFixed(2)}</span>
                                        ${agendamento.entrada > 0 ? `<span class="badge bg-warning text-dark servico-badge">Entrada: R$ ${agendamento.entrada.toFixed(2)}</span>` : ''}
                                    </div>
                                    
                                    <div class="mt-2">
                                        <p class="card-text mb-1"><i class="bi bi-telephone"></i> ${agendamento.celular}</p>
                                        <p class="card-text mb-1"><i class="bi bi-geo-alt"></i> ${agendamento.bairro}, ${agendamento.cidade}</p>
                                        ${agendamento.cores ? `<p class="card-text mb-1"><i class="bi bi-palette"></i> ${agendamento.cores}</p>` : ''}
                                        ${agendamento.observacoes ? `<p class="card-text"><i class="bi bi-chat-left-text"></i> ${agendamento.observacoes}</p>` : ''}
                                    </div>
                                    
                                    <div class="mt-3 d-flex justify-content-end">
                                        <button class="btn btn-sm btn-outline-primary me-2" onclick="editarAgendamento(${agendamento.id})">
                                            <i class="bi bi-pencil"></i> Editar
                                        </button>
                                        <button class="btn btn-sm btn-outline-danger" onclick="cancelarAgendamento(${agendamento.id})">
                                            <i class="bi bi-x-circle"></i> Cancelar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    lista.append(card);
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
