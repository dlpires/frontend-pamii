# Guia de Configuração: Projeto Quero Café Bar

Este guia contém os passos para configurar o ambiente de desenvolvimento do projeto **Quero Café Bar**, integrando o backend em NestJS e o frontend em Ionic (Vanilla JS/Vite).

## 1. Configuração Inicial do Ambiente
1. **Abrir o Terminal** (PowerShell ou CMD).
2. **Acesse sua pasta de preferência:**
   ```bash
   cd Desktop
   ```
3. **Clone o repositório:**
   ```bash
   git clone GITHUB_URL
   cd quero-cafe-bar
   ```
4. **Configure o Git Local:**
   ```bash
   git config user.name "Seu Nome"
   git config user.email "seu-email@exemplo.com"
   ```

---

## 2. Configuração do Backend (NestJS)
O backend gerencia o banco de dados MariaDB/MySQL e as regras de negócio.

1. **Instalar dependências:**
   ```bash
   cd backend
   npm install
   ```
2. **Configurar Variáveis de Ambiente:**
   Crie o arquivo `.env` na pasta `/backend` baseando-se no conteúdo abaixo:
   ```env
   PORT=3000
   ENCRYPTION_KEY=sua_chave_de_criptografia_aqui_1

   # Database Config (MariaDB / MySQL)
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=
   DB_DATABASE=quero_cafe_bar
   ```

---

## 3. Banco de Dados (⚠️ IMPORTANTE)
Este projeto utiliza o MySQL/MariaDB. Siga as instruções abaixo para o **XAMPP**:

1. **Iniciar o MySQL:** Abra o painel de controle do XAMPP e clique em **Start** no módulo MySQL.
2. **Resolução de Problemas:** Se o MySQL do XAMPP não iniciar (ficar vermelho ou fechar):
   - O Windows pode ter um serviço de MySQL já rodando em segundo plano.
   - Pressione `Win + R`, digite `services.msc` e aperte Enter.
   - Procure por **"MySQL"** ou **"MySQL80"**, clique com o botão direito e selecione **Parar (Stop)**.
   - Tente iniciar o MySQL pelo XAMPP novamente.
3. **Criar o Schema:** No MySQL Workbench ou phpMyAdmin, execute: 
   ```sql
   CREATE SCHEMA quero_cafe_bar;
   ```

---

## 4. Executando o Projeto

### Backend
1. No terminal da pasta `/backend`:
   ```bash
   npm run start:dev
   ```
   *Teste no navegador:* `http://localhost:3000`

### Frontend (Ionic + Vanilla JS)
1. **Abrir um novo terminal** e entrar na pasta `/frontend`:
   ```bash
   npm install
   npm run dev
   ```
   *O Vite abrirá em:* `http://localhost:5173`

---

## 5. Rodando no Android (Capacitor)
1. **Build do projeto web:** `npm run build`
2. **Sincronizar:** `npx cap copy` e `npx cap open android`
"""

file_path = "STEPS-Quero-Cafe-v3.md"

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Arquivo {file_path} gerado com sucesso.")
```