# Tasks du sprint 3

Travail effectué :
Lors du sprint 3, nous avons implémenté toutes les fonctionnalités concernant un sprint, une release et la documentation.
Nous avons mis en place des tests unitaires, d'acceptation et de validation à l'aide de mocha et de selenium. 
Nos tests unitaires sont désormais lancés à l'aide de travis. 
Nous avons aussi mis beaucoup d'effort concernant la partie deployement de notre application, en mettant en place docker et en utilisant une base de donnée locale à chacun. 


Difficultés :
La mise en place de docker nous a posé de nombreux problèmes. Nous utilisions une base de donneé externe, et nous avons rencontré des problèmes lorsque nous avons voulu utiliser les systèmes de trigger dans cette base de donnée : Nous n'avions pas les droits.
Nous avons donc finalement mis en place une base de données locale à chacun.
Enfin, après de nombreuses heures de travail, nous avons pu permettre la communication entre les deux containers nécessaires au déployement de notre application.

A Ameliorer :

**Liste des issues réalisées entièrement en sprint 2 :**

| Id  | Nom | Description | Difficulté | Priorité | Sprint |
|---|:---:|:---|:---:|:---:|:---:|
