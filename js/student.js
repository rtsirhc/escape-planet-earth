// Game State
let session = null;
let team = null;
let currentRoomIndex = 0;
let currentQuestionIndex = 0;
let collectedLetters = [];
let allCollectedLetters = []; // Across all rooms
let startTime = null;
let timerInterval = null;
let elapsedMs = 0;
let penaltyMs = 0;
let hintsUsed = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };

const $main = document.getElementById('main-container');

// Shuffle array (Fisher-Yates)
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Sound toggle logic
function toggleSound() {
  const enabled = SoundManager.toggle();
  document.getElementById('sound-toggle').innerText = enabled ? '🔊' : '🔇';
}

window.onload = init;

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function init() {
  SoundManager.init();
  const urlCode = getQueryParam('code');
  renderJoinScreen(urlCode);
}

function renderJoinScreen(prefillCode) {
  $main.innerHTML = `
    <div class="join-screen fade-in">
      <h2>🌍 Join the Escape Room</h2>
      <div class="form-group">
        <label>Room Code</label>
        <input type="text" id="room-code-input" class="input-field" placeholder="e.g. ABC123" value="${prefillCode || ''}" style="text-transform: uppercase;">
      </div>
      <div class="form-group">
        <label>Team Name</label>
        <input type="text" id="team-name-input" class="input-field" placeholder="e.g. Eco Warriors" maxlength="20">
      </div>
      <button class="btn btn--full btn--large" onclick="joinGame()">Join Game</button>
      <div id="join-error" class="join-error"></div>
    </div>
  `;
}

window.joinGame = async function() {
  const code = document.getElementById('room-code-input').value.trim().toUpperCase();
  const name = document.getElementById('team-name-input').value.trim();
  const errEl = document.getElementById('join-error');
  
  if (!code || !name) {
    errEl.innerText = "Please enter both Room Code and Team Name.";
    return;
  }

  errEl.innerText = "Joining...";
  
  try {
    session = await getSession(code);
    if (!session) {
      errEl.innerText = "Invalid room code.";
      return;
    }
    
    if (session.status === 'finished') {
      errEl.innerText = "This game has already finished.";
      return;
    }

    team = await createTeam(session.id, name);
    
    if (session.status === 'active') {
      startGame();
    } else {
      renderWaitingScreen();
      subscribeToSession(code, (payload) => {
        if (payload.new && payload.new.status === 'active') {
          startGame();
        }
      });
    }
  } catch (e) {
    console.error(e);
    errEl.innerText = "Error: " + (e.message || JSON.stringify(e));
  }
}

function renderWaitingScreen() {
  $main.innerHTML = `
    <div class="waiting-screen fade-in">
      <div class="spinner">⏳</div>
      <h2>Waiting for Teacher</h2>
      <p>You have joined successfully as:</p>
      <div class="waiting-team-name">${team.team_name}</div>
      <p>The game will start soon!</p>
    </div>
  `;
}

async function startGame() {
  await setTeamStartTime(team.id);
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
  document.getElementById('timer-bar').classList.remove('hidden');
  renderStoryScreen();
}

function updateTimer() {
  if (!startTime) return;
  elapsedMs = Date.now() - startTime;
  const total = elapsedMs + penaltyMs;
  
  const m = Math.floor(total / 60000);
  const s = Math.floor((total % 60000) / 1000).toString().padStart(2, '0');
  
  document.getElementById('timer-time').innerText = `${m}:${s}`;
  
  const penEl = document.getElementById('timer-penalty');
  if (penaltyMs > 0) {
    const pm = Math.floor(penaltyMs / 60000);
    penEl.innerText = `(+${pm} min penalty)`;
    penEl.classList.remove('hidden');
  }
}

function renderStoryScreen() {
  $main.innerHTML = `
    <div class="story-screen slide-up">
      <span class="story-icon">🌍</span>
      <h1>${GAME_DATA.title}</h1>
      <p class="story-text">${GAME_DATA.story}</p>
      <button class="btn btn--large btn--full" onclick="startRoom(0)">Start Room 1</button>
    </div>
  `;
}

// --- Go Back: restart from Room 1 without resetting timer ---
window.goBackToStart = function() {
  if (confirm('Go back to Room 1? Your timer will keep running but you can redo all rooms.')) {
    currentRoomIndex = 0;
    currentQuestionIndex = 0;
    collectedLetters = [];
    allCollectedLetters = [];
    hintsUsed = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };
    syncProgress(1, 0);
    startRoom(0);
  }
}

window.startRoom = async function(roomIndex) {
  currentRoomIndex = roomIndex;
  currentQuestionIndex = 0;
  collectedLetters = [];
  
  const room = GAME_DATA.rooms[roomIndex];
  document.getElementById('timer-room').innerHTML = `Room <strong>${roomIndex + 1}</strong>/5`;
  
  const baseProgress = roomIndex * 20;
  await syncProgress(roomIndex + 1, baseProgress);
  
  renderQuestion();
}

function renderQuestion() {
  const room = GAME_DATA.rooms[currentRoomIndex];
  const q = room.questions[currentQuestionIndex];
  
  let optionsHtml = '';
  if (q.type === 'multiple-choice') {
    optionsHtml = `<ul class="options-list">` + 
      q.options.map((opt, i) => `
        <li class="option-item" onclick="checkAnswer(${i})">
          <div class="option-label">${String.fromCharCode(65 + i)}</div>
          <div>${opt}</div>
        </li>
      `).join('') + `</ul>`;
  } else if (q.type === 'true-false') {
    optionsHtml = `
      <div class="tf-container">
        <div class="tf-btn" onclick="checkAnswer(true)">True</div>
        <div class="tf-btn" onclick="checkAnswer(false)">False</div>
      </div>
    `;
  }
  
  const collectedHtml = renderCollectedLetters();
  const hintsUsedCount = hintsUsed[room.id] || 0;

  $main.innerHTML = `
    <div class="room-header fade-in">
      <span class="room-icon">${room.icon}</span>
      <h2>${room.name}</h2>
      <div class="room-topic">${room.topic}</div>
    </div>
    
    <div class="card question-card">
      <div class="question-number">Question ${currentQuestionIndex + 1} of 5</div>
      <div class="question-text">${q.text}</div>
      ${optionsHtml}
    </div>
    
    ${collectedHtml}
    
    <div class="hint-section fade-in">
      <div class="hint-indicators">
        ${hintsUsedCount >= 1 ? '💡' : '🔒'} 
        ${hintsUsedCount >= 2 ? '💡' : '🔒'}
      </div>
      <button class="btn btn--hint ${hintsUsedCount >= 2 ? 'used' : ''}" onclick="useHint()">
        Need a hint?
      </button>
      <div class="hint-penalty-label">
        ${hintsUsedCount === 0 ? '+1 min penalty' : hintsUsedCount === 1 ? '+5 min penalty' : 'No hints left'}
      </div>
      <div id="hint-display"></div>
    </div>

    <div class="text-center mt-3">
      <button class="btn btn--danger" style="font-size:0.85rem; padding:8px 18px;" onclick="goBackToStart()">🔄 Restart from Room 1</button>
    </div>
  `;
}

// Render collected letters in SCRAMBLED order so students must unscramble
function renderCollectedLetters() {
  // Create a scrambled display order
  const displayLetters = [];
  for (let i = 0; i < 5; i++) {
    if (collectedLetters[i]) {
      displayLetters.push(collectedLetters[i]);
    }
  }
  const scrambled = shuffleArray(displayLetters);
  
  let slots = '';
  for (let i = 0; i < 5; i++) {
    if (i < scrambled.length) {
      slots += `<div class="letter-slot filled">${scrambled[i]}</div>`;
    } else {
      slots += `<div class="letter-slot">?</div>`;
    }
  }
  return `
    <div class="text-center mt-2 fade-in">
      <p class="text-secondary mb-1" style="font-size:0.9rem">Collected Letters (scrambled)</p>
      <div class="collected-letters">${slots}</div>
    </div>
  `;
}

window.useHint = function() {
  const room = GAME_DATA.rooms[currentRoomIndex];
  const q = room.questions[currentQuestionIndex];
  let count = hintsUsed[room.id] || 0;
  
  if (count >= 2) return;
  
  count++;
  hintsUsed[room.id] = count;
  
  const hintObj = count === 1 ? q.hint1 : q.hint2;
  penaltyMs += hintObj.penaltyMs;
  
  SoundManager.hint();
  syncProgress(room.id, team.progress);
  
  renderQuestion();
  
  const hintDisplay = document.getElementById('hint-display');
  hintDisplay.innerHTML = `<div class="hint-text">💡 ${hintObj.text}</div>`;
}

window.checkAnswer = function(answer) {
  const room = GAME_DATA.rooms[currentRoomIndex];
  const q = room.questions[currentQuestionIndex];
  
  const items = document.querySelectorAll('.option-item, .tf-btn');
  items.forEach(el => el.classList.add('disabled'));
  
  let isCorrect = false;
  
  if (q.type === 'multiple-choice') {
    isCorrect = (answer === q.correctIndex);
  } else if (q.type === 'true-false') {
    isCorrect = (answer === q.correctAnswer);
  }
  
  const targetEl = event.currentTarget;
  if (isCorrect) {
    targetEl.classList.add('correct');
    SoundManager.correct();
    collectedLetters.push(q.correctLetter);
    
    const newProg = (currentRoomIndex * 20) + ((currentQuestionIndex + 1) * 3);
    syncProgress(room.id, newProg);
    
    setTimeout(() => {
      showLetterReveal(q.correctLetter, q.letterExplanation);
    }, 800);
  } else {
    targetEl.classList.add('wrong');
    SoundManager.wrong();
    collectedLetters.push(q.fakeLetter);
    
    setTimeout(() => {
      showLetterReveal(q.fakeLetter, 'Oops... that might not be the right letter.');
    }, 800);
  }
}

function showLetterReveal(letter, explanation) {
  $main.innerHTML = `
    <div class="letter-reveal">
      <span class="letter-char">${letter}</span>
      <div class="explanation">${explanation}</div>
    </div>
    ${renderCollectedLetters()}
    <button class="btn btn--large btn--full mt-3" onclick="nextStep()">Continue ➡️</button>
  `;
}

window.nextStep = function() {
  currentQuestionIndex++;
  
  if (currentQuestionIndex < 5) {
    renderQuestion();
  } else {
    renderCodeEntry();
  }
}

function renderCodeEntry() {
  const room = GAME_DATA.rooms[currentRoomIndex];
  
  $main.innerHTML = `
    <div class="room-header fade-in">
      <span class="room-icon">🔐</span>
      <h2>Unlock the Door</h2>
      <div class="room-topic">Unscramble your collected letters into a word</div>
    </div>
    
    ${renderCollectedLetters()}
    
    <div class="code-entry fade-in mt-3">
      <label>Enter the Code Word:</label>
      <input type="text" id="code-input" class="code-input" maxlength="5" autocomplete="off">
      <div id="code-error" class="join-error"></div>
      <button class="btn btn--large btn--full mt-2" onclick="verifyCode()">Unlock Door</button>
    </div>

    <div class="text-center mt-3">
      <button class="btn btn--danger" style="font-size:0.85rem; padding:8px 18px;" onclick="goBackToStart()">🔄 Restart from Room 1</button>
    </div>
  `;
}

window.verifyCode = function() {
  const room = GAME_DATA.rooms[currentRoomIndex];
  const inputEl = document.getElementById('code-input');
  const errEl = document.getElementById('code-error');
  const val = inputEl.value.trim().toUpperCase();
  
  if (val === room.codeWord) {
    inputEl.classList.add('correct');
    SoundManager.unlock();
    errEl.innerText = "";
    
    // Save final letter(s) for the escape
    if (room.finalLetterPositions) {
       room.finalLetterPositions.forEach(p => {
         allCollectedLetters.push(room.codeWord[p]);
       });
    } else {
      allCollectedLetters.push(room.codeWord[room.finalLetterPosition]);
    }
    
    const newProg = (currentRoomIndex + 1) * 20;
    syncProgress(room.id, newProg);
    
    setTimeout(() => {
      renderRoomComplete(room);
    }, 1000);
  } else {
    inputEl.classList.add('wrong');
    SoundManager.wrong();
    errEl.innerText = "Incorrect code. If your letters don't form a word, you may have a wrong answer. Use the restart button below to try again!";
    setTimeout(() => inputEl.classList.remove('wrong'), 500);
  }
}

function renderRoomComplete(room) {
  $main.innerHTML = `
    <div class="room-complete">
      <h2>Door Unlocked! 🔓</h2>
      <div class="code-word">${room.codeWord}</div>
      
      <div class="final-letter-info">
        <p class="mb-1">${room.finalLetterInstruction}</p>
        <div class="final-letter">
          ${room.finalLetterPositions ? 
            room.codeWord[room.finalLetterPositions[0]] + ' & ' + room.codeWord[room.finalLetterPositions[1]] : 
            room.codeWord[room.finalLetterPosition]}
        </div>
      </div>
      
      <button class="btn btn--large btn--full mt-2" onclick="proceedToNextRoom()">
        ${currentRoomIndex < 4 ? 'Next Room ➡️' : 'Final Escape 🚀'}
      </button>
    </div>
  `;
}

window.proceedToNextRoom = function() {
  if (currentRoomIndex < 4) {
    startRoom(currentRoomIndex + 1);
  } else {
    renderFinalEscape();
  }
}

function renderFinalEscape() {
  document.getElementById('timer-room').innerHTML = `<strong>FINAL ESCAPE</strong>`;
  
  $main.innerHTML = `
    <div class="final-escape fade-in">
      <span class="emoji-xl">🚀</span>
      <h2>${GAME_DATA.finalEscape.title}</h2>
      <p class="mb-2">${GAME_DATA.finalEscape.instructions}</p>
      
      <div class="code-entry">
        <label>Final Escape Code (6 letters):</label>
        <input type="text" id="final-code-input" class="code-input" maxlength="6" autocomplete="off" style="width: 100%; max-width: 340px;">
        <div id="final-error" class="join-error"></div>
        <button class="btn btn--large btn--full mt-2" onclick="verifyFinalCode()">ESCAPE! 🚀</button>
      </div>

      <div class="text-center mt-3">
        <button class="btn btn--danger" style="font-size:0.85rem; padding:8px 18px;" onclick="goBackToStart()">🔄 Restart from Room 1</button>
      </div>
    </div>
  `;
}

window.verifyFinalCode = function() {
  const inputEl = document.getElementById('final-code-input');
  const errEl = document.getElementById('final-error');
  const val = inputEl.value.trim().toUpperCase();
  
  if (val === GAME_DATA.finalEscape.answer) {
    inputEl.classList.add('correct');
    clearInterval(timerInterval);
    
    finishTeam(team.id, elapsedMs, penaltyMs).catch(console.error);
    
    setTimeout(() => {
      renderCelebration();
    }, 1000);
  } else {
    inputEl.classList.add('wrong');
    SoundManager.wrong();
    errEl.innerText = "Access Denied. Unscramble your hint letters!";
    setTimeout(() => inputEl.classList.remove('wrong'), 500);
  }
}

function renderCelebration() {
  SoundManager.celebrate();
  document.getElementById('timer-bar').classList.add('hidden');
  
  const totalMs = elapsedMs + penaltyMs;
  const m = Math.floor(totalMs / 60000);
  const s = Math.floor((totalMs % 60000) / 1000).toString().padStart(2, '0');
  
  const pm = Math.floor(penaltyMs / 60000);
  
  $main.innerHTML = `
    <div class="confetti-container" id="confetti"></div>
    <div class="celebration-screen fade-in">
      <span class="trophy">🏆</span>
      <h1>ESCAPED!</h1>
      <p class="message">${GAME_DATA.finalEscape.celebration}</p>
      
      <div class="final-time">${m}:${s}</div>
      <div class="time-breakdown">
        (Base time + ${pm} min hint penalty)
      </div>
      
      <p class="mt-3 text-secondary">Look at the teacher's screen for the leaderboard!</p>
    </div>
  `;
  
  createConfetti();
}

function createConfetti() {
  const container = document.getElementById('confetti');
  const colors = ['#00d26a', '#4da6ff', '#ffd700', '#ff6b6b'];
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti-piece');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(confetti);
  }
}

function syncProgress(roomVal, progressVal) {
  if (!team) return;
  updateTeamProgress(team.id, roomVal, progressVal, elapsedMs, penaltyMs, hintsUsed).catch(console.error);
}
