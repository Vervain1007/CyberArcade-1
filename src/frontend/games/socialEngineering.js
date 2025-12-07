// Social Engineering Simulator with Visual Board/Scenario Interface
(function() {
    window.CyberArcadeGames = window.CyberArcadeGames || {};

// Initialize Social Engineering game
function initSocialEngineeringGame() {
    const scenarios = [
        {
            id: 1,
            title: "Phishing Email Attack",
            type: "phishing",
            visual: `
                <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(0,255,255,0.3); border-radius: 15px; padding: 2rem; margin: 2rem 0;">
                    <div style="background: #1a1a2e; padding: 2rem; border-radius: 10px; border: 2px solid rgba(0,255,255,0.3);">
                        <div style="border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 1rem; margin-bottom: 1rem;">
                            <div style="margin-bottom: 0.5rem;">
                                <strong style="color: #00ffff;">From:</strong> 
                                <span style="color: #ff6b6b;">security@bank-verification.com</span>
                                <span style="color: #ffd700; margin-left: 1rem; font-size: 0.9rem;">⚠️ Suspicious Domain</span>
                            </div>
                            <div style="margin-bottom: 0.5rem;">
                                <strong style="color: #00ffff;">Subject:</strong> 
                                <span style="color: #ff6b6b;">URGENT: Your account will be suspended!</span>
                            </div>
                            <div style="color: #cccccc; font-size: 0.9rem;">Date: ${new Date().toLocaleDateString()} 10:30 AM</div>
                        </div>
                        <div style="background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 10px; white-space: pre-wrap; font-family: 'Courier New', monospace; color: #ffffff; line-height: 1.8; min-height: 200px;">
Dear Customer,

We detected suspicious activity on your account. 
Please verify your identity by clicking the link below 
or your account will be suspended within 24 hours.

<a href="http://fake-bank-verification.com" style="color: #ff6b6b; text-decoration: underline;">Verify Now</a>

Thank you,
Your Bank Security Team
                        </div>
                        <div style="background: rgba(255,0,0,0.2); padding: 1rem; border-radius: 5px; border-left: 4px solid #ff0000; margin-top: 1rem;">
                            <p style="color: #ffcccc; margin: 0; font-size: 0.9rem;">🚩 Red Flags: Suspicious domain, urgent language, HTTP link (not secure)</p>
                        </div>
                    </div>
                </div>
            `,
            description: "You receive this email claiming to be from your bank. What should you do?",
            options: [
                { text: "Click the link to verify your account", correct: false, reason: "Never click links in suspicious emails!" },
                { text: "Delete the email and contact the bank directly", correct: true, reason: "Always verify through official channels." },
                { text: "Forward the email to your IT department", correct: false, reason: "Good idea, but first delete it and contact bank directly." },
                { text: "Reply with your account information", correct: false, reason: "Never share account information via email!" }
            ],
            explanation: "This is a phishing email! Red flags: suspicious domain (bank-verification.com), urgent threat, HTTP link (not secure), and requests for personal info. Always contact the bank directly through their official website or phone number."
        },
        {
            id: 2,
            title: "Tailgating Attack",
            type: "tailgating",
            visual: `
                <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(0,255,255,0.3); border-radius: 15px; padding: 2rem; margin: 2rem 0;">
                    <div style="background: #1a1a2e; padding: 2rem; border-radius: 10px; border: 2px solid rgba(0,255,255,0.3);">
                        <div style="text-align: center; margin-bottom: 2rem;">
                            <div style="font-size: 4rem; margin-bottom: 1rem;">🏢</div>
                            <h3 style="color: #ffffff; margin-bottom: 0.5rem;">Office Building Entrance</h3>
                            <div style="color: #cccccc; font-size: 0.9rem;">Security Door - Access Card Required</div>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                            <div style="background: rgba(0,255,255,0.1); padding: 1.5rem; border-radius: 10px; text-align: center;">
                                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">👤</div>
                                <div style="color: #00ffff; font-weight: bold;">You</div>
                                <div style="color: #ffffff; font-size: 0.9rem; margin-top: 0.5rem;">✅ Access Card</div>
                            </div>
                            <div style="background: rgba(255,107,107,0.1); padding: 1.5rem; border-radius: 10px; text-align: center;">
                                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">👨</div>
                                <div style="color: #ff6b6b; font-weight: bold;">Stranger</div>
                                <div style="color: #ffffff; font-size: 0.9rem; margin-top: 0.5rem;">❌ No Access Card</div>
                            </div>
                        </div>
                        <div style="background: rgba(255,215,0,0.2); padding: 1.5rem; border-radius: 10px; border-left: 4px solid #ffd700;">
                            <p style="color: #ffd700; margin: 0; font-size: 1rem; line-height: 1.6;">
                                <strong>💬 Stranger says:</strong> "Hey! I forgot my access card. Can you hold the door for me? I work on the 5th floor."
                            </p>
                        </div>
                        <div style="background: rgba(255,0,0,0.2); padding: 1rem; border-radius: 5px; border-left: 4px solid #ff0000; margin-top: 1rem;">
                            <p style="color: #ffcccc; margin: 0; font-size: 0.9rem;">🚩 Red Flag: Unknown person asking for unauthorized access</p>
                        </div>
                    </div>
                </div>
            `,
            description: "Someone you don't recognize asks you to hold the door open because they forgot their access card. What do you do?",
            options: [
                { text: "Hold the door open for them", correct: false, reason: "Never allow unauthorized access!" },
                { text: "Ignore them and walk away", correct: false, reason: "You should report this to security." },
                { text: "Ask them to wait while you inform security", correct: true, reason: "Always verify identity through security." },
                { text: "Let them in because they look familiar", correct: false, reason: "Appearances can be deceiving - always verify!" }
            ],
            explanation: "This is tailgating - a physical social engineering attack! Never allow entry without proper verification. Always report unfamiliar individuals to security. Tailgating is how attackers gain physical access to secure areas."
        },
        {
            id: 3,
            title: "Baiting Attack",
            type: "baiting",
            visual: `
                <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(0,255,255,0.3); border-radius: 15px; padding: 2rem; margin: 2rem 0;">
                    <div style="background: #1a1a2e; padding: 2rem; border-radius: 10px; border: 2px solid rgba(0,255,255,0.3);">
                        <div style="text-align: center; margin-bottom: 2rem;">
                            <div style="font-size: 4rem; margin-bottom: 1rem;">🅿️</div>
                            <h3 style="color: #ffffff; margin-bottom: 0.5rem;">Office Parking Lot</h3>
                            <div style="color: #cccccc; font-size: 0.9rem;">You notice something on the ground...</div>
                        </div>
                        <div style="background: rgba(255,215,0,0.2); padding: 2rem; border-radius: 10px; text-align: center; margin-bottom: 1.5rem;">
                            <div style="font-size: 5rem; margin-bottom: 1rem;">💾</div>
                            <div style="color: #ffd700; font-weight: bold; font-size: 1.3rem; margin-bottom: 0.5rem;">USB Drive Found</div>
                            <div style="color: #ffffff; font-size: 1.1rem;">Label: "Confidential Salaries 2025"</div>
                            <div style="color: #cccccc; font-size: 0.9rem; margin-top: 0.5rem;">Size: 2.5 GB • Unknown Brand</div>
                        </div>
                        <div style="background: rgba(255,107,107,0.2); padding: 1rem; border-radius: 5px; border-left: 4px solid #ff6b6b; margin-bottom: 1rem;">
                            <p style="color: #ff6b6b; margin: 0; font-size: 0.9rem;">⚠️ Warning: Plugging unknown USB devices can infect your computer with malware!</p>
                        </div>
                        <div style="background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 5px;">
                            <p style="color: #00ffff; margin: 0; font-size: 0.9rem;">💡 Baiting relies on curiosity - attackers leave infected devices hoping someone will plug them in</p>
                        </div>
                    </div>
                </div>
            `,
            description: "You find a USB drive labeled 'Confidential Salaries 2025' in the office parking lot. What do you do?",
            options: [
                { text: "Plug it into your computer to see what's inside", correct: false, reason: "This could infect your computer with malware!" },
                { text: "Keep it for later use", correct: false, reason: "Never use unknown USB devices." },
                { text: "Throw it in the trash", correct: false, reason: "You should report it to security/IT." },
                { text: "Give it to your IT or security team", correct: true, reason: "Always hand unknown devices to security professionals." }
            ],
            explanation: "This is baiting - attackers leave infected USB drives hoping curiosity will make someone plug them in. The USB could contain malware, ransomware, or keyloggers. Always hand unknown devices to IT/security - never plug them into your computer!"
        },
        {
            id: 4,
            title: "Vishing (Voice Phishing) Attack",
            type: "vishing",
            visual: `
                <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(0,255,255,0.3); border-radius: 15px; padding: 2rem; margin: 2rem 0;">
                    <div style="background: #1a1a2e; padding: 2rem; border-radius: 10px; border: 2px solid rgba(0,255,255,0.3);">
                        <div style="text-align: center; margin-bottom: 2rem;">
                            <div style="font-size: 4rem; margin-bottom: 1rem;">📞</div>
                            <h3 style="color: #ffffff; margin-bottom: 0.5rem;">Incoming Call</h3>
                            <div style="color: #cccccc; font-size: 0.9rem;">Unknown Number: +1-555-0199</div>
                        </div>
                        <div style="background: rgba(255,215,0,0.2); padding: 1.5rem; border-radius: 10px; margin-bottom: 1.5rem;">
                            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                                <div style="font-size: 2.5rem;">👤</div>
                                <div>
                                    <div style="color: #ffd700; font-weight: bold; font-size: 1.1rem;">Caller: "Tech Support"</div>
                                    <div style="color: #cccccc; font-size: 0.9rem;">Claiming to be from Microsoft</div>
                                </div>
                            </div>
                            <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 5px; margin-top: 1rem;">
                                <p style="color: #ffffff; margin: 0; line-height: 1.8; font-size: 1rem;">
                                    <strong>💬 Caller says:</strong><br>
                                    "Hello, this is Microsoft Tech Support. We detected a virus on your computer. To fix it, I need your password. Can you provide it?"
                                </p>
                            </div>
                        </div>
                        <div style="background: rgba(255,0,0,0.2); padding: 1rem; border-radius: 5px; border-left: 4px solid #ff0000; margin-bottom: 1rem;">
                            <p style="color: #ffcccc; margin: 0; font-size: 0.9rem;">🚩 Red Flags: Unknown number, asking for password, creating urgency</p>
                        </div>
                        <div style="background: rgba(0,255,0,0.1); padding: 1rem; border-radius: 5px;">
                            <p style="color: #00ff00; margin: 0; font-size: 0.9rem;">✅ Legitimate companies NEVER ask for passwords over the phone!</p>
                        </div>
                    </div>
                </div>
            `,
            description: "You receive a call from someone claiming to be 'Tech Support' asking for your password to fix a computer issue. What do you do?",
            options: [
                { text: "Give them the password so they can help", correct: false, reason: "Never share passwords with anyone!" },
                { text: "Hang up and contact official IT support", correct: true, reason: "Always verify through official channels." },
                { text: "Ask for their ID over the phone", correct: false, reason: "IDs can be faked - hang up and verify independently." },
                { text: "Ignore the call", correct: false, reason: "You should report this to IT/security." }
            ],
            explanation: "This is vishing (voice phishing)! Legitimate tech support NEVER asks for passwords over the phone. Red flags: unknown number, asking for sensitive info, creating urgency. Always hang up and contact the company directly through their official website or phone number."
        },
        {
            id: 5,
            title: "Pretexting Attack",
            type: "pretexting",
            visual: `
                <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(0,255,255,0.3); border-radius: 15px; padding: 2rem; margin: 2rem 0;">
                    <div style="background: #1a1a2e; padding: 2rem; border-radius: 10px; border: 2px solid rgba(0,255,255,0.3);">
                        <div style="text-align: center; margin-bottom: 2rem;">
                            <div style="font-size: 4rem; margin-bottom: 1rem;">📧</div>
                            <h3 style="color: #ffffff; margin-bottom: 0.5rem;">Email from "HR Department"</h3>
                            <div style="color: #cccccc; font-size: 0.9rem;">From: hr@yourcompany.com</div>
                        </div>
                        <div style="background: rgba(255,215,0,0.2); padding: 1.5rem; border-radius: 10px; margin-bottom: 1.5rem;">
                            <div style="color: #ffd700; font-weight: bold; margin-bottom: 1rem;">Subject: URGENT: Employee Verification Required</div>
                            <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 5px; color: #ffffff; line-height: 1.8;">
                                <p style="margin: 0 0 1rem 0;">Hi [Your Name],</p>
                                <p style="margin: 0 0 1rem 0;">We're updating our employee records. Please confirm your:</p>
                                <ul style="margin: 0; padding-left: 1.5rem;">
                                    <li>Social Security Number</li>
                                    <li>Date of Birth</li>
                                    <li>Home Address</li>
                                    <li>Bank Account Number (for payroll)</li>
                                </ul>
                                <p style="margin: 1rem 0 0 0;">Reply to this email with the information.</p>
                            </div>
                        </div>
                        <div style="background: rgba(255,0,0,0.2); padding: 1rem; border-radius: 5px; border-left: 4px solid #ff0000;">
                            <p style="color: #ffcccc; margin: 0; font-size: 0.9rem;">🚩 Red Flags: Asking for sensitive personal information via email, creating urgency</p>
                        </div>
                    </div>
                </div>
            `,
            description: "You receive an email from 'HR' asking for your Social Security Number, date of birth, and bank account details for 'employee verification'. What do you do?",
            options: [
                { text: "Reply with the requested information", correct: false, reason: "Never share sensitive info via email!" },
                { text: "Contact HR directly to verify the request", correct: true, reason: "Always verify through official channels." },
                { text: "Forward it to your manager", correct: false, reason: "Good idea, but first verify with HR directly." },
                { text: "Ignore it", correct: false, reason: "You should report suspicious emails to IT/security." }
            ],
            explanation: "This is pretexting - creating a false scenario to extract information! Legitimate HR departments don't ask for sensitive information via email. Always verify such requests by contacting HR directly through official channels. Never share SSN, bank details, or personal info via email!"
        }
    ];

    let currentScenario = 0;
    let score = 0;
    let totalScenarios = scenarios.length;

    function displayScenario() {
        const scenario = scenarios[currentScenario];
        const container = document.getElementById('seScenarioContainer');
        
        if (!container) return;
        
        container.innerHTML = `
            <div style="max-width: 900px; margin: 0 auto;">
                <div style="background: rgba(0,255,255,0.1); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem; text-align: center;">
                    <h3 style="color: #00ffff; margin-bottom: 0.5rem;">Scenario ${currentScenario + 1} of ${totalScenarios}</h3>
                    <div style="color: #ffffff; font-size: 1.1rem;">
                        Score: <strong style="color: #00ff00;">${score}</strong> / ${currentScenario * 100}
                    </div>
                </div>
                
                <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(0,255,255,0.3); border-radius: 15px; padding: 2rem; margin-bottom: 2rem;">
                    <h2 style="color: #ffffff; font-size: 1.8rem; margin-bottom: 1rem; text-align: center;">
                        ${scenario.visual.includes('📧') ? '📧' : scenario.visual.includes('🏢') ? '🏢' : scenario.visual.includes('💾') ? '💾' : scenario.visual.includes('📞') ? '📞' : '🎭'} ${scenario.title}
                    </h2>
                    <p style="color: #cccccc; text-align: center; font-size: 1.1rem; margin-bottom: 2rem;">
                        ${scenario.description}
                    </p>
                    
                    ${scenario.visual}
                </div>
                
                <div style="background: rgba(0,255,255,0.1); padding: 2rem; border-radius: 15px; margin-bottom: 2rem;">
                    <h3 style="color: #00ffff; margin-bottom: 1.5rem; text-align: center;">What would you do?</h3>
                    <div style="display: grid; gap: 1rem;">
                        ${scenario.options.map((option, index) => `
                            <button onclick="selectSEOption(${index})" 
                                    id="seOption${index}"
                                    style="padding: 1.25rem; background: rgba(0,255,255,0.1); border: 2px solid rgba(0,255,255,0.3); border-radius: 10px; color: #ffffff; font-size: 1rem; text-align: left; cursor: pointer; transition: all 0.3s ease;"
                                    onmouseover="this.style.background='rgba(0,255,255,0.2)'; this.style.borderColor='#00ffff'; this.style.transform='translateX(10px)'"
                                    onmouseout="if(!this.classList.contains('selected')) this.style.background='rgba(0,255,255,0.1)'; this.style.borderColor='rgba(0,255,255,0.3)'; this.style.transform='translateX(0)'">
                                <span style="margin-right: 1rem; color: #00ffff; font-weight: bold;">${String.fromCharCode(65 + index)}.</span>
                                ${option.text}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    window.selectSEOption = function(optionIndex) {
        const scenario = scenarios[currentScenario];
        const option = scenario.options[optionIndex];
        const isCorrect = option.correct;
        
        // Disable all buttons
        for (let i = 0; i < scenario.options.length; i++) {
            const btn = document.getElementById(`seOption${i}`);
            if (btn) {
                btn.style.pointerEvents = 'none';
                if (i === optionIndex) {
                    if (isCorrect) {
                        btn.style.background = 'rgba(0,255,0,0.3)';
                        btn.style.borderColor = '#00ff00';
                    } else {
                        btn.style.background = 'rgba(255,0,0,0.3)';
                        btn.style.borderColor = '#ff0000';
                    }
                }
            }
        }
        
        if (isCorrect) {
            score += 100;
            addPoints(100);
        }
        
        // Show feedback
        setTimeout(() => {
            showSEFeedback(isCorrect, option.reason, scenario.explanation);
        }, 500);
    };

    function showSEFeedback(isCorrect, reason, explanation) {
        const container = document.getElementById('seScenarioContainer');
        const feedbackHTML = `
            <div style="max-width: 900px; margin: 0 auto;">
                <div style="background: ${isCorrect ? 'rgba(0,255,0,0.2)' : 'rgba(255,0,0,0.2)'}; padding: 2rem; border-radius: 15px; border: 3px solid ${isCorrect ? '#00ff00' : '#ff0000'}; margin-bottom: 2rem; text-align: center;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">${isCorrect ? '✅' : '❌'}</div>
                    <h2 style="color: ${isCorrect ? '#00ff00' : '#ff0000'}; margin-bottom: 1rem;">
                        ${isCorrect ? 'Correct!' : 'Incorrect'}
                    </h2>
                    <p style="color: #ffffff; font-size: 1.2rem; margin-bottom: 1.5rem;">
                        ${reason}
                    </p>
                    
                    <div style="background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 10px; text-align: left; margin-top: 1.5rem;">
                        <h4 style="color: #00ffff; margin-bottom: 1rem;">💡 Explanation:</h4>
                        <p style="color: #ffffff; font-size: 1.1rem; line-height: 1.8;">
                            ${explanation}
                        </p>
                    </div>
                </div>
                
                <div style="text-align: center;">
                    <button onclick="nextSEScenario()" 
                            style="padding: 1.25rem 3rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; font-size: 1.2rem; cursor: pointer; transition: all 0.3s ease;"
                            onmouseover="this.style.transform='translateY(-3px)'"
                            onmouseout="this.style.transform='translateY(0)'">
                        ${currentScenario < totalScenarios - 1 ? 'Next Scenario <i class="fas fa-arrow-right"></i>' : 'View Results'}
                    </button>
                </div>
            </div>
        `;
        
        container.innerHTML = feedbackHTML;
    }

    window.nextSEScenario = function() {
        currentScenario++;
        if (currentScenario < totalScenarios) {
            displayScenario();
        } else {
            showSEResults();
        }
    };

    function showSEResults() {
        const percentage = Math.round((score / (totalScenarios * 100)) * 100);
        const container = document.getElementById('seScenarioContainer');
        
        let message = '';
        let emoji = '';
        if (percentage === 100) {
            message = 'Perfect! You\'re a social engineering defense expert!';
            emoji = '🏆';
        } else if (percentage >= 80) {
            message = 'Excellent! You have great awareness of social engineering tactics!';
            emoji = '⭐';
        } else if (percentage >= 60) {
            message = 'Good job! Keep learning to improve your defense against social engineering.';
            emoji = '👍';
        } else {
            message = 'Keep practicing! Review the explanations to improve your awareness.';
            emoji = '📚';
        }
        
        container.innerHTML = `
            <div style="max-width: 900px; margin: 0 auto; text-align: center;">
                <div style="background: linear-gradient(135deg, rgba(0,255,255,0.2), rgba(0,128,255,0.2)); padding: 3rem; border-radius: 20px; border: 3px solid rgba(0,255,255,0.5); margin-bottom: 2rem;">
                    <div style="font-size: 5rem; margin-bottom: 1rem;">${emoji}</div>
                    <h2 style="color: #00ffff; font-size: 2.5rem; margin-bottom: 1rem;">Simulation Complete!</h2>
                    <div style="font-size: 4rem; color: #00ff00; margin: 1.5rem 0; font-weight: bold;">
                        ${score} / ${totalScenarios * 100}
                    </div>
                    <div style="font-size: 2rem; color: #ffffff; margin-bottom: 1.5rem;">
                        ${percentage}% Correct
                    </div>
                    <p style="color: #ffffff; font-size: 1.3rem; line-height: 1.6;">
                        ${message}
                    </p>
                </div>
                
                <div style="background: rgba(0,255,255,0.1); padding: 2rem; border-radius: 15px; margin-bottom: 2rem; text-align: left;">
                    <h3 style="color: #00ffff; margin-bottom: 1rem;">💡 Key Takeaways:</h3>
                    <ul style="color: #ffffff; line-height: 2; font-size: 1.1rem;">
                        <li>Social engineering attacks exploit human psychology, not technical vulnerabilities</li>
                        <li>Always verify requests through official channels - never trust unsolicited communications</li>
                        <li>Legitimate companies NEVER ask for passwords or sensitive info via email/phone</li>
                        <li>When in doubt, verify independently - don't use contact info provided by the suspicious message</li>
                        <li>Report suspicious activity to IT/security immediately</li>
                        <li>Physical security is just as important as digital security - be aware of tailgating and baiting</li>
                    </ul>
                </div>
                
                <button onclick="initSocialEngineeringGame()" 
                        style="padding: 1.25rem 3rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; font-size: 1.2rem; cursor: pointer; transition: all 0.3s ease;"
                        onmouseover="this.style.transform='translateY(-3px)'"
                        onmouseout="this.style.transform='translateY(0)'">
                    <i class="fas fa-redo"></i> Play Again
                </button>
            </div>
        `;
        
        addPoints(score);
        if (percentage === 100) {
            addAchievement('se-expert', 'Social Engineering Defense Expert', 'Perfect score in Social Engineering Simulator!');
        }
    }

    // Initialize
    currentScenario = 0;
    score = 0;
    displayScenario();
}

    window.CyberArcadeGames['social-engineering'] = {
        title: 'Social Engineering Simulator',
        content: `
            <div id="seScenarioContainer">
                <div style="text-align: center; padding: 2rem;">
                    <div class="spinner"></div>
                    <p style="color: #cccccc; margin-top: 1rem;">Loading simulation...</p>
                </div>
            </div>
        `,
        init: initSocialEngineeringGame
    };
})();
