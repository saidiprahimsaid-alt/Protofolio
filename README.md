# 🌐 Ibrahim Saeed Abdulaziz — Professional Portfolio
> **Network Infrastructure Security & SOC Analyst**

A modern, interactive, cyber-defense-themed portfolio built for **Ibrahim Saeed Abdulaziz**, showcasing enterprise network engineering (Cisco), deep packet inspection (Wireshark/tcpdump), automated SOC operations, and robust backend development (Python/Django & Java OOP).

---

## ⚡ Highlights & Interactive Features

1. **🛡️ Cyber SOC Operations Aesthetics:**
   - Dark Cyber-SOC default theme with glowing cyan, emerald, and electric violet accents.
   - One-click **Cyber Dark / Enterprise Light** theme toggle (persisted via `localStorage`).
   - Interactive audio feedback toggle utilizing the browser's native **Web Audio API** (no audio assets required).

2. **🌐 Interactive Network Mesh Canvas (`assets/js/network-canvas.js`):**
   - Real-time simulation of router/switch nodes and animated packet pulses traveling across links.
   - Interactive mouse cursor connection and repulsion physics.

3. **🔍 Deep Packet Inspection (DPI) Cyber Lab (`assets/js/packet-inspector.js`):**
   - Interactive protocol dissector allowing visitors to analyze 4 real-world network traffic captures:
     - **DNS Query & Response** (Standard A-Record lookup)
     - **Nmap Stealth TCP SYN Scan** (Half-open port 443 probe)
     - **OWASP Top 10 A03 SQL Injection** (Payload in HTTP GET)
     - **OSPFv2 Hello Packet** (Backbone Area 0 routing telemetry)
   - Dissects frames layer-by-layer (Ethernet II ➔ IPv4 ➔ TCP/UDP ➔ Application Payload) with hexadecimal & ASCII dump.

4. **💻 Interactive SOC Analyst Terminal (`assets/js/terminal.js`):**
   - Fully operational command-line emulator in the browser with command history (↑/↓ arrows).
   - Commands: `help`, `whoami`, `skills`, `projects`, `nexus`, `scan [ip]`, `soc`, `cv`, `contact`, `theme`, `clear`.
   - Quick command chips for instant execution.

5. **📄 Printable Curriculum Vitae (CV) Modal:**
   - Formatted, professional resume modal with a dedicated **Print / Save as PDF** trigger.

6. **📬 Interactive Contact Dispatcher:**
   - Direct integration with Phone (`+20 1068262081`), Email (`saidiprahimsaid@gmail.com`), WhatsApp direct chat link, and one-click copy buttons with toast notifications.
   - Freelance availability badges for **Mostaql**, **Khamsat**, and **Nafezly**.

---

## 📁 Project Structure

```
e:/protflu/
├── index.html                   # Main semantic portfolio entrypoint
├── README.md                    # Project documentation & deployment guide
└── assets/
    ├── css/
    │   └── style.css            # Responsive cyber-defense styles & variables
    ├── js/
    │   ├── main.js              # Navigation, theme toggle, modals & telemetry
    │   ├── network-canvas.js    # Interactive network node canvas
    │   ├── packet-inspector.js  # DPI protocol dissector simulation
    │   └── terminal.js          # Interactive SOC analyst CLI
    └── images/                  # Directory for custom avatars/screenshots
```

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Launch (Zero Installation Required)
Simply double-click `index.html` or right-click and choose **Open with Microsoft Edge / Google Chrome**. All assets are pure native HTML5, CSS3, and modern vanilla JavaScript.

### Option 2: Live Server (VS Code)
1. Open the folder `e:\protflu` in VS Code.
2. Click **Go Live** on the bottom status bar (using the *Live Server* extension).
3. The site will open at `http://127.0.0.1:5500/index.html`.

---

## 🌐 Free 1-Click Deployment to GitHub Pages

Since your GitHub account is `https://github.com/saidiprahimsaid-alt`:

1. Create a new repository named `portfolio` (or `saidiprahimsaid-alt.github.io`).
2. Push this folder to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of cybersecurity & SOC analyst portfolio"
   git branch -M main
   git remote add origin https://github.com/saidiprahimsaid-alt/portfolio.git
   git push -u origin main
   ```
3. Go to **Settings** ➔ **Pages** ➔ Set Branch to `main` / `root` and click **Save**.
4. Your website will be live worldwide at `https://saidiprahimsaid-alt.github.io/portfolio/`!

---

## 👨‍💻 Profile Summary
- **Name:** Ibrahim Saeed Abdulaziz
- **Location:** Qalyubia, Egypt
- **Headline:** Network Infrastructure Security & SOC Analyst
- **LinkedIn:** [linkedin.com/in/iprahim-said-said-b95700269](https://www.linkedin.com/in/iprahim-said-said-b95700269)
- **GitHub:** [github.com/saidiprahimsaid-alt](https://github.com/saidiprahimsaid-alt)
- **Phone:** +20 1068262081
- **Email:** saidiprahimsaid@gmail.com
