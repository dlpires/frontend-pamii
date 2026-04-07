export interface IProduto {
  id: number;
  dsc_produto: string;
  valor_unit: number;
  status: boolean;
}

export interface ICreateProdutoInput {
  dsc_produto: string;
  valor_unit: number;
  status?: boolean;
}

export interface IUpdateProdutoInput {
  id: number;
  dsc_produto?: string;
  valor_unit?: number;
  status?: boolean;
}

export interface IProdutoOutput extends IProduto {}
