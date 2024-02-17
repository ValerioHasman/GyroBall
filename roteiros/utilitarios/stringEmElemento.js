export default function(textoFragmento = "") {

  const div = document.createElement('div');

  if ( typeof textoFragmento === typeof "" || textoFragmento == null ){
    div.innerHTML = textoFragmento;
  } else {
    throw new TypeError("Tipo esperado é string");
  }
  return div.querySelector(':first-child') ?? div;
}