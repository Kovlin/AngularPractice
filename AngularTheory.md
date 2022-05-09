# TRANSCENDENCE - ANGULAR

## ANGULAR


This document focus on Angular , a typescript frontend framework 

https://angular.io/


#### USAGE

installer nodejs LTS (last stable version) qui installer aussi npm (gestionnaire de paquets javascript)

installer Angular CLI : npm install -g @angular/cli

ng new ng-pokemon-app --minimal --style=css 

-> cette commande va générer un nouveau (socle du) projet (new), appelée ng-pokemon-app, --minimal pour générer une version allégée du socle
du projet, --style pour préciser qu'on veut du code css pour le style de l'application

angular ensuite propose d'ajouter les routes pour le projet (utile car on va avoir plusieurs pages)
angular cli crée les fichiers de base puis installe ensuite les packages nécéssaires

#### INFO sur ce qui est installer

dossier générer 		: node_modules, il contient toutes les dépendances du projet (dont angular)
						: src : sources du projet
							> app : code source
								> app-routing.module.ts : fichier contenant les routes
								> app.component.ts : fichier composant racine
								> app.module.ts : fichier module racine
							> assets : assets du projet (images par exemple)
							> environments : variable d'environnement du projet
								> environment.ts : fichier de configuration pour chacun des environements de destination
								> environment.prod.ts : variables globales pour l'environnement de production
							-- fichier de configurations --
							> .browserslistrc : utilisé par angular cli pour parametré des outils en fonction du navigateur
							> .gitignore : fichier a ignorer pour git
							> angular.json : contient la configuration d'angular cli
							> package.json : description des dépendances du projet
							> package-lock.json : permet de figer des dépendances du projet de maniere plus précise
							> README.md : pour écrire la description du projet
							> tsconfig.app.json : contient la configuration du compilateur typescript pour ce projet angular
							> tsconfig.json : contient la configuration principale du compilateur typescript pour ce projet angular


On commence avec le fichier composant de base "app.component.ts", on le clean pour ne garder que le titre `<h1>`.
il est en 3 parties, import, @Component et export class AppComponent :
	> import { Component } from '@angular/core' sert à importer les éléments nécéssaires au fichier
	on importe ici l'élément "Component" de la librairie angular/core (le coeur du framework angular)
	> on utilise cette importation Component sous la forme du décorateur @Component qui va nous permettre de construire un composant
	web avec angular, au minimum un composant nécéssite 2 options, 'selector' qui permet de le nommner pour l'identifier ensuite c'est une balise <'selector'> qui sera alors insérer dans le code html (meme si elle n'existe pas de base),
	'template' définit le code html associé à ce compostant web, il existe aussi templateUrl qui permet de décrirer le template dans un fichier apart, le template est décrit entre backtick '`' afin de pouvoir écrire des strings sur plusieurs lignes (Javascript ES6)
	{{title}} double '{}' permet d'afficher la valeur title du composant
	> export class AppComponent, ici on décrit les propriétés pour notre composant appelé AppComponent
	on délcare un proprieté 'title' par example et angular saura pousser sa valeur entre {{}}
	export permet d'exporter notre composant pour le rendre disponible ailleurs dans l'application (avec import)

fichier app.module.ts :
	> les modules servent a regrouper des composants en fonction de leurs fonctionnalités
	> on importe différents module dedans
	> BrowserModule fournis les éléments essentiels au bon fonctionnement du module (directives ngif et ngfor p.ex)
	> NgModule similaire a Component, sert a déclarer des modules
	> dans @NgModule on retrouve :
		> declarations: qui contient une liste de tous les composants appartenant a ce module
		> imports : qui contient une liste de tous les modules qu'on a besoin d'importer dans notre module
		> providers: qui permet d'utiliser le systeme d'injection d'angular (il en existe d'autre maniere)
		> bootstrap: propre au module racine, permet de définir le premier composant a demarer lorsqu'on lance l'application

on ajoute apres la ligne 'strict' dans le tsconfig.json '"strictPropertyInitialization": false,'
afin de ne pas devoir typé les variables venant du serveur
(celle qui ne sont pas directement initialisé a undefined), ex : title: string; au lieu de title: <string|undefined>;

#### Les Composants

app.component.ts

un composant est un systeme completement encapsulé qui controle une portion de l'écran, cette portion est appelée la vue
cette vue est définie dans le template du composant, la logique de cette vue est pilotée depuis la classe du composant
un composant Web est donc une classe + une vue, la logique du composant étant définie dans sa classe (tout ce qu'il faut pour faire fonctionner la vue) et dans le template on retrouve la vue en elle meme, celle qui est rendue a l'utilisateur

chaque composant a un cycle de vie, gérer directement par Angular, on peut agir sur ces moments de vie grâce aux interfaces suivantes :

	> ngOnChanges :
		C'est la méthode appelée em premier lors de la création du'un composant, avant même ngOnInit, et à chaque fois que Angular détecte que les valeurs d'une propriété du composant sont modifiées.
		La méthode reçoit en paramètre un objet représentant les valeurs actuelles et les valeurs précédentes disponibles pour ce composant.
	
	> ngOnInit :
		Cette méthode est appelée juste après le premier appel à ngOnChanges, elle initialise le composant après que Angular ait initialisé les propriétés du composant.
	
	> ngDoCheck :
		On peut implémenter cette interface pour étandre le comportement par défaut de la méthode ngOnChanges, afin de pouvoir détecter et agir sur des changements que Angular ne peut pas détecter par lui même.
	
	> ngAfterViewInit :
		cette méthode est appelée juste après la mise en place de la vue d'un composant (et des vues de ses composants fils s'il en a).

	> ngOnDestroy :
		Appelée en dernier, cette méthode est appelée avant qu'Angular ne détruise et ne retire du DOM le composant.
		Cela peut se produire lorsqu'un utilisateur navigue d'un composant à un autre par exemple.
		Afin d'éviter les fuites de mémoire, c'est dans cette méthode que nous effectuerons un certain nombre d'opérations afin de laisser l'application "propre" (nous détacherons les gestionnaires d'évènements par exemple).

- initialisation du composant :
il faut importer les interfaces que l'on veut utiliser (ex : import { Component, OnInit } from '@angular/core';)
puis l'implémenter dans le composant (ex : export class AppComponent implements OnInit) et enfin, 
définir la méthode associé à cette interface : ngOnInit() : void {} dans la classe

- gerer interactions utilisateur sur le composant :
capture de l'interaction se fait coté template car c'est un évenement
lorsqu'un utilisateur déclenche un évènement est déclenchée côté classe

exemple d'évènement :

	  selectPokemon(pokemonName: string) {
	  	console.log(`vous avez cliqué sur le pokémon ${pokemonName}`);
	  }

	la fonction prend en parametre une vaiable string
	grâce aux backticks `` on peut écrire des variables directement dans les chaines de caracteres comme suit : `${varName}` (JS ES6)
	on peut éviter les concaténations


#### Les Templates

- Ce sont les vues de nos composants, ils contiennent le code de l'interface utilisateur
- Grâce à la propriété templateUrl de Angular, on peut décrire le template dans un fichier séparé
on nomme idéalement ce fichier "app.component.html" soit, le même nom que le composant mais avec une extension .html au lieu de .ts
- Interpolation : permet de dire a Angular d'afficher nos propriétés coté classe du composant dans le template du composant pour ce faire
on utilise la syntaxe de {{}}

> Comment créer des liaisons entre template et classe du composant dans Angular
> il existe plusieurs façon de pousser des données de la classe du composant vers le template

Propriétés		Code										Explications

propriété		<img[src]= "someImageUrl">					On utilise les crochets pour lier directement la source
d'éléments													de l'image à la propriété du composant


propriété		<label [attr.for]="someLabelId">			On lie l'attribut for de l'élément label avec la
d'attribut		</label>									propriété de notre composant SomeLabelId


propriété		<div [class.special]="isSpecial">			Fonctionnement similaire, pour attribuer ou non la classe special
de la classe	Special</div>								à l'élément div


propriété		<button
de style		[Style.color]="isSpecial?'red':'green'">	On peut égalemt définir un style pour nos éléments de manière dynamique :
				Special </button>							ici on définit la couleur de notre bouton en fonction de la propriété
															isSpecial, soit rouge, soit vert. (c'est un opérateur ternaire que 
															l'on utilise comme expression).

- comment pousser des évènements depuis le template vers la classe du composant :
- intercepter les évènements utilisateur levé dans le DOM (représentation structurée de la page html où chaque balise html représente un noeud, le DOM est l'arbre qui représente notre page web)
- Objectif : lié tout évènements susceptible de survenir dans le DOM à une méthode coté classe du composant en utilisant la syntaxe de liaison d'évènenements de Angular

- Pour faire ce lien : coté template, on utilise le nom de l'évènement, entouré de paranthèse auquel on passe la méthode de la classe de notre composant qu'on veut exécuter.

> exemple :
	<p (click)="selectPokemon(pokemonList[0])">{{ pokemonList[0].name }}</p>

	ici, lorsque l'on va cliquer sur la balise <p> affichant le nom du pokemon 0 de la liste (on clique le nom afficher), un appel va être fait à la fonction selectPokemon avec comme paramètre pokemonList[0].

- 7. Intercepter tous les évènements du DOM 

	interagir directement avec l'objet event ($event) qui est remonté directement par le DOM et qui est un objet natif
	cela va permettre d'interagir avec n'importe quel type d'évènement (touche du clavier, souris, etc...) sur n'importe quel noeud du DOM

1:44:00