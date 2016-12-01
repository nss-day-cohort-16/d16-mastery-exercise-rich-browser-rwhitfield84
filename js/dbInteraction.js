"use strict";

let user = require('./user');

/*GET TOYS FROM FIREBASE*/

function getToysFromFirebase() {
	return new Promise((resolve,reject) => {
		$.ajax({
			url: `https://toyconsignmentshop.firebaseio.com/toys.json`,
		}).done((toys) => {
			resolve(toys);
		});
	});
}

function getToyFromFirebase(name) {
	console.log("here");
	return new Promise((resolve,reject) => {
		$.ajax({
			url: `https://toyconsignmentshop.firebaseio.com/toys.json?orderBy="name"&equalTo="${name}"`,
		}).done((toy) => {
			console.log("toy", toy);
			resolve(toy);
		});
	});
}

/*ADD TOYS TO FB*/

function addToyToFirebase(toyObject) {
	toyObject.uid = user.getUser();
		return new Promise((resolve,reject) => {
		$.ajax({
			url: `https://toyconsignmentshop.firebaseio.com/toys.json`,
			type: "POST",
			data: JSON.stringify(toyObject),
			dataType: 'json'
		}).done((toy) => {
			console.log("toy", toy);
			resolve(toy);
		});
	});
}

/*DELETE TOYS FROM FB*/

function removeFromFirebase(deleteID) {
	return new Promise((resolve, reject)=>{
		$.ajax({
			url: `https://toyconsignmentshop.firebaseio.com/toys/${deleteID}.json`,
			method: "DELETE"
		}).done(()=>{
			resolve();
		});
	});
}


module.exports = {getToysFromFirebase,getToyFromFirebase,addToyToFirebase,removeFromFirebase};

