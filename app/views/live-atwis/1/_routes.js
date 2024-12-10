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


    if (startdate1 == "Another date" && fromsae1 == "Other"){
        response.redirect("/live-atwis/1/cases/check-application/sae/details/1/other")

    } if (startdate1 == "Another date"){
          response.redirect("/live-atwis/1/cases/check-application/sae/details/1/other")
    } else if (fromsae1 == "Other"){
          response.redirect("/live-atwis/1/cases/check-application/sae/details/1/other")
    } else {
        response.redirect("/live-atwis/1/cases/check-application/sae/details/1/sd-adding-1")
    }
})


router.post('/cases/check-application/sae/details/2/other-answer', function(request, response) {

    var startdate2 = request.session.data['sae-start-date2']
    var fromsae2 = request.session.data['from-sae2']


    if (startdate2 == "Another date" && fromsae2 == "Other"){
        response.redirect("/live-atwis/1/cases/check-application/sae/details/2/other")

    } if (startdate2 == "Another date"){
          response.redirect("/live-atwis/1/cases/check-application/sae/details/2/other")
    } else if (fromsae2 == "Other"){
          response.redirect("/live-atwis/1/cases/check-application/sae/details/2/other")
    } else {
        response.redirect("/live-atwis/1/cases/check-application/sae/details/2/sd-adding-1")
    }
})

router.post('/cases/check-application/sae/details/3/other-answer', function(request, response) {

    var startdate3 = request.session.data['sae-start-date3']
    var fromsae3 = request.session.data['from-sae3']


    if (startdate3 == "Another date" && fromsae2 == "Other"){
        response.redirect("/live-atwis/1/cases/check-application/sae/details/3/other")

    } if (startdate3 == "Another date"){
          response.redirect("/live-atwis/1/cases/check-application/sae/details/3/other")
    } else if (fromsae3 == "Other"){
          response.redirect("/live-atwis/1/cases/check-application/sae/details/3/other")
    } else {
        response.redirect("/live-atwis/1/cases/check-application/sae/details/3/sd-adding-1")
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

   case "Incapacity Benefit, including National Insurance credits only" :  return res.redirect("/live-atwis/1/cases/searchlight/benefits/exceptions"); next(); break;
   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/live-atwis/1/cases/searchlight/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/live-atwis/1/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/live-atwis/1/cases/searchlight/benefits/exceptions"); next(); break;
   case "Personal Independence Payment" :  return res.redirect("/live-atwis/1/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/live-atwis/1/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/claim#checks"); next();
})

router.post('/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/live-atwis/1/cases/searchlight/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/live-atwis/1/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/live-atwis/1/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/live-atwis/1/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/live-atwis/1/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/claim#checks"); next();
})

router.post('/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Severe Disablement Allowance" :  return res.redirect("/live-atwis/1/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/live-atwis/1/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/live-atwis/1/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/live-atwis/1/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/claim#checks"); next();
})

router.post('/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Income Support for illness or disability" :  return res.redirect("/live-atwis/1/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/live-atwis/1/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/live-atwis/1/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/claim#checks"); next();
})

router.post('/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Personal Independence Payment" :  return res.redirect("/live-atwis/1/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/live-atwis/1/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/claim#checks"); next();
})
router.post('/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "none" :  return res.redirect("/live-atwis/1/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/claim#checks"); next();
})





//searchlight check update

router.post('/cases/searchlight-change/benefits/', function(req, res, next){ 

 if (req.session.data['benefits-change']){
  for (i = 0; i<req.session.data['benefits-change'].length; i++){
  switch (req.session.data['benefits-change'][i]){

   case "Incapacity Benefit, including National Insurance credits only" :  return res.redirect("/live-atwis/1/cases/searchlight-change/benefits/exceptions"); next(); break;
   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/live-atwis/1/cases/searchlight-change/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/live-atwis/1/cases/searchlight-change/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/live-atwis/1/cases/searchlight-change/benefits/exceptions"); next(); break;
   case "Personal Independence Payment" :  return res.redirect("/live-atwis/1/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/live-atwis/1/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/claim#checks"); next();
})

router.post('/cases/searchlight-change/benefits/', function(req, res, next){ 

 if (req.session.data['benefits-change']){
  for (i = 0; i<req.session.data['benefits-change'].length; i++){
  switch (req.session.data['benefits-change'][i]){

   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/live-atwis/1/cases/searchlight-change/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/live-atwis/1/cases/searchlight-change/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/live-atwis/1/cases/searchlight-change/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/live-atwis/1/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/live-atwis/1/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/claim#checks"); next();
})

router.post('/cases/searchlight-change/benefits/', function(req, res, next){ 

 if (req.session.data['benefits-change']){
  for (i = 0; i<req.session.data['benefits-change'].length; i++){
  switch (req.session.data['benefits-change'][i]){

   case "Severe Disablement Allowance" :  return res.redirect("/live-atwis/1/cases/searchlight-change/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/live-atwis/1/cases/searchlight-change/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/live-atwis/1/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/live-atwis/1/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/claim#checks"); next();
})

router.post('/cases/searchlight-change/benefits/', function(req, res, next){ 

 if (req.session.data['benefits-change']){
  for (i = 0; i<req.session.data['benefits-change'].length; i++){
  switch (req.session.data['benefits-change'][i]){

   case "Income Support for illness or disability" :  return res.redirect("/live-atwis/1/cases/searchlight-change/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/live-atwis/1/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/live-atwis/1/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/claim#checks"); next();
})

router.post('/cases/searchlight-change/benefits/', function(req, res, next){ 

 if (req.session.data['benefits-change']){
  for (i = 0; i<req.session.data['benefits-change'].length; i++){
  switch (req.session.data['benefits-change'][i]){

   case "Personal Independence Payment" :  return res.redirect("/live-atwis/1/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/live-atwis/1/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/claim#checks"); next();
})
router.post('/cases/searchlight-change/benefits/', function(req, res, next){ 

 if (req.session.data['benefits-change']){
  for (i = 0; i<req.session.data['benefits-change'].length; i++){
  switch (req.session.data['benefits-change'][i]){

   case "none" :  return res.redirect("/live-atwis/1/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/claim#checks"); next();
})



router.post('/cases/john/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Incapacity Benefit, including National Insurance credits only" :  return res.redirect("/live-atwis/1/cases/john/cases/searchlight/benefits/exceptions"); next(); break;
   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/live-atwis/1/cases/john/cases/searchlight/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/live-atwis/1/cases/john/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/live-atwis/1/cases/john/cases/searchlight/benefits/exceptions"); next(); break;
   case "Personal Independence Payment" :  return res.redirect("/live-atwis/1/cases/john/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/live-atwis/1/cases/john/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/john/cases/claim#checks"); next();
})

router.post('/cases/john/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/live-atwis/1/cases/john/cases/searchlight/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/live-atwis/1/cases/john/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/live-atwis/1/cases/john/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/live-atwis/1/cases/john/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/live-atwis/1/cases/john/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/john/cases/claim#checks"); next();
})

router.post('/cases/john/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Severe Disablement Allowance" :  return res.redirect("/live-atwis/1/cases/john/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/live-atwis/1/cases/john/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/live-atwis/1/cases/john/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/live-atwis/1/cases/john/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/john/cases/claim#checks"); next();
})

router.post('/cases/john/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Income Support for illness or disability" :  return res.redirect("/live-atwis/1/cases/john/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/live-atwis/1/cases/john/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/live-atwis/1/cases/john/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/john/cases/claim#checks"); next();
})

router.post('/cases/john/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Personal Independence Payment" :  return res.redirect("/live-atwis/1/cases/john/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/live-atwis/1/cases/john/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/john/cases/claim#checks"); next();
})
router.post('/cases/john/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "none" :  return res.redirect("/live-atwis/1/cases/john/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/john/cases/claim#checks"); next();
})







router.post('/cases/sonya/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Incapacity Benefit, including National Insurance credits only" :  return res.redirect("/live-atwis/1/cases/sonya/cases/searchlight/benefits/exceptions"); next(); break;
   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/live-atwis/1/cases/sonya/cases/searchlight/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/live-atwis/1/cases/sonya/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/live-atwis/1/cases/sonya/cases/searchlight/benefits/exceptions"); next(); break;
   case "Personal Independence Payment" :  return res.redirect("/live-atwis/1/cases/sonya/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/live-atwis/1/cases/sonya/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/sonya/cases/claim#checks"); next();
})

router.post('/cases/sonya/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/live-atwis/1/cases/sonya/cases/searchlight/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/live-atwis/1/cases/sonya/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/live-atwis/1/cases/sonya/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/live-atwis/1/cases/sonya/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/live-atwis/1/cases/sonya/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/sonya/cases/claim#checks"); next();
})

router.post('/cases/sonya/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Severe Disablement Allowance" :  return res.redirect("/live-atwis/1/cases/sonya/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/live-atwis/1/cases/sonya/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/live-atwis/1/cases/sonya/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/live-atwis/1/cases/sonya/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/sonya/cases/claim#checks"); next();
})

router.post('/cases/sonya/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Income Support for illness or disability" :  return res.redirect("/live-atwis/1/cases/sonya/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/live-atwis/1/cases/sonya/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/live-atwis/1/cases/sonya/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/sonya/cases/claim#checks"); next();
})

router.post('/cases/sonya/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Personal Independence Payment" :  return res.redirect("/live-atwis/1/cases/sonya/cases/claim#checks"); next(); break;
   case "none" :  return res.redirect("/live-atwis/1/cases/sonya/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/sonya/cases/claim#checks"); next();
})
router.post('/cases/sonya/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "none" :  return res.redirect("/live-atwis/1/cases/sonya/cases/claim#checks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-atwis/1/cases/sonya/cases/claim#checks"); next();
})

module.exports = router
