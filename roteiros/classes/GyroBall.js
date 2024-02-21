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
    const mnq5 = (valor = 0) => {
      if (valor > 5) {
        valor = valor - 6;
        return mnq5(valor);
      }
      return valor;
    }

    const local = new ArmazenamentoLocal();

    let rgb;
    switch (mnq5(this.nivel)) {
      case 0:
        rgb = local.corNivel0;
        break;
      case 1:
        rgb = local.corNivel1;
        break;
      case 2:
        rgb = local.corNivel2;
        break;
      case 3:
        rgb = local.corNivel3;
        break;
      case 4:
        rgb = local.corNivel4;
        break;
      case 5:
        rgb = local.corNivel5;
        break;
      default:
        console.warn("Erro?");
        break;
    }
    return rgb;
  }

}