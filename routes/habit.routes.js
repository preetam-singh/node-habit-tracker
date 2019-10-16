var express = require('express');
var router = express.Router();
var Habit = require('../models/habit.model');
var jwt = require('jsonwebtoken');
var middlewares = require("../middlewares") 


//------------Create Route---------------

router.get("/", function(req, res){
	res.send("home");
});


//-----    all habits route

router.get("/habits", middlewares.authenticateToken, function(req, res){
	const author = {
		id: req.user.userID
	}
   
	Habit.find({}, function(err, habits){
		if(err){
			console.log("error");
		}else{
			let userHabits = [];
			userHabits = habits.filter( habit => {
			 	return habit.author.id == author.id;
			});
			res.json(userHabits);
		}
	});
});


// ------ GET habit with particular id

router.get("/habits/:id", function(req, res){
	Habit.findById(req.params.id, function(err, foundHabit){
		if(err){
			console.log(err);
		}else{
			res.json(foundHabit);
		}
	});

});

//------- POST habit to create new habit

router.post("/habits/add", function(req, res){

	var habit = {
		title: req.body.title,
		description: req.body.description,
		createDate: req.body.createDate,
		endDate: req.body.endDate,
		daysStatusData: req.body.daysStatusData,
		author: {
			id: req.body.author.id
		},
		block: req.body.block
	}
	Habit.create(habit , function(err, addedHabit){
		if(err){
			console.log(err);
		}else{
			res.json(addedHabit);
		}
	});
});


//------------- EDIT habit with particular id

router.post("/habits/update/:id", function(req, res){
	Habit.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, habit){
		if(err){
			console.log(err);
		}else{
			res.json(habit);
		}
	});
});
 

// ---------------- DELETE habit with particular id

router.get("/habits/delete/:id", function(req, res){
	Habit.findByIdAndRemove(req.params.id, function(err, removedHabit){
		if(err){
			console.log(err);
		}else{
			res.json(removedHabit);
		}
	});

});



module.exports = router;