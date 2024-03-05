import GyroBall from "../../classes/GyroBall.js";
import stringEmElemento from "../../utilitarios/stringEmElemento.js";
import tempoDecorrido from "../../utilitarios/tempoDecorrido.js";

export default function (resultado, primeiraMao) {

  const gb2 = new GyroBall();
  const gb1 = new GyroBall();
  gb2.rpm = resultado.rpm;
  gb1.rpm = primeiraMao.rpm;

  function verConquistas() {
    btn0.removeEventListener('click', verConquistas);
    const ancora = document.createElement('a');
    ancora.href = '#conquistas';
    ancora.click();
  }

  const conteudo = stringEmElemento(`
<div>
  <p>Resultado da prática de <span class="font-monospace">${tempoDecorrido(primeiraMao.tempoms)}</span>:</p>

  <div class="row">
    <div class="col">
      <p class="text-center">1.º braço</p>

      <div class="row border-bottom py-1">
        <div class="col text-end font-monospace">${gb1.nivel}</div>
        <div class="col">Nível</div>
      </div>
      <div class="row border-bottom py-1">
        <div class="col text-end font-monospace">${gb1.rpm}</div>
        <div class="col">RPM</div>
      </div>
      <div class="row border-bottom py-1">
        <div class="col text-end font-monospace">${gb1.kg}</div>
        <div class="col">KG</div>
      </div>
      <div class="row border-bottom py-1">
        <div class="col text-end font-monospace">${gb1.torque}</div>
        <div class="col">τorque</div>
      </div>

    </div>
    <div class="col">
      <p class="text-center">2.º braço</p>

      <div class="row border-bottom py-1">
        <div class="col text-end font-monospace">${gb2.nivel}</div>
        <div class="col">Nível</div>
      </div>
      <div class="row border-bottom py-1">
        <div class="col text-end font-monospace">${gb2.rpm}</div>
        <div class="col">RPM</div>
      </div>
      <div class="row border-bottom py-1">
        <div class="col text-end font-monospace">${gb2.kg}</div>
        <div class="col">KG</div>
      </div>
      <div class="row border-bottom py-1">
        <div class="col text-end font-monospace">${gb2.torque}</div>
        <div class="col">τorque</div>
      </div>


    </div>
  </div>

  <p class="mt-5">O que deseja fazer?</p>
  <div class="d-flex gap-2">
    <button type="button" data-bs-dismiss="modal" class="btn btn-secondary">Ver conquistas<i class="bi bi-table ms-2"></i></button>
    <button type="button" data-bs-dismiss="modal" class="btn btn-primary">Nova prática</button>
  </div>
</div>
  `);

  const btn0 = conteudo.querySelector('.btn-secondary');
  btn0.addEventListener('click', verConquistas);

  const btn1 = conteudo.querySelector('.btn-primary');
  svgGB(btn1);

  return conteudo;
}

function svgGB(elem){
  const urlGB = window.location.origin + window.location.pathname + 'icones/praticar.svg';

  fetch(urlGB)
  .then(resp => resp.text())
  .then((svgGB)=>{
    elem.innerHTML += svgGB;
    const svg = elem.querySelector('svg');
    svg.style.width = 16;
    svg.style.height = 16;
    svg.classList.add('ms-1');
  });
}