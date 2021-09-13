/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

module.exports = {

  // Insert values here

  'unallocated-cases': [{
    'name': 'Dereck Smith',
    'specialism': 'Large business',
    'type': 'Renewal',
    'priority' : "true",
    'date': '4 October 2019 - 13:23'
  }, {
    'name': 'Maximillia Erdman',
    'specialism': 'Pan disability',
    'type': 'New application',
      'priority' : false,
    'date': '5 October 2019 - 14:23'
  }, {
    'name': 'Sonya Corkery',
    'specialism': 'Large business',
    'type': 'Renewal',
          'priority' : false,
    'date': '15 October 2019 - 15:23'
  }, {
    'name': 'Adaline Mann',
    'specialism': 'Pan disability',
    'type': 'New application',
          'priority' : false,
    'date': '19 October 2019 - 16:23'
  }, {
    'name': 'Arlo Spinka',
    'specialism': 'Pan disability',
    'type': 'New application',
          'priority' : false,
    'date': '21 October 2019 - 17:23'
  }, {
    'name': 'Norma Heller',
    'specialism': 'Pan disability',
    'type': 'New application',
          'priority' : false,
    'date': '21 October 2019 - 18:23'
  }, {
    'name': 'Lavonne Smitham',
    'specialism': 'Pan disability',
    'type': 'New application',
          'priority' : false,
    'date': '21 October 2019 - 19:23'
  }, {
    'name': 'Royce Ryan',
    'specialism': 'Large business',
    'type': 'Renewal',
          'priority' : false,
    'date': '23 October 2019 - 20:23'
  }, {
    'name': 'Vernice Trantow',
    'specialism': 'Pan disability',
    'type': 'New application',
          'priority' : false,
    'date': '23 October 2019 - 21:23'
  }, {
    'name': 'Thomas King',
    'specialism': 'Pan disability',
    'type': 'New application',
          'priority' : false,
    'date': '24 October 2019 - 22:23'
  }],

  'csi-info': [{
    'firstname': 'Thomas',
    'surname': 'Brown',
   'name': 'Thomas Brown',
    'dob-day': '12',
    'dob-month': 'June',
    'dob-year': '1985',

    'condition': 'Deaf',
    'address-line-one': '14 Kings Road',
    'address-line-two': '',
    'address-town': 'Birmingham',
    'address-county': 'Midlands',
    'address-postcode': 'B1 1EQ',
    'interview-date-day': '1',
    'interview-date-month': 'November',
    'interview-date-year': '2019',
    'company-name': 'Tesco',
    'company-address-line-one': '101 Kent Way',
    'company-address-line-two': '',
    'company-address-town': 'Birmingham',
    'company-address-county': 'Midlands',
    'company-address-postcode': 'B4 8RT',
    'company-email-address': 'quarryhouse.atwresearch@dwp.gov.uk',
    'company-phone': '07987 654 678',
    'duration': '1 hour',
    'interviewer-name': 'Terry Gibson',
    'interviewer-contact-preference': 'Email',
    'support-worker-pay': '200',
    'contact-by-email': 'quarryhouse.atwresearch@dwp.gov.uk',
    'contact-by-phone': '07192 838 482'

  },
  {
    'firstname': 'Thomas',
    'surname': 'Brown',
    'dob-day': '12',
    'dob-month': '6',
    'dob-year': '1995',
    'address-line-one': '14 Kings Road',
    'address-line-two': '',
    'address-town': 'Birmingham',
    'address-county': 'Midlands',
    'address-postcode': 'B1 1EQ',
    'interview-date-day': '1',
    'interview-date-month': '11',
    'interview-date-year': '2019',
    'company-name': 'Tesco',
    'company-address-line-one': '101 Kent Way',
    'company-address-line-two': '',
    'company-address-town': 'Birmingham',
    'company-address-county': 'Midlands',
    'company-address-postcode': 'B4 8RT',
    'company-contact-preference': ["email", "phone"],
    'company-email-address': 'terry@tecso.co.uk',
    'company-phone': '07987 654 678',
    'duration': '1 hour',
    'interviewer-name': 'Terry Gibson',
    'interviewer-contact-preference': 'Email',
    'support-worker-pay': '2000',
    'email-for-user-research' : 'quarryhouse.atwresearch@dwp.gov.uk',
    'personal-contact-preference': ["email", "phone"],
    'agree-email-terms' : "Yes",
    'contact-by-email': 'thomas@gmail.com',
    'contact-by-phone': '07192 838 482',
    'condition': 'Deaf',

  },
  {
    'firstname': 'Thomas',
    'surname': 'Brown',
    'dob-day': '12',
    'dob-month': '6',
    'dob-year': '1995',
    'address-line-one': '14 Kings Road',
    'address-line-two': '',
    'address-town': 'Birmingham',
    'address-county': 'Midlands',
    'address-postcode': 'B1 1EQ',
    'interview-date-day': '1',
    'interview-date-month': '11',
    'interview-date-year': '2019',
    'company-name': 'Tesco',
    'company-address-line-one': '101 Kent Way',
    'company-address-line-two': '',
    'company-address-town': 'Birmingham',
    'company-address-county': 'Midlands',
    'company-address-postcode': 'B4 8RT',
    'company-contact-preference': ["email", "phone"],
    'company-email-address': 'terry@tesco.co.uk',
    'company-phone': '07987 654 678',
    'duration': '1 hour',
    'interviewer-name': 'Terry Gibson',
    'interviewer-contact-preference': 'Email',
    'support-worker-pay': '200',
    'email-for-user-research' : 'quarryhouse.atwresearch@dwp.gov.uk',
    'personal-contact-preference': ["email", "phone"],
    'agree-email-terms' : "Yes",
    'contact-by-email': 'thomas@gmail.com',
    'contact-by-phone': '07192 838 482',
    'condition': 'Deaf',

  },
  {
    'firstname': 'Thomas',
    'surname': 'Brown',
    'dob-day': '12',
    'dob-month': '6',
    'dob-year': '1995',
    'address-line-one': '14 Kings Road',
    'address-line-two': '',
    'address-town': 'Birmingham',
    'address-county': 'Midlands',
    'address-postcode': 'B1 1EQ',
    'interview-date-day': '9',
    'interview-date-month': '3',
    'interview-date-year': '2020',
    'submission-date' : '2 March 2020 - 13:23',
    'company-name': 'Tesco',
    'company-address-line-one': '101 Kent Way',
    'company-address-line-two': '',
    'company-address-town': 'Birmingham',
    'company-address-county': 'Midlands',
    'company-address-postcode': 'B4 8RT',
    'company-contact-preference': ["email", "phone"],
    'company-email-address': 'terry@tesco.co.uk',
    'company-phone': '07987 654 678',
    'duration': '1 hour',
    'interviewer-name': 'Terry Gibson',
    'interviewer-contact-preference': 'Email',
    'support-worker-pay': '200',
    'email-for-user-research' : 'quarryhouse.atwresearch@dwp.gov.uk',
    'personal-contact-preference': ["email", "phone"],
    'agree-email-terms' : "Yes",
    'contact-by-email': 'thomas@gmail.com',
    'contact-by-phone': '07192 838 482',
    'condition': 'Deaf',

  },

   {
    'name': 'Sam Andrews',
    'specialism': 'CSI',
    'type': 'CSI',
    'disc' : true,
          'priority' : "true",
    'date': '14 October 2018 - 08:22'
  } , {
    'name': 'Alex Smith',
    'specialism': 'Pan disability',
    'type': 'Renewal',
    'disc' : true,
          'priority' : "false",
    'date': '19 October 2019 - 12:23'
  }],

  'your-cases': [{
    'name': 'Thomas Brown',
    'specialism': 'Pan disability',
    'type': 'CSI',
          'priority' : "true",
    'date': '6 October 2019 - 12:23'
  }   , {
    'name': 'Sam Andrews',
    'specialism': 'CSI',
    'type': 'CSI',
    'disc' : true,
          'priority' : "true",
    'date': '14 October 2018 - 08:22'
  } , {
    'name': 'Alex Smith',
    'specialism': 'Pan disability',
    'type': 'Renewal',
    'disc' : true,
          'priority' : "false",
    'date': '24 October 2019 - 12:23'
  }


]  ,

  'advisers': [
    'John Goldsmith',
    'Sarah Andrews',
    'Martin Armitage',
    'Clémence Fabre',
    'Elisse Farcens',
    'Christoph Fernandez',
    'Julie Guichard',
    'Colin Julien',
    'Théo Langlois',
    'Capucine Michel',
    'Sarah Micheals',
    'Celise Mutton',
    'Ed Oxley',
    'Colin Partinigton',
    'Brigit Pardeux',
    'Lionel Phelps',
    'Anne Pinkton',
    'Lisa Punchton',
    'Rich Silver',
    'Paul Rice'
  ],

  'specialisms': [
    'Self-employed',
    'Hidden impairments',
    'Large employer',
    'Deaf',
    'Visually impaired',
    'Pan disability'
  ]
}
