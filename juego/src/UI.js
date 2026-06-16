export class UI {
  constructor() {
    this.menuScreen = document.getElementById('menu-screen');
    this.instructionsScreen = document.getElementById('instructions-screen');
    this.gameoverScreen = document.getElementById('gameover-screen');
    this.hud = document.getElementById('hud');
    this.hudRound = document.getElementById('hud-round');
    this.hudScore = document.getElementById('hud-score');
    this.hudAttempts = document.getElementById('hud-attempts');
    this.selectedSeconds = 45;
    this.swingPrompt = document.getElementById('swing-prompt');
    this.resultPopup = document.getElementById('result-popup');
    this.resultTitle = document.getElementById('result-title');
    this.resultMessage = document.getElementById('result-message');
    this.resultScore = document.getElementById('result-score');
    this.resultDetail = document.getElementById('result-detail');
    this.roundAnnounce = document.getElementById('round-announce');
    this.roundAnnounceNum = document.getElementById('round-announce-num');
    this.finalScore = document.getElementById('final-score');
    this.finalMessage = document.getElementById('final-message');
    this.confettiContainer = document.getElementById('confetti-container');

    this.btnStart = document.getElementById('btn-start');
    this.btnStartGame = document.getElementById('btn-start-game');
    this.btnNextRound = document.getElementById('btn-next-round');
    this.btnReplay = document.getElementById('btn-replay');

    this.visibleScreen = 'menu';
    this.callbacks = {};
    this._onKeyHandler = null;
  }

  showMenu(onStart) {
    this.hideAllScreens();
    this.menuScreen.classList.add('active');
    this.hud.classList.remove('active');
    this.visibleScreen = 'menu';

    this.btnStart.onclick = () => {
      if (onStart) onStart();
    };
  }

  showInstructions(onStart) {
    this.hideAllScreens();
    this.instructionsScreen.classList.add('active');
    this.visibleScreen = 'instructions';

    document.querySelectorAll('.timer-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.timer-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.selectedSeconds = parseInt(btn.dataset.seconds);
      };
    });

    this.btnStartGame.onclick = () => {
      if (onStart) onStart();
    };
  }

  showHUD() {
    this.hud.classList.add('active');
  }

  hideHUD() {
    this.hud.classList.remove('active');
  }

  updateTimer(seconds) {
    const el = document.getElementById('hud-timer');
    if (el) {
      el.textContent = seconds;
      el.style.color = seconds <= 10 ? '#FF4444' : '#FFD700';
    }
  }

  hideTimer() {
    const el = document.getElementById('hud-timer');
    if (el) el.textContent = '--';
  }

  updateHUD(round, score, attempts) {
    this.hudRound.textContent = round;
    this.hudScore.textContent = score;
    this.hudAttempts.textContent = attempts;
  }

  setTutorialHUD() {
    this.hudRound.textContent = 'Práctica';
    this.hudScore.textContent = '0';
    this.hudAttempts.textContent = '-';
  }

  showSwingPrompt() {
    this.swingPrompt.classList.add('active');
  }

  hideSwingPrompt() {
    this.swingPrompt.classList.remove('active');
  }

  showRoundAnnounce(round, onComplete) {
    this.roundAnnounceNum.textContent = round;
    this.roundAnnounce.classList.add('active');

    setTimeout(() => {
      this.roundAnnounce.classList.remove('active');
      if (onComplete) onComplete();
    }, 2000);
  }

  showResult(hit, roundScore, totalScore, detail, onNext) {
    if (hit) {
      this.resultTitle.textContent = '🎉 ¡Jajugá!';
      this.resultTitle.className = 'hit';
      this.resultMessage.textContent = '¡Rompeté el cántaro!';
    } else {
      this.resultTitle.textContent = '😅 Ma\'ena... ejavy';
      this.resultTitle.className = 'miss';
      this.resultMessage.textContent = 'No golpeaste el cántaro...';
    }

    this.resultScore.textContent = `+${roundScore}`;
    this.resultDetail.textContent = detail;
    this.resultPopup.classList.add('active');

    if (this._onKeyHandler) {
      document.removeEventListener('keydown', this._onKeyHandler);
    }
    const dismiss = () => {
      this.resultPopup.classList.remove('active');
      document.removeEventListener('keydown', this._onKeyHandler);
      this._onKeyHandler = null;
      if (onNext) onNext();
    };
    this._onKeyHandler = (e) => {
      if (e.code === 'Space') { e.preventDefault(); dismiss(); }
    };
    this.btnNextRound.onclick = dismiss;
    document.addEventListener('keydown', this._onKeyHandler);
  }

  showGameOver(finalScore, message, onReplay) {
    this.hideAllScreens();
    this.gameoverScreen.classList.add('active');
    this.hud.classList.remove('active');
    this.visibleScreen = 'gameover';

    this.finalScore.textContent = finalScore;
    this.finalMessage.textContent = message;

    this.btnReplay.onclick = () => {
      if (onReplay) onReplay();
    };
  }

  showConfetti(count = 80) {
    const colors = ['#D52B1E', '#FFFFFF', '#0038A8', '#FFD700', '#00AA00', '#FF69B4'];

    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-10px';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = (5 + Math.random() * 10) + 'px';
      confetti.style.height = (5 + Math.random() * 10) + 'px';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.animation = `confetti-fall ${2 + Math.random() * 3}s linear forwards`;
      confetti.style.animationDelay = Math.random() * 2 + 's';
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

      this.confettiContainer.appendChild(confetti);

      setTimeout(() => {
        if (confetti.parentNode) confetti.parentNode.removeChild(confetti);
      }, 6000);
    }

    if (!document.getElementById('confetti-style')) {
      const style = document.createElement('style');
      style.id = 'confetti-style';
      style.textContent = `
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  showHelpText(text) {
    let el = document.getElementById('help-text');
    if (!el) return;
    el.textContent = text;
    el.classList.add('active');
  }

  hideHelpText() {
    const el = document.getElementById('help-text');
    if (el) el.classList.remove('active');
  }

  showTutorialStep(step) {
    const steps = {
      welcome: '🎯 RONDA DE PRÁCTICA — Caminá hacia el cántaro con ↑',
      move: '🟢 Presioná ↑ para caminar hacia adelante',
      turn: '🔄 Usá ← y → para girar',
      approach: '⬆️ Seguí hacia el cántaro... ¡ya casi!',
      swing: '🟡 ¡Hacé CLICK para golpear el cántaro!',
      done: '🎉 ¡Bien hecho! Ahora comenzará el juego de verdad',
    };
    this.showHelpText(steps[step] || '');
  }

  hideAllScreens() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  }

  hideAll() {
    this.hideAllScreens();
    this.hud.classList.remove('active');
    this.swingPrompt.classList.remove('active');
    this.resultPopup.classList.remove('active');
    this.roundAnnounce.classList.remove('active');
    this.confettiContainer.innerHTML = '';
    this.hideHelpText();
    if (this._onKeyHandler) {
      document.removeEventListener('keydown', this._onKeyHandler);
      this._onKeyHandler = null;
    }
  }
}
