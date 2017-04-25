var express = require('express');
var router = express.Router();

var User = require("../modules/users");

router.get('/', function(req,res){
	res.render('main');
})

router.get('/register', function(req, res){
	res.render('register');
});


router.get('/login', function(req, res){
	res.render('login');
});



router.post('/login', function(req,res){
	var username = req.body.username;
	var password = req.body.password;

	User.findOne({username: username, password: password}, function(err, user){
		var done = "hello: " + user.username;
		var error = "Wrong name or password";
		if (err){
			console.log(err);
			return res.sendStatus(500);
		}
		if (!username){
			return res.render('errpage',{
				err: error
			})
		}
		return res.render('logout',{
				done: done
			})
	});
});



router.post('/register', function(req, res){
	var username = req.body.username;
	var password = req.body.password;

	var newuser = new User();
	newuser.username = username;
	newuser.password = password;

	var done = "Welcome new user: " + newuser.username + ". Please login in:"

	newuser.save(function(err, savedUser){
		if (err){
			console.log(err);
			return res.sendStatus(500);
		}
		res.render('succspage',{
				done: done
			})
	})
});

module.exports = router;