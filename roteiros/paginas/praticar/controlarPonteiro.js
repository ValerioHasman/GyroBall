export default function controlarPonteiro(rpm) {
  function limitar(valor) {
    if (valor > 12000) {
      return limitar(valor - 12000);
    }
    return valor;
  }
  const porcent = limitar(rpm) / 12000 * 100;
  return `${100 - porcent}%`;
}