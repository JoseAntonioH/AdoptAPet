const router = require("express").Router();
const mongoose = require("mongoose");
const fileUploader = require('../config/cloudinary.config');


//Pet model
const Pet = require("../models/Pet.model");
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Quiz = require("../models/Quiz.model");


const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");



router.get("/new",isLoggedIn,(req,res)=>{
	res.render("create-pet",req.session.user)
});


//form
router.post("/new", isLoggedIn, (req, res, next)=>{
	const {petname, pet, dob, size, personality, sociability, city, name, phone, status} = req.body
	//console.log("PETS====", req.body)
	Pet.create({
		petname, pet, dob, size, personality, sociability, city, name, phone, status
	}).then((result)=>{
		//console.log(result)
		 res.redirect("/pet/my-pets")
		}).catch ((err)=> console.log(err))
	
}) 

//View My Pets in Adoption
router.get("/my-pets",isLoggedIn,(req,res)=>{
	Pet.find().then((pets)=>{
		//console.log(pets)
		res.render("../views/myPets", {pets : pets});
	})
});

//view pet details
router.get("/my-pets/:id", isLoggedIn,(req, res)=>{
	 Pet.findById(req.params.id).then((pet)=>{
		console.log(req.params.id)
		res.render("../views/petdetails.hbs", pet)
		}) 	
})


router.get("/wall/:id", (req, res)=>{
	Pet.findById(req.params.id).then((pet)=>{
	 console.log(req.params.id)
	 res.render("../views/petdetails.hbs", pet)
	 }) 	
})

router.get("/wall",(req,res)=>{
	Pet.find().then((pets)=>{
		//console.log(pets)
		res.render("../views/wall", {pets : pets});
	})
});

//Quiz
//router.post

router.get("/quiz",isLoggedIn,(req,res)=>{
		res.render("../views/quiz");
	});

	router.get("/quiz-results",isLoggedIn,(req,res)=>{
		res.render("../views/quizResults");
	});



router.post("/quiz", (req,res, next) =>{
	const {pet, size,personality, sociability} = req.body
	console.log(req.body)
	Post.create({pet, size,personality, sociability})
	.then((result)=>{
		res.redirect("/pet/quiz-results")
	}) . catch((err) => console.log(err))
})


//POSTS - OUR COMMUNITY
router.get("/post",isLoggedIn,(req,res)=>{
	res.render("createPost")
});

router.get("/community",(req,res)=>{
	res.render("community")
})


router.post("/post", isLoggedIn,fileUploader.single('image'), (req,res, next) =>{
	const {petname,name, comment, adoptionDate} = req.body
	console.log(req.body)
	Post.create({petname,name, comment, image: req.file.path, adoptionDate})
	console.log(req.file)
	.then((result)=>{
		res.redirect("/pet/community")
	}) . catch((err) => console.log(err))
})


module.exports = router;