# Explications generales :

| **Table des Matières** |
|------------------------|
| [I - Config Initiale](#I---Config-Initiale) |
| [Vocab](#VOCABULAIRE) | 
  


## I - Config Initiale

```
mkdir	eleventy-sample
cd		eleventy-sample
npm init -y
```
  
`npm init -y` : Init un nouveau projet [Node.js](#VOCABULAIRE) et crée un fichier package.json avec des valeurs par défaut. Le fichier package.json est essentiel pour gérer les dépendances du projet, et pour stocker des informations sur le projet.
  
```
npm pkg set type = "module"

* Cette commande définit le type de [module](#VOCABULAIRE) pour le projet en spécifiant l'utilisation des modules [Javascript](#VOCABULAIRE) (ESM)


## VOCABULAIRE

| **Vocab** |  |
|-----------|---|
| npm | C'est le gestionnaire des paquets par défauts pour Nodes.js. Il permet d'installer, gerer, partager des paquets Javascript. |
| Paquets | Peut contenir du code des ressources, des outils pouvant être utilisé dans le projet, les paquets sont installés avec npm |
| Node.js | C'est un environnement d'execution Javascript côté serveur. (Il permet d'éxecuter du code Javascript en dehors du navigateur, ce qui est utile au dvp) |
| valeurs | Les valeurs par défaut sont des infos comme le nom du projet, la version, la description, etc. Ces valeurs peuvent être modifiées par la suite manuellement. |
| Dépendances | Des bibliothèques ou des paquets dont le projet à besoin pour fonctionner |
| module | Des morceaux / templates de code Javascript qui peuvent être importés et exportés entre différents fichiers. Permet de structurer le code de manière plus organisé. |


