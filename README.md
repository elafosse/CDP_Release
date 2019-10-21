# CDP_Release
#Github for releases

#Group members:
#_Kheloufi Rayan
#_LAFOSSE Estelle
#_MENAN Jimmy


Issues
======================================
_Les issues sont présentées comme ci :
id (difficulté, importance) -> description
Plus le chiffre est élevé plus l'issue est importante_

Compte
--------

I0 (13, 13) -> En tant que visiteur, je souhaite créer un compte sur le site en cliquant sur un bouton "Inscription" afin de pouvoir me connecter. La page de création d'un compte doit me demander :
* un nom d'utilisateur unique sous forme de chaîne de charactères (20 char max)
* un mot de passe sous forme de chaîne de charactères. 

I1 (8, 13) -> En tant que visiteur, je souhaite me connecter à mon compte en cliquant sur un bouton "Connection" afin d'avoir accès à mes projets. La page de connexion doit me demander :
* mon nom d'utilisateur unique sous forme de chaîne de charactères
* un mot de passe sous forme de chaîne de charactères. 

Une message d'erreur doit apparaître si le couple nom d'utilisateur/mot de passe entré ne correspond à aucun compte.

I2 (1, 8) -> En tant que connecté, je souhaite pouvoir me déconnecter en cliquant sur un bouton "Déconnexion", afin de supprimer ma session en court.

Participation aux Projet
--------
*Projet : Un projet a un nom, une liste de membres, une liste d'issues, de tasks, une description, une description des tests

I3 (5, 13) -> En tant que connecté, je souhaite pouvoir créer un projet en spécifiant :
* un nom
* une description
* en ajoutant des membres

I4 (5, 8) -> En tant que créateur du projet, je souhaite pouvoir inviter d'autres membre à mon projet en :
* cliquant sur un bouton "Ajouter un membre"
* en spécifiant son nom d'utilisateur

afin qu'il puisse participer à l'avancement du projet en modifiant les issues, les tasks et les tests.

I5 (5, 3) -> En tant que membre du projet ou créateur du projet, je souhaite avoir accès à la liste des membres du projet.

I6 (5, 3) -> En tant que créateur du projet, je souhaite pouvoir supprimer un membre de mon projet en cliquant sur un bouton "Supprimer" à coté d'un noms des membres de mon équipe dans la liste des membres du projet.

I7 (5, 5) -> En tant que connecté, je souhaite avoir accès à une liste des projets auxquels je suis inscrit. 

Issues
--------

*Issue : Une issue est l'expression d'un besoin particulier. Dans une issue doit apparaître un id unique, un nom, une description, une priorité, une difficulté et un état (En attente de validation, à faire, en cours, finie). 

I8 (5, 13) -> En tant que membre d'un projet, je souhaite pouvoir accéder à la liste des issues d'un projet. 

I9 (5, 13) -> En tant que membre d'un projet et en etant sur la liste des issues d'un projet, je souhaite pouvoir créer une Issue en cliquant sur "Ajouter Issue" et en spécifiant :
* un nom
* une description
* une priorité 
* une difficilé (l'id sera créé automatiquement)

afin qu'elle soit visible par les autres membres du projet.

I10 (8, 3) -> En tant que membre d'un projet et en étant sur la liste des issues d'un projet, je souhaite pouvoir modifier une issue en cliquant sur "Modifier" à coté de l'issue concernée, et de spécifier les nouvelles valeurs des champs de I9. 

I11 (3, 5) -> En tant que membre d'un projet et en étant sur la liste des issues d'un projet, je souhaite pouvoir supprimer une issue en cliquant sur le bouton "Supprimer" à coté de l'issue à supprimer, puis en confirmant mon choix afin qu'elle soit définitivement supprimée du projet.

Tasks
--------

*Task : Une tâche décrit un travail qui va être effectué par un développeur dans l'objectif de réaliser une ou plusieurs issues. Une tâche comprend un nom, une description, est liée à une ou plusieurs issues, à un état (A faire, en cours, finie), est délimitée dans le temps (Date de début - Temps nécessaire à la réalisation), doit avoir une "Definition of Done" (spécifier exactement quand elle sera réalisée), une dépendance à la réalisation d'autres tâches si besoin, et son attribution à un membre du projet.

I12 (5, 13) -> En tant que membre d'un projet, je souhaite pouvoir accéder à la liste des taches d'un projet sous forme de tableau avec 
* les taches à faire
* les tâches en cours
* les tâches celles terminées. 

I13 (8, 13) -> En tant que membre d'un projet et étant sur la liste des tâches, je souhaite pouvoir créer une nouvelle tâche en cliquant sur le bouton "Ajouter Tâche" puis en spécifiant :
* son nom
* sa description
* son état
* sa date de début
* le temps nécessaire à sa réalisation
* sa Definition of Done
* les membres concernées par celle-ci
* les autres tâches pré-requises
* la/les liaison(s) à l'Id d'une ou plusieurs issues. 

I14 (3, 1) -> En tant que membre du projet, je souhaite pouvoir accéder à une Issue liée à une tâche en cliquant sur son Id dans la description de la tâche afin d'avoir accès à l'issue rapidement.

I15 (5, 13) -> En tant que membre du projet, je souhaite pouvoir accéder aux détails (nom, description, état, issues, temps, membres concernés, definition of done, les tâches pré-requises) d'une tâche en cliquant sur celle-ci. 

I16 (3, 8) -> En tant que membre du projet et une fois sur la description de la tâche, je souhaite pouvoir supprimer une tâche cliquant sur le bouton "Supprimer", puis en confirmant mon choix afin qu'elle soit définitivement supprimée du projet.

I17 (8, 5) -> En tant que membre du projet et une fois sur la description de la tâche, je souhaite pouvoir modifier les détails de la tâche, puis confirmer les changements cliquant sur le bouton "Enregistrer" afin de pouvoir modifier facilement le contenu d'une tache.

Release
--------
*Release : Sur le site, une release aura un nom, une description, une date, les issues auxquelles elle répond, et contiendra un lien vers le projet.

I18 (8, 8) -> En tant que membre de projet, je souhaite avoir accès à une liste de releases existantes. 

I19 (5, 8) -> En tant que membre de projet une fois sur la liste des releases, je souhaite pouvoir créer une release en appuyant sur le bouton "Créer Release" en spécifiant :
* un nom
* une description 
* le lien de la release
* les issues auxquelle elle répond.

I20 (8, 2) -> En tant que membre de projet une fois sur la liste des releases, je souhaite pouvoir modifier une release en appuyant sur le bouton "Modifier Release" à coté de la release concernée, puis en modifiant les champs nécessaires avant de confirmer la modification. 

I21 (5, 5) -> En tant que membre de projet une fois sur la liste des releases, je souhaite pouvoir supprimer une release en appuyant sur le bouton "Supprimer Release" à coté de la release concernée, puis en confirmant mon choix.  

Doc
--------
*Documentation : Documents donnant des informations concernant le logiciel. Notre projet soutiendra deux types de documentation : la documentation utilisateur et la documentation administrateur.

I22 (13, 8) -> En tant que membre de projet, je souhaite avoir accès à la documentation disponible du projet en sachant à quelle version elle correspond afin d'être capable de comprendre et d'utiliser le logiciel facilement. 

I23 (13, 8) -> En tant que membre de projet, je souhaite pouvoir ajouter de la documentation concernant une version released en cliquant sur un bouton "Ajouter Documentation" pour 
* spécifier la version du logiciel
* la lier à une release 
* déposer le document 

I24 (13, 2) -> En tant que membre de projet, je souhaite pouvoir modifier une documentation existante en cliquant sur un bouton "Modifier Documentation" permettant de remplacer une documentation par une autre.

I25 (8, 8) -> En tant que membre de projet, je souhaite pouvoir supprimer une documentation existante en cliquant sur un bouton "Supprimer Documentation" et en confirmant mon choix. 


Tests
--------
*Test : Ici un tests réfère à un objet "Test" comprenant un nom, une description de la fonction à tester et du resultat attendu par celui-ci, l'issue à laquelle il correspond, un état "à coder" ou "fait", et la dernière version pour laquelle le test a été validé.

I26 (5, 8) -> En tant que membre de projet, je souhaite avoir accès à une liste des tests ayant été faits et ceux encore à faire afin de m'aider à comprendre l'avancement des tests dans le projet. 

I27 (5, 8) -> En tant que membre de projet, je souhaite pouvoir ajouter un tests dans la liste des tests à effectuer en appuyant sur un bouton "Ajouter Test", puis en spécifiant 
* un nom
* une description de la fonction à tester et du resultat attendu par celui-ci 
* en le liant à une issue.
* en précisant la dernière version pour laquelle le test a été validé

I28 (8, 8) -> En tant que membre de projet, je souhaite pouvoir modifier l'état d'un test ("A coder" ou "Fait") afin de comprendre rapidement quels tests ont été fait, et ceux restant à coder dans l'application. 

I29 (8, 5) -> En tant que membre de projet, je souhaite pouvoir modifier un test en cliquant sur un bouton "Modifier Test" et en modifiant :
* le nom
* la description
* la dernière version pour laquelle le test a été validé 

I30 (3, 8) -> En tant que membre de projet, je souhaite pouvoir supprimer un test en cliquant sur le bouton "Supprimer" à coté du test correspondant. 











