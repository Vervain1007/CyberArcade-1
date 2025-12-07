// Snake & Ladder Game - Two Player (Player 1 vs Player 2)
(function() {
    window.CyberArcadeGames = window.CyberArcadeGames || {};

// Initialize Snake & Ladder Game
function initSnakeLadderGame() {
    const canvas = document.getElementById('snakeLadderCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    // Game state
    let player1Position = 1;
    let player2Position = 1;
    let currentPlayer = 'player1'; // 'player1' or 'player2'
    let isAnimating = false;
    let diceValue = 0;
    let gameOver = false;
    
    // Track trap encounters (snakes or ladders) for each player
    let player1TrapCount = 0;
    let player2TrapCount = 0;
    const MIN_TRAP_COUNT = 3; // Minimum number of traps each player must encounter

    // Board configuration - larger size for better visibility
    const boardSize = 10;
    const cellSize = 65; // Increased for better visibility
    const boardWidth = boardSize * cellSize;
    const boardHeight = boardSize * cellSize;

    // Set canvas size
    canvas.width = boardWidth;
    canvas.height = boardHeight;

    // Snake and ladder positions (head: tail)
    const snakes = {
        27: 5, 40: 3, 43: 18, 54: 38, 
        66: 45, 76: 58, 89: 53, 99: 41
    };
    const ladders = {
        4: 25, 13: 46, 33: 49, 42: 63, 
        50: 69, 62: 81, 74: 92
    };

    // Security tips for random popups
    const securityTips = [
        "💡 Tip: Always use strong, unique passwords for each account!",
        "💡 Tip: Enable two-factor authentication (2FA) on important accounts!",
        "💡 Tip: Never click links in suspicious emails - go directly to the website!",
        "💡 Tip: Keep your software updated to protect against vulnerabilities!",
        "💡 Tip: Use a password manager to create and store strong passwords!",
        "💡 Tip: Be suspicious of urgent requests - they're often phishing attempts!",
        "💡 Tip: Always check for HTTPS (padlock icon) before entering passwords!",
        "💡 Tip: Never share passwords with anyone, even if they claim to be tech support!",
        "💡 Tip: Public WiFi is risky - avoid accessing sensitive accounts on public networks!",
        "💡 Tip: Back up your important data regularly to protect against ransomware!",
        "💡 Tip: Review your privacy settings on social media regularly!",
        "💡 Tip: If something seems too good to be true online, it probably is!",
        "💡 Tip: Use a VPN when connecting to public WiFi networks!",
        "💡 Tip: Check your bank statements regularly for unauthorized transactions!",
        "💡 Tip: Don't download files from unknown sources, especially .exe files!"
    ];

    // Cybersecurity questions
    const questions = [
        {
            question: "What is the primary purpose of a firewall?",
            options: ["To prevent unauthorized access", "To speed up internet", "To store passwords", "To create backups"],
            correct: 0,
            explanation: "Firewalls monitor and control network traffic to prevent unauthorized access."
        },
        {
            question: "Which attack vector is most commonly used in phishing?",
            options: ["Email", "Phone calls", "Physical mail", "Television ads"],
            correct: 0,
            explanation: "Email is the most common vector for phishing attacks."
        },
        {
            question: "What does '2FA' stand for?",
            options: ["Two Factor Authentication", "Two File Access", "Two Function Analysis", "Two Factor Authorization"],
            correct: 0,
            explanation: "2FA adds an extra layer of security by requiring two forms of verification."
        },
        {
            question: "What makes a strong password?",
            options: ["Short and simple", "Long, complex, and unique", "Your name and birth year", "123456"],
            correct: 1,
            explanation: "Strong passwords are long (12+ characters), complex, and unique."
        },
        {
            question: "What does HTTPS stand for?",
            options: ["HyperText Transfer Protocol Secure", "HyperTransfer Protocol Secure", "HyperLink Transfer Protocol Secure", "None of the above"],
            correct: 0,
            explanation: "HTTPS provides encrypted communication."
        },
        {
            question: "What is malware?",
            options: ["Good software", "Malicious software", "Old software", "Expensive software"],
            correct: 1,
            explanation: "Malware is malicious software designed to damage or gain unauthorized access."
        },
        {
            question: "What is ransomware?",
            options: ["Software that protects from ransom", "Malware that encrypts files and demands payment", "A type of firewall", "A password manager"],
            correct: 1,
            explanation: "Ransomware encrypts files and demands payment to restore access."
        },
        {
            question: "What is a VPN?",
            options: ["Virtual Private Network", "Very Private Network", "Virtual Public Network", "Verified Private Network"],
            correct: 0,
            explanation: "VPN creates a secure connection over the internet."
        },
        {
            question: "How often should you change your passwords?",
            options: ["Never", "Every 3-6 months", "Every day", "Only when hacked"],
            correct: 1,
            explanation: "Passwords should be changed every 3-6 months, or immediately if breached."
        },
        {
            question: "What is a password manager?",
            options: ["A person who remembers passwords", "Software that stores and manages passwords", "A type of virus", "A physical device"],
            correct: 1,
            explanation: "Password managers securely store and manage your passwords."
        },
        {
            question: "What is phishing?",
            options: ["A type of fishing", "Fraudulent attempt to obtain sensitive information", "A password", "A firewall"],
            correct: 1,
            explanation: "Phishing is a fraudulent attempt to trick people into revealing sensitive information."
        },
        {
            question: "What should you do if you receive a suspicious email?",
            options: ["Click all links", "Delete it and report as spam", "Reply with personal info", "Forward to everyone"],
            correct: 1,
            explanation: "Delete suspicious emails and report them as spam."
        },
        {
            question: "What is social engineering?",
            options: ["A type of engineering", "Manipulating people to reveal confidential information", "A password", "A virus"],
            correct: 1,
            explanation: "Social engineering manipulates people into revealing confidential information."
        },
        {
            question: "What is a trojan horse?",
            options: ["A wooden horse", "Malware disguised as legitimate software", "A type of firewall", "A password"],
            correct: 1,
            explanation: "A trojan horse is malware disguised as legitimate software."
        },
        {
            question: "What should you do if your account is hacked?",
            options: ["Ignore it", "Change password immediately and enable 2FA", "Share it on social media", "Create a new account"],
            correct: 1,
            explanation: "Immediately change your password and enable 2FA."
        }
    ];

    // Draw the game board with proper numbering
    function drawBoard() {
        // Clear canvas
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 10;

        for (let i = 0; i <= boardSize; i++) {
            // Vertical lines
            ctx.beginPath();
            ctx.moveTo(i * cellSize, 0);
            ctx.lineTo(i * cellSize, boardHeight);
            ctx.stroke();

            // Horizontal lines
            ctx.beginPath();
            ctx.moveTo(0, i * cellSize);
            ctx.lineTo(boardWidth, i * cellSize);
            ctx.stroke();
        }

        // Draw numbers 1-100 in snake pattern
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Arial'; // Increased font size for better visibility
        ctx.shadowBlur = 0;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        let number = 100;
        for (let row = 0; row < boardSize; row++) {
            const isEvenRow = row % 2 === 0;
            for (let col = 0; col < boardSize; col++) {
                const actualCol = isEvenRow ? col : boardSize - 1 - col;
                const x = actualCol * cellSize + cellSize / 2;
                const y = row * cellSize + cellSize / 2;

                ctx.fillText(number.toString(), x, y - 2);
                number--;
            }
        }

        // Draw snakes
        drawSnakes();

        // Draw ladders
        drawLadders();

        // Draw players
        drawPlayers();
    }

    // Draw board without players (for animation)
    function drawBoardWithoutPlayers() {
        // Clear canvas
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 10;

        for (let i = 0; i <= boardSize; i++) {
            // Vertical lines
            ctx.beginPath();
            ctx.moveTo(i * cellSize, 0);
            ctx.lineTo(i * cellSize, boardHeight);
            ctx.stroke();

            // Horizontal lines
            ctx.beginPath();
            ctx.moveTo(0, i * cellSize);
            ctx.lineTo(boardWidth, i * cellSize);
            ctx.stroke();
        }

        // Draw numbers 1-100 in snake pattern
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Arial';
        ctx.shadowBlur = 0;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        let number = 100;
        for (let row = 0; row < boardSize; row++) {
            const isEvenRow = row % 2 === 0;
            for (let col = 0; col < boardSize; col++) {
                const actualCol = isEvenRow ? col : boardSize - 1 - col;
                const x = actualCol * cellSize + cellSize / 2;
                const y = row * cellSize + cellSize / 2;

                ctx.fillText(number.toString(), x, y - 2);
                number--;
            }
        }

        // Draw snakes
        drawSnakes();

        // Draw ladders
        drawLadders();
    }

    function drawSnakes() {
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 6; // Increased for larger board
        ctx.shadowColor = '#ff0000';
        ctx.shadowBlur = 15; // Increased for larger board

        Object.entries(snakes).forEach(([head, tail]) => {
            const headPos = getPositionFromNumber(parseInt(head));
            const tailPos = getPositionFromNumber(tail);

            ctx.beginPath();
            ctx.moveTo(headPos.x, headPos.y);
            ctx.quadraticCurveTo(
                headPos.x + (tailPos.x - headPos.x) / 2,
                headPos.y - 50, // Increased for larger board
                tailPos.x,
                tailPos.y
            );
            ctx.stroke();

            // Draw snake head
            ctx.fillStyle = '#ff0000';
            ctx.beginPath();
            ctx.arc(headPos.x, headPos.y, 8, 0, 2 * Math.PI); // Increased for larger board
            ctx.fill();
        });
    }

    function drawLadders() {
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 5; // Increased for larger board
        ctx.shadowColor = '#00ff00';
        ctx.shadowBlur = 10; // Increased for larger board

        Object.entries(ladders).forEach(([bottom, top]) => {
            const bottomPos = getPositionFromNumber(parseInt(bottom));
            const topPos = getPositionFromNumber(top);

            // Draw ladder sides
            ctx.beginPath();
            ctx.moveTo(bottomPos.x - 12, bottomPos.y); // Increased for larger board
            ctx.lineTo(topPos.x - 12, topPos.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(bottomPos.x + 12, bottomPos.y);
            ctx.lineTo(topPos.x + 12, topPos.y);
            ctx.stroke();

            // Draw ladder rungs
            const steps = 5;
            for (let i = 1; i < steps; i++) {
                const ratio = i / steps;
                const x1 = bottomPos.x - 12 + (topPos.x - bottomPos.x) * ratio;
                const y1 = bottomPos.y + (topPos.y - bottomPos.y) * ratio;
                const x2 = bottomPos.x + 12 + (topPos.x - bottomPos.x) * ratio;
                const y2 = bottomPos.y + (topPos.y - bottomPos.y) * ratio;

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        });
    }

    function drawPlayers() {
        // Always draw players - they should always be visible
        // Draw Player 1 (blue) - 👤 icon
        const player1Pos = getPositionFromNumber(player1Position);
        ctx.shadowColor = '#0080ff';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#0080ff';
        ctx.beginPath();
        ctx.arc(player1Pos.x, player1Pos.y, 12, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#0040ff';
        ctx.beginPath();
        ctx.arc(player1Pos.x, player1Pos.y, 10, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('👤', player1Pos.x - 6, player1Pos.y + 4);

        // Draw Player 2 (red) - 🤖 icon
        const player2Pos = getPositionFromNumber(player2Position);
        ctx.shadowColor = '#ff4000';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#ff4000';
        ctx.beginPath();
        ctx.arc(player2Pos.x, player2Pos.y, 12, 0, 2 * Math.PI);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(player2Pos.x, player2Pos.y, 10, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('🤖', player2Pos.x - 6, player2Pos.y + 4);
    }

    function getPositionFromNumber(number) {
        const row = Math.floor((100 - number) / boardSize);
        const col = (100 - number) % boardSize;
        const isEvenRow = row % 2 === 0;
        const actualCol = isEvenRow ? col : boardSize - 1 - col;

        return {
            x: actualCol * cellSize + cellSize / 2,
            y: row * cellSize + cellSize / 2
        };
    }

    // Show random security tip
    function showRandomSecurityTip() {
        const tip = securityTips[Math.floor(Math.random() * securityTips.length)];
        const tipModal = document.createElement('div');
        tipModal.style.cssText = 'position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, rgba(0,255,255,0.2), rgba(0,128,255,0.2)); padding: 1.5rem; border-radius: 15px; border: 2px solid rgba(0,255,255,0.5); z-index: 2500; max-width: 350px; box-shadow: 0 10px 30px rgba(0,255,255,0.3); animation: slideIn 0.3s ease;';
        tipModal.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                <div style="font-size: 1.5rem;">💡</div>
                <h4 style="color: #00ffff; margin: 0;">Security Tip</h4>
                <button onclick="this.parentElement.parentElement.remove()" style="margin-left: auto; background: rgba(255,0,0,0.2); border: 1px solid #ff0000; color: #ff0000; width: 25px; height: 25px; border-radius: 50%; cursor: pointer; font-size: 1rem;">×</button>
            </div>
            <p style="color: #ffffff; margin: 0; line-height: 1.6;">${tip}</p>
        `;
        document.body.appendChild(tipModal);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (tipModal.parentNode) {
                tipModal.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => tipModal.remove(), 300);
            }
        }, 5000);
    }

    // Roll dice for current player
    function rollDice() {
        if (isAnimating || gameOver) return;

        // Ensure board is drawn with players visible before rolling
        drawBoard();

        // Animate dice
        let rollCount = 0;
        const maxRolls = 10;
        const rollInterval = setInterval(() => {
            diceValue = Math.floor(Math.random() * 6) + 1;
            document.getElementById('dice').textContent = `🎲 ${diceValue}`;
            rollCount++;

            // Keep board visible during dice rolling
            if (rollCount % 3 === 0) {
                drawBoard();
            }

            if (rollCount >= maxRolls) {
                clearInterval(rollInterval);
                // Ensure board is drawn one final time before moving
                drawBoard();
                // Adjust dice value to ensure player gets trapped if needed
                adjustDiceForTraps();
                movePlayer(currentPlayer);
            }
        }, 100);
    }

    // Adjust dice value to ensure player lands on a trap if they haven't been trapped enough
    function adjustDiceForTraps() {
        const currentPos = currentPlayer === 'player1' ? player1Position : player2Position;
        const trapCount = currentPlayer === 'player1' ? player1TrapCount : player2TrapCount;
        
        // If player hasn't been trapped enough times, try to land them on a trap
        if (trapCount < MIN_TRAP_COUNT && currentPos < 95) {
            const targetPos = currentPos + diceValue;
            
            // Check if current dice roll would land on a trap
            const wouldLandOnTrap = snakes[targetPos] !== undefined || ladders[targetPos] !== undefined;
            
            if (!wouldLandOnTrap) {
                // Find nearest trap within reasonable range
                const allTraps = [...Object.keys(snakes).map(Number), ...Object.keys(ladders).map(Number)];
                const reachableTraps = allTraps.filter(trap => trap > currentPos && trap <= currentPos + 6);
                
                if (reachableTraps.length > 0) {
                    // Find the closest trap
                    const nearestTrap = reachableTraps.reduce((closest, trap) => {
                        return Math.abs(trap - targetPos) < Math.abs(closest - targetPos) ? trap : closest;
                    });
                    
                    // Adjust dice value to land on the trap
                    const requiredMove = nearestTrap - currentPos;
                    if (requiredMove >= 1 && requiredMove <= 6) {
                        diceValue = requiredMove;
                        document.getElementById('dice').textContent = `🎲 ${diceValue}`;
                    }
                }
            }
        }
    }

    // Move player
    function movePlayer(player) {
        if (isAnimating) return;
        isAnimating = true;

        let currentPos = player === 'player1' ? player1Position : player2Position;
        const targetPosition = Math.min(currentPos + diceValue, 100);

        // Animate movement
        const startPos = getPositionFromNumber(currentPos);
        const endPos = getPositionFromNumber(targetPosition);

        let progress = 0;
        const animationDuration = 800;
        const startTime = Date.now();

        function animate() {
            const elapsed = Date.now() - startTime;
            progress = Math.min(elapsed / animationDuration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            const currentX = startPos.x + (endPos.x - startPos.x) * easeProgress;
            const currentY = startPos.y + (endPos.y - startPos.y) * easeProgress;

            // Draw board without players first
            drawBoardWithoutPlayers();
            
            // Always draw both players - use current position for moving player, stored position for other
            // Draw Player 1
            if (player === 'player1') {
                // Player 1 is moving - draw at animated position
                ctx.shadowColor = '#0080ff';
            ctx.shadowBlur = 20;
                ctx.fillStyle = '#0080ff';
            ctx.beginPath();
                ctx.arc(currentX, currentY, 12, 0, 2 * Math.PI);
            ctx.fill();
            ctx.shadowBlur = 0;
                ctx.fillStyle = '#0040ff';
                ctx.beginPath();
                ctx.arc(currentX, currentY, 10, 0, 2 * Math.PI);
                ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 14px Arial';
                ctx.fillText('👤', currentX - 6, currentY + 4);
            } else {
                // Player 1 is static - draw at stored position
                const player1Pos = getPositionFromNumber(player1Position);
                ctx.shadowColor = '#0080ff';
            ctx.shadowBlur = 20;
                ctx.fillStyle = '#0080ff';
                ctx.beginPath();
                ctx.arc(player1Pos.x, player1Pos.y, 12, 0, 2 * Math.PI);
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.fillStyle = '#0040ff';
            ctx.beginPath();
                ctx.arc(player1Pos.x, player1Pos.y, 10, 0, 2 * Math.PI);
            ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 14px Arial';
                ctx.fillText('👤', player1Pos.x - 6, player1Pos.y + 4);
            }
            
            // Draw Player 2
            if (player === 'player2') {
                // Player 2 is moving - draw at animated position
                ctx.shadowColor = '#ff4000';
                ctx.shadowBlur = 20;
                ctx.fillStyle = '#ff4000';
            ctx.beginPath();
            ctx.arc(currentX, currentY, 12, 0, 2 * Math.PI);
            ctx.fill();
                ctx.shadowBlur = 0;
                ctx.fillStyle = '#ff0000';
                ctx.beginPath();
                ctx.arc(currentX, currentY, 10, 0, 2 * Math.PI);
                ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 14px Arial';
                ctx.fillText('🤖', currentX - 6, currentY + 4);
            } else {
                // Player 2 is static - draw at stored position
                const player2Pos = getPositionFromNumber(player2Position);
                ctx.shadowColor = '#ff4000';
                ctx.shadowBlur = 20;
                ctx.fillStyle = '#ff4000';
                ctx.beginPath();
                ctx.arc(player2Pos.x, player2Pos.y, 12, 0, 2 * Math.PI);
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.fillStyle = '#ff0000';
                ctx.beginPath();
                ctx.arc(player2Pos.x, player2Pos.y, 10, 0, 2 * Math.PI);
                ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 14px Arial';
                ctx.fillText('🤖', player2Pos.x - 6, player2Pos.y + 4);
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Update position
                if (player === 'player1') {
                    player1Position = targetPosition;
                } else {
                    player2Position = targetPosition;
                }
                
                updatePlayerDisplay();
                drawBoard(); // Redraw with final positions
                isAnimating = false;
                
                // Check for special squares after animation completes
                checkSpecialSquares(player);
            }
        }

        animate();
    }

    function checkSpecialSquares(player) {
        const position = player === 'player1' ? player1Position : player2Position;
        
        // Check for victory
        if (position === 100) {
            gameOver = true;
            showVictory(player);
            return;
        }

        // Check for snake
        if (snakes[position]) {
            // Increment trap count
            if (player === 'player1') {
                player1TrapCount++;
            } else {
                player2TrapCount++;
            }
            showSnakeQuestion(player, position);
        }
        // Check for ladder
        else if (ladders[position]) {
            // Increment trap count
            if (player === 'player1') {
                player1TrapCount++;
            } else {
                player2TrapCount++;
            }
            showLadderQuestion(player, position);
        }
        // Random security tip (20% chance)
        else if (Math.random() < 0.2) {
            showRandomSecurityTip();
            switchPlayer();
        }
        else {
            switchPlayer();
        }
    }

    function showSnakeQuestion(player, position) {
        const question = questions[Math.floor(Math.random() * questions.length)];
        const modal = document.createElement('div');
        modal.id = 'snakeModal';
        modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.95); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 2rem;';
        modal.innerHTML = `
            <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 2rem; border-radius: 20px; border: 3px solid #ff0000; max-width: 600px; max-height: 85vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(255,0,0,0.3);">
                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">🐍</div>
                    <h2 style="color: #ff0000; margin-bottom: 0.5rem; font-size: 1.8rem;">Snake Challenge!</h2>
                    <p style="color: #ffffff; font-size: 1rem;">Answer correctly to avoid sliding down!</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 15px; margin-bottom: 1.5rem;">
                    <h3 style="color: #ffffff; margin-bottom: 1rem; font-size: 1.1rem;">${question.question}</h3>
                    <div style="display: grid; gap: 0.8rem;">
                        ${question.options.map((option, index) => `
                            <button class="snake-option-btn" data-correct="${index === question.correct}" data-index="${index}"
                                    style="padding: 0.8rem; background: rgba(255,0,0,0.2); border: 2px solid rgba(255,0,0,0.5); border-radius: 10px; color: #ffffff; font-size: 0.95rem; text-align: left; cursor: pointer; transition: all 0.3s ease;"
                                    onmouseover="this.style.background='rgba(255,0,0,0.3)'; this.style.borderColor='#ff0000'"
                                    onmouseout="this.style.background='rgba(255,0,0,0.2)'; this.style.borderColor='rgba(255,0,0,0.5)'">
                                ${String.fromCharCode(65 + index)}. ${option}
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div id="snakeFeedback" style="display: none;"></div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add event listeners to option buttons
        modal.querySelectorAll('.snake-option-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const isCorrect = this.getAttribute('data-correct') === 'true';
                handleSnakeAnswer(player, isCorrect, position);
            });
        });
    }

    function showLadderQuestion(player, position) {
        const question = questions[Math.floor(Math.random() * questions.length)];
        const modal = document.createElement('div');
        modal.id = 'ladderModal';
        modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.95); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 2rem;';
        modal.innerHTML = `
            <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 2rem; border-radius: 20px; border: 3px solid #00ff00; max-width: 600px; max-height: 85vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,255,0,0.3);">
                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">🪜</div>
                    <h2 style="color: #00ff00; margin-bottom: 0.5rem; font-size: 1.8rem;">Ladder Challenge!</h2>
                    <p style="color: #ffffff; font-size: 1rem;">Answer correctly to climb up!</p>
                    </div>
                <div style="background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 15px; margin-bottom: 1.5rem;">
                    <h3 style="color: #ffffff; margin-bottom: 1rem; font-size: 1.1rem;">${question.question}</h3>
                    <div style="display: grid; gap: 0.8rem;">
                        ${question.options.map((option, index) => `
                            <button class="ladder-option-btn" data-correct="${index === question.correct}" data-index="${index}"
                                    style="padding: 0.8rem; background: rgba(0,255,0,0.2); border: 2px solid rgba(0,255,0,0.5); border-radius: 10px; color: #ffffff; font-size: 0.95rem; text-align: left; cursor: pointer; transition: all 0.3s ease;"
                                    onmouseover="this.style.background='rgba(0,255,0,0.3)'; this.style.borderColor='#00ff00'"
                                    onmouseout="this.style.background='rgba(0,255,0,0.2)'; this.style.borderColor='rgba(0,255,0,0.5)'">
                                ${String.fromCharCode(65 + index)}. ${option}
                            </button>
                        `).join('')}
                </div>
                </div>
                <div id="ladderFeedback" style="display: none;"></div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add event listeners to option buttons
        modal.querySelectorAll('.ladder-option-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const isCorrect = this.getAttribute('data-correct') === 'true';
                handleLadderAnswer(player, isCorrect, position);
            });
        });
    }

    function handleSnakeAnswer(player, isCorrect, position) {
        const modal = document.getElementById('snakeModal');
        if (!modal) return;
        
        // Disable all option buttons
        modal.querySelectorAll('.snake-option-btn').forEach(btn => {
            btn.style.pointerEvents = 'none';
            btn.style.opacity = '0.5';
        });
        
        // Show feedback
        const feedbackDiv = modal.querySelector('#snakeFeedback');
        feedbackDiv.style.display = 'block';
        feedbackDiv.style.cssText = 'display: block; text-align: center; padding: 1.5rem; background: rgba(0,0,0,0.5); border-radius: 10px; margin-top: 1rem;';
        feedbackDiv.innerHTML = `
            <div style="font-size: 2.5rem; margin-bottom: 0.8rem;">${isCorrect ? '✅' : '❌'}</div>
            <h3 style="color: ${isCorrect ? '#00ff00' : '#ff0000'}; margin-bottom: 1rem; font-size: 1.2rem;">
                ${isCorrect ? 'Correct! You avoided the snake!' : 'Wrong! You slide down the snake!'}
            </h3>
            <button id="snakeContinueBtn" style="padding: 0.8rem 2rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; cursor: pointer; font-size: 1rem;">
                Continue
            </button>
        `;
        
        // Handle answer logic
        if (isCorrect) {
            addPoints(50);
            // Stay at current position
                } else {
            // Slide down to snake tail
            if (player === 'player1') {
                player1Position = snakes[position];
            } else {
                player2Position = snakes[position];
            }
            addPoints(-25);
        }
        
        // Add event listener to Continue button
        const continueBtn = document.getElementById('snakeContinueBtn');
        continueBtn.addEventListener('click', function() {
            closeSnakeModal();
        });
    }

    function handleLadderAnswer(player, isCorrect, position) {
        const modal = document.getElementById('ladderModal');
        if (!modal) return;
        
        // Disable all option buttons
        modal.querySelectorAll('.ladder-option-btn').forEach(btn => {
            btn.style.pointerEvents = 'none';
            btn.style.opacity = '0.5';
        });
        
        // Show feedback
        const feedbackDiv = modal.querySelector('#ladderFeedback');
        feedbackDiv.style.display = 'block';
        feedbackDiv.style.cssText = 'display: block; text-align: center; padding: 1.5rem; background: rgba(0,0,0,0.5); border-radius: 10px; margin-top: 1rem;';
        feedbackDiv.innerHTML = `
            <div style="font-size: 2.5rem; margin-bottom: 0.8rem;">${isCorrect ? '✅' : '❌'}</div>
            <h3 style="color: ${isCorrect ? '#00ff00' : '#ff0000'}; margin-bottom: 1rem; font-size: 1.2rem;">
                ${isCorrect ? 'Correct! You climb the ladder!' : 'Wrong! You cannot climb the ladder!'}
            </h3>
            <button id="ladderContinueBtn" style="padding: 0.8rem 2rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; cursor: pointer; font-size: 1rem;">
                Continue
            </button>
        `;
        
        // Handle answer logic
        if (isCorrect) {
            if (player === 'player1') {
                player1Position = ladders[position];
            } else {
                player2Position = ladders[position];
            }
            addPoints(100);
        } else {
            // Stay at current position
        }
        
        // Add event listener to Continue button
        const continueBtn = document.getElementById('ladderContinueBtn');
        continueBtn.addEventListener('click', function() {
            closeLadderModal();
        });
    }

    function closeSnakeModal() {
        const modal = document.getElementById('snakeModal');
        if (modal && modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
        updatePlayerDisplay();
        // Redraw board to ensure players are visible
        drawBoard();
        switchPlayer();
    }

    function closeLadderModal() {
        const modal = document.getElementById('ladderModal');
        if (modal && modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
        updatePlayerDisplay();
        // Redraw board to ensure players are visible
        drawBoard();
        switchPlayer();
    }

    function switchPlayer() {
        if (gameOver || isAnimating) return;
        
        // Switch player
        currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
        updatePlayerDisplay();
        // Ensure board is visible after switching
        drawBoard();
    }

    function updatePlayerDisplay() {
        const player1Display = document.getElementById('player1Position');
        const player2Display = document.getElementById('player2Position');
        const currentPlayerDisplay = document.getElementById('currentPlayer');
        const diceBtn = document.getElementById('rollDiceBtn');
        
        if (player1Display) player1Display.textContent = player1Position;
        if (player2Display) player2Display.textContent = player2Position;
        if (currentPlayerDisplay) {
            const playerName = currentPlayer === 'player1' ? 'Player 1' : 'Player 2';
            const playerIcon = currentPlayer === 'player1' ? '👤' : '🤖';
            currentPlayerDisplay.textContent = `${playerIcon} ${playerName}'s Turn`;
            currentPlayerDisplay.style.color = currentPlayer === 'player1' ? '#0080ff' : '#ff4000';
        }
        if (diceBtn) {
            const shouldDisable = isAnimating || gameOver;
            diceBtn.disabled = shouldDisable;
            diceBtn.style.opacity = shouldDisable ? '0.5' : '1';
            diceBtn.style.cursor = shouldDisable ? 'not-allowed' : 'pointer';
        }
    }

    function showVictory(player) {
        const modal = document.createElement('div');
        modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.95); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 2rem;';
        const winnerName = player === 'player1' ? 'Player 1' : 'Player 2';
        const winnerIcon = player === 'player1' ? '👤' : '🤖';
        modal.innerHTML = `
            <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 3rem; border-radius: 20px; border: 3px solid rgba(0,255,255,0.5); max-width: 600px; text-align: center; box-shadow: 0 20px 60px rgba(0,255,255,0.3);">
                <div style="font-size: 5rem; margin-bottom: 1rem;">🎉</div>
                <h2 style="color: #00ffff; font-size: 2.5rem; margin-bottom: 1rem;">
                    ${winnerName} Wins!
                </h2>
                <p style="color: #ffffff; font-size: 1.2rem; margin-bottom: 2rem;">
                    ${winnerIcon} Congratulations! You reached 100 first!
                </p>
                <button onclick="location.reload()" style="padding: 1rem 2rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; cursor: pointer; font-size: 1.1rem;">
                    Play Again
                </button>
            </div>
        `;
        document.body.appendChild(modal);
        
        addPoints(500);
        addAchievement('snake-ladder-winner', 'Snake & Ladder Champion', 'Won the Snake & Ladder game!');
    }

    // Initialize
    drawBoard();
    updatePlayerDisplay();

    // Make rollDice available globally
    window.rollDice = rollDice;
}

    window.CyberArcadeGames['snake-ladder'] = {
                title: 'Cyber Snake & Ladder',
                content: `
            <div style="max-width: 1400px; margin: 0 auto; padding: 1rem;">
                <div style="background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 15px; margin-bottom: 1rem; text-align: center;">
                    <h2 style="color: #00ffff; margin-bottom: 0.8rem; font-size: 1.5rem;">🎲 Cyber Snake & Ladder</h2>
                    <div style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
                        <div style="color: #ffffff;">
                            <strong style="color: #0080ff;">👤 Player 1:</strong> <span id="player1Position" style="color: #0080ff; font-weight: bold; font-size: 1.1rem;">1</span>
                        </div>
                        <div style="color: #ffffff;">
                            <strong style="color: #ff4000;">🤖 Player 2:</strong> <span id="player2Position" style="color: #ff4000; font-weight: bold; font-size: 1.1rem;">1</span>
                            </div>
                        <div id="currentPlayer" style="color: #0080ff; font-weight: bold; font-size: 1rem;">👤 Player 1's Turn</div>
                                </div>
                            </div>
                
                <div style="display: grid; grid-template-columns: 0.7fr 2fr 0.7fr; gap: 1rem; align-items: start;">
                    <!-- Left Column: Dice Controls -->
                    <div style="background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 15px; border: 2px solid rgba(0,255,255,0.3);">
                        <div style="text-align: center; margin-bottom: 1rem;">
                            <h3 style="color: #00ffff; margin-bottom: 0.8rem; font-size: 1rem;">🎲 Roll Dice</h3>
                            <div id="dice" style="font-size: 2.5rem; margin-bottom: 0.8rem;">🎲</div>
                            <button id="rollDiceBtn" onclick="rollDice()" 
                                    style="padding: 0.8rem 1.2rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; font-size: 0.95rem; cursor: pointer; width: 100%; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0,255,255,0.3);"
                                    onmouseover="if(!this.disabled) this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(0,255,255,0.5)'"
                                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0,255,255,0.3)'">
                                Roll Dice
                            </button>
                        </div>
                        
                        <div style="background: rgba(0,0,0,0.3); padding: 0.9rem; border-radius: 10px; margin-top: 1rem;">
                            <h4 style="color: #00ffff; margin-bottom: 0.7rem; font-size: 0.85rem; text-align: center;">🎯 Game Info</h4>
                            <div style="color: #ffffff; font-size: 0.75rem; line-height: 1.6;">
                                <div style="margin-bottom: 0.6rem;">
                                    <strong style="color: #00ffff;">Objective:</strong><br>
                                    <span style="color: #cccccc;">Reach square 100 first!</span>
                                </div>
                                <div>
                                    <strong style="color: #00ffff;">Traps:</strong><br>
                                    <span style="color: #cccccc;">At least 3 traps per player.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Center Column: Game Board -->
                    <div style="display: flex; justify-content: center; align-items: center;">
                        <canvas id="snakeLadderCanvas" style="border: 3px solid rgba(0,255,255,0.4); border-radius: 15px; background: #0a0a0a; display: block; width: 100%; max-width: 650px; box-shadow: 0 10px 40px rgba(0,255,255,0.3);"></canvas>
                    </div>
                    
                    <!-- Right Column: Rules & Tips -->
                    <div style="background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 15px; border: 2px solid rgba(0,255,255,0.3);">
                        <div style="background: rgba(0,0,0,0.3); padding: 0.9rem; border-radius: 10px; margin-bottom: 1rem;">
                            <h4 style="color: #00ffff; margin-bottom: 0.7rem; font-size: 0.85rem; text-align: center;">📋 How to Play</h4>
                            <ul style="color: #ffffff; line-height: 1.7; font-size: 0.75rem; padding-left: 1rem; margin: 0;">
                                <li><strong style="color: #0080ff;">👤 Blue</strong> = Player 1</li>
                                <li><strong style="color: #ff4000;">🤖 Red</strong> = Player 2</li>
                                <li><strong style="color: #00ff00;">🪜 Ladder:</strong> Correct = climb</li>
                                <li><strong style="color: #ff0000;">🐍 Snake:</strong> Correct = avoid</li>
                                <li><strong style="color: #ffff00;">💡 Tips:</strong> Random tips!</li>
                                <li><strong style="color: #00ffff;">🏆 Win:</strong> Reach 100!</li>
                            </ul>
                        </div>
                        
                        <div style="background: rgba(0,0,0,0.3); padding: 0.9rem; border-radius: 10px;">
                            <h4 style="color: #00ffff; margin-bottom: 0.7rem; font-size: 0.85rem; text-align: center;">💡 Quick Tips</h4>
                            <div style="color: #ffffff; font-size: 0.7rem; line-height: 1.6;">
                                <div style="margin-bottom: 0.5rem;">✨ Take turns</div>
                                <div style="margin-bottom: 0.5rem;">✨ Answer correctly</div>
                                <div style="margin-bottom: 0.5rem;">✨ Avoid snakes</div>
                                <div>✨ Climb ladders</div>
                            </div>
                        </div>
                    </div>
                        </div>
                    </div>
                `,
                init: initSnakeLadderGame
            };
})();
