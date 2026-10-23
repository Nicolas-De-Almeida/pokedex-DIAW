import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Sem as variáveis de ambiente o app funciona apenas com o localStorage
export const supabase = url && anonKey ? createClient(url, anonKey) : null

// Garante uma sessão (login anônimo) para identificar o dono dos favoritos
async function ensureUser() {
  const { data } = await supabase.auth.getSession()
  if (data.session) return data.session.user

  const { data: signIn, error } = await supabase.auth.signInAnonymously()
  if (error) throw error
  return signIn.user
}

export async function fetchFavorites() {
  await ensureUser()
  const { data, error } = await supabase.from('favorites').select('pokemon_id').order('created_at')
  if (error) throw error
  return data.map((row) => row.pokemon_id)
}

export async function addFavorites(pokemonIds) {
  const { error } = await supabase
    .from('favorites')
    .upsert(
      pokemonIds.map((id) => ({ pokemon_id: id })),
      { onConflict: 'user_id,pokemon_id', ignoreDuplicates: true }
    )
  if (error) throw error
}

export async function removeFavorite(pokemonId) {
  const { error } = await supabase.from('favorites').delete().eq('pokemon_id', pokemonId)
  if (error) throw error
}
