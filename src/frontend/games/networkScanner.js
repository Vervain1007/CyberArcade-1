(function() {
    window.CyberArcadeGames = window.CyberArcadeGames || {};

// Initialize Network Scanner game
function initNetworkScannerGame() {
    const scanScenarios = {
        'corporate': {
            name: 'Corporate Network',
            description: 'Scan a corporate network for security assessment',
            target: '192.168.1.0/24',
            ports: [
                {port: '22/tcp', service: 'SSH', state: 'open', version: 'OpenSSH 8.2p1'},
                {port: '80/tcp', service: 'HTTP', state: 'open', version: 'Apache 2.4.41'},
                {port: '443/tcp', service: 'HTTPS', state: 'open', version: 'Apache 2.4.41'},
                {port: '3389/tcp', service: 'RDP', state: 'open', version: 'Microsoft Terminal Services'},
                {port: '445/tcp', service: 'SMB', state: 'open', version: 'Samba 4.7.6'},
                {port: '1433/tcp', service: 'MSSQL', state: 'open', version: 'Microsoft SQL Server 2019'},
                {port: '3306/tcp', service: 'MySQL', state: 'open', version: 'MySQL 8.0.25'},
                {port: '5432/tcp', service: 'PostgreSQL', state: 'open', version: 'PostgreSQL 13.3'},
                {port: '21/tcp', service: 'FTP', state: 'open', version: 'vsftpd 3.0.3'},
                {port: '25/tcp', service: 'SMTP', state: 'open', version: 'Postfix 3.4.13'}
            ],
            vulnerabilities: [
                'RDP exposed without proper authentication',
                'SMB version 1 enabled (CVE-2017-0144)',
                'FTP anonymous login allowed',
                'MySQL root access without password',
                'Outdated Apache version with known vulnerabilities'
            ]
        },
        'web-server': {
            name: 'Web Server Assessment',
            description: 'Comprehensive web server security scan',
            target: 'web-server.example.com',
            ports: [
                {port: '80/tcp', service: 'HTTP', state: 'open', version: 'nginx 1.18.0'},
                {port: '443/tcp', service: 'HTTPS', state: 'open', version: 'nginx 1.18.0'},
                {port: '8080/tcp', service: 'HTTP-Alt', state: 'open', version: 'Apache Tomcat 9.0.50'},
                {port: '8443/tcp', service: 'HTTPS-Alt', state: 'open', version: 'Apache Tomcat 9.0.50'},
                {port: '22/tcp', service: 'SSH', state: 'open', version: 'OpenSSH 8.2p1'},
                {port: '3306/tcp', service: 'MySQL', state: 'open', version: 'MySQL 8.0.25'},
                {port: '6379/tcp', service: 'Redis', state: 'open', version: 'Redis 6.2.5'},
                {port: '9200/tcp', service: 'Elasticsearch', state: 'open', version: 'Elasticsearch 7.13.2'}
            ],
            vulnerabilities: [
                'HTTP to HTTPS redirect not configured',
                'Tomcat default credentials (admin:admin)',
                'Redis exposed without authentication',
                'Elasticsearch exposed without security',
                'Missing security headers (HSTS, CSP, X-Frame-Options)',
                'Outdated nginx version with CVE-2021-23017'
            ]
        },
        'iot-devices': {
            name: 'IoT Network Scan',
            description: 'Scan IoT devices for security vulnerabilities',
            target: '192.168.0.0/24',
            ports: [
                {port: '80/tcp', service: 'HTTP', state: 'open', version: 'lighttpd 1.4.59'},
                {port: '443/tcp', service: 'HTTPS', state: 'open', version: 'lighttpd 1.4.59'},
                {port: '22/tcp', service: 'SSH', state: 'open', version: 'Dropbear SSH 2020.81'},
                {port: '23/tcp', service: 'Telnet', state: 'open', version: 'BusyBox telnetd'},
                {port: '554/tcp', service: 'RTSP', state: 'open', version: 'LIVE555 Media Server'},
                {port: '8080/tcp', service: 'HTTP-Alt', state: 'open', version: 'Boa/0.94.14rc21'},
                {port: '8888/tcp', service: 'HTTP-Alt', state: 'open', version: 'uhttpd 1.0.0'},
                {port: '9999/tcp', service: 'HTTP-Alt', state: 'open', version: 'mini_httpd 1.19'},
                {port: '1883/tcp', service: 'MQTT', state: 'open', version: 'Mosquitto MQTT Broker'},
                {port: '5683/udp', service: 'CoAP', state: 'open', version: 'Eclipse Californium'}
            ],
            vulnerabilities: [
                'Telnet service enabled (unencrypted)',
                'Default credentials on web interface (admin:admin)',
                'MQTT broker without authentication',
                'Outdated firmware with known CVEs',
                'RTSP stream accessible without authentication',
                'CoAP service without proper security',
                'Missing firmware update mechanism'
            ]
        },
        'industrial': {
            name: 'Industrial Control System',
            description: 'Scan industrial control systems for OT security',
            target: '10.0.0.0/24',
            ports: [
                {port: '502/tcp', service: 'Modbus', state: 'open', version: 'Modbus TCP'},
                {port: '102/tcp', service: 'S7', state: 'open', version: 'Siemens S7 PLC'},
                {port: '44818/tcp', service: 'EtherNet/IP', state: 'open', version: 'Rockwell Automation'},
                {port: '47808/tcp', service: 'BACnet', state: 'open', version: 'BACnet Building Automation'},
                {port: '80/tcp', service: 'HTTP', state: 'open', version: 'Apache 2.4.41'},
                {port: '443/tcp', service: 'HTTPS', state: 'open', version: 'Apache 2.4.41'},
                {port: '22/tcp', service: 'SSH', state: 'open', version: 'OpenSSH 7.4'},
                {port: '161/udp', service: 'SNMP', state: 'open', version: 'SNMP v1/v2c'},
                {port: '623/udp', service: 'IPMI', state: 'open', version: 'IPMI 2.0'},
                {port: '1911/tcp', service: 'Niagara', state: 'open', version: 'Tridium Niagara 4.8'}
            ],
            vulnerabilities: [
                'Modbus TCP without authentication',
                'SNMP using default community strings',
                'IPMI with weak authentication',
                'Outdated firmware on PLCs',
                'Industrial protocols over unencrypted connections',
                'Default credentials on HMI interfaces',
                'Missing network segmentation'
            ]
        },
        'cloud-infrastructure': {
            name: 'Cloud Infrastructure',
            description: 'Scan cloud infrastructure for misconfigurations',
            target: 'cloud.example.com',
            ports: [
                {port: '80/tcp', service: 'HTTP', state: 'open', version: 'nginx 1.20.1'},
                {port: '443/tcp', service: 'HTTPS', state: 'open', version: 'nginx 1.20.1'},
                {port: '22/tcp', service: 'SSH', state: 'open', version: 'OpenSSH 8.2p1'},
                {port: '3306/tcp', service: 'MySQL', state: 'open', version: 'MySQL 8.0.25'},
                {port: '5432/tcp', service: 'PostgreSQL', state: 'open', version: 'PostgreSQL 13.3'},
                {port: '6379/tcp', service: 'Redis', state: 'open', version: 'Redis 6.2.5'},
                {port: '9200/tcp', service: 'Elasticsearch', state: 'open', version: 'Elasticsearch 7.13.2'},
                {port: '27017/tcp', service: 'MongoDB', state: 'open', version: 'MongoDB 4.4.6'},
                {port: '5984/tcp', service: 'CouchDB', state: 'open', version: 'CouchDB 3.1.1'},
                {port: '11211/tcp', service: 'Memcached', state: 'open', version: 'Memcached 1.6.9'}
            ],
            vulnerabilities: [
                'Database exposed to public internet',
                'MongoDB without authentication',
                'CouchDB admin interface accessible',
                'Memcached exposed without authentication',
                'Elasticsearch without security enabled',
                'Missing database encryption at rest',
                'Insufficient network access controls'
            ]
        }
    };

    let currentScenario = 'corporate';

    window.startNetworkScan = function() {
        const target = document.getElementById('scanTarget').value;
        const output = document.getElementById('scannerOutput');

        if (!target) {
            alert('Please enter a target IP or domain');
            return;
        }

        // Simulate network scan with progress
        output.innerHTML = `
            <div class="code-line">🔍 Starting comprehensive network scan...</div>
            <div class="code-line">Target: ${target}</div>
            <div class="code-line">Scanning ports 1-65535...</div>
        `;

        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 2;
            output.innerHTML += `<div class="code-line">Progress: ${progress}% - Scanning port ${Math.floor(progress * 655.35)}</div>`;

            if (progress >= 100) {
                clearInterval(progressInterval);
                displayScanResults(target, scanScenarios[currentScenario]);
            }
        }, 100);
    };

    function displayScanResults(target, scenario) {
        const output = document.getElementById('scannerOutput');
        
        // Context explanations for different audiences
        const contextExplanations = {
            'corporate': {
                kids: "🏢 Imagine a big office building with many computers. We're checking if the doors (ports) are locked properly!",
                pro: "Corporate network assessment: Identifying exposed services and potential attack vectors in enterprise infrastructure."
            },
            'web-server': {
                kids: "🌐 A website's computer! We're checking if it's safe from hackers who want to break in!",
                pro: "Web server security audit: Assessing HTTP/HTTPS services, application servers, and database exposures."
            },
            'iot-devices': {
                kids: "📱 Smart devices like cameras, lights, and thermostats! We're checking if they're safe from hackers!",
                pro: "IoT security assessment: Evaluating connected device vulnerabilities and insecure protocols."
            }
        };
        
        const context = contextExplanations[scenario.name.toLowerCase().replace(' ', '-')] || contextExplanations['corporate'];
        
        let html = `
            <div class="code-line" style="color: #00ffff; font-weight: bold; font-size: 1.2rem; margin-bottom: 1rem;">✅ Scan Completed Successfully!</div>
            <div class="code-line code-comment">// ==========================================</div>
            <div class="code-line code-comment">// SCAN RESULTS FOR ${target.toUpperCase()}</div>
            <div class="code-line code-comment">// ==========================================</div>
            <div style="background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 5px; margin: 1rem 0; border-left: 3px solid #00ffff;">
                <div style="color: #ffd700; margin-bottom: 0.5rem;">👶 For Kids:</div>
                <div style="color: #ffffff; margin-bottom: 1rem;">${context.kids}</div>
                <div style="color: #ffd700; margin-bottom: 0.5rem;">👔 For Professionals:</div>
                <div style="color: #ffffff;">${context.pro}</div>
            </div>
            <div class="code-line" style="margin-top: 1rem;"><strong>Scenario:</strong> ${scenario.name}</div>
            <div class="code-line"><strong>Description:</strong> ${scenario.description}</div>
            <div class="code-line"><strong>Scan Time:</strong> ${new Date().toLocaleTimeString()}</div>
            <div class="code-line code-comment" style="margin-top: 1.5rem;">// ==========================================</div>
            <div class="code-line code-comment">// OPEN PORTS & SERVICES</div>
            <div class="code-line code-comment">// ==========================================</div>
            <div style="color: #cccccc; margin: 0.5rem 0; font-size: 0.9rem;">💡 Ports are like doors on a computer. Open ports mean services are accessible.</div>
        `;
        
        scenario.ports.forEach((port, index) => {
            const portExplanations = {
                '22/tcp': 'SSH - Secure Shell, used for remote access. Should be secured with keys.',
                '80/tcp': 'HTTP - Unencrypted web traffic. Should redirect to HTTPS.',
                '443/tcp': 'HTTPS - Encrypted web traffic. Good!',
                '3389/tcp': 'RDP - Remote Desktop. Very dangerous if exposed!',
                '3306/tcp': 'MySQL - Database. Should never be exposed to internet!',
                '21/tcp': 'FTP - File transfer. Old and insecure!'
            };
            
            const explanation = portExplanations[port.port] || `${port.service} - ${port.service} service`;
            const isSecure = port.port === '443/tcp' || port.port === '22/tcp';
            
            html += `
                <div class="code-line code-highlight" style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: ${isSecure ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)'}; border-radius: 3px; margin: 0.25rem 0; cursor: pointer;" onclick="showPortDetails('${port.port}', '${port.service}', '${explanation}')">
                    <span><strong>${port.port}</strong> - ${port.service} - ${port.version}</span>
                    <span style="color: ${isSecure ? '#00ff00' : '#ff0000'}; font-weight: bold;">${port.state.toUpperCase()}</span>
                </div>
            `;
        });
        
        html += `
            <div class="code-line code-comment" style="margin-top: 1.5rem;">// ==========================================</div>
            <div class="code-line code-comment">// SECURITY VULNERABILITIES FOUND</div>
            <div class="code-line code-comment">// ==========================================</div>
            <div style="color: #ff0000; margin: 0.5rem 0; font-size: 0.9rem;">⚠️ These are security problems that hackers could exploit!</div>
        `;
        
        const vulnExplanations = {
            'RDP exposed without proper authentication': {
                kids: "🚨 Like leaving your house door wide open! Anyone can get in!",
                pro: "RDP (Remote Desktop Protocol) exposed to internet without MFA. High risk for brute force attacks.",
                fix: "Disable RDP or restrict to VPN, enable MFA, use strong passwords"
            },
            'FTP anonymous login allowed': {
                kids: "🚨 Like a library where anyone can take books without checking out!",
                pro: "FTP allows anonymous access. Attackers can upload malicious files or download sensitive data.",
                fix: "Disable anonymous login, use SFTP instead, require authentication"
            },
            'MySQL root access without password': {
                kids: "🚨 Like a bank vault with no lock! Anyone can take all the money!",
                pro: "Database root access without authentication. Critical vulnerability - full database compromise possible.",
                fix: "Set strong root password, create limited-privilege users, restrict network access"
            }
        };
        
        scenario.vulnerabilities.forEach((vuln, index) => {
            const explanation = vulnExplanations[vuln] || {
                kids: "🚨 This is a security problem that needs to be fixed!",
                pro: vuln,
                fix: "Review and secure this service"
            };
            
            html += `
                <div class="code-line code-error" style="background: rgba(255,0,0,0.1); padding: 1rem; border-radius: 5px; margin: 0.5rem 0; border-left: 3px solid #ff0000; cursor: pointer;" onclick="showVulnDetails(${index}, '${vuln.replace(/'/g, "\\'")}', '${explanation.kids.replace(/'/g, "\\'")}', '${explanation.pro.replace(/'/g, "\\'")}', '${explanation.fix.replace(/'/g, "\\'")}')">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-size: 1.2rem;">⚠️</span>
                        <span style="font-weight: bold;">${vuln}</span>
                    </div>
                    <div style="margin-top: 0.5rem; color: #ffd700; font-size: 0.9rem;">Click for details and how to fix →</div>
                </div>
            `;
        });
        
        html += `
            <div class="code-line code-comment" style="margin-top: 1.5rem;">// ==========================================</div>
            <div class="code-line code-comment">// SECURITY RECOMMENDATIONS</div>
            <div class="code-line code-comment">// ==========================================</div>
            <div style="background: rgba(0,255,0,0.1); padding: 1rem; border-radius: 5px; margin: 1rem 0; border-left: 3px solid #00ff00;">
                <div style="color: #00ff00; font-weight: bold; margin-bottom: 0.75rem;">✅ Action Items:</div>
                <div style="color: #ffffff; line-height: 1.8;">
                    <div>1. 🔐 Implement proper authentication on all services</div>
                    <div>2. 🔒 Enable encryption for all network communications</div>
                    <div>3. 🔄 Update all software to latest versions</div>
                    <div>4. 🚧 Implement network segmentation</div>
                    <div>5. 🛡️ Configure proper firewall rules</div>
                    <div>6. 📊 Enable security monitoring and logging</div>
                </div>
            </div>
            <div class="code-line code-error" style="margin-top: 1rem; font-size: 1.1rem; font-weight: bold;">🚨 Risk Level: HIGH - Immediate action required</div>
        `;
        
        output.innerHTML = html;
        addPoints(200);
    }
    
    // Show port details
    window.showPortDetails = function(port, service, explanation) {
        const modal = document.createElement('div');
        modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.9); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 2rem;';
        modal.innerHTML = `
            <div style="background: #1a1a2e; padding: 2rem; border-radius: 15px; border: 2px solid rgba(0,255,255,0.3); max-width: 600px;">
                <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: 1rem; right: 1rem; background: rgba(255,0,0,0.2); border: 1px solid #ff0000; color: #ff0000; width: 35px; height: 35px; border-radius: 50%; cursor: pointer; font-size: 1.2rem;">×</button>
                <h3 style="color: #00ffff; margin-bottom: 1rem;">Port ${port} - ${service}</h3>
                <p style="color: #ffffff; line-height: 1.6; margin-bottom: 1rem;">${explanation}</p>
                <div style="background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 5px; border-left: 3px solid #00ffff;">
                    <strong style="color: #00ffff;">💡 What this means:</strong>
                    <p style="color: #cccccc; margin-top: 0.5rem;">This port is open and accessible. Make sure it's properly secured!</p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    };
    
    // Show vulnerability details
    window.showVulnDetails = function(index, vuln, kidsExp, proExp, fix) {
        const modal = document.createElement('div');
        modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.9); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 2rem;';
        modal.innerHTML = `
            <div style="background: #1a1a2e; padding: 2rem; border-radius: 15px; border: 2px solid rgba(255,0,0,0.5); max-width: 700px; max-height: 80vh; overflow-y: auto;">
                <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: 1rem; right: 1rem; background: rgba(255,0,0,0.2); border: 1px solid #ff0000; color: #ff0000; width: 35px; height: 35px; border-radius: 50%; cursor: pointer; font-size: 1.2rem;">×</button>
                <h3 style="color: #ff0000; margin-bottom: 1rem; font-size: 1.5rem;">⚠️ ${vuln}</h3>
                
                <div style="background: rgba(255,215,0,0.1); padding: 1rem; border-radius: 5px; margin-bottom: 1rem; border-left: 3px solid #ffd700;">
                    <div style="color: #ffd700; font-weight: bold; margin-bottom: 0.5rem;">👶 For Kids:</div>
                    <div style="color: #ffffff;">${kidsExp}</div>
                </div>
                
                <div style="background: rgba(255,0,0,0.1); padding: 1rem; border-radius: 5px; margin-bottom: 1rem; border-left: 3px solid #ff0000;">
                    <div style="color: #ff0000; font-weight: bold; margin-bottom: 0.5rem;">👔 For Professionals:</div>
                    <div style="color: #ffffff;">${proExp}</div>
                </div>
                
                <div style="background: rgba(0,255,0,0.1); padding: 1rem; border-radius: 5px; border-left: 3px solid #00ff00;">
                    <div style="color: #00ff00; font-weight: bold; margin-bottom: 0.5rem;">🔧 How to Fix:</div>
                    <div style="color: #ffffff;">${fix}</div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    };

    window.switchScanScenario = function(scenario) {
        currentScenario = scenario;
        const scenarioInfo = scanScenarios[scenario];
        
        // Update input and description
        const scanTarget = document.getElementById('scanTarget');
        const scenarioDesc = document.getElementById('scenarioDescription');
        if (scanTarget) scanTarget.value = scenarioInfo.target;
        if (scenarioDesc) scenarioDesc.textContent = scenarioInfo.description;
        
        // Update active button state - remove active from all, add to clicked
        document.querySelectorAll('.scenario-btn').forEach(btn => {
            btn.classList.remove('active');
            const onclickAttr = btn.getAttribute('onclick') || '';
            if (onclickAttr.includes(`'${scenario}'`) || onclickAttr.includes(`"${scenario}"`)) {
                btn.classList.add('active');
            }
        });
    };

    window.clearScannerOutput = function() {
        document.getElementById('scannerOutput').innerHTML = `
            <div class="code-line">Welcome to CyberArcade Network Scanner v3.0</div>
            <div class="code-line">Initializing security protocols...</div>
            <div class="code-line">Loading threat intelligence database...</div>
            <div class="code-line">Ready to scan for vulnerabilities</div>
            <div class="code-line code-comment">// Select a scenario and enter target to begin scan</div>
        `;
    };
}

    window.CyberArcadeGames['network-scanner'] = {
                title: 'Network Security Scanner',
                content: `
                    <div class="network-scanner">
                        <div class="scanner-header">
                            <div class="scanner-title">🔍 Network Security Scanner v3.0</div>
                            <div class="scanner-status">READY</div>
                        </div>
                        <div class="scanner-scenarios">
                            <h4>Select Scan Scenario:</h4>
                            <div class="scenario-buttons">
                                <button class="scenario-btn active" onclick="switchScanScenario('corporate')">Corporate Network</button>
                                <button class="scenario-btn" onclick="switchScanScenario('web-server')">Web Server</button>
                                <button class="scenario-btn" onclick="switchScanScenario('iot-devices')">IoT Devices</button>
                                <button class="scenario-btn" onclick="switchScanScenario('industrial')">Industrial Control</button>
                                <button class="scenario-btn" onclick="switchScanScenario('cloud-infrastructure')">Cloud Infrastructure</button>
                            </div>
                            <div class="scenario-description" id="scenarioDescription">
                                Scan a corporate network for security assessment
                            </div>
                        </div>
                        <div class="scanner-output" id="scannerOutput">
                            <div class="code-line">Welcome to CyberArcade Network Scanner v3.0</div>
                            <div class="code-line">Initializing security protocols...</div>
                            <div class="code-line">Loading threat intelligence database...</div>
                            <div class="code-line">Ready to scan for vulnerabilities</div>
                            <div class="code-line code-comment">// Select a scenario and enter target to begin scan</div>
                        </div>
                        <div class="scanner-controls">
                            <input type="text" class="scanner-input" id="scanTarget" placeholder="Enter IP address or domain" value="192.168.1.0/24">
                            <button class="scanner-btn" onclick="startNetworkScan()">Start Scan</button>
                            <button class="scanner-btn" onclick="clearScannerOutput()">Clear</button>
                        </div>
                    </div>
                `,
                init: initNetworkScannerGame
            };
})();
