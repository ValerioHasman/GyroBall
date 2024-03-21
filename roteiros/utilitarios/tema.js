import ArmazenamentoLocal from "../classes/ArmazenamentoLocal.js";

export default function () {
  const local = new ArmazenamentoLocal();
  document.documentElement.setAttribute('data-bs-theme', local.theme);
  local.definirCoresVarCSS();
} 