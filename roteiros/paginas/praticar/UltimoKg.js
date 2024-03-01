import base from "../../bd.js";
import GyroBall from "../../classes/GyroBall.js";

export default class UltimoKg {
  #up;
  #down;
  #quilo;
  #numQuilo = 0;
  constructor(praticar){
    this.#up = praticar.querySelector('.bi-caret-up-fill');
    this.#down = praticar.querySelector('.bi-caret-down-fill');
    this.#quilo = praticar.querySelector('span');
    base.pegarTodos('conquistas').then(({target: { result }})=>{
      this.#guarda(result[result.length - 1].rpm);
    })
    .catch(()=>{
      this.#guarda(0);
    });

    document.addEventListener('salvaProgresso', (event)=>{
      this.#guarda(event.data.rpm);
    });
  }
  get numQuilo(){
    return this.#numQuilo;
  }
  get up(){
    return ()=>{
      this.#down.classList.add('d-none');
      this.#up.classList.remove('d-none');
    }
  }
  get down(){
    return ()=>{
      this.#up.classList.add('d-none');
      this.#down.classList.remove('d-none');
    }
  }
  get reset(){
    return ()=>{
      this.#up.classList.add('d-none');
      this.#down.classList.add('d-none');
    }
  }
  #guarda = (rpm)=>{
    const gb = new GyroBall();
    gb.rpm = rpm;
    const kg = gb.kg;
    this.#quilo.textContent = kg;
    this.#numQuilo = Number.parseFloat(kg);
  }
};