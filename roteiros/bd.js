import { BDIndexado, Configuracao } from "./classes/BDIndexado.js";

const config = new Configuracao({
  baseDeDados: 'GyroBallRegistro',
  tabelas: [{
    nome: 'conquistas',
    colunas: 
    [
      { nome: 'rpm' },
      { nome: 'datams' },
      { nome: 'tempoms' },
      { nome: 'kgAcumulado' }
    ]
  }]
});
const base = new BDIndexado(config);

export default base;