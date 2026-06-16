import * as THREE from 'three';

export class Environment {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.createGround();
    this.createPost();
    this.createGuirnaldas();
    this.createSkyGradient();
    this.createDecorations();
  }

  createGround() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#4a8c3f';
    ctx.fillRect(0, 0, 256, 256);

    for (let i = 0; i < 8000; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const shade = Math.random() * 40 - 20;
      const g = 140 + shade;
      ctx.fillStyle = `rgb(${60 + shade * 0.5}, ${g}, ${50 + shade * 0.5})`;
      ctx.fillRect(x, y, 2, 2);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 8);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 24),
      new THREE.MeshStandardMaterial({ map: texture, roughness: 0.9 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.05;
    ground.receiveShadow = true;
    this.group.add(ground);
  }

  createPost() {
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x5D3A1A,
      roughness: 0.9,
    });

    const postGeo = new THREE.CylinderGeometry(0.12, 0.15, 5.5, 16);

    const postL = new THREE.Mesh(postGeo, woodMat);
    postL.position.set(-1.2, 2.6, 0);
    postL.castShadow = true;
    this.group.add(postL);

    const postR = new THREE.Mesh(postGeo, woodMat);
    postR.position.set(1.2, 2.6, 0);
    postR.castShadow = true;
    this.group.add(postR);

    const crossbar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 2.8, 12),
      woodMat
    );
    crossbar.rotation.z = Math.PI / 2;
    crossbar.position.set(0, 5.0, 0);
    crossbar.castShadow = true;
    this.group.add(crossbar);

    const capMat = new THREE.MeshStandardMaterial({ color: 0x4A2E0E, roughness: 0.9 });
    for (const x of [-1.2, 1.2]) {
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 10), capMat);
      cap.position.set(x, 5.15, 0);
      cap.scale.y = 0.4;
      this.group.add(cap);
    }

    const ropeMat = new THREE.MeshStandardMaterial({
      color: 0x8B7355,
      roughness: 1.0,
    });

    this.rope = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 2.0, 8),
      ropeMat
    );
    this.rope.position.set(0, 3.8, 0);
    this.group.add(this.rope);

    const knotMat = new THREE.MeshStandardMaterial({ color: 0x6B5030, roughness: 1.0 });
    for (let i = 0; i < 3; i++) {
      const knot = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 8, 6),
        knotMat
      );
      knot.position.set(
        (Math.random() - 0.5) * 0.06,
        3.85 + (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.06
      );
      knot.scale.set(1, 0.7, 1);
      this.group.add(knot);
    }

    const ribbonColors = [0xD52B1E, 0xFFFFFF, 0x0038A8];
    for (let i = 0; i < 12; i++) {
      const ribbon = new THREE.Mesh(
        new THREE.BoxGeometry(0.01, 0.6, 0.04),
        new THREE.MeshStandardMaterial({
          color: ribbonColors[i % 3],
          roughness: 0.7,
        })
      );
      const angle = (i / 12) * Math.PI * 2;
      ribbon.position.set(
        Math.cos(angle) * 0.14,
        4.9 + Math.random() * 0.3,
        Math.sin(angle) * 0.14
      );
      ribbon.rotation.z = Math.PI / 2;
      ribbon.rotation.y = -angle;
      this.group.add(ribbon);
    }
  }

  createGuirnaldas() {
    const colors = [0xD52B1E, 0xFFFFFF, 0x0038A8];

    for (let g = 0; g < 2; g++) {
      const side = g === 0 ? -1 : 1;

      for (let i = 0; i < 8; i++) {
        const t = i / 7;
        const x = side * (1.2 + t * 1.5);
        const y = 4.5 - t * 1.5 - Math.sin(t * Math.PI) * 0.5;

        const flagMat = new THREE.MeshStandardMaterial({
          color: colors[Math.floor(Math.random() * 3)],
          roughness: 0.6,
          side: THREE.DoubleSide,
        });

        const flag = new THREE.Mesh(
          new THREE.PlaneGeometry(0.15, 0.12),
          flagMat
        );
        flag.position.set(x, y, Math.sin(t * Math.PI * 2) * 0.2 * side);
        flag.rotation.z = Math.sin(t * Math.PI) * 0.2;
        flag.rotation.x = Math.sin(t * Math.PI * 3) * 0.1;
        this.group.add(flag);
      }
    }

    for (let i = 0; i < 5; i++) {
      const t = i / 4;
      const x = -1.2 + t * 2.4;
      const y = 4.8 - t * 0.3;

      const flagMat = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * 3)],
        roughness: 0.6,
        side: THREE.DoubleSide,
      });

      const flag = new THREE.Mesh(
        new THREE.PlaneGeometry(0.14, 0.1),
        flagMat
      );
      flag.position.set(x, y, -0.1);
      this.group.add(flag);
    }
  }

  createSkyGradient() {
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#1a1a3a');
    gradient.addColorStop(0.3, '#0038A8');
    gradient.addColorStop(0.5, '#D52B1E');
    gradient.addColorStop(0.7, '#FF6B35');
    gradient.addColorStop(1, '#87CEEB');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 2, 512);

    const texture = new THREE.CanvasTexture(canvas);

    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(40, 24, 20),
      new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide })
    );
    sky.position.y = -5;
    this.group.add(sky);
  }

  createDecorations() {
    const bushMat = new THREE.MeshStandardMaterial({
      color: 0x2d5a1e,
      roughness: 0.9,
    });

    const positions = [
      [-3, 0, -3],
      [3, 0, -3],
      [-3, 0, 3],
      [3.5, 0, 2.5],
      [-3.5, 0, -2],
      [4, 0, -2],
      [-4, 0, 2],
    ];

    for (const pos of positions) {
      const bush = new THREE.Mesh(
        new THREE.SphereGeometry(0.3 + Math.random() * 0.3, 12, 10),
        bushMat
      );
      bush.position.set(pos[0], 0.1 + Math.random() * 0.2, pos[1]);
      bush.scale.y = 0.6;
      bush.castShadow = true;
      this.group.add(bush);
    }

    const flowerMat = new THREE.MeshStandardMaterial({ color: 0xFFD700, roughness: 0.5 });
    const flowerMat2 = new THREE.MeshStandardMaterial({ color: 0xFF69B4, roughness: 0.5 });
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x1a6b0a, roughness: 0.9 });

    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 1.8 + Math.random() * 2.8;

      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.005, 0.008, 0.12 + Math.random() * 0.08, 4),
        stemMat
      );
      stem.position.set(Math.cos(angle) * dist, 0.06, Math.sin(angle) * dist);
      this.group.add(stem);

      const flower = new THREE.Mesh(
        new THREE.SphereGeometry(0.03 + Math.random() * 0.015, 6, 6),
        Math.random() > 0.5 ? flowerMat : flowerMat2
      );
      flower.position.set(
        Math.cos(angle) * dist,
        0.12 + Math.random() * 0.06,
        Math.sin(angle) * dist
      );
      this.group.add(flower);
    }
  }
}
