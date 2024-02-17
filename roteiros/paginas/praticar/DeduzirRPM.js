import ArmazenamentoLocal from "../../classes/ArmazenamentoLocal.js";

export default class DeduzirRPM {
  #audioContext;
  #mediaStreamSource;
  #analyser;
  #funcaoProcesso;
  #local = new ArmazenamentoLocal();

  /**
   * @param {function} funcaoProcesso 
   */
  constructor(funcaoProcesso = () => { }) {
    this.#funcaoProcesso = funcaoProcesso;
  }

  startAudioCapture() {
    // Verifica se o navegador suporta a API de Web Audio
    if (!window.AudioContext && !window.webkitAudioContext) {
      alert('Seu navegador não suporta a API de Web Audio.');
      return;
    }

    // Cria um contexto de áudio
    this.#audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Solicita permissão para acessar o microfone
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        // Cria um nó de origem para conectar ao fluxo do microfone
        this.#mediaStreamSource = this.#audioContext.createMediaStreamSource(stream);

        // Adiciona um nó Analyser para obter informações de amplitude e frequência
        this.#analyser = this.#audioContext.createAnalyser();
        this.#analyser.fftSize = 256; // Tamanho da FFT (Fast Fourier Transform)
        this.#mediaStreamSource.connect(this.#analyser);

        // this.#analyser.connect(audioContext.destination);

        // Inicia a análise em tempo real
        this.#analyzeAudio();
      })
      .catch(function (error) {
        console.error('Erro ao capturar áudio:', error);
      });
  }

  stopAudioCapture() {
    if (this.#audioContext) {
      this.#audioContext.close();
      this.#audioContext = null;
    }
  }

  #analyzeAudio() {
    if (!this.#analyser) {
      return;
    }

    const bufferLength = this.#analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Obtem os dados de frequência
    this.#analyser.getByteFrequencyData(dataArray);

    this.#funcaoProcesso(this.#modificador(dataArray));

    // Continue a análise chamando esta função recursivamente
    if (this.#audioContext) {
      requestAnimationFrame(() => { this.#analyzeAudio() });
    }
  }

  #modificador(arr = []) {

    const tamanho = arr.length - 1;
    let somados = 0;

    if (this.#local.inverterPrioridadeGrave) {
      for (let i = 0; i <= tamanho; i++) {
        if (i < this.#local.ignorarGrave) {
          somados += arr[i] * this.#local.multiplicadorGrave;
        } else if (i > this.#local.limiteGrave) {
          somados -= arr[i] * this.#local.multiplicadorAgudo;
        }
      }
    } else {
      for (let i = this.#local.ignorarGrave; i <= tamanho; i++) {
        if (i < this.#local.limiteGrave) {
          somados += arr[i] * this.#local.multiplicadorGrave;
        } else {
          somados -= arr[i] * this.#local.multiplicadorAgudo;
        }
      }
    }

    return somados;
  }

}




