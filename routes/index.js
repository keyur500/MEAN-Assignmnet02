var express = require('express');
var router = express.Router();

const user = require('../models/user');
const passport = require('passport');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TO DO - LIST' });
});

// register user
router.get('/register', function(req, res, next) {
  res.render('register', {title: 'Create Account'})
})

// login user
router.get('/login',function(req,res,next)
{
  //Error message check and display it
  let messages = req.session.messages || []
  req.session.messages=[]

  res.render('login',{title:'Please Enter Login Details',
  messages:messages
})
})

// post method for register function 
  router.post('/register', (req,res,next) =>{
    user.register(new user({
      username: req.body.username
    }),
    req.body.password,(err,newUser) => {
      if(err)
      {
        return res.redirect('/register')
      }
      else{
        req.login(newUser, (err)=> {
          res.redirect('/Projects/index')
        })
      }
    }
    )
  })

  // post login
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/Projects/index',
    failureRedirect: '/login',
    // this message will be shown on failure 
    failureMessage: 'Invalid Login'
  }))


  // get /logout
  router.get('/logout', (req, res, next) => {
   req.logout();
   res.redirect('login') 
  })
module.exports = router;
