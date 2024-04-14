const { invoke } = window.__TAURI__.tauri;

let htInputEl;
let htEl;
let tvaEl;
let ttcEl;

function toLocalePrice(price) {
  return price.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
}

async function computeTtc() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  const ht = Number(htInputEl.value) || 0;

  console.log("Computing TVA of", ht);

  const tva = Number(await invoke("compute_tva", { ht: new String(ht) }));
  const ttc = Math.round((ht + tva) * 100)/100
  htEl.textContent = toLocalePrice(ht);
  tvaEl.textContent = toLocalePrice(tva);
  ttcEl.textContent = toLocalePrice(ttc);
}

window.addEventListener("DOMContentLoaded", () => {
  htInputEl = document.querySelector("#ht-input");
  htEl = document.querySelector("#ht");
  tvaEl = document.querySelector("#tva");
  ttcEl = document.querySelector("#ttc");
  
  htEl.textContent = toLocalePrice(0);
  tvaEl.textContent = toLocalePrice(0);
  ttcEl.textContent = toLocalePrice(0);
  
  // At every input change, compute the TTC
  document.querySelector("#ht-input").addEventListener("input", computeTtc);
});
