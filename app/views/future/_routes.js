const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line


const faker = require('faker')
const moment = require('moment')

// Add your routes here - above the module.exports line



/* CHECK ROUTER TO MAKE THE JOURNEY WITH NOTES MORE ROBUST */

  router.post('/future/cases/searchlight/benefits/check', function(req, res, next){ 

   if (req.session.data['benefits']){
    for (i = 0; i<req.session.data['benefits'].length; i++){
    switch (req.session.data['benefits'][i]){

     case "ib" :  return res.redirect("check-answers"); next(); break;
     case "esa" :  return res.redirect("check-answers"); next(); break;
     case "sda" :  return res.redirect("check-answers"); next(); break;
     case "none" :  return res.redirect("/future/claim#your-tasks"); next(); break;
     default: continue;
     }
     break;
    }
   } else {

   }
  return res.redirect("/future/claim#your-tasks"); next();
  })

  router.post('/future/cases/searchlight/benefits/check', function(req, res, next){ 

   if (req.session.data['benefits']){
    for (i = 0; i<req.session.data['benefits'].length; i++){
    switch (req.session.data['benefits'][i]){

     case "esa" :  return res.redirect("check-answers"); next(); break;
     case "sda" :  return res.redirect("check-answers"); next(); break;
     case "none" :  return res.redirect("/future/claim#your-tasks"); next(); break;
     default: continue;
     }
     break;
    }
   } else {

   }
  return res.redirect("/future/claim#your-tasks"); next();
  })

  router.post('/future/cases/searchlight/benefits/check', function(req, res, next){ 

   if (req.session.data['benefits']){
    for (i = 0; i<req.session.data['benefits'].length; i++){
    switch (req.session.data['benefits'][i]){

     case "sda" :  return res.redirect("check-answers"); next(); break;
     case "none" :  return res.redirect("/future/claim#your-tasks"); next(); break;
     default: continue;
     }
     break;
    }
   } else {

   }
  return res.redirect("/future/claim#your-tasks"); next();
  })

  router.post('/future/cases/searchlight/benefits/check', function(req, res, next){ 

   if (req.session.data['benefits']){
    for (i = 0; i<req.session.data['benefits'].length; i++){
    switch (req.session.data['benefits'][i]){

     case "none" :  return res.redirect("/future/claim#your-tasks"); next(); break;
     default: continue;
     }
     break;
    }
   } else {

   }
  return res.redirect("/future/claim#your-tasks"); next();
  })




    router.post('/live-4/cases/searchlight/benefits/check', function(req, res, next){ 

     if (req.session.data['benefits']){
      for (i = 0; i<req.session.data['benefits'].length; i++){
      switch (req.session.data['benefits'][i]){

       case "Incapacity Benefit, including National Insurance credits only" :  return res.redirect("exceptions"); next(); break;
       case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("exceptions"); next(); break;
       case "Severe Disablement Allowance" :  return res.redirect("exceptions"); next(); break;
       case "Income Support for illness or disability" :  return res.redirect("exceptions"); next(); break;
       case "Personal Independence Payment" :  return res.redirect("/live-4/cases/claim#your-tasks"); next(); break;
       case "none" :  return res.redirect("/live-4/cases/claim#your-tasks"); next(); break;
       default: continue;
       }
       break;
      }
     } else {

     }
    return res.redirect("/live-4/cases/claim#your-tasks"); next();
    })

    router.post('/live-4/cases/searchlight/benefits/check', function(req, res, next){ 

     if (req.session.data['benefits']){
      for (i = 0; i<req.session.data['benefits'].length; i++){
      switch (req.session.data['benefits'][i]){

       case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("exceptions"); next(); break;
       case "Severe Disablement Allowance" :  return res.redirect("exceptions"); next(); break;
       case "Income Support for illness or disability" :  return res.redirect("exceptions"); next(); break;
          case "Personal Independence Payment" :  return res.redirect("/live-4/cases/claim#your-tasks"); next(); break;
       case "none" :  return res.redirect("/live-4/cases/claim#your-tasks"); next(); break;
       default: continue;
       }
       break;
      }
     } else {

     }
    return res.redirect("/live-4/cases/claim#your-tasks"); next();
    })

    router.post('/live-4/cases/searchlight/benefits/check', function(req, res, next){ 

     if (req.session.data['benefits']){
      for (i = 0; i<req.session.data['benefits'].length; i++){
      switch (req.session.data['benefits'][i]){

       case "Severe Disablement Allowance" :  return res.redirect("exceptions"); next(); break;
       case "Income Support for illness or disability" :  return res.redirect("exceptions"); next(); break;
          case "Personal Independence Payment" :  return res.redirect("/live-4/cases/claim#your-tasks"); next(); break;
       case "none" :  return res.redirect("/live-4/cases/claim#your-tasks"); next(); break;
       default: continue;
       }
       break;
      }
     } else {

     }
    return res.redirect("/live-4/cases/claim#your-tasks"); next();
    })

    router.post('/live-4/cases/searchlight/benefits/check', function(req, res, next){ 

     if (req.session.data['benefits']){
      for (i = 0; i<req.session.data['benefits'].length; i++){
      switch (req.session.data['benefits'][i]){

       case "Income Support for illness or disability" :  return res.redirect("exceptions"); next(); break;
          case "Personal Independence Payment" :  return res.redirect("/live-4/cases/claim#your-tasks"); next(); break;
       case "none" :  return res.redirect("/live-4/cases/claim#your-tasks"); next(); break;
       default: continue;
       }
       break;
      }
     } else {

     }
    return res.redirect("/live-4/cases/claim#your-tasks"); next();
    })

    router.post('/live-4/cases/searchlight/benefits/check', function(req, res, next){ 

     if (req.session.data['benefits']){
      for (i = 0; i<req.session.data['benefits'].length; i++){
      switch (req.session.data['benefits'][i]){

       case "Personal Independence Payment" :  return res.redirect("/live-4/cases/claim#your-tasks"); next(); break;
       case "none" :  return res.redirect("/live-4/cases/claim#your-tasks"); next(); break;
       default: continue;
       }
       break;
      }
     } else {

     }
    return res.redirect("/live-4/cases/claim#your-tasks"); next();
    })
    router.post('/live-4/cases/searchlight/benefits/check', function(req, res, next){ 

     if (req.session.data['benefits']){
      for (i = 0; i<req.session.data['benefits'].length; i++){
      switch (req.session.data['benefits'][i]){

       case "none" :  return res.redirect("/live-4/cases/claim#your-tasks"); next(); break;
       default: continue;
       }
       break;
      }
     } else {

     }
    return res.redirect("/live-4/cases/claim#your-tasks"); next();
    })

module.exports = router
