import * as THREE from 'three';

export class ParticleSystem {
  constructor(scene) {
    this.scene = scene;
    this.particles = [];
  }

  emitConfetti(position, count = 30) {
    const colors = [0xD52B1E, 0xFFFFFF, 0x0038A8, 0xFFD700, 0x00AA00];

    for (let i = 0; i < count; i++) {
      const size = 0.02 + Math.random() * 0.04;
      const geo = new THREE.PlaneGeometry(size, size * (0.5 + Math.random()));
      const mat = new THREE.MeshBasicMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(position);
      mesh.position.x += (Math.random() - 0.5) * 0.3;
      mesh.position.y += Math.random() * 0.3;
      mesh.position.z += (Math.random() - 0.5) * 0.3;

      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        Math.random() * 3 + 1,
        (Math.random() - 0.5) * 4
      );

      this.scene.add(mesh);

      this.particles.push({
        mesh,
        velocity: dir,
        rotation: new THREE.Vector3(
          Math.random() * 6,
          Math.random() * 6,
          Math.random() * 6
        ),
        life: 3.0 + Math.random() * 2,
        gravity: 2.0,
      });
    }
  }

  emitSparkle(position, count = 15) {
    for (let i = 0; i < count; i++) {
      const geo = new THREE.SphereGeometry(0.015, 4, 4);
      const mat = new THREE.MeshBasicMaterial({
        color: 0xFFD700,
        transparent: true,
        opacity: 1,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(position);

      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 3,
        Math.random() * 2,
        (Math.random() - 0.5) * 3
      );

      this.scene.add(mesh);

      this.particles.push({
        mesh,
        velocity: dir,
        rotation: new THREE.Vector3(0, 0, 0),
        life: 1.0 + Math.random() * 0.5,
        gravity: 1.0,
      });
    }
  }

  update(delta) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.velocity.y -= p.gravity * delta;
      p.mesh.position.add(p.velocity.clone().multiplyScalar(delta));

      p.mesh.rotation.x += p.rotation.x * delta;
      p.mesh.rotation.y += p.rotation.y * delta;
      p.mesh.rotation.z += p.rotation.z * delta;

      p.life -= delta;

      const opacity = Math.min(1, p.life / 0.5);
      if (p.mesh.material) {
        p.mesh.material.opacity = Math.max(0, opacity);
      }

      if (p.mesh.position.y < -0.5 || p.life <= 0) {
        this.scene.remove(p.mesh);
        this.particles.splice(i, 1);
      }
    }
  }

  clear() {
    for (const p of this.particles) {
      this.scene.remove(p.mesh);
    }
    this.particles = [];
  }
}
