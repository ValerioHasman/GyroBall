import ArmazenamentoLocal from "./ArmazenamentoLocal.js";

export default class GyroBall {
  #rpm = 0;

  set corDinamica(valor) {
    const local = new ArmazenamentoLocal();
    local.corDinamica = valor;
  }
  get corDinamica() {
    const local = new ArmazenamentoLocal();
    return local.corDinamica;
  }
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
    return (61 * this.#rpm / 12000).toFixed(2);
  }
  get torque() {
    return (38 * this.#rpm / 13000).toFixed(2);
  }
  get nivel() {
    return Number.parseInt(this.#rpm / 2000);
  }
  get procentagem() {
    return Number.parseFloat(((this.#rpm / 2000) - this.nivel).toFixed(13));
  }
  get rgb() {
    let rgb = this.arrayRGB;

    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  }
  get rgba() {
    return (a) => {
      if (a < 0 || a > 1) {
        throw new Error('O "a" de rgba() deve ser entre 0 e 1 ');
      }
      let rgb = this.arrayRGB;

      return `rgba(${rgb[0]},${rgb[1]},${rgb[2]}, ${a})`;
    }
  }
  get arrayRGB() {
    let intensidade;
    if (this.corDinamica) {
      intensidade = 255 * (this.nivel % 2 == 0 ? this.procentagem : 1 - this.procentagem);
    } else {
      intensidade = (this.nivel % 2 == 0 ? 0 : 255);
    }
    let rgb = [0, 0, 0];
    const mnq5 = (valor = 0) => {
      if (valor > 5) {
        valor = valor - 6;
        return mnq5(valor);
      }
      return valor;
    }

    switch (mnq5(this.nivel)) {
      case 0:
        rgb = [0, intensidade, 255];
        break;
      case 1:
        rgb = [0, 255, intensidade];
        break;
      case 2:
        rgb = [intensidade, 255, 0];
        break;
      case 3:
        rgb = [255, intensidade, 0];
        break;
      case 4:
        rgb = [255, 0, intensidade];
        break;
      case 5:
        rgb = [intensidade, 0, 255];
        break;
      default:
        console.warn("Erro?");
        break;
    }

    return rgb;

  }

}