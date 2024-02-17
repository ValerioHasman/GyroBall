import praticar from "./paginas/praticar.js";
import conquistas from "./paginas/conquistas.js";
import configuracao from "./paginas/configuracao.js";

const pagina = new class Paginas {

  #praticar = praticar;
  #conquistas = conquistas;
  #configuracao = configuracao;

  get praticar() {
    return this.#praticar;
  }

  get conquistas() {
    return this.#conquistas;
  }

  get configuracao() {
    return this.#configuracao;
  }

};

const root = new class Root {

  #root = window.document.body.querySelector('main');

  insiraIsto(valor) {

    this.#root.innerHTML = "";

    if (valor instanceof Element) {
      this.#root.insertAdjacentElement('beforeend', valor);
    } else if (typeof valor === 'string') {
      this.#root.innerHTML = valor;
    } else {
      throw new Error(`valor não é elemento e nem string`);
    }

  }
};

export default () => {

  window.addEventListener('load', ir);
  window.addEventListener('hashchange', ir);

}

function ir() {

  const destino = window.location.href.split('#')[1];

  const navbarnav = document.body.querySelector("#navbarNav");
  navbarnav.querySelectorAll('.nav-link').forEach((elemento)=>{
    elemento.classList.remove('active');
  });
  
  if (pagina[destino] === undefined) {
    navbarnav.querySelector(`.nav-link[href="#praticar"]`).classList.add('active');
    root.insiraIsto(pagina['praticar']);
  } else {
    navbarnav.querySelector(`.nav-link[href="#${destino}"]`).classList.add('active');
    root.insiraIsto(pagina[destino]);
  }

}



