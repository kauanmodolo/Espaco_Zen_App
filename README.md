# **Documentação do Projeto: Espaço Zen**

## **Introdução**
O **Espaço Zen** é um aplicativo de meditação que ajuda os usuários a melhorar seu bem-estar mental. Ele permite acompanhar o progresso de sessões de meditação, criar sessões personalizadas, explorar citações inspiradoras e gerenciar um histórico de sessões concluídas.

---

## **Instruções de Instalação**

### **Requisitos**
1. Node.js instalado no computador.
2. Expo CLI instalado globalmente (opcional):
   ```bash
   npm install -g expo-cli
   ```

### **Passos para Instalar e Executar**
1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```
2. **Entre no diretório do projeto:**
   ```bash
   cd EspacoZen
   ```
3. **Instale as dependências:**
   ```bash
   npm install
   ```
4. **Inicie o aplicativo:**
   ```bash
   npx expo start
   ```

5. **Escolha o ambiente de execução:**
   - **No navegador:** Pressione `w`.
   - **No emulador Android:** Pressione `a`.
   - **No emulador iOS (apenas macOS):** Pressione `i`.
   - **No dispositivo físico:** Escaneie o QR code com o app Expo Go.

---

## **Descrição dos Módulos e Componentes**

### **1. Módulo Principal: App**
Arquivo: `App.js`  
Responsável por configurar as rotas principais do aplicativo e gerenciar a navegação entre telas. Utiliza o `React Navigation` para criar as rotas.

Telas disponíveis:
- **LoginScreen:** Tela de login.
- **CadastroScreen:** Tela de cadastro de novos usuários.
- **HomeScreen:** Tela inicial, exibe progresso do usuário e sessões de meditação.
- **SessoesScreen:** Tela para explorar sessões de meditação e criar sessões personalizadas.
- **PerfilScreen:** Tela do perfil do usuário, exibe informações e permite logout.
- **HistoricoScreen:** Tela de histórico das sessões concluídas.

---

### **2. Componentes Principais**

#### **ProgressBar**
Arquivo: `components/ProgressBar.js`  
Exibe uma barra de progresso baseada no progresso do usuário em minutos de meditação. A porcentagem é exibida no centro da barra.

#### **MeditationCard**
Arquivo: `components/MeditationCard.js`  
Cartão que exibe informações sobre uma sessão de meditação, como título, categoria e duração. Permite iniciar a meditação ao clicar.

#### **SearchBar**
Arquivo: `components/SearchBar.js`  
Barra de busca que permite filtrar sessões de meditação com base no texto digitado.

#### **FilterBar**
Arquivo: `components/FilterBar.js`  
Fornece filtros para categorias e duração das sessões de meditação.

#### **Navbar**
Arquivo: `components/Navbar.js`  
Navegação inferior que permite alternar entre as telas de **Home**, **Sessões**, **Histórico** e **Perfil**.

#### **CreateSessionModal**
Arquivo: `components/CreateSessionModal.js`  
Modal que permite ao usuário criar sessões personalizadas, armazenando-as no Firebase e exibindo-as apenas para o usuário que as criou.

#### **SubmitQuoteModal**
Arquivo: `components/SubmitQuoteModal.js`  
Modal que permite ao usuário enviar citações motivacionais personalizadas, armazenando-as no Firebase.

---

### **3. Integração com Firebase**
Arquivo: `firebaseConfig.js`  
Gerencia a autenticação e o banco de dados no Firebase.  
Funcionalidades:
- Armazena o progresso de meditação de cada usuário.
- Registra sessões personalizadas criadas pelos usuários.
- Salva o histórico de sessões concluídas.
- Armazena e exibe citações personalizadas enviadas pelos usuários.

---

### **4. Integração com API: Quotable**
Arquivo: `api/quotable.js`  
Consome a API externa `Quotable` para exibir citações inspiradoras.  
Funcionalidades:
- **Receber Citações:** Busca citações aleatórias para exibir na tela inicial.
- **Enviar Citações:** Envia citações personalizadas dos usuários.

---

### **Tratamento de Erros**
O aplicativo utiliza o `react-toastify` para exibir mensagens de sucesso ou erro.  
- **Exemplos de tratamento de erro:**
  - Campos obrigatórios não preenchidos.
  - Falha na comunicação com o Firebase.
  - Falha ao consumir ou enviar dados para a API `Quotable`.

---

## **Funcionalidades**
1. **Autenticação de Usuário:** Login e cadastro usando Firebase Authentication.
2. **Progresso Personalizado:** Rastreamento do progresso de meditação por usuário.
3. **Sessões Personalizadas:** Criação e armazenamento de sessões únicas por usuário.
4. **Histórico de Sessões:** Visualização de todas as sessões concluídas com data e hora.
5. **Citações Inspiradoras:** Integração com a API Quotable e envio de citações para o Firebase.
