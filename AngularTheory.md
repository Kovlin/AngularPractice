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
	
	5:51:38