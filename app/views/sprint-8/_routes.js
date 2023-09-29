const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

const minAllowedAge = 16;
const maxAllowedAge = 110;
const today = new Date(Date.now());

const faker = require('faker')
const moment = require('moment')

/* CHECK ROUTER TO MAKE THE JOURNEY WITH NOTES MORE ROBUST */


router.all('/agreed/csi/1-check/check-router', function(req, res, next){

var appointeeLink = "";
  if (req.session.data['appointee'] && req.session.data['appointee'] == "yes") {
    appointeeLink = "-appointee"; // quick way to append apointee journey to relevant screens
  }

console.log("appointee link is " + appointeeLink );

if ((req.session.data['personal'] && req.session.data['personal'] == "no" ) || (req.session.data['company'] && req.session.data['company'] == "no" ) || (req.session.data['interview'] && req.session.data['interview'] == "no" ))
{
  if (req.session.data['appointee-contact-phone'] && !req.session.data['appointee-email'] ){
     // no email, jump straight to telephone
     return res.redirect ('unhappy-phone-1' + appointeeLink);
  } else {
  return res.redirect ('unhappy-2' + appointeeLink);
}
} else {
  if (req.session.data['appointee-contact-phone'] && !req.session.data['appointee-email'] ){
     // no email, jump straight to claim form
     return res.redirect ('../2-send/2' + appointeeLink);
   } else {
  return res.redirect ('../2-send/1' + appointeeLink);
}
}

next();
});

/* END CHECK ROUTER */

//personal details

router.all('/agreed/csi/personal-details-router', function(req, res, next){

req.session.data['personal-details-changed'] = 'true';


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



if (req.session.data['personal-contact-preference'] ) {
req.session.data['csi-info'][1]['personal-contact-preference'] = req.session.data['personal-contact-preference'];
console.log('contact-options changed to ' + req.session.data['personal-contact-preference'] );
delete req.session.data['personal-contact-preference'];
}

if (req.session.data['contact-by-email-change'] ) {
req.session.data['csi-info'][1]['contact-by-email'] = req.session.data['contact-by-email-change'];
console.log('contact-by-email changed to ' + req.session.data['contact-by-email-change'] );
delete req.session.data['contact-by-email-change'];
}

if (req.session.data['agree-email-terms-change'] ) {
req.session.data['csi-info'][1]['agree-email-terms'] = req.session.data['agree-email-terms-change'];
console.log('agree-email-terms changed to ' + req.session.data['agree-email-terms-change'] );
delete req.session.data['agree-email-terms-change'];
}

if (req.session.data['contact-by-phone-change'] ) {
req.session.data['csi-info'][1]['contact-by-phone'] = req.session.data['contact-by-phone-change'];
console.log('contact-by-phone changed to ' + req.session.data['contact-by-phone-change'] );
delete req.session.data['contact-by-phone-change'];
}


return res.redirect ('claim');

next();


});


//company details

router.all('/agreed/csi/company-details-router', function(req, res, next){

req.session.data['company-details-changed'] = 'true';

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

if (req.session.data['company-contact-preference'] ) {
req.session.data['csi-info'][1]['company-contact-preference'] = req.session.data['company-contact-preference'];
console.log('contact-options changed to ' + req.session.data['company-contact-preference'] );
delete req.session.data['company-contact-preference'];
}

if (req.session.data['company-email-address-change'] ) {
req.session.data['csi-info'][1]['company-email-address'] = req.session.data['company-email-address-change'];
console.log('company-email-address changed to ' + req.session.data['company-email-address-change'] );
delete req.session.data['company-email-address-change'];
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




return res.redirect ('claim');

next();


});

//job details

router.all('/agreed/csi/job-details-router', function(req, res, next){

req.session.data['job-details-changed'] = 'true';

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

if (req.session.data['support-worker-pay-change'] ) {
req.session.data['csi-info'][1]['support-worker-pay'] = req.session.data['support-worker-pay-change'];
console.log('support-worker-pay changed to ' + req.session.data['support-worker-pay-change'] );
delete req.session.data['support-worker-pay-change'];
}

    return res.redirect ('claim');

  next();


});


module.exports = router
