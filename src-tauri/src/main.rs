// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
// Computes the TVA (Taxe sur la Valeur Ajoutée) from the HT (Hors Taxe) value.
// The TVA is 20% of the HT value.
// Returns the TVA value, as a String, rounded to 2 decimal places.
fn compute_tva(ht: &str) -> String {
    let ht: f32 = ht.parse().unwrap();
    let tva: f32 = ht * 0.2;
    format!("{:.2}", tva)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![compute_tva])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
