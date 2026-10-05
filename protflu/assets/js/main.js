/**
 * Main Application Script for Ibrahim Saeed Portfolio
 * Orchestrates themes, navigation, modals, audio feedback, and telemetry
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Theme Switcher (Dark / Light)
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio_theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = theme === 'light' 
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
    }
  }

  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      showToast(`Switched to ${nextTheme.toUpperCase()} mode`);
    });
  }

  // ==========================================
  // 2. Sound Effects Engine (Web Audio API)
  // ==========================================
  let audioCtx = null;
  let soundEnabled = false;
  const soundToggleBtn = document.getElementById('sound-toggle-btn');

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
  }

  function playSynthBeep(freq = 640, type = 'sine', duration = 0.08) {
    if (!soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      initAudio();
      soundEnabled = !soundEnabled;
      soundToggleBtn.style.color = soundEnabled ? 'var(--accent-cyan)' : 'var(--text-secondary)';
      showToast(soundEnabled ? 'Terminal Audio Feedback: ON' : 'Audio Feedback: OFF');
      if (soundEnabled) playSynthBeep(880, 'sine', 0.12);
    });
  }

  // Trigger subtle click sound for buttons
  document.querySelectorAll('button, .btn, .social-btn, .quick-chip, .dpi-tab-btn').forEach(el => {
    el.addEventListener('click', () => {
      if (soundEnabled) playSynthBeep(520, 'sine', 0.05);
    });
  });

  // ==========================================
  // 3. Mobile Navigation Menu Toggle
  // ==========================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Header scroll shadow & Active nav link highlighting
  const siteHeader = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // 4. Skills Filter System
  // ==========================================
  const skillFilters = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  skillFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (target === 'all' || card.getAttribute('data-cat') === target) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 5. Live Stream Telemetry Generator in Hero
  // ==========================================
  const streamLines = [
    `[<span class="tag">NET-MON</span>] Interface Gi0/0/0 state UP | Line protocol UP (Duplex: Full, 1000Mb/s)`,
    `[<span class="tag">OSPF-v2</span>] Neighbor 10.0.0.2 on Gi0/1 transitioned from LOADING to FULL`,
    `[<span class="warn">SOC-TRIAGE</span>] External TCP SYN scan detected from 203.0.113.88 -> Rate limit rule applied`,
    `[<span class="tag">DPI-ENGINE</span>] DNS Query resolved: api.infrastructure.net -> 192.168.10.45 [0.0012s]`,
    `[<span class="tag">SIEM-LOG</span>] Normalized 842 event logs across Windows AD Domain & Linux Sensors`,
    `[<span class="tag">REST-API</span>] Django DRF /api/v1/auth/token generated for analyst: 200 OK`,
    `[<span class="warn">SURICATA</span>] Alert sid:2001412 - ICMP PING sweep detected from untrusted submask`,
    `[<span class="tag">NEXUS-AI</span>] Autonomous self-healing routine: Alternate path computed via OSPF Cost 10`
  ];

  const streamContainer = document.getElementById('hero-stream-content');
  if (streamContainer) {
    let lineIdx = 0;
    setInterval(() => {
      const newLine = document.createElement('div');
      newLine.className = 'stream-line';
      newLine.innerHTML = streamLines[lineIdx % streamLines.length];
      streamContainer.appendChild(newLine);
      lineIdx++;

      // Keep only last 4 lines in mini viewer
      while (streamContainer.children.length > 4) {
        streamContainer.removeChild(streamContainer.firstChild);
      }
    }, 2800);
  }

  // ==========================================
  // 6. Toast Notification Function
  // ==========================================
  const toastBox = document.getElementById('toast-box');
  let toastTimeout = null;

  window.showToast = function (msg) {
    if (!toastBox) return;
    toastBox.textContent = msg;
    toastBox.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastBox.classList.remove('show');
    }, 3200);
  };

  // Copy to clipboard helper
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const val = el.getAttribute('data-copy');
      if (val) {
        navigator.clipboard.writeText(val).then(() => {
          showToast(`Copied to clipboard: ${val}`);
        }).catch(() => {
          showToast(`Copy failed. Value: ${val}`);
        });
      }
    });
  });

  // ==========================================
  // 7. Modals (Projects Details & CV Modal)
  // ==========================================
  const projectModal = document.getElementById('project-modal');
  const projectModalTitle = document.getElementById('modal-project-title');
  const projectModalBody = document.getElementById('modal-project-body');
  const cvModal = document.getElementById('cv-modal');

  const projectDeepDives = {
    nexus: {
      title: "NEXUS — AI-Powered Self-Healing & Autonomous Network System",
      html: `
        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <span class="badge badge-purple">Graduation Project</span>
            <span class="badge badge-cyan">Cisco Enterprise Hardware</span>
            <span class="badge badge-emerald">Python & Machine Learning</span>
            <span class="badge">Centralized SOC Dashboard</span>
          </div>
          
          <h4 style="color:var(--text-primary); font-size:1.1rem; border-bottom:1px solid var(--border-subtle); padding-bottom:6px;">Project Architecture & Rationale</h4>
          <p style="color:var(--text-secondary); line-height:1.7;">
            Modern enterprise infrastructures face dynamic attack surfaces requiring immediate counter-action. 
            <strong>NEXUS</strong> is Ibrahim's graduation capstone project at New Cairo Technological University. 
            It integrates physical Cisco enterprise hardware (switches & routers) with continuous ML threat monitoring 
            and a real-time SOC command dashboard.
          </p>

          <div style="background:rgba(7, 11, 20, 0.6); padding:1.2rem; border-radius:12px; border:1px solid var(--border-subtle);">
            <h5 style="color:var(--accent-cyan); margin-bottom:8px; font-family:var(--font-mono); font-size:0.85rem;">[+] Key Pipeline Phases</h5>
            <ol style="color:var(--text-secondary); padding-left:1.2rem; font-size:0.9rem; line-height:1.7;">
              <li><strong>Physical Mirroring:</strong> Enterprise SPAN port telemetry feeds live packet frames into a Python-based packet extraction engine.</li>
              <li><strong>ML Anomaly Detection:</strong> Machine learning models classify incoming flows against known baseline signatures (SYN flood, DNS exfiltration, brute force).</li>
              <li><strong>Self-Healing Orchestration:</strong> Upon high-confidence threat detection, the controller dynamically calculates alternate OSPF paths and isolates the attacking host via Cisco IOS ACLs.</li>
              <li><strong>SIEM & Event Dashboard:</strong> Normalized Syslog CEF records are pushed to the central SOC console for analyst triage.</li>
            </ol>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem;">
            <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--accent-emerald);">● Status: In Active Lab Testing</span>
            <a href="https://github.com/saidiprahimsaid-alt" target="_blank" class="btn btn-primary btn-sm">Follow on GitHub ➔</a>
          </div>
        </div>
      `
    },

    payment: {
      title: "Enterprise Payment & E-Commerce System Architecture",
      html: `
        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <span class="badge badge-cyan">Java Backend</span>
            <span class="badge badge-emerald">OOP Design Patterns</span>
            <span class="badge">Polymorphic Processing</span>
            <span class="badge">Custom Exception Architecture</span>
          </div>

          <p style="color:var(--text-secondary); line-height:1.7;">
            An enterprise-grade financial transaction and order execution backend engineered in Java. Built to demonstrate 
            solid principles of software engineering, transaction atomicity, and resilient error recovery.
          </p>

          <div style="background:rgba(7, 11, 20, 0.6); padding:1.2rem; border-radius:12px; border:1px solid var(--border-subtle);">
            <h5 style="color:var(--accent-cyan); margin-bottom:8px; font-family:var(--font-mono); font-size:0.85rem;">[+] Architectural Pillars</h5>
            <ul style="color:var(--text-secondary); padding-left:1.2rem; font-size:0.9rem; line-height:1.7;">
              <li><strong>Strategy & Factory Pattern:</strong> Decoupled payment gateways (Credit Card, Digital Wallets, Crypto, Bank Transfer) implementing standardized processing interfaces.</li>
              <li><strong>Hierarchical Exception Handling:</strong> Multi-tiered custom exception hierarchy isolating transient network payment failures from permanent account rejections.</li>
              <li><strong>Data Integrity & Concurrency:</strong> Thread-safe balances and transaction state logging.</li>
            </ul>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem;">
            <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-muted);">Repository available on GitHub</span>
            <a href="https://github.com/saidiprahimsaid-alt" target="_blank" class="btn btn-primary btn-sm">View GitHub Repo ➔</a>
          </div>
        </div>
      `
    },

    traffic: {
      title: "Traffic Analysis & Protocol Auditing Labs",
      html: `
        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <span class="badge badge-amber">Wireshark</span>
            <span class="badge badge-cyan">tcpdump</span>
            <span class="badge badge-purple">Deep Packet Inspection</span>
            <span class="badge">OWASP Auditing</span>
          </div>

          <p style="color:var(--text-secondary); line-height:1.7;">
            Comprehensive network capture and auditing sessions analyzing RFC standard protocols (DNS, TCP, UDP, ICMP, HTTP) 
            alongside simulated adversarial traffic generated inside Linux virtual environments.
          </p>

          <div style="background:rgba(7, 11, 20, 0.6); padding:1.2rem; border-radius:12px; border:1px solid var(--border-subtle);">
            <h5 style="color:var(--accent-cyan); margin-bottom:8px; font-family:var(--font-mono); font-size:0.85rem;">[+] Investigative Focus</h5>
            <ul style="color:var(--text-secondary); padding-left:1.2rem; font-size:0.9rem; line-height:1.7;">
              <li><strong>DNS Tunneling Detection:</strong> Analyzing TXT record lengths and entropy signatures used for data exfiltration.</li>
              <li><strong>TCP Teardown & Anomalous Flags:</strong> Identification of FIN/RST floods, null scans, and Xmas tree scans.</li>
              <li><strong>OWASP Web Vulnerability Auditing:</strong> Packet dissection of automated SQL injection queries and cross-site scripting payloads.</li>
            </ul>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem;">
            <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--accent-emerald);">● TryHackMe & CTF Validated</span>
            <a href="#dpi-lab" class="btn btn-secondary btn-sm" onclick="closeAllModals()">Launch Live DPI Inspector ➔</a>
          </div>
        </div>
      `
    },

    django_api: {
      title: "Django REST API Services & Web Security Integration",
      html: `
        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <span class="badge badge-cyan">Python / Django</span>
            <span class="badge badge-purple">Django REST Framework</span>
            <span class="badge">JWT Authentication</span>
            <span class="badge badge-emerald">OWASP Top 10 Hardened</span>
          </div>

          <p style="color:var(--text-secondary); line-height:1.7;">
            A resilient RESTful backend service constructed with Django REST Framework, incorporating rigorous security 
            layers to safeguard enterprise endpoints from common application vulnerabilities.
          </p>

          <div style="background:rgba(7, 11, 20, 0.6); padding:1.2rem; border-radius:12px; border:1px solid var(--border-subtle);">
            <h5 style="color:var(--accent-cyan); margin-bottom:8px; font-family:var(--font-mono); font-size:0.85rem;">[+] Security Hardening Highlights</h5>
            <ul style="color:var(--text-secondary); padding-left:1.2rem; font-size:0.9rem; line-height:1.7;">
              <li><strong>Token-Based Auth & Granular RBAC:</strong> JWT refresh/access token life-cycle with role-based access control.</li>
              <li><strong>Injection Neutralization:</strong> Utilization of Django's query parameterization engine to preempt SQLi.</li>
              <li><strong>Rate Limiting & Throttling:</strong> Configured IP/User burst limits preventing brute-force login attempts.</li>
              <li><strong>CORS & CSRF Middleware:</strong> Hardened headers (HSTS, Content Security Policy, X-Frame-Options).</li>
            </ul>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem;">
            <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-muted);">Repository available on GitHub</span>
            <a href="https://github.com/saidiprahimsaid-alt" target="_blank" class="btn btn-primary btn-sm">View GitHub Repo ➔</a>
          </div>
        </div>
      `
    }
  };

  // Open Project Modal
  document.querySelectorAll('[data-project-key]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-project-key');
      const data = projectDeepDives[key];
      if (data && projectModal) {
        projectModalTitle.textContent = data.title;
        projectModalBody.innerHTML = data.html;
        projectModal.classList.add('active');
      }
    });
  });

  // Open CV Modal
  const cvButtons = document.querySelectorAll('.trigger-cv-modal');
  cvButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (cvModal) cvModal.classList.add('active');
    });
  });

  // Print CV button inside modal
  const printCvBtn = document.getElementById('print-cv-btn');
  if (printCvBtn) {
    printCvBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Close modals
  window.closeAllModals = function () {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
  };

  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeAllModals();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  // ==========================================
  // 8. Contact Form Handling
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value || 'Guest';
      const email = document.getElementById('form-email')?.value || '';
      const subject = document.getElementById('form-subject')?.value || 'Security Inquiries';
      const message = document.getElementById('form-message')?.value || '';

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.');
        return;
      }

      // Generate mailto link
      const mailtoUrl = `mailto:saidiprahimsaid@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject} from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      
      showToast('Opening email client to send message...');
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);

      contactForm.reset();
    });
  }

  // Quick WhatsApp button handler
  const waBtn = document.getElementById('quick-whatsapp-btn');
  if (waBtn) {
    waBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = encodeURIComponent("Hello Ibrahim! I viewed your portfolio and would like to discuss a project / opportunity with you.");
      window.open(`https://wa.me/201068262081?text=${text}`, '_blank');
    });
  }
});
