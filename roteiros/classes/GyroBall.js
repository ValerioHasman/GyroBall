import ArmazenamentoLocal from "./ArmazenamentoLocal.js";

export default class GyroBall {
  #rpm = 0;

  set rpm(valor) {
    const valorTratado = Number.parseInt(valor);
    if (valorTratado >= 0) {
      this.#rpm = valorTratado;
    } else {
      this.#rpm = 0;
    }

  }
  get rpm() {
    return this.#rpm;
  }
  get kg() {
    const rpm = this.#rpm;
    let kg = 0;
    if(rpm >= 6000){
      const curva = 3.8 * (rpm / 1000 - 6);
      kg = (7.8 * rpm / 6000) + curva;
    } else {
      kg = rpm / 1000 * 1.3;
    }
    return kg.toFixed(2);
  }
  get torque() {
    return (12 * this.#rpm / 10000).toFixed(2);
  }
  get nivel() {
    return Number.parseInt(this.#rpm / 2000);
  }
  /** @returns {(0|1|2|3|4|5)} */
  get subNivel() {
    let nivel = this.nivel;
    while(nivel > 5){
      nivel = nivel - 6;
    }
    return nivel;
  }
  get procentagem() {
    return Number.parseFloat(((this.#rpm / 2000) - this.nivel).toFixed(13));
  }

  get corHEXA() {
    return (a) => {
      if (a < 0 || a > 1) {
        throw new Error('O "a" de corHEXA() deve ser entre 0 e 1 ');
      }
      let hexa = this.corHEX;

      const emHEXA = (a * 255).toString(16).split('.')[0];

      return `${hexa}${emHEXA}`;
    }
  }

  get corHEX() {
    const local = new ArmazenamentoLocal();

    switch (this.subNivel) {
      case 0:
        return local.corNivel0;
      case 1:
        return local.corNivel1;
      case 2:
        return local.corNivel2;
      case 3:
        return local.corNivel3;
      case 4:
        return local.corNivel4;
      case 5:
        return local.corNivel5;
    }
  }

}