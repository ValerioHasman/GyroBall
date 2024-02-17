import ArmazenamentoLocal from "../classes/ArmazenamentoLocal.js";

export default function () {
  const local = new ArmazenamentoLocal();
  const tema = window.localStorage.getItem('theme');
  const temaDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (tema) {
    local.theme = tema;
    document.documentElement.setAttribute('data-bs-theme', local.theme);
  } else if (temaDark) {
    local.theme = 'dark';
    document.documentElement.setAttribute('data-bs-theme', local.theme);
  } else {
    local.theme = 'light';
    document.documentElement.setAttribute('data-bs-theme', local.theme);
  }
} 