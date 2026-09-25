// Supabase configuration
const SUPABASE_URL = 'https://cchuhlopvahndvlcafec.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjaHVobG9wdmFobmR2bGNhZmVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAzMDM0MzcsImV4cCI6MjEwNTg3OTQzN30.Jeo4mbbBzVDQOou38_PEqfP5E5ivLw198Psvge2E8gU';

let supabase;

function initSupabase() {
  if (!supabase) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabase;
}

// --- Session Management ---
async function createSession(roomCode) {
  const sb = initSupabase();
  const { data, error } = await sb
    .from('game_sessions')
    .insert({ room_code: roomCode, status: 'waiting' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function getSession(roomCode) {
  const sb = initSupabase();
  const { data, error } = await sb
    .from('game_sessions')
    .select('*')
    .eq('room_code', roomCode)
    .single();
  if (error) return null;
  return data;
}

async function startSession(sessionId) {
  const sb = initSupabase();
  const { error } = await sb
    .from('game_sessions')
    .update({ status: 'active' })
    .eq('id', sessionId);
  if (error) throw error;
}

async function endSession(sessionId) {
  const sb = initSupabase();
  const { error } = await sb
    .from('game_sessions')
    .update({ status: 'finished' })
    .eq('id', sessionId);
  if (error) throw error;
}

// --- Team Management ---
async function createTeam(sessionId, teamName) {
  const sb = initSupabase();
  const { data, error } = await sb
    .from('teams')
    .insert({
      session_id: sessionId,
      team_name: teamName,
      current_room: 0,
      progress: 0,
      elapsed_ms: 0,
      penalty_ms: 0,
      hints_used: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 }
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function updateTeamProgress(teamId, currentRoom, progress, elapsedMs, penaltyMs, hintsUsed) {
  const sb = initSupabase();
  const updateData = {
    current_room: currentRoom,
    progress: progress,
    elapsed_ms: elapsedMs,
    penalty_ms: penaltyMs,
    hints_used: hintsUsed
  };
  const { error } = await sb
    .from('teams')
    .update(updateData)
    .eq('id', teamId);
  if (error) throw error;
}

async function finishTeam(teamId, elapsedMs, penaltyMs) {
  const sb = initSupabase();
  const { error } = await sb
    .from('teams')
    .update({
      current_room: 6,
      progress: 100,
      elapsed_ms: elapsedMs,
      penalty_ms: penaltyMs,
      finished_at: new Date().toISOString()
    })
    .eq('id', teamId);
  if (error) throw error;
}

async function setTeamStartTime(teamId) {
  const sb = initSupabase();
  const { error } = await sb
    .from('teams')
    .update({ start_time: new Date().toISOString(), current_room: 1 })
    .eq('id', teamId);
  if (error) throw error;
}

async function getTeamsForSession(sessionId) {
  const sb = initSupabase();
  const { data, error } = await sb
    .from('teams')
    .select('*')
    .eq('session_id', sessionId)
    .order('progress', { ascending: false });
  if (error) throw error;
  return data || [];
}

// --- Realtime Subscriptions ---
function subscribeToTeams(sessionId, callback) {
  const sb = initSupabase();
  return sb
    .channel('teams-' + sessionId)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'teams',
      filter: 'session_id=eq.' + sessionId
    }, (payload) => {
      callback(payload);
    })
    .subscribe();
}

function subscribeToSession(roomCode, callback) {
  const sb = initSupabase();
  return sb
    .channel('session-' + roomCode)
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'game_sessions',
      filter: 'room_code=eq.' + roomCode
    }, (payload) => {
      callback(payload);
    })
    .subscribe();
}

// --- Cleanup ---
async function deleteSession(sessionId) {
  const sb = initSupabase();
  // Teams will cascade delete
  const { error } = await sb
    .from('game_sessions')
    .delete()
    .eq('id', sessionId);
  if (error) throw error;
}
