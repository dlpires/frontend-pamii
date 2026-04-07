export interface IComanda {
  id: number;
  id_mesa: number;
  obs_comanda?: string;
}

export interface ICreateComandaInput {
  id_mesa: number;
  obs_comanda?: string;
}

export interface IUpdateComandaInput {
  id: number;
  id_mesa?: number;
  obs_comanda?: string;
}

export interface IComandaOutput extends IComanda {}
