import base from "../bd.js";
import ArmazenamentoLocal from "../classes/ArmazenamentoLocal.js";
import GyroBall from "../classes/GyroBall.js";
import Modais from "../classes/Modais.js";
import stringEmElemento from "../utilitarios/stringEmElemento.js";
import tempoDecorrido from "../utilitarios/tempoDecorrido.js";
import DeduzirRPM from "./praticar/DeduzirRPM.js";
import exercicioPraticado from "./praticar/exercicioPraticado.js";

const praticar = stringEmElemento(`
<div class="container fs-5  ">
  <div class="row justify-content-center mt-3">
    <div class="col">
      <div class="gyroball">
        <div id="ball"></div>
      </div>
    </div>
    <div class="col-auto pe-0">
      <div id="ponteiro"></div>
    </div>
    <div class="col-auto ps-0">
      <div class="barraRPM rounded-5 border">
        <div id="barnivel5" style="background-color: #ff00ff;"></div>
        <div id="barnivel4" style="background-color: #ff0000;"></div>
        <div id="barnivel3" style="background-color: #ffff00;"></div>
        <div id="barnivel2" style="background-color: #00ff00;"></div>
        <div id="barnivel1" style="background-color: #00ffff;"></div>
        <div id="barnivel0" style="background-color: #0000ff;"></div>
      </div>
    </div>
  </div>
  <div class="row p-1">
    <div class="col d-flex">
      <button type="button" id="controle" class="btn me-3 btn-lg btn-secondary bg-gradient"><i class="bi bi-mic-fill"></i></button>
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

const ponteiro = praticar.querySelector('#ponteiro');
const barnivel5 = praticar.querySelector('#barnivel5');
const barnivel4 = praticar.querySelector('#barnivel4');
const barnivel3 = praticar.querySelector('#barnivel3');
const barnivel2 = praticar.querySelector('#barnivel2');
const barnivel1 = praticar.querySelector('#barnivel1');
const barnivel0 = praticar.querySelector('#barnivel0');

definirCores();
window.document.addEventListener('trocarDeCores', definirCores);
function definirCores() {
  const local = new ArmazenamentoLocal();

  barnivel5.style.backgroundColor = local.corNivel5;
  barnivel4.style.backgroundColor = local.corNivel4;
  barnivel3.style.backgroundColor = local.corNivel3;
  barnivel2.style.backgroundColor = local.corNivel2;
  barnivel1.style.backgroundColor = local.corNivel1;
  barnivel0.style.backgroundColor = local.corNivel0;
}

const controle = praticar.querySelector('#controle');
const ball = praticar.querySelector('#ball');
const tempo = praticar.querySelector('#tempo');
const nivel = praticar.querySelector('#nivel');
const rpm = praticar.querySelector('#rpm');
const kg = praticar.querySelector('#kg');
const torque = praticar.querySelector('#torque');
const gb = new GyroBall();
const monitorar = new class {
  #array = [];
  #maximoRPM = 0;
  #intervalo = null;
  #data = 0;

  set media(valor) {
    this.#array.push(valor);
  }
  get media() {
    const average = list => list.reduce((prev, curr) => prev + curr) / list.length;
    return average(this.#array);
  }
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
    return (funcao) => {
      if (this.#maximoRPM != 0) {
        this.finalizar();
      }
      const func = ()=>{
        const media = this.media;
        this.#array = [];
        this.maxRPM = media;
        funcao(media);
      }

      this.#intervalo = setInterval(func, 500);
      this.#data = Date.now();
    }
  }
  get finalizar() {
    return () => {
      this.#maximoRPM = 0;
      this.#data = 0;
      clearInterval(this.#intervalo);
      this.#array = [];
    }
  }
}
const ouvinte = new DeduzirRPM((i)=>{ monitorar.media = i });

function inserirDadosNosGraficos(irpms) {
  gb.rpm = irpms;
  tempo.innerText = tempoDecorrido(monitorar.tempo);
  nivel.innerText = gb.nivel;
  rpm.innerText = gb.rpm;
  kg.innerText = gb.kg;
  torque.innerText = gb.torque;
  ball.style.backgroundColor = gb.corHEX;
  ball.style.boxShadow = `0 0 ${gb.procentagem * 2}rem ${gb.corHEX}`;
  ponteiro.style.top = controlarPonteiro(gb.rpm);
}

function controlarPonteiro(rpm) {
  function limitar(valor) {
    if (valor > 12000) {
      return limitar(valor - 12000);
    }
    return valor;
  }
  const porcent = limitar(rpm) / 12000 * 100;
  return `${100 - porcent}%`;
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
  monitorar.iniciar(inserirDadosNosGraficos);
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