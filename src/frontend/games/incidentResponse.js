(function() {
    window.CyberArcadeGames = window.CyberArcadeGames || {};

// Initialize Incident Response game
function initIncidentResponseGame() {
    let currentScenario = 0;
    let score = 0;
    let timeElapsed = 0;
    let timerInterval = null;
    
    const scenarios = [
        {
            id: 'ransomware',
            title: '🚨 RANSOMWARE ATTACK',
            severity: 'CRITICAL',
            time: '14:32',
            story: {
                kids: "💻 A hacker locked all the school's computers! They want money to unlock them. What do we do?",
                pro: "Ransomware detected on multiple endpoints. Encryption in progress. Immediate containment required."
            },
            description: 'Multiple systems encrypted by ransomware. Critical data at risk.',
            timeline: [
                {time: '14:30', event: 'Ransomware detected on workstation-05', status: 'completed'},
                {time: '14:31', event: 'Encryption spreading to network shares', status: 'pending'},
                {time: '14:32', event: 'Ransom note displayed on 12 systems', status: 'pending'}
            ],
            actions: [
                {
                    id: 'isolate',
                    title: '🔌 Isolate Infected Systems',
                    description: 'Disconnect affected computers from the network immediately',
                    correct: true,
                    explanation: {
                        kids: "✅ Great choice! We cut the internet so the virus can't spread to other computers!",
                        pro: "Correct. Network isolation prevents lateral movement and stops encryption propagation."
                    },
                    points: 100
                },
                {
                    id: 'pay',
                    title: '💰 Pay the Ransom',
                    description: 'Pay the attackers to get the decryption key',
                    correct: false,
                    explanation: {
                        kids: "❌ Bad idea! We should never pay hackers! They might not even unlock the computers!",
                        pro: "Incorrect. Paying ransoms funds criminal activity and doesn't guarantee data recovery. Never pay."
                    },
                    points: -50
                },
                {
                    id: 'backup',
                    title: '💾 Restore from Backup',
                    description: 'Restore systems from the latest clean backup',
                    correct: true,
                    explanation: {
                        kids: "✅ Perfect! We have a copy of everything saved! We can restore it without paying!",
                        pro: "Correct. Restoring from clean backups is the proper recovery method. Verify backup integrity first."
                    },
                    points: 100
                },
                {
                    id: 'ignore',
                    title: '⏸️ Wait and See',
                    description: 'Monitor the situation before taking action',
                    correct: false,
                    explanation: {
                        kids: "❌ Too slow! The virus is spreading! We need to act fast!",
                        pro: "Incorrect. Delayed response allows further encryption and data loss. Immediate action required."
                    },
                    points: -50
                }
            ],
            requiredActions: 2
        },
        {
            id: 'data-breach',
            title: '🔓 DATA BREACH DETECTED',
            severity: 'HIGH',
            time: '10:15',
            story: {
                kids: "🕵️ Someone stole customer information from the company! We need to protect everyone's data!",
                pro: "Unauthorized database access detected. Customer PII potentially exfiltrated. Breach notification required."
            },
            description: 'Suspicious database queries from unknown IP. Customer data may be compromised.',
            timeline: [
                {time: '10:10', event: 'Unusual database activity detected', status: 'completed'},
                {time: '10:12', event: 'Large data export initiated', status: 'pending'},
                {time: '10:15', event: 'Connection from unknown IP address', status: 'pending'}
            ],
            actions: [
                {
                    id: 'revoke',
                    title: '🚫 Revoke Database Access',
                    description: 'Immediately block the suspicious connection',
                    correct: true,
                    explanation: {
                        kids: "✅ Good! We stopped the thief from taking more information!",
                        pro: "Correct. Immediate access revocation limits data exposure and prevents further exfiltration."
                    },
                    points: 100
                },
                {
                    id: 'notify',
                    title: '📢 Notify Affected Users',
                    description: 'Alert customers about the potential breach',
                    correct: true,
                    explanation: {
                        kids: "✅ Right! People need to know so they can protect themselves!",
                        pro: "Correct. Timely notification is legally required and helps users take protective measures."
                    },
                    points: 100
                },
                {
                    id: 'hide',
                    title: '🤐 Keep It Secret',
                    description: 'Don\'t tell anyone to avoid panic',
                    correct: false,
                    explanation: {
                        kids: "❌ No! People have a right to know if their information was stolen!",
                        pro: "Incorrect. Hiding breaches violates regulations (GDPR, CCPA) and damages trust. Transparency is required."
                    },
                    points: -75
                },
                {
                    id: 'change-passwords',
                    title: '🔐 Force Password Reset',
                    description: 'Require all users to change their passwords',
                    correct: true,
                    explanation: {
                        kids: "✅ Smart! New passwords mean the stolen ones won't work anymore!",
                        pro: "Correct. Password resets prevent credential reuse attacks using stolen credentials."
                    },
                    points: 100
                }
            ],
            requiredActions: 3
        },
        {
            id: 'phishing',
            title: '📧 PHISHING CAMPAIGN',
            severity: 'MEDIUM',
            time: '08:45',
            story: {
                kids: "📬 Fake emails are tricking people into clicking bad links! We need to stop them!",
                pro: "Phishing campaign targeting employees. Multiple users reported suspicious emails. Credential harvesting attempt."
            },
            description: 'Widespread phishing emails detected. Several employees may have clicked malicious links.',
            timeline: [
                {time: '08:40', event: 'First phishing email reported', status: 'completed'},
                {time: '08:42', event: '5 employees clicked suspicious links', status: 'pending'},
                {time: '08:45', event: 'Malicious domain still active', status: 'pending'}
            ],
            actions: [
                {
                    id: 'block-domain',
                    title: '🚧 Block Malicious Domain',
                    description: 'Add the phishing domain to firewall blocklist',
                    correct: true,
                    explanation: {
                        kids: "✅ Perfect! Now no one can visit that bad website!",
                        pro: "Correct. Domain blocking prevents further access and stops additional credential theft."
                    },
                    points: 100
                },
                {
                    id: 'educate',
                    title: '📚 Send Security Alert',
                    description: 'Educate employees about the phishing attempt',
                    correct: true,
                    explanation: {
                        kids: "✅ Great! Teaching people helps them avoid future tricks!",
                        pro: "Correct. User education is crucial for preventing future phishing incidents."
                    },
                    points: 100
                },
                {
                    id: 'ignore',
                    title: '😴 Ignore It',
                    description: 'It\'s just spam, nothing serious',
                    correct: false,
                    explanation: {
                        kids: "❌ Wrong! Phishing can steal passwords and break into accounts!",
                        pro: "Incorrect. Phishing is a serious threat that can lead to account compromise and data breaches."
                    },
                    points: -50
                },
                {
                    id: 'reset-credentials',
                    title: '🔑 Reset Affected Credentials',
                    description: 'Change passwords for users who clicked links',
                    correct: true,
                    explanation: {
                        kids: "✅ Smart! If passwords were stolen, new ones protect the accounts!",
                        pro: "Correct. Credential reset prevents attackers from using potentially stolen passwords."
                    },
                    points: 100
                }
            ],
            requiredActions: 3
        }
    ];
    
    function startScenario(scenarioIndex) {
        currentScenario = scenarioIndex;
        const scenario = scenarios[scenarioIndex];
        score = 0;
        timeElapsed = 0;
        
        const container = document.querySelector('.incident-response');
        if (!container) return;
        
        container.innerHTML = `
            <div class="ir-header" style="background: linear-gradient(135deg, #ff0000 0%, #8b0000 100%); padding: 2rem; border-radius: 15px; margin-bottom: 2rem; animation: pulse 2s infinite;">
                <div class="ir-title" style="font-size: 2rem; color: #ffffff; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">${scenario.title}</div>
                <div class="ir-subtitle" style="color: #ffcccc; margin-top: 0.5rem;">Time: ${scenario.time} | Severity: <span style="color: #ff0000; font-weight: bold;">${scenario.severity}</span></div>
            </div>
            
            <div class="ir-alert" style="background: rgba(255,0,0,0.1); padding: 2rem; border-radius: 15px; border: 2px solid #ff0000; margin-bottom: 2rem;">
                <div class="alert-title" style="font-size: 1.5rem; color: #ff0000; margin-bottom: 1rem;">🚨 INCIDENT DETECTED</div>
                <div style="background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 5px; margin-bottom: 1rem; border-left: 3px solid #00ffff;">
                    <div style="color: #ffd700; font-weight: bold; margin-bottom: 0.5rem;">👶 For Kids:</div>
                    <div style="color: #ffffff; margin-bottom: 1rem;">${scenario.story.kids}</div>
                    <div style="color: #ffd700; font-weight: bold; margin-bottom: 0.5rem;">👔 For Professionals:</div>
                    <div style="color: #ffffff;">${scenario.story.pro}</div>
                </div>
                <div class="alert-description" style="color: #ffffff; font-size: 1.1rem; line-height: 1.6;">${scenario.description}</div>
            </div>
            
            <div class="ir-timeline" style="background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem;">
                <div class="timeline-title" style="color: #00ffff; font-size: 1.3rem; margin-bottom: 1rem; font-weight: bold;">⏱️ Incident Timeline</div>
                ${scenario.timeline.map(item => `
                    <div class="timeline-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; margin: 0.5rem 0; background: ${item.status === 'completed' ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)'}; border-radius: 5px; border-left: 3px solid ${item.status === 'completed' ? '#00ff00' : '#ff0000'};">
                        <div style="color: #00ffff; font-weight: bold; min-width: 60px;">${item.time}</div>
                        <div style="color: #ffffff; flex: 1; margin: 0 1rem;">${item.event}</div>
                        <div class="timeline-status ${item.status}" style="color: ${item.status === 'completed' ? '#00ff00' : '#ff0000'}; font-weight: bold;">${item.status.toUpperCase()}</div>
                    </div>
                `).join('')}
            </div>
            
            <div style="background: rgba(255,215,0,0.1); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem; border: 2px solid #ffd700;">
                <div style="color: #ffd700; font-size: 1.2rem; font-weight: bold; margin-bottom: 1rem;">🎯 Your Mission:</div>
                <div style="color: #ffffff; line-height: 1.8;">
                    Choose the <strong style="color: #00ff00;">correct actions</strong> to handle this incident!<br>
                    You need to select <strong style="color: #00ffff;">${scenario.requiredActions} correct actions</strong> to succeed.<br>
                    <span style="color: #ffd700;">⚠️ Wrong choices will cost you points!</span>
                </div>
            </div>
            
            <div class="ir-actions" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                ${scenario.actions.map((action, index) => `
                    <div class="ir-action" onclick="executeIRAction(${scenarioIndex}, ${index})" style="background: rgba(0,255,255,0.1); padding: 1.5rem; border-radius: 10px; border: 2px solid rgba(0,255,255,0.3); cursor: pointer; transition: all 0.3s; position: relative;">
                        <div class="ir-action-title" style="color: #00ffff; font-size: 1.2rem; font-weight: bold; margin-bottom: 0.75rem;">${action.title}</div>
                        <div class="ir-action-description" style="color: #cccccc; line-height: 1.6;">${action.description}</div>
                        <div class="ir-action-feedback" style="display: none; margin-top: 1rem; padding: 1rem; border-radius: 5px;"></div>
                    </div>
                `).join('')}
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 10px;">
                <div style="color: #00ffff;">
                    <strong>Score:</strong> <span id="irScore" style="color: #00ff00; font-size: 1.3rem; font-weight: bold;">${score}</span>
                </div>
                <div style="color: #00ffff;">
                    <strong>Time:</strong> <span id="irTime" style="color: #ffd700; font-size: 1.3rem; font-weight: bold;">${timeElapsed}s</span>
                </div>
                <button onclick="nextIRScenario()" class="btn btn-secondary" style="display: none;" id="nextScenarioBtn">Next Scenario →</button>
            </div>
            
            <button class="btn btn-secondary back-to-games-btn" onclick="closeGame()" style="margin-top: 2rem;">Back to Games</button>
        `;
        
        // Start timer
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeElapsed++;
            const timeEl = document.getElementById('irTime');
            if (timeEl) timeEl.textContent = timeElapsed + 's';
        }, 1000);
    }
    
    window.executeIRAction = function(scenarioIndex, actionIndex) {
        const scenario = scenarios[scenarioIndex];
        const action = scenario.actions[actionIndex];
        const actionElement = document.querySelectorAll('.ir-action')[actionIndex];
        const feedbackEl = actionElement.querySelector('.ir-action-feedback');
        
        if (actionElement.classList.contains('selected')) return;
        
        actionElement.classList.add('selected');
        score += action.points;
        
        // Update score display
        const scoreEl = document.getElementById('irScore');
        if (scoreEl) scoreEl.textContent = score;
        
        // Show feedback
        feedbackEl.style.display = 'block';
        feedbackEl.style.background = action.correct ? 'rgba(0,255,0,0.2)' : 'rgba(255,0,0,0.2)';
        feedbackEl.style.border = `2px solid ${action.correct ? '#00ff00' : '#ff0000'}`;
        feedbackEl.innerHTML = `
            <div style="color: ${action.correct ? '#00ff00' : '#ff0000'}; font-weight: bold; margin-bottom: 0.5rem;">
                ${action.correct ? '✅ CORRECT!' : '❌ WRONG!'}
            </div>
            <div style="background: rgba(255,215,0,0.1); padding: 0.75rem; border-radius: 5px; margin-top: 0.5rem; border-left: 3px solid #ffd700;">
                <div style="color: #ffd700; font-size: 0.9rem; margin-bottom: 0.25rem;">👶 Kids:</div>
                <div style="color: #ffffff; font-size: 0.9rem; margin-bottom: 0.5rem;">${action.explanation.kids}</div>
                <div style="color: #ffd700; font-size: 0.9rem; margin-bottom: 0.25rem;">👔 Pros:</div>
                <div style="color: #ffffff; font-size: 0.9rem;">${action.explanation.pro}</div>
            </div>
            <div style="color: ${action.points > 0 ? '#00ff00' : '#ff0000'}; margin-top: 0.5rem; font-weight: bold;">
                ${action.points > 0 ? '+' : ''}${action.points} points
            </div>
        `;
        
        // Disable all actions after selection
        setTimeout(() => {
            document.querySelectorAll('.ir-action').forEach(el => {
                el.style.pointerEvents = 'none';
                el.style.opacity = '0.7';
            });
            
            // Check if mission complete
            const correctActions = document.querySelectorAll('.ir-action.selected').length;
            const required = scenario.requiredActions;
            
            setTimeout(() => {
                if (score >= required * 100) {
                    alert(`🎉 Mission Complete! You scored ${score} points! Great job handling this incident!`);
                    addPoints(score);
                    addAchievement('incident_responder', 'Incident Responder', 'Successfully handled a cybersecurity incident!');
                } else {
                    alert(`⚠️ You need to select more correct actions! Score: ${score} points. Try again!`);
                }
                
                const nextBtn = document.getElementById('nextScenarioBtn');
                if (nextBtn) nextBtn.style.display = 'block';
            }, 2000);
        }, 500);
        
        addPoints(action.points);
    };
    
    window.nextIRScenario = function() {
        if (currentScenario < scenarios.length - 1) {
            startScenario(currentScenario + 1);
        } else {
            alert('🎊 All scenarios complete! You\'re a cybersecurity hero!');
            startScenario(0); // Restart
        }
    };
    
    // Start first scenario
    startScenario(0);
}

    window.CyberArcadeGames['incident-response'] = {
                title: 'Incident Response Simulator',
                content: `
                    <div class="incident-response">
                        <div style="text-align: center; padding: 2rem; color: #00ffff;">
                            <div style="font-size: 1.5rem; margin-bottom: 1rem;">🚨 Loading Incident Response Simulator...</div>
                            <div style="color: #cccccc;">Preparing scenarios...</div>
                        </div>
                    </div>
                `,
                init: initIncidentResponseGame
            };
})();
