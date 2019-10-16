var express     = require('express'),
    router      = express.Router(),
    User        = require('../models/user.model'),
    passport    = require('passport'),
    jwt         = require('jsonwebtoken'),
    middlewares = require('../middlewares')

// ----------------- SIGN UP ROUTE --------------------------

router.post("/register", (req, res) => {
	var newUser = new User({username: req.body.username});
	
	User.register(newUser, req.body.password, (err, user) => {
		if(err){
			return  res.status(401).send({
		  			 message: err.message
		    });
		}else{
		    var token =  jwt.sign({userID: user._id}, process.env.TOKEN_SECRET, {expiresIn: '2h'});

			var authUser = {
				id: user._id,
				username : user.username,
				token : token
			}
				
			res.json(authUser);
				
		}
	});

});

// -------------------- LOGIN ROUTE -------------------------

router.post("/login", middlewares.authenticate);

module.exports = router;