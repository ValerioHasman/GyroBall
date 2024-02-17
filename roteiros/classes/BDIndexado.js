/**
 * @file Classe para criar e manipular a base de dados local.
 * @author Valério Luz Hasman Junior
 */

export class BDIndexado {

  /** @type {IDBOpenDBRequest} */ #solicitacao;
  /** @type {IDBDatabase} */      #db;
  /** @type {Configuracao} */     #conf;

  /** @param {Configuracao} conf */
  constructor(conf) {
    if (!conf instanceof Configuracao) {
      throw new TypeError('conf deve ser uma instância de Configuracao');
    }
    this.#conf = conf;

    this.#solicitacao = window.indexedDB.open(this.#conf.baseDeDados, this.#conf.vesao);

    this.#solicitacao.onsuccess = (solicitacao) => {
      this.#db = solicitacao.target.result;
    }
    this.#solicitacao.onerror = (err) => {
      console.error(`Base de dados quebrada: `, err);
    }
    this.#solicitacao.onupgradeneeded = (evento) => {
      this.#db = evento.target.result;

      this.#conf.tabelas.forEach((tabela) => {
        const objetoStorageLocalizacao = this.#db.createObjectStore(tabela.nome, tabela.opcoes);
        tabela.colunas.forEach((coluna) => {
          objetoStorageLocalizacao.createIndex(coluna.nome, coluna.nome, { unique: coluna.unique });
        });
      });
    }
  }

  fechar(){
    this.#db.close();
    this.#db = null;
  }

  tabelaExiste(nomeTabela) {
    return this.#conf.tabelas.some(tabela => tabela.nome === nomeTabela);
  }

  /** @param {('readonly' | 'readwrite')} modo */
  transacaoObjetoTabela(nomeTabela, modo) {
    if (!this.tabelaExiste(nomeTabela)) {
      throw new Error(`Tabela ${nomeTabela} não encontrada`);
    }
    return new Promise((resolve) => {
      const verificarDB = () => {
        if (this.#db != undefined) {
          resolve(this.#db.transaction([nomeTabela], modo).objectStore(nomeTabela));
        } else {
          setTimeout(verificarDB, 120);
        }
      };
      verificarDB()
    });
  }

  async pegarDado(nomeTabela, id) {
    const solicitacao = (await this.transacaoObjetoTabela(nomeTabela, 'readonly')).get(id);

    return await BDIndexado.bdPromise(solicitacao);
  }

  async pegarTodos(nomeTabela) {
    const solicitacao = (await this.transacaoObjetoTabela(nomeTabela, 'readonly')).getAll();

    return await BDIndexado.bdPromise(solicitacao);
  }

  async gravarDado(nomeTabela, objeto) {
    const solicitacao = (await this.transacaoObjetoTabela(nomeTabela, 'readwrite')).add(objeto);

    return await BDIndexado.bdPromise(solicitacao);
  }

  async atualizarDado(nomeTabela, objeto) {
    const solicitacao = (await this.transacaoObjetoTabela(nomeTabela, 'readwrite')).put(objeto);

    return await BDIndexado.bdPromise(solicitacao);
  }

  async apagarDado(nomeTabela, id) {
    const solicitacao = (await this.transacaoObjetoTabela(nomeTabela, 'readwrite')).delete(id);

    return await BDIndexado.bdPromise(solicitacao);
  }

  /** @param {IDBRequest} solicitacao */
  static bdPromise(solicitacao) {
    return new Promise((resolve, reject) => {
      solicitacao.onsuccess = (s) => { resolve(s); }
      solicitacao.onerror = (e) => { reject(e); }
    });
  }

}

export class Configuracao {
  #vesao = 1;
  #baseDeDados = 'BaseDeDados';
  /** @type {{ nome: string; opcoes: { keyPath: string; autoIncrement: boolean; }; colunas: { nome: string; unique: boolean; }[]; }[];} */
  #tabelas = [];

  /** @param {{ vesao: number; baseDeDados: string; tabelas: { nome: string; opcoes: { keyPath: string; autoIncrement: boolean; }; colunas: { nome: string; unique: boolean; }[]; }[]; }} conf */
  constructor(conf) {
    this.vesao = conf.vesao ?? this.#vesao;
    this.baseDeDados = conf.baseDeDados ?? this.#baseDeDados;
    this.tabelas = conf.tabelas;
  }

  set vesao(valor) { this.#vesao = Number.parseInt(valor); }
  set baseDeDados(valor) { this.#baseDeDados = String(valor); }
  set tabelas(valor) {
    const tbls = [];
    valor.forEach((tabela) => {
      tabela.opcoes ??= {};
      tabela.colunas ??= [];
      const tbl = {
        nome: String(tabela.nome),
        opcoes: {
          keyPath: tabela.opcoes.keyPath ?? 'id',
          autoIncrement: tabela.opcoes.autoIncrement ?? true
        },
        colunas: []
      }
      tabela.colunas.forEach((coluna) => {
        tbl.colunas.push({
          nome: String(coluna.nome),
          unique: Boolean(coluna.unique)
        })
      });
      tbls.push(tbl);
    });

    this.#tabelas = tbls;
  }
  get vesao() { return this.#vesao; }
  get baseDeDados() { return this.#baseDeDados; }
  get tabelas() { return this.#tabelas; }
}