import base from "../../bd.js";
import GyroBall from "../../classes/GyroBall.js";
import tempoDecorrido from "../../utilitarios/tempoDecorrido.js";

export const nulo = `<span class="fst-italic user-select-none text-secondary invisible nulo" >-</span>`;

function aualizarTabela(conquistas, tabela) {

  const table = conquistas.querySelector('table');
  const tbody = conquistas.querySelector('tbody');

  document.addEventListener("salvaProgresso", (e) => {
    novaConquista(e.data);
  });

  reescreveTabela();
  function reescreveTabela() {
    base.pegarTodos('conquistas')
      .then((res) => {
        res.target.result.forEach(linhas => {
          novaConquista(linhas);
        });
      });
  }

  function novaConquista(linhas) {
    tbody.classList.add('d-none');
    tabela.page.len(-1).draw();

    const gb = new GyroBall();
    gb.rpm = linhas.rpm;

    tabela.row
      .add([
        `<span class="td-nivel${gb.nivel}">${gb.rpm}</span>`,
        gb.nivel,
        gb.kg.replace('.', ','),
        gb.torque.replace('.', ','),
        seNulo(acumulado, linhas.kgAcumulado),
        seNulo(msDiaMesAno, linhas.datams),
        seNulo(msHoraMinutos, linhas.datams),
        seNulo(verTempoDecorrido, linhas.tempoms),
        `<button delete="${linhas.id}" type="button" class="btn btn-sm btn-outline-danger border-0"><i class="bi bi-x-lg"></i></button>`
      ])
      .draw(false);

    const botao = table.querySelector(`button[delete="${linhas.id}"]`);

    botao.onclick = () => {
      base.apagarDado('conquistas', linhas.id);
      tabela.row(botao.parentNode.parentNode).remove();
      tabela.page(tabela.page()).draw('page');
    };

    tbody.classList.remove('d-none');
    tabela.page.len(10).draw();

  }

  function msDiaMesAno(milissegundos) {
    const data = new Date(milissegundos);
    const dia = data.getDate().toString();
    const mes = (data.getMonth() + 1).toString();
    const ano = data.getFullYear();

    return `<span class="d-none">${milissegundos}</span>${dia}/${mes}/${ano}`;
  }

  function msHoraMinutos(milissegundos) {
    const data = new Date(milissegundos);
    const hora = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');

    return `<span class="d-none">${milissegundos}</span>${hora}:${minutos}`;
  }

  function verTempoDecorrido(tempoms) {
    return `<span class="d-none">${`${tempoms}`.padStart(7, '0')}</span>${tempoDecorrido(tempoms)}`
  }

  function acumulado(kgAcumulado) {
    return kgAcumulado.toFixed(2).replace('.', ',');
  }

}

function seNulo(funcao, parametro) {
  if (parametro === null || parametro === undefined) {
    return nulo;
  }
  return funcao(parametro);
}

export default aualizarTabela;