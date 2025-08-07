const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// // REVIEW:
//searchlight check update


//current

// SAE anotehr start date and someone else routes

router.post('/cases/check-application/sae/details/1/other-answer', function(request, response) {

    var startdate1 = request.session.data['sae-start-date1']
    var fromsae1 = request.session.data['from-sae1']


    if (startdate1 == "Another date" && fromsae1 == "Someone else"){
        response.redirect("/current/cases/check-application/sae/details/1/other")

    } if (startdate1 == "Another date"){
          response.redirect("/current/cases/check-application/sae/details/1/other")
    } else if (fromsae1 == "Someone else"){
          response.redirect("/current/cases/check-application/sae/details/1/other")
    } else {
        response.redirect("/current/cases/check-application/sae/details/1/sd-adding-1")
    }
})


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

   case "Incapacity Benefit, including National Insurance credits only" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Personal Independence Payment" :  return res.redirect("/current/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/current/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/claim#checks"); next();
})

router.post('/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/current/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/current/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/claim#checks"); next();
})

router.post('/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Severe Disablement Allowance" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/current/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/current/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/claim#checks"); next();
})

router.post('/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/current/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/current/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/claim#checks"); next();
})

router.post('/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Personal Independence Payment" :  return res.redirect("/current/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/current/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/claim#checks"); next();
})
router.post('/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "none" :  return res.redirect("/current/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/claim#checks"); next();
})





//searchlight check update

router.post('/cases/searchlight-change/benefits/', function(req, res, next){ 

 if (req.session.data['benefits-change']){
  for (i = 0; i<req.session.data['benefits-change'].length; i++){
  switch (req.session.data['benefits-change'][i]){

   case "Incapacity Benefit, including National Insurance credits only" :  return res.redirect("/current/cases/searchlight-change/benefits/exceptions"); next(); break;
   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/current/cases/searchlight-change/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/current/cases/searchlight-change/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight-change/benefits/exceptions"); next(); break;
   case "Personal Independence Payment" :  return res.redirect("/current/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/current/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/claim#checks"); next();
})

router.post('/cases/searchlight-change/benefits/', function(req, res, next){ 

 if (req.session.data['benefits-change']){
  for (i = 0; i<req.session.data['benefits-change'].length; i++){
  switch (req.session.data['benefits-change'][i]){

   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/current/cases/searchlight-change/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/current/cases/searchlight-change/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight-change/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/current/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/current/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/claim#checks"); next();
})

router.post('/cases/searchlight-change/benefits/', function(req, res, next){ 

 if (req.session.data['benefits-change']){
  for (i = 0; i<req.session.data['benefits-change'].length; i++){
  switch (req.session.data['benefits-change'][i]){

   case "Severe Disablement Allowance" :  return res.redirect("/current/cases/searchlight-change/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight-change/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/current/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/current/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/claim#checks"); next();
})

router.post('/cases/searchlight-change/benefits/', function(req, res, next){ 

 if (req.session.data['benefits-change']){
  for (i = 0; i<req.session.data['benefits-change'].length; i++){
  switch (req.session.data['benefits-change'][i]){

   case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight-change/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/current/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/current/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/claim#checks"); next();
})

router.post('/cases/searchlight-change/benefits/', function(req, res, next){ 

 if (req.session.data['benefits-change']){
  for (i = 0; i<req.session.data['benefits-change'].length; i++){
  switch (req.session.data['benefits-change'][i]){

   case "Personal Independence Payment" :  return res.redirect("/current/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/current/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/claim#checks"); next();
})
router.post('/cases/searchlight-change/benefits/', function(req, res, next){ 

 if (req.session.data['benefits-change']){
  for (i = 0; i<req.session.data['benefits-change'].length; i++){
  switch (req.session.data['benefits-change'][i]){

   case "none" :  return res.redirect("/current/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/claim#checks"); next();
})



router.post('/cases/john/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Incapacity Benefit, including National Insurance credits only" :  return res.redirect("/current/cases/john/cases/searchlight/benefits/exceptions"); next(); break;
   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/current/cases/john/cases/searchlight/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/current/cases/john/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/current/cases/john/cases/searchlight/benefits/exceptions"); next(); break;
   case "Personal Independence Payment" :  return res.redirect("/current/cases/john/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/current/cases/john/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/john/cases/claim#checks"); next();
})

router.post('/cases/john/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/current/cases/john/cases/searchlight/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/current/cases/john/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/current/cases/john/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/current/cases/john/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/current/cases/john/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/john/cases/claim#checks"); next();
})

router.post('/cases/john/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Severe Disablement Allowance" :  return res.redirect("/current/cases/john/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/current/cases/john/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/current/cases/john/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/current/cases/john/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/john/cases/claim#checks"); next();
})

router.post('/cases/john/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Income Support for illness or disability" :  return res.redirect("/current/cases/john/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/current/cases/john/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/current/cases/john/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/john/cases/claim#checks"); next();
})

router.post('/cases/john/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Personal Independence Payment" :  return res.redirect("/current/cases/john/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/current/cases/john/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/john/cases/claim#checks"); next();
})
router.post('/cases/john/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "none" :  return res.redirect("/current/cases/john/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/john/cases/claim#checks"); next();
})







router.post('/cases/sonya/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Incapacity Benefit, including National Insurance credits only" :  return res.redirect("/current/cases/sonya/cases/searchlight/benefits/exceptions"); next(); break;
   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/current/cases/sonya/cases/searchlight/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/current/cases/sonya/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/current/cases/sonya/cases/searchlight/benefits/exceptions"); next(); break;
   case "Personal Independence Payment" :  return res.redirect("/current/cases/sonya/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/current/cases/sonya/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/sonya/cases/claim#checks"); next();
})

router.post('/cases/sonya/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/current/cases/sonya/cases/searchlight/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/current/cases/sonya/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/current/cases/sonya/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/current/cases/sonya/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/current/cases/sonya/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/sonya/cases/claim#checks"); next();
})

router.post('/cases/sonya/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Severe Disablement Allowance" :  return res.redirect("/current/cases/sonya/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/current/cases/sonya/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/current/cases/sonya/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/current/cases/sonya/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/sonya/cases/claim#checks"); next();
})

router.post('/cases/sonya/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Income Support for illness or disability" :  return res.redirect("/current/cases/sonya/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/current/cases/sonya/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/current/cases/sonya/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/sonya/cases/claim#checks"); next();
})

router.post('/cases/sonya/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Personal Independence Payment" :  return res.redirect("/current/cases/sonya/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/current/cases/sonya/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/sonya/cases/claim#checks"); next();
})
router.post('/cases/sonya/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "none" :  return res.redirect("/current/cases/sonya/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/sonya/cases/claim#checks"); next();
})

module.exports = router
