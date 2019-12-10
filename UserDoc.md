_(dernière modification : 4/12/2019)_

# ScrumHelper

**ScrumHelper** est une application Web facilitant la gestion de projets selon la méthodologie Scrum.
Une fois votre projet créé, vous pouvez ajouter, modifier et supprimer des issues, des tasks, des sprints, des tests et des releases et leur documentation. Vous pouvez également ajouter et supprimer des membres à votre projet.

# Utilisation

## Accéder à ScrumHelper

Pour accéder à ScrumHelper :

1. Suivez les instructions dans `Install.md`
2. Ouvrez un navigateur Internet
3. Allez à l'adresse `localhost:3000`

Par défaut, l'application se lance sur le port `3000`.

## Votre compte

Pour utiliser ScrumHelper, vous devez avoir un compte et vous y connecter. Si cela n'est pas le cas, vous pouvez en créer un.

### Création d'un compte

Pour créer un compte :

1. Rendez vous sur l'accueil en cliquant sur **ScrumHelper** en haut à gauche
2. Cliquez sur **Sign Up** en haut à droite de la page
3. Entrez un nom d'utilisateur <span style="color:red">\*</span>
4. Entrez un mot de passe <span style="color:red">\*</span>
5. Confirmez le mot de passe <span style="color:red">\*</span>
6. Cliquez sur le bouton **Sign Up** en bas de la page

_Les champs marqués d'une_ <span style="color:red">\*</span> _sont obligatoires._

**<span style="color:red">Veillez à conserver vos identifiants quelque part car une fois votre compte créé, vous ne pourrez plus les changer ou les récupérer</span>**

Si la création du compte a fonctionné, la page permettant de vous connecter à votre compte apparaît.
Sinon, un message d'erreur s'affiche.

### Connexion à un compte

Pour vous connecter à un compte déjà existant :

1. Cliquez sur **Sign In** en haut à droite de la page
2. Entrez le nom d'utilisateur du compte <span style="color:red">\*</span>
3. Entrez le mot de passe du compte <span style="color:red">\*</span>
4. Cliquez sur **SignIn** en bas de la page

_Les champs marqués d'une_ <span style="color:red">\*</span> _sont obligatoires._

### Déconnexion

Pour vous déconnecter, cliquez sur le bouton **Sign Out** en haut à droite.

## Liste des projets

Cette page affiche la liste des projets auxquels vous participez ainsi que leurs descriptions.

Il est possible d'y accéder en cliquant sur **Manage Projects** en haut à droite de l'écran.

Vous pouvez accéder aux issues, tasks, tests, sprints, releases et paramètres d'un projet en cliquant sur le bouton **Details** qui apparaît sous la description du projet.

La liste des projets auxquels vous participez s'affiche également dans le menu déroulant en haut à gauche. Cliquer sur un projet vous mène à l'overview de celui-ci. En revanche, vous ne pouvez pas supprimer de projet depuis ce menu.

## Création d'un nouveau projet

Une fois connecté, vous pouvez créer un nouveau projet.

Pour cela :

1. Rendez-vous sur la page affichant la liste de vos projets
2. Cliquez sur le bouton **New Project**.

Sur la page de création d'un nouveau projet, entrez :

- le nom du projet <span style="color:red">\*</span>
- la description du projet <span style="color:red">\*</span>
- le nom du compte GitHub des releases
- le nom du dépôt GitHub des releases
- le nom de l'utilisateur que vous souhaitez ajouter au projet puis cliquez sur le bouton **Add**
- vous pouvez supprimer un membre du projet en cliquant sur le bouton &#x274C; à côté de son nom d'utilisateur
- créez le projet en cliquant sur <span style="color:green">&#10004;</span>

_Les champs marqués d'une_ <span style="color:red">\*</span> _sont obligatoires._

## Supprimer un projet

Si vous êtes l'administrateur d'un projet, vous pouvez le supprimer en cliquant sur le bouton **Delete** à côté du projet dans la liste des projets.

## Projet

Lorsque vous cliquez sur un projet, vous avez accès aux différentes parties du projet :

- les issues
- les tâches
- les sprints
- les tests
- les releases
- les paramètres du projet

### Overview d'un projet

Quand vous cliquez sur un projet, vous accédez à son overview.
L'overview s'affiche aussi quand vous cliquez sur le nom du projet, dans le menu latéral.

Celui-ci vous indique un résumé du sprint en cours :

- le nombre total de tâches du sprint
- le nombre de tâches à faire, en cours et terminées du sprint
- le nombre total d'issues du sprint
- le nombre d'issues à faire, en cours et terminées du sprint

Mais aussi un résumé du projet avec :

- le nombre total d'issues du projet
- le nombre d'issues à faire, en cours et terminées du projet

### Modifier les paramètres d'un projet

Il est possible de modifier les paramètres d'un projet.

**<span style="color:red">Vous devez être administrateur du projet pour pouvoir modifier ses paramètres</span>**

Pour cela :

1. Cliquez sur le projet dont vous voulez modifier les paramètres
2. Cliquez sur **Project Settings** dans le menu latéral

Un formulaire s'affiche vous permettant de :

- modifier le nom du projet <span style="color:red">\*</span>
- modifier la description du projet <span style="color:red">\*</span>
- modifier le nom d'utilisateur du GitHub des releases
- modifier le nom du dépôt GitHub des releases
- ajouter un membre au projet en entrant son nom d'utilisateur puis en cliquant sur **Add**
- supprimer un membre du projet en cliquant sur le bouton #x274C; à côté de son nom d'utilisateur
- enregistrer les modifications en cliquant sur <span style="color:green">&#10004;</span>

_Les champs marqués d'une_ <span style="color:red">\*</span> _sont obligatoires._

## Issue

### Liste des issues

Pour accéder à la liste des issues d'un projet :

1. Cliquez sur le projet dont vous voulez voir les issues
2. Dans le menu latéral d'un projet, cliquez sur **Issues**

Dans le bandeau d'une issue sont affichés de gauche à droite :

- son identifiant
- son nom
- sa priorité
- sa difficulté

Cliquer sur une issue affiche en plus :

- sa description
- un bouton <span style="color:orange">&#9998;</span> permettant de modifier l'issue
- un bouton &#x274C; permettant de supprimer l'issue

### Ajouter une issue

Pour ajouter une issue :

1. Allez sur la liste des issues du projet
2. Cliquez sur le bouton **Add issue** en bas à gauche de la page

Un formulaire s'affiche vous permettant de :

- entrer le nom de l'issue à créer <span style="color:red">\*</span>
- choisir une priorité entre LOW, MEDIUM ou HIGH <span style="color:red">\*</span>
- entrer une difficulté <span style="color:red">\*</span> <span style="color:green">\*\*</span>
- entrer la description<span style="color:red">\*</span>
- cliquer sur le bouton <span style="color:green">&#10004;</span> pour créer l'issue

_Les champs marqués d'une_ <span style="color:red">\*</span> _sont obligatoires._
<span style="color:green">\*\*</span> _doit être un entier strictement positif._

Chaque issue est caractérisée par un identifiant unique attribué automatiquement par ScrumHelper.

### Modifier une issue

Pour modifier une issue :

1. Allez sur la liste des issues du projet
2. Cliquez sur l'issue à modifier
3. Cliquez sur le bouton <span style="color:orange">&#9998;</span>

Un formulaire s'affiche vous permettant de :

- modifier le nom de l'issue
- choisir la nouvelle priorité entre LOW, MEDIUM ou HIGH
- modifier la difficulté <span style="color:green">\*\*</span>
- modifier la description
- cliquer sur le bouton <span style="color:green">&#10004;</span> pour enregistrer les modifications

<span style="color:green">\*\*</span> _doit être un entier strictement positif._

### Supprimer une issue

Pour supprimer une issue :

1. Allez sur la liste des issues du projet
2. Cliquez sur l'issue à supprimer
3. Cliquez sur le bouton &#x274C; pour supprimer l'issue

## Tâche

### Liste des tâches

Pour accéder à la liste des tâches d'un projet :

1. Cliquez sur le projet dont vous voulez voir les tâches
2. Dans le menu latéral d'un projet, cliquez sur **Tasks**

Les tâches sont réparties dans différentes colonnes en fonction de leur état :

- **Tasks To Do** contient les tâches pas encore commencées
- **Ongoing Tasks** contient les tâches en cours
- **Tasks Done** contient les tâches terminées

Pour chaque tâche, sont affichés :

- le nom de la tâche
- sa description
- les issues qu'elle implémente

Cliquer sur une tâche affiche en plus :

- son nom
- son état _"To Do", "Doing"_ ou _"Done"_
- le temps de réalisation nécessaire estimé en jh
- sa Definition of Done
- la date à laquelle cette tâche a été commencée
- les membres du projet qui sont chargés de sa réalisation
- la liste des issues que la tâche implémente
- les tâches requises pour la réalisation de celle-ci
- un bouton **Modify** permettant de modifier la tâche
- un bouton **Remove** permettant de supprimer la tâche

### Ajouter une tâche

Pour ajouter une tâche :

1. Allez sur la liste des tâches du projet
2. Cliquez sur le bouton **Add task** en bas à gauche de la page

Un formulaire s'affiche vous permettant de :

- entrer le nom de la tâche à créer <span style="color:red">\*</span>
- entrer la description
- sélectionner l'état _"To do", "Doing"_ et _"Done"_ <span style="color:red">\*</span>
- sélectionner une date de début <span style="color:red">\*</span>
- sélectionner ou entrer la durée de réalisation estimée<span style="color:red">\*</span> <span style="color:green">\*\*</span>
- entrer la Definition of Done
- sélectionner les membres du projet qui sont chargés de sa réalisation (`Shift + Click` pour sélectionner plusieurs membres. Cliquez à nouveau sur un membre pour le désélectionner)
- sélectionner les tâches requises pour sa réalisation (`Shift + Click` en cliquant pour sélectionner plusieurs tâches. Cliquez à nouveau sur une tâche pour la désélectionner)
- sélectionner les issues qu'elle implémente (`Shift + Click` pour sélectionner plusieurs issues. Cliquez à nouveau sur une issue pour le désélectionner)
- cliquer sur le bouton **Create task** pour créer la tâche

_Les champs marqués d'une_ <span style="color:red">\*</span> _sont obligatoires._
<span style="color:green">\*\*</span> _doit être un entier strictement positif._

Chaque issue est caractérisée par un identifiant unique attribué automatiquement par ScrumHelper.

### Modifier une tâche

Pour modifier une tâche :

1. Allez sur la liste des tâches du projet
2. Cliquez sur la tâche à modifier
3. Cliquez sur le bouton **Modify** pour modifier la tâche

Un formulaire s'affiche vous permettant de :

- modifier le nom de la tâche à créer <span style="color:red">\*</span>
- modifier la description
- sélectionner l'état _"To do", "Doing"_ et _"Done"_ <span style="color:red">\*</span>
- sélectionner une date de début <span style="color:red">\*</span>
- sélectionner ou entrer la durée de réalisation estimée<span style="color:red">\*</span> <span style="color:green">\*\*</span>
- modifier la Definition of Done
- sélectionner les membres du projet qui sont chargés de sa réalisation (`Shift + Click` pour sélectionner plusieurs membres. Cliquez à nouveau sur un membre pour le désélectionner)
- sélectionner les tâches requises pour sa réalisation (`Shift + Click` en cliquant pour sélectionner plusieurs tâches. Cliquez à nouveau sur une tâche pour la désélectionner)
- sélectionner les issues qu'elle implémente (`Shift + Click` pour sélectionner plusieurs issues. Cliquez à nouveau sur une issue pour la désélectionner)
- cliquer sur le bouton **Modify task** pour enregistrer les modifications

_Les champs marqués d'une_ <span style="color:red">\*</span> _sont obligatoires._
<span style="color:green">\*\*</span> _doit être un entier strictement positif._

### Supprimer une tâche

Pour supprimer une tâche :

1. Allez sur la liste des tâches du projet
2. Cliquez sur la tâche à supprimer
3. Cliquer sur le bouton **Remove** pour supprimer la tâche

## Sprint
Il est possible de créer et d'accèder à la liste des sprints d'un projet

### Liste des sprints

Pour accéder à la liste des sprints d'un projet :

1. Cliquez sur le projet dont vous voulez voir les sprints
2. Dans le menu latéral d'un projet, cliquez sur **Sprints**

Une liste des sprints apparaîtra alors sur la page. La date de début et de fin d'un sprint sont affichés à droite du numéro du sprint. Pour accéder aux détails d'un sprint, cliquez sur celui-ci. Il sera alors possible de voir :
- L'objectif du sprint
- Les issues comptant être réalisées pendant le sprint
- Les tâches liées aux issues du sprint
- Une barre de progression calculant le nombre de tâches réalisées sur le nombre total de tâches. 

Le sprint en cours est présenté en jaune. 

### Ajouter un sprint

Pour ajouter un sprint, cliquez sur le bouton "Add Sprint" sur la page de la liste des sprints. Une boite de dialogue s'ouvrira, et vous devrez remplir les informations suivantes :
- L'objectif du sprint
- Les issues à réaliser pour ce sprint (Ctrl + clic pour en selectionner plusieurs)
- La date de départ
- La date de fin

Une fois les informations remplies, cliquer sur le bouton <span style="color:green">&#10004;</span> pour sauvegarder le nouveau sprint.

### Modifier un sprint

Une fois dans les détails d'un sprint, cliquer sur <span style="color:orange">&#9998;</span> vous permettra d'accéder à la page de modification d'un sprint. Remplisez les nouvelles informations et cliquez sur <span style="color:green">&#10004;</span> pour sauvegarder vos modifications.

### Supprimer un sprint 

Une fois dans les détails d'un sprint, cliquez sur &#x274C; vous permettra de supprimer un sprint. Une alerte apparaîtra, vous permettant ainsi de confirmer votre choix, ou bien de l'annuler.

## Test

### Liste des tests

Pour accéder à la liste des tests du projet :

1. Allez sur le projet dont vous voulez avoir la liste des tests
2. Cliquez sur **Tests** dans le menu latéral

Les tests sont répartis dans deux colonnes en fonction de leur état :

- **To implement** pour les tests (en **<span style="color:grey">gris</span>**) qui n'ont pas encore été implémentés ou lancés
- **Done** pour les tests qui ont réussi (en **<span style="color:green">vert</span>**) ou qui ont échoué (en **<span style="color:red">rouge</span>**)

Cliquer sur le nom d'un test permet de voir :

- sa description, c'est-à-dire les fonctionnalités ou fonctions qu'il teste
- les résultats attendus par le test pour que celui-ci soit réussi
- la dernière version du projet pour laquelle il a été réussi
- la liste des issues qu'il teste (cliquez sur une issue pour accéder à ses détails)
- un bouton **<span style="color:grey">To Implement</span>** permettant de modifier l'état du test s'il n'a pas encore été implémenté ou lancé
- un bouton **<span style="color:green">Passed</span>** permettant de modifier l'état du test s'il a réussi
- un bouton **<span style="color:red">Failed</span>** permettant de modifier l'état du test s'il a échoué
- un bouton <span style="color:orange">&#9998;</span> permettant de modifier le test
- un bouton &#x274C; permettant de supprimer le test

### Ajouter un test

Pour ajouter un test :

1. Allez sur la liste des tests du projet
2. Cliquez sur le bouton **Add test** en bas à gauche de la page

Un formulaire s'affiche vous permettant de :

- entrer le nom du test <span style="color:red">\*</span>
- entrer la description du test, c'est-à-dire les fonctionnalités ou fonctions qu'il teste <span style="color:red">\*</span>
- entrer la dernière version du projet pour laquelle il a été réussi <span style="color:red">\*</span>
- cocher les issues qu'il teste
- créer le test en cliquant sur le bouton <span style="color:green">&#10004;</span>

_Les champs marqués d'une_ <span style="color:red">\*</span> _sont obligatoires._

### Modifier un test

Pour modifier un test :

1. Allez sur la liste des tests du projet
2. Cliquez sur le nom du test à modifier
3. Cliquez sur le bouton <span style="color:orange">&#9998;</span> en bas à droite de la page

Un formulaire s'affiche vous permettant de :

- entrer le nom du test <span style="color:red">\*</span>
- entrer la description du test, c'est-à-dire les fonctionnalités ou fonctions qu'il teste <span style="color:red">\*</span>
- entrer la dernière version du projet pour laquelle il a été réussi <span style="color:red">\*</span>
- cocher les issues qu'il teste
- créer le test en cliquant sur le bouton <span style="color:green">&#10004;</span>

_Les champs marqués d'une_ <span style="color:red">\*</span> _sont obligatoires._

### Supprimer un test

Pour supprimer un test :

1. Allez sur la liste des tests du projet
2. Cliquez sur le test à supprimer
3. Cliquez sur le bouton &#x274C; pour supprimer le test

## Release

### Liste des releases

Les releases affichées sont celles présentes sur le GitHub dont les paramètres sont définis dans les paramètres du projet.

Pour accéder à la liste des releases d'un projet :

1. Allez sur le projet dont vous voulez voir les releases
2. Dans le menu latéral, cliquez sur **Releases**

<span style="color:red">Vous aurez besoin de vous connecter à votre compte GitHub pour voir les releases d'un dépôt GitHub privé et pour ajouter, modifier ou supprimer une release.</span>

Si vous n'êtes pas connecté à votre compte GitHub, un message s'affiche en haut de la page. Si vous êtes connecté à votre compte GitHub, le nom du dépôt GitHub des releases s'affiche à la place. Cliquer dessus vous redirigera vers le dépôt GitHub.

Le nom et la version de chaque release sont affichés. Cliquer dessus fera apparaître :

- la description de la release postée sur le dépôt GitHub. Utilisez les balises **Markdown** pour améliorer la présentation de la description
- le sprint lié à la release. Cliquez dessus pour accéder aux détails du sprint
- un bouton <span style="color:orange">&#9998;</span> à côté de **Sprint** pour changer le sprint
- la date de création de la release
- les fichiers **Assets** nécessaires pour installer la release. Cliquez sur un asset pour le télécharger
- un lien **Documentation** vers la documentation de la release
- un bouton <span style="color:orange">&#9998;</span> à côté de **Documentation** pour modifier le lien vers la documentation
- un lien **See on GitHub** vers la page GitHub de la release
- un bouton <span style="color:orange">&#9998;</span> en bas à droite pour modifier la release
- un bouton &#x274C; pour supprimer la release

### Ajouter une release

Pour ajouter une release :

1. Allez sur la liste des releases du projet
2. Cliquez sur **Add release** en bas à gauche de la page
3. Vous allez être redirigé vers le dépôt GitHub des releases du projet
4. Renseignez les champs demandés
5. Enregistrez
6. Revenez sur votre projet ScrumHelper
7. Rechargez la liste des releases
8. Vous pouvez alors ajouter une documentation et lier un sprint à la release

<span style="color:red">Vous aurez besoin d'aller sur GitHub et de vous connecter à votre compte GitHub pour ajouter une release.</span>

### Modifier une release

Pour modifier le nom, la version, la description, la date de création et les assets d'une release, vous devez vous rendre sur le dépôt GitHub.

Pour modifier une release :

1. Allez sur la liste des releases du projet
2. Cliquez sur le nom de la release à modifier
3. Un nouvel onglet vous redirige vers le dépôt GitHub des releases du projet
4. Renseignez les champs demandés
5. Enregistrez
6. Revenez sur votre projet ScrumHelper
7. Rechargez la liste des releases si besoin

<span style="color:red">Vous aurez besoin d'aller sur GitHub et de vous connecter à votre compte GitHub pour modifier une release.</span>

### Lier un sprint à une release

Pour lier un sprint à une release :

1. Allez sur la liste des releases du projet
2. Cliquez sur le nom de la release à laquelle vous voulez lier un sprint
3. Cliquez sur le bouton <span style="color:orange">&#9998;</span> à côté de **Sprint**
4. Sélectionnez le sprint que vous voulez lier à la release
5. Cliquez sur le bouton <span style="color:green">&#10004;</span> pour enregistrer vos modifications

<span style="color:red">Vous ne pouvez lier qu'un seul sprint à une release</span>

### Supprimer une release

Pour supprimer une release :

1. Allez sur la liste des releases
2. Cliquez sur le nom de la release que vous voulez supprimer
3. Cliquez sur le bouton &#x274C; en bas à droite

<span style="color:red">Vous pourriez avoir besoin d'aller sur GitHub et de vous connecter à votre compte pour réaliser cette opération</span>

### Se connecter à son compte GitHub

Pour voir les releases d'un dépôt GitHub privé, vous aurez besoin d'entrer vos identifiants GitHub sur le projet ScrumHelper.

Pour cela :

1. Allez sur la liste des releases du projet
2. Cliquez sur **SignIn in GitHub** en bas de la page
3. Entrez votre nom d'utilisateur GitHub
4. Entrez votre mot de passe GitHub
5. Cliquez sur le bouton <span style="color:green">&#10004;</span> pour valider

### Changer le dépôt GitHub des releases

Pour changer le dépôt GitHub des releases :

1. Allez sur la liste des releases du projet
2. Cliquez sur **Set GitHub**

Un formulaire s'affiche alors :

- entrez le nom d'utilisateur du propriétaire du dépot GitHub des releases
- entrez le nom du dépôt GitHUb des releases
- enregistrez vos modifications en cliquant sur le bouton <span style="color:green">&#10004;</span>

Il est également possible de changer le dépôt GitHub des releases dans les paramètres du projet.

<span style="color:red">Seul un administrateur du projet a accès à cette fonctionnalité.</span>

## Documentation

### Ajouter ou modifier la documentation d'une release

La documentation d'une release se présente sous la forme d'un lien http.
Pour ajouter une documentation à une release :

1. Allez sur la liste des releases
2. Cliquez sur le nom de la release à laquelle vous voulez ajouter/modifier la documentation
3. Cliquez sur le bouton <span style="color:orange">&#9998;</span> à côté de **Documentation**
4. Entrez l'URL de la documentation
5. Enregistrez vos modifications en cliquant sur le bouton <span style="color:green">&#10004;</span>
