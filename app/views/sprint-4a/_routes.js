const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

const minAllowedAge = 16;
const maxAllowedAge = 110;
const today = new Date(Date.now());

const faker = require('faker')
const moment = require('moment')

router.all('/service/dob-router', function(req, res, next){
  console.log("min age is " + minAllowedAge + "and max age is " + maxAllowedAge);
  console.log("today is " + today);
  var dob = new Date( req.session.data['date-year'], req.session.data['date-month'], req.session.data['date-day']);
console.log(dob);
  var ageDate =  new Date(today - dob.getTime());
  console.log(ageDate);
  var temp = ageDate.getFullYear();
var yrs = Math.abs(temp - 1970);
  if (yrs < minAllowedAge || yrs > maxAllowedAge) {
    return res.redirect ('sorry/cant_help_age');
  } else {
    return res.redirect('address');
  }


  next();


});

router.all('/service/paid-work-router', function(req, res, next){
  if (req.session.data['paid-work'] == "No") {
    return res.redirect ('sorry/cant_help_paid');
  } else {
    return res.redirect('interview-date');
  }


  next();


});


router.all('/service/interview-date-router', function(req, res, next){
  var interviewDate = new Date( req.session.data['interview-date-year'], req.session.data['interview-date-month'], req.session.data['interview-date-day']);
  if (interviewDate.getTime() < new Date().getTime()) {
    return res.redirect ('sorry/cant_help_date');
  } else {
    return res.redirect('interview-company-name');
  }


  next();


});

  router.get(`/atwis/your-cases`, (req, res) => {
    let showNotice = req.session.showNotice
    req.session.showNotice = false
    res.render(res.locals.folder + `/atwis/your-cases`, {
      cases: req.session.data['your-cases'],
      yourCases: true,
      showNotice: showNotice
    })
  })

  router.post(`/atwis/your-cases/`, (req, res) => {
    req.session.showNotice = req.session.data['your-cases'].length >= 5

    if (!req.session.showNotice) {
      req.session.data['your-cases'].push({
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
        specialism: 'Pan disability',
        type: 'New application',
        date: moment().format('D MMMM Y - HH:mm')
      })
    }
    res.redirect('your-cases')
  })


  router.get(`/atwis/your-cases`, (req, res) => {
    let showNotice = req.session.showNotice
    req.session.showNotice = false
    res.render(res.locals.folder + `/atwis/your-cases`, {
      cases: req.session.data['your-cases'],
      yourCases: true,
      showNotice: showNotice
    })
  })

  router.post(`/atwis/your-cases/`, (req, res) => {
    req.session.showNotice = req.session.data['your-cases'].length >= 5

    if (!req.session.showNotice) {
      req.session.data['your-cases'].push({
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
        specialism: 'Pan disability',
        type: 'New application',
        date: moment().format('D MMMM Y - HH:mm')
      })
    }
    res.redirect('your-cases')
  })





  router.get(`/atwis/your-cases-update`, (req, res) => {
    let showNotice = req.session.showNotice
    req.session.showNotice = false
    res.render(res.locals.folder + `/atwis/your-cases-update`, {
      cases: req.session.data['your-cases'],
      yourCases: true,
      showNotice: showNotice
    })
  })

  router.post(`/atwis/your-cases-update/`, (req, res) => {
    req.session.showNotice = req.session.data['your-cases'].length >= 5

    if (!req.session.showNotice) {
      req.session.data['your-cases'].push({
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
        specialism: 'Pan disability',
        type: 'New application',
        date: moment().format('D MMMM Y - HH:mm')
      })
    }
    res.redirect('your-cases-update')
  })

  router.get(`/atwis/case`, (req, res) => {
    console.log("render");
    res.render(res.locals.folder + `/atwis/case`, {
      specialisms: req.session.data.specialisms,
      advisers: req.session.data.advisers
    })
  })



  router.post(`/atwis/mark-as-complete`, (req, res) => {
    if (!req.body.copied) {
      res.render(res.locals.folder + `/atwis/mark-as-complete`, {
        error: true
      })
      return
    }

    if (req.body.copied === 'yes') {
      req.session.data['your-cases'].map((c, i, a) => {
        if (c.name === req.query.n) {
          a.splice(i, 1)
        }
      })

      res.redirect('your-cases')
    } else {
      res.redirect(`case?n=${req.query.n}#application`)
    }
  })

  router.get(`/atwis/unallocated`, (req, res) => {
    res.render(res.locals.folder + `/atwis/unallocated`, {
      cases: req.session.data['unallocated-cases'],
      Unallocated: true
    })
  })

  router.get(`/atwis/search`, (req, res) => {
    res.render(res.locals.folder + `/atwis/search`, {
      Search: true,
      cases: req.session.data['unallocated-cases'].filter(c => {
        if (req.session.data.q) return c.name.toLowerCase().indexOf(req.session.data.q.toLowerCase()) > -1
      })
    })
  })

//concepts stuff

/*
router.get(`/concepts/your-cases`, (req, res) => {
  let showNotice = req.session.showNotice
  req.session.showNotice = false
  res.render(res.locals.folder + `/concepts/your-cases`, {
    cases: req.session.data['your-cases'],
    yourCases: true,
    showNotice: showNotice
  })
})

router.post(`/concepts/your-cases/`, (req, res) => {
  req.session.showNotice = req.session.data['your-cases'].length >= 5

  if (!req.session.showNotice) {
    req.session.data['your-cases'].push({
      name: faker.name.firstName() + ' ' + faker.name.lastName(),
      specialism: 'Pan disability',
      type: 'New application',
      date: moment().format('D MMMM Y - HH:mm')
    })
  }
  res.redirect('your-cases')
})

router.get(`/concepts/your-cases`, (req, res) => {
  let showNotice = req.session.showNotice
  req.session.showNotice = false
  res.render(res.locals.folder + `/concepts/your-cases`, {
    cases: req.session.data['your-cases'],
    yourCases: true,
    showNotice: showNotice
  })
})

router.post(`/concepts/your-cases-interview/`, (req, res) => {
  req.session.showNotice = req.session.data['your-cases'].length >= 5

  if (!req.session.showNotice) {
    req.session.data['your-cases'].push({
      name: faker.name.firstName() + ' ' + faker.name.lastName(),
      specialism: 'Pan disability',
      type: 'New application',
      date: moment().format('D MMMM Y - HH:mm')
    })
  }
  res.redirect('your-cases-interview')
})

router.get(`/concepts/your-cases-interview`, (req, res) => {
  let showNotice = req.session.showNotice
  req.session.showNotice = false
  res.render(res.locals.folder + `/concepts/your-cases`, {
    cases: req.session.data['your-cases'],
    yourCases: true,
    interview: true,
    showNotice: showNotice
  })
})

router.post(`/concepts/your-cases-empty/`, (req, res) => {
  req.session.showNotice = req.session.data['your-cases'].length >= 5

  if (!req.session.showNotice) {
    req.session.data['your-cases'].push({
      name: faker.name.firstName() + ' ' + faker.name.lastName(),
      specialism: 'Pan disability',
      type: 'New application',
      date: moment().format('D MMMM Y - HH:mm')
    })
  }
  res.redirect('your-cases-empty')
})

*/

module.exports = router
