import base from "../bd.js";
import GyroBall from "../classes/GyroBall.js";
import Modais from "../classes/Modais.js";
import stringEmElemento from "../utilitarios/stringEmElemento.js";
import tempoDecorrido from "../utilitarios/tempoDecorrido.js";
import DeduzirRPM from "./praticar/DeduzirRPM.js";
import exercicioPraticado from "./praticar/exercicioPraticado.js";

const praticar = stringEmElemento(`
<div class="container">
  <div class="row justify-content-center mt-3">
    <div class="gyroball">
      <div id="ball"></div>
    </div>
  </div>
  <div class="row p-1">
    <div class="col d-flex">
      <button type="button" id="controle" class="btn me-3 btn-lg btn-secondary"><i class="bi bi-mic-fill"></i></button>
    </div>
  </div>
  <div class="row border-bottom p-1">
    <div id="tempo" class="col text-end font-monospace">00:00</div>
    <div class="col">Tempo</div>
  </div>
  <div class="row border-bottom p-1">
    <div id="nivel" class="col text-end font-monospace">0</div>
    <div class="col">Nível</div>
  </div>
  <div class="row border-bottom p-1">
    <div id="rpm" class="col text-end font-monospace">0</div>
    <div class="col">RPM</div>
  </div>
  <div class="row border-bottom p-1">
    <div id="kg" class="col text-end font-monospace">0.00</div>
    <div class="col">KG</div>
  </div>
  <div class="row border-bottom p-1">
    <div id="torque" class="col text-end font-monospace">0.00</div>
    <div class="col">τorque</div>
  </div>
</div>
`);

const controle = praticar.querySelector('#controle');
const ball = praticar.querySelector('#ball');
const tempo = praticar.querySelector('#tempo');
const nivel = praticar.querySelector('#nivel');
const rpm = praticar.querySelector('#rpm');
const kg = praticar.querySelector('#kg');
const torque = praticar.querySelector('#torque');
const gb = new GyroBall();
const ouvinte = new DeduzirRPM(inserirDadosNosGraficos);

const monitorar = new class {
  #maximoRPM = 0;
  #intervalo = null;
  #data = 0;

  set maxRPM(valor) {
    if (this.#maximoRPM < valor) {
      this.#maximoRPM = valor;
    }
  }
  get maxRPM() {
    return this.#maximoRPM;
  }
  get data() {
    return this.#data;
  }
  get tempo() {
    return this.#data == 0 ? 0 : (Date.now() - this.#data);
  }
  get iniciar() {
    return () => {
      if (this.#maximoRPM != 0) {
        this.finalizar();
      }
      this.#data = Date.now();
    }
  }
  get finalizar() {
    return () => {
      this.#maximoRPM = 0;
      this.#data = 0;
    }
  }
}

function inserirDadosNosGraficos(irpms) {
  monitorar.maxRPM = irpms;
  gb.rpm = irpms;
  gb.corDinamica = localStorage.getItem('corDinamica');
  tempo.innerText = tempoDecorrido(monitorar.tempo);
  nivel.innerText = gb.nivel;
  rpm.innerText = gb.rpm;
  kg.innerText = gb.kg;
  torque.innerText = gb.torque;
  ball.style.backgroundColor = gb.rgb;
  ball.style.boxShadow = `0 0 ${gb.procentagem * 2}rem ${gb.rgb}`;
}

function salvaProgresso() {
  const resultado = { rpm: monitorar.maxRPM, datams: monitorar.data, tempoms: monitorar.tempo };
  monitorar.finalizar();
  base.gravarDado('conquistas', resultado)
    .then((res) => {
      const event = new Event("salvaProgresso");
      resultado.id = res.target.result;
      event.data = resultado;
      document.dispatchEvent(event);
    });

  void new Modais(
    'Parabéns, exercício praticado com sucesso',
    exercicioPraticado(resultado)
    , () => {
      controle.focus();
    },
    undefined).exibe();
}

function iniciar() {
  ouvinte.startAudioCapture();
  controle.innerHTML = `<i class="bi bi-mic-mute-fill"></i>`;
  latenciaDoControle();
  controle.removeEventListener('click', iniciar);
  controle.addEventListener('click', parar);
  monitorar.iniciar();
}

function parar() {
  ouvinte.stopAudioCapture();
  controle.innerHTML = `<i class="bi bi-mic-fill"></i>`
  latenciaDoControle();
  controle.removeEventListener('click', parar);
  controle.addEventListener('click', iniciar);
  salvaProgresso();
  setTimeout(() => {
    inserirDadosNosGraficos(0);
    ball.style.backgroundColor = 'rgb(0,0,0)';
    ball.style.boxShadow = 'unset';
  }, 150);
}

function latenciaDoControle() {
  controle.disabled = true;
  setTimeout(() => {
    controle.disabled = false;
  }, 250);
}

controle.addEventListener('click', iniciar);

export default praticar;