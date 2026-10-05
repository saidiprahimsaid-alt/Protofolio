/**
 * Interactive Deep Packet Inspection (DPI) & Protocol Dissector Simulator
 * Highlights Ibrahim's expertise in Wireshark, tcpdump, and network packet analysis
 */

(function () {
  const packetDatabase = {
    dns: {
      title: "DNS Query (A Record: api.infrastructure.net)",
      protocol: "DNS / UDP 53",
      timestamp: "12:18:44.204812",
      badge: { text: "INFO: RESOLUTION", class: "badge-cyan" },
      layers: [
        {
          name: "Layer 2: Ethernet II",
          summary: "Src: 00:0c:29:4f:8a:12 (Cisco Router), Dst: 00:50:56:c0:00:08 (Gateway)",
          details: [
            "Destination: 00:50:56:c0:00:08",
            "Source: 00:0c:29:4f:8a:12",
            "Type: IPv4 (0x0800)",
            "Frame Length: 78 bytes (624 bits)"
          ]
        },
        {
          name: "Layer 3: Internet Protocol Version 4",
          summary: "Src: 192.168.10.45, Dst: 8.8.8.8 | TTL: 64, Protocol: UDP (17)",
          details: [
            "Version: 4, Header Length: 20 bytes",
            "Differentiated Services Field: 0x00 (DSCP: CS0)",
            "Identification: 0x4a12 (18962)",
            "Flags: 0x02, Don't fragment",
            "Time to Live (TTL): 64",
            "Header Checksum: 0xb591 [validation: good]"
          ]
        },
        {
          name: "Layer 4: User Datagram Protocol",
          summary: "Src Port: 53535, Dst Port: 53 (DNS) | Length: 44 bytes",
          details: [
            "Source Port: 53535",
            "Destination Port: 53 (Domain Name System)",
            "Length: 44",
            "Checksum: 0x2e8f [verified]"
          ]
        },
        {
          name: "Layer 7: Domain Name System (Query)",
          summary: "Transaction ID: 0x7b4a | Standard query 0x0100 | Q: api.infrastructure.net",
          details: [
            "Transaction ID: 0x7b4a",
            "Flags: 0x0100 (Standard query, Recursion desired)",
            "Questions: 1, Answer RRs: 0, Authority RRs: 0",
            "Queries -> Name: api.infrastructure.net (Type: A, Class: IN)"
          ]
        }
      ],
      hexdump: `0000   00 50 56 c0 00 08 00 0c  29 4f 8a 12 08 00 45 00   .PV.....)O....E.
0010   00 40 4a 12 40 00 40 11  b5 91 c0 a8 0a 2d 08 08   .@J.@.@......-..
0020   08 08 d1 1f 00 35 00 2c  2e 8f 7b 4a 01 00 00 01   .....5.,..{J....
0030   00 00 00 00 00 00 03 61  70 69 0e 69 6e 66 72 61   .......api.infra
0040   73 74 72 75 63 74 75 72  65 03 6e 65 74 00 00 01   structure.net...
0050   00 01                                              ..`,
      analysis: {
        title: "SOC Triage Note: Legitimate DNS Query",
        body: "Standard recurring query originating from Internal VLAN 10 host. FQDN matches approved internal endpoint. No anomalous subdomains or entropy indicative of DNS tunneling detected."
      }
    },

    syn_scan: {
      title: "TCP SYN Reconnaissance Probe (Nmap Stealth Scan)",
      protocol: "TCP / Port 443",
      timestamp: "12:19:02.891104",
      badge: { text: "SUSPICIOUS: RECON", class: "badge-amber" },
      layers: [
        {
          name: "Layer 2: Ethernet II",
          summary: "Src: 08:00:27:fa:31:09, Dst: 00:0c:29:4f:8a:12",
          details: [
            "Destination: 00:0c:29:4f:8a:12 (Cisco Core Gateway)",
            "Source: 08:00:27:fa:31:09 (External Kali Host)",
            "Type: IPv4 (0x0800)",
            "Frame Length: 58 bytes"
          ]
        },
        {
          name: "Layer 3: Internet Protocol Version 4",
          summary: "Src: 203.0.113.88, Dst: 192.168.1.100 | TTL: 48 (External routing)",
          details: [
            "Source: 203.0.113.88 (Untrusted public subnet)",
            "Destination: 192.168.1.100 (DMZ Web Server)",
            "Total Length: 44",
            "Flags: 0x02 (Don't Fragment)",
            "TTL: 48 (Hop count suggests automated external scanner)"
          ]
        },
        {
          name: "Layer 4: Transmission Control Protocol",
          summary: "Src Port: 49152, Dst Port: 443 [SYN] Seq=0 Win=1024",
          details: [
            "Source Port: 49152 (Random High Ephemeral)",
            "Destination Port: 443 (HTTPS / SSL)",
            "Sequence Number: 0 (relative sequence number)",
            "Flags: 0x002 (SYN Only - Half Open Scan Pattern)",
            "Window Size: 1024 (Classic nmap TCP window signature)",
            "Urgent Pointer: 0"
          ]
        }
      ],
      hexdump: `0000   00 0c 29 4f 8a 12 08 00  27 fa 31 09 08 00 45 00   ..)O....'.1...E.
0010   00 2c a1 b2 40 00 30 06  e9 3a cb 00 71 58 c0 a8   .,..@.0..:..qX..
0020   01 64 c0 00 01 bb 3b 9a  ca 00 00 00 00 00 60 02   .d....;.......`.
0030   04 00 7a 1c 00 00 02 04  05 b4                     ..z......`,
      analysis: {
        title: "SOC Triage Note: Half-Open Port Scan Detected",
        body: "Pattern signature matches Nmap -sS scan profile (TCP SYN without ACK continuation, fixed window size 1024). Firewall ACL rule auto-tagged for temporary rate-limiting on border interface."
      }
    },

    sqli_attack: {
      title: "OWASP Top 10 A03: SQL Injection Payload in HTTP GET",
      protocol: "HTTP / TCP 80",
      timestamp: "12:19:15.541019",
      badge: { text: "CRITICAL: OWASP A03", class: "badge-purple" },
      layers: [
        {
          name: "Layer 2: Ethernet II",
          summary: "Src: 00:15:5d:21:40:aa, Dst: 00:0c:29:4f:8a:12",
          details: [
            "Destination: 00:0c:29:4f:8a:12 (Cisco Firewall Ingress)",
            "Source: 00:15:5d:21:40:aa (Client Node)",
            "Type: IPv4 (0x0800)"
          ]
        },
        {
          name: "Layer 3: Internet Protocol Version 4",
          summary: "Src: 172.16.5.90, Dst: 10.0.0.15 (Web Server)",
          details: [
            "Source IP: 172.16.5.90",
            "Destination IP: 10.0.0.15",
            "Protocol: TCP (6)",
            "Checksum: 0x93f1 [valid]"
          ]
        },
        {
          name: "Layer 4: Transmission Control Protocol",
          summary: "Src Port: 54120, Dst Port: 80 [PSH, ACK] Seq=145 Ack=1",
          details: [
            "Source Port: 54120",
            "Destination Port: 80 (HTTP)",
            "Flags: 0x018 (PSH, ACK)",
            "Window Size: 64240"
          ]
        },
        {
          name: "Layer 7: Hypertext Transfer Protocol",
          summary: "GET /api/v1/users?id=1%20UNION%20SELECT%20username,password_hash%20FROM%20users--",
          details: [
            "Request Method: GET",
            "Request URI: /api/v1/users?id=1' UNION SELECT username,password_hash FROM users--",
            "Host: internal-portal.corp",
            "User-Agent: sqlmap/1.7#stable",
            "Accept: */*"
          ]
        }
      ],
      hexdump: `0000   47 45 54 20 2f 61 70 69  2f 76 31 2f 75 73 65 72   GET /api/v1/user
0010   73 3f 69 64 3d 31 27 20  55 4e 49 4f 4e 20 53 45   s?id=1' UNION SE
0020   4c 45 43 54 20 75 73 65  72 6e 61 6d 65 2c 70 61   LECT username,pa
0030   73 73 77 6f 72 64 5f 68  61 73 68 20 46 52 4f 4d   ssword_hash FROM
0040   20 75 73 65 72 73 2d 2d  20 48 54 54 50 2f 31 2e    users-- HTTP/1.
0050   31 0d 0a 48 6f 73 74 3a  20 63 6f 72 70 0d 0a      1..Host: corp..`,
      analysis: {
        title: "SOC Triage Note: SQL Injection Attack Blocked",
        body: "Payload detected containing UNION-based SQL extraction attempt targeting authentication table. In Django REST backend, ORM parameterized queries natively eliminate this vector; WAF rule triggers automatic 403 Forbidden and SIEM incident creation."
      }
    },

    ospf_hello: {
      title: "OSPFv2 Hello Packet (Area 0.0.0.0 Backbone)",
      protocol: "OSPF / IP Protocol 89",
      timestamp: "12:19:30.002195",
      badge: { text: "ROUTING: VERIFIED", class: "badge-emerald" },
      layers: [
        {
          name: "Layer 2: Ethernet II",
          summary: "Src: 00:0c:29:4f:8a:12, Dst: 01:00:5e:00:00:05 (AllSPFRouters Multicast)",
          details: [
            "Destination: 01:00:5e:00:00:05 (IPv4 Multicast)",
            "Source: 00:0c:29:4f:8a:12 (Cisco R1 Gi0/0)",
            "Type: IPv4 (0x0800)"
          ]
        },
        {
          name: "Layer 3: Internet Protocol Version 4",
          summary: "Src: 10.0.0.1, Dst: 224.0.0.5 | TTL: 1, Protocol: 89 (OSPF)",
          details: [
            "Source IP: 10.0.0.1 (Router R1)",
            "Destination IP: 224.0.0.5 (All OSPF Routers)",
            "Protocol: 89 (OSPF IGP)",
            "TTL: 1 (Local subnet only, never routed)",
            "TOS: 0xc0 (Internetwork Control)"
          ]
        },
        {
          name: "Layer 4 & 7: Open Shortest Path First (OSPFv2)",
          summary: "Type: Hello (1) | Area: 0.0.0.0 (Backbone) | Router ID: 1.1.1.1",
          details: [
            "Version: 2, Message Type: Hello Packet (1)",
            "Packet Length: 44 bytes",
            "Source OSPF Router ID: 1.1.1.1",
            "Area ID: 0.0.0.0 (Backbone Area)",
            "Checksum: 0x8a92 [valid]",
            "Auth Type: None (0x0000)",
            "Network Mask: 255.255.255.252 (/30 Link)",
            "Hello Interval: 10s, Dead Interval: 40s",
            "Designated Router (DR): 10.0.0.1"
          ]
        }
      ],
      hexdump: `0000   01 00 5e 00 00 05 00 0c  29 4f 8a 12 08 00 45 c0   ..^.....)O....E.
0010   00 44 00 00 00 00 01 59  bd 33 0a 00 00 01 e0 00   .D.....Y.3......
0020   00 05 02 01 00 2c 01 01  01 01 00 00 00 00 8a 92   .....,..........
0030   00 00 00 00 00 00 00 00  00 00 ff ff ff fc 00 0a   ................
0040   02 01 00 00 00 28 0a 00  00 01 00 00 00 00         .....(........`,
      analysis: {
        title: "Network Telemetry: Neighbor Adjacency Healthy",
        body: "Hello parameters matched across timers (10s/40s) and subnet mask (/30). Two-way state achieved, leading towards FULL adjacency with Designated Router. Routing table convergence nominal."
      }
    }
  };

  function renderPacket(packetKey) {
    const data = packetDatabase[packetKey];
    if (!data) return;

    // Update Header
    const titleEl = document.getElementById('dpi-packet-title');
    const badgeEl = document.getElementById('dpi-packet-badge');
    const timeEl = document.getElementById('dpi-packet-time');

    if (titleEl) titleEl.textContent = data.title;
    if (timeEl) timeEl.textContent = data.timestamp;
    if (badgeEl) {
      badgeEl.textContent = data.badge.text;
      badgeEl.className = 'badge ' + data.badge.class;
    }

    // Render Layers
    const layersContainer = document.getElementById('dpi-layers-list');
    if (layersContainer) {
      layersContainer.innerHTML = '';
      data.layers.forEach((layer, idx) => {
        const item = document.createElement('div');
        item.className = 'layer-item' + (idx === data.layers.length - 1 ? ' active' : '');
        item.innerHTML = `
          <div class="layer-summary">
            <span>${layer.name}</span>
            <span style="color: var(--accent-cyan); font-size: 0.72rem;">▼</span>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 3px;">
            ${layer.summary}
          </div>
          <div class="layer-details">
            ${layer.details.map(d => `<div>• ${d}</div>`).join('')}
          </div>
        `;
        layersContainer.appendChild(item);
      });
    }

    // Render Hexdump
    const hexEl = document.getElementById('dpi-hexdump-code');
    if (hexEl) hexEl.textContent = data.hexdump;

    // Render Analysis Box
    const analysisTitle = document.getElementById('dpi-analysis-title');
    const analysisBody = document.getElementById('dpi-analysis-body');
    if (analysisTitle) analysisTitle.textContent = data.analysis.title;
    if (analysisBody) analysisBody.textContent = data.analysis.body;
  }

  // Bind tab click events
  document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.dpi-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const key = tab.getAttribute('data-packet');
        renderPacket(key);
      });
    });

    // Initial render
    renderPacket('dns');
  });
})();
