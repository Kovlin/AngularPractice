# TRANSCENDENCE - ANGULAR

## ANGULAR


This document focus on Angular , a typescript frontend framework 

https://angular.io/


#### USAGE

installer nodejs LTS (last stable version) qui installer aussi npm (gestionnaire de paquets javascript)

installer Angular CLI : npm install -g @angular/cli

export ng=/Users/rlinkov/Documents/AngularPrac/node_modules/@angular/cli/bin/ng.js -> Mac19 utiliser Angular CLI localement

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

- 7. Intercepter tous les évènements du DOM :

	interagir directement avec l'objet event ($event) qui est remonté directement par le DOM et qui est un objet natif
	cela va permettre d'interagir avec n'importe quel type d'évènement (touche du clavier, souris, etc...) sur n'importe quel noeud du DOM

	en remplaçant cet evenement par :
	type="number"
		(click)="selectPokemon($event)"

	on envoit un evenement de type MouseEvent a la fonction.
	coté template, cet évènement à un type EventTarget, mais pour l'utiliser coté classe du composant, il faut le caster en un élément de type HtmlInputElement comme suit par exemple : 
	> const index: number = +(event.target as HTMLInputElement).value;
	comme le .value renvoit une string, pour la caster en nombre on peut simplement utiliser l'opérateur "+" devant

- 8. Les variable référencées dans le template :

	Comme ce n'est pas super pratique de travailler directement avec $event, on utilise une fonctionnalité de Angular qui permet de travailler directement dans le template avec des variables locales, celles-ci nous garantissent un accès direct sur l'élément du DOM depuis le template, ce qui évite plus tard d'etre obligé de caster la balise du DOM sur laquelle à eu lieu l'évènement.
	grâce à "#" on peut déclarer des variables référencées dans le template.

	exemple :
	>	<input
	>		#input
	>		(keyup)="0"
	>		type="text"
	>	/>
	>	<p>{{ input.value }}</p>

	ici, à chaque fois que l'évènement keyup sera intercepté, le template se mettra à jour avec input.value dans la balise <p></p>

	définition :

	(keyup) is an Angular event binding to respond to any DOM event. It is a synchronous event that is triggered as the user is interacting with the text-based input controls. 	
	When a user presses and releases a key, the (keyup) event occurs. For using in text-based input controls it is generally used to get values after every keystroke.

- 9. Créer un flux de données bidirectionnel : 


	en écrivant : <p>{{ pokemonSelected?.name }}</p>
	le "?" permet de dire à Angular, si la variable pokemonSelected n'est pas définie (undefined comme type) n'affiche rien plutot qu'une erreur

	pour utiliser .find() sur une liste :

	La méthode find() renvoie la valeur du premier élément trouvé dans le tableau qui respecte la condition donnée par la fonction de test passée en argument. Sinon, la valeur undefined est renvoyée.

	exemple : const pokemon: Pokemon|undefined = this.pokemonList.find(pokemon => pokemon.id == +pokemonId);

	on a donc un (keyUp) dans le template qui appelle la fonction selectPokemon qui met a jour son attribut pokemonSelected qui est utilisé pour afficher le nom de se pokémon dans le template.

- 10. Détecter l'appui sur la touche Entrée :

	Angular permet de filtrer les évènements du clavier à travers une syntaxe spécifique, on peut écouter uniquement la touche entrée à travers un pseudo-évènement, keyup.enter. (keyup) => (keyup.enter)

- 11. Conditionner un affichage avec la directive NgIf :
	
	<p *ngIf="pokemonSelected">
	Vous avez sélectionné le pokémon: {{ pokemonSelected?.name }}
	</p>

	on écrit *ngIf="condition"
	ici si le pokemonSelected est undefined ngIf est false, la balise p ne sera pas affichée

	<p *ngIf="!pokemonSelected">
		Aucun pokémon ne correspond à cet identifiant.
	</p>

	par exemple si on veut afficher quelque chose lorsque selectedPokemon est undefined

- 12. Afficher une liste avec Ngfor :

	elle permet de boucler sur des tableaux afin d'en afficher tous les éléments.

	<p *ngFor="let pokemon of pokemonList">

	</p>

	let 'type' of 'array'
	let et of sont obligatoire, et le tableau doit venir de la classe du composant.
	'let' est similaire a 'var' en javascript mais ne vas permettre à la variable que d'exister dans son scope (dans les {} dans lesquelles elle à été déclarée).

	exemple : 

	function f(input: boolean) {
		let a = 100;
		if (input) {
			// Still okay to reference 'a'
			let b = a + 1;
			return b;
		}
		// Error: 'b' doesn't exist here
		return b;
	}

	const declaration est similaire a let mais une fois assignée, une variable ne peut plus être réassignée

	pokemon est le nom de la variable instanciée par ngFor lorsque le tableau est parcouru, il contiendra nos pokémon du tableau, les uns après les autres.

	ce qui donne:

	<p *ngFor="let pokemon of pokemonList">
		{{ pokemon.name }}
	</p>

	ces directives ngIf et ngFor sont disponibles dans tous les templates de l'applications car elles sont ajoutées par le module racine BrowserModule

- 13. Exercice sur les templates :

	Ajouter du CSS via la librairie Materialize :
	on ajoute : <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
	dans index.html de notre projet

	modifié le template pour modifié l'affichage suivant :

	![From](./Images/ex13From.png)

	en : 

	![To](./Images/ex13To.png)

	Ma solution : 

	```<div class="row">
		<div *ngFor="let pokemon of pokemonList">
			<div class="col s4">
				<div class="card horizontal">
					<div class="card-image">
						<img src="{{ pokemon.picture}}">
					</div>
					<div class="card-stacked">
						<div class="card-content">
							<h5>{{ pokemon.name }}</h5>
							<p>{{ pokemon.created }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

- 14. : Correction de l'exercice :

	class="container" : cette classe container permet de centraliser le contenu de la page
	
	class="row" : cette classe row permet de mettre en place le responsive de la page, si l'utilisateur modifie la taille de la page, tous les éléments présents dans la row s'ajuste, on doit donc ensuite définir une taille de colonne pour définir le nombre d'éléments à afficher par ligne (en fonction de la taille de la row et de la col), par défault la taille de row fait 12 unités arbitraire de large
	
	class="col m4 s6" : cette classe définit que nous utilisons des colonnes qui sur des écrans de taille médium 'm' font '4' -> 'm4', le s6 ici sert à préciser que si maintenant la fenêtre devient trop petite (s pour small) alors on veut une taille de colonne à 6, ce qui nous fera afficher 2 pokémons par lignes au lieu de 3 avec m4

	class="card horizontal" : cette classe permet de définir une carte horizontale (image à gauche)
	
	class="card-image" : cette classe définit une image dans une carte

	class="card-stacked" : cette classe définit le contenu de la carte utilisé avec "card horizontal"

	class="card-content" : cette classe définit le contenu de la carte

	<div class="container">
		<div class="row">
			<div *ngFor="let pokemon of pokemonList" class="col m4 s6">
				<div class="card horizontal">
					<div class="card-image">
						<img [src]="pokemon.picture"/>
					</div>
					<div class="card-stacked">
						<div class="card-content">
							<p>{{ pokemon.name }}<p>
							<p><small>{{ pokemon.created }}</small></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

#### Les Directives

- 1. Qu'est-ce qu'une directive ?

	Une directive est une classe Angular ressemblant à un composant mais ne possédant pas de template, la classe Component dans Angular hérite de la classe directive. Ainsi au lieu d'annoter la classe de la directive avec @Component on l'annotera avec @Directive.

	Une directive permet d'interagir avec les éléments HTML d'une page en leur attachant un comportement spécifique, plusieurs directives peuvent être appliquées à un même élément.

	Une directive possède un selecteur css qui indique au Framework où l'activer dans le template. Lorsque Angular trouve une directive dans un template HTML, il instancie la classe de la directive correspondante et donne à cette instance le contrôle sur la portion du DOM qui lui revient.

	3 types de directives :

		1. Les composants : app.component.ts est une directive
		2. Les directives d'attribut : elles peuvent modifié le comportement des éléments HTML des attributs, des propriétés et des composants. Elles sont représentées habituellements par des attributs au sein des balises HTML d'où leur nom.
		3. Les directives structurelles : Ces directives sont responsable de la mise en forme d'une certaine manière les éléments HTML d'une page, en ajoutant, retirant, manipulant des éléments et leurs fils. Par exemple : ngIf & ngFor.
	
	Ce chapitre ce concentre sur les directives d'attribut.

- 2. Créer une directive d'attribut :

	Ces directives permettent de changer l'apparence ou le comportement d'un élément.

	Mise en place de la directive "BorderCardDirective" qui permettra d'ajouter une couleur sur les pokémons de notre liste lorsque l'utilisateur les survolera avec son curseur. On fixera egalement une hauteur commune a tous les pokemons de notre liste afin qu'ils soient toujours alignés.

	On utilise Angular CLI pour créer cette directive :
	> ng generate directive border-card

	Angular crée un fichier border-card.directive.ts ET à modifié le fichier app.module.ts afin d'importer cette directive et de la déclarer au niveau du module.

	On veut maintenant récupérer l'élément qui nous vient du DOM dans le constructeur de notre directive afin de pouvoir directement interagir dans la directive avec l'élément (dans notre cas, la carte du pokémon)

	> constructor(private el: ElementRef) {}
	ElementRef est une référence sur l'élément du DOM sur lequel la directive est appliquée
	Ensuite on définit 2 méthode :
		1. setBorder : elle définit la bordure et sa couleur autour d'une carte
		2. setHeight : qui définit une hauteur commune a tous les éléments

	setHeight : 

	>	setHeight(height: number) {
		this.el.nativeElement.style.height = `${height}px`;
		}

		Le elemementRef est un encapsuleur par dessus l'élément natif du DOM, on fait donc appel a l'attribut nativeElement.
		On peut alors modifié le style directement avec .style.height par exemple

	setBorder :

	>   setBorder(color: string) {
			this.el.nativeElement.style.border = `solid 4px ${color}`;
  		}
		
		Une bordure solide de 4 pixels de couleur 'color'
	
	On les rajoutes ensuite dans le constructeur pour que la directive s'applique directment

- 3. Prendre en compte les actions de l'utilisateur

	Pour changer la bordure lorsque l'utilisateur survole un élément :
	Il faut pouvoir détecter lorsque le curseur entre ou sort de la carte et ensuite définir une action pour chacun de ces évènements.
	On va utiliser l'annotation `@HostListener` qui permet de lié une méthode de notre directive à un évènement donné.
	Nous créeons donc 2 nouvelles méthodes dans la directives qui seront appelées respectivement lorsque le curseur entre sur la carte et lorsqu'il sort de la carte : mouseenter & mouseleave.
	HostListener doit etre importé

	exemple :

	import { Directive, ElementRef, HostListener } from '@angular/core';

	> dans la classe : 

	@HostListener('mouseenter') onMouseEnter() {
		this.setBorder('#009688');
	}

	@HostListener('mouseleave') onMouseLeave() {
		this.setBorder('#f5f5f5');
	}

- 4. Utiliser notre directive :

	Utiliser cette directive dans le template de notre composant app.component.html

	on rajoute cette directive dans la balise correspondante a la carte d'un pokemon : 

	> <div class="card horizontal" (click)="selectPokemon(pokemon.id)" pkmnBorderCard>

- 5. Ajouter un paramètre à notre directive : 

	Pour le moment notre directive pkmnBorderCard n'est pas personalisable, elle impose une couleur unique aux bordures.
	Comment personaliser la couleur ?

	On veut préciser une propriété d'entré à notre directive grâce à la notiation `@Input`
	On doit donc l'importer depuis @angular/core
	ensuite sous le constructeur on déclare cette nouvelle propriété.


	> 	@Input('pkmnBorderCard') borderColor: string; //alias

	> 	@HostListener('mouseenter') onMouseEnter() {
			this.setBorder(this.borderColor || '#009688');
		}

	On définit cette propriété comme étant une string et on l'utilise dans la fonction onMouseEnter()
	le `||` (ou) permet de définir une couleur par défaut si aucune n'est précisée dans le template
	cette propriété s'utilise comme suit : 
	
	> <div class="card horizontal" (click)="selectPokemon(pokemon.id)" pkmnBorderCard="red">

	La couleur de la bordure sera donc rouge ou '#009688' si la propriété n'est pas précisée

	- 5.1. Les Alias :

		Il y a deux maniere de déclarer une propriété d'entré, avec ou sans Alias

		avec Alias :  	@Input('pkmnBorderCard') borderColor: string;
		sans Alias :	@Input() pkmnBorderCard: string

		sans alias nous sommes obligé d'utiliser le nom de la directive pour nommer notre propriété


- 6. Ameliorer notre directive d'attribut :

	remplacer les valeurs codé en 'dur' par des propriétés.
	initialColor : propriété initiale afficher au chargement de la page
	defaultColor : propriété couleur par défaut si aucune couleur de bordure n'est précisée dans le template
	defaultHeight : la hauteur par défaut du cadre pour nos bordures


	Résultat : 

	export class BorderCardDirective {

		private initialColor: string = '#f5f5f5';
		private defaultColor: string = '#009688';
		private defaultHeight: number = 180;

		constructor(private el: ElementRef) {
			this.setBorder(this.initialColor)
			this.setHeight(this.defaultHeight);
		}

		@Input('pkmnBorderCard') borderColor: string; //alias

		@HostListener('mouseenter') onMouseEnter() {
			this.setBorder(this.borderColor || this.defaultColor);
		}

		@HostListener('mouseleave') onMouseLeave() {
			this.setBorder('#f5f5f5');
		}

		setHeight(height: number) {
			this.el.nativeElement.style.height = `${this.defaultHeight}px`;
		}

		setBorder(color: string) {
			this.el.nativeElement.style.border = `solid 4px ${color}`;
		}
	}

#### Les Pipes

- 1. Qu'est-ce qu'un pipe ?

	Les pipes permettent d'effectuer des transformations de donnée interpolée, les dates en format brute par exemple

- 2. Utiliser un pipe :

	Afficher des dates formatées, on va modifié les dates affiché actuellement grâce au pipe 'date'
	On va modifié le template pour ajouter le pipe 'date' a pokemon.created
	> {{ pokemon.create | date }}

- 3. Les pipes disponibles par défaut :

	https://angular.io/guide/pipes

- 4. Combiner les pipes :

	> {{ pokemon.created | date | uppercase}}

	les pipes sont appliqués de la gauche vers la droite

- 5. Paramétrer un pipe :

	on peut choisir le format par exemple pour date, ce qui nous permet de mieux définir l'affichage souhaité
	> {{ pokemon.created | date:"dd/MM/yyyy" }}
	afficher la date au format : jour/mois/année

	on peut trouver ces parametres dans la documentations des pipes de angular

- 6. Créer un pipe personnalisé : 

	On va créer un pipe PokemonTypesColorPipe
	un pipe qui renverra une couleur correspondant a la couleur du type du pokemon (eau : bleu, feu : rouge par exemple)

	on le genere avec Angular CLI :

	> ng generate pipe pokemon-type-color

	le fichier contenant le pipe est crée : pokemon-type-color.ts
	et app.module.ts est mis a jour pour contenir le pipe

	on modifie la fonction transform pour qu'elle prenne en parametre ce que l'on veut comme type et qu'elle retourne aussi le type voulu
	ensuite on ajoute du code avec un switch case pour changer la couleur en fonction du type du pokemon en entrée et on retourne 
	'chip ' + color
	chip étant une classe de materialize permettant de faire une bulle d'une couleur autour d'un texte

	dans le template on ajoute : 

	<span *ngFor="let type of pokemon.types" class="{{ type | pokemonTypeColor }}">
		{{type}}
	</span>

	car un pokémon n'a pas qu'un type on utilise la directive ngFor.

	<span>
	L'élément HTML <span> est un conteneur générique en ligne (inline) pour les contenus phrasés. Il ne représente rien de particulier. Il peut être utilisé pour grouper des éléments afin de les mettre en forme (grâce aux attributs class ou id et aux règles CSS) ou parce qu'ils partagent certaines valeurs d'attribut comme lang. Il doit uniquement être utilisé lorsqu'aucun autre élément sémantique n'est approprié. <span> est très proche de l'élément <div>, mais l'élément <div> est un élément de bloc, alors que <span> est un élément en ligne.

- 7. Conclusion :

	Les pipes sont utilisé pour formatter des donées jugées trop brutes au sein de nos templates. Plutot que de définir les meme transformations a travers plusieurs de nos composants on peut développer des pipes personnalisé afin de centraliser la définition de ces transformations.


#### Les Routes

- 1. Introduction :

	Sert à mettre en place plusieurs pages sur l'application
	La navigation se fait comme sur un site Web

- 2. Le fonctionnement de la navigation avec Angular : 

	Les routes dans une application doivent être regroupées par fonctionnalité au sein de modules (les routes concernant les pokémons doivent être centralisées dans le même modules tout comme celles concernants d'autres aspects de l'application dans d'autre modules)

	Pour mettre en place un systeme de route dans l'application, il nous faut au moins 2 composants (ici le meme que celui de base, celui qui représente des pokémons '/pokemon' ainsi qu'une nouvelle page lorsqu'on clique sur un pokemon avec des infos détaillées)

	2 nouveaux composants :
		1. Liste pokémons (comme le module de base)
		2. Details des pokemon (detail-pokemon.component) qui affiche une page d'information spécifique

- 3. Générer deux nouveaux composants :

	On les crées dans le dossier src/app du projet via Angular CLI

	> ng generate component list-pokemon --inline-template=false

		on rajoute --inline-template=false car on a générer un projet avec la config --minimal et donc Angular ne génere qu'un seul fichier pour le composant, on rajoute cette option pour aussi générer le template apart et pouvoir travailler directement sans devoir le créer manuellement

		nos deux fichiers sont donc crée et le fichier app.module.ts (module racine) est mis a jour pour déclarer ce nouveau composant, les fichiers sont créer dans un dossier correspondant au nouveau composant
	
	> ng generate component detail-pokemon --inline-template=false

- 4. Créer des routes :

	Les composants sont crée mais pas encore lié au systeme de navigation, on déclare donc les nouvelles routes dans le fichier app-routing.module.ts

	pour déclarer une route on ajoute un objet à la constante routes pour lequel on déclare la propriété path et le chemin associé ainsi qu'un component et le composant associé :

	pour déclarer des chemins "dynamique", ajouté une propriété au chemin, on utilise ':' devant cette propriété

	On peut déclarer une route par défaut en utilisant path: '' et un redirectTo: '/pokemons' vers le composant par défaut

	const routes: Routes = [];

	devient :

	const routes: Routes = [
	{ path: 'pokemons', component: ListPokemonComponent},
	{ path: 'pokemons/:id', component: DetailPokemonComponent},
	{ path: '', redirectTo: 'pokemons', pathMatch: 'full'}
	];

	les routes sont lues du haut vers le bas, il faut donc déclarer les routes plus spécifiques en premier et les plus générales en dernier pour que les routes soient appelées correctement

- 5. La balise <router-outlet> :

	Pour l'instant le fonctionnement de notre application n'a pas été modifié du point de vue utilisateur
	coté template, dans notre composant racine il nous faut ajouter l'élément router-outlet qui va permettre de relié les routes définies avec notre template.

	A chaque fois que l'url de la page change, Angular va venir injecter le contenu du template du composant associé à la route à l'intérieur de la balise : <router-outlet>template injecté</router-outlet>

	On peut donc dire que app.component.html va contenir les composants fils qui seront ajouté dans router-outlet

- 6. Modifier le composant de la liste des pokémons :

	On met le code du template du composant racine dans le composant liste de pokémons
	Dans le code du composant, il suffit juste d'ajouter : pokemonList: Pokemon[] = POKEMONS;
	car le template ne dépend de rien d'autre que de pokemonList
	On peut "nettoyer" app.component.ts car il ne sert plus maintenant qu'a afficher le titre et le router-outlet de notre application

- 7. Dynamiser le composant détail d'un pokémon :

	Ce composant match sur la route /pokemons/:id, il faut donc bien construire sa route pour se retrouver au bon endroit

	Il faut donc récuperer l'id qui provient du router et ensuite chercher dans la liste de pokémon le pokémon correspondant à cet identifiant dans l'url

	Pour ce faire, on utilise un service qui est ActivatedRoute de Angular, il faut donc l'importer et le rendre disponible via le constructeur
	> import { ActivatedRoute } from '@angular/router';
	> constructor(private activatedRoute: ActivatedRoute) { }

	ce ActivatedRoute va permettre d'acceder a l'id dans l'url (dans la route courante)
	dans ngOnInit :
		> const pokemonId: string|null = this.activatedRoute.snapshot.paramMap.get('id');

		snapshot permet de récupérer les données à l'instant t des paramètres transmis sous la forme d'une ParamMap (sorte de tableau contenant les parametres de l'url). On get('id') qui correspond au :id de la route

		export class DetailPokemonComponent implements OnInit {

			pokemonList: Pokemon[];
			pokemon: Pokemon|undefined;

			constructor(private activatedRoute: ActivatedRoute) { }

			ngOnInit(): void {
				this.pokemonList = POKEMONS;
				const pokemonId: string|null = this.activatedRoute.snapshot.paramMap.get('id');
				if (pokemonId)
					this.pokemon = this.pokemonList.find(pokemon => pokemon.id == +pokemonId)
			}
		}

- 8. Brancher le template détail d'un pokémon :

	Grâce à la directive ngIf, on construit le template uniquement si un pokémon doit être affiché

- 9. Ajouter une barre de navigation :

	nous permettra de ne pas avoir le titre Liste de Pokémons partout, on remplace le <h1> (titre) par une barre de navigation <nav> :

	<nav>
		<div class="nav-wrapper teal">
			<a href="#" class="brand-logo center">
				Pokédex
			</a>
		</div>
	</nav>

- 10. Naviguer grâce au service Router :

	On veut pouvoir cliquer sur une carte et arriver sur la bonne page ainsi que pouvoir utiliser le bouton retour pour revenir a la liste

	Dans details-pokemon on ajoute le service router (en import et dans le constructeur)

	> constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

	On va faire appel à ce router et sa propriété navigate pour rediriger l'utilisateur :

	> 	goToPokemonList(): void {
			this.router.navigate(['pokemons'])
		}
	dans liste-pokemon :
	
	> 	goToPokemon(pokemon: Pokemon): void {
			this.router.navigate(['pokemons', pokemon.id])
		}
	et on l'ajoute dans le template dana un evenement click dans le bloc div de la carte

	> <div class="card horizontal" pkmnBorderCard (click)="goToPokemon(pokemon)">

- 11. Gérer les erreurs 404 :

	On crée un composant chargé de gérer ce type d'erreurs

	> ng generate component page-not-found

	dans app-routing on va déclarer une route et utiliser l'opérateur ** pour intercepter toutes les routes de l'application

	> { path: '**', component: PageNotFoundComponent}

	On le met en dernier car il intercepte toutes les routes restantes après celles déclarées plus haut (car les routes sont lues du haut vers le bas et dès qu'une route est interceptée, le composant est affiché)

	> <a routerLink="pokemons" class="waves-effect waves-teal btn-flat">
	la directive routerLink de Angular permet aussi de faire des redirections (équivalent a (clic)="goToAccueil" par exemple)


#### Les Modules

- 1. Qu'est-ce qu'un module ?

	Ils servent à mieux organiser l'application et son code.
	On va ajouter un nouveau module consacré uniquement à la gestion des pokémons dans l'application
	Ca ne se voit pas du coté utilisateur mais c'est important afin d'avoir une bonne architecture d'application et la maintenir plus simplement

- 2. Les modules Angular et Javascript :

	les applications Angular sont modulaires et possèdent leur propre système de module

                                   -----> Feature module A
	Application -----> root module -----> Feature module B
	                               -----> Feature module C

	Chaque application possède au moins un module, le module racine, nommé app.module par convention
	Il peut suffire pour de petites applications mais la plupart des projets en ont besoin de plusieurs.
	On parle alors de modules de fonctionnalités car pour chaque fonctionnalités dans le projet on ajoute un nouveau module,
	les modules de fonctionnalités sont donc un ensemble de classes et d'éléments dédiés à un domaine spécifique de l'application.

	Quel que soit la nature du module, un module est toujours une classe avec le décorateur @NgModule({})

	Dans ce module on retrouve 5 propriétés qui décrivent le module :

		1. declarations : sont les classes de vues qui appartiennent à ce module, Angular à 3 types de classes de vues, les composants, les directives et les pipes. Il faut renseigner toutes ces classes de vues dans le tableau

		2. exports : sous-ensemble de classes de vues à exporter. Sous-ensembles des déclarations qui doivent être visibles et utilisables dans les templates de composants d'autres modules

		3. imports : classes nécéssaires au fonctionnement du module. Concerne toutes les classes exportées depuis d'autres modules dont on a besoin dans ce module.

		4. providers : permet de fournir un service au module. Cette propriété concerne les services et l'injection de dépendance

		5. Bootstrap : le composant racine pour le module racine. Cette propriété ne concerne que le module racine, il faut y renseigner le composant racine (par convention app.component), le composant affiché au lancement de l'application.

	Javascript à son propre système de module qui est complètement différent et n'a rien à voir avec celui de Angular. Dans Javascript chaque fichier est un module et tous les objets définis dans ce fichier appartiennent au module. Le module javascript déclare certains objets comme publiques en les déclarants avec le mot-clé export ensuite d'autre module javascript utilisent le mot-clé import pour accéder à ces objets. C'est ce qu'on utilise pour exporter et importer aussi dans Angular. Les systemes de modules de Javascript sont différents mais complémentaires et on utilise les deux pour écrire une application Angular. Angular utilise les modules Javascript et a ses propres modules aussi (les deux appelations ne désigne pas la même chose).


- 3. Créer un module :

	Module permettant de centraliser la gestion des pokémons dans notre application.

	Création d'un nouveau module avec Angular CLI :

	> ng generate module pokemon

	crée un dossier src/app/pokemon contenant le fichier pokemon.module.ts

	On va maintenant déplacer ce qu'on a déjà créer dans le dossier pokémon et connecté ces éléments au module :
		- list-pokemon/
		- detail-pokemon/
		- pokemon-type-color.pipe.ts
		- border-card.directive.ts
		- pokemon.ts
		- mock-pokemon.ts

	par défaut, dans pokemon.module.ts, Angular à importer le CommonModule, il s'agit d'une base dont on a besoin dans n'importe quel module et qui contient par exemple les directives structurelles ngIf et ngFor.

	Il faut ajouter nos deux composants, notre directive et notre pipe dans les déclarations, on les déclares ici plutot que dans le module racin car on en a besoin que au niveau de la fonctionnalité pokemon.

	On vient ensuite déclarer les routes propres à la fonctionnalité pokemon dans le module plutot que de passer par les routes racines

	>	import { RouterModule, Routes } from '@angular/router';

	>	const pokemonRoutes: Routes = [
			{ path: 'pokemons', component: ListPokemonComponent},
			{ path: 'pokemons/:id', component: DetailPokemonComponent},
		];
	
	on ajoute dans les imports :

	>	imports: [
			CommonModule,
			RouterModule.forChild(pokemonRoutes),
		]

	méthode forChild ici alors que dans les routes racines la méthode forRoot est utilisée

	On peut enlever les déclarations concernant les pokémons dans le module racine et importer le module pokemon

	Il faut placer le module PokemonModule avant le module app-routing.module car sinon Angular intercepte les routes de app-routing.module en premier comme la 404 par exemple ce qui affichera un 404 en permanence.

- 4. Structurer l'architecture de l'application :

	La réorganisation du code à nécéssité plusieurs opérations :
		- changer le contenu de certains fichiers
		- créer de nouveaux fichiers

	c'est donc plus intéressant de penser l'architecture de l'application à l'avance

	Comment sera structuré l'application finale ?

	Module racine : AppModule
	Module de gestion des pokémons : PokemonModule

	On va rajouter une fonctionnalité de login pour l'utilisateur. un composant login.component dans le module racin de l'application.
	Elle se trouvera au niveau racine car elle n'a rien a voir avec la gestion des pokémons

#### Les Services

- 1. Introduction :

	Enrichir l'application avec des services, nos composants ListePokemon et DetailPokemon vont avoir besoins d'acceder aux pokemons et effectuer des opérations dessus. Nous allons donc centralisé ces données et ces opérations dans un service.
	Ce service sera utilisables pour tous les composants du module pokemon afin de leur fournir un accès et des méthodes prêt à l'emploi pour gérer des pokémons

- 2. Créer un service :

	Ce service s'occupera de fournir des données et des méthodes à tous les composants du module pokémon.
	L'objectif et de masqué à nos composants la façon dont nous récupérons les données et le fonctionnement de certaines méthodes ainsi que de factoriser des comportements commun entre plusieurs composants.

	> ng generate service pokemon/pokemon
	> ng generate service pokemon/pokemon --dry-run

	--dry-run permet de simuler une commande pour savoir ce qu'Angular CLI aurait créé
	ici on crée le service pokemon dans le dossier pokemon/ de l'application

	pokemon.service.ts est créé dans pokemon/

	ici on aura pas un décorateur @Service comme c'était le cas pour les composants, pipes, modules et directives mais un décorateur @Injectable

	Ce décorateur permet d'indiquer à Angular que ce service pokemon.service peut lui-même avoir d'autres dépendances, aucune dépendance supplémentaires ici mais ce décorateur est nécéssaire pour brancher notre service avec le mécanisme d'injection de dépendance d'Angular. On va donc pouvoir utiliser ce service ailleurs dans l'application et d'importer des services dans ce service (via le constructeur)

	@Injectable à une propriété [providedIn: 'root'] qui permet d'indiquer à Angular qu'on veut utiliser la même instance du service dans toute notre application. On ne va donc jamais devoir créer nous même une instance de pokemon.service (new pokemon.service()). On utilise donc le mécanisme d'injection d'Angular pour utiliser ce service.

	On va créer 3 méthodes :
		- getPokemonList()
		- getPokemonById()
		- getPokemonTypeList()

- 3. Consommer un service :

	Injecter ce service dans liste et detail, pour ce faire on l'ajoute aux parametres du constructeur
	
	> 	constructor(private router: Router,
		private pokemonService: PokemonService ) {}

	et on l'utilise dans les composants, exemple :

	> this.pokemon = this.pokemonService.getPokemonById(+pokemonId);

- 4. Fonctionnement de l'injecteur de dépendances :

	Angular possède son propre framework d'injection, on ne peut pas vraiment développer d'application sans ce outil.
	L'injection de dépendances est un model de développement ou 'design pattern' en anglais dans lequel chaque classe reçoit ses dépendances d'une source externe plutôt qu'en les créants elle-même.

	Imaginons que le framework d'injection d'Angular possède quelque chose appelé un injecteur.
	Dans ce cas on utilise l'injecteur pour gérer les dépendances de nos classes sans s'occuper des les gérer nous mêmes.
	Si on se rend dans le fichier main.ts Angular crée un injecteur à l'échelle de l'application durant le procéssus de démarrage.
	Nous n'avons donc pas à nous en occuper par contre il faut enregistrer des fournisseurs afin de rendre le service disponible là où nous en avons besoin, au niveau d'un module, d'un composant ou de toute l'application.
	cette ligne :  platformBrowserDynamic().bootstrapModule(AppModule)

- 5. Fournir un service au niveau de l'application :
	propriété de @Injectable :
		providedIn: 'root'
	
	Ce qui fournit le service à l'ensemble de l'application grâce à l'injecteur racine 'root', immédiatement le PokemonService est disponible partout.

- 6. Fournir un service au niveau d'un module :

	Idéallement PokemonService ne devrait être disponible que pour le module Pokemon.
	Dans le cas où l'on veut que notre service ne soit disponible qu'au niveau d'un module, il faut modifié l'injecteur.

	On supprime l'option providedIn: 'root'
	et on ajoute la propriété providers: [] au module qui utilisera le service :

	>   providers: [
	  		PokemonService
  		],

- 7. Fournir un service au niveau d'un composant :

	Cela à peut d'intérêt car chaque composant aura une instance différente du service

	on rajoute : providers[PokemonService] dans @Component

#### Les Formulaires

- 1. Introduction :

	Les formulaires sont omniprésents dans les applications, il y a un formulaire pour la connection utilisateur, un formulaire de contact, pour modifier des données, pour mettre à jour son profil.

	La gestion de ceux-ci est pourtant complexe, entre la gestion des données utilisateurs, la validation des données, l'affichage de messages d'erreur ou de succès il faut souvent beaucoup de travail afin de fournir un expérience complète et agréable à l'utilisateur. Heureusement Angular peut nous aider à créer des formulaires et nous faciliter le travail.

- 2. Un formulaire d'édition :

	Un bouton éditer sur le composant detail-pokemon qui permet de modifier :
		- Nom du pokémon
		- Points de vie
		- Dégâts
		- type(s)

		bouton pour valider les changements

- 3. Présentation des formulaires pilotés par le template :

	Pour créer un formulaire avec Angular, 2 modules sont mis à disposition :

		- FormsModule
		- ReactiveFormsModule

	Les deux modules répondent au même besoin, mais ont une approche différente

	FormsModule : Développe une partie importante du formulaire dans le template -> Template Driven Form
	ReactiveFormsModule : Centre le développement du formulaire côté composant

	FormsModule est plus adapté aux débutants et aux formulaires de petite taille

	ils proviennent de la librairie : @angular/forms
	deux nouvelles directives importantes : ngForm & ngModel
	ces deux directives proviennent de FormsModule et vont nous aider à développer des formulaires

- 4. La directive NgForm :

	npm Package 	: @angular/forms
	Module			: import { NgForm } from '@angular/forms';
	Source			: forms/directives/ng_form.ts

	la directive ngForm est active dans toutes les balises <form></form> dans le module où le formsModule est importé
	Pour chaque formulaire où elle est appliquée, la directive ngForm va créer une instance d'un objet FormGroup au niveau global du formulaire

	Une référence à cette directive nous permet de savoir si le formulaire que remplit l'utilisateur est valide ou non, au fur et à mesure que l'utilisateur le complète.
	On peut aussi être notifié lorsque l'utilisateur déclenchera la soumission du formulaire

- 5. La directive NgModel :

	npm Package 	: @angular/forms
	Module			: import { NgForm } from '@angular/forms';
	Source			: forms/directives/ng_model.ts

	Cette directive doit s'appliquer sur chacun des champs du formulaire et ce pour plusieurs raison :

		- Elle crée une instance d'un objet FormControl pour chaque champ du formulaire
		- Chaque instance de FormControl constitue une brique élémentaire qui encapsule l'état donné d'un champ et à pour rôle de traquer la valeur du champ, les interactions avec l'utilisateur, la validité des données saisies et de garder la vue synchroniser avec les données
		- Chaque FormControl doit être définit avec un nom, il suffit d'ajouter l'attribut name a la balise HTML associée :
				FormControl.color
					<=>
				<input name="color"></input>
		- Lorsque cette directive est utilisée au sein d'une balise <form></form>, elle s'occupe pour nous de l'enregistrer au près du formulaire comme un élément fils de ce formulaire. En combinant cette directive avec la directive ngForm on peut donc savoir en temps réel si le formulaire est valide ou non
		- On peut aussi utiliser la directive ngModelGroup pour créer des sous-groupes de champs à l'intérieur du formulaire.

		En plus la directive ngModel s'occupe de mettre en place une liaison de donées bi-directionnelle pour chacun des champs du formulaire. Cette liaison de données bi-directionnelles est très utile pour gérer les interactions utilisateur côté template et traité les données saisies côté composant

		Elle s'occupe aussi de rajouter et de retirer des classes spécifiques sur chaque champ ce qui nous permet de savoir si un utilisateur à cliquer ou non sur un champ, si la valeur du champ à changé ou si il est devenu invalide. En fonction de ces informations nous pouvons changer l'apparence d'un champ et faire apparaître un message d'erreur ou de confirmation à l'utilisateur
		
- 6. Mettre en place le module FormsModule :

	Ces directives viennent du module FormsModule, il faut donc injecter ce module pour rendre ces directives disponibles dans nos composants.

	On peut ajouter ce FormsModule dams le pokemonModule ce qui fera qu'on ne pourra l'utiliser que dans le pokemonModule mais aussi dans le module racine pour pouvoir l'utiliser dans pokemonModule mais aussi dans le module racine dans lequel on aura besoin par la suite d'une formulaire de connection (on DOIT l'importer aux DEUX endroits).

- 7. Créer un formulaire :

	Ce formulaire doit permettre d'éditer certaines informations d'un pokémon mais pas son id ni sa date de création (par définition ces données ne devraient pas être modifiées)

		- Nom du pokémon
		- Points de vie
		- Dégâts
		- type(s)

	4 champs dans notre formulaire, ce formulaire sera un composant à part entière chargé de gérer les données saisies par l'utilisateur et qui permettra d'éditer un pokémon.

- 8. Générer un formulaire avec Angular CLI :

	> ng generate component pokemon/pokemon-form --inline-template=false

	une fois le template modifié (voir les ressources : https://www.alexandria-library.co/ressources-angular/ ) on va modifier le coté classe du composant.

- 9. Implémenter la logique du formulaire :

	- ngOnInit() on veut récupérer la liste des types de pokémons
	- hasType() servant à savoir si le pokémon a le type passé en parametre
	- selectType() servant à modifié modifié le pokémon pour prendre en compte le nouveau type (coché/décoché)
	- onSubmut() lorsque l'utlisateur valide le formulaire


	@Input() pokemon: Pokemon; dans la classe :
	permet de spécifié qu'il faut passer un pokémon au pokemonForm pour pouvoir l'utiliser

	this.pokemon.types.includes(type) dans hasType() :
	cette méthode permet de renvoyer true ou false si le type (passé en paramètre) se trouve dans les types du pokémon

	selectType($event: Event, type: string) :
	grâce au parametre event on va pouvoir savoir si la case est cochée ou décochée et avec string de quelle type (case) il s'agit

- 10. Présentation du template du formulaire :

	<form *ngIf="pokemon" (ngSubmit)="onSubmit()" #pokemonForm="ngForm">

	- balise form de HTML utilisée si on a bien un identifiant de pokémon valide
	- on lève l'évenement (ngSubmit) qui est un évènement Angular construit par dessus l'évènement submit du DOM qui a un comportememnt similaire, au moment de l'appui sur le bouton d'envoir la méthode est déclenchée
	- #pokemonForm="ngForm" on déclare avec la dièse (#) une variable référencée dans le template à cette variable référencée pokemonForm on attribue le résultat de la directive ngForm, ca va nous permettre d'obtenir une objet géré par Angular contenant beaucoup plus d'information que la simple balise form HTML5 comme par exemple l'état de validité du formulaire en temps réel

	dans les 3 premiers champs du formulaire :

				<input 	type="text" class="form-control" id="name"
						required
						pattern="^[a-zA-Z0-9àéèç]{1,25}$"
						[(ngModel)]="pokemon.name" name="name"
						#name="ngModel">
	
	- required et pattern sont des règles de validation provenant directement de HTML5
	- [(ngModel)]="pokemon.name" name="name" contient à la fois des crochets donc du property-binding permettant de pousser des données depuis la classe du composant vers le template et en même temps des paranthèses qui est la syntaxe de liaison des évènements pour remonter des évènements du template du composant vers sa classe. En combinant les deux on met en place une liaison de données bi-directionelle. Quand un utilisateur modifie le nom d'un pokémon on en est informé côté composant et quand côté composant on modifie ce nom du pokémon la vue se met automatiquement à jour
	- #name="ngModel" le résultat du ngModel qui en interne pour Angular est un objet métier qui va représenter un champ du formulaire, par exemple son état de validité, on peut l'attribuer directement à une variable référencée dans le template

				<div [hidden]="name.valid || name.pristine"
					class="card-panel red accent-1">
					Le nom du pokémon est requis (1-25).
				</div>
	
	- [hidden]="name.valid || name.pristine, utilise cette variable référencée ici, si le champ est valide on cache ce champ et sinon on l'affiche ou si alors le champs est "pristine" , géré par Angular , si le champ n'a pas encore été touché (chargement du formulaire par exemple)

	pour le champ des types :

		<!-- Pokemon types -->
		  <form class="form-group">
			<label for="types">Types</label>
			<p *ngFor="let type of types">
			  <label>
				<input type="checkbox"
				  class="filled-in"
				  id="{{ type }}"
				  [value]="type"
				  [checked]="hasType(type)"
				  [disabled]="!isTypesValid(type)"
				  (change)="selectType($event, type)"/>
				<span [attr.for]="type">
				  <div class="{{ type | pokemonTypeColor }}">
					{{ type }}
				  </div>
				</span>
			  </label>
			</p>
		  </form>

	- <p *ngFor="let type of types"> on a un ngFor pour construire un champ pour chaque type que l'utilisateur peut sélectionner
	- [value]="type" la valeur qui va être le type associé à la checkbox
	- [checked]="hasType(type)" on coche la case avec notre méthode hasType()
	- [disabled]="!isTypesValid(type)" on va désactiver toutes les cases à coché si l'utilisateur n'a pas respecté nos règles de validations, les types ne sont pas valides, si 3 champs sont sélectionné tous le reste des checbox est freezé et inversement si il ne reste qu'un type au pokémon on freeze cette checbox pour ne pas qu'il puisse l'enlever (toujours entre 1 et 3 types)
	- (change)="selectType($event, type)" on écoute l'évenement change (coché/décoché la case) auquel on associe la méthode selectType()
	- ensuite on affiche le type avec la coloration voulue grace au pipe

	pour finir, le champ de validation du formulaire :

		<!-- Submit button -->
		  <div class="divider"></div>
		  <div class="section center">
			<button type="submit"
			  class="waves-effect waves-light btn"
			  [disabled]="!pokemonForm.form.valid">
			  Valider</button>
		  </div>
	
	- bouton de type submit comme en HTML5
	- les classes de materialize pour le design
	- [disabled]="!pokemonForm.form.valid" notre bouton de validation sera désactiver tant que le pokemonForm n'est pas valide, ce pokemonForm est notre variable référencée dans le template qui est le résultat de la directive ngForm

- 11. Présentation des règles de validation :

	Avant de voir comment ajouter les règles de validation, définissons quelles restrictions nous souhaitons implémenter sur chaque champ

	pour le nom du pokémon :
		- champ obligatoire
		- champ constitué d'une chaîne de caractères de 1 à 25 lettres uniquement
	
	pour les points de vies :
		- champ obligatoire
		- un nombre compris entre 0 et 999

	pour la quantité de dégâts :
		- champ obligatoire
		- un nombre compris entre 0 et 99
	
	pouf les types :
		- champ obligatoire
		- entre 1 et 3 types parmis la liste de types disponibles

	la partie champ obligatoire peut être implémentée facilement grâce à l'attribut HTML5 : required
	les parties noms et dégâts aussi grâce à l'attribut : pattern
	pattern permet de définir une expression régulière pour définir un champ

- 12. Ajouter des règles de validation standards :

	pour le champ name :

		ajouter l'attribut required
		ajouter un pattern pour le champ, qui doit matché avec une chaine de 1 a 25 caractere 
			> pattern="^[a-zA-Zàéèç]{1,25}$"

			'^' permet de préciser une valeur de départ pour notre chaîne de caractère qui devra contenir des lettres entre a minuscule et z minuscule et entre A et Z majuscule ainsi que les caractères accentué à, é, è, ç ensuite nous indiquons ce qui est appelé un quantifieur dans les expressions régulières ce qui signifie que nous voulons une succéssion de 1 à 25 lettres. l'accent circonflexe (ˆ) au début et le dollar ($) à la fin de notre expression régulière permettent de préciser que nous voulons que notre champ contienne uniquement une succéssion de 1 à 25 lettres et pas autre chose
	
	pour les points de vie et les dégats :

		ajouter l'attribut required
		ajouter un pattern pour le champ, qui doit matché avec une chaine de 1 a 25 caractere 
			> pattern="^[0-9]{1,3}$" pour les points de vies pattern="^[0-9]{1,2}$" pour les dégâts

	pour les types du pokémons :

		il nous faut un validateur personnalisé qui nous permettra de limité le nombre de types entre 1 et 3 d'après les règles que nous avons définis

		il faut donc créer une méthode de validation côté composant

- 13. Créer une règle de validation personnalisée :

	- isTypesValid(type) : Si il ne reste qu'un type au pokémon, on veut que la case de cet unique type ne puisse pas être décochée mais on veut laisser la possibilité de coché d'autres types. Si le pokémon à déjà 3 types, on veut bloqué toutes les cases non cochées afin de ne laisser la possibilité que de décocher ces 3 cases

	- On veut maintenant prévenir l'utilisateur quand une de ces donées est invalide

- 14. Prévenir l'utilisateur en cas d'erreur :

	Pour l'instant en cas d'erreur, le bouton submit reste verrouillé et inutilisable, il faut informer l'utilisateur des erreurs en cours.

	Pour ce faire on va utiliser les classes ajoutées automatiquement par la directive ngModel afin de faire 2 choses :
		- Utiliser ces classes avec le CSS en ajoutant une bordure verte ou rouge en fonction de la validité des champs
		- Utiliser ces classes avec les variables de templates et la directive ngIf pour afficher un message d'erreur sur un champ

- 15. Ajouter des indicateurs visuels pour l'utilisateur :

	Les directives ngModel et ngForm sont très puissantes, elles permettent même d'allé jusqu'à automatiquement créer des classes CSS sur lesquels on peut interagir et qui vont nous dire si tel champ est valide ou non, si l'utilisateur à déjà interagit avec le champ ou non ce qui va nous permettre de piloté dynamiquement le CSS de notre formulaire en fonction des actions de l'utilisateur

	- on va ajouter une feuille de style à notre composant du formulaire pour venir intercepté les classes qui sont pilotées par Angular et pouvoir automatiquement mettre à jour le style de notre formulaire
		> styleUrls: ['./pokemon-form.component.css']

	- interception de ces classes fournies par Angular :

		- .ng-valid[required] {
			border-left: 5px solid #42A948;
		}

		pour la classe ng-valid, on veut les éléments required et dans ce cas là (les champs valide et required), on leur attribue une bordure verte

		- .ng-invalid:not(form) {
			border-left: 5px solid #A94442;
		}

		pour les champs invalid on attribue une bordure rouge. La bordure rouge est attribué à tous les éléments invalide qui ne sont pas des éléments de type form (input, select, etc...)

		la distinction ici se fait car on veut appliquer la couleur verte uniquement sur les champs valide : name, points de vie, dégats et dans le cas ou on a une erreur on veut préciser une erreur non pas sur l'ensemble du formulaire (comme lorsqu'il est valide) mais sur les champs concernés 

- 16. Afficher des messages d'erreur aux utilisateurs :
	
	On peut combiner la propriété hidden avec la variable de template name par exemple.
	On affiche un bloc uniquement si l'utilisateur a mal renseigné les donées dans ce champ :

			<div [hidden]="name.valid || name.pristine"
				  class="card-panel red accent-1">
				  Le nom du pokémon est requis (1-25).
			</div>

- 17. Intégration du formulaire :

	On va créer un composant EditPokemonComponent qui va matcher avec l'url qu'on va créé qui sera /edit/pokemon/id au niveau du routing et on va utiliser le pokemonForm comme un composant fils pour construire notre vue

	> ng generate component pokemon/edit-pokemon

	dans son template on va avoir besoin du pokemon courant :

	template: `
		<h2>Editer {{ pokemon?.name }}</h2>
		<p *ngIf="pokemon" class="center">
			<img [src]="pokemon.picture">
		</p>
		<app-pokemon-form *ngIf="pokemon" [pokemon]="pokemon"]></app-pokemon-form>
  	`

	on peut utiliser notre balise personnalisée correspondant au pokemonForm (app-pokemon-form) pour ajouter le formulaire au template de ce composant, il faut alors aussi le passé en propriété d'entré [pokemon] un pokemon, car il est requis dans la classe du composant pokemonForm (@Input() pokemon: Pokemon;)

	Pourquoi créer un composant EditPokemon contenant notre formulaire plutôt que de rajouter le formulaire directement ?
		- 1. car nous pourrons par la suite utiliser ce formulaire créer pour gérer l'ajout de nouveaux pokémons dans l'application
		- 2. Séparation des objectif (découpage), le formulaire en soi est déjà suffisament important pour avoir son propre composant, ensuite une couche suppérieur avec un EditComponent pour éditer des pokémons mais aussi cela nous donne la liberté pour créer un composant AddPokemon (en autre couche supérieur au PokemonForm) qui réutilisera ce formulaire

	- ajouter la route et ajouter le bouton d'édition sur la page de détail du pokémon


#### La programmation réactive

- 1. Introduction :
	
	Comment communiquer avec un serveur distant ?
	Il y a plusieurs manières de faire, on peut faire des appels sur le réseau avec des promesses, avec des observable et la programmation réactive

- 2. Le fonctionnement des promesses :

	Les promesses sont natives en Javascript depuis ES6
	Les promesses sont là pour essayer de simplifier la programmation asynchrone
	La programmation asynchrone désigne un mode de fonctionnement dans lequel les opérations sont non-bloquantes
	Cela signifie que l'utilisateur peut continuer à utiliser l'application web en naviguant et en remplissant des formulaires sans que le site soit bloqué dès qu'il y a un appel au serveur.

	La gestion est asynchrone, plusieurs requêtes ont lieu simultanément, et sont non-bloquantes.
				--------->
	Application -------------->		serveur
				<-------------------
				------------>

	On peut aussi utiliser des fonctions de callback pour gerer les appels asynchrone mais les promesses sont plus pratiques

	Lorsqu'on crée une promesse avec la classe 'Promise' on lui associe implicitement une méthode then qui prend 2 arguments, une callback de succès d'abord et ensuite une callback d'erreur ainsi lorsque la promesse est réussie on appelle la callback de succès et si elle échoue on invoque la callback d'erreur


	/****************************************************************************
	*	Exemple n°1																*
	*	Cet exemple permet de récupérer un utlisateur depuis un seveur distant	*
	*	à partir de son identifiant												*
	****************************************************************************/

	let recupererUtilisateur = function(idUtilisateur) {
		return new Promise(function(resolve, reject) {
			// Appel asynchrone au serveur pour récupérer les informations d'un utilisateur.
			// A partir de la réponse du serveur, on extrait les donées de l'utilisateur.
			let utilisateur = reponse.data.utilisateur;

			if (reponse.status === 200) {
				resolve(utilisateur);
			} else {
				reject('Cet utilisateur n\existe pas !');
			}
		})
	};

	Cette fonction présente une promesse qui récupère un utilisateur depuis un serveur distant à partir de son identifiant
	La fonction recupererUtilisateur prend en paramètre un identifiant et renvoi une promesse qui contient l'objet utilisateur correspondant,
	en revanche en cas d'erreur lors de l'appel la promesse renverra un message d'erreur.
	On a créé une fonction qui renvoie une promesse avec les informations du serveur


	/****************************************************************************
	*	Exemple n°2																*
	*	Cet exemple est une fonction qui renvoit une promesse.					*
	*	contenant les informations de l'utilisateur.							*
	****************************************************************************/

	recuprerUtilisateur(idUtilisateur)
		.then(function(utilisateur) { // success
			console.log(utilisateur);
			this.user = utilisateur;
		}, function(error) { // error
			console.log(error);
		});

	Nous utilisons les méthode then dans notre projet pour pouvoir profiter de la réponse de notre promesse.
	On appelle la fonction recupererUtilisateur avec un certain identifiant, ensuite grâce à la méthode 'then'
	on peut récupérer dans une fonction anonyme la valeur de retour de la promesse, ici il s'agit d'un objet utilisateur.
	Ce code est fonctionnel mais peu lisible mais ES6 permet d'améliorer cette visibilité avec les arrow functions


	/****************************************************************************
	*	Exemple n°3																*
	*	Même exemple que le n°2,												*
	*	mais avec l'utilisation des 'Arrow functions.							*
	****************************************************************************/

	recupererUtilisateur(idUtilisateur)
		.then(utilisateur => {	// success
			console.log(utilisateur);
			this.user = utilisateur;
		}, error => console.log(error);
	);

	Les promesses peuvent couvrir beaucoup de cas de la programmation asynchrone, la gestions des évènements, etc...
	Mais elles ont aussi leur limites pour la gestion d'un grand nombre de requêtes dans un délai très court.
	Pour gérer plusieurs évènements pouvant arriver en parralèlle sans saturer notre code de prommesses, on utilisera la programmation réactive

- 3. Qu'est-ce que la programmation réactive :


	La programmation réactive est une nouvelle manière d'appréhender la programmation asynchrone.

	L'idée est de considérer les interactions qui se déroulent dans l'application comme des évènements sur lesquels on peut effectuer des opérations (regroupement, filtrage, combinaison, etc ...).

	Ainsi les évènements comme les clics de souris deviennent des flux d'évènements asynchrone auquels on peut s'abonner pour ensuite pouvoir y réagir. Il est possible de créer des flux à partir de tout et n'importe quoi, pas uniquement des clics souris.

	Exemple :
	Il est très fréquent de voir réagir à des évènements, côté navigateur en ajoutant des déclencheur selon les interactions de l'utilisateur et côté serveur en traitant des requêtes à la base de données ou à des services tiers.
	
	Dans la programmation réactives toutes ces séquences d'évènements sont appelées des flux.

	/!\ ----- Programmation réactive = Programmation avec des flux de données asynchrones ----- /!\

	De manière générale tous ces évènements sont poussés par un créateur de donées vers un consomateur

	Le rôle du développeur est de définir des 'écouteurs' d'évènements (des consomateurs) sous forme de fonctions pour réagir aux différents flux (qui sont eux les producteurs de données).

	Les écouteurs d'évènements sont nommés des 'Observeurs' et le flux lui-même est le sujet observé, on parle d''Observable'
	Lorsqu'on s'abonne à un flux pour capter ses évènements on dit que l'on s'abonne ou s'inscrit à ce flux

	Fonctions écoutants les flux : Observeur
	Les flux écouté : Observable

	https://rxmarbles.com/

	Ce site illustre tous les traitements possibles sur les flux

- 4. Qu'est-ce qu'un flux :

	Un flux est une séquence d'évènements en cours ordonnés dans le temps.

	Si on observe un utilisateur qui clique plusieurs fois sur un bouton pour une raison quelquonque, cette suite de cliques peut être modelisée comme un flux d'évènements, on peut appliquer des opérations sur ce flux d'évènements.

	On peut détecter les doubles cliques de l'utilisateur et ignorer les cliques simple, pour cela on peut décider qu'un double clique est une succéssion de cliques simples ayants moins de 250ms d'interval.

	Comment transformer un flux :

	On y applique des transformations qui permettent de transformer un flux initial en un nouveau flux selon les critères donnés

	- : interval
	O : clique

	flux : 	-O----------O--O-------O-----O-O--O------>

	buffer(clickStream.throttle(250ms)) : regrouper les cliques séparés par moins de 250ms en un seul élément :

			            O                O
	flux : 	-O----------O----------O-----O------------>
						                 O

	On dispose maintenant un flux de cliques regroupés

	map('get length of list') : va transformer le flux de cliques regroupés en flux d'entier ou chaque élément correspond à la taille du groupe

	flux : 	-1----------2----------1-----3------------>

	filter(x >= 2) : va permettre de filtrer les groupes correspondant à deux cliques ou plus (sont considéré comme double cliques, tous les groupes de plus de 2 cliques)

	flux : 	------------2----------------3------------>

	en 3 opérations on a obtenu le flux souhaité, on peut donc s'y abonner et y réagir comme ou le souhaite

- 5. Traitement des flux :

	On peut faire plus que simplement s'abonner à un flux.
	Les flux peuvent fournir 3 types de réponses et on peut définir une fonction différente à exécuter pour chacun d'eux.

	premièrement une fonction peut traiter les différentes valeurs de la réponse, un nombre, un tableau, des objets, etc...
	deuxièmenent une fonction pour traiter le cas d'erreur
	troisièmement une fonction pour traiter le signal de fin (lorsque le flux est terminé et qu'il n'émettra plus d'évènements)

	Les évènements du flux représentent soit les valeurs de la réponse en cas de succès soit des erreurs soit des terminaisons.

- 6. La librairie RxJs :

	Pour faciliter l'implémentation de la programmation réactive on utilise souvent des librairies spécifiques.
	La plus populaire est RxJs : https://rxjs.dev/

- 7. Les observables :

	Dans RxJs un flux d'évènements est représenté par un objet appelé un 'Observable'.
	Ils sont très similaire aux tableaux, comme eux ils contiennent une collection de valeurs.
	Un Observable ajoute juste la notion de valeur reportée dans le temps.
	Dans un tableau toutes les valeurs sont disponibles immédiatement, dans un Observable les valeurs viendront au fur et à mesure plus tard dans le temps.
	On peut traiter un Observable avec des opérateurs similaires à ceux des tableaux.

	exemple :

	- fonction take(n) : récupère les n premiers éléments d'un flux et se débarasse des autres

	- fonction map(x => 10 * x) : applique la fonction passée en paramètre sur chaque élément et retourne le résultat

	- fonction filter(x => x > 10) : permet de filtrer les évènements en ne gardant que ceux répondant positivement au prédiquat passé en paramètre

	- fonction merge() : permet de fusionner deux flux

	- fonction subscribe() : elle applique une fonction passée en paramètre à chaque évènement reçu dans le flux, elle accepte aussi une deuxième fonction pour réaliser la gestion d'erreur et enfin une troisième pour gérer la terminaison du flux.

	Exemple :
	(on remplace les évènements par des nombres pour la compréhension)

	Observable.fromArray([1, 2, 3, 4, 5])
		.filter(x => x > 2) // 3, 4, 5
		.map(x => x * 2) // 6, 8, 10
		.subscribe(x => console.log(x)); // affiche le résultat

	On crée un observable à partir d'un tableau
	On y applique un filtre
	On y applique la méthode map pour appliquer une fonction sur chaque élément
	On utilise subscribe en lui passant une fonction en cas de succès pour afficher les éléments

	Un Observable est une simple collection asynchrone dans dont les évènements arrivent au cours du temps

- 8. Choisir entre Observable et Promesse :

	Les observables et promesses sont différents même si ils se ressemble car ils gèrent tous deux des valeurs asynchrone.
	Mais un Observable n'est pas à usage unique et continuera à émettre des évènements jusqu'à émettre un évènement de terminaison ou que l'on s'y désabonne.
	Globalement les promesses sont plus simples et souvent suffisantes si l'on doit faire peu d'appels.
	Un Observable peut être transformé en promesse très simplement grâce à la méthode toPromise de RxJs

- 9. Conclusion :

	La programmation réactive permet d'élever le niveau d'abstraction du code et de moins se soucier de certains détails d'implémentation.


#### Les requêtes HTTP :

- 1. Introduction :

	Comment communiquer avec un serveur distant afin de récupérer les pokémons, les éditer, les supprimer et sauvegarder ces changements sur le serveur. Ajouter un champ de recherche avec auto-complétion afin de retrouver plus facilement les pokémons.

	API = Interface de Programmation (Application Programming Interface)

	Ce qui permet de communiquer avec un service distant depuis une application. Par exemple pour stocker les données sur un serveur distant de manière durable.

- 2. Mettre en place le client HttpClientModule : 

	On va fournir le HttpClientModule au niveau du module racine pour y avoir accès partout, il ne fournit pas d'élément au niveau de la vue. On peut donc l'importer une fois a la racine et il sera disponible et injectable dans tous nos composants. On l'importe avant nos modules persos.

	- import { HttpClientModule } from '@angular/common/http';
	
- 3. Simuler une API Web :

	Pour le moment nos données sont stockées et récupérées de manière locale depuis le service pokemon-service dans une constante.
	On veut pouvoir communiquer avec un serveur distant.
	On va simuler une API avec Angular et une module npm (l'usage sera le même que si c'était une réelle API REST)

	Installation du package :
		- npm install angular-in-memory-web-api --save-dev

	On crée un service qui va simuler une base de donnée :
		- ng generate service in-memory-data

	dans ce service on ajoute l'interface InMemoryDbService qui va demander d'implémenter une méthode pour simuler une base de donnée
		- import { InMemoryDbService } from 'angular-in-memory-web-api';
		on rajoute la méthode createDb()

	>	import { Injectable } from '@angular/core';
		import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
		import { POKEMONS } from './pokemon/mock-pokemon-list';

		@Injectable({
		providedIn: 'root'
		})
		export class InMemoryDataService  implements InMemoryDbService {

				createDb() {
					pokemons = POKEMONS;
					return { pokemons };
				}
		}

	Ce simple service simule une API REST avec des opérations CREATE, UPDATE, DELETE, READ, etc...
	Pour les données de 12 pokémons.

	On va déclarer cette API simulée au près du reste de l'application. Dans le module racine on importe le module de la librairie servant a simuler notre API Web : 

		- import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
		- import { InMemoryDataService } from './in-memory-data.service';
		- dans imports : HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),

		dataEncapsulation: false permet de ne pas encapsuler la requete dans data et ne pas faire response.data.cequonveut

- 4. Requêter un serveur distant :

	On va maintenant modifié le pokemon-service pour réaliser les requêtes
	Au lieu de retourner directement une constante (opération synchrone) on aura un délai car on réalise une requête sur un serveur (opération asynchrone)

	- 1. injecter le client HTTP dans le pokemon-service
		> import { HttpClient } from '@angular/common/http';
		> constructor(private http: HttpClient) {}

	- 2. pour getPokemonList() : Observable<Pokemon[]> {}
		> On ne reçoit plus directement une liste de pokemon (pokemon[]) mais une donnée qui va arriver dans le temps qui elle contient un tableau de pokemon, on type donc ça en Observable (Observable<Pokemon[]>) (synchrone/asynchrone)
		> import { Observable, catchError, of, tap } from 'rxjs';
		> on ne retourne plus une constante mais un flux contenant les pokémons
		> le httpClient d'angular renvoit par défaut des flux qu'on peut typer
		> ensuite on lui passe une URL vers l'API (lien vers l'API du module in-memory)

		> 	getPokemonList(): Observable<Pokemon[]> {
				return this.http.get<Pokemon[]>('api/pokemons').pipe(
					tap((response) => console.table(response)),
					catchError((error) => {
						console.log(error);
						return of([]);
					})
				)
			}
		
		> On fait une requête http GET avec le client d'Angular, et on va recevoir un Observable, on spécifie que la réponse contient une liste de pokémon (<Pokemon[]>)
		> En paramètre de la méthode GET on passe une URL ('api/pokemons')
		> tap est l'équivalent d'un console.log adapté à un Observable
		> catchError permet d'intercepter une erreur sur un Observable

- 5. Récupérer un pokémon à partir de son identifiant :

	- 1. Pour getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {}
		> on ne veut plus retourner pokemon ou undefined mais un Observable
		> on ne cherche plus un pokémon dans une constante mais via une requête http
		> 	getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {
				return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
					tap((response) => console.table(response)),
					catchError((error) => {
						console.log(error);
						return of(undefined);
					})
				)
			}

- 6. Gestion des erreurs : 

	On peut retirer la constante pokemon du service

	On va refactoriser le code
	On va créer deux méthodes privées pour ce service.
		- Une méthode de log :
		> 	private log(response: Pokemon[]|Pokemon|undefined) {
				console.table(response);
			}
		> tap((response) => console.table(response)), devient :
		> tap((response) => this.log(response)),

		- Une méthode de gestion d'erreur :
		> 	private handleError(error: Error, errorValue: any) {
				console.error(error);
				return of(errorValue);
			}
		> le 'of' permet de transformer une donnée simple en un flux de données (un Observable)

		> 	catchError((error) => {
				console.log(error);
				return of(undefined);
			})
			 devient :
		> catchError((error) => this.handleError(error, undefined))

	Le code est maintenant plus simple à lire

- 7. Consommer des données asynchrones :

	- On va devoir modifier : detail-pokemon, list-pokemon et edit-pokemon

	- Pour list-pokemon :

		> 	ngOnInit() {
				this.pokemonService.getPokemonList()
					.subscribe(pokemonList => this.pokemonList = pokemonList);
			}
		- On s'abonne au flux retourner par getPokemonList() et on assigne la pokemonList retournée par le flux à celle du composant
		- On fait de même pour les 2 autres composants


- 8. L'asynchrone et Angular :

	On veut maintenant pouvoir modifier et rendre persistante les modifications d'un pokémon

- 9. Créer une méthode de modification :

	On veut que nos modifications soient persistantes, on va créer une méthode updatePokemon() dans le service

	> updatePokemon(pokemon: Pokemon): Observable<Pokemon> { }

	On prend en paramètre un pokémon et on va sauvegarder ses modifications sur le serveur, idéalement on veut obtenir en retour ce même pokémon.
	Par rapport aux requêtes GET on ne va pas avoir simplement un paramètre ajouté à l'URL comme ${pokemonId} mais qui va devoir partir dans le corps de la requête HTTP, on va devoir préciser qu'on envoie des données dans la requête.
	
	> 	updatePokemon(pokemon: Pokemon): Observable<Pokemon|undefined> {
			const httpOptions = {
				headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
			};

			return this.http.put('api/pokemons', pokemon, httpOptions).pipe(
				tap((response) => this.log(response)),
				catchError((error) => this.handleError(error, undefined))
			)
		}
	on envoie le pokemon, ainsi que des options de header dans la requête

- 10. Persister les modifications de l'utilisateur :

	On se rend donc dans le pokemon-form.
	On va modifier la méthode onSubmit()

	>	onSubmit() {
			this.pokemonService.updatePokemon(this.pokemon)
				.subscribe(() => this.router.navigate(['/pokemons', this.pokemon.id]))
  		}

- 11. Supprimer un pokémon :

	Ajouter un boutton supprimer depuis la page de détails

	deletePokemonById() dans le pokemon service :
	> 	deletePokemon(pokemonId: number): Observable<null> {
			return this.http.delete('/pokemons/${pokemonId}').pipe(
				.tap((response) => this.log(response)),
				.catchError((error) => this.handleError(error, null))
			);
		}

	dans details-pokemon-componenent :
	> 	deletePokemon(pokemon: Pokemon) {
			this.pokemonService.deletePokemon(pokemon.id)
				.subscribe(() => this.goToPokemonList());
		}

	dans le detail html :
	> <a (click)="deletePokemon(pokemon)">Supprimer</a>

- 12. Ajouter un pokémon :

	- Méthode dans le pokémon service pour persister un pokémon dans la base de donnée
	- Créer un composant addPokemon qui va réutiliser le formulaire d'édition du pokémon mais pour ajouter un nouveau pokémon
	- Un bouton pour rediriger vers la page d'ajout du pokémon

- 13. Ajouter une méthode POST :
 	
	-	addPokemon(pokemon: Pokemon): Observable<null> {
			const httpOptions = {
				headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
			};

			return this.http.post('api/pokemons', pokemon, httpOptions).pipe(
				tap((response) => this.log(response)),
				catchError((error) => this.handleError(error, null))
			)
		}

	très similaire à l'update sauf qu'on utilise la méthode POST plutôt que PUT.

- 14. Créer un composant AddPokemon :

	> ng generate component pokemon/add-pokemon

	> On rajoute le formulaire au template de ce composant : 

			<h2 class="center">Ajouter un Pokémon</h2>
			<app-pokemon-form [pokemon]="pokemon"></app-pokemon-form>

	> On modifie la classe de pokémon pour qu'elle aie une valeur par défaut (car il faut injecter une valeur de départ dans le formulaire)
	
					export class Pokemon {

						id: number;
						hp: number;
						cp: number;
						name: string;
						picture: string;
						types: string[];
						created: Date;

						constructor(
							name: string = 'Entrer un nom...',
							hp: number = 100,
							cp: number = 10,
							picture: string = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/xxx.png',
							types: string[] = ['Normal'],
							created: Date = new Date()
						){
							this.hp = hp;
							this.cp = cp;
							this.name = name;
							this.picture = picture;
							this.types = types;
							this.created = created;
						}		
					}

	> Pour le moment, sur le formulaire, lors du onSubmit(), on modifie le pokémon, on doit modifier ça pour appeler la bonne fonction lorsqu'on veut ajouter un pokémon et non pas le modifier.

- 15. Adapter notre formulaire d'édition :

	> Comment savoir au niveau de ce composant si on est dans le cas d'un ajout ou d'une édition :
		récupérer l'url du navigateur lors de l'instanciation du pokémon et si on a edit ou add on peut distinguer les cas.

	> On crée donc la route /pokemon/add
	> On ajoute la route dans le module de pokémon
		{ path: 'pokemon/add', component: AddPokemonComponent },
	
	> on rajoute a la classe du pokemonForm :
		isAddForm: boolean;

		dans le init on regarde si la route est add ou edit :
			this.isAddForm = this.router.url.includes('add'); 

		dans le onSubmit() on fait un if sur ce booléen :


			  onSubmit() {
				// lorsque l'utilisateur valide le formulaire
				if (this.isAddForm) {
					this.pokemonService.addPokemon(this.pokemon)
						.subscribe(() => this.router.navigate(['/pokemons', this.pokemon.id]));
				}
				else {
					this.pokemonService.updatePokemon(this.pokemon)
					.subscribe(() => this.router.navigate(['/pokemons', this.pokemon.id]));
				}
			}

		> Problème : notre pokémon par défaut n'a pas d'identifiant
		D'où doit venir cet identifiant : il doit venir du serveur (backend) (de l'API pokemon), il attribue un identifiant unique au pokemon lorsqu'il est ajouter, seul le backend peut garantir l'unicité de cet identifiant
		> on modifie donc le addPokemon pour retourner non plus null mais le Pokemon créé, on cast donc l'Observable<Pokemon> mais aussi le retour de la méthode post, .post<Pokemon>
		> on utilisera donc plus .subscribe(() => this.router.navigate(['/pokemons', this.pokemon.id]))
		mais : .subscribe((pokemon) => this.router.navigate(['/pokemons', pokemon.id]))

	> Pour l'édition d'un pokémon, on ne peut pas modifier son image, mais pour l'ajouter on aimerait pouvoir rajouter cette image :

	> Il faut donc dans le template du pokemon-form, on va rajouter un champ Picture, qui servira a l'ajout d'image qu'on veut afficher uniquement dans le cas d'un ajout. (grace a isAddForm)

									<!-- Pokemon Picture -->
									<div *ngIf="isAddForm" class="form-group">
										<label for="picture">Image</label>
										<input type="url" class="form-control" id="picture"
												required
											[(ngModel)]="pokemon.picture" name="picture"
											#picture="ngModel">
								
										<div [hidden]="picture.valid || picture.pristine"
											class="card-panel red accent-1">
											L'image du pokémon est requise (1-25).
										</div>
									</div>

	> Permettre aux utilisateurs à ce formulaire d'ajout

- 16. Ajouter un lien vers le formulaire d'édition :

	- un bouton en bas en droite pour rediriger l'utilisateur vers ce formulaire
	- dans le template de liste-pokemon on va ajouter le lien vers le formulaire

	> 	<a 	class="btn-floating btn-large waves-effect waves-light red z-depth-3"
		style="position: fixed; bottom: 25px; right: 25px"
		routerLink="/pokemon/add"	
		> + </a>


#### RxJs :

- 1. Présentation du champ de recherche :

	- Fonctionnalité permettant de rechercher des pokémons en fonction de leur nom.
	- Ce champ de rechere implémentera l'autocomplétion

	- Pour le moment, les requêtes HTTP sont assez simples (requêtes One Shot), on éffectue la requête et on récupère le résutltat
	- Dans certains cas, on peut lancer une requête puis l'annulé, en refaire une nouvelle différente et tout ça avant la réponse du serveur à la première. Cela est plus complexe à implémenter

- 2. Rechercher des pokémons dynamiquement :

	- Trouver des pokémons en fonction d'un terme de recherche entré par l'utilisateur.

	- Dans le pokemonService on met en place une méthode pour chercher une liste de pokémon en fonction d'un terme donné
		>	searchPokemonList(term: string): Observable<Pokemon[]> {
				return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
					tap((response) => this.log(response)),
					catchError((error) => this.handleError(error, []))
					);
			}

- 3. Construire un composant de recherche :

	- On veut créé un composant qui incorpore ce champ de recherche
	> ng generate component pokemon/search-pokemon --inline-template=false

	on veut y rajouter les méthodes :

		- search(term: string) : qui remontera la recherche de l'utilisateur
		- goToDetail(pokemon: Pokemon): qui renverra l'utilisateur vers le pokémon sur lequel il clique dans les suggestions de la barre de recherche
	

	On veut y rajouter les propriétés :
		- searchTerms = new Subject<string>();
		- pokemons$: Observable<Pokemon[]>;

		La classe Subject appartient à la librairie RxJs, c'est une classe permettant de stocké les recherches succéssives de l'utilisateur qu'il réalise dans le champ de recherche dans un tableau de chaînes de caractères (on va obtenir un flux dans le temps des recherches de l'utilisateur)
		exemple : {...."a"...."ab"...."abz"...."ab"....."abc".....}

		Subject se comporte comme un Observable à la différence près qu'un Observable ne peut que être consommé (on ne peut qu'y subscribe pour reçevoir les données dans le temps). Ici on veut pouvoir piloter un Observable, on va donc utiliser Subject. Cela va nous permettre de construire un flux de données grâce auquels on pourra afficher "en miroir" les pokemonList() correspondant aux recherches en cours
		exemple : {....pokemonList(a)....pokemonList(ab)....pokemonList(abz)....pokemonList(ab).....pokemonList(abc).....}

		Pour pousser les termes de recherches dans notre flux de données (Subject) on utilisera la méthode next
		> this.searchTerms.next(term);

		pokemon$ : servira pour construire un flux avec la liste des résultats au fur et à mesure que l'utilisateur tape dans la barre de recherche. le $ à la fin du nom de la variable est là par convention de nommage des Observable (cela indique que c'est un Observale)

	Le champ de recherche en HTML/CSS :

				<div class="row">
					<div class="col s12 m6 offset-3">
						<div class="card">
							<div class="card-content">
								<div class="input-field">
									<input 
										#searchBox 
										(keyup)="search(searchBox.value)" 
										placeholder="Rechercher un Pokémon"
									/>
									<div class="collection">
										<a 	*ngFor="let pokemon of pokemons$ | async"
											(click)="goToDetail(pokemon)"
											class="collection-item"
										>
											{{ pokemon.name }}
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>


	> pipe async ( pokemon$ | async ) : ne peut s'appliquer que sur des flux de donnés (Observable) et permet d'éviter de faire subscribe
		Suffit au lieu d'avoir dans le ngOnInit() : this.pokemon$.subscribe(pokemons => this.pokemons = pokemons);
		Angular fait donc cet opération mais directement dans le template

	> On veut afficher notre recherche au dessus la liste de pokémon, on l'ajoute donc dans le template juste avant la liste des pokémons

- 4. Construire un Observable personnalisé :

	- On veut brancher la partie visuelle du champ de recherche avec la méthode searchPokemon() pour remonter de vrais résultat à l'utilisateur.

	- Transformer searchTerms (liste de demande de l'utilisateur) en un pokémon$ (un flux de résultat concret de recherche de l'utilisateur).

	- On construit cela dans le ngOnInit()
		> On veut attendre un certains temps avec de lancer la requête entre les frappes utilisateurs (de manière a rechercher quand l'utilisateur "s'arrête" et attend une réponse)

		- debounceTime() : permet de supprimer tous les termes de recherches trop succins
		- distinctUntilChange() : attend que le nouvelle élément soit différent du précédent pour continuer, ("permet de supprimer les doublons"), si l'utilisateur revient en arrière par exemple
		- map() : va transformer chacun des éléments du flux en un observable
		- switchMap() : va transformer chacun des éléments du flux en un observable mais n'émettre que les data contenues dans ce flux et seulement le dernier flux entré est émis

		>		this.pokemons$ = this.searchTerms.pipe(
					//{...."a"...."ab"...."abz"...."ab"....."abc".....}
					debounceTime(300),
					//{...."ab"...."ab"....."abc".....}
					distinctUntilChanged(),
					//{...."ab"........."abc".....}
					switchMap((term) => this.pokemonService.searchPokemonList(term))
					//{....pokemonList(ab).........pokemonList(abc).....}
				);

		
- 5. Optimiser un flux de requêtes :

	- On veut maintenant que l'utilisateur ne puisse plus rechercher zéro ou une seule lettre, pour afficher des résultats plus pertinent et ne pas trop soliciter le serveur.

	- On va donc modifé searchPokemonList() avec une condition afin de limiter le terme de recherche
		on rajoute un if sur la longueur du terme et on return un flux vide (if term.length < 2 { return of([]);})
		
- 6. Ajouter une icône de chargement :

	- Lorsque l'on navigue dans l'application on affiche pas directement au chargement les data car l'API simulée met systematiquement 500ms avant d'envoyer une réponse car les données sont récupérées depuis un service tiers.
	- On peut afficher une icône de chargement à l'utilisateur plutôt qu'une page correspondante au cas d'erreur ou les donées n'aurait pas été reçue.

	On va créé un nouveau composant qui ne sera qu'un template et qui sera utilisé pour afficher une icone durant ce temps d'attente
	
	> ng generate component pokemon/loader

	> on modifie le template

	> maintenant on aura plus qu'a remplacer nos messages d'erreur par ce template app-loader dans detail et form pokemon


#### Authentification et Sécurité

- 1. Introduction :

	Actuellement chaque utilisateur peut ajouter/modifier/supprimer des pokémons. Il serait plus sûr de ne laisser que les utilisateur authentifié accéder à l'application en les redirigeant après connexion vers la liste des pokémons ou en ne leur laissant que le formulaire de connexion s'il ne sont pas loggé.

- 2. Qu'est-ce qu'un Guards :

	- Mécanisme de protections mis en place par Angular pour entre autre gérer l'authentification
	- Les guards peuvent être utilisé pour gérer toute sorte de scénario lié à la navigation :
		> rediriger un utilisateur qui tente d'accèder à une route
		> obliger un utilisateur à s'authentifier pour accèder à certaines fonctionnalités
		> etc...
	- Leur mécanisme est simple, ils retournent un booléen qui permet de contrôler le comportement de la navigation
	- Un guard peut retourner un booléen de manière synchrone ou asynchrone mais dans la plupart des cas un guard ne peut pas renvoyer un résultat de manière synchrone car il doit attendre une réponse. En effet il peut être nécessaire de poser une question à l'utilisateur, de sauvegarder des changements ou de récupérer des données plus récentes depuis le serveur, toutes ces actions sont asynchrones. 
	- Dans la plupart des cas le type de retour d'un guard est un Observable qui contient un booléen ou une promesse et le router attendra la réponse pour agir sur la navigation
	- Même si un guard est conçu pour agir sur la navigation, il en existe des types différents :
		> CanActivate peut influencer sur la navigation d'une route et par exemple la bloquer (celui qu'on va utiliser)
		> CanActivateChild peut influencer sur la navigation d'une route fille
		> CanDeactivate peut empêcher l'utilisateur de naviguer en dehors de la route courante
		> Resolve peut effectuer une récupération de données avant de naviguer
		> CanLoad peut gérer la navigation vers un sous-module chargé de manière asynchrone

	- On peut avoir plusieurs guard à différents niveau de navigation mais si l'un deux retourne false, tous les guards seront annulés et la navigation entière sera bloquée

- 3. Mettre en place un Guard :

	Il est très courant pour les applications web de devoir restreindre l'accès à certaines fonctionnalités en fonction de si l'utilisateur est connecté ou non.

	> ng generate guard auth
	on choisit alors sont type (CanActivate ici)

	> On implémente le guard sur une route et Angular regarde si canActivate retourne true ou false
	> { path: 'edit/pokemon/:id', component: EditPokemonComponent, canActivate: [AuthGuard] },
	Lorsque l'on veut accèder à cette route, on appelle la méthode canActivate du guard AuthGuard et si elle renvoie true on y accède

- 4. Créer un service d'authentification :

	- On va améliorer notre guard pour rediriger les utilisateurs anonymes vers un formulaire d'authentification lorsqu'ils essayent d'accèder à l'application.

	- On va donc d'abord sécuriser toutes les routes du pokémonModule
	- Une fois les routes dépendantes du guard, il nous faut un nouveau service qui servira à assurer la connextion d'un utilisateur en fonction d'un mot de passe et d'un email car le rôle de guard est de piloté le routing pas de gérer l'authentification

	> ng generate service auth

	 	- on veut une méthode login() et une méthode logout() : 

		 			isLoggedIn: boolean = false;
					redirectUrl: string;

					login(name:string, password:string): Observable<boolean> {
						const isLoggedIn = (name == 'pikachu' && password == 'pikachu');

						return of<boolean>(isLoggedIn).pipe(
							delay(1000),
							tap((response) => this.isLoggedIn = response)
							);
					}

					logout() {
						this.isLoggedIn = false;
					}

		- Adapter le guard :

					constructor(
						private authService: AuthService,
						private router: Router
					) {}

					canActivate(): boolean {
							if (this.authService.isLoggedIn) {
								return true;
							}
							this.router.navigate(['/login']);
						return false;

- 5. Ajouter une page de connexion sécurisée :

	- sur une page /login on aura un formulaire de connexion

	> ng generate component login --inline-template=false
	
	> voir méthode login.components.ts
	> on déclare ce composant dans les routes
		{ path: '', redirectTo: 'login', pathMatch: 'full'}, par défaut



#### Déployer votre application :

- 1. Introduction :

	Déployer l'application en production.

	Les différents environnements :
		- développement : Lors du du développement
		- test			: Lors des tests de l'application
		- production	: Lorsque l'application est prête pour être utilisée par des utilisateurs

	On utilisera Firebase hosting, qui appartient à Google et qui permet d'héberger des sites avec peu de traffic gratuitement.

- 2. Le processus de déployement :

	- Préparer le projet en local avant le déployement
	- Créer notre projet sur Firebase
	- Déployer sur Firebase

- 3. Activer le mode production :

	On ne peut pas juste se contenter de copier tous les fichiers locaux sur la plateforme d'hébergement.
	
	Il faut d'abord permettre à Angular de supprimer toutes les dépendances inutiles en production, le typescript par exemple car le navigateur ne comprend que le javascript il faut donc que nos fichiers typescript soient transpillé en javascript.

	Il faut aussi compresser les fichiers pour qu'ils ne mettent pas trop de temps à charger dans le navigateur que la navigation soit plus rapide.

	On va demander à Angular de compresser et compiler notre projet pour qu'il soit prêt pour la production.

- 4. Créer un livrable pour la production :

	En développement on utilise ng serve pour l'application et une fois terminé, on utilisera ng build pour construire l'environnement de production.

	> ng build

	Ces fichiers se trouvent dans le dossier dist/ng-pokemon-app
	C'est uniquement ce dossier qui contient les fichiers optimiser par Angular CLI qu'on va devoir déployer sur notre serveur de production.

- 5. Comment déployer sur Firebase Hosting ?

	- Lors du premier déployement :
		- Créer un projet
		- Installer Firebase CLI en local
		- Configurer le projet sur Firebase
		- Déployer l'application

- 6. Créer le projet dans Firebase :

	- On clique sur créer/ajouter un projet et on le nomme et on le crée
	- Une fois sur le projet, dans l'onglet 'Créer' on retrouve une option 'Hosting' qui nous permet d'héberger notre application Angular
	- On retrouvera sur cette page un historique des déployements

- 7. Installer Firebase CLI :

	CLI : Command Line Interface (Interface en ligne de commande)
	Cela permet d'executer certaines commandes directement depuis un terminal
	> npm install -g firebase-tools

	-g pour installer firebase de manière globale
	on peut réutiliser cette commande plus tard pour mettre à jour Firebase CLI

	> firebase --version
	pour vérifier l'installation
	> firebase login
	Lier le compte google à l'utilitaire Firebase CLI

- 8. Configurer le projet pour le déployement :

	- On veut faire correspondre le projet en local construit grâce à ng build au projet présent sur Firebase hosting

	> firebase init

	- Répondre au questionnaire de firebase en console :
		touche espace pour préciser le choix et entrer pour valider
		> On veut utiliser firebase hosting
			Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
		> Use an existing project
		> Quels fichiers veut-on pousser sur le serveur :
			What do you want to use as your public directory?
			dist/ng-pokemon-app
		> Configure as a single-page app (rewrite all urls to /index.html)?
			Comme on fait une SPA on dit oui
		> non aux règles automatique de build github
		> non à la réécriture du fichier index.html
		> Firebase à créer 2 fichiers dans notre projet : .firebaserc et firebase.json

	Dans firebase.json :

	{
		"hosting": {
			"public": "dist/ng-pokemon-app",
			"ignore": [
			"firebase.json",
			"**/.*",
			"**/node_modules/**"
			],
			"rewrites": [
			{
				"source": "**",
				"destination": "/index.html"
			}
			]
		}
	}

	"public" étant le chemin vers nos fichiers indiqué à firebase
	"ignore" certains fichiers sont automatiquement ignoré en production
	"rewrites" les réécritures serveurs, si on déploie notre SPA sur un autre serveur que firebase il faut mettre en place ces règles de redirection. Tout est rediriger vers notre SPA


- 9. Déployer votre application sur Firebase :

	> firebase deploy

	firebase nous renvoit l'url de notre projet en ligne après l'avoir déployer

		Project Console: https://console.firebase.google.com/project/ng-pokemon-app-c2e8a/overview
		Hosting URL: https://ng-pokemon-app-c2e8a.web.app

