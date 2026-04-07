export interface IComandaItem {
  id_comanda: number;
  id_produto: number;
  qtd_item: number;
  valor_venda: number;
  statusPg: boolean;
  statusEntrega: boolean;
}

export interface ICreateComandaItemInput {
  id_comanda: number;
  id_produto: number;
  qtd_item: number;
  valor_venda: number;
  statusPg?: boolean;
  statusEntrega?: boolean;
}

export interface IUpdateComandaItemInput {
  id_comanda: number;
  id_produto: number;
  valor_venda?: number;
  qtd_item?: number;
  statusPg?: boolean;
  statusEntrega?: boolean;
}

export interface IComandaItemOutput extends IComandaItem {}
