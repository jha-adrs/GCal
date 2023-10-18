let config={}


config.NEXT_PUBLIC_SUPABASE_URL="https://vdmutamoqwuqkwkxsjcf.supabase.co"

config.SUPABASE_GOOGLE_SIGNIN_CALLBACK="https://vdmutamoqwuqkwkxsjcf.supabase.co/auth/v1/callback"

config.GOOGLE_SCOPES=[
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/userinfo.email'
]
config.GOOGLE_REDIRECT_URI="https://vdmutamoqwuqkwkxsjcf.supabase.co/auth/v1/callback"
config.GOOGLE_PRIMARY_CALENDAR_URI="https://www.googleapis.com/calendar/v3/calendars/primary/events"
config.HOST_URI="http://localhost:3000"
config.FETCH_EVENTS_URI="/api/fetchevents"
module.exports = config;