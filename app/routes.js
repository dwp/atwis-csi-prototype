const express = require('express')
const router = express.Router()
const radioButtonRedirect = require('radio-button-redirect')
router.use(radioButtonRedirect)

const faker = require('faker')
const moment = require('moment')
// Add your routes here - above the module.exports line

function create(){
//alert();
    count++;
    document.getElementById('addTextFeild').innerHTML+='<br/><input type="text" id="'+count+'" placeholder="Input Field'+count+'"  /><br/>';
    e.prventDefault();
}




// Add your routes here - above the module.exports line
// GET SPRINT NAME - useful for relative templates
router.use('/', (req, res, next) => {
  req.folder = req.originalUrl.split('/')[1];
  req.subfolder = req.originalUrl.split('/')[2];
  res.locals.currentURL = req.originalUrl;
  res.locals.prevURL = req.get('Referrer');
  res.locals.folder = req.folder;
  res.locals.subfolder = req.subfolder;
  res.locals.name = req.query.n
  res.locals.unallocated = req.query.ua

  console.log('folder : ' + res.locals.folder + ', subfolder : ' + res.locals.subfolder  );
  console.log('previous page is: ' + res.locals.prevURL + " and current page is " + req.url + " " + res.locals.currentURL );
  next();
});

// const newKey = 'change-address-line-1';
// const keysToClear = ['benefits'];
// if (keysToClear.includes(newKey)) {
//   delete sessionData.benefits;
// }
//
// const newKey = 'change-address-line-1';
// const sessionData = {
//   benefits: 'No',
// };
//
// if (newKey === 'change-address-line-1') {
//   delete sessionData.benefits;
// }




// Start folder specific routes
router.use('/baseline', require('./views/current/_routes'));
router.use('/future', require('./views/future/_routes'));
router.use('/usability', require('./views/usability/_routes'));
router.use('/current', require('./views/current/_routes'));
router.use('/live-19', require('./views/live-19/_routes'));
router.use('/live-13', require('./views/live-13/_routes'));
router.use('/live-12', require('./views/live-12/_routes'));
router.use('/live-11', require('./views/live-11/_routes'));
router.use('/live-10', require('./views/live-10/_routes'));
router.use('/live-9', require('./views/live-9/_routes'));
router.use('/live-8', require('./views/live-8/_routes'));
router.use('/live-7', require('./views/live-7/_routes'));
router.use('/live-6', require('./views/live-6/_routes'));
router.use('/live-5', require('./views/live-5/_routes'));
router.use('/live-4', require('./views/live-4/_routes'));
router.use('/live-3', require('./views/live-3/_routes'));
router.use('/live-3-v2', require('./views/live-3-v2/_routes'));


router.use('/live-1', require('./views/live-1/_routes'));
router.use('/sprint-13', require('./views/sprint-13/_routes'));
router.use('/V12', require('./views/V12/_routes'));
router.use('/sprint-baseline', require('./views/sprint-baseline/_routes'));
router.use('/sprint-4', require('./views/sprint-4/_routes'));
router.use('/sprint-4a', require('./views/sprint-4a/_routes'));
router.use('/sprint-5', require('./views/sprint-5/_routes'));
router.use('/sprint-6', require('./views/sprint-6/_routes'));
router.use('/sprint-7', require('./views/sprint-7/_routes'));
router.use('/sprint-8', require('./views/sprint-8/_routes'));
router.use('/sprint-9', require('./views/sprint-9/_routes'));
router.use('/sprint-10', require('./views/sprint-10/_routes'));
router.use('/sprint-10b', require('./views/sprint-10b/_routes'));
router.use('/sprint-11', require('./views/sprint-11/_routes'));
router.use('/sprint-11b', require('./views/sprint-11b/_routes'));
router.use('/sprint-12', require('./views/sprint-12/_routes'));
router.use('/sprint-12b', require('./views/sprint-12b/_routes'));
// current sprint, remember to add older sprint when adding a new folder!
// router.use('/current', require('./views/current/_routes'));


router.post('/current/cases/workplace-assesment/answer', function(req, res, next){ 

 if (req.session.data['report']){
  for (i = 0; i<req.session.data['report'].length; i++){
  switch (req.session.data['report'][i]){

   case "Another workplace assesment needed" :  return res.redirect("/current/cases/claim#business-case"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/workplace-assesment/wpa-report/date-of-assessment"); next();
})






router.post('/contact-answer-john', function(req, res, next){ 
if (req.session.data['contact-why'] && Array.isArray(req.session.data['contact-why'])){
  for (let i = 0; i<req.session.data['contact-why'].length; i++) {
    if (req.session.data['contact-why'][i]=="Other") {
      return res.redirect("/current/cases/john/cases/contact/1/other")
  }
  }
}
return res.redirect("/current/cases/john/cases/claim#contact");
});

router.post('/contact-answer-arlo', function(req, res, next){

if (req.session.data['contact-why']) {
  if (req.session.data['contact-why'].includes("Other")){
    res.redirect("/current/cases/arlo/cases/contact/1/other");
  } else {
  }
  return res.redirect("/current/cases/arlo/cases/claim#contact"); next();
  }
  })


router.post('/contact-answer-', function(req, res, next){

if (req.session.data['contact-why']) {
  if (req.session.data['contact-why'].includes("Other")){
    res.redirect("/current/cases/contact/1/other");
  } else {
  }
  return res.redirect("/current/cases/claim#contact"); next();
  }
  })

  router.post('/contact-answer-thomas', function(req, res, next){

  if (req.session.data['contact-why']) {
    if (req.session.data['contact-why'].includes("Other")){
      res.redirect("/current/cases/thomas/cases/contact/1/other");
    } else {
    }
    return res.redirect("/current/cases/thomas/cases/claim#contact"); next();
    }
    })

    router.post('/contact-answer-thomas', function(req, res, next){

    if (req.session.data['contact-why']) {
      if (req.session.data['contact-why'].includes("Other")){
        res.redirect("/current/cases/thomas/cases/contact/1/other");
      } else {
      }
      return res.redirect("/current/cases/thomas/cases/claim#contact"); next();
      }
      })

      router.post('/contact-answer-sonya', function(req, res, next){

      if (req.session.data['contact-why']) {
        if (req.session.data['contact-why'].includes("Other")){
          res.redirect("/current/cases/thomas/cases/contact/1/other");
        } else {
        }
        return res.redirect("/current/cases/thomas/cases/claim#contact"); next();
        }
        })

  router.post('/test', function(req, res, next){ 

   if (req.session.data['waste']){
    for (i = 0; i<req.session.data['waste'].length; i++){
    switch (req.session.data['waste'][i]){

     case "carcasses" :  return res.redirect("url1"); next(); break;
     case "mines" :  return res.redirect("url2"); next(); break;
     case "farm" :  return res.redirect("url3"); next(); break;
     case "none" :  return res.redirect("check-your-answers"); next(); break;
     default: continue;
     }
     break;
    }
   } else {

   }
  return res.redirect("check-your-answers"); next();
  })

  router.post('/test', function(req, res, next){ 

   if (req.session.data['waste']){
    for (i = 0; i<req.session.data['waste'].length; i++){
    switch (req.session.data['waste'][i]){

     case "mines" :  return res.redirect("url2"); next(); break;
     case "farm" :  return res.redirect("url3"); next(); break;
     case "none" :  return res.redirect("check-your-answers"); next(); break;
     default: continue;
     }
     break;
    }
   } else {

   }
  return res.redirect("check-your-answers"); next();
  })

  router.post('/test', function(req, res, next){ 

   if (req.session.data['waste']){
    for (i = 0; i<req.session.data['waste'].length; i++){
    switch (req.session.data['waste'][i]){

     case "farm" :  return res.redirect("url3"); next(); break;
     case "none" :  return res.redirect("check-your-answers"); next(); break;
     default: continue;
     }
     break;
    }
   } else {

   }
  return res.redirect("check-your-answers"); next();
  })

  router.post('/test', function(req, res, next){ 

   if (req.session.data['waste']){
    for (i = 0; i<req.session.data['waste'].length; i++){
    switch (req.session.data['waste'][i]){

     case "none" :  return res.redirect("check-your-answers"); next(); break;
     default: continue;
     }
     break;
    }
   } else {

   }
  return res.redirect("check-your-answers"); next();
  })







  router.post('/benefits', function(req, res, next){
   if (req.session.data['benefits']){
    for (i = 0; i<req.session.data['benefits'].length; i++){
    switch (req.session.data['benefits'][i]){
     case "Employment and Support Allowance" :  return res.redirect("/alpha-apply-1d/1d-esa"); next(); break;
     case "Incapacity Benefit" :  return res.redirect("/alpha-apply-1d/1d-you-may-be-eligible-blue"); next(); break;
     case "Income Support" :  return res.redirect("/alpha-apply-1d/1d-you-may-be-eligible-blue"); next(); break;
     case "Severe Disability Allowance" :  return res.redirect("/alpha-apply-1d/1d-you-may-be-eligible-blue"); next(); break;
     case "None of these" :  return res.redirect("/alpha-apply-1d/1d-you-may-be-eligible-blue"); next(); break;
     default: continue;
     }
     break;
    }
   } else {
   }
  return res.redirect("/alpha-apply-1d/1d-you-may-be-eligible-blue"); next();
  })
  router.post('/benefits', function(req, res, next){
   if (req.session.data['benefits']){
    for (i = 0; i<req.session.data['benefits'].length; i++){
    switch (req.session.data['benefits'][i]){
     case "Incapacity Benefit" :  return res.redirect("/alpha-apply-1d/1d-you-may-be-eligible-blue"); next(); break;
     case "Income Support" :  return res.redirect("/alpha-apply-1d/1d-you-may-be-eligible-blue"); next(); break;
     case "Income Support" :  return res.redirect("/alpha-apply-1d/1d-you-may-be-eligible-blue"); next(); break;
     case "None of these" :  return res.redirect("/alpha-apply-1d/1d-you-may-be-eligible-blue"); next(); break;
     default: continue;
     }
     break;
    }
   } else {
   }
  return res.redirect("/alpha-apply-1d/1d-you-may-be-eligible-blue"); next();
  })
  router.post('/benefits', function(req, res, next){
   if (req.session.data['benefits']){
    for (i = 0; i<req.session.data['benefits'].length; i++){
    switch (req.session.data['benefits'][i]){
     case "Income Support" :  return res.redirect("alpha-apply-1d/1d-you-may-be-eligible-blue"); next(); break;
     case "None of these" :  return res.redirect("alpha-apply-1d/1d-you-may-be-eligible-blue"); next(); break;
     default: continue;
     }
     break;
    }
   } else {
   }
  return res.redirect("/alpha-apply-1d/1d-you-may-be-eligible-blue"); next();
  })
  router.post('/benefits', function(req, res, next){
   if (req.session.data['benefits']){
    for (i = 0; i<req.session.data['benefits'].length; i++){
    switch (req.session.data['benefits'][i]){
     case "None of these" :  return res.redirect("alpha-apply-1d/1d-you-may-be-eligible-blue"); next(); break;
     default: continue;
     }
     break;
    }
   } else {
   }
  return res.redirect("/alpha-apply-1d/1d-you-may-be-eligible-blue"); next();
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



module.exports = router
