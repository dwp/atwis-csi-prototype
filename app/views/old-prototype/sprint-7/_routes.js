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


router.all('/agreed/csi/claim-router', function(req, res, next){
console.log('router');
if (req.session.data['company-email-address-change'] ) {
req.session.data['csi-info'][1]['company-email-address'] = req.session.data['company-email-address-change'];
console.log('company-email-address changed to ' + req.session.data['company-email-address-change'] );
delete req.session.data['company-email-address-change'];
}

if (req.session.data['support-worker-pay-change'] ) {
req.session.data['csi-info'][1]['support-worker-pay'] = req.session.data['support-worker-pay-change'];
console.log('support-worker-pay changed to ' + req.session.data['support-worker-pay-change'] );
delete req.session.data['support-worker-pay-change'];
}

if (req.session.data['firstname-change'] ) {
req.session.data['csi-info'][1]['firstname'] = req.session.data['firstname-change'];
console.log('firstname changed to ' + req.session.data['firstname-change'] );
delete req.session.data['firstname-change'];
}

if (req.session.data['surname-change'] ) {
req.session.data['csi-info'][1]['surname'] = req.session.data['surname-change'];
console.log('surname changed to ' + req.session.data['surname-change'] );
delete req.session.data['surname-change'];
}

if (req.session.data['dob-change-day'] ) {
req.session.data['csi-info'][1]['dob-day'] = req.session.data['dob-change-day'];
console.log('dob-day changed to ' + req.session.data['dob-change-day'] );
delete req.session.data['dob-change-day'];
}

if (req.session.data['dob-change-month'] ) {
req.session.data['csi-info'][1]['dob-month'] = req.session.data['dob-change-month'];
console.log('dob-month changed to ' + req.session.data['dob-change-month'] );
delete req.session.data['dob-change-month'];
}

if (req.session.data['dob-change-year'] ) {
req.session.data['csi-info'][1]['dob-year'] = req.session.data['dob-change-year'];
console.log('dob-year changed to ' + req.session.data['dob-change-year'] );
delete req.session.data['dob-change-year'];
}

/*if (req.session.data['address-line-1-change'] ) {
req.session.data['csi-info'][1]['address-line-1'] = req.session.data['address-line-1-change'];
console.log('address-line-1 changed to ' + req.session.data['address-line-1-change'] );
delete req.session.data['address-line-1-change'];
}*/

if (req.session.data['address-line-one-change'] ) {
req.session.data['csi-info'][1]['address-line-one'] = req.session.data['address-line-one-change'];
console.log('address-line-one changed to ' + req.session.data['address-line-one-change'] );
delete req.session.data['address-line-one-change'];
}

if (req.session.data['address-town-change'] ) {
req.session.data['csi-info'][1]['address-town'] = req.session.data['address-town-change'];
console.log('address-town changed to ' + req.session.data['address-town-change'] );
delete req.session.data['address-town-change'];
}

if (req.session.data['address-county-change'] ) {
req.session.data['csi-info'][1]['address-county'] = req.session.data['address-county-change'];
console.log('address-county changed to ' + req.session.data['address-county-change'] );
delete req.session.data['address-county-change'];
}

if (req.session.data['address-postcode-change'] ) {
req.session.data['csi-info'][1]['address-postcode'] = req.session.data['address-postcode-change'];
console.log('address-postcode changed to ' + req.session.data['address-postcode-change'] );
delete req.session.data['address-postcode-change'];
}

if (req.session.data['contact-by-email-change'] ) {
req.session.data['csi-info'][1]['contact-by-email'] = req.session.data['contact-by-email-change'];
console.log('contact-by-email changed to ' + req.session.data['contact-by-email-change'] );
delete req.session.data['contact-by-email-change'];
}

if (req.session.data['contact-by-phone-change'] ) {
req.session.data['csi-info'][1]['contact-by-phone'] = req.session.data['contact-by-phone-change'];
console.log('contact-by-phone changed to ' + req.session.data['contact-by-phone-change'] );
delete req.session.data['contact-by-phone-change'];
}


//company details

if (req.session.data['company-name-change'] ) {
req.session.data['csi-info'][1]['company-name'] = req.session.data['company-name-change'];
console.log('company-name changed to ' + req.session.data['company-name-change'] );
delete req.session.data['company-name-change'];
}

if (req.session.data['interviewer-name-change'] ) {
req.session.data['csi-info'][1]['interviewer-name'] = req.session.data['interviewer-name-change'];
console.log('interviewer-name changed to ' + req.session.data['interviewer-name-change'] );
delete req.session.data['interviewer-name-change'];
}

if (req.session.data['company-phone-change'] ) {
req.session.data['csi-info'][1]['company-phone'] = req.session.data['company-phone-change'];
console.log('company-phone changed to ' + req.session.data['company-phone-change'] );
delete req.session.data['company-phone-change'];
}

if (req.session.data['company-address-line-one-change'] ) {
req.session.data['csi-info'][1]['company-address-line-one'] = req.session.data['company-address-line-one-change'];
console.log('company-address-line-one changed to ' + req.session.data['company-address-line-one-change'] );
delete req.session.data['company-address-line-one-change'];
}

if (req.session.data['company-address-town-change'] ) {
req.session.data['csi-info'][1]['company-address-town'] = req.session.data['company-address-town-change'];
console.log('company-address-town changed to ' + req.session.data['company-address-town-change'] );
delete req.session.data['company-address-town-change'];
}

if (req.session.data['company-address-town-change'] ) {
req.session.data['csi-info'][1]['company-address-town'] = req.session.data['company-address-town-change'];
console.log('company-address-town changed to ' + req.session.data['company-address-town-change'] );
delete req.session.data['company-address-town-change'];
}

if (req.session.data['company-address-county-change'] ) {
req.session.data['csi-info'][1]['company-address-county'] = req.session.data['company-address-county-change'];
console.log('company-address-county changed to ' + req.session.data['company-address-county-change'] );
delete req.session.data['company-address-county-change'];
}

if (req.session.data['company-address-postcode-change'] ) {
req.session.data['csi-info'][1]['company-address-postcode'] = req.session.data['company-address-postcode-change'];
console.log('company-address-postcode changed to ' + req.session.data['company-address-postcode-change'] );
delete req.session.data['company-address-postcode-change'];
}


//job details

if (req.session.data['duration-change'] ) {
req.session.data['csi-info'][1]['duration'] = req.session.data['duration-change'];
console.log('duration changed to ' + req.session.data['duration-change'] );
delete req.session.data['duration-change'];
}

if (req.session.data['condition-change'] ) {
req.session.data['csi-info'][1]['condition'] = req.session.data['condition-change'];
console.log('condition changed to ' + req.session.data['condition-change'] );
delete req.session.data['condition-change'];
}


if (req.session.data['interview-date-change-day'] ) {
req.session.data['csi-info'][1]['interview-date-day'] = req.session.data['interview-date-change-day'];
console.log('interview-date-day changed to ' + req.session.data['interview-date-change-day'] );
delete req.session.data['interview-date-change-day'];
}

if (req.session.data['interview-date-change-month'] ) {
req.session.data['csi-info'][1]['interview-date-month'] = req.session.data['interview-date-change-month'];
console.log('dob-month changed to ' + req.session.data['interview-date-change-month'] );
delete req.session.data['interview-date-change-month'];
}

if (req.session.data['interview-date-change-year'] ) {
req.session.data['csi-info'][1]['interview-date-year'] = req.session.data['interview-date-change-year'];
console.log('interview-date-year changed to ' + req.session.data['interview-date-change-year'] );
delete req.session.data['interview-date-change-year'];
}

    return res.redirect ('claim');

  next();


});


module.exports = router
