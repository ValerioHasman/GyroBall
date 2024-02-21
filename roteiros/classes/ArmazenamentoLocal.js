export default class ArmazenamentoLocal {
  set theme(valor) {
    window.localStorage.setItem(`theme`, this.#theme(valor));
  }
  get theme() {
    const theme = window.localStorage.getItem(`theme`) ?? 'dark';
    return this.#theme(theme);
  }
  set ignorarGrave(valor) {
    const ig = this.#zeroA127(valor);
    if(ig > this.limiteGrave){
      window.localStorage.setItem(`ignorarGrave`, `${this.limiteGrave}`);
    } else {
      window.localStorage.setItem(`ignorarGrave`, `${ig}`);
    }
  }
  get ignorarGrave() {
    const mult = window.localStorage.getItem(`ignorarGrave`) ?? 5;
    return this.#zeroA127(mult);
  }
  set limiteGrave(valor) {
    const lg = this.#zeroA127(valor);
    if(lg < this.ignorarGrave){
      window.localStorage.setItem(`limiteGrave`, `${this.ignorarGrave}`);
    } else {
      window.localStorage.setItem(`limiteGrave`, `${lg}`);
    }
  }
  get limiteGrave() {
    const mult = window.localStorage.getItem(`limiteGrave`) ?? 77;
    return this.#zeroA127(mult);
  }
  set multiplicadorGrave(valor) {
    if (valor ?? false) {
      window.localStorage.setItem(`multiplicadorGrave`, `${this.#multiplicador(valor)}`);
    } else {
      window.localStorage.removeItem(`multiplicadorGrave`);
    }
  }
  get multiplicadorGrave() {
    const mult = window.localStorage.getItem(`multiplicadorGrave`) ?? 1.5;
    return this.#multiplicador(mult);
  }
  set multiplicadorAgudo(valor) {
    if (valor ?? false) {
      window.localStorage.setItem(`multiplicadorAgudo`, `${this.#multiplicador(valor)}`);
    } else {
      window.localStorage.removeItem(`multiplicadorAgudo`);
    }
  }
  get multiplicadorAgudo() {
    const mult = window.localStorage.getItem(`multiplicadorAgudo`) ?? 5;
    return this.#multiplicador(mult);
  }
  set inverterPrioridadeGrave(valor) {
    if (valor) {
      window.localStorage.setItem(`inverterPrioridadeGrave`, `true`);
    } else {
      window.localStorage.removeItem(`inverterPrioridadeGrave`);
    }
  }
  get inverterPrioridadeGrave() {
    return Boolean(window.localStorage.getItem(`inverterPrioridadeGrave`) ?? false);
  }

  set corNivel5(valor){
    window.localStorage.setItem('corNivel5', valor);
  }
  get corNivel5(){
    return window.localStorage.getItem('corNivel5') ?? '#ff00ff';
  }
  set corNivel4(valor){
    window.localStorage.setItem('corNivel4', valor);
  }
  get corNivel4(){
    return window.localStorage.getItem('corNivel4') ?? '#ff0000';
  }
  set corNivel3(valor){
    window.localStorage.setItem('corNivel3', valor);
  }
  get corNivel3(){
    return window.localStorage.getItem('corNivel3') ?? '#ffff00';
  }
  set corNivel2(valor){
    window.localStorage.setItem('corNivel2', valor);
  }
  get corNivel2(){
    return window.localStorage.getItem('corNivel2') ?? '#00ff00';
  }
  set corNivel1(valor){
    window.localStorage.setItem('corNivel1', valor);
  }
  get corNivel1(){
    return window.localStorage.getItem('corNivel1') ?? '#00ffff';
  }
  set corNivel0(valor){
    window.localStorage.setItem('corNivel0', valor);
  }
  get corNivel0(){
    return window.localStorage.getItem('corNivel0') ?? '#0000ff';
  }

  resetarCores(){
    window.localStorage.removeItem('corNivel5');
    window.localStorage.removeItem('corNivel4');
    window.localStorage.removeItem('corNivel3');
    window.localStorage.removeItem('corNivel2');
    window.localStorage.removeItem('corNivel1');
    window.localStorage.removeItem('corNivel0');
  }

  resetar(){
    window.localStorage.removeItem('ignorarGrave');
    window.localStorage.removeItem('limiteGrave');
    window.localStorage.removeItem('multiplicadorGrave');
    window.localStorage.removeItem('multiplicadorAgudo');
    window.localStorage.removeItem('inverterPrioridadeGrave');
  }


  #theme(valor) {
    let theme;
    switch (valor) {
      case 'dark':
      case 'black':
      case 'night':
        theme = `dark`;
        break;
      default:
        theme = `light`;
        break;
    }
    return theme;
  }
  #multiplicador(valor) {
    const numero = Number.parseFloat(valor);
    if (numero < 0.01) {
      return 0.01;
    }
    if (valor > 10) {
      return 10;
    }
    return numero;
  }
  #zeroA127(valor) {
    const numero = Number.parseInt(valor);
    if (numero < 0) {
      return 0;
    }
    if (numero > 127) {
      return 127;
    }
    return numero;
  }
}