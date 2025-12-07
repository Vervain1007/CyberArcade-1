// Phishing Detective Game - Multiple Types (Email, WhatsApp, Websites, SMS, etc.)
(function() {
    const phishingScenarios = [
        // EMAIL PHISHING
        {
            id: 1,
            type: 'email',
            typeLabel: '📧 Email',
            from: 'security@amazon.com',
            subject: 'URGENT: Verify Your Account Now',
            body: `Dear Customer,

Your Amazon account has been temporarily suspended due to suspicious activity. 
To restore access, please click the link below and verify your account information:

http://amazon-verify-account.com/secure/login

If you do not verify within 24 hours, your account will be permanently closed.

Thank you,
Amazon Security Team`,
            isPhishing: true,
            redFlags: [
                'Urgent language ("URGENT", "24 hours")',
                'Suspicious link (amazon-verify-account.com instead of amazon.com)',
                'Threat of account closure',
                'Generic greeting ("Dear Customer")'
            ],
            explanation: 'This is a phishing email! The link goes to a fake website designed to steal your login credentials.'
        },
        {
            id: 2,
            type: 'email',
            typeLabel: '📧 Email',
            from: 'noreply@paypal.com',
            subject: 'Payment Confirmation - Order #12345',
            body: `Hello,

We received a payment of $299.99 from your PayPal account.

Transaction Details:
- Amount: $299.99
- Merchant: TechStore Inc.
- Date: ${new Date().toLocaleDateString()}

If you did not make this purchase, please contact us immediately at:
https://www.paypal.com/security/contact

Thank you for using PayPal.`,
            isPhishing: false,
            redFlags: [],
            explanation: 'This is a legitimate email. It uses the official PayPal domain, provides transaction details, and links to the real PayPal security page.'
        },
        // WHATSAPP PHISHING
        {
            id: 3,
            type: 'whatsapp',
            typeLabel: '💬 WhatsApp',
            sender: '+1-555-0199',
            senderName: 'Amazon Support',
            timestamp: '2:34 PM',
            messages: [
                {
                    text: 'Hello! This is Amazon Customer Support.',
                    time: '2:34 PM'
                },
                {
                    text: 'We detected suspicious activity on your account. Please verify your identity immediately.',
                    time: '2:35 PM'
                },
                {
                    text: 'Click here to verify: bit.ly/amzn-verify-now',
                    time: '2:35 PM'
                },
                {
                    text: '⚠️ Your account will be suspended in 1 hour if you don\'t verify!',
                    time: '2:36 PM'
                }
            ],
            isPhishing: true,
            redFlags: [
                'Unknown phone number',
                'Urgent threat ("1 hour", "suspended")',
                'Suspicious shortened link (bit.ly)',
                'Asks for immediate action',
                'No prior conversation history'
            ],
            explanation: 'This is WhatsApp phishing! Legitimate companies don\'t contact you via WhatsApp for account verification. The shortened link is suspicious.'
        },
        {
            id: 4,
            type: 'whatsapp',
            typeLabel: '💬 WhatsApp',
            sender: '+1-800-275-2273',
            senderName: 'Bank of America',
            timestamp: '10:15 AM',
            messages: [
                {
                    text: 'Hi! This is Bank of America. We\'re calling about your recent transaction.',
                    time: '10:15 AM'
                },
                {
                    text: 'Did you authorize a $500 purchase at TechStore today?',
                    time: '10:15 AM'
                },
                {
                    text: 'If not, please call us at 1-800-275-2273 or visit bankofamerica.com/security',
                    time: '10:16 AM'
                }
            ],
            isPhishing: false,
            redFlags: [],
            explanation: 'This appears legitimate - it asks you to call the official number or visit the official website, not click a suspicious link.'
        },
        // WEBSITE PHISHING
        {
            id: 5,
            type: 'website',
            typeLabel: '🌐 Website',
            url: 'https://amaz0n.com/login',
            pageTitle: 'Amazon - Sign In',
            visual: `
                <div style="background: #232f3e; padding: 2rem; border-radius: 10px; color: white;">
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <h1 style="color: #ff9900; margin-bottom: 0.5rem;">amaz0n.com</h1>
                        <div style="color: #ff6b6b; font-size: 0.9rem; margin-bottom: 1rem;">⚠️ Not Secure | Certificate Invalid</div>
                    </div>
                    <div style="max-width: 400px; margin: 0 auto;">
                        <h2 style="margin-bottom: 1rem;">Sign In</h2>
                        <input type="email" placeholder="Email or mobile phone number" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border-radius: 5px; border: 1px solid #ccc;">
                        <input type="password" placeholder="Password" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border-radius: 5px; border: 1px solid #ccc;">
                        <button style="width: 100%; padding: 0.75rem; background: #ff9900; border: none; border-radius: 5px; color: white; font-weight: bold; cursor: pointer;">Continue</button>
                    </div>
                </div>
            `,
            isPhishing: true,
            redFlags: [
                'URL uses "amaz0n.com" (zero instead of "o") - common phishing trick',
                'Invalid security certificate warning',
                'Not secure (HTTP or invalid HTTPS)',
                'Domain doesn\'t match official Amazon domain'
            ],
            explanation: 'This is a phishing website! The URL "amaz0n.com" uses a zero instead of "o" - a classic phishing trick. Always check the URL carefully!'
        },
        {
            id: 6,
            type: 'website',
            typeLabel: '🌐 Website',
            url: 'https://www.paypal.com/signin',
            pageTitle: 'PayPal - Sign In',
            visual: `
                <div style="background: #003087; padding: 2rem; border-radius: 10px; color: white;">
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <h1 style="color: #009cde; margin-bottom: 0.5rem;">PayPal</h1>
                        <div style="color: #00ff00; font-size: 0.9rem; margin-bottom: 1rem;">🔒 Secure Connection</div>
                    </div>
                    <div style="max-width: 400px; margin: 0 auto;">
                        <h2 style="margin-bottom: 1rem;">Log in to your PayPal account</h2>
                        <input type="email" placeholder="Email" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border-radius: 5px; border: 1px solid #ccc;">
                        <input type="password" placeholder="Password" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border-radius: 5px; border: 1px solid #ccc;">
                        <button style="width: 100%; padding: 0.75rem; background: #009cde; border: none; border-radius: 5px; color: white; font-weight: bold; cursor: pointer;">Log In</button>
                        <p style="text-align: center; margin-top: 1rem; font-size: 0.9rem;">Having trouble logging in? <a href="#" style="color: #009cde;">Get help</a></p>
                    </div>
                </div>
            `,
            isPhishing: false,
            redFlags: [],
            explanation: 'This is the legitimate PayPal website. Notice the secure connection indicator and the correct domain (paypal.com).'
        },
        // SMS PHISHING
        {
            id: 7,
            type: 'sms',
            typeLabel: '📱 SMS',
            sender: 'AMAZON',
            number: '22345',
            timestamp: '3:15 PM',
            message: 'URGENT: Your Amazon account will be locked. Verify now: amaz0n-verify.com/secure?id=12345',
            isPhishing: true,
            redFlags: [
                'Urgent language ("URGENT", "locked")',
                'Suspicious link (amaz0n-verify.com)',
                'Generic sender name',
                'Asks for immediate action'
            ],
            explanation: 'This is SMS phishing (smishing)! The link goes to a fake website. Legitimate companies don\'t send urgent account verification via SMS.'
        },
        {
            id: 8,
            type: 'sms',
            typeLabel: '📱 SMS',
            sender: 'BANK-ALERT',
            number: '12345',
            timestamp: '11:30 AM',
            message: 'Bank Alert: A transaction of $250.00 was made on your card ending in 4567. If this wasn\'t you, call 1-800-275-2273 immediately.',
            isPhishing: false,
            redFlags: [],
            explanation: 'This appears legitimate - it provides transaction details and asks you to call the official bank number, not click a link.'
        },
        // SOCIAL MEDIA PHISHING
        {
            id: 9,
            type: 'social',
            typeLabel: '📱 Social Media',
            platform: 'Facebook',
            sender: 'Facebook Security',
            profilePic: '👤',
            timestamp: '1 hour ago',
            message: '⚠️ Your Facebook account has been compromised! Click here immediately to secure it: facebook-security-verify.net/login',
            isPhishing: true,
            redFlags: [
                'Suspicious domain (facebook-security-verify.net instead of facebook.com)',
                'Urgent threat language',
                'Asks to click a link',
                'Not from official Facebook page'
            ],
            explanation: 'This is social media phishing! Facebook uses facebook.com, not external domains. Never click links in suspicious messages.'
        }
    ];

    let currentScenarioIndex = 0;
    let score = 0;
    let totalScenarios = phishingScenarios.length;

    function initPhishingDetective() {
        currentScenarioIndex = 0;
        score = 0;
        displayScenario();
    }

    function displayScenario() {
        const scenario = phishingScenarios[currentScenarioIndex];
        const container = document.getElementById('phishingDetectiveContainer');
        
        if (!container) return;
        
        let scenarioHTML = '';
        
        if (scenario.type === 'email') {
            scenarioHTML = `
                <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(0,255,255,0.3); border-radius: 15px; padding: 2rem; margin-bottom: 2rem;">
                    <div style="border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 1rem; margin-bottom: 1rem;">
                        <div style="margin-bottom: 0.5rem;">
                            <strong style="color: #00ffff;">From:</strong> 
                            <span style="color: #ffffff;">${scenario.from}</span>
                        </div>
                        <div>
                            <strong style="color: #00ffff;">Subject:</strong> 
                            <span style="color: #ffffff;">${scenario.subject}</span>
                        </div>
                    </div>
                    <div style="background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 10px; white-space: pre-wrap; font-family: 'Courier New', monospace; color: #ffffff; line-height: 1.8; min-height: 200px;">
${scenario.body}
                    </div>
                </div>
            `;
        } else if (scenario.type === 'whatsapp') {
            scenarioHTML = `
                <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(0,255,255,0.3); border-radius: 15px; padding: 2rem; margin-bottom: 2rem;">
                    <div style="background: #075e54; padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
                        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                            <div style="width: 50px; height: 50px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                                ${scenario.profilePic || '👤'}
                            </div>
                            <div>
                                <div style="color: #ffffff; font-weight: bold;">${scenario.senderName}</div>
                                <div style="color: #cccccc; font-size: 0.9rem;">${scenario.sender} • ${scenario.timestamp}</div>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                        ${scenario.messages.map(msg => `
                            <div style="background: #dcf8c6; padding: 1rem; border-radius: 10px; max-width: 80%; margin-left: auto; color: #000;">
                                <div style="margin-bottom: 0.25rem;">${msg.text}</div>
                                <div style="font-size: 0.75rem; color: #666; text-align: right;">${msg.time}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } else if (scenario.type === 'website') {
            scenarioHTML = `
                <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(0,255,255,0.3); border-radius: 15px; padding: 2rem; margin-bottom: 2rem;">
                    <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 5px; margin-bottom: 1rem;">
                        <div style="color: #00ffff; font-family: monospace; font-size: 0.9rem;">${scenario.url}</div>
                    </div>
                    ${scenario.visual}
                </div>
            `;
        } else if (scenario.type === 'sms') {
            scenarioHTML = `
                <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(0,255,255,0.3); border-radius: 15px; padding: 2rem; margin-bottom: 2rem;">
                    <div style="background: #e8f5e9; padding: 1.5rem; border-radius: 10px; color: #000;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 0.5rem;">
                            <div>
                                <div style="font-weight: bold; color: #000;">${scenario.sender}</div>
                                <div style="font-size: 0.9rem; color: #666;">${scenario.number}</div>
                            </div>
                            <div style="color: #666; font-size: 0.9rem;">${scenario.timestamp}</div>
                        </div>
                        <div style="line-height: 1.6;">${scenario.message}</div>
                    </div>
                </div>
            `;
        } else if (scenario.type === 'social') {
            scenarioHTML = `
                <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(0,255,255,0.3); border-radius: 15px; padding: 2rem; margin-bottom: 2rem;">
                    <div style="background: #1877f2; padding: 1rem; border-radius: 10px; margin-bottom: 1rem; color: white;">
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div style="font-size: 2rem;">${scenario.profilePic}</div>
                            <div>
                                <div style="font-weight: bold;">${scenario.sender}</div>
                                <div style="font-size: 0.9rem; opacity: 0.8;">${scenario.timestamp}</div>
                            </div>
                        </div>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 10px; color: #ffffff; line-height: 1.8;">
                        ${scenario.message}
                    </div>
                </div>
            `;
        }
        
        container.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <div style="background: rgba(0,255,255,0.1); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem; text-align: center;">
                    <div style="color: #00ffff; font-size: 1.2rem; margin-bottom: 0.5rem;">${scenario.typeLabel}</div>
                    <h3 style="color: #00ffff; margin-bottom: 0.5rem;">Scenario ${currentScenarioIndex + 1} of ${totalScenarios}</h3>
                    <div style="color: #ffffff; font-size: 1.1rem;">
                        Score: <strong style="color: #00ff00;">${score}</strong> / ${currentScenarioIndex}
                    </div>
                </div>
                
                ${scenarioHTML}
                
                <div style="text-align: center; margin-top: 2rem;">
                    <h3 style="color: #ffffff; margin-bottom: 1.5rem;">Is this legitimate or phishing?</h3>
                    <div style="display: flex; gap: 1.5rem; justify-content: center;">
                        <button onclick="checkPhishingAnswer(false)" 
                                style="padding: 1.25rem 3rem; background: linear-gradient(45deg, #00ff00, #00cc00); border: none; border-radius: 50px; color: #000; font-weight: bold; font-size: 1.2rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 5px 20px rgba(0,255,0,0.3);"
                                onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(0,255,0,0.5)'"
                                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 20px rgba(0,255,0,0.3)'">
                            <i class="fas fa-shield-check"></i> Legitimate
                        </button>
                        <button onclick="checkPhishingAnswer(true)" 
                                style="padding: 1.25rem 3rem; background: linear-gradient(45deg, #ff6b6b, #ff0000); border: none; border-radius: 50px; color: #ffffff; font-weight: bold; font-size: 1.2rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 5px 20px rgba(255,107,107,0.3);"
                                onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(255,107,107,0.5)'"
                                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 20px rgba(255,107,107,0.3)'">
                            <i class="fas fa-exclamation-triangle"></i> Phishing
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    window.checkPhishingAnswer = function(userSaidPhishing) {
        const scenario = phishingScenarios[currentScenarioIndex];
        const isCorrect = (userSaidPhishing && scenario.isPhishing) || (!userSaidPhishing && !scenario.isPhishing);
        
        if (isCorrect) {
            score++;
            addPoints(50);
        }
        
        // Show result
        const container = document.getElementById('phishingDetectiveContainer');
        const resultHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <div style="background: ${isCorrect ? 'rgba(0,255,0,0.2)' : 'rgba(255,0,0,0.2)'}; padding: 2rem; border-radius: 15px; border: 3px solid ${isCorrect ? '#00ff00' : '#ff0000'}; margin-bottom: 2rem; text-align: center;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">${isCorrect ? '✅' : '❌'}</div>
                    <h2 style="color: ${isCorrect ? '#00ff00' : '#ff0000'}; margin-bottom: 1rem;">
                        ${isCorrect ? 'Correct!' : 'Incorrect'}
                    </h2>
                    <p style="color: #ffffff; font-size: 1.2rem; margin-bottom: 1.5rem;">
                        ${scenario.explanation}
                    </p>
                    
                    ${scenario.redFlags.length > 0 ? `
                        <div style="background: rgba(255,107,107,0.2); padding: 1.5rem; border-radius: 10px; margin-top: 1.5rem; text-align: left;">
                            <h4 style="color: #ff6b6b; margin-bottom: 1rem;">🚩 Red Flags:</h4>
                            <ul style="color: #ffffff; line-height: 2;">
                                ${scenario.redFlags.map(flag => `<li>${flag}</li>`).join('')}
                            </ul>
                        </div>
                    ` : `
                        <div style="background: rgba(0,255,0,0.2); padding: 1.5rem; border-radius: 10px; margin-top: 1.5rem;">
                            <h4 style="color: #00ff00; margin-bottom: 0.5rem;">✅ This is legitimate because:</h4>
                            <ul style="color: #ffffff; line-height: 2;">
                                <li>Uses official domain/contact information</li>
                                <li>No urgent threats or suspicious links</li>
                                <li>Professional communication style</li>
                                <li>Doesn't ask for sensitive information</li>
                            </ul>
                        </div>
                    `}
                </div>
                
                <div style="text-align: center;">
                    <button onclick="nextPhishingScenario()" 
                            style="padding: 1.25rem 3rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; font-size: 1.2rem; cursor: pointer; transition: all 0.3s ease;"
                            onmouseover="this.style.transform='translateY(-3px)'"
                            onmouseout="this.style.transform='translateY(0)'">
                        ${currentScenarioIndex < totalScenarios - 1 ? 'Next Scenario <i class="fas fa-arrow-right"></i>' : 'View Results'}
                    </button>
                </div>
            </div>
        `;
        
        container.innerHTML = resultHTML;
    };

    window.nextPhishingScenario = function() {
        currentScenarioIndex++;
        if (currentScenarioIndex < totalScenarios) {
            displayScenario();
        } else {
            showPhishingResults();
        }
    };

    function showPhishingResults() {
        const percentage = Math.round((score / totalScenarios) * 100);
        const container = document.getElementById('phishingDetectiveContainer');
        
        let message = '';
        let emoji = '';
        if (percentage === 100) {
            message = 'Perfect! You\'re a phishing detection expert!';
            emoji = '🏆';
        } else if (percentage >= 80) {
            message = 'Excellent! You have great phishing awareness!';
            emoji = '⭐';
        } else if (percentage >= 60) {
            message = 'Good job! Keep practicing to improve.';
            emoji = '👍';
        } else {
            message = 'Keep learning! Review the red flags and try again.';
            emoji = '📚';
        }
        
        container.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto; text-align: center;">
                <div style="background: linear-gradient(135deg, rgba(0,255,255,0.2), rgba(0,128,255,0.2)); padding: 3rem; border-radius: 20px; border: 3px solid rgba(0,255,255,0.5); margin-bottom: 2rem;">
                    <div style="font-size: 5rem; margin-bottom: 1rem;">${emoji}</div>
                    <h2 style="color: #00ffff; font-size: 2.5rem; margin-bottom: 1rem;">Game Complete!</h2>
                    <div style="font-size: 4rem; color: #00ff00; margin: 1.5rem 0; font-weight: bold;">
                        ${score} / ${totalScenarios}
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
                        <li>Phishing happens in emails, WhatsApp, SMS, websites, and social media</li>
                        <li>Always check the sender's email address, phone number, or URL carefully</li>
                        <li>Look for urgent language and threats - these are red flags</li>
                        <li>Legitimate companies use their official domains and contact methods</li>
                        <li>Never click links in suspicious messages - go directly to the website</li>
                        <li>If in doubt, contact the company directly through their official website</li>
                    </ul>
                </div>
                
                <button onclick="initPhishingDetective()" 
                        style="padding: 1.25rem 3rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; font-size: 1.2rem; cursor: pointer; transition: all 0.3s ease;"
                        onmouseover="this.style.transform='translateY(-3px)'"
                        onmouseout="this.style.transform='translateY(0)'">
                    <i class="fas fa-redo"></i> Play Again
                </button>
            </div>
        `;
        
        addPoints(score * 20);
        if (percentage === 100) {
            addAchievement('phishing-expert', 'Phishing Detection Expert', 'Perfect score in Phishing Detective!');
        }
    }

    // Register the game
    window.CyberArcadeGames = window.CyberArcadeGames || {};
    window.CyberArcadeGames['phishing-detective'] = {
        title: 'Phishing Detective',
        content: `
            <div id="phishingDetectiveContainer">
                <div style="text-align: center; padding: 2rem;">
                    <div class="spinner"></div>
                    <p style="color: #cccccc; margin-top: 1rem;">Loading game...</p>
                </div>
            </div>
        `,
        init: initPhishingDetective
    };
})();
