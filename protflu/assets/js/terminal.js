/**
 * Interactive SOC / Cyber Security Terminal Simulator
 * Emulates a real Linux / Network Security Analyst console
 */

(function () {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  if (!terminalBody || !terminalInput) return;

  const HISTORY = [];
  let historyIndex = -1;

  const COMMANDS = {
    help: `
Available SOC Operations Commands:
  -------------------------------------------------------------
  whoami          Display analyst identity, credentials & background
  skills          List core technical competencies & toolsets
  projects        Overview of graduation project & engineering labs
  nexus           Deep dive: NEXUS Autonomous Self-Healing Network
  scan [ip]       Execute simulated Nmap port & vulnerability scan
  soc             View current SOC alert stream & SIEM health
  dpi             Launch deep packet inspection analysis
  contact         Display direct phone, email & professional links
  cv              Open printable curriculum vitae modal
  theme           Toggle UI between Cyber Dark and Clean Light
  clear           Flush terminal history
  -------------------------------------------------------------
  Tip: Click the quick command chips below or use UP/DOWN arrows!`,

    whoami: `
[ANALYST PROFILE IDENTIFICATION]
=============================================================
Name:          Ibrahim Saeed Abdulaziz
Role:          Network Infrastructure Security & SOC Analyst
Location:      Qalyubia, Egypt
Education:     B.Tech in IT (Network Track) - New Cairo Tech Univ (NCTU)
Fellowship:    Digital Egypt Pioneers Initiative (DEPI) - ISS2 Track
Certification: Oracle Cloud AI Professional Achievement
Core Mission:  Building fault-tolerant networks, automating threat 
               detection & securing enterprise software backends.
=============================================================`,

    skills: `
[CORE TECHNICAL COMPETENCIES]
-------------------------------------------------------------
[1] NETWORK & INFRASTRUCTURE SECURITY:
    • Protocols: TCP/IP Suite, OSI, OSPF, EIGRP, Subnetting/VLSM, VLANs
    • Packet Inspection: Wireshark, tcpdump, Deep Packet Inspection (DPI)
    • System Admin: Linux (Ubuntu, Debian, Kali), Windows Server (AD DS, DNS)
    • Simulation: Cisco Packet Tracer, VMware Workstation Pro, DD-WRT

[2] SOFTWARE & BACKEND DEVELOPMENT:
    • Languages: Python, Java (OOP & Advanced Exceptions), C, C++, Assembly
    • Frameworks: Django, Django REST Framework (DRF)
    • Architecture: Design Patterns, Polymorphism, RESTful APIs, PostgreSQL

[3] SECURITY OPERATIONS & AUDITING:
    • SOC Operations: SIEM Event Logging, Log Aggregation, Incident Triage
    • Web Security: OWASP Top 10 Mitigation, SQLi/CSRF Defense, API Audits
    • Cyber Ranges: TryHackMe, Practical CTFs, Threat Hunting Labs`,

    projects: `
[FEATURED PROJECTS & REPOSITORIES]
-------------------------------------------------------------
1. [NEXUS] - AI-Powered Self-Healing & Autonomous Network System
   • Status: Graduation Project (In Progress)
   • Stack:  Cisco Infrastructure, Python, Machine Learning, SIEM
   • Type:   'nexus' for full architectural breakdown.

2. [Enterprise Payment & E-Commerce Core]
   • Status: Academic / Practical Lab
   • Stack:  Java, OOP Design Patterns, Custom Exception Handling
   • Repo:   https://github.com/saidiprahimsaid-alt

3. [Traffic Analysis & Protocol Auditing Labs]
   • Status: Cyber Range / Wireshark Labs
   • Stack:  Wireshark, tcpdump, Linux, OWASP Framework

4. [Django REST API Services & Web Security]
   • Status: Practical Lab / Web API
   • Stack:  Python, Django REST Framework, JWT, PostgreSQL
   • Repo:   https://github.com/saidiprahimsaid-alt`,

    nexus: `
[PROJECT NEXUS: ARCHITECTURAL OVERVIEW]
=============================================================
TITLE:       NEXUS — AI-Powered Self-Healing Autonomous Network
STATUS:      Graduation Project (Active Development)
LEAD:        Ibrahim Saeed Abdulaziz
HARDWARE:    Cisco Catalyst Switches & Enterprise Routers
CONTROLLER:  Python Automation Engine + ML Anomaly Detection Model
TELEMETRY:   Centralized SOC Dashboard & Syslog/SIEM Correlator

KEY CAPABILITIES:
 1. Real-Time Packet Sniffing via SPAN port mirror to Python DPI engine.
 2. ML Classifier detects SYN floods, ARP poisoning, and anomalous bursts.
 3. Autonomous Mitigation: Auto-injects Cisco IOS ACLs or isolates switch
    ports dynamically via SSH/Netmiko within 350ms of anomaly detection.
 4. Incident Logging: Emits CEF/JSON logs to SOC triage dashboard.
=============================================================`,

    soc: `
[SOC TELEMETRY HEALTH & SIEM STATUS]
-------------------------------------------------------------
Sensor 01 [Gi0/0 - Gateway]:     ACTIVE (1.2 Gbps throughput)
Sensor 02 [VLAN 20 - DMZ]:       ACTIVE (0 anomalies in last 5m)
Sensor 03 [VLAN 10 - Corp LAN]:  ACTIVE (OSPF Area 0 synchronized)
SIEM Engine Status:              ALL AGENTS HEALTHY (Queue: 0)
Active Threat Mitigation:        Autonomous IPS mode ON
Defense Posture:                 ELEVATED DEFENSE (NORMAL CONVERGENCE)`,

    contact: `
[COMMUNICATION CHANNELS]
-------------------------------------------------------------
Location:  Qalyubia, Egypt (UTC+3)
Phone:     +20 1068262081
Email:     saidiprahimsaid@gmail.com
LinkedIn:  https://www.linkedin.com/in/iprahim-said-said-b95700269
GitHub:    https://github.com/saidiprahimsaid-alt
Freelance: Available on Mostaql, Khamsat & Nafezly
-------------------------------------------------------------`
  };

  function appendLine(text, className = '') {
    const p = document.createElement('div');
    p.className = 'term-output-line ' + className;
    p.textContent = text;
    terminalBody.appendChild(p);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function runScan(target) {
    const ip = target || '192.168.10.1';
    appendLine(`[i] Starting Nmap 7.94 ( https://nmap.org ) at 2026-10-05 15:20`);
    appendLine(`[i] Initiating SYN Stealth Scan against ${ip}...`);
    setTimeout(() => {
      appendLine(`[+] Host ${ip} is up (0.00042s latency).`);
      appendLine(`PORT     STATE SERVICE       VERSION`);
      appendLine(`22/tcp   open  ssh           OpenSSH 9.2p1 (Debian)`);
      appendLine(`53/tcp   open  domain        dnsmasq 2.89`);
      appendLine(`80/tcp   open  http          nginx 1.22.1 (Django REST Backend)`);
      appendLine(`443/tcp  open  ssl/https     nginx (TLS 1.3 Strict-Transport)`);
      appendLine(`514/udp  open  syslog        Cisco IOS Syslog Receiver`);
      appendLine(`[✓] Nmap done: 1 IP address (1 host up) scanned in 1.48 seconds.`);
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }, 450);
  }

  function handleCommand(cmdRaw) {
    const trimmed = cmdRaw.trim();
    if (!trimmed) return;

    HISTORY.push(trimmed);
    historyIndex = HISTORY.length;

    // Echo command
    appendLine(`analyst@soc-console:~$ ${trimmed}`, 'term-prompt-echo');

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts[1];

    if (mainCmd === 'clear') {
      terminalBody.innerHTML = '';
      return;
    }

    if (mainCmd === 'scan') {
      runScan(arg);
      return;
    }

    if (mainCmd === 'theme') {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio_theme', newTheme);
      appendLine(`[✓] Theme toggled to: ${newTheme.toUpperCase()}`);
      return;
    }

    if (mainCmd === 'cv') {
      const modal = document.getElementById('cv-modal');
      if (modal) modal.classList.add('active');
      appendLine(`[✓] Triggered Curriculum Vitae modal view.`);
      return;
    }

    if (COMMANDS[mainCmd]) {
      appendLine(COMMANDS[mainCmd]);
    } else {
      appendLine(`bash: command not found: ${trimmed}. Type 'help' to see valid commands.`, 'text-muted');
    }
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      handleCommand(val);
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = HISTORY[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < HISTORY.length - 1) {
        historyIndex++;
        terminalInput.value = HISTORY[historyIndex];
      } else {
        historyIndex = HISTORY.length;
        terminalInput.value = '';
      }
    }
  });

  // Attach click listener for chips
  document.querySelectorAll('.quick-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        terminalInput.value = cmd;
        handleCommand(cmd);
        terminalInput.value = '';
        terminalInput.focus();
      }
    });
  });

  // Attach clear button
  const clearBtn = document.getElementById('term-clear-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      terminalBody.innerHTML = '';
      appendLine(`[✓] Terminal buffer cleared. Type 'help' for options.`);
    });
  }

  // Initial welcome message in terminal
  appendLine(`================================================================`);
  appendLine(`IBRAHIM SAEED // DEFENSE TERMINAL v3.2.0 [ONLINE]`);
  appendLine(`Logged in as: guest_recruiter@soc.local (RESTRICTED PRIVILEGES)`);
  appendLine(`Type 'help' or click command chips below to inspect systems.`);
  appendLine(`================================================================`);
})();
