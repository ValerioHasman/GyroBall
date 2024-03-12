/** @param {Element} conquistas  */
function gerarTabela(conquistas) {

  const table = conquistas.querySelector('table');

  const tabela = new DataTable(table, {
    "columnDefs": [
      {
        "orderable": false,
        "targets": 8
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

export default gerarTabela;