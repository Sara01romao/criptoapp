<h2 align="center"> 💻 Listagem:  Cripto Moedas</h2> 

<p align="center">
  

  <img max-width="auto" height="auto"  src="https://github.com/user-attachments/assets/be81b257-baff-44fd-9c56-b6f19571de73">
  <img max-width="auto" height="auto"  src="https://github.com/user-attachments/assets/110d147b-241d-48a3-a790-533e612e481a">
  <img max-width="auto" height="auto"  src="https://github.com/user-attachments/assets/540a7be5-0282-4e4b-a595-1b7148a9afce">










</p> 


## 💻  Sobre o Projeto
Neste projeto, desenvolvido durante o curso de React com TypeScript, foi criada uma lista de criptomoedas. Foram utilizados useState e useEffect para gerenciar e atualizar o estado dos dados. A tipagem das informações da API foi implementada para garantir maior segurança e previsibilidade.




 <h3> :bulb: Como melhorias: </h3>
Aprimorei o layout, adicionei uma nova página de Exchange que lista os nomes das corretoras com links para seus sites, e implementei um filtro de busca que 
atualiza a lista das corretoras sem sair da página.

<a href="https://sara01romao.github.io/sign-up-form-html-css-javascript/" target="_blank"><strong>Acessar »</strong></a>

<br>





## :rocket: Tecnologias Usadas


Front-end 
```
React js
Typescript
Reacts Icons
```

Api
```
CoinCap: https://docs.coincap.io/
```











# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
