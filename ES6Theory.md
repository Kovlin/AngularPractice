#### Les classes :

- Les classes (ES5) :

	function Vehicle(color, drivingWheel) {
		this.color = color;
		this.drivingWheel = drivingWheel;
		this.isEngineStart = false;
	}

	Vehicle.prototype.start = function start() {
		this.isEngineStart = true;
	}

	Vehicle.prototype.stop = function stop() {
		this.isEngineStart = false;
	}

	Pour créer une simple classe véhicule avec ES5 il aurait fallu faire comme ci-dessus

- Les classes (ES6) :

	Un nouveau mot-clé est introduit, le mot-clé 'class'

	Class Vehicle {
		
		constructor(color, drivingWheel) {
			this.color = color;
			this.drivingWheel = drivingWheel;
			this.isEngineStart = false;
		}

		start() {
			this.isEngineStart = true;
		}

		stop() {
			this.isEngineStart = false;
		}
	}

#### L'héritage :

- l'héritage (ES6) :

	On peut dorénavant utiliser les mot-clés 'extends' et 'super' en Javascript

	class Car extends Vehicle {
		constructor(color, drivingWheel, isEngineStart = false, seatings) {
			super(color, drivingWheel, isEngineStart);
			this.seatings = seatings;
		}
	}

	class Motorbike  extends Vehicle {
		constructor(color, drivingWheel, isEngineStart = false, unleash) {
			super(color, drivingWheel, isEngineStart);
			this.unleash = unleash;
		}
	}

	extends pour dire que notre classe hérite de Vehicle
	super pour appeler le constructeur parent

#### Les paramètres par défaut :

	function multiply(a, b = 1) {
		return (a * b);
	}

	b à pour valeur par défaut 1

#### Le mot-clé let :

	le mot-clé let permet de déclarer une variable locale dans le contexte où elle a été assignée.
	un contexte est le terme français pour scope en anglais : les {}

	if (x < 10) {
		let v = 1;
		v = v + 21;
	}
	v n'existe que dans le contexte du if

#### Le mot-clé const :

	Permet de déclarer des constantes.
	La déclaration de cette constante ne peut se faire qu'une seule fois et une fois définie cette valeur ne peut plus changer.

#### Les promesses :

	Leur objectif est de simplifier la programmation asynchrone

	Exemple : 

	getUser(userId)
	.then(function(user)) {
		getFriendsList(user);
	})
	.then(function(friends)) {
		showFriends(friends);
	});

#### Les arrow functions, fonctions fléchées :

	Permet de simplifier l'écriture des fonctions anonymes.

	// Cas n°1 : Confusion sur 'this'

	class Person {
		constructor(firstName, email, button) {
			this.firstName = firstName;
			this.email = email;

			button.onclick = function() {
				sendEmail(this.email); // ce 'this' fait référence au bouton, et non à une instance de Personne
			}
		}
	}

	On veut faire référence au this de la personne et non pas à celle du bouton :

	// Cas n°2 : Utilisation d'une variable intermédiaire

	class Person {
		constructor(firstName, email, button) {
			this.firstName = firstName;
			this.email = email;
			var that = this; // 'this' fait référence ici à l'instance de Personne

			button.onclick = function() {
				sendEmail(this.email); // 'that' fait référence à la même instance de Personne
			}
		}
	}

	Pour ne pas avoir à passer par une variable intermédiaire :

	// Cas n°3 : Utilisation des fonctions fléchées :

	button.onclick = () => { sendEmail(this.email); } 

	On peut réécrire cette fonction onclick() comme ci-dessus, elles ne sont pas comme des fonctions classiques car elles ne définissent pas un nouveau contexte comme les fonctions traditionnelles.

	//Exemple d'utilisation des fonctions fléchées avec des Promesses :

	getUser(userId)
		.then(user => getFriendsList(user))
		.then(friends => showFriends(friends));

#### Les collections Map et Set :

	La collection map est l'équivalent d'un dictionnaire dans d'autre language dans lequel on ajoute des paires clé/valeur.

	// Les dictionnaires avec Map

	let zlatan = {rank: 1, name: Zlatan};

	let players = new Map(); // Création d'un nouveau dictionnaire
	players.set(zlatan.rank, zlatan.name); // Ajout du nom 'zlatan' à la clé '1'

	// Les listes avec Set :

	let players = new Set(); // Création d'une nouvelle liste
	players.add(zlatan); // Ajout de l'objet zlatan dans cette liste


	// Méthodes pour Map et Set :

	players.size; // renvoi le nombre d'éléments dans la collection

	players.has(zlatan.rang); // Dictionnaire : renvoit si le dictionnaire contient la clé (le rang) de zlatan
	players.has(zlatan); // Liste : renvoit si la liste contient l'objet zlatan

	players.delete(zlatan.rang) // Dictionnaire : suprimme l'élément de la collecion d'après sa clé
	players.delete(zlatan) // Liste : supprime l'élément passé en paramètre


#### Les templates strings :

	Les templates string commence et se termine non pas par des "" mais par des bacticks ``
	Cela permet d'écrire des strings sur plusieurs lignes mais aussi d'injecter des variables dans nos strings grâce à ${}
	${maVar}

	return `${this.name} a pour email : ${this.email}`;