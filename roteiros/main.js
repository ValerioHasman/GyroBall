/**
 * @author Valério Luz Hasman Junior<https://github.com/ValerioHasman>
 */

import paginas from "./paginas.js";
import tema from "./utilitarios/tema.js";

tema();

if ("serviceWorker" in navigator){
  navigator.serviceWorker.register("serviceWorker.js")
    .then((registro) => {})
    .catch((err) => {
      console.error(err);
    })
}

paginas();
