//var lcounterbook1 = 0;
//var dcounterbook1 = 0;

//var lcounterbook2 = 0;
//var dcounterbook2 = 0;

//var lcounterbook3 = 0;
//var dcounterbook3 = 0;

//var lcounterbook4 = 0;
//var dcounterbook4 = 0;

//$("#lcounter1").html(lcounter1);
//$("#lcounter2").html(lcounter2);
//$("#lcounter3").html(lcounter3);

//$("#dcounter1").html(dcounter1);
//$("#dcounter2").html(dcounter2);
//$("#dcounter3").html(dcounter3);


// function clique(nomevar) {
	//if(nomevar == "#lcounter1") {
		//lcounter1++;
		//$(nomevar).html(lcounter1);
	//} else if(nomevar == "#dcounter1") {
	//	dcounter1++;
	//	$(nomevar).html(lcounter2);
//	}else if(nomevar == "#lcounter2") {
//		lcounter2++;
//		$(nomevar).html(lcounter2);
//	}else if(nomevar == "#dcounter2") {
//		dcounter2++;
//		$(nomevar).html(dcounter2);
//	}else if(nomevar == "#lcounter3") {
//		lcounter3++;
//		$(nomevar).html(lcounter3);
//	}else if(nomevar == "#dcounter3") {
//		dcounter3++;
//		$(nomevar).html(dcounter3);
//	}else if(nomevar == "#lcounter4") {
//		lcounter4++;
//		$(nomevar).html(lcounter4);
//	}else if(nomevar == "#dcounter4") {
//		dcounter4++;
//		$(nomevar).html(dcounter4);
//	}
//}

function esconde(pokemon) {
	$("#book1").hide();
}

function mostra (digimon) {
	$("#book4").show();
}



// var book1 = {
//			id : "book1",
//			title : "Bakemonogatari - Monster Tale Part 01",
//			author : "NisiOisiN",
//			bookmark : 0,
//			shelve : 0
//			}

//		var book2 = {
//			id : "book2",
//			title : "Fallout: Equestria",
//			author : "Kkat",
//			bookmark : 0,
//			shelve : 0
//		}

//		var book3 = {
//			id : "book3",
//			title : "The Scar",
//			author : "China Mieville",
//			bookmark : 0,
//			shelve : 0
//		}

//		var book4 = {
//			id : "book4",
//			title : "Guards! Guards!",
//			author : "Terry Pratchett",
//			bookmark : 0,
//			shelve : 0
//		}



//			var books = [book1, book2, book3, book4]


//			function gosto(index) {
//				books[(index - 1)].bookmark++;
//				$("#lcounterbook" + index).html(books[(index - 1)].bookmark);
//			}

//			function mau(index) {
//				books[(index - 1)].bookmark++;
//				$("#dcounterbook" + index).html(books[(index - 1)].bookmark);
//			}


var estante = new BookShelf();


function Queue() {

	this.data = [];

	this.enqueue = function(item) {

		this.data.push(item);
	}

	this.dequeue = function() {

		var aux = this.data[0];
		this.data = this.data.slice(1,this.data.length);
		return aux;
	}
}


function BookShelf() {
	this.shelf = new Queue();

	this.add = function(book) {
		book.bookshelf = this;
		this.shelf.enqueue(book);
	}

	this.init = function() {

		var aux1 = this.shelf.dequeue();
		aux1.render("book1");

		var aux2 = this.shelf.dequeue();
		aux2.render("book2");

		var aux3 = this.shelf.dequeue();
		aux3.render("book3");
	}

	this.switch = function(coluna) {
		var aux4 = this.shelf.dequeue();
		aux4.render(coluna);

	}

	this.load = function() {

		var url = "https://www.googleapis.com/books/v1/volumes?q=Pratchett";

		var currentShelf = this;

		$.get(url)
			.done(function(data) {
				console.log(data);
				currentShelf.parseBooks(data);

			}).fail(function(data) {
				console.log("ErRoR: " + data);
			})
	}

	this.parseBooks = function(data) {

		var title = "This Book doesn't exist";

		var author = "There is no such Author";

		var image = "https://lifemissionusa.org/sites/default/files/field/product/booknocoverimage_8.jpg";

		var sinopse = "Nothing to read, sorry : (";

		var ISBN = "00000000000000";

		var sneakpeak = "N/A";

		var links = "N/A";

		var bookmark = 0;

		var shelve = 0;


		for(var i = 0; i < data.items.length; i++) {
			
			if (data.items[i].volumeInfo.industryIdentifiers != null &&
				data.items[i].volumeInfo.industryIdentifiers[1] != null &&
				data.items[i].volumeInfo.imageLinks != null &&
				title != null && 
				author != null && 
				image != null && 
				sinopse != null && 
				ISBN != null)

				{

				title = data.items[i].volumeInfo.title;
				author = data.items[i].volumeInfo.authors[0];
				image = data.items[i].volumeInfo.imageLinks.thumbnail;
				sinopse = data.items[i].volumeInfo.description;
				ISBN = data.items[i].volumeInfo.industryIdentifiers[1].identifier;
				
				var livroTeste = new Book(title, author, image, sinopse, sneakpeak, links, ISBN, bookmark, shelve);

				estante.add(livroTeste);
			}

			else {
				i++;
			}			
		}
	estante.init();
	}
}


function Book(title, author, image, sinopse, sneakpeak, links, ISBN, bookmark, shelve) {
	this.title = title;
	this.author = author;
	this.image = image;
	this.sinopse = sinopse;
	this.sneakpeak = sneakpeak;
	this.links = links;
	this.ISBN = ISBN
	this.bookmark = 0;
	this.shelve = 0;
	
	this.bookshelf;

	this.likes = function() {
		this.bookmark++;
	}

	this.dislikes = function() {
		this.shelve++;
	}

	this.render = function(id) {

		var idTitle = "#"+id+" .Title";
		$(idTitle).html(this.title);

		var idAuthor = "#"+id+" .Author";
		$(idAuthor).html(this.author);

		var idSinopse = "#" + id + " .hook";
		$(idSinopse).html(this.sinopse);

		$("#" + id + " .img-responsive").attr("src", this.image);

		$("#" + id + " .img-responsive").attr("alt", this.title);

		$("#" + id + " .SneakPeak").attr("href", this.sneakpeak);
		$("#" + id + " .GoodReads").attr("href", this.links[0]);
		$("#" + id + " .BookD").attr("href", this.links[1]);
		$("#" + id + " .MoreAuthor").attr("href", this.links[2]);
		$("#" + id + " .WhatElse").attr("href", this.links[3]);

		$("#lcounter" + id).html(this.bookmark);

		var data = {"book":this, "id":id};

		var idButton = "#" + id + " .LButton";
		$(idButton).off('click')
		$(idButton).click(data, function(event) {
			event.data.book.likes();
			event.data.book.render(event.data.id);
		});

		$("#dcounter" + id).html(this.shelve);

		var idButton = "#" + id + " .DButton";
		$(idButton).off('click')
		$(idButton).click(data, function(event) {
			event.data.book.dislikes();
			event.data.book.render(event.data.id);
		});

		var idButton = "#" + id + " .NButton";
		$(idButton).off('click')
		$(idButton).click(data, function(event) {
			event.data.book.bookshelf.switch(event.data.id);
		});
	}
}


/*
var livro1 = new Book("Bakemonogatari - Monster Tale Part 01", "- NisiOisiN -", "http://i.imgur.com/SQI9Nqv.jpg", "There is a girl at their school who is always ill. She routinely arrives late, leaves early, or does not show up at all, and skips gym as a matter of course. She is pretty, and the boys take to whispering that she is a cloistered princess. As the self-described worst loser in her class soon finds out, they just do not know what a monster she is. So begins a tale of mysterious maladies that are supernatural in origin yet deeply revealing of the human psyche, a set of case files as given to unexpected feeling as it is to irreverent humor. So begins the legendary novel that kicked off the MONOGATARI series, whose anime adaptations have enjoyed international popularity and critical acclaim. This first of three parts introduces Senjogahara and Hachikuji, and fans of the blockbuster prequel KIZUMONOGATARI will be delighted to meet their favorite crazies again: the weirdly reliable narrator Araragi, class president among class presidents Hanekawa, shady problem-solver Oshino, and a certain pale, blonde former vampire.", "https://readfag.wordpress.com/unedited/bakemonogatari/", ["http://www.goodreads.com/book/show/3940745-bakemonogatari", "https://www.bookdepository.com/Bakemonogatari-Part-1-Nisioisin/9781942993889", "http://www.novelupdates.com/nauthor/nisioisin/", "http://www.goodreads.com/book/show/2527817.Zaregoto_1"], 9781942993889, 0, 0);


var livro2 = new Book("Fallout: Equestria", "- Kkat -", "https://s-media-cache-ak0.pinimg.com/originals/35/21/59/352159887173cb88e1c69d7336c44b2d.jpg", "Once upon a time, in the magical land of Equestria... there came an era when the ideals of friendship gave way to greed, selfishness, paranoia and a jealous reaping of dwindling space and natural resources. Lands took up arms against their neighbors. The end of the world occurred much as we had predicted -- the world was plunged into an abyss of balefire and dark magic. The details are trivial and pointless. The reasons, as always, purely our own. The world was nearly wiped clean of life. A great cleansing; a magical spark struck by pony hooves quickly raged out of control. Megaspells rained from the skies. Entire lands were swallowed in flames and fell beneath the boiling oceans. Ponykind was almost extinguished, their spirits becoming part of the ambient radiation that blanketed the lands. A quiet darkness fell across the world... But it was not, as some had predicted, the end of the world. Instead, the apocalypse was simply the prologue for another bloody chapter in pony history. In the early days, thousands were spared the horrors of the holocaust by taking refuge in enormous underground shelters known as Stables. But when they emerged, they had only the hell of the wastes to greet them. All except those in Stable Two. For on that fateful day when spellfire rained from the sky, the giant steel door of Stable Two swung closed, and never re-opened.", "https://www.fimfiction.net/story/119190/2/fallout-equestria/prologue", ["http://www.goodreads.com/book/show/14828781-fallout", "https://www.fimfiction.net/story/119190/fallout-equestria", "https://www.fimfiction.net/index.php?view=category&user=10369", "https://www.equestriadaily.com/2011/08/fallout-equestria-project-horizons.html"], 9584440756, 0, 0);


var livro3 = new Book("The Scar", "- China-Mieville -", "https://outtherebooks.files.wordpress.com/2011/10/the-scar.jpg", "Aboard a vast seafaring vessel, a band of prisoners and slaves, their bodies remade into grotesque biological oddities, is being transported to the fledgling colony of New Crobuzon. But the journey is not theirs alone. They are joined by a handful of travelers, each with a reason for fleeing the city. Among them is Bellis Coldwine, a renowned linguist whose services as an interpreter grant her passage - and escape from horrific punishment. For she is linked to Isaac Dan der Grimnebulin, the brilliant renegade scientist who has unwittingly unleashed a nightmare upon New Crobuzon. For Bellis, the plan is clear: live among the new frontiersmen of the colony until it is safe to return home. But when the ship is besieged by pirates on the Swollen Ocean, the senior officers are summarily executed. The surviving passengers are brought to Armada, a city constructed from the hulls of pirated ships, a floating, landless mass ruled by the bizarre duality called the Lovers. On Armada, everyone is given work, and even Remades live as equals to humans, Cactae, and Cray. Yet no one may ever leave. Lonely and embittered in her captivity, Bellis knows that to show dissent is a death sentence. Instead, she must furtively seek information about Armada's agenda. The answer lies in the dark, amorphous shapes that float undetected miles below the waters terrifying entities with a singular, chilling mission...", "http://mostlyfiction.com/excerpts/scar.htm", ["https://www.goodreads.com/book/show/68497.The_Scar", "https://www.bookdepository.com/Scar-China-Mieville/9780330534314", "http://www.fantasybookreview.co.uk/China-Mieville/biography.html", "https://imagecomics.com/comics/series/the-wicked-the-divine"], 9780330534314, 0, 0);


var livro4 = new Book("Guards! Guards!", "- Terry Pratchett -", "http://cdn.pastemagazine.com/www/articles/guards-guards-1.jpg", "Here there be dragons . . . and the denizens of Ankh-Morpork wish one huge firebreather would return from whence it came. Long believed extinct, a superb specimen of draco nobilis ('noble dragon for those who don't understand italics) has appeared in Discworld's greatest city. Not only does this unwelcome visitor have a nasty habit of charbroiling everything in its path, in rather short order it is crowned King (it is a noble dragon, after all . . .). Meanwhile, back at Unseen University, an ancient and long-forgotten volume--The Summoning of Dragons--is missing from the Library's shelves. To the rescue come Captain Vimes, Constable Carrot, and the rest of the Night Watch who, along with other brave citizens, risk everything, including a good roasting, to dethrone the flying monarch and restore order to Ankh-Morpork (before it's burned to a crisp). A rare tale, well done as only Terry Pratchett can.", "http://ld.johanesville.net/pratchett-68-discworld-guards-guards?page=15", ["http://www.goodreads.com/book/show/64216.Guards_Guards_", "https://www.bookdepository.com/Guards-Guards-Terry-Pratchett/9781473200180", "https://wiki.lspace.org/mediawiki/Bibliography", "https://www.goodreads.com/series/147970-douglas-adams-the-hitchhiker-s-guide-to-the-galaxy-graphic-novel"], 9781473200180, 0, 0)

var livro5 = new Book("Red Country", "- Joe Abercrombie -", "https://www.joeabercrombie.com/wp-content/uploads/2014/03/red-country-uk-pb.jpg", "They burned her home. They stole her brother and sister. But vengeance is following. Shy South hoped to bury her bloody past and ride away smiling, but she'll have to sharpen up some bad old ways to get her family back, and she's not a woman to flinch from what needs doing. She sets off in pursuit with only a pair of oxen and her cowardly old step father Lamb for company. But it turns out Lamb's buried a bloody past of his own. And out in the lawless Far Country the past never stays buried. Their journey will take them across the barren plains to a frontier town gripped by gold fever, through feud, duel and massacre, high into the unmapped mountains to a reckoning with the Ghosts. Even worse, it will force them into an alliance with Nicomo Cosca, infamous soldier of fortune, and his feckless lawyer Temple, two men no one should ever have to trust... RED COUNTRY takes place in the same world as the First Law trilogy, Best Served Cold, and The Heroes. This novel also represents the return of Logen Ninefingers, one of Abercrombie's most beloved characters.", "https://www.joeabercrombie.com/books/red-country/an-extract-from-red-country/", ["http://www.goodreads.com/book/show/13521459-red-country", "https://www.bookdepository.com/Red-Country-Joe-Abercrombie/9780575095823", "https://www.joeabercrombie.com/books/", "http://www.goodreads.com/book/show/618177.Legend"], 9780575107748, 0, 0)


*/



/*
estante.add(livro1);
estante.add(livro2);
estante.add(livro3);
estante.add(livro4);
estante.add(livro5);



estante.init();

*/

estante = new BookShelf();

estante.load();


// console.log(estante);







//		var keys = Object.keys(estante.shelf)

//		console.log(estante.shelf)
//		console.log(keys)
//		console.log(estante.shelf[keys[1]])


// var rand = myArray[Math.floor(Math.random() * myArray.length)];












