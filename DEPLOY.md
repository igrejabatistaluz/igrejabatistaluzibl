# 🚀 Guia de Deploy - GitHub Pages

Este guia explica como fazer o deploy do site da Igreja Batista da Luz no GitHub Pages.

## 📋 Pré-requisitos

- Conta no GitHub
- Repositório criado no GitHub
- Git configurado localmente

## 🔧 Configuração Passo a Passo

### 1. Preparar o Repositório

Certifique-se de que seu código está no GitHub:

```bash
git add .
git commit -m "Preparar para deploy"
git push origin main
```

### 2. Habilitar GitHub Pages

1. Acesse seu repositório no GitHub
2. Vá em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione **GitHub Actions** (não "Deploy from a branch")
5. Salve as alterações

### 3. Ajustar o Base Href

O `base-href` precisa corresponder ao nome do seu repositório:

1. Abra o arquivo `.github/workflows/deploy.yml`
2. Encontre a linha com `--base-href /IgrejaBatistaDaLuz/`
3. Substitua `IgrejaBatistaDaLuz` pelo nome do seu repositório

**Exemplos:**
- Se o repositório for `seu-usuario/igreja-batista-luz`, use:
  ```yaml
  --base-href /igreja-batista-luz/
  ```

- Se o repositório for `seu-usuario/IgrejaBatistaDaLuz`, use:
  ```yaml
  --base-href /IgrejaBatistaDaLuz/
  ```

- Se você tiver um domínio customizado, use:
  ```yaml
  --base-href /
  ```

### 4. Fazer Push das Alterações

```bash
git add .github/workflows/deploy.yml
git commit -m "Configurar deploy automático"
git push origin main
```

### 5. Acompanhar o Deploy

1. Acesse a aba **Actions** no seu repositório GitHub
2. Você verá o workflow "Deploy to GitHub Pages" em execução
3. Aguarde a conclusão (geralmente 2-5 minutos)
4. Quando concluído, você verá um link para o site publicado

### 6. Acessar o Site

O site estará disponível em:
```
https://seu-usuario.github.io/nome-do-repositorio/
```

## 🔄 Deploy Automático

Após a configuração inicial, o deploy será automático sempre que você fizer push para a branch `main` ou `master`.

## 🛠️ Deploy Manual

Se precisar fazer deploy manualmente:

1. No GitHub, vá em **Actions**
2. Selecione o workflow "Deploy to GitHub Pages"
3. Clique em **Run workflow**
4. Selecione a branch e clique em **Run workflow**

## ⚠️ Solução de Problemas

### O site não carrega corretamente

- Verifique se o `base-href` está correto no workflow
- Certifique-se de que o GitHub Pages está habilitado com "GitHub Actions"
- Verifique os logs na aba **Actions** para erros

### Rotas não funcionam (404)

- O Angular Router precisa de um arquivo `404.html` que redireciona para `index.html`
- Este arquivo já está incluído no projeto e será copiado automaticamente durante o build

### Build falha

- Verifique se todas as dependências estão no `package.json`
- Verifique os logs na aba **Actions** para detalhes do erro
- Certifique-se de que o Node.js 20 está sendo usado (configurado no workflow)

## 📝 Notas Importantes

- O primeiro deploy pode levar alguns minutos
- Após cada push para `main`, um novo deploy será iniciado automaticamente
- O GitHub Pages é gratuito para repositórios públicos
- Para repositórios privados, você precisa do GitHub Pro

## 🌐 Domínio Customizado

Se você quiser usar um domínio customizado:

1. Configure o domínio no GitHub Pages (Settings > Pages > Custom domain)
2. Ajuste o `base-href` para `/` no workflow
3. Configure os registros DNS conforme instruções do GitHub

---

**Pronto!** Seu site estará no ar após seguir estes passos. 🎉

