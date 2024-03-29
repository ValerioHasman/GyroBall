import stringEmElemento from "../../utilitarios/stringEmElemento.js";
import { nulo } from "./aualizarTabela.js";

/** @param {Element} conquistas  */
function gerarTabela(conquistas) {

  const table = conquistas.querySelector('table');

  DataTable.ext.type.order['ordenando-asc'] = function (segundo, primeiro) {
    return enviarParaOrden(segundo, primeiro, 'asc');
  };

  DataTable.ext.type.order['ordenando-desc'] = function (segundo, primeiro) {
    return enviarParaOrden(segundo, primeiro, 'desc');
  };

  const tabela = new DataTable(table, {
    "columnDefs": [
      {
        "orderable": false,
        "targets": 8
      },
      {
        "type": 'ordenando',
        "targets": '_all',
      }
    ],
    "order": [
      [5, 'desc']
    ],
    "language": {
      "sProcessing": "Processando...",
      "sLengthMenu": `_MENU_ <i class="bi bi-table">&nbsp;</i>`,
      "sZeroRecords": "Nenhum resultado encontrado",
      "sInfo": "",
      "sInfoEmpty": "",
      "sInfoFiltered": "(Filtrados de _MAX_ registros)",
      "sInfoPostFix": "",
      "sSearch": `<i class="bi bi-search">&nbsp;</i>`,
      "sUrl": "",
      "oPaginate": {
        "sFirst": `<i class="bi bi-chevron-double-left">&nbsp;</i>`,
        "sPrevious": `<i class="bi bi-chevron-left">&nbsp;</i>`,
        "sNext": `<i class="bi bi-chevron-right">&nbsp;</i>`,
        "sLast": `<i class="bi bi-chevron-double-right">&nbsp;</i>`
      },
      "oAria": {
        "sSortAscending": ": Ordenar colunas de forma ascendente",
        "sSortDescending": ": Ordenar colunas de forma descendente"
      }
    },
    "lengthMenu": [
      [10, 25, 50, -1],
      ['10', '25', '50', 'Tudo']
    ]
  });
  const pesquisa = conquistas.querySelector('#DataTables_Table_0_length').parentElement;
  const numeroLinha = conquistas.querySelector('#DataTables_Table_0_filter').parentElement;

  pesquisa.classList.add('col-auto');
  numeroLinha.classList.add('col-auto', 'ms-auto');

  pesquisa.classList.remove('col-sm-12', 'col-md-6');
  numeroLinha.classList.remove('col-sm-12', 'col-md-6');

  conquistas.querySelector('#DataTables_Table_0_info').parentNode.remove();;

  table.parentElement.parentElement.classList.add('table-responsive');
  table.parentElement.classList.add('auturaTabela');

  const posicoes = conquistas.querySelector('.pagination');
  posicoes.classList.add('pagination-sm')
  posicoes.parentNode.parentNode.classList.add('fixed-bottom', 'bg-body', 'col', 'justify-content-end');
  posicoes.parentNode.parentNode.classList.remove('col-sm-12', 'col-md-7');

  return tabela;
}

/** @returns {string|number} */
function preferirNumero(valor) {
  if (valor == nulo) {
    return nulo;
  }
  const elemento = stringEmElemento(valor, true);

  const valorReal = ((elemento) => {
    const span = elemento.querySelector('.d-none')
    if (span) {
      return span.textContent;
    }
    return elemento.textContent;
  })(elemento).replace(',', '.');

  const valorRealNum = Number.parseFloat(valorReal);
  return valorRealNum == valorReal ? valorRealNum : valorReal;
}

/** 
 * @param {string|number|boolean} primeiro - O que está a cima na lista
 * @param {string|number|boolean} segundo - O que está a baixo na lista
 * @param {('desc' | 'asc')} tipo - Tipo de orden decrescente ou acendente respectivamente
  */
function enviarParaOrden(segundo, primeiro, tipo) {
  segundo = preferirNumero(segundo);
  primeiro = preferirNumero(primeiro);
  if (primeiro == nulo && segundo !== nulo) { return -1; }
  if (segundo == nulo && primeiro !== nulo) { return 1; }
  return segundo < primeiro ? -1 : segundo > primeiro ? tipo === 'asc' ? 1 : -1 : 0;
}


export default gerarTabela;