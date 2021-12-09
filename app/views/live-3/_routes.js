const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line



/* CHECK ROUTER TO MAKE THE JOURNEY WITH NOTES MORE ROBUST */

  router.post('/live-3/cases/searchlight/benefits/check', function(req, res, next){ 

   if (req.session.data['benefits']){
    for (i = 0; i<req.session.data['benefits'].length; i++){
    switch (req.session.data['benefits'][i]){

     case "ib" :  return res.redirect("check-answers"); next(); break;
     case "esa" :  return res.redirect("check-answers"); next(); break;
     case "sda" :  return res.redirect("check-answers"); next(); break;
     case "none" :  return res.redirect("/live-3/claim#your-tasks"); next(); break;
     default: continue;
     }
     break;
    }
   } else {

   }
  return res.redirect("/live-3/claim#your-tasks"); next();
  })

  router.post('/live-3/cases/searchlight/benefits/check', function(req, res, next){ 

   if (req.session.data['benefits']){
    for (i = 0; i<req.session.data['benefits'].length; i++){
    switch (req.session.data['benefits'][i]){

     case "esa" :  return res.redirect("check-answers"); next(); break;
     case "sda" :  return res.redirect("check-answers"); next(); break;
     case "none" :  return res.redirect("/live-3/claim#your-tasks"); next(); break;
     default: continue;
     }
     break;
    }
   } else {

   }
  return res.redirect("/live-3/claim#your-tasks"); next();
  })

  router.post('/live-3/cases/searchlight/benefits/check', function(req, res, next){ 

   if (req.session.data['benefits']){
    for (i = 0; i<req.session.data['benefits'].length; i++){
    switch (req.session.data['benefits'][i]){

     case "sda" :  return res.redirect("check-answers"); next(); break;
     case "none" :  return res.redirect("/live-3/claim#your-tasks"); next(); break;
     default: continue;
     }
     break;
    }
   } else {

   }
  return res.redirect("/live-3/claim#your-tasks"); next();
  })

  router.post('/live-3/cases/searchlight/benefits/check', function(req, res, next){ 

   if (req.session.data['benefits']){
    for (i = 0; i<req.session.data['benefits'].length; i++){
    switch (req.session.data['benefits'][i]){

     case "none" :  return res.redirect("/live-3/claim#your-tasks"); next(); break;
     default: continue;
     }
     break;
    }
   } else {

   }
  return res.redirect("/live-3/claim#your-tasks"); next();
  })




module.exports = router
