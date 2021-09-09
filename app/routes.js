const express = require('express')
const router = express.Router()

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
router.use('/current', require('./views/current/_routes'));
module.exports = router
