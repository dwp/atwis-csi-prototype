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



// Start folder specific routes

router.use('/live-4', require('./views/live-4/_routes'));
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



//future


router.post('/future/cases/searchlight/benefits/check', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Incapacity Benefit, including National Insurance credits only" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Personal Independence Payment" :  return res.redirect("/future/cases/claim#your-tasks"); next(); break;
   case "none" :  return res.redirect("/future/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/future/cases/claim#your-tasks"); next();
})

router.post('/future/cases/searchlight/benefits/check', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/future/cases/claim#your-tasks"); next(); break;
   case "none" :  return res.redirect("/future/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/future/cases/claim#your-tasks"); next();
})

router.post('/future/cases/searchlight/benefits/check', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Severe Disablement Allowance" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/future/cases/claim#your-tasks"); next(); break;
   case "none" :  return res.redirect("/future/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/future/cases/claim#your-tasks"); next();
})

router.post('/future/cases/searchlight/benefits/check', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/future/cases/claim#your-tasks"); next(); break;
   case "none" :  return res.redirect("/future/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/future/cases/claim#your-tasks"); next();
})

router.post('/future/cases/searchlight/benefits/check', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Personal Independence Payment" :  return res.redirect("/future/cases/claim#your-tasks"); next(); break;
   case "none" :  return res.redirect("/future/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/future/cases/claim#your-tasks"); next();
})
router.post('/future/cases/searchlight/benefits/check', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "none" :  return res.redirect("/future/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/future/cases/claim#your-tasks"); next();
})

//current
router.post('/current/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Incapacity Benefit, including National Insurance credits only" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Personal Independence Payment" :  return res.redirect("/current/cases/claim#your-tasks"); next(); break;
   case "none" :  return res.redirect("/current/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/claim#your-tasks"); next();
})

router.post('/current/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/current/cases/claim#your-tasks"); next(); break;
   case "none" :  return res.redirect("/current/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/claim#your-tasks"); next();
})

router.post('/current/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Severe Disablement Allowance" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/current/cases/claim#your-tasks"); next(); break;
   case "none" :  return res.redirect("/current/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/claim#your-tasks"); next();
})

router.post('/current/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/current/cases/claim#your-tasks"); next(); break;
   case "none" :  return res.redirect("/current/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/claim#your-tasks"); next();
})

router.post('/current/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Personal Independence Payment" :  return res.redirect("/current/cases/claim#your-tasks"); next(); break;
   case "none" :  return res.redirect("/current/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/claim#your-tasks"); next();
})
router.post('/current/cases/searchlight/benefits/', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "none" :  return res.redirect("/current/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/current/cases/claim#your-tasks"); next();
})

//live-6

router.post('/live-6/cases/searchlight/benefits/check', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Incapacity Benefit, including National Insurance credits only" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Personal Independence Payment" :  return res.redirect("/live-6/cases/claim#your-tasks"); next(); break;
   case "none" :  return res.redirect("/live-6/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-6/cases/claim#your-tasks"); next();
})

router.post('/live-6/cases/searchlight/benefits/check', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Severe Disablement Allowance" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/live-6/cases/claim#your-tasks"); next(); break;
   case "none" :  return res.redirect("/live-6/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-6/cases/claim#your-tasks"); next();
})

router.post('/live-6/cases/searchlight/benefits/check', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Severe Disablement Allowance" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
   case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/live-6/cases/claim#your-tasks"); next(); break;
   case "none" :  return res.redirect("/live-6/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-6/cases/claim#your-tasks"); next();
})

router.post('/live-6/cases/searchlight/benefits/check', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
      case "Personal Independence Payment" :  return res.redirect("/live-6/cases/claim#your-tasks"); next(); break;
   case "none" :  return res.redirect("/live-6/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-6/cases/claim#your-tasks"); next();
})

router.post('/live-6/cases/searchlight/benefits/check', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "Personal Independence Payment" :  return res.redirect("/live-6/cases/claim#your-tasks"); next(); break;
   case "none" :  return res.redirect("/live-6/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-6/cases/claim#your-tasks"); next();
})
router.post('/live-6/cases/searchlight/benefits/check', function(req, res, next){ 

 if (req.session.data['benefits']){
  for (i = 0; i<req.session.data['benefits'].length; i++){
  switch (req.session.data['benefits'][i]){

   case "none" :  return res.redirect("/live-6/cases/claim#your-tasks"); next(); break;
   default: continue;
   }
   break;
  }
 } else {

 }
return res.redirect("/live-6/cases/claim#your-tasks"); next();
})



//live-3

  router.post('/live-3-v2/cases/searchlight/benefits/check', function(req, res, next){ 

   if (req.session.data['benefits']){
    for (i = 0; i<req.session.data['benefits'].length; i++){
    switch (req.session.data['benefits'][i]){

     case "Incapacity Benefit, including National Insurance credits only" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
     case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
     case "Severe Disablement Allowance" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
     case "Income Support for illness" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
     case "none" :  return res.redirect("/live-3-v2/cases/claim#your-tasks"); next(); break;
     default: continue;
     }
     break;
    }
   } else {

   }
  return res.redirect("/live-3-v2/cases/claim#your-tasks"); next();
  })

  router.post('/live-3-v2/cases/searchlight/benefits/check', function(req, res, next){ 

   if (req.session.data['benefits']){
    for (i = 0; i<req.session.data['benefits'].length; i++){
    switch (req.session.data['benefits'][i]){

     case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
     case "Severe Disablement Allowance" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
     case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
     case "none" :  return res.redirect("/live-3-v2/cases/claim#your-tasks"); next(); break;
     default: continue;
     }
     break;
    }
   } else {

   }
  return res.redirect("/live-3-v2/cases/claim#your-tasks"); next();
  })

  router.post('/live-3-v2/cases/searchlight/benefits/check', function(req, res, next){ 

   if (req.session.data['benefits']){
    for (i = 0; i<req.session.data['benefits'].length; i++){
    switch (req.session.data['benefits'][i]){

     case "Severe Disablement Allowance" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
     case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
     case "none" :  return res.redirect("/live-3-v2/cases/claim#your-tasks"); next(); break;
     default: continue;
     }
     break;
    }
   } else {

   }
  return res.redirect("/live-3-v2/cases/claim#your-tasks"); next();
  })

  router.post('/live-3-v2/cases/searchlight/benefits/check', function(req, res, next){ 

   if (req.session.data['benefits']){
    for (i = 0; i<req.session.data['benefits'].length; i++){
    switch (req.session.data['benefits'][i]){

     case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
     case "none" :  return res.redirect("/live-3-v2/cases/claim#your-tasks"); next(); break;
     default: continue;
     }
     break;
    }
   } else {

   }
  return res.redirect("/live-3-v2/cases/claim#your-tasks"); next();
  })

  router.post('/live-3-v2/cases/searchlight/benefits/check', function(req, res, next){ 

   if (req.session.data['benefits']){
    for (i = 0; i<req.session.data['benefits'].length; i++){
    switch (req.session.data['benefits'][i]){

     case "none" :  return res.redirect("/live-3-v2/cases/claim#your-tasks"); next(); break;
     default: continue;
     }
     break;
    }
   } else {

   }
  return res.redirect("/live-3-v2/cases/claim#your-tasks"); next();
  })



  router.post('/live-3/cases/searchlight/benefits/check', function(req, res, next){ 

   if (req.session.data['benefits']){
    for (i = 0; i<req.session.data['benefits'].length; i++){
    switch (req.session.data['benefits'][i]){

     case "Incapacity Benefit, including National Insurance credits only" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
     case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
     case "Severe Disablement Allowance" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
     case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
     case "none" :  return res.redirect("/live-3/cases/claim#your-tasks"); next(); break;
     default: continue;
     }
     break;
    }
   } else {

   }
  return res.redirect("/live-3/cases/claim#your-tasks"); next();
  })

  router.post('/live-3/cases/searchlight/benefits/check', function(req, res, next){ 

   if (req.session.data['benefits']){
    for (i = 0; i<req.session.data['benefits'].length; i++){
    switch (req.session.data['benefits'][i]){

     case "Employment and Support Allowance, including National Insurance credits only" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
     case "Severe Disablement Allowance" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
     case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
     case "none" :  return res.redirect("/live-3/cases/claim#your-tasks"); next(); break;
     default: continue;
     }
     break;
    }
   } else {

   }
  return res.redirect("/live-3/cases/claim#your-tasks"); next();
  })

  router.post('/live-3/cases/searchlight/benefits/check', function(req, res, next){ 

   if (req.session.data['benefits']){
    for (i = 0; i<req.session.data['benefits'].length; i++){
    switch (req.session.data['benefits'][i]){

     case "Severe Disablement Allowance" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
     case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
     case "none" :  return res.redirect("/live-3/cases/claim#your-tasks"); next(); break;
     default: continue;
     }
     break;
    }
   } else {

   }
  return res.redirect("/live-3/cases/claim#your-tasks"); next();
  })

  router.post('/live-3/cases/searchlight/benefits/check', function(req, res, next){ 

   if (req.session.data['benefits']){
    for (i = 0; i<req.session.data['benefits'].length; i++){
    switch (req.session.data['benefits'][i]){

     case "Income Support for illness or disability" :  return res.redirect("/current/cases/searchlight/benefits/exceptions"); next(); break;
     case "none" :  return res.redirect("/live-3/cases/claim#your-tasks"); next(); break;
     default: continue;
     }
     break;
    }
   } else {

   }
  return res.redirect("/live-3/cases/claim#your-tasks"); next();
  })

  router.post('/live-3/cases/searchlight/benefits/check', function(req, res, next){ 

   if (req.session.data['benefits']){
    for (i = 0; i<req.session.data['benefits'].length; i++){
    switch (req.session.data['benefits'][i]){

     case "none" :  return res.redirect("/live-3/cases/claim#your-tasks"); next(); break;
     default: continue;
     }
     break;
    }
   } else {

   }
  return res.redirect("/live-3/cases/claim#your-tasks"); next();
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
module.exports = router
