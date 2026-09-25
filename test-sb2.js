const { createClient } = require('@supabase/supabase-js');
const url = 'https://cchuhlopvahndvlcafec.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjaHVobG9wdmFobmR2bGNhZmVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAzMDM0MzcsImV4cCI6MjEwNTg3OTQzN30.Jeo4mbbBzVDQOou38_PEqfP5E5ivLw198Psvge2E8gU';
const sb = createClient(url, key);
async function test() {
  const { data: session, error: err1 } = await sb.from('game_sessions').select('*').eq('room_code', 'TEST12').single();
  console.log("GetSession:", session, err1);
  const { data: team, error: err2 } = await sb.from('teams').insert({
    session_id: session.id,
    team_name: 'Test Team 2',
    current_room: 0,
    progress: 0,
    elapsed_ms: 0,
    penalty_ms: 0,
    hints_used: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 }
  }).select().single();
  console.log("Team:", team, err2);
}
test();
