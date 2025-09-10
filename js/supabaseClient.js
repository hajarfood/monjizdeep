
import { createClient } from '@supabase/supabase-js'

// استبدل هذه القيم بالـ Project URL و Anon Public Key الخاصين بك
// من صفحة API في لوحة تحكم Supabase.
const supabaseUrl = 'Yhttps://ufsikrdwunsmwrbfxeed.supabase.co' 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmc2lrcmR3dW5zbXdyYmZ4ZWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Nzk4MTAsImV4cCI6MjA3MzA1NTgxMH0.wm9ynLAxxEK7TNZz4MReXmhO9roDQ6BQHOTmS_wW0dI' 

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
