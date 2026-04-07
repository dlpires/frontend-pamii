export interface IUsuario {
  id: number;
  nome: string;
  usuario: string;
  perfil: number;
}

export interface IUsuarioInput {
  nome: string;
  usuario: string;
  senha: string;
  perfil?: number;
}

export interface IUsuarioUpdateInput {
  id: number;
  nome?: string;
  usuario?: string;
  senha?: string;
  perfil?: number;
}

export interface IUsuarioLoginInput {
  usuario: string;
  senha: string;
  perfil?: number;
}

export interface IUsuarioOutput extends IUsuario {}