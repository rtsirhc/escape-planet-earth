let currentSessionId = null;
let currentRoomCode = null;
let teams = [];

// Load QR Code library dynamically
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
script.onload = initDashboard;
document.head.appendChild(script);

function generateRoomCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function initDashboard() {
  try {
    currentRoomCode = generateRoomCode();
    document.getElementById('room-code-display').innerText = currentRoomCode;

    // Use current origin for join URL
    const url = window.location.origin + '/game.html?code=' + currentRoomCode;
    document.getElementById('join-url').innerText = url;

    // Generate QR
    new QRCode(document.getElementById('qr-container'), {
      text: url,
      width: 180,
      height: 180,
      colorDark : "#0a0e17",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    });

    // Create session in Supabase
    const session = await createSession(currentRoomCode);
    currentSessionId = session.id;

    // Listen for new teams
    subscribeToTeams(currentSessionId, () => {
      fetchTeams();
    });
  } catch (e) {
    console.error(e);
    alert('Failed to start session. Please refresh.');
  }
}

async function fetchTeams() {
  if (!currentSessionId) return;
  teams = await getTeamsForSession(currentSessionId);
  
  // Sort teams: finished first, then highest progress, then lowest time
  teams.sort((a, b) => {
    if (a.progress !== b.progress) return b.progress - a.progress;
    return (a.elapsed_ms + a.penalty_ms) - (b.elapsed_ms + b.penalty_ms);
  });
  
  updateUI();
}

function updateUI() {
  const isSetup = !document.getElementById('setup-section').classList.contains('hidden');

  if (isSetup) {
    // Setup phase (Lobby)
    document.getElementById('teams-count').innerText = `${teams.length} team${teams.length !== 1 ? 's' : ''}`;
    const list = document.getElementById('waiting-teams-list');

    if (teams.length === 0) {
      list.innerHTML = '<p class="no-teams">Waiting for teams to join...</p>';
    } else {
      list.innerHTML = teams.map(t => `
        <div class="team-row fade-in">
          <div class="team-name" style="text-align: center; font-size: 1.3rem;">${t.team_name}</div>
        </div>
      `).join('');
    }

    const btn = document.getElementById('start-btn');
    if (teams.length > 0) {
      btn.disabled = false;
      document.getElementById('start-hint').innerText = 'Ready to start!';
    } else {
      btn.disabled = true;
      document.getElementById('start-hint').innerText = 'Need at least 1 team to start';
    }
  } else {
    // Active game phase (Leaderboard)
    document.getElementById('active-teams-count').innerText = `${teams.length} team${teams.length !== 1 ? 's' : ''}`;
    const board = document.getElementById('leaderboard');
    
    board.innerHTML = teams.map((t, index) => {
      const totalTime = t.elapsed_ms + t.penalty_ms;
      const mins = Math.floor(totalTime / 60000);
      const secs = Math.floor((totalTime % 60000) / 1000).toString().padStart(2, '0');
      const timeStr = totalTime > 0 ? `${mins}:${secs}` : '0:00';
      const isFinished = t.progress >= 100;

      return `
        <div class="team-row ${isFinished ? 'finished' : 'active'}">
          <div class="team-rank">#${index + 1}</div>
          <div class="team-name"><span>${t.team_name}</span></div>
          <div class="team-progress-wrap">
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: ${t.progress}%"></div>
            </div>
            <div class="team-progress-pct">${t.progress}%</div>
          </div>
          <div class="team-room-badge room-${Math.min(t.current_room, 6)}">
            ${isFinished ? 'ESCAPED!' : 'Room ' + t.current_room}
          </div>
          <div class="team-time">${timeStr}</div>
        </div>
      `;
    }).join('');
  }
}

window.startGame = async function() {
  if (!currentSessionId) return;
  try {
    const btn = document.getElementById('start-btn');
    btn.disabled = true;
    btn.innerText = 'Starting...';
    
    await startSession(currentSessionId);
    
    // Switch UI
    document.getElementById('setup-section').classList.add('hidden');
    document.getElementById('game-section').classList.remove('hidden');
    
    // Initial leaderboard render
    updateUI();
  } catch (e) {
    console.error(e);
    alert('Error starting game');
    document.getElementById('start-btn').disabled = false;
  }
};

window.newGame = async function() {
  if (confirm('Are you sure? This will end the current game.')) {
    window.location.reload();
  }
};
