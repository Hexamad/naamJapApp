import { supabase } from './supabase'

export const auth = {
  register: async (userData) => {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          name: userData.name
        }
      }
    })
    if (error) throw error
    return { data }
  },

  login: async (credentials) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    })
    if (error) throw error
    return { data }
  },

  getProfile: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return { data: user }
  }
}

export const progress = {
  updateProgress: async (mantraData) => {
    const { data, error } = await supabase
      .from('progress')
      .upsert({
        user_id: (await supabase.auth.getUser()).data.user.id,
        mantra_count: mantraData.count,
        updated_at: new Date()
      })
    if (error) throw error
    return { data }
  },

  getAllProgress: async () => {
    const { data, error } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', (await supabase.auth.getUser()).data.user.id)
    if (error) throw error
    return { data }
  }
}