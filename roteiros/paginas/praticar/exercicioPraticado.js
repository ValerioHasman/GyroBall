import GyroBall from "../../classes/GyroBall.js";
import stringEmElemento from "../../utilitarios/stringEmElemento.js";
import tempoDecorrido from "../../utilitarios/tempoDecorrido.js";

export default function (resultado) {

  const gb = new GyroBall();
  gb.rpm = resultado.rpm;

  function verConquistas() {
    btn0.removeEventListener('click', verConquistas);
    const ancora = document.createElement('a');
    ancora.href = '#conquistas';
    ancora.click();
  }
  function iniciarSegundoBraco() {
    btn1.removeEventListener('click', iniciarSegundoBraco);
    const event = new Event("iniciarSegundoBraco");
    event.data = resultado;
    document.dispatchEvent(event);
  }

  const conteudo = stringEmElemento(`
<div>
  <p>Resultado da prática:</p>
  <div class="row border-bottom py-1">
    <div class="col text-end font-monospace">${tempoDecorrido(resultado.tempoms)}</div>
    <div class="col">Tempo</div>
  </div>
  <div class="row border-bottom py-1">
    <div class="col text-end font-monospace">${gb.nivel}</div>
    <div class="col">Nível</div>
  </div>
  <div class="row border-bottom py-1">
    <div class="col text-end font-monospace">${gb.rpm}</div>
    <div class="col">RPM</div>
  </div>
  <div class="row border-bottom py-1">
    <div class="col text-end font-monospace">${gb.kg}</div>
    <div class="col">KG</div>
  </div>
  <div class="row border-bottom py-1">
    <div class="col text-end font-monospace">${gb.torque}</div>
    <div class="col">τorque</div>
  </div>
  <p class="mt-5">O que deseja fazer?</p>
  <div class="d-flex gap-2">
    <button type="button" data-bs-dismiss="modal" class="btn btn-secondary">Ver conquistas<i class="bi bi-table ms-2"></i></button>
    <button type="button" data-bs-dismiss="modal" class="btn btn-primary">Praticar com outro braço<i class="bi bi-shuffle ms-2"></i></button>
  </div>
</div>
  `);

  const btn0 = conteudo.querySelector('.btn-secondary');
  btn0.addEventListener('click', verConquistas);

  const btn1 = conteudo.querySelector('.btn-primary');
  btn1.addEventListener('click', iniciarSegundoBraco);


  return conteudo;
}