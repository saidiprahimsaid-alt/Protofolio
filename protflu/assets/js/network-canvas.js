/**
 * Interactive Network Mesh & Packet Flow Canvas
 * Simulates interconnected router/switch nodes and animated packet pulses
 */

(function () {
  const canvas = document.getElementById('network-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let nodes = [];
  let packets = [];
  let mouse = { x: null, y: null, radius: 140 };

  const NODE_COUNT = 45;
  const MAX_DISTANCE = 150;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initNodes();
  }

  function initNodes() {
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 2,
        isCore: Math.random() > 0.85, // Core router / SOC server node
        baseAlpha: Math.random() * 0.4 + 0.3
      });
    }
  }

  function spawnPacket() {
    if (nodes.length < 2) return;
    const fromIndex = Math.floor(Math.random() * nodes.length);
    let potentialTargets = [];

    for (let i = 0; i < nodes.length; i++) {
      if (i === fromIndex) continue;
      const dx = nodes[fromIndex].x - nodes[i].x;
      const dy = nodes[fromIndex].y - nodes[i].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAX_DISTANCE) {
        potentialTargets.push(i);
      }
    }

    if (potentialTargets.length > 0) {
      const toIndex = potentialTargets[Math.floor(Math.random() * potentialTargets.length)];
      packets.push({
        from: nodes[fromIndex],
        to: nodes[toIndex],
        progress: 0,
        speed: 0.02 + Math.random() * 0.02,
        isAlert: Math.random() > 0.85 // Rare threat packet (red/amber)
      });
    }
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Spawn periodic data packets
  setInterval(() => {
    if (packets.length < 15) {
      spawnPacket();
    }
  }, 350);

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const linkColor = isLight ? 'rgba(2, 132, 199, ' : 'rgba(0, 242, 254, ';
    const coreColor = isLight ? '#0284c7' : '#00f2fe';
    const normalColor = isLight ? '#64748b' : '#38bdf8';

    // Update & draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      node.x += node.vx;
      node.y += node.vy;

      // Bounce at borders
      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      // Mouse repulsion / interaction
      if (mouse.x !== null) {
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - dist) / mouse.radius;
          node.x += Math.cos(angle) * force * 1.5;
          node.y += Math.sin(angle) * force * 1.5;
        }
      }

      // Draw node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.isCore ? node.radius * 1.6 : node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.isCore ? coreColor : normalColor;
      ctx.globalAlpha = node.isCore ? 0.9 : node.baseAlpha;
      ctx.fill();

      if (node.isCore) {
        // Glowing halo for core infrastructure nodes
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2.8, 0, Math.PI * 2);
        ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.25)' : 'rgba(0, 242, 254, 0.25)';
        ctx.stroke();
      }

      // Connect neighbor nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const other = nodes[j];
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_DISTANCE) {
          const alpha = (1 - dist / MAX_DISTANCE) * 0.22;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = linkColor + alpha + ')';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Update & draw flying packets
    for (let k = packets.length - 1; k >= 0; k--) {
      const pkt = packets[k];
      pkt.progress += pkt.speed;

      const px = pkt.from.x + (pkt.to.x - pkt.from.x) * pkt.progress;
      const py = pkt.from.y + (pkt.to.y - pkt.from.y) * pkt.progress;

      ctx.beginPath();
      ctx.arc(px, py, pkt.isAlert ? 3.5 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = pkt.isAlert ? '#ef4444' : (isLight ? '#059669' : '#00ff9d');
      ctx.globalAlpha = 0.95;
      ctx.shadowBlur = pkt.isAlert ? 8 : 6;
      ctx.shadowColor = pkt.isAlert ? '#ef4444' : '#00ff9d';
      ctx.fill();
      ctx.shadowBlur = 0; // reset

      if (pkt.progress >= 1) {
        packets.splice(k, 1);
      }
    }

    ctx.globalAlpha = 1.0;
    requestAnimationFrame(animate);
  }

  resize();
  animate();
})();
