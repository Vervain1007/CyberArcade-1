(function() {
    window.CyberArcadeGames = window.CyberArcadeGames || {};

// Initialize Password Cracker game
function initPasswordCrackerGame() {
    let isCracking = false;
    let attempts = 0;
    let currentAttack = 'dictionary';
    let currentTarget = 'user';

    const attackMethods = {
        'dictionary': {
            name: 'Dictionary Attack',
            description: 'Try common passwords from a dictionary',
            passwords: ['password', '123456', 'admin', 'qwerty', 'letmein', 'welcome', 'monkey', 'dragon', 'master', 'hello', 'iloveyou', 'princess', 'rockyou', '1234567890', 'abc123', 'nicole', 'daniel', 'babygirl', 'monkey', 'lovely', 'jessica', '654321', 'michael', 'ashley', 'qwerty', '111111', 'iloveyou', '000000', 'michelle', 'tigger', 'sunshine', 'chocolate', 'password1', 'soccer', 'anthony', 'friends', 'butterfly', 'purple', 'angel', 'jordan', 'liverpool', 'justin', 'loveme', 'fuckyou', '123123', 'football', 'secret', 'andrea', 'carlos', 'jennifer', 'joshua', 'basketball', 'superman', 'hannah', 'amanda', 'love', 'jessica', 'cheese', 'metallica', 'liverpool', 'jennifer', 'jordan23', 'believe', 'hunter', 'michelle', 'andrew', 'love', '2000', 'chicken', 'monster', 'sandra', 'harley', 'charlie', 'andrea', 'fuckme', 'tigger', 'sunshine', 'iloveyou', '2000', 'charlie', 'robert', 'thomas', 'hockey', 'ranger', 'daniel', 'starwars', 'klaster', '112233', 'george', 'asshole', 'computer', 'michelle', 'jessica', 'pepper', 'zxcvbn', '555555', '111111', '131313', 'freedom', '777777', 'pass', 'maggie', '159753', 'aaaaaa', 'ginger', 'princess', 'joshua', 'cheese', 'amanda', 'summer', 'love', 'ashley', '6969', 'nicole', 'chelsea', 'biteme', 'matthew', 'access', 'yankees', '987654321', 'dallas', 'austin', 'thunder', 'taylor', 'matrix', 'william', 'corvette', 'hello', 'martin', 'heather', 'secret', 'fucker', 'merlin', 'diamond', '1234qwer', 'gfhjkm', 'hammer', 'silver', '222222', '88888888', 'anthony', 'justin', 'test', 'bailey', 'q1w2e3r4t5', 'patrick', 'internet', 'scooter', 'orange', '11111', 'jordan', 'harley', 'rangers', 'dirty', 'bigdick', 'suckit', 'porn', 'fuck', 'alexis', 'ferrari', 'knight', 'skywalker', 'playboy', 'rainbow', 'asshole', 'thx1138', 'thomas', 'soccer', 'hockey', 'killer', 'george', 'sexy', 'andrew', 'charlie', 'superman', 'asshole', 'dallas', 'jessica', 'panties', 'pepper', '1234', 'skippy', 'zombie'],
            speed: 200
        },
        'brute-force': {
            name: 'Brute Force Attack',
            description: 'Try all possible character combinations',
            passwords: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah', 'ai', 'aj', 'ak', 'al', 'am', 'an', 'ao', 'ap', 'aq', 'ar', 'as', 'at', 'au', 'av', 'aw', 'ax', 'ay', 'az', 'ba', 'bb', 'bc', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'bj', 'bk', 'bl', 'bm', 'bn', 'bo', 'bp', 'bq', 'br', 'bs', 'bt', 'bu', 'bv', 'bw', 'bx', 'by', 'bz', 'ca', 'cb', 'cc', 'cd', 'ce', 'cf', 'cg', 'ch', 'ci', 'cj', 'ck', 'cl', 'cm', 'cn', 'co', 'cp', 'cq', 'cr', 'cs', 'ct', 'cu', 'cv', 'cw', 'cx', 'cy', 'cz', 'da', 'db', 'dc', 'dd', 'de', 'df', 'dg', 'dh', 'di', 'dj', 'dk', 'dl', 'dm', 'dn', 'do', 'dp', 'dq', 'dr', 'ds', 'dt', 'du', 'dv', 'dw', 'dx', 'dy', 'dz', 'ea', 'eb', 'ec', 'ed', 'ee', 'ef', 'eg', 'eh', 'ei', 'ej', 'ek', 'el', 'em', 'en', 'eo', 'ep', 'eq', 'er', 'es', 'et', 'eu', 'ev', 'ew', 'ex', 'ey', 'ez', 'fa', 'fb', 'fc', 'fd', 'fe', 'ff', 'fg', 'fh', 'fi', 'fj', 'fk', 'fl', 'fm', 'fn', 'fo', 'fp', 'fq', 'fr', 'fs', 'ft', 'fu', 'fv', 'fw', 'fx', 'fy', 'fz', 'ga', 'gb', 'gc', 'gd', 'ge', 'gf', 'gg', 'gh', 'gi', 'gj', 'gk', 'gl', 'gm', 'gn', 'go', 'gp', 'gq', 'gr', 'gs', 'gt', 'gu', 'gv', 'gw', 'gx', 'gy', 'gz', 'ha', 'hb', 'hc', 'hd', 'he', 'hf', 'hg', 'hh', 'hi', 'hj', 'hk', 'hl', 'hm', 'hn', 'ho', 'hp', 'hq', 'hr', 'hs', 'ht', 'hu', 'hv', 'hw', 'hx', 'hy', 'hz', 'ia', 'ib', 'ic', 'id', 'ie', 'if', 'ig', 'ih', 'ii', 'ij', 'ik', 'il', 'im', 'in', 'io', 'ip', 'iq', 'ir', 'is', 'it', 'iu', 'iv', 'iw', 'ix', 'iy', 'iz', 'ja', 'jb', 'jc', 'jd', 'je', 'jf', 'jg', 'jh', 'ji', 'jj', 'jk', 'jl', 'jm', 'jn', 'jo', 'jp', 'jq', 'jr', 'js', 'jt', 'ju', 'jv', 'jw', 'jx', 'jy', 'jz', 'ka', 'kb', 'kc', 'kd', 'ke', 'kf', 'kg', 'kh', 'ki', 'kj', 'kk', 'kl', 'km', 'kn', 'ko', 'kp', 'kq', 'kr', 'ks', 'kt', 'ku', 'kv', 'kw', 'kx', 'ky', 'kz', 'la', 'lb', 'lc', 'ld', 'le', 'lf', 'lg', 'lh', 'li', 'lj', 'lk', 'll', 'lm', 'ln', 'lo', 'lp', 'lq', 'lr', 'ls', 'lt', 'lu', 'lv', 'lw', 'lx', 'ly', 'lz', 'ma', 'mb', 'mc', 'md', 'me', 'mf', 'mg', 'mh', 'mi', 'mj', 'mk', 'ml', 'mm', 'mn', 'mo', 'mp', 'mq', 'mr', 'ms', 'mt', 'mu', 'mv', 'mw', 'mx', 'my', 'mz', 'na', 'nb', 'nc', 'nd', 'ne', 'nf', 'ng', 'nh', 'ni', 'nj', 'nk', 'nl', 'nm', 'nn', 'no', 'np', 'nq', 'nr', 'ns', 'nt', 'nu', 'nv', 'nw', 'nx', 'ny', 'nz', 'oa', 'ob', 'oc', 'od', 'oe', 'of', 'og', 'oh', 'oi', 'oj', 'ok', 'ol', 'om', 'on', 'oo', 'op', 'oq', 'or', 'os', 'ot', 'ou', 'ov', 'ow', 'ox', 'oy', 'oz', 'pa', 'pb', 'pc', 'pd', 'pe', 'pf', 'pg', 'ph', 'pi', 'pj', 'pk', 'pl', 'pm', 'pn', 'po', 'pp', 'pq', 'pr', 'ps', 'pt', 'pu', 'pv', 'pw', 'px', 'py', 'pz', 'qa', 'qb', 'qc', 'qd', 'qe', 'qf', 'qg', 'qh', 'qi', 'qj', 'qk', 'ql', 'qm', 'qn', 'qo', 'qp', 'qq', 'qr', 'qs', 'qt', 'qu', 'qv', 'qw', 'qx', 'qy', 'qz', 'ra', 'rb', 'rc', 'rd', 're', 'rf', 'rg', 'rh', 'ri', 'rj', 'rk', 'rl', 'rm', 'rn', 'ro', 'rp', 'rq', 'rr', 'rs', 'rt', 'ru', 'rv', 'rw', 'rx', 'ry', 'rz', 'sa', 'sb', 'sc', 'sd', 'se', 'sf', 'sg', 'sh', 'si', 'sj', 'sk', 'sl', 'sm', 'sn', 'so', 'sp', 'sq', 'sr', 'ss', 'st', 'su', 'sv', 'sw', 'sx', 'sy', 'sz', 'ta', 'tb', 'tc', 'td', 'te', 'tf', 'tg', 'th', 'ti', 'tj', 'tk', 'tl', 'tm', 'tn', 'to', 'tp', 'tq', 'tr', 'ts', 'tt', 'tu', 'tv', 'tw', 'tx', 'ty', 'tz', 'ua', 'ub', 'uc', 'ud', 'ue', 'uf', 'ug', 'uh', 'ui', 'uj', 'uk', 'ul', 'um', 'un', 'uo', 'up', 'uq', 'ur', 'us', 'ut', 'uu', 'uv', 'uw', 'ux', 'uy', 'uz', 'va', 'vb', 'vc', 'vd', 've', 'vf', 'vg', 'vh', 'vi', 'vj', 'vk', 'vl', 'vm', 'vn', 'vo', 'vp', 'vq', 'vr', 'vs', 'vt', 'vu', 'vv', 'vw', 'vx', 'vy', 'vz', 'wa', 'wb', 'wc', 'wd', 'we', 'wf', 'wg', 'wh', 'wi', 'wj', 'wk', 'wl', 'wm', 'wn', 'wo', 'wp', 'wq', 'wr', 'ws', 'wt', 'wu', 'wv', 'ww', 'wx', 'wy', 'wz', 'xa', 'xb', 'xc', 'xd', 'xe', 'xf', 'xg', 'xh', 'xi', 'xj', 'xk', 'xl', 'xm', 'xn', 'xo', 'xp', 'xq', 'xr', 'xs', 'xt', 'xu', 'xv', 'xw', 'xx', 'xy', 'xz', 'ya', 'yb', 'yc', 'yd', 'ye', 'yf', 'yg', 'yh', 'yi', 'yj', 'yk', 'yl', 'ym', 'yn', 'yo', 'yp', 'yq', 'yr', 'ys', 'yt', 'yu', 'yv', 'yw', 'yx', 'yy', 'yz', 'za', 'zb', 'zc', 'zd', 'ze', 'zf', 'zg', 'zh', 'zi', 'zj', 'zk', 'zl', 'zm', 'zn', 'zo', 'zp', 'zq', 'zr', 'zs', 'zt', 'zu', 'zv', 'zw', 'zx', 'zy', 'zz'],
            speed: 100
        },
        'hybrid': {
            name: 'Hybrid Attack',
            description: 'Combine dictionary words with numbers and symbols',
            passwords: ['password123', 'admin123', 'qwerty123', 'letmein123', 'welcome123', 'monkey123', 'dragon123', 'master123', 'hello123', 'iloveyou123', 'princess123', 'rockyou123', 'abc123456', 'nicole123', 'daniel123', 'babygirl123', 'monkey123', 'lovely123', 'jessica123', 'michael123', 'ashley123', 'qwerty123', 'michelle123', 'tigger123', 'sunshine123', 'chocolate123', 'soccer123', 'anthony123', 'friends123', 'butterfly123', 'purple123', 'angel123', 'jordan123', 'liverpool123', 'justin123', 'loveme123', 'football123', 'secret123', 'andrea123', 'carlos123', 'jennifer123', 'joshua123', 'basketball123', 'superman123', 'hannah123', 'amanda123', 'love123', 'jessica123', 'cheese123', 'metallica123', 'liverpool123', 'jennifer123', 'jordan123', 'believe123', 'hunter123', 'michelle123', 'andrew123', 'love123', 'chicken123', 'monster123', 'sandra123', 'harley123', 'charlie123', 'andrea123', 'tigger123', 'sunshine123', 'iloveyou123', 'charlie123', 'robert123', 'thomas123', 'hockey123', 'ranger123', 'daniel123', 'starwars123', 'klaster123', 'george123', 'computer123', 'michelle123', 'jessica123', 'pepper123', 'pass123', 'maggie123', 'ginger123', 'princess123', 'joshua123', 'cheese123', 'amanda123', 'summer123', 'love123', 'ashley123', 'nicole123', 'chelsea123', 'matthew123', 'access123', 'yankees123', 'dallas123', 'austin123', 'thunder123', 'taylor123', 'matrix123', 'william123', 'corvette123', 'hello123', 'martin123', 'heather123', 'secret123', 'merlin123', 'diamond123', 'patrick123', 'internet123', 'scooter123', 'orange123', 'jordan123', 'harley123', 'rangers123', 'dirty123', 'alexis123', 'ferrari123', 'knight123', 'skywalker123', 'playboy123', 'rainbow123', 'thomas123', 'soccer123', 'hockey123', 'killer123', 'george123', 'sexy123', 'andrew123', 'charlie123', 'superman123', 'dallas123', 'jessica123', 'pepper123', 'skippy123', 'zombie123', 'password123', 'orange123', 'princess123', 'merlin123', 'diamond123', 'patrick123', 'internet123', 'scooter123', 'orange123', 'jordan123', 'harley123', 'rangers123', 'dirty123', 'alexis123', 'ferrari123', 'knight123', 'skywalker123', 'playboy123', 'rainbow123', 'thomas123', 'soccer123', 'hockey123', 'killer123', 'george123', 'sexy123', 'andrew123', 'charlie123', 'superman123', 'dallas123', 'jessica123', 'pepper123', 'skippy123', 'zombie123'],
            speed: 150
        },
        'mask': {
            name: 'Mask Attack',
            description: 'Target specific patterns (e.g., 8 digits, 4 letters + 4 digits)',
            passwords: ['12345678', '87654321', '11111111', '00000000', '99999999', '1234567890', '0987654321', 'abcdefgh', 'hgfedcba', 'qwertyui', 'iuytrewq', 'asdfghjk', 'kjhgfdsa', 'zxcvbnm,', ',mnbvcxz', 'password', 'drowssap', 'admin123', '321nimda', 'qwerty123', '321ytrewq', 'letmein123', '321niemtel', 'welcome123', '321emoclew', 'monkey123', '321yeknom', 'dragon123', '321nogard', 'master123', '321retsam', 'hello123', '321olleh', 'iloveyou123', '321uoyevoli', 'princess123', '321ssecnirp', 'rockyou123', '321uoykcor', 'abc123456', '654321cba', 'nicole123', '321elocin', 'daniel123', '321leinad', 'babygirl123', '321lrigybab', 'lovely123', '321ylevol', 'jessica123', '321acissej', 'michael123', '321leahcim', 'ashley123', '321yelhsa', 'michelle123', '321ellehcim', 'tigger123', '321reggit', 'sunshine123', '321enihsnus', 'chocolate123', '321etalocohc', 'soccer123', '321reccos', 'anthony123', '321ynohtna', 'friends123', '321sdnierf', 'butterfly123', '321ylfrettub', 'purple123', '321elprup', 'angel123', '321legna', 'jordan123', '321nadroj', 'liverpool123', '321looprevil', 'justin123', '321nitsuj', 'loveme123', '321emevol', 'football123', '321llabtoof', 'secret123', '321terces', 'andrea123', '321aerdna', 'carlos123', '321solrac', 'jennifer123', '321refinnej', 'joshua123', '321auhsoj', 'basketball123', '321llabteksab', 'superman123', '321namrepus', 'hannah123', '321hannah', 'amanda123', '321adnama', 'love123', '321evol', 'cheese123', '321eseehc', 'metallica123', '321acillatem', 'believe123', '321eveileb', 'hunter123', '321retnuh', 'andrew123', '321werdna', 'chicken123', '321nekcihc', 'monster123', '321retsnom', 'sandra123', '321ardnas', 'harley123', '321yelrah', 'charlie123', '321eilrahc', 'robert123', '321trebor', 'thomas123', '321samoh', 'hockey123', '321yekcoh', 'ranger123', '321regnar', 'daniel123', '321leinad', 'starwars123', '321srawrats', 'klaster123', '321retsalk', 'george123', '321egroeg', 'computer123', '321retupmoc', 'pepper123', '321reppep', 'pass123', '321ssap', 'maggie123', '321eiggam', 'ginger123', '321regnig', 'summer123', '321remmus', 'internet123', '321tenretni', 'scooter123', '321retoocs', 'orange123', '321egnaro', 'dirty123', '321ytrid', 'alexis123', '321sixela', 'ferrari123', '321irarref', 'knight123', '321thgink', 'skywalker123', '321reklawyks', 'playboy123', '321yobyalp', 'rainbow123', '321wobniar', 'killer123', '321rellik', 'sexy123', '321yxes', 'panties123', '321seitnap', 'skippy123', '321yppiks', 'zombie123', '321eibmoz'],
            speed: 120
        }
    };

    const targets = {
        'user': { name: 'Regular User', password: 'password123', difficulty: 'Easy' },
        'admin': { name: 'System Administrator', password: 'admin123', difficulty: 'Medium' },
        'ceo': { name: 'CEO Account', password: 'dragon123', difficulty: 'Hard' },
        'developer': { name: 'Developer Account', password: 'qwerty123', difficulty: 'Medium' },
        'database': { name: 'Database Admin', password: 'master123', difficulty: 'Hard' },
        'webmaster': { name: 'Webmaster', password: 'welcome123', difficulty: 'Easy' },
        'security': { name: 'Security Officer', password: 'letmein123', difficulty: 'Very Hard' },
        'guest': { name: 'Guest Account', password: 'hello123', difficulty: 'Easy' }
    };

    let targetPassword = targets['user'].password;

    window.startPasswordCrack = function() {
        if (isCracking) return;

        isCracking = true;
        attempts = 0;
        const output = document.getElementById('crackerOutput');
        const progressBar = document.getElementById('crackProgress');
        const progressText = document.getElementById('crackProgressText');
        const attackMethod = attackMethods[currentAttack];
        const targetInfo = targets[currentTarget];

        // Clear and initialize output
        output.innerHTML = '';
        
        // Add context and story
        const contextStories = {
            'user': {
                kids: "👦 A kid named Alex uses a simple password for their gaming account. Let's see how easy it is to crack!",
                pro: "Real-world scenario: A regular user account with weak password. Common target for credential stuffing attacks."
            },
            'admin': {
                kids: "👨‍💼 The school's computer admin uses a password. If we crack it, we could access everything! (This is why strong passwords matter!)",
                pro: "Administrative account breach scenario. High-value target with potential for lateral movement and privilege escalation."
            },
            'ceo': {
                kids: "👔 The CEO of a company has a password. Hackers would love to get this! (This shows why important people need extra strong passwords!)",
                pro: "C-suite executive account. Critical target for Business Email Compromise (BEC) and corporate espionage."
            }
        };

        const story = contextStories[currentTarget] || contextStories['user'];
        
        output.innerHTML = `
            <div class="crack-line" style="color: #00ffff; font-weight: bold; margin-bottom: 1rem;">📖 Scenario Context:</div>
            <div class="crack-line" style="background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 5px; margin-bottom: 1rem; border-left: 3px solid #00ffff;">
                <div style="color: #ffd700; margin-bottom: 0.5rem;">👶 For Kids:</div>
                <div style="color: #ffffff; margin-bottom: 1rem;">${story.kids}</div>
                <div style="color: #ffd700; margin-bottom: 0.5rem;">👔 For Professionals:</div>
                <div style="color: #ffffff;">${story.pro}</div>
            </div>
            <div class="crack-line" style="color: #00ffff; font-weight: bold; margin: 1rem 0;">🔓 Starting ${attackMethod.name}...</div>
            <div class="crack-line">🎯 Target: <strong>${targetInfo.name}</strong> (${targetInfo.difficulty} difficulty)</div>
            <div class="crack-line">⚙️ Method: ${attackMethod.description}</div>
            <div class="crack-line">📚 Dictionary size: ${attackMethod.passwords.length} passwords</div>
            <div class="crack-line" style="margin-top: 1rem; color: #ffd700;">⏳ Cracking in progress...</div>
        `;
        
        if (progressBar) progressBar.style.width = '0%';
        if (progressText) progressText.textContent = '0%';

        let outputLines = [];
        const maxVisibleLines = 10; // Show last 10 attempts

        const crackInterval = setInterval(() => {
            attempts++;
            const progress = Math.min((attempts / attackMethod.passwords.length) * 100, 100);
            
            if (progressBar) progressBar.style.width = progress + '%';
            if (progressText) progressText.textContent = Math.round(progress) + '%';

            const currentPassword = attackMethod.passwords[attempts - 1];
            
            // Add to output lines array
            outputLines.push(`<div class="crack-line" style="color: #ff6b6b;">❌ Attempt ${attempts}: Trying "${currentPassword}"... FAILED</div>`);
            
            // Keep only last maxVisibleLines
            if (outputLines.length > maxVisibleLines) {
                outputLines.shift();
            }
            
            // Update output - keep header, show recent attempts
            const header = output.innerHTML.split('<div class="crack-line" style="margin-top: 1rem; color: #ffd700;">')[0];
            output.innerHTML = header + 
                `<div class="crack-line" style="margin-top: 1rem; color: #ffd700;">⏳ Cracking in progress... (${attempts}/${attackMethod.passwords.length})</div>` +
                outputLines.join('');

            // Auto-scroll to bottom
            output.scrollTop = output.scrollHeight;

            if (currentPassword === targetPassword) {
                clearInterval(crackInterval);
                isCracking = false;
                
                // Success animation
                output.innerHTML = header + 
                    `<div class="crack-line" style="margin-top: 1rem; color: #ffd700;">⏳ Cracking in progress... (${attempts}/${attackMethod.passwords.length})</div>` +
                    outputLines.join('') +
                    `<div class="crack-line crack-success" style="background: rgba(0,255,0,0.2); padding: 1.5rem; border-radius: 10px; border: 2px solid #00ff00; margin-top: 1rem; animation: pulse 1s;">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎉 PASSWORD CRACKED!</div>
                        <div style="color: #00ff00; font-weight: bold; font-size: 1.2rem; margin-bottom: 0.5rem;">Found: "${targetPassword}"</div>
                        <div style="color: #ffffff; margin-top: 1rem;">
                            <div>✅ Cracked in <strong>${attempts}</strong> attempts</div>
                            <div>⏱️ Time taken: <strong>${(attempts * attackMethod.speed / 1000).toFixed(1)} seconds</strong></div>
                            <div>⚙️ Attack method: <strong>${attackMethod.name}</strong></div>
                        </div>
                        <div style="margin-top: 1rem; padding: 1rem; background: rgba(255,215,0,0.1); border-radius: 5px; border-left: 3px solid #ffd700;">
                            <strong style="color: #ffd700;">💡 Lesson Learned:</strong>
                            <p style="color: #ffffff; margin-top: 0.5rem;">
                                ${targetInfo.difficulty === 'Easy' ? 
                                    'This password was too weak! Always use long, complex passwords with numbers and symbols!' :
                                    targetInfo.difficulty === 'Medium' ?
                                    'Even medium-strength passwords can be cracked. Use password managers for better security!' :
                                    'Strong passwords take longer to crack, but they\'re still vulnerable to advanced attacks. Use 2FA!'}
                            </p>
                        </div>
                    </div>`;
                
                addPoints(200);
                output.scrollTop = output.scrollHeight;
            } else if (attempts >= attackMethod.passwords.length) {
                clearInterval(crackInterval);
                isCracking = false;
                
                output.innerHTML = header + 
                    `<div class="crack-line crack-fail" style="background: rgba(255,0,0,0.2); padding: 1.5rem; border-radius: 10px; border: 2px solid #ff0000; margin-top: 1rem;">
                        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">❌ Password Not Found</div>
                        <div style="color: #ffffff;">Tried ${attempts} passwords but couldn't crack it!</div>
                        <div style="margin-top: 1rem; color: #ffd700;">💡 Try a different attack method or target</div>
                    </div>`;
                output.scrollTop = output.scrollHeight;
            }
        }, attackMethod.speed);
    };

    window.switchAttackMethod = function(method) {
        if (isCracking) return; // Don't allow switching while cracking
        
        currentAttack = method;
        const methodInfo = attackMethods[method];
        
        // Update active button state - find button by onclick attribute
        document.querySelectorAll('.method-btn').forEach(btn => {
            btn.classList.remove('active');
            const onclickAttr = btn.getAttribute('onclick') || '';
            if (onclickAttr.includes(`'${method}'`) || onclickAttr.includes(`"${method}"`)) {
                btn.classList.add('active');
            }
        });
        
        // Update info display
        const attackDesc = document.getElementById('attackDescription');
        const attackSpeed = document.getElementById('attackSpeed');
        const attackSize = document.getElementById('attackSize');
        
        if (attackDesc) attackDesc.textContent = methodInfo.description;
        if (attackSpeed) attackSpeed.textContent = `Speed: ${methodInfo.speed}ms per attempt`;
        if (attackSize) attackSize.textContent = `Dictionary: ${methodInfo.passwords.length} passwords`;
    };

    window.switchTarget = function(target) {
        if (isCracking) return; // Don't allow switching while cracking
        
        currentTarget = target;
        targetPassword = targets[target].password;
        const targetInfo = targets[target];
        
        // Update active button state - find button by onclick attribute
        document.querySelectorAll('.target-btn').forEach(btn => {
            btn.classList.remove('active');
            const onclickAttr = btn.getAttribute('onclick') || '';
            if (onclickAttr.includes(`'${target}'`) || onclickAttr.includes(`"${target}"`)) {
                btn.classList.add('active');
            }
        });
        
        // Update info display
        const targetDesc = document.getElementById('targetDescription');
        if (targetDesc) {
            targetDesc.textContent = `${targetInfo.name} - ${targetInfo.difficulty} difficulty`;
        }
    };

    window.resetPasswordCrack = function() {
        isCracking = false;
        attempts = 0;
        document.getElementById('crackerOutput').innerHTML = '<div class="crack-line">Ready to crack passwords</div>';
        document.getElementById('crackProgress').style.width = '0%';
    };
}

    window.CyberArcadeGames['password-cracker'] = {
                title: 'Password Cracking Simulator',
                content: `
                    <div class="password-cracker">
                        <div class="cracker-header">
                            <div class="cracker-title">🔓 Password Cracking Simulator v3.0</div>
                            <div class="cracker-subtitle">Professional password cracking with multiple attack methods</div>
                        </div>
                        <div class="cracker-options">
                            <div class="attack-methods">
                                <h4>Attack Methods:</h4>
                                <div class="method-buttons">
                                    <button class="method-btn active" onclick="switchAttackMethod('dictionary')">Dictionary</button>
                                    <button class="method-btn" onclick="switchAttackMethod('brute-force')">Brute Force</button>
                                    <button class="method-btn" onclick="switchAttackMethod('hybrid')">Hybrid</button>
                                    <button class="method-btn" onclick="switchAttackMethod('mask')">Mask</button>
                                </div>
                                <div class="method-info">
                                    <div id="attackDescription">Try common passwords from a dictionary</div>
                                    <div id="attackSpeed">Speed: 200ms per attempt</div>
                                    <div id="attackSize">Dictionary: 200+ passwords</div>
                                </div>
                            </div>
                            <div class="target-selection">
                                <h4>Target Selection:</h4>
                                <div class="target-buttons">
                                    <button class="target-btn active" onclick="switchTarget('user')">Regular User</button>
                                    <button class="target-btn" onclick="switchTarget('admin')">System Admin</button>
                                    <button class="target-btn" onclick="switchTarget('ceo')">CEO Account</button>
                                    <button class="target-btn" onclick="switchTarget('developer')">Developer</button>
                                    <button class="target-btn" onclick="switchTarget('database')">Database Admin</button>
                                    <button class="target-btn" onclick="switchTarget('webmaster')">Webmaster</button>
                                    <button class="target-btn" onclick="switchTarget('security')">Security Officer</button>
                                    <button class="target-btn" onclick="switchTarget('guest')">Guest Account</button>
                                </div>
                                <div class="target-info">
                                    <div id="targetDescription">Regular User - Easy difficulty</div>
                                </div>
                            </div>
                        </div>
                        <div class="cracker-progress">
                            <div class="progress-label">
                                <span>Cracking Progress</span>
                                <span id="crackProgressText">0%</span>
                            </div>
                            <div class="progress-bar-container">
                                <div class="progress-bar-fill" id="crackProgress" style="width: 0%"></div>
                            </div>
                        </div>
                        <div class="cracker-stats">
                            <div class="stat-item">
                                <div class="stat-value" id="attemptsCount">0</div>
                                <div class="stat-label">Attempts</div>
                            </div>
                        </div>
                        <div class="cracker-controls">
                            <button class="cracker-btn primary" onclick="startPasswordCrack()">Start Cracking</button>
                            <button class="cracker-btn secondary" onclick="resetPasswordCrack()">Reset</button>
                        </div>
                        <div class="cracker-output" id="crackerOutput">
                            Ready to crack passwords
                        </div>
                    </div>
                `,
                init: initPasswordCrackerGame
            };
})();
