(function() {
    window.CyberArcadeGames = window.CyberArcadeGames || {};

// Initialize Caesar Cipher game
function initCaesarCipherGame() {
    const messages = [
        { text: "Hello World", shift: 1, answer: "Ifmmp Xpsme", hint: "Each letter moves forward by 1 position" },
        { text: "Cyber Security", shift: 2, answer: "Eadgt Ugewtvk{", hint: "A becomes C, B becomes D, and so on..." },
        { text: "Attack at once", shift: 3, answer: "Dwwdfn dw rqfh", hint: "Shift each letter 3 positions forward" },
        { text: "Keep it secret", shift: 4, answer: "Oii t mx wigxiv", hint: "K becomes O (K→L→M→N→O)" },
        { text: "Find the key", shift: 5, answer: "Knsi ymj pjd", hint: "F becomes K after 5 shifts" },
        { text: "Signal lost", shift: 6, answer: "Ymotgr r u yz", hint: "S becomes Y, I becomes O" },
        { text: "Guard the gate", shift: 7, answer: "Nbhai a ol n l", hint: "G becomes N after 7 shifts" },
        { text: "Plan B active", shift: 8, answer: "Xtie J ikbqdm", hint: "P becomes X, L becomes T" },
        { text: "Open the portal", shift: 9, answer: "Xy nw c noq ak u", hint: "O becomes X after 9 shifts" },
        { text: "Decode the map", shift: 10, answer: "No my no dro w z f", hint: "D becomes N after 10 shifts" }
    ];

    let currentMessage = 0;
    let score = 0;

    function generateCipherWheel(shift) {
        const wheel = document.getElementById('cipherWheel');
        if (!wheel) return;
        
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let html = '';
        
        for (let i = 0; i < alphabet.length; i++) {
            const original = alphabet[i];
            const shifted = alphabet[(i + shift) % 26];
            html += `
                <div style="display: flex; flex-direction: column; align-items: center; padding: 0.5rem; background: rgba(0,255,255,0.1); border-radius: 5px; min-width: 50px;">
                    <span style="color: #ffffff; font-size: 1rem;">${original}</span>
                    <span style="color: #00ffff; font-size: 0.8rem; margin: 0.25rem 0;">→</span>
                    <span style="color: #00ff00; font-size: 1rem;">${shifted}</span>
                </div>
            `;
        }
        
        wheel.innerHTML = html;
        if (document.getElementById('visualShift')) {
            document.getElementById('visualShift').textContent = shift;
        }
    }

    function showMessage() {
        if (currentMessage < messages.length) {
            const message = messages[currentMessage];
            document.getElementById('cipherMessage').textContent = message.text;
            document.getElementById('cipherShiftValue').textContent = message.shift;
            document.getElementById('cipherLevel').textContent = currentMessage + 1;
            document.getElementById('cipherTotal').textContent = messages.length;
            
            // Auto-fill decoder with current challenge
            const decoderInput = document.getElementById('decoderInput');
            const decoderShift = document.getElementById('decoderShift');
            if (decoderInput) decoderInput.value = message.text;
            if (decoderShift) decoderShift.value = message.shift;
            
            // Generate visual wheel
            generateCipherWheel(message.shift);
            
            // Clear answer input
            const answerInput = document.getElementById('cipherAnswer');
            if (answerInput) answerInput.value = '';
        } else {
            // Game complete
            const modal = document.createElement('div');
            modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.9); z-index: 3000; display: flex; align-items: center; justify-content: center;';
            modal.innerHTML = `
                <div style="background: #1a1a2e; padding: 3rem; border-radius: 20px; border: 3px solid #00ff00; text-align: center; max-width: 500px;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
                    <h2 style="color: #00ff00; margin-bottom: 1rem;">Congratulations!</h2>
                    <p style="color: #ffffff; font-size: 1.2rem; margin-bottom: 1.5rem;">You've mastered the Caesar Cipher!</p>
                    <div style="background: rgba(0,255,0,0.1); padding: 1rem; border-radius: 10px; margin-bottom: 1.5rem;">
                        <p style="color: #00ff00; font-size: 1.5rem; font-weight: bold;">Final Score: ${score}</p>
                    </div>
                    <button onclick="this.parentElement.parentElement.remove(); location.reload();" style="padding: 1rem 2rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 10px; color: #000; font-weight: bold; font-size: 1.1rem; cursor: pointer;">Play Again</button>
                </div>
            `;
            document.body.appendChild(modal);
            addAchievement('cipher_master', 'Cipher Master', 'Completed the Caesar Cipher Challenge!');
        }
    }

    window.decodeWithTool = function() {
        const input = document.getElementById('decoderInput').value;
        const shift = parseInt(document.getElementById('decoderShift').value) || 0;
        const output = document.getElementById('decoderOutput');
        
        if (!input) {
            output.textContent = 'Please enter text to decode';
            output.style.color = '#ff0000';
            return;
        }
        
        let decoded = '';
        for (let i = 0; i < input.length; i++) {
            let char = input[i];
            if (char.match(/[A-Z]/)) {
                char = String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
            } else if (char.match(/[a-z]/)) {
                char = String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
            }
            decoded += char;
        }
        
        output.textContent = decoded || 'Decoded text will appear here...';
        output.style.color = '#00ffff';
    };

    window.checkCipherAnswer = function() {
        const userAnswer = document.getElementById('cipherAnswer').value.trim();
        const correctAnswer = messages[currentMessage].answer;

        if (!userAnswer) {
            alert('Please enter an answer!');
            return;
        }

        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            score += 20;
            addPoints(20);
            document.getElementById('cipherScore').textContent = score;
            
            // Show success animation
            const messageDiv = document.getElementById('cipherMessage');
            messageDiv.style.background = 'rgba(0,255,0,0.3)';
            messageDiv.style.color = '#00ff00';
            setTimeout(() => {
                messageDiv.style.background = 'rgba(0,0,0,0.3)';
                messageDiv.style.color = '#ffffff';
            }, 1000);
            
            setTimeout(() => {
                currentMessage++;
                showMessage();
            }, 1500);
        } else {
            // Show hint
            const hint = messages[currentMessage].hint;
            alert(`❌ Incorrect!\n\n💡 Hint: ${hint}\n\nCorrect answer: ${correctAnswer}`);
        }
    };

    showMessage();
}

    window.CyberArcadeGames['caesar-cipher'] = {
                title: 'Caesar Cipher Challenge',
                content: `
                    <div class="cipher-game-container">
                        <div class="cipher-intro" style="text-align: center; margin-bottom: 2rem; padding: 1.5rem; background: rgba(0,255,255,0.1); border-radius: 10px;">
                            <h3 style="color: #00ffff; margin-bottom: 1rem;">🔐 Caesar Cipher - Ancient Encryption</h3>
                            <p style="color: #cccccc; line-height: 1.6;">
                                <strong>For Kids:</strong> Like a secret code where each letter moves forward! A becomes B, B becomes C...<br>
                                <strong>For Everyone:</strong> Shift each letter by a fixed number. It's how Julius Caesar sent secret messages 2000 years ago!
                            </p>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                            <div class="cipher-challenge" style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 10px; border: 2px solid rgba(0,255,255,0.3);">
                                <h3 style="color: #00ffff; margin-bottom: 1rem;">🎯 Challenge:</h3>
                                <div style="text-align: center; margin: 1.5rem 0;">
                                    <div style="font-size: 2rem; color: #ffd700; font-weight: bold; margin-bottom: 0.5rem;">📜</div>
                                    <div class="cipher-message" id="cipherMessage" style="font-size: 1.5rem; font-weight: bold; color: #ffffff; padding: 1rem; background: rgba(0,0,0,0.3); border-radius: 5px; font-family: monospace; letter-spacing: 2px;">Hello World</div>
                                </div>
                                <div class="cipher-shift-info" style="text-align: center; margin: 1rem 0;">
                                    <div style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: rgba(0,255,255,0.2); border-radius: 20px;">
                                        <span style="font-size: 1.5rem;">🔢</span>
                                        <p style="margin: 0; font-size: 1.2rem; color: #00ffff;">
                                            Shift: <span id="cipherShiftValue" style="font-weight: bold; font-size: 1.5rem;">3</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="cipher-input" style="margin-top: 1.5rem;">
                                    <input type="text" id="cipherAnswer" placeholder="Type your decoded message here..." style="width: 100%; padding: 1rem; font-size: 1.1rem; background: rgba(255,255,255,0.1); border: 2px solid rgba(0,255,255,0.3); border-radius: 5px; color: white; margin-bottom: 1rem;">
                                    <button class="btn btn-primary" onclick="checkCipherAnswer()" style="width: 100%; padding: 1rem; font-size: 1.1rem;">✅ Submit Answer</button>
                                </div>
                            </div>
                            
                            <div style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 10px; border: 2px solid rgba(0,255,255,0.3);">
                                <h3 style="color: #00ffff; margin-bottom: 1rem;">🛠️ Interactive Decoder Tool:</h3>
                                <p style="color: #cccccc; margin-bottom: 1rem; font-size: 0.9rem;">Use this tool to help you decode! Enter the encrypted text and shift value:</p>
                                <div style="margin-bottom: 1rem;">
                                    <input type="text" id="decoderInput" placeholder="Encrypted text" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(0,255,255,0.3); border-radius: 5px; color: white; margin-bottom: 0.5rem;">
                                    <input type="number" id="decoderShift" placeholder="Shift" min="1" max="25" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(0,255,255,0.3); border-radius: 5px; color: white; margin-bottom: 0.5rem;">
                                    <button onclick="decodeWithTool()" style="width: 100%; padding: 0.75rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 5px; color: #000; font-weight: bold; cursor: pointer;">🔓 Decode</button>
                                </div>
                                <div id="decoderOutput" style="padding: 1rem; background: rgba(0,255,255,0.1); border-radius: 5px; min-height: 60px; color: #00ffff; font-family: monospace; font-size: 1.1rem; text-align: center; display: flex; align-items: center; justify-content: center;">
                                    Decoded text will appear here...
                                </div>
                                
                                <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(255,215,0,0.1); border-radius: 5px; border-left: 3px solid #ffd700;">
                                    <strong style="color: #ffd700;">💡 How it works:</strong>
                                    <p style="color: #cccccc; margin-top: 0.5rem; font-size: 0.9rem; line-height: 1.5;">
                                        Each letter shifts forward by the shift number. For example, with shift 3:<br>
                                        A → D, B → E, C → F... Z → C (wraps around!)
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="cipher-visual-wheel" style="text-align: center; margin: 2rem 0; padding: 2rem; background: rgba(0,0,0,0.3); border-radius: 10px;">
                            <h4 style="color: #00ffff; margin-bottom: 1rem;">🎡 Visual Cipher Wheel (Shift <span id="visualShift">3</span>):</h4>
                            <div id="cipherWheel" style="display: flex; justify-content: center; gap: 0.5rem; flex-wrap: wrap; font-size: 1.2rem; font-weight: bold;">
                                <!-- Cipher wheel will be generated here -->
                            </div>
                        </div>
                        
                        <div class="cipher-score" style="text-align: center; padding: 1rem; background: rgba(0,255,0,0.1); border-radius: 10px; border: 2px solid rgba(0,255,0,0.3);">
                            <h4 style="color: #00ff00; margin: 0;">
                                🏆 Score: <span id="cipherScore" style="font-size: 1.5rem;">0</span> | 
                                Level: <span id="cipherLevel">1</span>/<span id="cipherTotal">10</span>
                            </h4>
                        </div>
                    </div>
                `,
                init: initCaesarCipherGame
            };
})();
