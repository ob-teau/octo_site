# DEPLOIMENT SUR GITHUB PAGES :

| **Table des Matières** |
|------------------------|
|  |
|  | 
  


## I - package.json

```
{
  "name": "eleventy-sample",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "eleventy --serve",
    "build": "env NODE_ENV=production npx eleventy --pathprefix 'octo_site'",
    "serve": "npx @11ty/eleventy --serve"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "dependencies": {
    "@11ty/eleventy": "^3.1.2",
    "netlify-plugin-cache": "^1.0.3"
  }
}
```
  
`"build": "env NODE_ENV=production npx eleventy --pathprefix 'octo_site'",`: ajout de cette ligne pour générer le site avec Eleventy en mode production tout en spécifiant le préfixe de chemin (`'octo_site'`)  pour les fichiers générés, ce qui est utile si le site est accesible via un sous répertoire comme `octo_site`. Cela permet également d'appliquer des optimisations pécifiques à l'environnement de production.
  
  
## II - Workflow
  
```
mkdir octo_site/.github
mkdir octo_site/.github/workflow
touch octo_site/.github/workflow/deploy-to-ghpages.yml
```

* la création de ce chemin et de ce fichier définit un workflow automatisé pour GitHub Actions qui déploie le contenu du site vers GitHub Pages à chaque fois qu'il y a des changements sur la branche `main`. Il spécifie les étapes nécessaires, telles que l'intallation des dépendances, la construction du site et la publication sur la branche `gh-pagesi`. 
  
  
contenu du fichier :
```
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  deploy:
    runs-on: ubuntu-22.04
    permissions:
      contents: write
    concurrency:
      group: ${{ github.workflow }}-${{ github.ref }}
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: "20"

      - name: Persist npm cache
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('eleventy-sample/**/package.json') }}  # Chemin mis à jour

      - name: Persist Eleventy .cache
        uses: actions/cache@v3
        with:
          path: ./.cache
          key: ${{ runner.os }}-eleventy-fetch-cache

      - name: Change directory to eleventy-sample
        run: cd eleventy-sample

      - run: npm install
        working-directory: eleventy-sample  # Spécifiez le chemin

      - run: npm run build
        working-directory: eleventy-sample  # Spécifiez le chemin

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: eleventy-sample/_site  # Chemin vers les fichiers générés

```
  
  
## III - Layout/Template

Dans le layout 
Remplacement de :  
`<link rel="stylesheet" href="/_includes/css/style.css">`  
par :  
`<link rel="stylesheet" href="{{ '/_includes/css/style.css' | url }}">`
