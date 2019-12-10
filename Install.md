_(dernière modification : 10/12/2019)_

#### Pre-requis (pour l'installation sans docker) :

- NodeJS v10
- NPM v6

L'application peut fonctionner avec d'autres versions mais nous ne fournissons aucune garantie à ce propos.

## Installation / Lancement

##### Installation et lancement via docker :

- `git clone https://github.com/elafosse/CDP_Release.git`
- `cd CDP_Release`
- `docker-compose build`
- `docker-compose up`

L'application est disponible à l'adresse `http://localhost:3000/`

##### Installation et lancement sans docker (necessite des pré-requis) :

- `git clone https://github.com/elafosse/CDP_Release.git`
- `cd CDP_Release/cdp-gr1-eq7`
- `npm install`
- `node backend/initApp.js`

Le message `App listening on port # !` apparaissant sur le terminal confirmera que l'application est bien lancée.

## Configuration

**Modification du port :**
Pour modifier le port sur lequel s'execute l'application il suffit, dans le fichier `cdp-gr1-eq7/backend/initApp.js`, de modifier la constante `NUM_PORT` ligne 55. Par défaut, celle-ci est configurée sur le port.

**Modification de la base de donnée :**
La connexion à la base de donnée est configuée au début du fichier `cdp-gr1-eq7/backend/db_connection.js` dans la variable `con`. Les informations modifiables sont les suivantes :

- host : Adresse de la base de donnée
- port : Numéro du port utilisé pour acceder à la base de donnée
- database : Nom de la base de donnée à utiliser
- user : Nom d'utilisateur utilisé pour la connexion
- password : Mot de passe utilisé pour la connexion
- multiplestatement : Permet d'envoyer plusieurs requetes simultanément a la base de données. **Ne pas modifier car de nombreuses fonctions se reposent dessus.**
