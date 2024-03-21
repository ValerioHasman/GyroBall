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
    document.documentElement.style.setProperty("--nivel5", this.corNivel5);
  }
  get corNivel5(){
    return window.localStorage.getItem('corNivel5') ?? '#ff00ff';
  }
  set corNivel4(valor){
    window.localStorage.setItem('corNivel4', valor);
    this.definirCoresVarCSS();
  }
  get corNivel4(){
    return window.localStorage.getItem('corNivel4') ?? '#ff0000';
  }
  set corNivel3(valor){
    window.localStorage.setItem('corNivel3', valor);
    this.definirCoresVarCSS();
  }
  get corNivel3(){
    return window.localStorage.getItem('corNivel3') ?? '#ffff00';
  }
  set corNivel2(valor){
    window.localStorage.setItem('corNivel2', valor);
    this.definirCoresVarCSS();
  }
  get corNivel2(){
    return window.localStorage.getItem('corNivel2') ?? '#00ff00';
  }
  set corNivel1(valor){
    window.localStorage.setItem('corNivel1', valor);
    this.definirCoresVarCSS();
  }
  get corNivel1(){
    return window.localStorage.getItem('corNivel1') ?? '#00ffff';
  }
  set corNivel0(valor){
    window.localStorage.setItem('corNivel0', valor);
    this.definirCoresVarCSS();
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
    this.definirCoresVarCSS();
  }

  resetar(){
    window.localStorage.removeItem('ignorarGrave');
    window.localStorage.removeItem('limiteGrave');
    window.localStorage.removeItem('multiplicadorGrave');
    window.localStorage.removeItem('multiplicadorAgudo');
    window.localStorage.removeItem('inverterPrioridadeGrave');
  }

  definirCoresVarCSS(){
    document.documentElement.style.setProperty("--nivel0", this.corNivel0);
    document.documentElement.style.setProperty("--nivel1", this.corNivel1);
    document.documentElement.style.setProperty("--nivel2", this.corNivel2);
    document.documentElement.style.setProperty("--nivel3", this.corNivel3);
    document.documentElement.style.setProperty("--nivel4", this.corNivel4);
    document.documentElement.style.setProperty("--nivel5", this.corNivel5);

    document.documentElement.style.setProperty("--tdnivel0", this.corNivel0 + '7F');
    document.documentElement.style.setProperty("--tdnivel1", this.corNivel1 + '7F');
    document.documentElement.style.setProperty("--tdnivel2", this.corNivel2 + '7F');
    document.documentElement.style.setProperty("--tdnivel3", this.corNivel3 + '7F');
    document.documentElement.style.setProperty("--tdnivel4", this.corNivel4 + '7F');
    document.documentElement.style.setProperty("--tdnivel5", this.corNivel5 + '7F');
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