// Spot the Threat Game
(function() {
    const threatScenarios = [
        {
            id: 1,
            title: 'Suspicious Login Activity',
            description: 'Look at this login screen. Can you spot the security threat?',
            image: '🔐',
            visual: `
                <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 15px; margin: 2rem 0;">
                    <div style="background: #1a1a2e; padding: 2rem; border-radius: 10px; border: 2px solid rgba(0,255,255,0.3);">
                        <h3 style="color: #00ffff; margin-bottom: 1.5rem; text-align: center;">Login to Your Account</h3>
                        <div style="margin-bottom: 1rem;">
                            <label style="color: #ffffff; display: block; margin-bottom: 0.5rem;">Email:</label>
                            <input type="text" value="user@example.com" style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.5); border: 1px solid rgba(0,255,255,0.3); border-radius: 5px; color: #ffffff;" readonly>
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label style="color: #ffffff; display: block; margin-bottom: 0.5rem;">Password:</label>
                            <input type="password" value="••••••••" style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.5); border: 1px solid rgba(0,255,255,0.3); border-radius: 5px; color: #ffffff;" readonly>
                        </div>
                        <div style="background: rgba(255,0,0,0.2); padding: 1rem; border-radius: 5px; border-left: 4px solid #ff0000; margin-top: 1rem;">
                            <p style="color: #ffcccc; margin: 0; font-size: 0.9rem;">⚠️ Warning: This site is not secure (HTTP)</p>
                        </div>
                        <button style="width: 100%; padding: 1rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 5px; color: #000; font-weight: bold; margin-top: 1rem; cursor: pointer;">Login</button>
                    </div>
                </div>
            `,
            threats: [
                { id: 'http-warning', text: 'HTTP (not HTTPS) - data is not encrypted', correct: true },
                { id: 'password-field', text: 'Password field looks normal', correct: false },
                { id: 'login-button', text: 'Login button is present', correct: false }
            ],
            explanation: 'The HTTP warning is the threat! HTTP doesn\'t encrypt your data, so hackers can intercept your password. Always look for HTTPS (the "S" means secure).'
        },
        {
            id: 2,
            title: 'Phishing Website',
            description: 'Examine this website. What looks suspicious?',
            image: '🌐',
            visual: `
                <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 15px; margin: 2rem 0;">
                    <div style="background: #1a1a2e; padding: 2rem; border-radius: 10px; border: 2px solid rgba(0,255,255,0.3);">
                        <div style="background: rgba(255,107,107,0.2); padding: 0.75rem; border-radius: 5px; margin-bottom: 1rem; border-left: 4px solid #ff6b6b;">
                            <div style="color: #ff6b6b; font-weight: bold; margin-bottom: 0.25rem;">amaz0n.com</div>
                            <div style="color: #cccccc; font-size: 0.85rem;">Not secure | Certificate invalid</div>
                        </div>
                        <h2 style="color: #ffffff; margin-bottom: 1rem;">Welcome to Amazon</h2>
                        <p style="color: #cccccc; margin-bottom: 1.5rem;">Please verify your account to continue shopping.</p>
                        <div style="background: rgba(255,215,0,0.2); padding: 1rem; border-radius: 5px; border-left: 4px solid #ffd700;">
                            <p style="color: #ffd700; margin: 0; font-size: 0.9rem;">⚠️ This site uses an invalid security certificate</p>
                        </div>
                    </div>
                </div>
            `,
            threats: [
                { id: 'wrong-domain', text: 'Domain is "amaz0n.com" (with zero) instead of "amazon.com"', correct: true },
                { id: 'invalid-cert', text: 'Invalid security certificate warning', correct: true },
                { id: 'verify-account', text: 'Asking to verify account', correct: false }
            ],
            explanation: 'The domain "amaz0n.com" uses a zero instead of "o" - this is a common phishing trick! Also, the invalid certificate is a major red flag. Always check the URL carefully.'
        },
        {
            id: 3,
            title: 'Suspicious Download',
            description: 'You received this file. What should concern you?',
            image: '📥',
            visual: `
                <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 15px; margin: 2rem 0;">
                    <div style="background: #1a1a2e; padding: 2rem; border-radius: 10px; border: 2px solid rgba(0,255,255,0.3);">
                        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                            <div style="font-size: 3rem;">📎</div>
                            <div>
                                <div style="color: #ffffff; font-weight: bold; font-size: 1.2rem;">invoice_2024.exe</div>
                                <div style="color: #cccccc; font-size: 0.9rem;">2.5 MB • From: unknown-sender@dubious.com</div>
                            </div>
                        </div>
                        <div style="background: rgba(255,0,0,0.2); padding: 1rem; border-radius: 5px; border-left: 4px solid #ff0000; margin-bottom: 1rem;">
                            <p style="color: #ffcccc; margin: 0; font-size: 0.9rem;">⚠️ File type: Executable (.exe) - May contain malware</p>
                        </div>
                        <div style="background: rgba(255,107,107,0.2); padding: 1rem; border-radius: 5px; border-left: 4px solid #ff6b6b;">
                            <p style="color: #ff6b6b; margin: 0; font-size: 0.9rem;">⚠️ Unknown sender - Not in your contacts</p>
                        </div>
                        <button style="width: 100%; padding: 1rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 5px; color: #000; font-weight: bold; margin-top: 1rem; cursor: pointer;">Download</button>
                    </div>
                </div>
            `,
            threats: [
                { id: 'exe-file', text: 'File is .exe (executable) - invoices should be PDF', correct: true },
                { id: 'unknown-sender', text: 'Unknown sender email address', correct: true },
                { id: 'file-size', text: 'File size is 2.5 MB', correct: false }
            ],
            explanation: 'Invoices should be PDF files, not .exe executables! .exe files can contain malware. Also, never download files from unknown senders.'
        },
        {
            id: 4,
            title: 'Public WiFi Warning',
            description: 'You\'re about to connect to this WiFi network. What\'s the threat?',
            image: '📶',
            visual: `
                <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 15px; margin: 2rem 0;">
                    <div style="background: #1a1a2e; padding: 2rem; border-radius: 10px; border: 2px solid rgba(0,255,255,0.3);">
                        <div style="text-align: center; margin-bottom: 1.5rem;">
                            <div style="font-size: 4rem; margin-bottom: 0.5rem;">📶</div>
                            <h3 style="color: #ffffff; margin-bottom: 0.5rem;">Free_Public_WiFi</h3>
                            <div style="color: #cccccc; font-size: 0.9rem;">Open Network • No Password Required</div>
                        </div>
                        <div style="background: rgba(255,0,0,0.2); padding: 1rem; border-radius: 5px; border-left: 4px solid #ff0000; margin-bottom: 1rem;">
                            <p style="color: #ffcccc; margin: 0; font-size: 0.9rem;">⚠️ No encryption - Your data can be intercepted</p>
                        </div>
                        <div style="background: rgba(255,107,107,0.2); padding: 1rem; border-radius: 5px; border-left: 4px solid #ff6b6b;">
                            <p style="color: #ff6b6b; margin: 0; font-size: 0.9rem;">⚠️ Anyone can access this network - Potential for man-in-the-middle attacks</p>
                        </div>
                        <button style="width: 100%; padding: 1rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 5px; color: #000; font-weight: bold; margin-top: 1rem; cursor: pointer;">Connect</button>
                    </div>
                </div>
            `,
            threats: [
                { id: 'no-encryption', text: 'No encryption - hackers can see your data', correct: true },
                { id: 'open-network', text: 'Open network - anyone can join', correct: true },
                { id: 'free-wifi', text: 'It\'s free WiFi', correct: false }
            ],
            explanation: 'Public WiFi without encryption is dangerous! Hackers can intercept your passwords, emails, and personal data. Use a VPN on public WiFi or avoid sensitive activities.'
        },
        {
            id: 5,
            title: 'Suspicious Browser Extension',
            description: 'This extension wants to be installed. What\'s wrong?',
            image: '🔌',
            visual: `
                <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 15px; margin: 2rem 0;">
                    <div style="background: #1a1a2e; padding: 2rem; border-radius: 10px; border: 2px solid rgba(0,255,255,0.3);">
                        <h3 style="color: #ffffff; margin-bottom: 1rem;">Install Browser Extension?</h3>
                        <div style="background: rgba(255,215,0,0.2); padding: 1rem; border-radius: 5px; margin-bottom: 1rem;">
                            <div style="color: #ffd700; font-weight: bold; margin-bottom: 0.5rem;">Super Speed Browser v2.0</div>
                            <div style="color: #cccccc; font-size: 0.9rem;">Publisher: Unknown Developer</div>
                            <div style="color: #cccccc; font-size: 0.9rem;">Users: 5</div>
                        </div>
                        <div style="background: rgba(255,0,0,0.2); padding: 1rem; border-radius: 5px; border-left: 4px solid #ff0000; margin-bottom: 1rem;">
                            <p style="color: #ffcccc; margin: 0; font-size: 0.9rem;">⚠️ This extension can: Read and change all your data on all websites</p>
                        </div>
                        <div style="background: rgba(255,107,107,0.2); padding: 1rem; border-radius: 5px; border-left: 4px solid #ff6b6b;">
                            <p style="color: #ff6b6b; margin: 0; font-size: 0.9rem;">⚠️ Unknown developer - Not verified by browser store</p>
                        </div>
                        <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                            <button style="flex: 1; padding: 1rem; background: rgba(255,0,0,0.2); border: 2px solid #ff0000; border-radius: 5px; color: #ff0000; font-weight: bold; cursor: pointer;">Cancel</button>
                            <button style="flex: 1; padding: 1rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 5px; color: #000; font-weight: bold; cursor: pointer;">Install</button>
                        </div>
                    </div>
                </div>
            `,
            threats: [
                { id: 'unknown-dev', text: 'Unknown developer - not verified', correct: true },
                { id: 'too-many-perms', text: 'Asks for permission to read ALL your data', correct: true },
                { id: 'few-users', text: 'Only 5 users - suspiciously low', correct: true }
            ],
            explanation: 'Multiple red flags! Unknown developer, excessive permissions, and very few users. This could be malware. Only install extensions from trusted, verified developers.'
        },
        {
            id: 6,
            title: 'Malware Infection - Ransomware',
            description: 'Your computer shows this screen. What type of malware is this and how can you identify it?',
            image: '🦠',
            visual: `
                <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 15px; margin: 2rem 0;">
                    <div style="background: #1a1a2e; padding: 2rem; border-radius: 10px; border: 2px solid rgba(255,0,0,0.5);">
                        <div style="text-align: center; margin-bottom: 2rem;">
                            <div style="font-size: 4rem; margin-bottom: 1rem;">🔒</div>
                            <h2 style="color: #ff0000; margin-bottom: 1rem;">YOUR FILES HAVE BEEN ENCRYPTED!</h2>
                            <p style="color: #ffffff; font-size: 1.2rem; margin-bottom: 1.5rem;">All your important files are now encrypted.</p>
                        </div>
                        <div style="background: rgba(255,0,0,0.2); padding: 1.5rem; border-radius: 10px; margin-bottom: 1.5rem;">
                            <p style="color: #ffcccc; margin-bottom: 1rem;"><strong>What happened?</strong></p>
                            <p style="color: #ffffff; line-height: 1.8;">
                                • All your documents, photos, and files are encrypted<br>
                                • You cannot access them without the decryption key<br>
                                • To get your files back, pay 0.5 Bitcoin (BTC)<br>
                                • Payment must be made within 72 hours
                            </p>
                        </div>
                        <div style="background: rgba(255,215,0,0.2); padding: 1rem; border-radius: 5px; border-left: 4px solid #ffd700;">
                            <p style="color: #ffd700; margin: 0; font-size: 0.9rem;">⚠️ System files modified | Network activity detected | CPU usage at 100%</p>
                        </div>
                    </div>
                </div>
            `,
            threats: [
                { id: 'ransomware-screen', text: 'Ransomware screen demanding payment', correct: true },
                { id: 'files-encrypted', text: 'Files are encrypted and inaccessible', correct: true },
                { id: 'bitcoin-demand', text: 'Demanding Bitcoin payment', correct: true },
                { id: 'system-modified', text: 'System files modified warning', correct: true },
                { id: 'high-cpu', text: 'High CPU usage (100%)', correct: true }
            ],
            explanation: 'This is RANSOMWARE! It encrypts your files and demands payment. Signs: encryption message, payment demand, system modifications, high CPU. NEVER pay the ransom - restore from backup instead!'
        },
        {
            id: 7,
            title: 'Malware Infection - Trojan Horse',
            description: 'You downloaded this "free" software. What malware signs can you spot?',
            image: '🐴',
            visual: `
                <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 15px; margin: 2rem 0;">
                    <div style="background: #1a1a2e; padding: 2rem; border-radius: 10px; border: 2px solid rgba(0,255,255,0.3);">
                        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                            <div style="font-size: 3rem;">📦</div>
                            <div>
                                <h3 style="color: #ffffff; margin-bottom: 0.25rem;">FreeGameInstaller.exe</h3>
                                <div style="color: #cccccc; font-size: 0.9rem;">2.5 MB • Downloaded from: freegames-download.net</div>
                            </div>
                        </div>
                        <div style="background: rgba(255,107,107,0.2); padding: 1rem; border-radius: 5px; border-left: 4px solid #ff6b6b; margin-bottom: 1rem;">
                            <p style="color: #ff6b6b; margin: 0; font-size: 0.9rem;">⚠️ Unknown publisher - Not verified by Windows</p>
                        </div>
                        <div style="background: rgba(255,215,0,0.2); padding: 1rem; border-radius: 5px; border-left: 4px solid #ffd700; margin-bottom: 1rem;">
                            <p style="color: #ffd700; margin: 0; font-size: 0.9rem;">⚠️ Antivirus scan: 3 threats detected</p>
                        </div>
                        <div style="background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 5px;">
                            <p style="color: #00ffff; margin: 0; font-size: 0.9rem;">📊 After installation: CPU usage increased, new processes running, network connections to unknown IPs</p>
                        </div>
                    </div>
                </div>
            `,
            threats: [
                { id: 'unknown-publisher', text: 'Unknown publisher - not verified', correct: true },
                { id: 'antivirus-threats', text: 'Antivirus detected 3 threats', correct: true },
                { id: 'suspicious-domain', text: 'Downloaded from suspicious domain', correct: true },
                { id: 'system-changes', text: 'System changes after installation (CPU, processes, network)', correct: true }
            ],
            explanation: 'This is a TROJAN HORSE! It disguises itself as legitimate software but contains malware. Signs: unknown publisher, antivirus warnings, suspicious source, system behavior changes. Always download from official sources!'
        },
        {
            id: 8,
            title: 'Malware Infection - Keylogger',
            description: 'Your computer is behaving strangely. What malware indicators do you see?',
            image: '⌨️',
            visual: `
                <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 15px; margin: 2rem 0;">
                    <div style="background: #1a1a2e; padding: 2rem; border-radius: 10px; border: 2px solid rgba(0,255,255,0.3);">
                        <h3 style="color: #ffffff; margin-bottom: 1.5rem;">System Activity Monitor</h3>
                        <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 5px; margin-bottom: 1rem;">
                            <div style="color: #00ffff; margin-bottom: 0.5rem;">🔍 Suspicious Process:</div>
                            <div style="color: #ffffff; font-family: monospace; font-size: 0.9rem;">
                                Process: keylogger.exe<br>
                                CPU: 2% | Memory: 15MB<br>
                                Network: Sending data to 192.168.1.100:8080
                            </div>
                        </div>
                        <div style="background: rgba(255,107,107,0.2); padding: 1rem; border-radius: 5px; border-left: 4px solid #ff6b6b; margin-bottom: 1rem;">
                            <p style="color: #ff6b6b; margin: 0; font-size: 0.9rem;">⚠️ Unusual network activity: Sending keystroke data</p>
                        </div>
                        <div style="background: rgba(255,215,0,0.2); padding: 1rem; border-radius: 5px; border-left: 4px solid #ffd700; margin-bottom: 1rem;">
                            <p style="color: #ffd700; margin: 0; font-size: 0.9rem;">⚠️ Keyboard input being logged and transmitted</p>
                        </div>
                        <div style="background: rgba(0,255,0,0.1); padding: 1rem; border-radius: 5px;">
                            <p style="color: #00ff00; margin: 0; font-size: 0.9rem;">💡 Mitigation: Disconnect from network, run antivirus scan, change all passwords</p>
                        </div>
                    </div>
                </div>
            `,
            threats: [
                { id: 'keylogger-process', text: 'Suspicious process: keylogger.exe', correct: true },
                { id: 'network-transmission', text: 'Sending data to unknown IP address', correct: true },
                { id: 'keystroke-logging', text: 'Keyboard input being logged', correct: true },
                { id: 'data-exfiltration', text: 'Keystroke data being transmitted', correct: true }
            ],
            explanation: 'This is a KEYLOGGER! It records everything you type (passwords, credit cards, messages) and sends it to attackers. Signs: suspicious process, network transmission, keystroke logging. Mitigation: Disconnect network, scan with antivirus, change all passwords immediately!'
        }
    ];

    let currentScenario = 0;
    let score = 0;
    let selectedThreats = [];

    function initSpotTheThreat() {
        currentScenario = 0;
        score = 0;
        selectedThreats = [];
        displayScenario();
    }

    function displayScenario() {
        const scenario = threatScenarios[currentScenario];
        const container = document.getElementById('spotTheThreatContainer');
        
        if (!container) return;
        
        container.innerHTML = `
            <div style="max-width: 900px; margin: 0 auto;">
                <div style="background: rgba(0,255,255,0.1); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem; text-align: center;">
                    <h3 style="color: #00ffff; margin-bottom: 0.5rem;">Scenario ${currentScenario + 1} of ${threatScenarios.length}</h3>
                    <div style="color: #ffffff; font-size: 1.1rem;">
                        Score: <strong style="color: #00ff00;">${score}</strong> threats spotted
                    </div>
                </div>
                
                <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(0,255,255,0.3); border-radius: 15px; padding: 2rem; margin-bottom: 2rem;">
                    <h2 style="color: #ffffff; font-size: 1.8rem; margin-bottom: 0.5rem; text-align: center;">
                        ${scenario.image} ${scenario.title}
                    </h2>
                    <p style="color: #cccccc; text-align: center; font-size: 1.1rem; margin-bottom: 2rem;">
                        ${scenario.description}
                    </p>
                    
                    ${scenario.visual}
                </div>
                
                <div style="background: rgba(0,255,255,0.1); padding: 2rem; border-radius: 15px; margin-bottom: 2rem;">
                    <h3 style="color: #00ffff; margin-bottom: 1.5rem; text-align: center;">Select ALL the threats you can spot:</h3>
                    <div style="display: grid; gap: 1rem;">
                        ${scenario.threats.map((threat, index) => `
                            <button onclick="toggleThreat(${index})" 
                                    id="threat${index}"
                                    style="padding: 1.25rem; background: rgba(0,255,255,0.1); border: 2px solid rgba(0,255,255,0.3); border-radius: 10px; color: #ffffff; font-size: 1rem; text-align: left; cursor: pointer; transition: all 0.3s ease;"
                                    onmouseover="this.style.background='rgba(0,255,255,0.2)'"
                                    onmouseout="if(!this.classList.contains('selected')) this.style.background='rgba(0,255,255,0.1)'">
                                <span style="margin-right: 1rem; font-size: 1.2rem;">☐</span>
                                ${threat.text}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div style="text-align: center;">
                    <button onclick="checkThreats()" 
                            style="padding: 1.25rem 3rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; font-size: 1.2rem; cursor: pointer; transition: all 0.3s ease;"
                            onmouseover="this.style.transform='translateY(-3px)'"
                            onmouseout="this.style.transform='translateY(0)'">
                        Check Answers
                    </button>
                </div>
            </div>
        `;
        
        selectedThreats = [];
    }

    window.toggleThreat = function(index) {
        const scenario = threatScenarios[currentScenario];
        const threat = scenario.threats[index];
        const button = document.getElementById(`threat${index}`);
        
        if (selectedThreats.includes(index)) {
            selectedThreats = selectedThreats.filter(i => i !== index);
            button.classList.remove('selected');
            button.style.background = 'rgba(0,255,255,0.1)';
            button.style.borderColor = 'rgba(0,255,255,0.3)';
            button.querySelector('span').textContent = '☐';
        } else {
            selectedThreats.push(index);
            button.classList.add('selected');
            button.style.background = 'rgba(0,255,255,0.3)';
            button.style.borderColor = '#00ffff';
            button.querySelector('span').textContent = '☑';
        }
    };

    window.checkThreats = function() {
        const scenario = threatScenarios[currentScenario];
        const correctThreats = scenario.threats.filter(t => t.correct).map((_, i) => scenario.threats.findIndex(t => t.correct && scenario.threats.indexOf(t) === i));
        const correctIndices = scenario.threats.map((t, i) => t.correct ? i : -1).filter(i => i !== -1);
        
        let correctCount = 0;
        let incorrectCount = 0;
        
        // Check selected threats
        selectedThreats.forEach(index => {
            if (scenario.threats[index].correct) {
                correctCount++;
            } else {
                incorrectCount++;
            }
        });
        
        // Check missed threats
        const missedThreats = correctIndices.filter(i => !selectedThreats.includes(i));
        
        // Update button styles
        scenario.threats.forEach((threat, index) => {
            const button = document.getElementById(`threat${index}`);
            if (button) {
                button.style.pointerEvents = 'none';
                if (threat.correct) {
                    button.style.background = 'rgba(0,255,0,0.3)';
                    button.style.borderColor = '#00ff00';
                    button.querySelector('span').textContent = '✅';
                } else if (selectedThreats.includes(index)) {
                    button.style.background = 'rgba(255,0,0,0.3)';
                    button.style.borderColor = '#ff0000';
                    button.querySelector('span').textContent = '❌';
                }
            }
        });
        
        score += correctCount;
        if (incorrectCount === 0 && missedThreats.length === 0) {
            addPoints(50);
        }
        
        setTimeout(() => {
            showThreatResults(correctCount, incorrectCount, missedThreats.length);
        }, 1500);
    };

    function showThreatResults(correctCount, incorrectCount, missedCount) {
        const scenario = threatScenarios[currentScenario];
        const isPerfect = incorrectCount === 0 && missedCount === 0;
        const container = document.getElementById('spotTheThreatContainer');
        
        container.innerHTML = `
            <div style="max-width: 900px; margin: 0 auto;">
                <div style="background: ${isPerfect ? 'rgba(0,255,0,0.2)' : 'rgba(255,215,0,0.2)'}; padding: 2rem; border-radius: 15px; border: 3px solid ${isPerfect ? '#00ff00' : '#ffd700'}; margin-bottom: 2rem; text-align: center;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">${isPerfect ? '🎯' : '👍'}</div>
                    <h2 style="color: ${isPerfect ? '#00ff00' : '#ffd700'}; margin-bottom: 1rem;">
                        ${isPerfect ? 'Perfect! All threats spotted!' : 'Good effort!'}
                    </h2>
                    <div style="color: #ffffff; font-size: 1.2rem; margin-bottom: 1.5rem;">
                        Correct: <strong style="color: #00ff00;">${correctCount}</strong> | 
                        Incorrect: <strong style="color: #ff0000;">${incorrectCount}</strong> | 
                        Missed: <strong style="color: #ffd700;">${missedCount}</strong>
                    </div>
                    
                    <div style="background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 10px; text-align: left; margin-top: 1.5rem;">
                        <h4 style="color: #00ffff; margin-bottom: 1rem;">💡 Explanation:</h4>
                        <p style="color: #ffffff; font-size: 1.1rem; line-height: 1.8;">
                            ${scenario.explanation}
                        </p>
                    </div>
                </div>
                
                <div style="text-align: center;">
                    <button onclick="nextThreatScenario()" 
                            style="padding: 1.25rem 3rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; font-size: 1.2rem; cursor: pointer; transition: all 0.3s ease;"
                            onmouseover="this.style.transform='translateY(-3px)'"
                            onmouseout="this.style.transform='translateY(0)'">
                        ${currentScenario < threatScenarios.length - 1 ? 'Next Scenario <i class="fas fa-arrow-right"></i>' : 'View Results'}
                    </button>
                </div>
            </div>
        `;
    }

    window.nextThreatScenario = function() {
        currentScenario++;
        if (currentScenario < threatScenarios.length) {
            displayScenario();
        } else {
            showThreatResults();
        }
    };

    function showThreatResults() {
        const percentage = Math.round((score / threatScenarios.reduce((sum, s) => sum + s.threats.filter(t => t.correct).length, 0)) * 100);
        const container = document.getElementById('spotTheThreatContainer');
        
        let message = '';
        let emoji = '';
        if (percentage >= 90) {
            message = 'Outstanding! You have excellent threat detection skills!';
            emoji = '🏆';
        } else if (percentage >= 70) {
            message = 'Great job! You\'re good at spotting threats!';
            emoji = '⭐';
        } else {
            message = 'Keep practicing! Review the explanations to improve.';
            emoji = '📚';
        }
        
        container.innerHTML = `
            <div style="max-width: 900px; margin: 0 auto; text-align: center;">
                <div style="background: linear-gradient(135deg, rgba(0,255,255,0.2), rgba(0,128,255,0.2)); padding: 3rem; border-radius: 20px; border: 3px solid rgba(0,255,255,0.5); margin-bottom: 2rem;">
                    <div style="font-size: 5rem; margin-bottom: 1rem;">${emoji}</div>
                    <h2 style="color: #00ffff; font-size: 2.5rem; margin-bottom: 1rem;">Game Complete!</h2>
                    <div style="font-size: 4rem; color: #00ff00; margin: 1.5rem 0; font-weight: bold;">
                        ${score} Threats Spotted
                    </div>
                    <div style="font-size: 2rem; color: #ffffff; margin-bottom: 1.5rem;">
                        ${percentage}% Accuracy
                    </div>
                    <p style="color: #ffffff; font-size: 1.3rem; line-height: 1.6;">
                        ${message}
                    </p>
                </div>
                
                <button onclick="initSpotTheThreat()" 
                        style="padding: 1.25rem 3rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; font-size: 1.2rem; cursor: pointer; transition: all 0.3s ease;"
                        onmouseover="this.style.transform='translateY(-3px)'"
                        onmouseout="this.style.transform='translateY(0)'">
                    <i class="fas fa-redo"></i> Play Again
                </button>
            </div>
        `;
        
        addPoints(score * 25);
        if (percentage >= 90) {
            addAchievement('threat-detector', 'Threat Detection Expert', 'Excellent score in Spot the Threat!');
        }
    }

    // Register the game
    window.CyberArcadeGames = window.CyberArcadeGames || {};
    window.CyberArcadeGames['spot-the-threat'] = {
        title: 'Spot the Threat',
        content: `
            <div id="spotTheThreatContainer">
                <div style="text-align: center; padding: 2rem;">
                    <div class="spinner"></div>
                    <p style="color: #cccccc; margin-top: 1rem;">Loading game...</p>
                </div>
            </div>
        `,
        init: initSpotTheThreat
    };
})();

