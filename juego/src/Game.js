import * as THREE from 'three';
import { Scene3D } from './Scene3D.js';
import { Environment } from './Environment.js';
import { Pot } from './Pot.js';
import { Player } from './Player.js';
import { UI } from './UI.js';
import { AudioManager } from './AudioManager.js';
import { ParticleSystem } from './ParticleSystem.js';

export class Game {
  constructor(container) {
    this.state = 'INIT';
    this.round = 1;
    this.maxRounds = 5;
    this.totalScore = 0;
    this.roundScore = 0;
    this.attempts = 0;
    this.maxAttemptsPerRound = 3;
    this.potBrokenThisRound = false;
    this.tutorialStep = 'welcome';
    this.roundTimer = 0;
    this.roundTimeLimit = 45;
    this.timerActive = false;

    this.scene3d = new Scene3D(container);
    this.env = new Environment(this.scene3d.scene);
    this.pot = new Pot(this.scene3d.scene);
    this.player = new Player(this.scene3d.scene);
    this.ui = new UI();
    this.audio = new AudioManager();
    this.particles = new ParticleSystem(this.scene3d.scene);

    this.keys = { w: false, a: false, s: false, d: false };
    this.mouseClicked = false;
    this.clock = new THREE.Clock();

    this.cameraAngle = 0;
    this.spinElapsed = 0;
    this.spinDuration = 0;
    this.spinRotations = 0;
    this.spinStartAngle = 0;

    this.swingResult = null;
    this.resultTimer = 0;
    this.arrowGroup = null;
    this.tutorialDone = false;

    this.init();
  }

  init() {
    document.addEventListener('keydown', (e) => this.onKeyDown(e));
    document.addEventListener('keyup', (e) => this.onKeyUp(e));
    document.addEventListener('mousedown', (e) => this.onMouseDown(e));

    this.ui.showMenu(() => this.startInstructions());

    this.clock.start();
    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    const delta = Math.min(this.clock.getDelta(), 0.05);
    this.update(delta);
    this.scene3d.render();
  }

  update(delta) {
    this.particles.update(delta);
    this.pot.update(delta);
    this.updateArrow(delta);

    if (this.timerActive && (this.state === 'WALKING' || this.state === 'SWINGING')) {
      this.roundTimer -= delta;
      this.ui.updateTimer(Math.ceil(this.roundTimer));
      if (this.roundTimer <= 0) {
        this.roundTimer = 0;
        this.timerActive = false;
        this.ui.updateTimer(0);
        this.onTimeUp();
        return;
      }
    }

    switch (this.state) {
      case 'TUTORIAL': this.updateTutorial(delta); break;
      case 'SPINNING': this.updateSpinning(delta); break;
      case 'WALKING': this.updateWalking(delta); break;
      case 'SWINGING': this.updateSwinging(delta); break;
      case 'RESULT': this.updateResult(delta); break;
    }

    this.updateCamera(delta);
  }

  startInstructions() {
    this.state = 'INSTRUCTIONS';
    this.ui.showInstructions(() => {
      this.roundTimeLimit = this.ui.selectedSeconds;
      this.startTutorial();
    });
  }

  startTutorial() {
    this.state = 'TUTORIAL';
    this.tutorialDone = false;
    this.tutorialStep = 'welcome';
    this.pot.reset();
    this.player.reset();
    this.player.group.position.set(0, 0, -3);
    this.ui.hideAll();
    this.ui.showHUD();
    this.ui.setTutorialHUD();
    this.createArrow();
    this.ui.showTutorialStep('welcome');

    setTimeout(() => {
      if (this.state === 'TUTORIAL') {
        this.ui.showTutorialStep('move');
      }
    }, 2500);
  }

  updateTutorial(delta) {
    if (this.tutorialDone) return;

    const speed = 0.7;

    if (this.keys.w) this.player.moveForward(delta * speed);
    if (this.keys.s) this.player.moveBackward(delta * speed * 0.5);
    if (this.keys.a) this.player.rotateLeft(delta);
    if (this.keys.d) this.player.rotateRight(delta);

    this.player.group.rotation.y = this.player.direction + Math.PI;

    const potPos = this.pot.group.position;
    const playerPos = this.player.getPosition();
    const distXZ = Math.sqrt(
      Math.pow(playerPos.x - potPos.x, 2) +
      Math.pow(playerPos.z - potPos.z, 2)
    );

    if (distXZ < 2.0) {
      this.ui.showSwingPrompt();
      this.ui.showTutorialStep('swing');
      this.tutorialStep = 'swing';
    } else if (distXZ < 4.0 && this.tutorialStep !== 'swing') {
      this.ui.showTutorialStep('approach');
      this.tutorialStep = 'approach';
    } else if (this.keys.w && this.tutorialStep === 'move') {
      this.ui.showTutorialStep('approach');
      this.tutorialStep = 'approach';
    }
  }

  startRound() {
    this.state = 'ROUND_INTRO';
    this.potBrokenThisRound = false;
    this.roundScore = 0;
    this.attempts = 0;
    this.timerActive = false;
    this.ui.updateTimer(this.roundTimeLimit);
    this.player.reset();
    this.player.setRandomPosition();
    this.pot.reset();
    this.ui.hideAll();
    this.ui.showHUD();
    this.ui.updateHUD(this.round, this.totalScore, this.maxAttemptsPerRound - this.attempts);

    this.audio.startMusic();

    this.ui.showRoundAnnounce(this.round, () => {
      this.beginSpin();
    });
  }

  beginSpin() {
    this.state = 'SPINNING';
    this.spinElapsed = 0;
    this.spinDuration = 2.5 + this.round * 0.3;
    this.spinRotations = 3 + this.round + Math.floor(Math.random() * 2);
    this.cameraAngle = 0;
    this.spinStartAngle = Math.random() * Math.PI * 2;
    this.mouseClicked = false;

    this.audio.playSpin();

  }

  updateSpinning(delta) {
    this.spinElapsed += delta;
    const progress = this.spinElapsed / this.spinDuration;

    if (progress >= 1) {
      this.player.applySpinDisorientation();
      this.createArrow();
      this.state = 'WALKING';
      this.roundTimer = this.roundTimeLimit;
      this.timerActive = true;
      this.ui.showHelpText('🔍 Seguí la flecha dorada para encontrar el cántaro');
      setTimeout(() => { this.ui.hideHelpText(); }, 4000);
      return;
    }

    const eased = progress < 0.5 ?
      2 * progress * progress :
      1 - Math.pow(-2 * progress + 2, 2) / 2;

    this.cameraAngle = eased * this.spinRotations * Math.PI * 2;
  }

  updateWalking(delta) {
    const speedMultiplier = 0.6;

    this.mouseClicked = false;

    if (this.keys.w) {
      this.player.moveForward(delta * speedMultiplier);
    }
    if (this.keys.s) {
      this.player.moveBackward(delta * speedMultiplier);
    }
    if (this.keys.a) {
      this.player.rotateLeft(delta);
    }
    if (this.keys.d) {
      this.player.rotateRight(delta);
    }

    this.player.group.rotation.y = this.player.direction + Math.PI;

    const potPos = this.pot.group.position;
    const playerPos = this.player.getPosition();
    const distXZ = Math.sqrt(
      Math.pow(playerPos.x - potPos.x, 2) +
      Math.pow(playerPos.z - potPos.z, 2)
    );

    if (this.arrowGroup) {
      this.arrowGroup.visible = distXZ > 1.8;
    }

    if (distXZ < 2.0) {
      this.ui.showSwingPrompt();
    } else {
      this.ui.hideSwingPrompt();
    }
  }

  beginSwing() {
    this.state = 'SWINGING';
    this.timerActive = false;
    this.player.swing();
    this.audio.playSwing();
    this.swingResult = null;
    this.destroyArrow();
  }

  updateSwinging(delta) {
    const potPos = this.pot.group.position;
    const result = this.player.updateSwing(delta, potPos);

    if (result !== null && this.swingResult === null) {
      this.swingResult = result;

      if (result.hit) {
        this.onHit();
      } else {
        this.onMiss();
      }
    }

    if (!this.player.isSwinging && this.swingResult !== null) {
      if (this.state === 'TUTORIAL') {
        this.showTutorialComplete();
        return;
      }
      this.state = 'RESULT';
      this.resultTimer = 0;
      this.showResultScreen();
    }
  }

  onTimeUp() {
    this.timerActive = false;
    this.destroyArrow();
    this.ui.hideSwingPrompt();
    this.state = 'RESULT';
    this.potBrokenThisRound = true;

    this.ui.showResult(false, 0, this.totalScore, '⏰ ¡Se acabó el tiempo!', () => {
      this.nextRound();
    });
  }

  onHit() {
    this.potBrokenThisRound = true;
    this.attempts++;

    this.pot.setLastPlayerPos(this.player.getPosition());
    this.pot.breakApart();
    this.audio.playBreak();
    this.particles.emitConfetti(new THREE.Vector3(0, 2.5, 0), 40);
    this.audio.playCelebration();
    this.ui.showConfetti(60);

    const attemptBonus = Math.max(0, (this.maxAttemptsPerRound - this.attempts + 1) * 20);
    const base = 100;
    this.roundScore = base + attemptBonus;

    this.totalScore += this.roundScore;
    this.ui.updateHUD(this.round, this.totalScore, this.maxAttemptsPerRound - this.attempts);
  }

  onMiss() {
    this.attempts++;
    this.roundScore = 0;
    this.audio.playMiss();
    this.ui.updateHUD(this.round, this.totalScore, this.maxAttemptsPerRound - this.attempts);

    if (this.attempts >= this.maxAttemptsPerRound) {
      this.potBrokenThisRound = true;
    }
  }

  showTutorialComplete() {
    this.tutorialDone = true;
    this.destroyArrow();
    this.ui.hideSwingPrompt();
    this.ui.showHelpText('🎉 ¡Bien hecho! Preparando el juego real...');
    this.audio.playCelebration();
    this.particles.emitConfetti(new THREE.Vector3(0, 2.5, 0), 30);
    this.ui.showConfetti(40);

    setTimeout(() => {
      this.ui.hideHelpText();
      this.ui.hideAll();
      this.round = 1;
      this.totalScore = 0;
      this.tutorialDone = false;
      this.state = 'ROUND_INTRO';
      setTimeout(() => this.startRound(), 300);
    }, 2500);
  }

  showResultScreen() {
    const hit = this.swingResult && this.swingResult.hit;

    let detail = '';
    if (hit) {
      const attemptBonus = Math.max(0, (this.maxAttemptsPerRound - this.attempts + 1) * 20);
      const roundInfo = this.attempts <= 1 ? 'Golpe directo +100' : `Intento #${this.attempts}`;
      detail = `${roundInfo} · Bonificación +${attemptBonus}`;
    } else {
      detail = this.attempts >= this.maxAttemptsPerRound ? '¡Se acabaron los intentos!' : `Intento #${this.attempts} de ${this.maxAttemptsPerRound}`;
    }

    const onNext = () => {
      if (!this.potBrokenThisRound) {
        this.player.group.position.set(
          this.player.getPosition().x,
          0,
          this.player.getPosition().z
        );
        this.createArrow();
        this.state = 'WALKING';
        this.roundTimer = this.roundTimeLimit;
        this.timerActive = true;
        this.ui.updateHUD(this.round, this.totalScore, this.maxAttemptsPerRound - this.attempts);
      } else {
        this.nextRound();
      }
    };

    setTimeout(() => {
      this.ui.showResult(hit, this.roundScore, this.totalScore, detail, onNext);
    }, 500);
  }

  updateResult(delta) {
    this.resultTimer += delta;
  }

  nextRound() {
    this.destroyArrow();

    if (this.round >= this.maxRounds) {
      this.gameOver();
      return;
    }

    this.round++;
    this.state = 'ROUND_INTRO';

    setTimeout(() => {
      this.startRound();
    }, 500);
  }

  gameOver() {
    this.state = 'GAME_OVER';
    this.audio.stopMusic();

    let message = '';
    const maxScore = this.maxRounds * 225;
    const pct = this.totalScore / maxScore;
    if (pct > 0.8) message = '¡Increíble! ¡Todo un campeón de San Juan! 🏆';
    else if (pct > 0.5) message = '¡Muy bien! Tenés buen ojo... o buena suerte ⭐';
    else if (pct > 0.2) message = 'No está mal, la próxima será mejor 💪';
    else message = '¡La tradición sigue viva! Seguí practicando 😄';

    this.ui.showConfetti(100);
    this.audio.playCelebration();

    this.ui.hideTimer();
    this.ui.showGameOver(this.totalScore, message, () => {
      this.restart();
    });
  }

  restart() {
    this.round = 1;
    this.totalScore = 0;
    this.state = 'INIT';
    this.player.reset();
    this.pot.reset();
    this.ui.hideAll();
    this.particles.clear();
    this.audio.stopMusic();
    this.destroyArrow();

    setTimeout(() => {
      this.ui.showMenu(() => this.startInstructions());
    }, 300);
  }

  createArrow() {
    if (this.arrowGroup) return;

    this.arrowGroup = new THREE.Group();
    this.arrowGroup.position.set(0, 3.2, 0);

    const mat = new THREE.MeshBasicMaterial({ color: 0xFFD700 });

    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.6, 6),
      mat
    );
    pole.position.y = 0.3;
    this.arrowGroup.add(pole);

    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(0.12, 0.18, 8),
      mat
    );
    cone.position.y = -0.05;
    this.arrowGroup.add(cone);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.09, 0.02, 6, 12),
      mat
    );
    ring.position.y = 0.65;
    ring.rotation.x = Math.PI / 2;
    this.arrowGroup.add(ring);

    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xFFD700,
      transparent: true,
      opacity: 0.2,
    });
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 8, 8),
      glowMat
    );
    glow.position.y = 0.3;
    this.arrowGroup.add(glow);

    this.scene3d.scene.add(this.arrowGroup);
  }

  updateArrow(delta) {
    if (!this.arrowGroup) return;

    const bob = Math.sin(Date.now() * 0.002) * 0.15;
    this.arrowGroup.position.y = 3.2 + bob;
    this.arrowGroup.rotation.y += delta * 0.5;
  }

  destroyArrow() {
    if (this.arrowGroup) {
      this.scene3d.scene.remove(this.arrowGroup);
      this.arrowGroup = null;
    }
  }

  updateCamera(delta) {
    const playerPos = this.player.getPosition();

    switch (this.state) {
      case 'TUTORIAL': {
        const behind = new THREE.Vector3(0, 0, -1);
        behind.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.player.direction);
        this.scene3d.camera.position.set(
          playerPos.x + behind.x * 4.0,
          playerPos.y + 3.0,
          playerPos.z + behind.z * 4.0
        );
        const potTarget = new THREE.Vector3(0, 1, 0);
        const lookTarget = new THREE.Vector3().lerpVectors(playerPos, potTarget, 0.4);
        lookTarget.y += 0.5;
        this.scene3d.camera.lookAt(lookTarget);
        break;
      }

      case 'SPINNING': {
        const radius = 5;
        const height = 2.5;
        this.scene3d.camera.position.set(
          playerPos.x + Math.cos(this.cameraAngle + this.spinStartAngle) * radius,
          playerPos.y + height + 0.5,
          playerPos.z + Math.sin(this.cameraAngle + this.spinStartAngle) * radius
        );
        this.scene3d.camera.lookAt(playerPos.x, playerPos.y + 1, playerPos.z);
        break;
      }

      case 'WALKING': {
        const behind = new THREE.Vector3(0, 0, -1);
        behind.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.player.direction);
        this.scene3d.camera.position.set(
          playerPos.x + behind.x * 3.5,
          playerPos.y + 2.8,
          playerPos.z + behind.z * 3.5
        );

        const potTarget = new THREE.Vector3(0, 1, 0);
        const lookTarget = new THREE.Vector3().lerpVectors(playerPos, potTarget, 0.5);
        lookTarget.y += 0.5;
        this.scene3d.camera.lookAt(lookTarget);
        break;
      }

      case 'SWINGING': {
        const behind2 = new THREE.Vector3(0, 0, -1);
        behind2.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.player.direction);
        this.scene3d.camera.position.set(
          playerPos.x + behind2.x * 3.0,
          playerPos.y + 2.2,
          playerPos.z + behind2.z * 3.0
        );
        this.scene3d.camera.lookAt(playerPos.x, playerPos.y + 1, playerPos.z);
        break;
      }

      case 'RESULT': {
        const resultCamPos = new THREE.Vector3(0, 3.5, 5);
        this.scene3d.camera.position.lerp(resultCamPos, 0.02);
        this.scene3d.camera.lookAt(0, 1.5, 0);
        break;
      }

      default: {
        this.scene3d.camera.position.set(0, 5, 9);
        this.scene3d.camera.lookAt(0, 1, 0);
        break;
      }
    }
  }

  trySwing() {
    this.ui.hideSwingPrompt();
    this.beginSwing();
    return true;
  }

  onKeyDown(e) {
    switch (e.code) {
      case 'ArrowUp': this.keys.w = true; e.preventDefault(); break;
      case 'ArrowLeft': this.keys.a = true; e.preventDefault(); break;
      case 'ArrowDown': this.keys.s = true; e.preventDefault(); break;
      case 'ArrowRight': this.keys.d = true; e.preventDefault(); break;
      case 'Space':
        e.preventDefault();
        if (this.state === 'WALKING' || this.state === 'TUTORIAL') {
          this.trySwing();
        }
        break;
    }
  }

  onKeyUp(e) {
    switch (e.code) {
      case 'ArrowUp': this.keys.w = false; break;
      case 'ArrowLeft': this.keys.a = false; break;
      case 'ArrowDown': this.keys.s = false; break;
      case 'ArrowRight': this.keys.d = false; break;
    }
  }

  onMouseDown(e) {
    if (e.button === 0) {
      if (this.state === 'TUTORIAL' || this.state === 'WALKING') {
        this.trySwing();
      }
      this.mouseClicked = true;
    }
  }
}
