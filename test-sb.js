const { createClient } = require('@supabase/supabase-js');
const url = 'https://cchuhlopvahndvlcafec.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjaHVobG9wdmFobmR2bGNhZmVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAzMDM0MzcsImV4cCI6MjEwNTg3OTQzN30.Jeo4mbbBzVDQOou38_PEqfP5E5ivLw198Psvge2E8gU';
const sb = createClient(url, key);
async function test() {
  const { data, error } = await sb.from('game_sessions').insert({ room_code: 'TEST12', status: 'waiting' }).select().single();
  console.log("Session:", data, error);
}
test();
