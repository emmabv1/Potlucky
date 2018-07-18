var db = require("./models");
var router = require('express').Router();

module.exports = function (app) {
    app.get("/api/users/", function (req, res) {
        db.User.findAll().then(function (result) {
           res.json(result);
            console.log("this is a get and it works");

        });
    });

    app.post('/api/users/', function(req, res, next) {
        db.User.create(req.body).then(function (result) {
            console.log(req.body);
            res.json(result);
             console.log("this is a post and it works");
         });
    });

    app.get("/api/parties/", function (req, res) {
        db.Party.findAll().then(function (result) {
           res.json(result);
            console.log("this is a get and it works");

        });
    });

    app.post('/api/party/', function(req, res, next) {
        db.Party.create(req.body).then(function (result) {
            console.log(req.body);
            res.json(result);
             console.log("this is a post and it works");
         });
    });

    app.get("/api/items/", function (req, res) {
        db.Items.findAll().then(function (result) {
           res.json(result);
            console.log("this is a get and it works");

        });
    });

    app.post('/api/items/', function(req, res, next) {
        db.Items.create(req.body).then(function (result) {
            console.log(req.body);
            res.json(result);
             console.log("this is a post and it works");
         });
    });

}



// // creating a new user
// router.post('/newuser', function(req, res, next) {
//   res.locals.connection.query('insert into user(name,email,password)values("+req.body.name+","+req.body.email+""+req.body.password+")', function (error, results, fields) {
//       if(error) throw error;
//       res.send(JSON.stringify(results));
//   });
// });

//   //Function to find all the events created by the user

//   function findAllUserCreatedEvents(email){

//     var attributes = [ 'hostName', 'partyId'];
//     var partyAttributes = ['partyId','partyName','location','date','time'];
//     db.Party.findAll({
//       attributes : attributes,
//       where: { 
//           email : email,
//       },
//       include: [{
//         model: db.Party, attributes: partyAttributes
//       }]
//     }).then(function(dbPartyView) {
//       var results = JSON.parse(JSON.stringify(dbPartyView));
//       var userCreatedParty = [];
//       for(i = 0;i < results.length; i++){
//         userCreatedParty.push(results[i].dbPartyView.id);
//       }

//     });
// };

// //Function to find all the events a user is invited to

// function userInvitedEvents(email) {
//   var attributes = [ 'guestName', 'partyId'];
//   var partyAttributes = ['id','type','name','rating','year','genre'];
//   db.Party.findAll({
//     attributes : attributes,
//     where: { 
//         email : email,
//     },
//     include: [{
//       model: db.Party, attributes: partyAttributes
//     }]
//   }).then(function(dbPartyView) {
//     var results = JSON.parse(JSON.stringify(dbPartyView));
//     var userCreatedParty = [];
//     for(i = 0;i < results.length; i++){
//       userCreatedParty.push(results[i].dbPartyView.id);
//     }

//   });
// };

// module.exports = function(app) {
//   app.get("/#/events/yours", function(req,res) {
//     //return all events created by user
//     var email = req.params.email;
//     var searchStr = req.query.searchStr;
//     findAllUserCreatedEvents(email,function(data){
//       res.json(data);
//     });

//   });

//   app.get("/#/events/theirs", function(req,res){
//     var email = req.params.email;
//     var searchStr = req.query.search || "";
//     findAllUserCreatedEvents(email,userInvitedEvents,searchStr,function(data){
//       res.json(data);
//     });

//   });
// }

//   //More API routes to create an event
  