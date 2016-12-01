"use strict";
let db = require('./dbInteraction'),
	user = require('./user'),
	HB = require('hbsfy/runtime'),
	welcomeTemp = require('../templates/welcome.hbs'),
	allToysTemplate = require('../templates/allToys.hbs'),
	toyTemplate = require('../templates/toy.hbs'),
	addToysTemplate = require('../templates/addToys.hbs');




/*HANDLEBARS WELCOME*/

$("#output").html(welcomeTemp);

/*HB HELPERs*/

HB.registerHelper("increment", function(value) {
  return parseInt(value) + 1;
});

HB.registerHelper("moduloIf", function(index_count,mod,block) {

  if(parseInt(index_count)%(mod)=== 0){
    return block.fn(this);}
});

HB.registerHelper("log", function(something) {
  console.log(something);
});

/*AUTHENTICATION*/

$("#signIn").click(() => {
	user.logInGoogle();
	$("#signIn").hide();
	$("#signOut").removeClass("hide");
});

$("#signOut").click(() => {
	user.logOut();
	location.reload();
});

/*ALL TOYS EVENT*/

$("#allToys").click(() => {
	db.getToysFromFirebase()
	.then((toys) => {
		console.log("toys",toys);
		showToys(toys);
	});
});

/*SEARCH TOYS EVENT/FUNCTION*/

$("#search").click(() => {
		search();

});
$("#query").keydown(function(e) {
	if(e.keyCode === 13) { 
	e.preventDefault();
	search();
	}
});

	$(document).on("click",".toyCard",(e) => {	
		console.log("e.target",e.target.closest("div").id);
		let name = e.target.closest("div").id;
		db.getToyFromFirebase(name)
		.then((toy) => {
 			showToy(toy);
	});
	});

function search() {
	console.log("search");
	let name = $("#query").val();
	db.getToyFromFirebase(name)
		.then((toy) => {
 			showToy(toy);
	});
}



/*BUILD TOY FUNCTION*/

function buildToy() {
	let toy ={};
	toy.name = $("#name").val();
	toy.price = $("#price").val();
	toy.image = $("#url").val();
	toy.description = $("#description").val();
	db.addToyToFirebase(toy);

}


/*ADD TOYS EVENTs*/


$("#editToys").click(() => {
	//form template
	$("#output").html(addToysTemplate);
});

$(document).on("click","#add",(e) => {	
	if (user.getUser()) {
		buildToy();
		$("#output").html(addToysTemplate);
	} else {
		user.logInGoogle()
		.then(() => {
			$("#signIn").hide();
			$("#signOut").removeClass("hide");
			buildToy();
			$("#output").html(addToysTemplate);
		});
	}
	});

/*DELETE TOY*/

$(document).on("click",".deleteBtn",(e) => {	
		let deleteID = $(event.target).data("delete-id");
		db.removeFromFirebase(deleteID)
		.then(()=> {
			db.getToysFromFirebase()
		.then((toys) => {
		showToys(toys);
		});
	});
			
});



/*POPULATE VIEWs*/

function showToys(toys) {
	let returnedToysArray = $.map(toys, function(value, index) {
				value.id = index;
				return [value];
					});
	$("#output").html(allToysTemplate(returnedToysArray));
}

function showToy(toy) {
	
		let returnedToyArray = $.map(toy, function(value, index) {
			value.id = index;
				return [value];
					});
	$("#output").html(toyTemplate(returnedToyArray));
	
}




















