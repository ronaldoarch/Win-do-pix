console.log('Arquivo roleta.js carregado!');
document.addEventListener('DOMContentLoaded', function() {
  // Itens surpresa
  const surpresas = [
    '🎯 Convite Exclusivo: Acesso Liberado ao Grupo dos Jogadores Lucrativos',
    '🔥 Dica Quente do Dia Desbloqueada – Só pra Quem Gira a Roleta',
    '🔔 Alerta Prioritário: Você Será Avisado Primeiro Quando um Slot Estiver Pagando',
    '🧠 Acesso Inteligente: Horários Secretos de Pagamento Revelados no Grupo',
    '💬 Entrada Confirmada: As Melhores Casas de Slot Concentradas em um Só Lugar',
    '📊 Relatório VIP: Dicas Testadas da Galera que Lucra Toda Semana',
    '🔒 Informação Restringida: Só os Membros Sabem Quais Slots Estão "quentes"',
    '🥷 Acesso Silencioso: Entre Sem Alarde no Grupo Onde o Dinheiro se Move'
  ];
  // Configuração dos valores da roleta (todos iguais: surpresa)
  const valores = Array(8).fill('🎁 Surpresa');
  const roleta = document.getElementById('roleta');
  const ctx = roleta.getContext('2d');
  const numSetores = valores.length;
  const anguloSetor = 2 * Math.PI / numSetores;
  const cores = ["#D4AF37", "#A67C00"];
  // Ícones exclusivos para cada setor
  const icones = ['🗝️', '💎', '🏆', '👑', '💰', '🔥', '🤫', '⭐'];
  // Desenhar roleta
  function desenharRoleta(anguloAtual = 0) {
    for (let i = 0; i < numSetores; i++) {
      ctx.beginPath();
      ctx.moveTo(130, 130);
      ctx.arc(130, 130, 130, anguloAtual + i * anguloSetor, anguloAtual + (i + 1) * anguloSetor);
      ctx.closePath();
      ctx.fillStyle = cores[i % 2];
      ctx.fill();
      // Texto
      ctx.save();
      ctx.translate(130, 130);
      ctx.rotate(anguloAtual + (i + 0.5) * anguloSetor);
      ctx.textAlign = "center";
      ctx.fillStyle = "#222";
      ctx.font = "bold 32px Arial";
      ctx.fillText(icones[i], 70, 10);
      ctx.restore();
    }
    // Indicador
    ctx.beginPath();
    ctx.moveTo(130, 10);
    ctx.lineTo(120, 30);
    ctx.lineTo(140, 30);
    ctx.closePath();
    ctx.fillStyle = "#FF3CAC";
    ctx.fill();
  }
  desenharRoleta();
  // Girar roleta
  let girando = false;
  let anguloAtual = 0;
  let tentativas = 0;
  const girarBtn = document.getElementById('girar-btn');
  const notificacaoParabens = document.getElementById('notificacao-parabens');
  const notificacaoSegundaTentativa = document.getElementById('notificacao-segunda-tentativa');
  const surpresaNotificacao = document.getElementById('surpresa-notificacao');

  // Premiações em dobro
  const premios = [
    { texto: "BÔNUS EM DOBRO", cor: "#FFD700" },
    { texto: "BÔNUS EM DOBRO", cor: "#FF4500" },
    { texto: "BÔNUS EM DOBRO", cor: "#32CD32" },
    { texto: "BÔNUS EM DOBRO", cor: "#FF69B4" },
    { texto: "BÔNUS EM DOBRO", cor: "#1E90FF" },
    { texto: "BÔNUS EM DOBRO", cor: "#FF1493" }
  ];

  function girarRoleta() {
    if (girando) return;
    
    tentativas++;
    girando = true;
    girarBtn.disabled = true;
    
    // Número aleatório de voltas (entre 5 e 10)
    const voltas = 5 + Math.random() * 5;
    const anguloFinal = voltas * 2 * Math.PI;
    const duracao = 5000; // 5 segundos
    const inicio = performance.now();
    
    function animar(tempoAtual) {
      const progresso = (tempoAtual - inicio) / duracao;
      
      if (progresso < 1) {
        // Função de easing para desaceleração suave
        const easing = 1 - Math.pow(1 - progresso, 3);
        anguloAtual = anguloFinal * easing;
        desenharRoleta(anguloAtual);
        requestAnimationFrame(animar);
      } else {
        girando = false;
        girarBtn.disabled = false;
        
        // Calcular o prêmio ganho
        const anguloNormalizado = anguloAtual % (2 * Math.PI);
        const indicePremio = Math.floor((2 * Math.PI - anguloNormalizado) / (2 * Math.PI / premios.length));
        const premioGanho = premios[indicePremio];
        
        // Mostrar notificação apropriada
        if (tentativas === 1) {
          surpresaNotificacao.textContent = "Parabéns! Você acabou de ganhar um bônus em dobro!";
          notificacaoParabens.style.display = 'flex';
        } else {
          notificacaoSegundaTentativa.style.display = 'flex';
        }
      }
    }
    
    requestAnimationFrame(animar);
  }

  // Event listeners
  girarBtn.addEventListener('click', girarRoleta);

  // Fechar notificações
  notificacaoParabens.addEventListener('click', (e) => {
    if (e.target === notificacaoParabens) {
      notificacaoParabens.style.display = 'none';
    }
  });

  notificacaoSegundaTentativa.addEventListener('click', (e) => {
    if (e.target === notificacaoSegundaTentativa) {
      notificacaoSegundaTentativa.style.display = 'none';
    }
  });
}); 