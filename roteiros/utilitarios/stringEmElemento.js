export default function (textoFragmento = "", comDiv = false) {

  const div = document.createElement('div');

  if (typeof textoFragmento === typeof "" || textoFragmento == null || typeof textoFragmento === typeof 0 || typeof textoFragmento === typeof false) {
    div.innerHTML = textoFragmento;
    if (comDiv) {
      return div;
    }
  } else {
    throw new TypeError("Tipo esperado é string");
  }
  return div.querySelector(':first-child') ?? div;
}