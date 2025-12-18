# DEPLOIMENT SUR GITHUB PAGES :

| **Table des Matières** |
|------------------------|
| [I - package.json](#I---packagejson) |
| [II - Workflow](#II---Workflow) |
| [III - Layout/Template](#III---LayoutTemplate) |
| [IV - Github Pages](#IV---Github-Pages) |
  


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

Dans le layout `octo_site/src/_includes/templates/base.njk`  
Remplacement de :  
```
<link rel="stylesheet" href="/_includes/css/style.css">
```  
par :  
```
<link rel="stylesheet" href="{{ '/_includes/css/style.css' | url }}">
```
  
  
ainsi que :  
```
      <a href="/">Accueil</a>
      <a href="/Anim/">Animations</a>
      <a href="/BTS/">Behind the scenes</a>
      <a href="/Projects/">Projets</a>
      <a href="/Forum/">Forum</a>
```
par  
```
      <a href="{{ '/' | url }}">Accueil</a>
      <a href="{{ '/Anim/' | url }}">Animations</a>
      <a href="{{ '/BTS/' | url }}">Behind the scenes</a>
      <a href="{{ '/Projects/' | url }}">Projets</a>
      <a href="{{ '/Forum/' | url }}">Forum</a>
```
  
* Changer ainsi la syntaxe (mettre le filtre `url`) permet de garantir que les URLs générées sont compatibles avec le **préfixe de chemin** défini dans la confif Eleventy. Le filtre `url` comporte l'avantage d'assurer que tous les chemins soit cohérents et adaptés, évitants les liens cassés su le préfixe change ou si le site est réorganisé.  
* Il est important d'écrire TOUS les liens avec le filtre `url`. 
  

## IV - Github Pages

### 1. Personal Access Token
  
* Tout d'abord, créer un ACCESS-TOKEN en allant dans les `settings` du répo, puis `Developper Settings`, puis `personal access tokens`.  
* Puis, ajouter le Personal Access Token (PAT) en tant que secret dans les paramètres du répo GIT : Dans `settings` du répo, puis `Secrets and variables`, `Actions` et enfin `New repository secret`. Il ne reste plus qu'à remplir le nom du secret  et coller le PAT dans le champs de texte puis enregistrer.  
* Cela permet de sécuriser les actions automatisées (comme les déploiements). Cela permet aux workflows d'accéder aux ressources privées ou d'effectuer des actions sur le répo sans que le token ne soit visible dans le code (renforçant ainsi la sécurité). 
  
### 2. Config Github Pages

* Dans les `settings` du répo à nouveau, puis dans `pages` : on choisi la source `deploy from a branch`. On passe en suite à `gh-pages` > `/(root)` et on save.

### 3. Test

* Pour tester que tout cela fonctionne, il suffit de faire un changement dans le code (changer le texte dans index.html par exemple) puis `git add`, `git commit -m ""` et `git push` le changement.
* Sur la page GIT du répo, aller dans le tab `Actions`. On y trouve les workflows (ensembles de tâches automatisées définies dans GitHub Actions). Si les changements ont bien été validés, une pastille verte accompagnera le workflow. Elle sera Orange si le workflow est en attente et rouge s'il à échoué.
* Le site est normalement déployé sur : `https://myname.github.io/repo_nape/`  
Ici : `https://ob-teau.github.io/octo_site/`
