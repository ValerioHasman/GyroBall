/**
 * @author Valério Luz Hasman Junior<https://github.com/ValerioHasman>
 */

import paginas from "./paginas.js";
import sobre from "./paginas/configuracao/sobre.js";
import sw from "./sw.js";
import tema from "./utilitarios/tema.js";

if(localStorage.getItem("sobre") == null){
  sobre();
  localStorage.setItem("sobre", "ok");
}
tema();
sw();
paginas();