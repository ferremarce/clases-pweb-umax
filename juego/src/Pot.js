import * as THREE from 'three';

const POT_PROFILE = [
  new THREE.Vector2(0, -0.5),
  new THREE.Vector2(0.05, -0.49),
  new THREE.Vector2(0.10, -0.46),
  new THREE.Vector2(0.16, -0.42),
  new THREE.Vector2(0.22, -0.36),
  new THREE.Vector2(0.26, -0.28),
  new THREE.Vector2(0.29, -0.18),
  new THREE.Vector2(0.30, -0.06),
  new THREE.Vector2(0.31, 0),
  new THREE.Vector2(0.30, 0.06),
  new THREE.Vector2(0.29, 0.14),
  new THREE.Vector2(0.27, 0.22),
  new THREE.Vector2(0.24, 0.30),
  new THREE.Vector2(0.20, 0.35),
  new THREE.Vector2(0.15, 0.38),
  new THREE.Vector2(0.10, 0.40),
  new THREE.Vector2(0.05, 0.41),
  new THREE.Vector2(0, 0.42),
];

export class Pot {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.set(0, 1.8, 0);
    this.scene.add(this.group);

    this.isBroken = false;
    this.candies = [];
    this.shards = [];
    this.breakParticles = [];

    this.createPot();
  }

  createPot() {
    const potGeo = new THREE.LatheGeometry(POT_PROFILE, 28);

    const colors = [new THREE.Color(0x8B4513), new THREE.Color(0xCD853F), new THREE.Color(0xA0522D)];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const potMat = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.8,
      metalness: 0.05,
      flatShading: false,
    });

    this.potMesh = new THREE.Mesh(potGeo, potMat);
    this.potMesh.castShadow = true;
    this.potMesh.position.y = 0.4;
    this.group.add(this.potMesh);

    const rimGeo = new THREE.TorusGeometry(0.12, 0.03, 12, 24);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0x6B3410,
      roughness: 0.9,
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.position.y = 0.82;
    this.group.add(rim);

    const bandMat = new THREE.MeshStandardMaterial({
      color: 0x4A2008,
      roughness: 0.9,
    });
    const band = new THREE.Mesh(
      new THREE.TorusGeometry(0.29, 0.02, 8, 28),
      bandMat
    );
    band.position.y = 0.65;
    band.rotation.x = Math.PI / 2;
    this.group.add(band);

    const band2 = new THREE.Mesh(
      new THREE.TorusGeometry(0.26, 0.015, 8, 28),
      bandMat
    );
    band2.position.y = -0.3;
    band2.rotation.x = Math.PI / 2;
    this.group.add(band2);
  }

  breakApart() {
    if (this.isBroken) return;
    this.isBroken = true;

    this.shards = [];
    this.candies = [];

    if (this.potMesh) {
      const pos = new THREE.Vector3();
      this.potMesh.getWorldPosition(pos);
      this.group.remove(this.potMesh);

      const geo = this.potMesh.geometry;
      const positions = geo.attributes.position;
      const vertexCount = positions.count;

      const shardColors = [0x8B4513, 0xCD853F, 0xA0522D, 0x6B3410];
      for (let i = 0; i < 30; i++) {
        const shardGeo = new THREE.BufferGeometry();
        const verts = new Float32Array(9);
        for (let j = 0; j < 3; j++) {
          const idx = Math.floor(Math.random() * vertexCount) * 3;
          verts[j * 3] = positions.array[idx] + (Math.random() - 0.5) * 0.1;
          verts[j * 3 + 1] = positions.array[idx + 1] + (Math.random() - 0.5) * 0.1;
          verts[j * 3 + 2] = positions.array[idx + 2] + (Math.random() - 0.5) * 0.1;
        }
        shardGeo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
        shardGeo.computeVertexNormals();

        const shardMat = new THREE.MeshStandardMaterial({
          color: shardColors[Math.floor(Math.random() * shardColors.length)],
          roughness: 0.9,
          flatShading: true,
        });

        const shard = new THREE.Mesh(shardGeo, shardMat);
        shard.position.copy(pos);
        shard.position.y += 0.4;

        const dir = new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          Math.random() * 1.5 + 0.5,
          (Math.random() - 0.5) * 2
        ).normalize();

        this.shards.push({
          mesh: shard,
          velocity: dir.multiplyScalar(1.5 + Math.random() * 2),
          rotation: new THREE.Vector3(
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10
          ),
          life: 2.0,
        });

        this.scene.add(shard);
      }
    }

    const candyColors = [
      0xFF0000, 0xFFFFFF, 0x0038A8, 0xFFD700, 0x00AA00, 0xFF69B4,
      0xFF8C00, 0x8B00FF,
    ];

    const playerPos = this.getLastPlayerPos() || new THREE.Vector3(0, 0, -5);

    for (let i = 0; i < 25; i++) {
      const candyMat = new THREE.MeshStandardMaterial({
        color: candyColors[Math.floor(Math.random() * candyColors.length)],
        roughness: 0.3,
        metalness: 0.4,
      });

      const candy = new THREE.Mesh(
        new THREE.SphereGeometry(0.04 + Math.random() * 0.04, 6, 6),
        candyMat
      );

      const worldPos = new THREE.Vector3();
      this.group.getWorldPosition(worldPos);
      candy.position.copy(worldPos);
      candy.position.y += 0.4;

      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 2.5,
        Math.random() * 2 + 0.5,
        (Math.random() - 0.5) * 2.5
      ).normalize();

      this.candies.push({
        mesh: candy,
        velocity: dir.multiplyScalar(2 + Math.random() * 3),
        bounce: 0.6,
        life: 3.0 + Math.random() * 2,
      });

      this.scene.add(candy);
    }

    this.breakParticles = [...this.shards, ...this.candies];
  }

  setLastPlayerPos(pos) {
    this._lastPlayerPos = pos ? pos.clone() : null;
  }

  getLastPlayerPos() {
    return this._lastPlayerPos;
  }

  update(delta) {
    const life = 1.0;
    this.group.position.y = 1.8 + Math.sin(Date.now() * 0.001) * 0.03;
    this.group.rotation.z = Math.sin(Date.now() * 0.0007) * 0.02;

    for (let i = this.shards.length - 1; i >= 0; i--) {
      const s = this.shards[i];
      s.velocity.y -= 5.0 * delta;
      s.mesh.position.add(s.velocity.clone().multiplyScalar(delta));
      s.mesh.rotation.x += s.rotation.x * delta;
      s.mesh.rotation.y += s.rotation.y * delta;
      s.mesh.rotation.z += s.rotation.z * delta;
      s.life -= delta;

      if (s.mesh.position.y < -0.1) {
        s.mesh.position.y = -0.1;
        s.velocity.y *= -0.3;
        s.velocity.x *= 0.8;
        s.velocity.z *= 0.8;
      }

      if (s.life <= 0) {
        this.scene.remove(s.mesh);
        this.shards.splice(i, 1);
      }
    }

    for (let i = this.candies.length - 1; i >= 0; i--) {
      const c = this.candies[i];
      c.velocity.y -= 6.0 * delta;
      c.mesh.position.add(c.velocity.clone().multiplyScalar(delta));
      c.mesh.rotation.x += 5 * delta;
      c.mesh.rotation.z += 3 * delta;
      c.life -= delta;

      if (c.mesh.position.y < 0) {
        c.mesh.position.y = 0;
        c.velocity.y *= -c.bounce;
        c.velocity.x *= 0.85;
        c.velocity.z *= 0.85;
        if (Math.abs(c.velocity.y) < 0.2) c.velocity.y = 0;
      }

      if (c.life <= 0 || (c.mesh.position.y <= 0 && Math.abs(c.velocity.y) < 0.1)) {
        c.mesh.position.y = 0;
        c.velocity.set(0, 0, 0);
      }
    }

    this.breakParticles = [...this.shards, ...this.candies];
  }

  hasSettled() {
    const moving = this.candies.filter(c => c.velocity.length() > 0.1);
    return this.shards.length === 0 && moving.length === 0;
  }

  reset() {
    this.isBroken = false;

    for (const s of this.shards) {
      this.scene.remove(s.mesh);
    }
    for (const c of this.candies) {
      this.scene.remove(c.mesh);
    }

    this.shards = [];
    this.candies = [];
    this.breakParticles = [];

    this.group.children.forEach(child => this.group.remove(child));

    this.createPot();
  }
}
