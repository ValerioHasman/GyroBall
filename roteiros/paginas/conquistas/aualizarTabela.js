import base from "../../bd.js";
import GyroBall from "../../classes/GyroBall.js";
import tempoDecorrido from "../../utilitarios/tempoDecorrido.js";

function aualizarTabela(conquistas, tabela) {

  const table = conquistas.querySelector('table');
  const tbody = conquistas.querySelector('tbody');

  document.addEventListener("salvaProgresso", (e)=>{
    novaConquista(e.data);
  });

  reescreveTabela();
  function reescreveTabela(){
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
        `<span class="d-block" style="background-color: ${(gb.corHEXA)(0.5)}">${gb.rpm}</span>`,
        gb.nivel,
        gb.kg,
        gb.torque,
        msDiaMesAno(linhas.datams),
        msHoraMinutos(linhas.datams),
        `<span class="d-none">${`${linhas.tempoms}`.padStart(7,'0')}</span>${tempoDecorrido(linhas.tempoms)}`,
        `<button delete="${linhas.id}" type="button" class="btn btn-sm btn-outline-danger border-0"><i class="bi bi-x-lg"></i></button>`
      ])
      .draw(false);

    const botao = table.querySelector(`button[delete="${linhas.id}"]`);

    botao.onclick = () => {
      console.info(`Item ${linhas.id} deletado`);
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

}

export default aualizarTabela;