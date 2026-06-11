# Plano de Implementação: Criação de Usuários

## 0. Documentação
- Salvar o plano detalhado na pasta plans/ do projeto para registro e rastreabilidade.

## 1. Implementação em CadUsuarioPage.js
- Proteção de Rota: Adicionar verificação de isAuthenticated() no connectedCallback.
- Lógica de Submissão:
    - Importar api de ../../shared/api.js.
    - Adicionar listener de submit ao formulário #form-usuario.
    - Coletar dados (nome, usuario, senha, perfil) e enviar via api.post('/usuario', payload).
- Feedback e Navegação:
    - Implementar função de toast para sucesso/erro.
    - Redirecionar para /usuario/list após criação.
- Correção: Alterar windows.history.back() para window.history.back().

## 2. Integração em ListUsuarioPage.js
- Consumo de API: Substituir os dados estáticos de fetchUsuarios() por uma chamada api.get('/usuario').
