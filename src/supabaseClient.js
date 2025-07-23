import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fwygiwcqrlrmigifhlbf.supabase.co' // replace with your Project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3eWdpd2NxcmxybWlnaWZobGJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0Nzk3NTksImV4cCI6MjA2ODA1NTc1OX0.tA2aXuF6kBmaT_1FBoFcoaT3RgId2psiJaZvb9yNGAQ' // replace with your anon public key

export const supabase = createClient(supabaseUrl, supabaseKey)