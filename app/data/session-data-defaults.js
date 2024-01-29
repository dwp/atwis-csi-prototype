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

'ttw-match' : "",
'claim-item' : "",
'sw-match' : "",
// 'job-deatils-check' : "No",
// 'condition-check' : "No",
'grant-matches-claim-sw' : "",
'paid-in-full' : "",
'company-details' : "",
'additional-cost' : "",
'details-item-no-match-ipad' : "",
'cost-share' : "YES",




  'claims' : "",
'benefits' : "",
'priority' : "",
'other' : "",
'remove' : "",
'notification' : "",
'notificationsonya' : "",
'notificationthomas' : "",
'notificationjohn' : "",
'notificationarlo' : "",
'wpa-report' : "",
// '_do_1' : "Telephone call received",
// 'contact-time-1' : "9am",
// 'contact-date-day-1' : "25",
// 'contact-date-month-1' : "4",
// 'contact-date-year-1' : "2023",
// 'where-do-you-live' : "Thomas King",
// 'contact-why' : ["Element details", "ID&V", "Other"],
'other-discussion-1' : "Thomas King contacted ATW asking for mental health support though Access to Work. They are not on Intensive Personalised Employment Support, Work and Health Programme, Work Able Scotland, and Fair Start Scotland.",
// 'mhss-support-check' : ["Intensive Personalised Employment Support"],

// assess
'Searchligh' : "Yes and application details match",
'found-nino' : "Yes",
'national-insurance-number' : "AB 123456 C",
'appointee' : "No",
'benefits' : "No",
'disc-check' : "No",
'benefits-change' : "",
'condition-checkthomas' : "No",
'contact-checkthomas' : "No",
'job-deatils-checkthomas' : "No",
'sae-checkthomas' : "No",
'quotes-check-1thomas' : "No",
'quotes-check-2thomas' : "No",
// '_do_1' : "Email sent",
//
// 'contact-date-day-1' : "29",
// 'contact-date-month-1' : "03",
// 'contact-date-year-1' : "2023",
// 'contact-time-1' : "1pm",
// '_do_2' : "Text message (SMS) sent",
// 'contact-date-day-2' : "29",
// 'contact-date-month-2' : "03",
// 'contact-date-year-2' : "2023",
// 'contact-time-2' : "1pm",
// '_do_3' : "Telephone call made",
// 'contact-date-day-3' : "30",
// 'contact-date-month-3' : "03",
// 'contact-date-year-3' : "2023",
// 'contact-time-3' : "10am",
// 'asked-info-phone-3' : "Yes",
'more-detailthomas1' : "Thomas doesn’t use a hearing aid as hearing aids are ineffective for their condition. They have regular checks with an audiologist so they know that this is still the case. Thomas has only been in this job a short time - they weren’t working before this job. Having been in the job a short time it’s clear that they need support with communication.",
'condition-check-updatethomas1' : "Thomas King",


'job-deatils-contact' : "They gave permission (apply)",
//delete later

//delete later
'elements' : "I do not know",

  // Insert values here

  'unallocated-cases': [{
    'name': 'Dereck Smith',
    'specialism': 'Large business',
    'type': 'New application',
    'priority' : "true",
    'date': '4 October 2023, 13:23'
  }, {
    'name': 'Maximillia Erdman',
    'specialism': 'Pan disability',
    'type': 'New application',
      'priority' : false,
    'date': '5 October 2021 14:23'
  }, {
    'name': 'Sonya Corkery',
    'specialism': 'Large business',
    'type': 'Renewal',
          'priority' : false,
    'date': '15 October 2021 15:23'
  }, {
    'name': 'Adaline Mann',
    'specialism': 'Pan disability',
    'type': 'New application',
          'priority' : false,
    'date': '19 October 2021 16:23'
  }, {
    'name': 'Arlo Spinka',
    'specialism': 'Pan disability',
    'type': 'New application',
          'priority' : false,
    'date': '21 October 2021 17:23'
  }, {
    'name': 'Norma Heller',
    'specialism': 'Pan disability',
    'type': 'New application',
          'priority' : false,
    'date': '21 October 2021 18:23'
  }, {
    'name': 'Lavonne Smitham',
    'specialism': 'Pan disability',
    'type': 'New application',
          'priority' : false,
    'date': '21 October 2021 19:23'
  }, {
    'name': 'Royce Ryan',
    'specialism': 'Large business',
    'type': 'Renewal',
          'priority' : false,
    'date': '23 October 2021 20:23'
  }, {
    'name': 'Vernice Trantow',
    'specialism': 'Pan disability',
    'type': 'New application',
          'priority' : false,
    'date': '23 October 2021 21:23'
  }, {
    'name': 'Thomas King',
    'specialism': 'Pan disability',
    'type': 'New application',
          'priority' : false,
    'date': '24 October 2021 22:23'
  }],



  'priority-cases': [{
    'name': 'Dereck Smith',
    'condition': 'Macular oedema',
    'conditiondetails': 'I have macular oedema which has cause permanent vision loss in both eyes. It was caused by my diabetes. I ask colleagues to read thing out aloud and describe them to me on video calls and in person.',
    'ref': 'RMPX30',
    'case': 'Priority',
    'job-deatils-contact' : "They gave permission (apply)",
    'type': 'New Application',
    'priority' : "true",
    'date': '4 October 2023, 13:23'

  }],

  'other-cases': [{
    'name': 'Sonya Corkery',
    'condition': 'macular oedema',
    'conditiondetails': 'I have macular oedema which has cause permanent vision loss in both eyes. It was caused by my diabetes. I ask colleagues to read thing out aloud and describe them to me on video calls and in person.',
    'ref': 'RMPX31',
    'dos': '2 June 2022',
    'case': 'Other',
    'type': 'New Application',
    'priority' : false,
    'date': '15 October 2021 15:23',
    'appointee': 'No'
  }],

  'other-cases-2': [{
    'name': 'Thomas King',
    'condition': 'Profound deafness',
    'conditiondetails': 'I am profoundly deaf in both ears, from birth. Which means I cannot hear a sound below 90dB. My first language is BSL. I ask colleagues to communicate with notes, who are not BSL, I also communicate in writing and lip reading.',
    'ref': 'RMPX32',
    'dos': '2 August 2022',
    'case': 'Other',
    'type': 'New Application',
    'priority' : false,
    'date': '15 October 2021 15:23',
    'appointee': 'No'
  }],

  'other-cases-3': [{
    'name': 'John Smith',
    'condition': 'Macular oedema and anxiety',
     'conditiondetails': 'I have macular oedema which has cause permanent vision loss in both eyes. It was caused by my diabetes. This vision loss has also triggered anxiety. This has progressed where I am unable to drive or use public transport anymore. I already have Jaws screen reader and just need help with getting to and from work.',
    'ref': 'RMPX33',
    'dos': '2 August 2022',
    'case': 'Other',
    'type': 'New Application',
    'priority' : false,
    'date': '15 October 2021 15:23',
    'appointee': 'No'
  }],

  'other-cases-4': [{
    'name': 'Arlo Spinka',
    'condition': 'Macular oedema and anxiety',
    'conditiondetails': 'I have macular oedema which has cause permanent vision loss in both eyes. It was caused by my diabetes. This vision loss has also triggered anxiety. This has progressed where I am unable to drive or use public transport anymore. I already have Jaws screen reader and just need help with getting to and from work.',
    'ref': 'RMPX35',
    'dos': '5 July 2023',
    'case': 'Other',
    'type': 'New Application',
    'priority' : false,
    'date': '15 October 2021 15:23',
    'appointee': 'No'
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
    'interview-date-year': '2021',
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
    'interview-date-year': '2021',
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
    'interview-date-year': '2021',
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
    'interview-date-year': '2021',
    'submission-date' : '2 November 2021 13:23',
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
    'date': '14 October 2021 08:22'
  } , {
    'name': 'Alex Smith',
    'specialism': 'Pan disability',
    'type': 'Renewal',
    'disc' : true,
          'priority' : "false",
    'date': '19 October 2021 12:23'
  }],

  'your-cases': [{
    'name': 'Thomas Brown',
    'specialism': 'Pan disability',
    'type': 'CSI',
          'priority' : "true",
    'date': '6 October 2021 12:23'
  }   , {
    'name': 'Sam Andrews',
    'specialism': 'CSI',
    'type': 'CSI',
    'disc' : true,
          'priority' : "true",
    'date': '14 October 2021 08:22'
  } , {
    'name': 'Alex Smith',
    'specialism': 'Pan disability',
    'type': 'Renewal',
    'disc' : true,
          'priority' : "false",
    'date': '24 October 2021 12:23'
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
