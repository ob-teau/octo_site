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
    "serve": "npx @11ty/eleventy --serve",
    "build-ghpages": "npx @11ty/eleventy --pathprefix=/octo_site/"
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
  
`"build": "env NODE_ENV=production npx eleventy --pathprefix 'octo_site'",`: ajout de cette ligne pour lancer Eleventy avec le préfixe de chemin 


