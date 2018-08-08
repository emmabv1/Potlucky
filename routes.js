var db = require("./models");
var router = require('express').Router();

module.exports = function (app) {
    app.get("/api/users/", function (req, res) {
        db.User.findAll().then(function (result) {
           res.json(result);
            //console.log("this is a get and it works");
        });
    });

    app.get("/api/users/:userid/", function (req, res) {
        db.User.findById(req.params.userid).then(function (result) {
           res.json(result);
            //console.log("this is a get and it works");
        });
    });

    // app.get("/api/userparty/:userid/", function (req, res) {
    //     db.UserParty.findAll({where: {userId: req.params.userid}})
    //     .then(function (result) {
    //        res.json(result);
    //         //console.log("this is a get and it works");
    //     });
    // });

    app.get("/api/userparty/:userid", function (req, res) {
        db.UserParty.findAll({where: {userId: req.params.userid}})
        .then(function (result) {
           // res.json(result);
           let arr = result.map(i => i.partyId);
           db.Party.findAll({where: {id: [arr]}})
            //db.Party.findAll({where: {id: [result[0].partyId, result[1].partyId, result[2].partyId]}})
            .then(function (result) {res.json(result)});
        })
    });

   // include: [ { model: PhoneNumber, as: 'phoneNumbers' } ]

    //Cards.findAll({where: {id: arr}, include: [Types, Numbers, Suits]}).then(function(result) 

    app.post('/api/users/', function(req, res, next) {
        db.User.create(req.body).then(function (result) {
            //console.log(req.body);
            res.json(result);
            // console.log("this is a post and it works");
         });
    });

    app.get("/api/parties/", function (req, res) {
        db.Party.findAll().then(function (result) {
            res.json(result);

            //console.log("this is a get and it works");

        });

             // }).catch(function (err) {res.send(err)});

    });

    app.get("/api/parties/:partyid/", function (req, res) {
        db.Party.findById(req.params.partyid).then(function (result) {
           res.json(result);
           // console.log("this is a get and it works");
        });
    });

    app.post('/api/parties/', function(req, res) {
        db.Party.create(req.body)
        .then(function (party) {
            res.json(party)
          });
    });

    app.get("/api/userparty/", function (req, res) {
        db.UserParty.findAll().then(function (result) {
            res.json(result);
        });
    });

    app.post('/api/userparty/', function(req, res) {
        db.UserParty.create(req.body)
        .then(function (result) {
            res.json(result)
        });
    });

    app.get("/api/items/", function (req, res) {
        db.Items.findAll().then(function (result) {
           res.json(result);
            //console.log("this is a get and it works");

        });
    });

    app.get("/api/items/:partyid/:category", function (req, res) {
        db.Items.findAll({where: {partyId: req.params.partyid, $and: {category:req.params.category}}}).then(function (result) {
           res.json(result);
            //console.log("this is a get and it works");
        });
    });

    app.get("/api/items/:partyid", function (req, res) {
        db.Items.findAll({where: {partyId: req.params.partyid}}).then(function (result) {
           res.json(result);
            //console.log("this is a get and it works");
        });
    });

    app.post('/api/items/', function(req, res, next) {
        db.Items.create(req.body).then(function (result) {
            //console.log(req.body);
            res.json(result);
             //console.log("this is a post and it works");
         });
    });

    app.delete('/api/items/:itemid', function(req, res, next) {
        db.Items.destroy({  
            where: {id: req.params.itemid}
          })
          .then(result => {
            res.json(result);;
          });
    });

    app.get("/api/categories/", function (req, res) {
        db.Category.findAll().then(function (result) {
           res.json(result);
            //console.log("this is a get and it works");

        });
    });

    app.get("/api/categories/:partyid", function (req, res) {
        db.Category.findAll({where: {party: req.params.partyid}}).then(function (result) {
           res.json(result);
            //console.log("this is a get and it works");
        });
    });

    app.post('/api/categories/', function(req, res, next) {
        db.Category.create(req.body).then(function (result) {
            //console.log(req.body);
            res.json(result);
             //console.log("this is a post and it works");
         });
    });



    // app.get("/api/join/:user", function (req, res) {
    //     db.UserParty.findAll({where: {userId: req.params.user}})
    //     .then(function (result) {
    //        // res.json(result);
    //        let arr = result.map(i => i.partyId);
    //        db.Party.findAll({where: {id: [arr]}})
    //         //db.Party.findAll({where: {id: [result[0].partyId, result[1].partyId, result[2].partyId]}})
    //         .then(function (result) {res.json(result)});
    //     })
    // });
    

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
  