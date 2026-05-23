# Igreja Batista da Luz - Site Institucional

Site institucional e divulgativo desenvolvido com Angular para a Igreja Batista da Luz.

## 🚀 Tecnologias

- **Angular 18** - Framework frontend
- **TypeScript** - Linguagem de programação
- **SCSS** - Pré-processador CSS
- **Angular Signals** - Sistema reativo moderno
- **Componentes Standalone** - Arquitetura moderna do Angular

## 📋 Requisitos

- Node.js 18+ 
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório ou navegue até a pasta do projeto:
```bash
cd IgrejaBatistaDaLuz
```

2. Instale as dependências:
```bash
npm install
```

## 🏃 Executando o Projeto

Para executar o projeto em modo de desenvolvimento:

```bash
npm start
```

O site estará disponível em `http://localhost:4200`

## 🏗️ Build para Produção

Para gerar o build de produção:

```bash
npm run build:prod
```

Os arquivos compilados estarão na pasta `dist/igreja-batista-luz/browser`

## 🚀 Deploy no GitHub Pages

O projeto está configurado para fazer deploy automático no GitHub Pages usando GitHub Actions.

### Configuração Inicial

1. **Habilite o GitHub Pages no repositório:**
   - Vá em `Settings` > `Pages`
   - Em `Source`, selecione `GitHub Actions`

2. **Ajuste o base-href no workflow:**
   - Edite o arquivo `.github/workflows/deploy.yml`
   - Altere `--base-href /IgrejaBatistaDaLuz/` para o nome do seu repositório
   - Se o repositório for `seu-usuario/igreja-batista-luz`, use `--base-href /igreja-batista-luz/`
   - Se for um domínio customizado, use `--base-href /`

3. **Faça push para a branch main/master:**
   ```bash
   git add .
   git commit -m "Configurar deploy automático"
   git push origin main
   ```

4. **O deploy será executado automaticamente:**
   - Acesse a aba `Actions` no GitHub para acompanhar o progresso
   - Após o deploy, o site estará disponível em:
     - `https://seu-usuario.github.io/IgrejaBatistaDaLuz/` (ou o nome do seu repositório)

### Deploy Manual

Para fazer deploy manualmente, você também pode executar:

```bash
npm run build:pages -- --base-href /IgrejaBatistaDaLuz/
```

Este comando irá:
1. Fazer o build de produção
2. Criar automaticamente o arquivo `404.html` necessário para o Angular Router funcionar no GitHub Pages

Depois, faça upload da pasta `dist/igreja-batista-luz/browser` para o GitHub Pages.

### ⚠️ Importante: Arquivo 404.html

O GitHub Pages não suporta SPA routing nativamente. Para que as rotas do Angular funcionem corretamente (como `/devocionais`, `/podcasts`, etc.), o workflow automaticamente cria um arquivo `404.html` que redireciona todas as rotas para `index.html`. Isso é feito automaticamente durante o deploy, mas você também pode usar o script manualmente:

```bash
npm run build:pages
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── header/          # Cabeçalho com navegação
│   │   ├── hero/            # Seção hero principal
│   │   ├── about/           # Sobre a igreja
│   │   ├── schedule/         # Horários de culto
│   │   ├── ministries/      # Ministérios
│   │   ├── events/          # Eventos
│   │   ├── contact/         # Contato e localização
│   │   ├── footer/          # Rodapé
│   │   └── home/            # Componente home (agrupa todos)
│   ├── app.component.ts     # Componente raiz
│   └── app.routes.ts       # Rotas da aplicação
├── assets/                  # Imagens e recursos estáticos
└── styles.scss             # Estilos globais
```

## 🎨 Identidade Visual

O site utiliza as seguintes cores da identidade visual:

- **Cor Principal**: `#4d85b7`
- **Destaques e Botões**: `#599bd0`
- **Backgrounds e Gradientes**: `#61b7ec`

## ✨ Funcionalidades

- ✅ Layout totalmente responsivo (mobile-first)
- ✅ Menu de navegação fixo com animações
- ✅ Seções: Home, Sobre, Horários, Ministérios, Eventos, Contato
- ✅ Formulário de contato
- ✅ Integração com redes sociais
- ✅ SEO básico implementado
- ✅ Acessibilidade básica (ARIA labels, navegação por teclado)
- ✅ Animações suaves e modernas
- ✅ Cards com efeitos hover

## 📝 Personalização

### Atualizar Informações de Contato

Edite o arquivo `src/app/components/contact/contact.component.ts`:

```typescript
contactInfo = signal({
  address: 'Seu Endereço',
  city: 'Sua Cidade - Estado',
  phone: '(00) 0000-0000',
  email: 'seu-email@exemplo.com',
  whatsapp: '(00) 00000-0000'
});
```

### Atualizar Horários de Culto

Edite o arquivo `src/app/components/schedule/schedule.component.ts`:

```typescript
schedules = signal<ScheduleItem[]>([
  {
    day: 'Domingo',
    time: '10:00',
    title: 'Culto Matutino',
    description: 'Descrição do culto',
    icon: '☀️'
  }
]);
```

### Adicionar Eventos

Edite o arquivo `src/app/components/events/events.component.ts`:

```typescript
events = signal<Event[]>([
  {
    title: 'Nome do Evento',
    date: 'DD/MM/AAAA',
    time: 'HH:MM',
    location: 'Local do Evento',
    description: 'Descrição do evento',
    icon: '🎉'
  }
]);
```

## 🌐 Integração com Google Maps

Para adicionar um mapa real, substitua o placeholder no arquivo `src/app/components/contact/contact.component.html`:

```html
<iframe 
  src="https://www.google.com/maps/embed?pb=SEU_CODIGO_AQUI" 
  width="100%" 
  height="400" 
  style="border:0;" 
  allowfullscreen="" 
  loading="lazy">
</iframe>
```

## 📱 Redes Sociais

Atualize os links das redes sociais nos componentes:
- `src/app/components/contact/contact.component.ts`
- `src/app/components/footer/footer.component.ts`

## 🔧 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm test` - Executa testes (quando configurado)

## 📄 Licença

Este projeto foi desenvolvido para a Igreja Batista da Luz.

## 👥 Contribuição

Para contribuir com melhorias, entre em contato com a equipe de desenvolvimento da igreja.

---

**Desenvolvido com ❤️ para glorificar a Deus**

