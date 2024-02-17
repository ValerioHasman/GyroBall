import ArmazenamentoLocal from "../classes/ArmazenamentoLocal.js";
import stringEmElemento from "../utilitarios/stringEmElemento.js";
import tema from "../utilitarios/tema.js";

const telaConfig = stringEmElemento(`
<div class="container mt-5 user-select-none">
<h1>Configurações</h1>

<h2 class="mt-5 mb-3"><i class="bi bi-soundwave me-2"></i>Calibração</h2>
<div class="d-flex mb-3">
  <button class="btn btn-outline-theme" id="resetar"><i class="bi bi-arrow-counterclockwise"></i></button>
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
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="inverterPrioridadeGrave" />
  <label class="form-check-label" for="inverterPrioridadeGrave">
    Inverter prioridade do grave<i class="bi bi-info-circle ms-2"
    data-bs-toggle="tooltip" data-bs-placement="right"
    data-bs-title="Inverter prioridade consiste em ignorar o grave médio interior para considerar o grave externo, essa mudança meche no grave do Fourier. Desativado considera calcular com grave médio interior definido no grave do Fourier anulando o que está a esquerda."></i>
  </label>
</div>

<h2 class="mt-5 mb-3"><i class="bi bi-circle-half me-2"></i>Tema</h2>
<div class="d-flex gap-2 mb-3">
  <div class="btn-group">
    <input type="radio" class="btn-check" name="tema" id="light" autocomplete="off" />
    <label class="btn btn-outline-theme rounded-start-5" for="light"><i class="bi bi-brightness-high"></i></label>
    <input type="radio" class="btn-check" name="tema" id="dark" autocomplete="off"  />
    <label class="btn btn-outline-theme rounded-end-5" for="dark"><i class="bi bi-moon"></i></label>
  </div>
</div>
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="corDinamica" />
  <label class="form-check-label" for="corDinamica">
    Cor dinâmica.
  </label>
</div>
</div>
`);

const tooltipTriggerList = telaConfig.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));


const local = new ArmazenamentoLocal();

const ignorarGrave = telaConfig.querySelector("#ignorarGrave");
const limiteGrave = telaConfig.querySelector("#limiteGrave");
const multiplicadorGrave = telaConfig.querySelector("#multiplicadorGrave");
const multiplicadorAgudo = telaConfig.querySelector("#multiplicadorAgudo");
const inverterPrioridadeGrave = telaConfig.querySelector("#inverterPrioridadeGrave");
const corDinamica = telaConfig.querySelector("#corDinamica");
const btnLight = telaConfig.querySelector("#light");
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
corDinamica.addEventListener('input', ()=>{
  local.corDinamica = corDinamica.checked;
});

recuperaDados();

function recuperaDados(){
  ignorarGrave.value = local.ignorarGrave;
  limiteGrave.value = local.limiteGrave;
  multiplicadorGrave.value = local.multiplicadorGrave;
  multiplicadorAgudo.value = local.multiplicadorAgudo;
  inverterPrioridadeGrave.checked = local.inverterPrioridadeGrave;
  corDinamica.checked = local.corDinamica;
}

resetar.addEventListener('click', ()=>{
  local.resetar();
  recuperaDados();
});

telaConfig.querySelector(`#${local.theme}`).checked = true;

btnLight.addEventListener('input', ()=>{
  local.theme = 'light';
  tema();
});
btnDark.addEventListener('input', ()=>{
  local.theme = 'dark';
  tema();
});

export default telaConfig;