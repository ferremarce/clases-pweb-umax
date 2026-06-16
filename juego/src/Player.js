import * as THREE from 'three';

export class Player {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.set(0, 0, -4);
    this.scene.add(this.group);

    this.direction = 0;
    this.speed = 0;
    this.moveSpeed = 2.5;
    this.rotationSpeed = 2.0;
    this.isSwinging = false;
    this.swingTime = 0;
    this.swingDuration = 0.5;
    this.swingCheckDone = false;
    this.swingHitResult = false;
    this.forwardOffset = 0;
    this.blindfoldActive = false;

    this.stick = null;
    this.rightArm = null;

    this.createBody();
    this.createHead();
    this.createHat();
    this.createArms();
    this.createLegs();
  }

  createBody() {
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xF5F5F5,
      roughness: 0.7,
    });

    this.body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.22, 0.6, 16),
      bodyMat
    );
    this.body.position.y = 0.7;
    this.body.castShadow = true;
    this.group.add(this.body);

    const bandMat = new THREE.MeshStandardMaterial({
      color: 0xD52B1E,
      roughness: 0.6,
    });

    const band1 = new THREE.Mesh(
      new THREE.TorusGeometry(0.24, 0.02, 8, 20),
      bandMat
    );
    band1.position.set(0, 0.55, 0);
    band1.rotation.x = Math.PI / 2;
    this.group.add(band1);

    const band2 = new THREE.Mesh(
      new THREE.TorusGeometry(0.24, 0.02, 8, 20),
      new THREE.MeshStandardMaterial({ color: 0x0038A8, roughness: 0.6 })
    );
    band2.position.set(0, 0.45, 0);
    band2.rotation.x = Math.PI / 2;
    this.group.add(band2);

    const band3 = new THREE.Mesh(
      new THREE.TorusGeometry(0.23, 0.02, 8, 20),
      bandMat
    );
    band3.position.set(0, 0.2, 0);
    band3.rotation.x = Math.PI / 2;
    this.group.add(band3);
  }

  createHead() {
    const headMat = new THREE.MeshStandardMaterial({
      color: 0xDEB887,
      roughness: 0.6,
    });

    this.head = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 16, 14),
      headMat
    );
    this.head.position.y = 1.08;
    this.head.castShadow = true;
    this.group.add(this.head);

    const eyeMat = new THREE.MeshStandardMaterial({ color: 0x222222 });

    const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.02, 10, 8), eyeMat);
    eyeL.position.set(-0.06, 1.12, 0.13);
    this.group.add(eyeL);

    const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.02, 10, 8), eyeMat);
    eyeR.position.set(0.06, 1.12, 0.13);
    this.group.add(eyeR);
  }

  createHat() {
    const hatMat = new THREE.MeshStandardMaterial({
      color: 0xD4A76A,
      roughness: 0.9,
    });

    const brim = new THREE.Mesh(
      new THREE.TorusGeometry(0.22, 0.025, 12, 24),
      hatMat
    );
    brim.position.set(0, 1.2, 0);
    brim.rotation.x = Math.PI / 2;
    this.group.add(brim);

    const crown = new THREE.Mesh(
      new THREE.ConeGeometry(0.14, 0.2, 16),
      hatMat
    );
    crown.position.set(0, 1.32, 0);
    this.group.add(crown);

    const bandHat = new THREE.Mesh(
      new THREE.TorusGeometry(0.13, 0.015, 8, 20),
      new THREE.MeshStandardMaterial({ color: 0xD52B1E, roughness: 0.6 })
    );
    bandHat.position.set(0, 1.22, 0);
    bandHat.rotation.x = Math.PI / 2;
    this.group.add(bandHat);
  }

  createArms() {
    const armMat = new THREE.MeshStandardMaterial({
      color: 0xDEB887,
      roughness: 0.6,
    });

    const leftArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.03, 0.35, 8),
      armMat
    );
    leftArm.position.set(-0.28, 0.8, 0);
    leftArm.rotation.z = 0.3;
    this.group.add(leftArm);
    this.leftArm = leftArm;

    const rightArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.03, 0.35, 8),
      armMat
    );
    rightArm.position.set(0.28, 0.8, 0);
    rightArm.rotation.z = -0.3;
    this.group.add(rightArm);
    this.rightArm = rightArm;

    const stickMat = new THREE.MeshStandardMaterial({
      color: 0x8B7355,
      roughness: 0.9,
    });

    this.stick = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.02, 1.2, 8),
      stickMat
    );
    this.stick.position.set(0.45, 0.85, 0);
    this.stick.rotation.z = -0.4;
    this.stick.rotation.x = -0.3;
    this.group.add(this.stick);
  }

  createLegs() {
    const legMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a2e,
      roughness: 0.7,
    });

    const leftLeg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.05, 0.45, 8),
      legMat
    );
    leftLeg.position.set(-0.08, 0.22, 0);
    this.group.add(leftLeg);

    const rightLeg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.05, 0.45, 8),
      legMat
    );
    rightLeg.position.set(0.08, 0.22, 0);
    this.group.add(rightLeg);
  }

  moveForward(delta) {
    const offset = this.blindfoldActive ? this.forwardOffset : 0;
    const angle = this.direction + offset;

    this.group.position.x += Math.sin(angle) * this.moveSpeed * delta;
    this.group.position.z += Math.cos(angle) * this.moveSpeed * delta;

    const limit = 4.5;
    this.group.position.x = Math.max(-limit, Math.min(limit, this.group.position.x));
    this.group.position.z = Math.max(-limit, Math.min(limit, this.group.position.z));

    const bob = Math.sin(Date.now() * 0.01) * 0.02;
    this.body.position.y = 0.7 + bob;
    this.head.position.y = 1.08 + bob;
  }

  moveBackward(delta) {
    const offset = this.blindfoldActive ? this.forwardOffset : 0;
    const angle = this.direction + offset;

    this.group.position.x -= Math.sin(angle) * this.moveSpeed * 0.6 * delta;
    this.group.position.z -= Math.cos(angle) * this.moveSpeed * 0.6 * delta;

    const limit = 4.5;
    this.group.position.x = Math.max(-limit, Math.min(limit, this.group.position.x));
    this.group.position.z = Math.max(-limit, Math.min(limit, this.group.position.z));
  }

  rotateLeft(delta) {
    this.direction += this.rotationSpeed * delta;
  }

  rotateRight(delta) {
    this.direction -= this.rotationSpeed * delta;
  }

  swing() {
    if (this.isSwinging) return;
    this.isSwinging = true;
    this.swingTime = 0;
    this.swingCheckDone = false;
    this.swingHitResult = false;
  }

  updateSwing(delta, potPosition) {
    if (!this.isSwinging) return null;

    this.swingTime += delta;
    const t = this.swingTime / this.swingDuration;

    if (this.rightArm) {
      const swingAngle = -0.3 - Math.sin(t * Math.PI) * 2.0;
      this.rightArm.rotation.z = swingAngle;
      this.rightArm.rotation.x = Math.sin(t * Math.PI) * 0.6;
    }

    if (this.stick) {
      const stickSwing = -0.4 + Math.sin(t * Math.PI) * 2.0;
      this.stick.rotation.z = stickSwing;
      this.stick.rotation.x = -0.3 + Math.sin(t * Math.PI) * 0.8;
    }

    if (t >= 0.35 && t <= 0.6 && !this.swingCheckDone) {
      this.swingCheckDone = true;

      if (potPosition) {
        const playerPos = new THREE.Vector3();
        this.group.getWorldPosition(playerPos);

        const dx = playerPos.x - potPosition.x;
        const dz = playerPos.z - potPosition.z;
        const dist = Math.sqrt(dx * dx + dz * dz);

        const hitRadius = 0.8;
        this.swingHitResult = dist < hitRadius;
      }
    }

    if (t >= 1.0) {
      this.isSwinging = false;
      if (!this.swingCheckDone) {
        this.swingCheckDone = true;
        this.swingHitResult = false;
      }
      if (this.rightArm) {
        this.rightArm.rotation.z = -0.3;
        this.rightArm.rotation.x = 0;
      }
      if (this.stick) {
        this.stick.rotation.z = -0.4;
        this.stick.rotation.x = -0.3;
      }
      return { hit: this.swingHitResult };
    }

    return null;
  }

  setBlindfold(active) {
    this.blindfoldActive = active;
  }

  applySpinDisorientation() {
    this.forwardOffset = (Math.random() - 0.5) * Math.PI * 1.2;
  }

  getPosition() {
    const pos = new THREE.Vector3();
    this.group.getWorldPosition(pos);
    return pos;
  }

  reset() {
    this.group.position.set(0, 0, -4);
    this.direction = 0;
    this.forwardOffset = 0;
    this.isSwinging = false;
    this.blindfoldActive = false;
    this.swingCheckDone = false;
    this.swingHitResult = false;

    if (this.rightArm) {
      this.rightArm.rotation.z = -0.3;
      this.rightArm.rotation.x = 0;
    }
    if (this.stick) {
      this.stick.rotation.z = -0.4;
      this.stick.rotation.x = -0.3;
    }
  }

  setRandomPosition() {
    const angle = Math.random() * Math.PI * 2;
    const dist = 3 + Math.random() * 1.5;
    this.group.position.set(Math.cos(angle) * dist, 0, Math.sin(angle) * dist);
    this.direction = Math.random() * Math.PI * 2;
  }
}
