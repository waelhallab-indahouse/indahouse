// ============================================================
// INDAHOUSE — Supabase Client
// File: src/lib/supabase.js
// ============================================================
// 1. npm install @supabase/supabase-js
// 2. Create .env file in project root with your keys
// 3. Import this file anywhere in the app

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL  = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

// ─── AUTH HELPERS ────────────────────────────────────────────

/** Sign up a new user (host) */
export async function signUpUser({ name, email, password, city }) {
  const { data, error } = await supabase.auth.signUp({
    email, password,
    options: { data: { name, city, role: 'user' } }
  });
  if (error) throw error;
  return data;
}

/** Sign up a new DJ */
export async function signUpDJ({ djName, email, password, city, fee, minHours, genres, eventTypes, bio }) {
  // 1. Create auth account
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email, password,
    options: { data: { name: djName, role: 'dj' } }
  });
  if (authError) throw authError;

  // 2. Create DJ profile
  const { error: djError } = await supabase.from('djs').insert({
    user_id:     authData.user.id,
    stage_name:  djName,
    city,
    fee:         parseInt(fee),
    min_hours:   parseInt(minHours) || 1,
    genres:      genres || [],
    event_types: eventTypes || [],
    bio,
  });
  if (djError) throw djError;

  // 3. Update user role
  await supabase.from('users').update({ role: 'dj' }).eq('id', authData.user.id);
  return authData;
}

/** Login */
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

/** Logout */
export async function logout() {
  await supabase.auth.signOut();
}

/** Get current logged-in user with profile */
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from('users').select('*').eq('id', user.id).single();
  return { ...user, ...profile };
}

// ─── DJ HELPERS ───────────────────────────────────────────────

/** Fetch all DJs with availability */
export async function fetchDJs({ genre, eventType, maxFee, city } = {}) {
  let query = supabase
    .from('djs')
    .select(`*, users(name, email), dj_availability(date)`)
    .eq('is_available', true);

  if (maxFee)     query = query.lte('fee', maxFee);
  if (city)       query = query.ilike('city', `%${city}%`);
  if (genre)      query = query.contains('genres', [genre]);
  if (eventType)  query = query.contains('event_types', [eventType]);

  const { data, error } = await query.order('rating', { ascending: false });
  if (error) throw error;
  return data;
}

/** Fetch reviews for a DJ */
export async function fetchReviews(djId) {
  const { data, error } = await supabase
    .from('reviews')
    .select(`*, users(name)`)
    .eq('dj_id', djId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

/** Submit a review */
export async function submitReview({ bookingId, djId, rating, text, eventType, duration }) {
  const user = await getCurrentUser();
  const { data, error } = await supabase.from('reviews').insert({
    booking_id: bookingId,
    user_id:    user.id,
    dj_id:      djId,
    rating, text, event_type: eventType, duration,
  });
  if (error) throw error;
  return data;
}

// ─── BOOKING HELPERS ──────────────────────────────────────────

/** Create a booking */
export async function createBooking({ djId, date, startTime, duration, eventType, address, note, fee }) {
  const user = await getCurrentUser();
  const token = Math.random().toString(36).slice(2) + Date.now().toString(36);

  const { data, error } = await supabase.from('bookings').insert({
    user_id:       user.id,
    dj_id:         djId,
    date,
    start_time:    startTime,
    duration,
    event_type:    eventType,
    address,
    note,
    fee,
    session_token: token,
  }).select().single();
  if (error) throw error;
  return data;
}

/** Fetch user's bookings */
export async function fetchMyBookings() {
  const user = await getCurrentUser();
  const { data, error } = await supabase
    .from('bookings')
    .select(`*, djs(stage_name, avatar, city, genres)`)
    .eq('user_id', user.id)
    .order('date', { ascending: true });
  if (error) throw error;
  return data;
}

/** DJ: fetch incoming bookings */
export async function fetchDJBookings(djId) {
  const { data, error } = await supabase
    .from('bookings')
    .select(`*, users(name, email)`)
    .eq('dj_id', djId)
    .order('date', { ascending: true });
  if (error) throw error;
  return data;
}

/** DJ: confirm a booking */
export async function confirmBooking(bookingId) {
  const { error } = await supabase
    .from('bookings')
    .update({ status: 'confirmed' })
    .eq('id', bookingId);
  if (error) throw error;
}

// ─── LIVE SESSION HELPERS ─────────────────────────────────────

/** Create a live session room */
export async function createLiveSession(bookingId) {
  const user = await getCurrentUser();
  const booking = await supabase.from('bookings').select('*').eq('id', bookingId).single();
  const roomToken = `indahouse-${bookingId.slice(0,8)}-${Date.now()}`;

  const { data, error } = await supabase.from('live_sessions').insert({
    booking_id:  bookingId,
    dj_id:       booking.data.dj_id,
    user_id:     booking.data.user_id,
    room_token:  roomToken,
    status:      'live',
    started_at:  new Date().toISOString(),
  }).select().single();
  if (error) throw error;
  return data;
}

/** Send a song request (realtime) */
export async function sendSongRequest(sessionId, song) {
  const user = await getCurrentUser();
  const { error } = await supabase.from('song_requests').insert({
    session_id: sessionId,
    user_id:    user.id,
    song,
  });
  if (error) throw error;
}

/** Subscribe to song requests in real time */
export function subscribeSongRequests(sessionId, callback) {
  return supabase
    .channel(`requests:${sessionId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'song_requests',
      filter: `session_id=eq.${sessionId}`,
    }, payload => callback(payload.new))
    .subscribe();
}

/** Subscribe to session status changes */
export function subscribeSession(sessionId, callback) {
  return supabase
    .channel(`session:${sessionId}`)
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'live_sessions',
      filter: `id=eq.${sessionId}`,
    }, payload => callback(payload.new))
    .subscribe();
}
