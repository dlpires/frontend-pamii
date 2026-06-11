# Plano de Aprimoramentos: Gestão de Usuários

## 0. Documentação
- Salvar este plano detalhado em plans/USER_MANAGEMENT_ENHANCEMENTS.md.

## 1. Interface de Listagem (ListUsuarioPage.js)
- Botão de Adição:
    - Implementar um ion-fab (Floating Action Button) com ícone add para redirecionar para /usuario/create.
- Lógica de Deleção:
    - Implementar listener para .btn-delete com confirmação via ion-alert.
    - Integrar chamada api.delete('/usuario/' + id) e atualizar a lista.
- Navegação de Edição:
    - Implementar listener para .btn-edit para redirecionar para /usuario/edit.

## 2. Extensão da Camada de API (api.js)
- Implementar método api.patch(path, body) para atualizações.
- Implementar método api.delete(path) para remoções.

## 3. Implementação da Edição (EditUsuarioPage.js)
- Carregamento de Dados:
    - Implementar captura de ID e chamada api.get('/usuario/' + id) no connectedCallback.
    - Popular formulário com dados da API.
- Persistência de Alterações:
    - Implementar listener de submit enviando dados via api.patch('/usuario/' + id, payload).
    - Feedback via toast e redirecionamento para /usuario/list.
