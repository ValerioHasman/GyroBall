import ArmazenamentoLocal from "../classes/ArmazenamentoLocal.js";
import stringEmElemento from "../utilitarios/stringEmElemento.js";
import tema from "../utilitarios/tema.js";

const telaConfig = stringEmElemento(`
<div class="container mt-5 user-select-none">
  <h1>Configurações</h1>
  <span class="fs-6 fst-italic text-body-tertiary">Salvas automaticamente</span>

  <h2 class="mt-5 mb-3"><i class="bi bi-circle-half me-2"></i>Temas e Cores</h2>
  <div class="d-flex mb-3">
    <button class="btn btn-secondary bg-gradient" id="resetarCores"><i class="bi bi-arrow-counterclockwise"></i></button>
  </div>

  <div class="row mb-3">
    <div class="col-auto">
      <label for="nivel0" class="form-label">Nível 0</label>
      <input type="color" class="form-control form-control-color p-1" id="nivel0" value="#0000ff" />
    </div>
    <div class="col-auto">
      <label for="nivel1" class="form-label">Nível 1</label>
      <input type="color" class="form-control form-control-color p-1" id="nivel1" value="#00ffff" />
    </div>
    <div class="col-auto">
      <label for="nivel2" class="form-label">Nível 2</label>
      <input type="color" class="form-control form-control-color p-1" id="nivel2" value="#00ff00" />
    </div>
    <div class="col-auto">
      <label for="nivel3" class="form-label">Nível 3</label>
      <input type="color" class="form-control form-control-color p-1" id="nivel3" value="#ffff00" />
    </div>
    <div class="col-auto">
      <label for="nivel4" class="form-label">Nível 4</label>
      <input type="color" class="form-control form-control-color p-1" id="nivel4" value="#ff0000" />
    </div>
    <div class="col-auto">
      <label for="nivel5" class="form-label">Nível 5</label>
      <input type="color" class="form-control form-control-color p-1" id="nivel5" value="#ff00ff" />
    </div>
  </div>

  <div class="container form-check form-switch px-0">
    <label for="dark" class="row form-check-label opcoes py-4 rounded-4 align-items-center">
      <div class="col">
        Tema dark
      </div>
      <div class="col-auto">
        <input class="form-check-input m-0" id="dark" type="checkbox" role="switch" id="tabelaReduzida" />
      </div>
    </label>
  </div>


  <div class="container form-check form-switch px-0">
    <label class="row form-check-label opcoes py-4 rounded-4 align-items-center">
      <div class="col">
        Afastamento na tabela
      </div>
      <div class="col-auto">
        <input class="form-check-input m-0" type="checkbox" role="switch" id="tabelaReduzida" />
      </div>
    </label>
  </div>


  <h2 class="mt-5 mb-3"><i class="bi bi-soundwave me-2"></i>Calibração</h2>
  <div class="d-flex mb-3">
    <button class="btn btn-secondary bg-gradient" id="resetar"><i class="bi bi-arrow-counterclockwise"></i></button>
  </div>

  <div class="mb-3">
    <label for="ignorarGrave" class="form-label">Ignorar grave do Fourier<i class="bi bi-info-circle ms-2" data-bs-toggle="tooltip"
        data-bs-placement="right"
        data-bs-title="Ignore os ruídos graves que não contribuam com os cálculos para o RPM."></i></label>
    <input type="range" class="form-range" min="0" max="127" id="ignorarGrave" />
  </div>
  <div class="mb-3">
    <label for="limiteGrave" class="form-label">Separador para Doppler<i class="bi bi-info-circle ms-2" data-bs-toggle="tooltip"
        data-bs-placement="right"
        data-bs-title="Defina o limite de grave para somar (à esquerda) e agudo para subtrair (à direita)."></i></label>
    <input type="range" class="form-range" min="0" max="127" id="limiteGrave" />
  </div>
  <div class="mb-3">
    <label for="multiplicadorGrave" class="form-label">Multiplicador grave<i class="bi bi-info-circle ms-2"
        data-bs-toggle="tooltip" data-bs-placement="right"
        data-bs-title="Fator que espande o resultado da soma das frequências graves."></i></label>
    <input type="range" class="form-range" min="0.01" max="10" step="0.01" id="multiplicadorGrave" />
  </div>
  <div class="mb-3">
    <label for="multiplicadorAgudo" class="form-label">Multiplicador agudo<i class="bi bi-info-circle ms-2"
        data-bs-toggle="tooltip" data-bs-placement="right"
        data-bs-title="Fator que espande o resultado da soma das frequências agudas."></i></label>
    <input type="range" class="form-range" min="0.01" max="10" step="0.01" id="multiplicadorAgudo" />
  </div>

  <div class="container form-check form-switch px-0">
    <label class="row form-check-label opcoes py-4 rounded-4 align-items-center">
      <div class="col">
        Inverter prioridade do grave<i class="bi bi-info-circle ms-2" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Inverter prioridade consiste em ignorar o grave médio interior para considerar o grave externo, essa mudança meche no grave do Fourier. Desativado considera calcular com grave médio interior definido no grave do Fourier anulando o que está a esquerda."></i>
      </div>
      <div class="col-auto">
        <input class="form-check-input m-0" type="checkbox" role="switch" id="inverterPrioridadeGrave" />
      </div>
    </label>
  </div>
  <div class="my-5"></div>
</div>
`);

const tooltipTriggerList = telaConfig.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));


const local = new ArmazenamentoLocal();

const nivel5 = telaConfig.querySelector("#nivel5");
const nivel4 = telaConfig.querySelector("#nivel4");
const nivel3 = telaConfig.querySelector("#nivel3");
const nivel2 = telaConfig.querySelector("#nivel2");
const nivel1 = telaConfig.querySelector("#nivel1");
const nivel0 = telaConfig.querySelector("#nivel0");
const resetarCores = telaConfig.querySelector("#resetarCores");
const tabelaReduzida = telaConfig.querySelector("#tabelaReduzida");

const ignorarGrave = telaConfig.querySelector("#ignorarGrave");
const limiteGrave = telaConfig.querySelector("#limiteGrave");
const multiplicadorGrave = telaConfig.querySelector("#multiplicadorGrave");
const multiplicadorAgudo = telaConfig.querySelector("#multiplicadorAgudo");
const inverterPrioridadeGrave = telaConfig.querySelector("#inverterPrioridadeGrave");
const btnDark = telaConfig.querySelector("#dark");
const resetar = telaConfig.querySelector("#resetar");

ignorarGrave.addEventListener('input', ()=>{
  local.ignorarGrave = ignorarGrave.value;
  ignorarGrave.value = local.ignorarGrave;
});
limiteGrave.addEventListener('input', ()=>{
  local.limiteGrave = limiteGrave.value;
  limiteGrave.value = local.limiteGrave;
});
multiplicadorGrave.addEventListener('input', ()=>{
  local.multiplicadorGrave = multiplicadorGrave.value;
});
multiplicadorAgudo.addEventListener('input', ()=>{
  local.multiplicadorAgudo = multiplicadorAgudo.value;
});
inverterPrioridadeGrave.addEventListener('input', ()=>{
  local.inverterPrioridadeGrave = inverterPrioridadeGrave.checked;
});
tabelaReduzida.addEventListener('input', ()=>{
  local.tabelaReduzida = tabelaReduzida.checked;
});
btnDark.addEventListener('input', ()=>{
  local.theme = btnDark.checked ? 'dark' : 'light';
  tema();
});

nivel5.addEventListener('change', ()=>{
  local.corNivel5 = nivel5.value;
});
nivel4.addEventListener('change', ()=>{
  local.corNivel4 = nivel4.value;
});
nivel3.addEventListener('change', ()=>{
  local.corNivel3 = nivel3.value;
});
nivel2.addEventListener('change', ()=>{
  local.corNivel2 = nivel2.value;
});
nivel1.addEventListener('change', ()=>{
  local.corNivel1 = nivel1.value;
});
nivel0.addEventListener('change', ()=>{
  local.corNivel0 = nivel0.value;
});

recuperaDados();
function recuperaDados(){
  ignorarGrave.value = local.ignorarGrave;
  limiteGrave.value = local.limiteGrave;
  multiplicadorGrave.value = local.multiplicadorGrave;
  multiplicadorAgudo.value = local.multiplicadorAgudo;
  inverterPrioridadeGrave.checked = local.inverterPrioridadeGrave;
}

recuperarCores();

function recuperarCores(){
  nivel5.value = local.corNivel5;
  nivel4.value = local.corNivel4;
  nivel3.value = local.corNivel3;
  nivel2.value = local.corNivel2;
  nivel1.value = local.corNivel1;
  nivel0.value = local.corNivel0;
  tabelaReduzida.checked = local.tabelaReduzida == `0.5rem 0.5rem`;
}

resetar.addEventListener('click', ()=>{
  local.resetar();
  recuperaDados();
});

btnDark.checked = local.theme != 'dark' ? false : true;

resetarCores.addEventListener('click', ()=>{
  local.resetarCores();
  recuperarCores();
});

export default telaConfig;