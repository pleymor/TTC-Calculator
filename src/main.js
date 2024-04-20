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

  // At click on a card, copy the value 
  // of the child .amount to the buffer
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", (event) => {
      const value = event.target.querySelector(".amount").textContent;
      navigator.clipboard.writeText(value);

      // display a toast
      const label = event.target.querySelector("h2").textContent;
      const toast = document.createElement("div");
      toast.classList.add("toast");
      toast.textContent = `${label} "${value}" copié dans le presse-papier`
      document.body.appendChild(toast);
      setTimeout(() => { toast.remove() }, 2000);
    });
  });
});
