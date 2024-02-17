export default function tempoDecorrido(milissegundos) {
  // Convertendo milissegundos para segundos
  var segundosTotal = Math.floor(milissegundos / 1000);

  // Calculando minutos e segundos
  var minutos = Math.floor(segundosTotal / 60);
  var segundos = segundosTotal % 60;

  // Adicionando um zero à esquerda se os segundos forem menores que 10
  segundos = segundos < 10 ? '0' + segundos : segundos;

  // Retornando o resultado no formato desejado
  return minutos + ':' + segundos;
}
