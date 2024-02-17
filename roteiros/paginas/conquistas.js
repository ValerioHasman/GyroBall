import stringEmElemento from "../utilitarios/stringEmElemento.js";
import aualizarTabela from "./conquistas/aualizarTabela.js";
import gerarTabela from "./conquistas/gerarTabela.js";

const conquistas = stringEmElemento(`
<div class="container-fluid pt-1 conquistas">
  <table class="table table-sm table-hover table-borderless align-middle font-monospace text-end">
    <thead class="sticky-top z-3">
      <tr>
        <th scope="col">RPM</th>
        <th scope="col">Nível</th>
        <th scope="col">KG</th>
        <th scope="col">τorque</th>
        <th scope="col">data</th>
        <th scope="col">hora</th>
        <th scope="col">tempo</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
</div>
`);

const tabela = gerarTabela(conquistas);
aualizarTabela(conquistas, tabela);

export default conquistas;