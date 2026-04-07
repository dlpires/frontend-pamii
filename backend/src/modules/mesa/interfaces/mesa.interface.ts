export interface IMesa {
  id: number;
  qtd_cadeiras: number;
  status: boolean;
}

export interface ICreateMesaInput {
  qtd_cadeiras: number;
  status?: boolean;
}

export interface IUpdateMesaInput {
  id: number;
  qtd_cadeiras?: number;
  status?: boolean;
}

export interface IMesaOutput extends IMesa {}