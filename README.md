# Angular Login Project

Projeto Angular com autenticação e tela de login.

## Requisitos

- Node.js 18+
- npm ou yarn
- Angular CLI 18+

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
ng serve
# ou
npm start
```

Acesse `http://localhost:4200` no seu navegador.

## Credenciais de Teste

- **Email**: user@example.com
- **Senha**: password123

## Estrutura do Projeto

```
src/
├── app/
│   ├── auth/
│   │   ├── auth.guard.ts        # Guard para proteger rotas
│   │   ├── auth.service.ts      # Serviço de autenticação
│   │   ├── login.component.ts   # Componente de login
│   │   ├── login.component.html # Template de login
│   │   └── login.component.css  # Estilos de login
│   ├── dashboard/
│   │   ├── dashboard.component.ts
│   │   ├── dashboard.component.html
│   │   └── dashboard.component.css
│   ├── app-routing.module.ts    # Configuração de rotas
│   ├── app.module.ts            # Módulo principal
│   ├── app.component.ts
│   ├── app.component.html
│   └── app.component.css
├── environments/                 # Configurações por ambiente
├── styles.css                   # Estilos globais
├── main.ts                      # Arquivo de entrada
└── index.html                   # HTML principal
```

## Features

- ✅ Tela de login com validação de formulário
- ✅ Autenticação com localStorage
- ✅ Route guards para proteger páginas
- ✅ Dashboard para usuários autenticados
- ✅ Logout funcional
- ✅ Redirecionamento automático para login

## Build para Produção

```bash
ng build --configuration production
```

Os arquivos compilados estarão em `dist/angular-login-app/`.
