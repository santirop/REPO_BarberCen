
const SUPABASE_URL = "https://pazhejqmhbnowayfvjdw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_PetMbwUgDkb_LNycpvqiSQ_-9W1LcZq";

if (window.supabase) {
    window.supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );
} else {
    window.supabaseClient = null;
    console.error("No se pudo cargar la librería de Supabase.");
}


