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
  
`"build": "env NODE_ENV=production npx eleventy --pathprefix 'octo_site'",`: ajout de cette ligne qui sert à générer le site avec Eleventy en mode production tout en spécifiant le préfixe de chemin (`'octo_site'`)  pour les fichiers générés, ce qui est utile si le site est accesible via un sous répertoire comme `octo_site`. Cela permet également d'appliquer des optimisations pécifiques à l'environnement de production.


