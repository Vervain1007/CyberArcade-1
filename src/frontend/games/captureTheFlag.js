(function() {
    window.CyberArcadeGames = window.CyberArcadeGames || {};

// Initialize Capture The Flag game
function initCTFGame() {
    window.startCTFChallenge = function(challengeType) {
        const challenges = {
            crypto: {
                title: "🔐 Cryptography Challenge - Caesar Cipher",
                description: "Decrypt this message using Caesar cipher with shift 13 (ROT13):",
                encrypted: "GUR FRPERG ZRFFNTR VF: CTF{CRYPTO_MASTER_2024}",
                tutorial: `
                    <div class="ctf-tutorial">
                        <h4>📚 How to Solve Caesar Cipher:</h4>
                        <ol>
                            <li><strong>Understand Caesar Cipher:</strong> Each letter is shifted by a fixed number. ROT13 shifts by 13 positions.</li>
                            <li><strong>Use the Tool Below:</strong> Enter the encrypted text and shift value (13) to decrypt.</li>
                            <li><strong>Find the Flag:</strong> The flag format is CTF{...} - extract it from the decrypted message.</li>
                        </ol>
                        <div class="cipher-tool">
                            <h5>🔧 Caesar Cipher Decoder Tool:</h5>
                            <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                                <input type="text" id="cipherInput" placeholder="Enter encrypted text" 
                                    value="GUR FRPERG ZRFFNTR VF: CTF{CRYPTO_MASTER_2024}" 
                                    style="flex: 1; padding: 0.5rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(0,255,255,0.3); border-radius: 5px; color: white;">
                                <input type="number" id="cipherShift" value="13" min="1" max="25" 
                                    style="width: 80px; padding: 0.5rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(0,255,255,0.3); border-radius: 5px; color: white;">
                                <button onclick="decodeCaesar()" style="padding: 0.5rem 1rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 5px; color: #000; font-weight: bold; cursor: pointer;">Decode</button>
                            </div>
                            <div id="cipherOutput" style="padding: 1rem; background: rgba(0,255,255,0.1); border-radius: 5px; min-height: 50px; color: #00ffff; font-family: monospace;"></div>
                        </div>
                        <div class="tutorial-tip">
                            <strong>💡 Tip:</strong> ROT13 is special because applying it twice returns the original text. A→N→A, B→O→B, etc.
                        </div>
                    </div>
                `,
                hint: "ROT13 is a special case of Caesar cipher where shift = 13. Use the decoder tool above!",
                solution: "CTF{CRYPTO_MASTER_2024}",
                points: 200
            },
            web: {
                title: "🌐 Web Exploitation Challenge",
                description: "Find the hidden flag in this simulated web application:",
                scenario: "You're testing a login page. The admin panel is at /admin but requires authentication. The flag is hidden in the source code.",
                tutorial: `
                    <div class="ctf-tutorial">
                        <h4>📚 How to Find Hidden Flags in Web Pages:</h4>
                        <ol>
                            <li><strong>View Page Source:</strong> Right-click → "View Page Source" or press Ctrl+U (Cmd+U on Mac)</li>
                            <li><strong>Look for Comments:</strong> HTML comments like &lt;!-- FLAG: CTF{...} --&gt; often contain flags</li>
                            <li><strong>Check Hidden Elements:</strong> Look for hidden input fields or divs with display:none</li>
                            <li><strong>Inspect JavaScript:</strong> Check script tags for hardcoded flags</li>
                        </ol>
                        <div class="web-simulator" style="margin-top: 1rem;">
                            <h5>🔧 Simulated Web Page:</h5>
                            <div style="border: 1px solid rgba(0,255,255,0.3); border-radius: 5px; padding: 1rem; background: rgba(255,255,255,0.05);">
                                <div style="margin-bottom: 1rem;">
                                    <h4 style="color: #00ffff;">Admin Login</h4>
                                    <input type="text" placeholder="Username" style="padding: 0.5rem; margin-right: 0.5rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(0,255,255,0.3); border-radius: 3px; color: white;">
                                    <input type="password" placeholder="Password" style="padding: 0.5rem; margin-right: 0.5rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(0,255,255,0.3); border-radius: 3px; color: white;">
                                    <button onclick="alert('Login functionality disabled in demo')" style="padding: 0.5rem 1rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 3px; color: #000; font-weight: bold; cursor: pointer;">Login</button>
                                </div>
                                <button onclick="showWebSource()" style="padding: 0.5rem 1rem; background: rgba(255, 215, 0, 0.2); border: 1px solid rgba(255, 215, 0, 0.5); border-radius: 5px; color: #ffd700; cursor: pointer;">🔍 View Page Source</button>
                                <div id="webSource" style="display: none; margin-top: 1rem; padding: 1rem; background: rgba(0,0,0,0.5); border-radius: 5px; font-family: monospace; font-size: 0.9rem; max-height: 300px; overflow-y: auto;">
                                    <pre style="color: #00ffff; margin: 0;">&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Admin Panel&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;!-- FLAG: CTF{WEB_EXPLOIT_MASTER} --&gt;
    &lt;h1&gt;Admin Login&lt;/h1&gt;
    &lt;form&gt;
        &lt;input type="text" placeholder="Username"&gt;
        &lt;input type="password" placeholder="Password"&gt;
        &lt;button&gt;Login&lt;/button&gt;
    &lt;/form&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
                                </div>
                            </div>
                        </div>
                        <div class="tutorial-tip" style="margin-top: 1rem; padding: 1rem; background: rgba(0,255,255,0.1); border-radius: 5px; border-left: 3px solid #00ffff;">
                            <strong>💡 Tip:</strong> Always check the page source! Developers often leave comments or hidden elements with flags.
                        </div>
                    </div>
                `,
                hint: "Check the page source for HTML comments. Click 'View Page Source' above!",
                solution: "CTF{WEB_EXPLOIT_MASTER}",
                points: 300
            },
            forensics: {
                title: "🔍 Digital Forensics Challenge - Image Analysis",
                description: "Analyze this suspicious image file and find the hidden flag:",
                scenario: "A suspicious image file was found on a compromised system. The flag is hidden in the image metadata.",
                tutorial: `
                    <div class="ctf-tutorial">
                        <h4>📚 How to Analyze Image Metadata:</h4>
                        <ol>
                            <li><strong>Check EXIF Data:</strong> Image files contain metadata (EXIF) that can reveal hidden information.</li>
                            <li><strong>Use Tools:</strong> Tools like exiftool, strings, or hex editors can extract metadata.</li>
                            <li><strong>Look for Flags:</strong> The flag might be in comments, artist fields, or other metadata fields.</li>
                        </ol>
                        <div class="forensics-simulator" style="margin-top: 1rem;">
                            <h5>🔧 Simulated Image Analysis Tool:</h5>
                            <div style="border: 1px solid rgba(0,255,255,0.3); border-radius: 5px; padding: 1rem; background: rgba(255,255,255,0.05);">
                                <div style="display: grid; grid-template-columns: 200px 1fr; gap: 1rem; margin-bottom: 1rem;">
                                    <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 5px; text-align: center;">
                                        <div style="font-size: 3rem; margin-bottom: 0.5rem;">🖼️</div>
                                        <div style="color: #00ffff; font-size: 0.9rem;">suspicious.jpg</div>
                                    </div>
                                    <div>
                                        <button onclick="analyzeImageMetadata()" style="padding: 0.75rem 1.5rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 5px; color: #000; font-weight: bold; cursor: pointer; margin-bottom: 1rem;">🔍 Analyze Metadata</button>
                                        <div id="metadataOutput" style="display: none; background: rgba(0,0,0,0.5); padding: 1rem; border-radius: 5px; font-family: monospace; font-size: 0.9rem; max-height: 300px; overflow-y: auto;">
                                            <div style="color: #00ffff;">EXIF Data:</div>
                                            <div style="color: #ffffff; margin-top: 0.5rem; line-height: 1.8;">
                                                <div>Camera: Canon EOS 5D</div>
                                                <div>Date: 2024-01-15</div>
                                                <div>Artist: <span style="color: #00ff00; font-weight: bold;">CTF{FORENSICS_EXPERT}</span></div>
                                                <div>Software: Photoshop CS6</div>
                                                <div>Comment: Suspicious file found on server</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tutorial-tip" style="margin-top: 1rem; padding: 1rem; background: rgba(0,255,255,0.1); border-radius: 5px; border-left: 3px solid #00ffff;">
                            <strong>💡 Tip:</strong> In real forensics, use tools like <code>exiftool suspicious.jpg</code> or <code>strings suspicious.jpg | grep CTF</code> to extract metadata.
                        </div>
                    </div>
                `,
                hint: "Check the image metadata. Click 'Analyze Metadata' above!",
                solution: "CTF{FORENSICS_EXPERT}",
                points: 400
            },
            reverse: {
                title: "🔄 Reverse Engineering Challenge",
                description: "Analyze this binary and find the hidden flag:",
                scenario: "A suspicious executable was found. When run, it asks for a password. Find the correct password to get the flag.",
                tutorial: `
                    <div class="ctf-tutorial">
                        <h4>📚 How to Reverse Engineer a Binary:</h4>
                        <ol>
                            <li><strong>Disassemble:</strong> Use tools like objdump, Ghidra, or IDA to disassemble the binary.</li>
                            <li><strong>Find Strings:</strong> Use <code>strings</code> command to find readable text in the binary.</li>
                            <li><strong>Analyze Logic:</strong> Look for password comparison functions and hardcoded values.</li>
                            <li><strong>Extract Flag:</strong> The flag is often stored as a string or constructed from hardcoded values.</li>
                        </ol>
                        <div class="reverse-simulator" style="margin-top: 1rem;">
                            <h5>🔧 Simulated Binary Analysis:</h5>
                            <div style="border: 1px solid rgba(0,255,255,0.3); border-radius: 5px; padding: 1rem; background: rgba(255,255,255,0.05);">
                                <div style="margin-bottom: 1rem;">
                                    <button onclick="runStringsCommand()" style="padding: 0.75rem 1.5rem; background: rgba(255, 215, 0, 0.2); border: 1px solid rgba(255, 215, 0, 0.5); border-radius: 5px; color: #ffd700; cursor: pointer; margin-right: 0.5rem;">🔍 Run strings command</button>
                                    <button onclick="disassembleBinary()" style="padding: 0.75rem 1.5rem; background: rgba(0,255,255,0.2); border: 1px solid rgba(0,255,255,0.5); border-radius: 5px; color: #00ffff; cursor: pointer;">📖 Disassemble Binary</button>
                                </div>
                                <div id="reverseOutput" style="display: none; background: rgba(0,0,0,0.5); padding: 1rem; border-radius: 5px; font-family: monospace; font-size: 0.85rem; max-height: 400px; overflow-y: auto; color: #00ffff; line-height: 1.6;"></div>
                            </div>
                        </div>
                        <div class="tutorial-tip" style="margin-top: 1rem; padding: 1rem; background: rgba(0,255,255,0.1); border-radius: 5px; border-left: 3px solid #00ffff;">
                            <strong>💡 Tip:</strong> In real reverse engineering, use <code>strings binary.exe | grep -i password</code> or disassemble with Ghidra/IDA to find hardcoded passwords.
                        </div>
                    </div>
                `,
                hint: "Use the analysis tools above. The password is hardcoded in the binary!",
                solution: "CTF{REVERSE_ENGINEER}",
                points: 500
            },
            pwn: {
                title: "💥 Binary Exploitation Challenge",
                description: "Exploit this vulnerable binary to get shell access:",
                scenario: "A server application has a buffer overflow vulnerability. Craft an exploit to gain remote code execution.",
                tutorial: `
                    <div class="ctf-tutorial">
                        <h4>📚 How to Exploit Buffer Overflow:</h4>
                        <ol>
                            <li><strong>Identify Vulnerability:</strong> Find functions that don't check input length (strcpy, gets, etc.)</li>
                            <li><strong>Find Buffer Size:</strong> Determine how many bytes until you overwrite the return address.</li>
                            <li><strong>Craft Payload:</strong> Create a payload with shellcode and return address.</li>
                            <li><strong>Execute:</strong> Send the payload to trigger the overflow and get shell access.</li>
                        </ol>
                        <div class="pwn-simulator" style="margin-top: 1rem;">
                            <h5>🔧 Simulated Buffer Overflow Exploit:</h5>
                            <div style="border: 1px solid rgba(0,255,255,0.3); border-radius: 5px; padding: 1rem; background: rgba(255,255,255,0.05);">
                                <div style="margin-bottom: 1rem;">
                                    <label style="color: #ffffff; display: block; margin-bottom: 0.5rem;">Vulnerable Function:</label>
                                    <div style="background: rgba(0,0,0,0.5); padding: 1rem; border-radius: 5px; font-family: monospace; color: #ff6b6b; margin-bottom: 1rem;">
                                        <div>void vulnerable_function(char *input) {</div>
                                        <div style="margin-left: 2rem;">char buffer[64];</div>
                                        <div style="margin-left: 2rem; color: #ff0000;">strcpy(buffer, input); // No bounds check!</div>
                                        <div>}</div>
                                    </div>
                                </div>
                                <div style="margin-bottom: 1rem;">
                                    <label style="color: #ffffff; display: block; margin-bottom: 0.5rem;">Craft Your Exploit Payload:</label>
                                    <input type="text" id="pwnPayload" placeholder="Enter payload (e.g., A*64 + return_address + shellcode)" 
                                        style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(0,255,255,0.3); border-radius: 5px; color: white; font-family: monospace; margin-bottom: 0.5rem;">
                                    <button onclick="exploitBufferOverflow()" style="padding: 0.75rem 1.5rem; background: linear-gradient(45deg, #ff6b6b, #ff0000); border: none; border-radius: 5px; color: #ffffff; font-weight: bold; cursor: pointer;">💥 Execute Exploit</button>
                                </div>
                                <div id="pwnOutput" style="display: none; background: rgba(0,0,0,0.5); padding: 1rem; border-radius: 5px; font-family: monospace; font-size: 0.9rem; color: #00ff00; line-height: 1.6;"></div>
                            </div>
                        </div>
                        <div class="tutorial-tip" style="margin-top: 1rem; padding: 1rem; background: rgba(255,107,107,0.1); border-radius: 5px; border-left: 3px solid #ff6b6b;">
                            <strong>💡 Tip:</strong> In real exploitation, use tools like pwntools, gdb, or radare2. The flag is: <code>CTF{PWN_MASTER}</code>
                        </div>
                    </div>
                `,
                hint: "Buffer is 64 bytes. Overwrite with 64 A's + return address + shellcode. Or just enter the flag directly!",
                solution: "CTF{PWN_MASTER}",
                points: 600
            },
            stego: {
                title: "🖼️ Steganography Challenge",
                description: "Find the hidden message in this image:",
                scenario: "A suspect sent an image file. Intelligence suggests it contains hidden information.",
                tutorial: `
                    <div class="ctf-tutorial">
                        <h4>📚 How to Extract Hidden Data from Images:</h4>
                        <ol>
                            <li><strong>LSB Steganography:</strong> Data can be hidden in the Least Significant Bits of pixel values.</li>
                            <li><strong>Tools:</strong> Use tools like steghide, zsteg, or online steganography decoders.</li>
                            <li><strong>Methods:</strong> Try different extraction methods - LSB, metadata, or hidden files.</li>
                            <li><strong>Password:</strong> Some steganography requires a password - try common ones or brute force.</li>
                        </ol>
                        <div class="stego-simulator" style="margin-top: 1rem;">
                            <h5>🔧 Simulated Steganography Tool:</h5>
                            <div style="border: 1px solid rgba(0,255,255,0.3); border-radius: 5px; padding: 1rem; background: rgba(255,255,255,0.05);">
                                <div style="display: grid; grid-template-columns: 200px 1fr; gap: 1rem; margin-bottom: 1rem;">
                                    <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 5px; text-align: center;">
                                        <div style="font-size: 3rem; margin-bottom: 0.5rem;">🖼️</div>
                                        <div style="color: #00ffff; font-size: 0.9rem;">suspicious_image.png</div>
                                    </div>
                                    <div>
                                        <div style="margin-bottom: 1rem;">
                                            <label style="color: #ffffff; display: block; margin-bottom: 0.5rem;">Extraction Method:</label>
                                            <select id="stegoMethod" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(0,255,255,0.3); border-radius: 5px; color: white; margin-bottom: 0.5rem;">
                                                <option value="lsb">LSB (Least Significant Bit)</option>
                                                <option value="metadata">Metadata Extraction</option>
                                                <option value="strings">Strings Extraction</option>
                                                <option value="zsteg">Zsteg Analysis</option>
                                            </select>
                                            <button onclick="extractStegoData()" style="padding: 0.75rem 1.5rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 5px; color: #000; font-weight: bold; cursor: pointer; width: 100%;">🔍 Extract Hidden Data</button>
                                        </div>
                                        <div id="stegoOutput" style="display: none; background: rgba(0,0,0,0.5); padding: 1rem; border-radius: 5px; font-family: monospace; font-size: 0.9rem; max-height: 300px; overflow-y: auto; color: #00ff00; line-height: 1.6;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tutorial-tip" style="margin-top: 1rem; padding: 1rem; background: rgba(0,255,255,0.1); border-radius: 5px; border-left: 3px solid #00ffff;">
                            <strong>💡 Tip:</strong> In real steganography, use <code>steghide extract -sf image.jpg</code> or <code>zsteg image.png</code> to extract hidden data.
                        </div>
                    </div>
                `,
                hint: "Use the extraction tool above. Try LSB method first!",
                solution: "CTF{STEGO_EXPERT}",
                points: 350
            },
            crypto2: {
                title: "🔐 Advanced Cryptography",
                description: "Break this RSA encryption:",
                scenario: "Intercepted encrypted message. The public key is (n=143, e=7). Decrypt the message.",
                hint: "Factor n to find p and q, then calculate the private key d.",
                solution: "CTF{RSA_BREAKER}",
                points: 700
            },
            web2: {
                title: "🌐 SQL Injection Challenge",
                description: "Exploit the SQL injection vulnerability:",
                scenario: "A login form is vulnerable to SQL injection. Bypass authentication and extract the flag.",
                hint: "Try ' OR '1'='1' -- as username. The flag is in the users table.",
                solution: "CTF{SQL_INJECTION_MASTER}",
                points: 450
            },
            forensics2: {
                title: "🔍 Memory Forensics",
                description: "Analyze this memory dump:",
                scenario: "A system was compromised. Analyze the memory dump to find evidence of the attack.",
                hint: "Look for suspicious processes and network connections. The flag is in a process name.",
                solution: "CTF{MEMORY_FORENSICS}",
                points: 550
            },
            crypto3: {
                title: "🔐 Vigenère Cipher",
                description: "Decrypt this Vigenère cipher:",
                scenario: "Intercepted encrypted message. The key is 'CYBER'. Decrypt using Vigenère cipher.",
                hint: "Use the Vigenère square. Each letter is shifted by the corresponding key letter.",
                solution: "CTF{VIGENERE_CRACKER}",
                points: 300
            },
            web3: {
                title: "🌐 XSS Challenge",
                description: "Exploit the Cross-Site Scripting vulnerability:",
                scenario: "A search form is vulnerable to XSS. Inject JavaScript to steal the admin's session cookie.",
                hint: "Try <script>alert('XSS')</script> first. The flag is in the admin's cookie.",
                solution: "CTF{XSS_EXPLOITER}",
                points: 400
            },
            forensics3: {
                title: "🔍 Network Forensics",
                description: "Analyze this network traffic:",
                scenario: "Suspicious network activity detected. Analyze the pcap file to find the attacker's IP.",
                hint: "Look for unusual traffic patterns. The flag is the attacker's IP address.",
                solution: "CTF{NETWORK_FORENSICS}",
                points: 450
            },
            crypto4: {
                title: "🔐 Base64 & Hex Challenge",
                description: "Decode this multi-layer encoding:",
                scenario: "Message is encoded multiple times. Decode: 48656c6c6f20576f726c64",
                hint: "First convert hex to ASCII, then decode the Base64.",
                solution: "CTF{ENCODING_MASTER}",
                points: 250
            },
            web4: {
                title: "🌐 Directory Traversal",
                description: "Exploit the path traversal vulnerability:",
                scenario: "A file download feature is vulnerable to directory traversal. Access /etc/passwd to get the flag.",
                hint: "Try ../../../etc/passwd in the filename parameter.",
                solution: "CTF{PATH_TRAVERSAL}",
                points: 350
            },
            forensics4: {
                title: "🔍 File Carving",
                description: "Recover deleted files from this disk image:",
                scenario: "A USB drive was found. Recover the deleted files to find the hidden flag.",
                hint: "Look for file signatures. The flag is in a deleted text file.",
                solution: "CTF{FILE_CARVER}",
                points: 400
            }
        };

        const challenge = challenges[challengeType];
        if (!challenge) return;

        // Create challenge modal
        const modal = document.createElement('div');
        modal.className = 'ctf-challenge-modal';
        modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 2rem;';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px; max-height: 90vh; overflow-y: auto; background: #1a1a2e; border-radius: 15px; padding: 2rem; position: relative; border: 2px solid rgba(0,255,255,0.3);">
                <button onclick="closeCTFChallenge()" style="position: absolute; top: 1rem; right: 1rem; background: rgba(255,0,0,0.2); border: 1px solid #ff0000; color: #ff0000; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 1.2rem; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;" onmouseover="this.style.background='rgba(255,0,0,0.4)'" onmouseout="this.style.background='rgba(255,0,0,0.2)'">×</button>
                <div class="challenge-header" style="margin-bottom: 1.5rem;">
                    <h3 style="margin: 0; color: #00ffff;">${challenge.title}</h3>
                    <div class="challenge-points" style="color: #ffd700; font-weight: bold; margin-top: 0.5rem;">${challenge.points} points</div>
                </div>
                <div class="challenge-body">
                    <p class="challenge-description">${challenge.description}</p>
                    ${challenge.scenario ? `
                    <div class="challenge-scenario">
                            <h4>📖 Scenario:</h4>
                        <p>${challenge.scenario}</p>
                    </div>
                    ` : ''}
                    <div class="challenge-data">
                        <h4>🔑 Encrypted Data:</h4>
                        <div class="data-box" style="background: rgba(0,0,0,0.5); padding: 1rem; border-radius: 5px; font-family: monospace; word-break: break-all;">${challenge.encrypted || challenge.scenario}</div>
                    </div>
                    ${challenge.tutorial || ''}
                    <div class="challenge-input" style="margin-top: 2rem;">
                        <label style="display: block; margin-bottom: 0.5rem;"><strong>Enter the flag (format: CTF{...}):</strong></label>
                        <div style="display: flex; gap: 0.5rem;">
                            <input type="text" id="flagInput" placeholder="CTF{...}" style="flex: 1; padding: 0.75rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(0,255,255,0.3); border-radius: 5px; color: white;">
                            <button onclick="submitFlag('${challengeType}')" style="padding: 0.75rem 1.5rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 5px; color: #000; font-weight: bold; cursor: pointer;">Submit Flag</button>
                        </div>
                    </div>
                    <div class="challenge-hint" style="margin-top: 1rem;">
                        <button onclick="showHint('${challengeType}')" style="padding: 0.5rem 1rem; background: rgba(255, 215, 0, 0.2); border: 1px solid rgba(255, 215, 0, 0.5); border-radius: 5px; color: #ffd700; cursor: pointer;">💡 Show Hint</button>
                        <div id="hintText" style="display: none; margin-top: 1rem; padding: 1rem; background: rgba(255, 215, 0, 0.1); border-radius: 5px; border-left: 3px solid #ffd700;">
                            <strong>Hint:</strong> ${challenge.hint}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Store challenge data globally
        window.currentCTFChallenge = challenge;
    };

    window.submitFlag = function(challengeType) {
        const userInput = document.getElementById('flagInput').value.trim();
        const challenge = window.currentCTFChallenge;

        if (userInput === challenge.solution) {
            alert('🎉 Correct! Flag captured successfully!');
            addPoints(challenge.points);
            addAchievement('ctf_master', 'CTF Master', `Completed ${challengeType} challenge!`);
            document.body.removeChild(document.querySelector('.ctf-challenge-modal'));
        } else {
            alert('❌ Incorrect flag. Try again!');
        }
    };

    window.showHint = function(challengeType) {
        const hintText = document.getElementById('hintText');
        hintText.style.display = hintText.style.display === 'none' ? 'block' : 'none';
    };

    window.closeCTFChallenge = function() {
        const modal = document.querySelector('.ctf-challenge-modal');
        if (modal) {
            document.body.removeChild(modal);
        }
    };

    // Caesar Cipher Decoder Tool
    window.decodeCaesar = function() {
        const input = document.getElementById('cipherInput').value;
        const shift = parseInt(document.getElementById('cipherShift').value) || 13;
        const output = document.getElementById('cipherOutput');
        
        let decoded = '';
        for (let i = 0; i < input.length; i++) {
            let char = input[i];
            if (char.match(/[A-Z]/)) {
                char = String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
            } else if (char.match(/[a-z]/)) {
                char = String.fromCharCode(((char.charCodeAt(0) - 97 - shift + 26) % 26) + 97);
            }
            decoded += char;
        }
        
        output.innerHTML = `<strong>Decoded:</strong> ${decoded}`;
        
        // Highlight flag if found
        const flagMatch = decoded.match(/CTF\{[^}]+\}/);
        if (flagMatch) {
            output.innerHTML += `<br><br><span style="color: #00ff00; font-weight: bold;">🎉 Flag Found: ${flagMatch[0]}</span>`;
        }
    };

    // Web Source Viewer
    window.showWebSource = function() {
        const sourceDiv = document.getElementById('webSource');
        if (sourceDiv) {
            sourceDiv.style.display = sourceDiv.style.display === 'none' ? 'block' : 'none';
        }
    };
}

    // Interactive simulation functions for CTF challenges
    window.analyzeImageMetadata = function() {
        const output = document.getElementById('metadataOutput');
        if (output) {
            output.style.display = 'block';
            output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    window.runStringsCommand = function() {
        const output = document.getElementById('reverseOutput');
        if (output) {
            output.style.display = 'block';
            output.innerHTML = `
                <div style="color: #ffd700; margin-bottom: 0.5rem;">$ strings binary.exe</div>
                <div style="color: #ffffff; line-height: 1.8;">
                    <div>Enter password:</div>
                    <div style="color: #00ff00; font-weight: bold;">CTF{REVERSE_ENGINEER}</div>
                    <div>Wrong password!</div>
                    <div>Access denied</div>
                </div>
                <div style="color: #00ffff; margin-top: 1rem; font-size: 0.85rem;">
                    💡 Found hardcoded flag in strings!
                </div>
            `;
            output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    window.disassembleBinary = function() {
        const output = document.getElementById('reverseOutput');
        if (output) {
            output.style.display = 'block';
            output.innerHTML = `
                <div style="color: #ffd700; margin-bottom: 0.5rem;">$ objdump -d binary.exe | grep -A 10 "password"</div>
                <div style="color: #ffffff; line-height: 1.6; font-size: 0.8rem;">
                    <div>401234: mov $0x4643547b, %eax  ; "CTF{"</div>
                    <div>401239: cmp %eax, %edx</div>
                    <div>40123b: je 401250</div>
                    <div style="color: #00ff00; margin-top: 0.5rem;">
                        💡 Found flag in assembly: CTF{REVERSE_ENGINEER}
                    </div>
                </div>
            `;
            output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    window.exploitBufferOverflow = function() {
        const payload = document.getElementById('pwnPayload')?.value || '';
        const output = document.getElementById('pwnOutput');
        if (output) {
            output.style.display = 'block';
            if (payload.toLowerCase().includes('pwn') || payload.toLowerCase().includes('ctf')) {
                output.innerHTML = `
                    <div style="color: #00ff00; margin-bottom: 0.5rem;">$ ./vulnerable_program</div>
                    <div style="color: #ffffff; line-height: 1.8;">
                        <div>Buffer overflow detected!</div>
                        <div style="color: #00ff00; font-weight: bold;">Flag: CTF{PWN_MASTER}</div>
                        <div>Shell access granted!</div>
                    </div>
                `;
            } else {
                output.innerHTML = `
                    <div style="color: #ff6b6b; margin-bottom: 0.5rem;">$ ./vulnerable_program</div>
                    <div style="color: #ffffff; line-height: 1.8;">
                        <div>Segmentation fault</div>
                        <div style="color: #ffd700; margin-top: 0.5rem;">💡 Try: 64 A's + return address + shellcode</div>
                        <div style="color: #ffd700;">Or enter the flag directly: CTF{PWN_MASTER}</div>
                    </div>
                `;
            }
            output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    window.extractStegoData = function() {
        const method = document.getElementById('stegoMethod')?.value || 'lsb';
        const output = document.getElementById('stegoOutput');
        if (output) {
            output.style.display = 'block';
            const methods = {
                lsb: {
                    command: '$ zsteg suspicious_image.png',
                    result: 'CTF{STEGO_EXPERT}',
                    description: 'LSB extraction successful!'
                },
                metadata: {
                    command: '$ exiftool suspicious_image.png',
                    result: 'No flag in metadata',
                    description: 'Try LSB method instead'
                },
                strings: {
                    command: '$ strings suspicious_image.png | grep CTF',
                    result: 'CTF{STEGO_EXPERT}',
                    description: 'Found flag in image strings!'
                },
                zsteg: {
                    command: '$ zsteg -a suspicious_image.png',
                    result: 'CTF{STEGO_EXPERT}',
                    description: 'Zsteg analysis successful!'
                }
            };
            const methodData = methods[method] || methods.lsb;
            output.innerHTML = `
                <div style="color: #ffd700; margin-bottom: 0.5rem;">${methodData.command}</div>
                <div style="color: #00ff00; font-weight: bold; margin: 0.5rem 0;">${methodData.result}</div>
                <div style="color: #00ffff; font-size: 0.85rem;">${methodData.description}</div>
            `;
            output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    window.CyberArcadeGames['capture-the-flag'] = {
                title: 'Capture The Flag (CTF)',
                content: `
                    <div class="ctf-container">
                        <div class="ctf-header">
                            <div class="ctf-title">🏴 Capture The Flag Challenge</div>
                            <div class="ctf-subtitle">Professional cybersecurity competition</div>
                        </div>
                        <div class="ctf-challenges">
                            <div class="challenge-card" data-challenge="crypto">
                                <div class="challenge-icon">🔐</div>
                                <div class="challenge-info">
                                    <h4>Cryptography (4 Challenges)</h4>
                                    <p>Caesar, RSA, Vigenère, and encoding challenges</p>
                                    <div class="challenge-difficulty">Medium</div>
                                </div>
                                <button class="challenge-btn" onclick="startCTFChallenge('crypto')">Start</button>
                            </div>
                            <div class="challenge-card" data-challenge="web">
                                <div class="challenge-icon">🌐</div>
                                <div class="challenge-info">
                                    <h4>Web Exploitation (4 Challenges)</h4>
                                    <p>SQL Injection, XSS, Directory Traversal, and more</p>
                                    <div class="challenge-difficulty">Hard</div>
                                </div>
                                <button class="challenge-btn" onclick="startCTFChallenge('web')">Start</button>
                            </div>
                            <div class="challenge-card" data-challenge="forensics">
                                <div class="challenge-icon">🔍</div>
                                <div class="challenge-info">
                                    <h4>Digital Forensics (4 Challenges)</h4>
                                    <p>Memory, Network, File Carving, and Steganography</p>
                                    <div class="challenge-difficulty">Expert</div>
                                </div>
                                <button class="challenge-btn" onclick="startCTFChallenge('forensics')">Start</button>
                            </div>
                            <div class="challenge-card" data-challenge="reverse">
                                <div class="challenge-icon">🔄</div>
                                <div class="challenge-info">
                                    <h4>Reverse Engineering</h4>
                                    <p>Analyze binaries and crack password protection</p>
                                    <div class="challenge-difficulty">Expert</div>
                                </div>
                                <button class="challenge-btn" onclick="startCTFChallenge('reverse')">Start</button>
                            </div>
                            <div class="challenge-card" data-challenge="pwn">
                                <div class="challenge-icon">💥</div>
                                <div class="challenge-info">
                                    <h4>Binary Exploitation</h4>
                                    <p>Buffer overflows and remote code execution</p>
                                    <div class="challenge-difficulty">Expert</div>
                                </div>
                                <button class="challenge-btn" onclick="startCTFChallenge('pwn')">Start</button>
                            </div>
                            <div class="challenge-card" data-challenge="stego">
                                <div class="challenge-icon">🖼️</div>
                                <div class="challenge-info">
                                    <h4>Steganography</h4>
                                    <p>Find hidden messages in images and files</p>
                                    <div class="challenge-difficulty">Medium</div>
                                </div>
                                <button class="challenge-btn" onclick="startCTFChallenge('stego')">Start</button>
                            </div>
                        </div>
                        <div class="ctf-scoreboard">
                            <h4>Scoreboard</h4>
                            <div class="score-item">
                                <span class="score-rank">1st</span>
                                <span class="score-name">CyberMaster</span>
                                <span class="score-points">1250 pts</span>
                            </div>
                            <div class="score-item">
                                <span class="score-rank">2nd</span>
                                <span class="score-name">HackNinja</span>
                                <span class="score-points">980 pts</span>
                            </div>
                            <div class="score-item">
                                <span class="score-rank">3rd</span>
                                <span class="score-name">CodeBreaker</span>
                                <span class="score-points">750 pts</span>
                            </div>
                        </div>
                    </div>
                `,
                init: initCTFGame
            };
})();
