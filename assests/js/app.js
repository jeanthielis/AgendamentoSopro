   /**
 * Mostra um alerta animado
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo de alerta ('success' ou 'error')
 * @param {number} duration - Duração em milissegundos (opcional, padrão: 5000)
 */
function showAlert(message, type, duration = 5000) {
  const alertContainer = document.getElementById('alert-container');
  
  // Criar elemento do alerta
  const alertElement = document.createElement('div');
  alertElement.className = `alert alert-${type}`;
  
  // Ícone baseado no tipo
  const icon = type === 'success' ? '✓' : '✗';
  
  // Conteúdo do alerta
  alertElement.innerHTML = `
    <span class="alert-content">
      <span class="alert-icon">${icon}</span>
      <span>${message}</span>
    </span>
    <span class="alert-close">&times;</span>
    <div class="alert-progress">
      <div class="alert-progress-bar" style="animation-duration: ${duration/1000}s"></div>
    </div>
  `;
  
  // Adicionar ao container
  alertContainer.appendChild(alertElement);
  
  // Forçar reflow para ativar a animação
  void alertElement.offsetWidth;
  
  // Mostrar alerta
  alertElement.classList.add('show');
  
  // Fechar após a duração
  const timer = setTimeout(() => {
    closeAlert(alertElement);
  }, duration);
  
  // Fechar ao clicar no botão
  const closeBtn = alertElement.querySelector('.alert-close');
  closeBtn.addEventListener('click', () => {
    clearTimeout(timer);
    closeAlert(alertElement);
  });
}

/**
 * Fecha um alerta com animação
 */
function closeAlert(alertElement) {
  alertElement.classList.remove('show');
  alertElement.classList.add('hide');
  
  // Remover após a animação terminar
  alertElement.addEventListener('transitionend', () => {
    alertElement.remove();
  });
}

// Exemplo de uso:
// showAlert('Cadastro realizado com sucesso!', 'success');
// showAlert('Erro ao cadastrar. Tente novamente.', 'error', 8000);
