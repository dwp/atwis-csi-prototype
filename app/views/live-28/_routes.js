const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line



//current
router.post('/cases/thomas/cases/check-application/mhss/details/answer', function(req, res, next){ 
if (req.session.data['mhss-support-check']){
  for (i = 0; i<req.session.data['mhss-support-check'].length; i++){
    switch (req.session.data['mhss-support-check'][i]){

 case "None of these" :  return res.redirect("support-service"); next(); break;
default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("end-date"); next();
})

router.post('/cases/sonya/cases/check-application/mhss/details/answer', function(req, res, next){ 
if (req.session.data['mhss-support-check']){
  for (i = 0; i<req.session.data['mhss-support-check'].length; i++){
    switch (req.session.data['mhss-support-check'][i]){

 case "None of these" :  return res.redirect("support-service"); next(); break;
default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("end-date"); next();
})



router.post('/cases/check-application/mhss/details/answer', function(req, res, next){ 
if (req.session.data['mhss-support-check']){
  for (i = 0; i<req.session.data['mhss-support-check'].length; i++){
    switch (req.session.data['mhss-support-check'][i]){

 case "None of these" :  return res.redirect("support-service"); next(); break;
default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("end-date"); next();
})

router.post('/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Incapacity Benefit, including National Insurance credits only" :  return res.redirect("/live-28/cases/searchlight/benefits/exceptions"); next(); break;
   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/live-28/cases/searchlight/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/live-28/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/live-28/cases/searchlight/benefits/exceptions"); next(); break;
   case "Personal Independence Payment" :  return res.redirect("/live-28/cases/claim#your-tasks"); next(); break;
   case "none" :  return res.redirect("/live-28/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-28/cases/claim#your-tasks"); next();
})

router.post('/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/live-28/cases/searchlight/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/live-28/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/live-28/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/live-28/cases/claim#your-tasks"); next(); break;
   case "none" :  return res.redirect("/live-28/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-28/cases/claim#your-tasks"); next();
})

router.post('/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Severe Disablement Allowance" :  return res.redirect("/live-28/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/live-28/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/live-28/cases/claim#your-tasks"); next(); break;
   case "none" :  return res.redirect("/live-28/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-28/cases/claim#your-tasks"); next();
})

router.post('/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Income Support for illness or disability" :  return res.redirect("/live-28/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/live-28/cases/claim#your-tasks"); next(); break;
   case "none" :  return res.redirect("/live-28/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-28/cases/claim#your-tasks"); next();
})

router.post('/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Personal Independence Payment" :  return res.redirect("/live-28/cases/claim#your-tasks"); next(); break;
   case "none" :  return res.redirect("/live-28/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-28/cases/claim#your-tasks"); next();
})
router.post('/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "none" :  return res.redirect("/live-28/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-28/cases/claim#your-tasks"); next();
})


module.exports = router
