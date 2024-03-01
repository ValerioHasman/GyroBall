export default class MonitorarDesempenho {
  #array = [];
  #maximoRPM = 0;
  #intervalo = null;
  #data = 0;

  set media(valor) {
    this.#array.push(valor);
  }
  get media() {
    const average = list => list.reduce((prev, curr) => prev + curr) / list.length;
    return average(this.#array);
  }
  set maxRPM(valor) {
    if (this.#maximoRPM < valor) {
      this.#maximoRPM = valor;
    }
  }
  get maxRPM() {
    return this.#maximoRPM;
  }
  get data() {
    return this.#data;
  }
  get tempo() {
    return this.#data == 0 ? 0 : (Date.now() - this.#data);
  }
  get iniciar() {
    return (funcao) => {
      if (this.#maximoRPM != 0) {
        this.finalizar();
      }
      const func = ()=>{
        const media = this.media;
        this.#array = [];
        this.maxRPM = media;
        funcao(media);
      }

      this.#intervalo = setInterval(func, 500);
      this.#data = Date.now();
    }
  }
  get finalizar() {
    return (desligar = ()=>{}) => {
      this.#maximoRPM = 0;
      this.#data = 0;
      clearInterval(this.#intervalo);
      this.#array = [];
      desligar();
    }
  }
}