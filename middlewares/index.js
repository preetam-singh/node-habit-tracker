const passport = require('passport');
var jwt = require('jsonwebtoken');
var middlewaresObj = {};
var jwtDecode = require('jwt-decode');

middlewaresObj.authenticateToken = function(req, res, next){
	const authHeader = req.headers['authorization'];
	const token = authHeader.split(' ')[1];

	if(token == null){
		return res.sendStatus(401);
	} 

    
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user)=>{
    	if(err) return res.sendStatus(401);
    	else{
    		req.user = user;               // user => { userID, iat, exp}
    		next();
    	}
    });

}


middlewaresObj.authenticate = (req, res) => {

	passport.authenticate('local', (err, user, info) => {
		if (err) {                              // error from passport middleware
			return res.status(401).send({
				message: err.message
			});
		}
		if (user) {                             // registered user
			var token =  jwt.sign({userID: user._id}, process.env.TOKEN_SECRET, {expiresIn: '2h'});
			var authUser = {
				id: user._id,
				username : user.username,
				token : token
			}
			res.json(authUser);

	    }else {                                // unknown user or wrong credentials
			return res.status(401).send({
				message: info.message
			});
		}

	})(req, res);

}

module.exports = middlewaresObj;