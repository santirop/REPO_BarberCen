// Copiá estos datos desde tu proyecto de Supabase: Project URL y Publishable key.
// La clave publishable (sb_publishable_...) puede usarse en el navegador.
// NUNCA coloques aquí una Secret key o service_role.

const SUPABASE_URL = "https://TU-PROYECTO.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "TU_CLAVE_PUBLICABLE";

if (
    window.supabase &&
    SUPABASE_URL !== "https://TU-PROYECTO.supabase.co" &&
    SUPABASE_PUBLISHABLE_KEY !== "TU_CLAVE_PUBLICABLE"
) {
    window.supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );
} else {
    window.supabaseClient = null;
}
