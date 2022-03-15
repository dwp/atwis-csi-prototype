$(document).ready(function () {
    var countryValidationFields = $('select')
    var invalidCountry = countryValidation(countryValidationFields)
    function countryValidation(reqFields) {
      var invalidFields = []
      for (var i = 0; i < reqFields.length; i++) {
        var $formGroup = $(reqFields[i])
        var validationType = $formGroup.attr('value')
        $('input[placeholder]').attr("value", validationType)
        $('input[placeholder]').val(validationType).select
        $('option[value='+validationType+']').attr("selected","selected")
      }
      return invalidFields
    }
})


$(document).on('submit', 'form', function (e) {
  var reqFields = $('[data-required]').not("[data-required=false]").not("[data-required=date]")
  var validationFields = $('[data-required]').not("[data-required=date]")
  var dateValidationFields = $('[data-required=date]')
  if (reqFields.length > 0 || validationFields.length > 0 || dateValidationFields.length > 0) {
    var invalidFields = validateAll(reqFields)
    var invalidData = dataValidation(validationFields)
    var invalidDOBData = dateValidation(dateValidationFields)
    if (invalidFields.length > 0 || invalidData.length > 0 || invalidDOBData.length > 0) {
      e.preventDefault()
      setTimeout(function () {
        $('.govuk-error-summary').remove()
        clearAllErrors(reqFields)
        clearAllErrors(validationFields)
        clearDateErrors(dateValidationFields)
        sortErrorMessages(invalidFields, invalidData, invalidDOBData)
        $(window).scrollTop(0)
      }, 800)
    }
  }
})


function dateValidation(reqFields) {
  var invalidFields = []
  for (var i = 0; i < reqFields.length; i++) {
    var $formGroup = $(reqFields[i])

    var legend = $formGroup.find('legend')
    var dataType = $formGroup.attr('data-type')
    var errorPrefix = $formGroup.attr('error-prefix')
    var errorInvalid = $formGroup.attr('error-invalid')

    var dayInput = $formGroup.find('input[data-validation="date-day"]')
    var dayVal = dayInput.val()
    var monthInput = $formGroup.find('input[data-validation="date-month"]')
    var monthVal = monthInput.val()
    var yearInput = $formGroup.find('input[data-validation="date-year"]')
    var yearVal = yearInput.val()

    var dateString = dayVal+"/"+monthVal+"/"+yearVal
    var validDate = isDate(dateString)
    var isDatePast = isDateInPast(dateString)
    var dateInRange = isDateInRange(dateString)

      if (dayVal == null || dayVal == '') {
        invalidFields.push($formGroup)
        legend.attr('data-validation-error',errorPrefix+" must include a day")
        legend.attr('data-validation-element',"date-day")
      } else {
          if (monthVal == null || monthVal == '') {
            invalidFields.push($formGroup)
            legend.attr('data-validation-error',errorPrefix+" must include a month")
            legend.attr('data-validation-element',"date-month")
          } else {
              if (yearVal == null || yearVal == '') {
                invalidFields.push($formGroup)
                legend.attr('data-validation-error',errorPrefix+" must include a year")
                legend.attr('data-validation-element',"date-year")
              } else {
                 if (!validDate) {
                    invalidFields.push($formGroup)
                    legend.attr('data-validation-error',errorInvalid)
                    legend.attr('data-validation-element',"date-")
                 } else {


                    if (dataType == 'past') {

                        // Past Date
                        if (!isDatePast) {
                            invalidFields.push($formGroup)
                            legend.attr('data-validation-error',errorPrefix+" must be today or in the past")
                            legend.attr('data-validation-element',"date-")
                        } else {
                            if (!dateInRange) {
                                invalidFields.push($formGroup)
                                legend.attr('data-validation-error',errorPrefix+" must be after 31 December 1499")
                                legend.attr('data-validation-element',"date-")
                            }
                        }

                    } else {

                        if (!dateInRange) {
                            invalidFields.push($formGroup)
                            legend.attr('data-validation-error',errorPrefix+" must be after 31 December 1499 and before 01 January 2100")
                            legend.attr('data-validation-element',"date-")
                        }

                    }

                 }
              }
          }
      }

  }
  return invalidFields
}



function dataValidation (reqFields) {
  var invalidFields = []
  for (var i = 0; i < reqFields.length; i++) {
    var $formGroup = $(reqFields[i])
    var validationInput = $formGroup.find('input[type="text"]')
    var validationType = validationInput.attr('data-validation')
    var validationValue = validationInput.val()



    // name

    if (validationType == "first-name" && validationValue != '') {
      if (!isValidCharacters(validationValue)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error',"Your first name must only include letters a to z, numbers 0 to 9, ampersands (&), apostrophes, commas, forward slashes, full stops, hyphens, round brackets and spaces")
      } else {
        if (isCharLimitReached(validationValue,35)) {
            invalidFields.push($formGroup)
            validationInput.attr('data-validation-error','Your first name must be 35 characters or less')
        }
      }
    }

    if (validationType == "middle-name") {
      if (!isValidCharacters(validationValue)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error',"Your middle name must only include letters a to z, numbers 0 to 9, ampersands (&), apostrophes, commas, forward slashes, full stops, hyphens, round brackets and spaces")
      } else {
        if (isCharLimitReached(validationValue,35)) {
            invalidFields.push($formGroup)
            validationInput.attr('data-validation-error','Your middle name must be 35 characters or less')
        }
      }
    }

    if (validationType == "last-name" && validationValue != '') {
      if (!isValidCharacters(validationValue)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error',"Your last name must only include letters a to z, numbers 0 to 9, ampersands (&), apostrophes, commas, forward slashes, full stops, hyphens, round brackets and spaces")
      } else {
        if (isCharLimitReached(validationValue,35)) {
            invalidFields.push($formGroup)
            validationInput.attr('data-validation-error','Your last name must be 35 characters or less')
        }
      }
    }


    if (validationType == "full-name" && validationValue != '') {
      if (!isValidCharacters(validationValue)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error',"Their full name must only include letters a to z, hyphens, spaces and apostrophes")
      } else {
        if (isCharLimitReached(validationValue,35)) {
            invalidFields.push($formGroup)
            validationInput.attr('data-validation-error','Your last name must be 35 characters or less')
        }
      }
    }


    // description

    if (validationType == "description" && validationValue != '') {
      if (!isValidCharacters(validationValue)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error',"The description must only include letters a to z, numbers, ampersands (&), apostrophes, commas, forward slashes, full stops, hyphens, round brackets and spaces")
      } else {
        if (isCharLimitReached(validationValue,56)) {
            invalidFields.push($formGroup)
            validationInput.attr('data-validation-error','The description must be 56 characters or less')
        }
      }
    }

    // Named org

    if (validationType == "charity-name" && validationValue != '') {
      if (!isValidCharacters(validationValue)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error',"Charity’s name must only include letters a to z, numbers, ampersands (&), apostrophes, commas, forward slashes, full stops, hyphens, round brackets and spaces")
      } else {
        if (isCharLimitReached(validationValue,56)) {
            invalidFields.push($formGroup)
            validationInput.attr('data-validation-error','Charity’s name must be 56 characters or less')
        }
      }
    }



    if (validationType == "business-name" && validationValue != '') {
      if (!isValidCharacters(validationValue)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error',"Business name must only include letters a to z, numbers 0 to 9, ampersands (&), apostrophes, commas, forward slashes, full stops, hyphens, round brackets and spaces")
      } else {
        if (isCharLimitReached(validationValue,105)) {
            invalidFields.push($formGroup)
            validationInput.attr('data-validation-error','Business name must be 105 characters or less')
        }
      }
    }



    if (validationType == "company-name" && validationValue != '') {
      if (!isValidCharacters(validationValue)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error',"Company’s name must only include letters a to z, numbers, ampersands (&), apostrophes, forward slashes, full stops, hyphens, round brackets and spaces")
      } else {
        if (isCharLimitReached(validationValue,53)) {
            invalidFields.push($formGroup)
            validationInput.attr('data-validation-error','Company’s name cannot be more than 53 characters')
        }
      }
    }






    // General

    if (validationType == "percentage" && validationValue != '') {
      if (!isPercentage(validationValue)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error','Must be a valid whole number percentage')
      }
    }

    if (validationType == "discretionary-percentage" && validationValue != '') {

      if (!isNumeric(validationValue)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error','The percentage  must be a whole number')
      } else {
          if (!isPercentage(validationValue)) {
            invalidFields.push($formGroup)
            validationInput.attr('data-validation-error','The percentage must be 100 or less')
          }
      }
    }


    if (validationType == "asset-total" && validationValue != '') {
      if (!isNumericWithoutCommas(validationValue)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error','Total assets value must be a number')
      } else {
          if (!isNumericWholeNumberWithoutCommas(validationValue)) {
            invalidFields.push($formGroup)
            validationInput.attr('data-validation-error','Total assets value must be a whole number')
          } else {
              if (isCharLimitReachedWithoutCommas(validationValue, 12)) {
                invalidFields.push($formGroup)
                validationInput.attr('data-validation-error','Total assets value must be 12 numbers or less')
              }
          }
      }
    }

//nino


    if (validationType == "nino" && validationValue != '') {
      var trimNino = validationValue.replace(/\s/g,'').toUpperCase();
      if (!isNino(trimNino)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error','Enter a National Insurance number')
      } else {
        validationInput.val(trimNino);
      }
    }


//utr
    if (validationType == "companyutr" && validationValue != '') {
      var trimUTR = validationValue.replace(/\s/g,'');
      if (!isCharLengthExactly(trimUTR, 10)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error','Unique Taxpayer Reference must be a 10 digit number')
      } else {
        if (!isUTR(trimUTR)) {
          invalidFields.push($formGroup)
          validationInput.attr('data-validation-error','Enter the Unique Taxpayer Reference in the correct format')
        } else {
          validationInput.val(trimUTR);
        }
      }
    }

    if (validationType == "utr" && validationValue != '') {
      if (!isNumeric(validationValue)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error','Company UTR must only include numbers')
      } else {
          if (!isCharLengthExactly(validationValue, 10)) {
            invalidFields.push($formGroup)
            validationInput.attr('data-validation-error','Company UTR must be a 10 digit number')
          }
      }
    }



    if (validationType == "company_utr" && validationValue != '') {
     if (!isNumeric(validationValue)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error','Enter the Unique Taxpayer Reference in the correct format')
      } else {
          if (!isCharLengthExactly(validationValue, 10)) {
            invalidFields.push($formGroup)
            validationInput.attr('data-validation-error','Unique Taxpayer Reference must be a 10 digit number')
          }
      }
    }

//telephone

    if (validationType == "telephone_number" && validationValue != '') {
      if (!isValidTelephoneNumber(validationValue)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error','Enter a real UK telephone number')
      }
    }


    //login
    if (validationType == "login" && validationValue != '') {
      if (!isValidlogin(validationValue)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error','Enter agent or individual with no spaces')
      }
    }
    //login


//address
    if (validationType == "address-line1" && validationValue != '') {
     if (!isValidCharacters(validationValue)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error',"Address line 1 must only include letters a to z, numbers, ampersands (&), apostrophes, forward slashes, full stops, hyphens, round brackets and spaces")
      } else {
        if (isCharLimitReached(validationValue,35)) {
            invalidFields.push($formGroup)
            validationInput.attr('data-validation-error','Address line 1 must be 35 characters or less')
        }
      }
    }
    if (validationType == "address-line2" && validationValue != '') {
      if (!isValidCharacters(validationValue)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error',"Address line 3 must only include letters a to z, numbers, ampersands (&), apostrophes, forward slashes, full stops, hyphens, round brackets and spaces")
      } else {
        if (isCharLimitReached(validationValue,35)) {
            invalidFields.push($formGroup)
            validationInput.attr('data-validation-error','Address line 3 must be 35 characters or less')
        }
      }
    }
    if (validationType == "address-line3" && validationValue != '') {
      if (!isValidCharacters(validationValue)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error',"Address line 4 must only include letters a to z, numbers, ampersands (&), apostrophes, forward slashes, full stops, hyphens, round brackets and spaces")
      } else {
        if (isCharLimitReached(validationValue,35)) {
            invalidFields.push($formGroup)
            validationInput.attr('data-validation-error','Address line 4 must be 35 characters or less')
        }
      }
    }
    if (validationType == "address-town") {
      if (!isValidCharacters(validationValue)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error',"Address line 2 must only include letters a to z, numbers, ampersands (&), apostrophes, forward slashes, full stops, hyphens, round brackets and spaces")
      } else {
        if (isCharLimitReached(validationValue,35)) {
            invalidFields.push($formGroup)
            validationInput.attr('data-validation-error','Address line 2 must be 35 characters or less')
        }
      }
    }
    if (validationType == "address-county" && validationValue != '') {
      if (!isValidCharacters(validationValue)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error',"County must only include letters a to z, numbers, ampersands (&), apostrophes, forward slashes, full stops, hyphens, round brackets and spaces")
      } else {
        if (isCharLimitReached(validationValue,35)) {
            invalidFields.push($formGroup)
            validationInput.attr('data-validation-error','County must be 35 characters or less ')
        }
      }
    }
    if (validationType == "postcode" && validationValue != '') {
      var regex = /^(.*)(\d)/gm;
      var subst = `$1 $2`;
      var trimPostCode = validationValue.replace(/\s/g,'');
      var postCodeValue = trimPostCode.replace(regex, subst).toUpperCase();
      if (!isPostCode(postCodeValue)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error',"Enter a real UK postcode")
      } else  {
        validationInput.val(postCodeValue);
      }
    }


  //emIL

    if (validationType == "email" && validationValue != '') {
      if (!isValidEmail(validationValue)) {
        invalidFields.push($formGroup)
        validationInput.attr('data-validation-error',"Enter an email address in the correct format, like name@example.com")
      }
    }
  }
  return invalidFields
}


function clearAllErrors (reqFields) {
  $(reqFields).each(function () {
    $(this).removeClass('govuk-form-group--error')
    $(this).find('.govuk-error-message').remove()
    $(this).find('.form-control-error').removeClass('form-control-error')
  })
}

function clearDateErrors (reqFields) {
  $(reqFields).each(function () {
    $(this).removeClass('govuk-form-group--error')
    $(this).find('.govuk-error-message').remove()
    $(this).find('input').removeClass('govuk-input--error')
    $(this).find('.form-control-error').removeClass('form-control-error')
  })
}


function validateAll (reqFields) {
  var invalidFields = []
  for (var i = 0; i < reqFields.length; i++) {
    var $formGroup = $(reqFields[i])
    var invalid = validateSingleField($formGroup)
    if (invalid) {
      invalidFields.push($formGroup)
    }
  }
  return invalidFields
}

function validateSingleField ($formGroup) {
  var type = findInputType($formGroup)
  if ((type === 'text' || type === 'textarea' || type === 'date') && $formGroup.find('input, textarea').val().length > 0) {
    return false
  }
  if ((type === 'radio' || type === 'checkbox') && $formGroup.find(':checked').length > 0) {
    return false
  }
  return true
}

function sortErrorMessages (invalidFields, invalidData, invalidDOBData) {
  var errorMessages = []

  for (var i = 0; i < invalidDOBData.length; i++) {
    var $formGroup = $(invalidDOBData[i])
    var type = findInputType($formGroup)

    var dobLegend = $formGroup.find('legend')
    var errorMessage = dobLegend.attr('data-validation-error')
    var linkID = dobLegend.attr('data-validation-element')
    var label = getLabelText($formGroup, type)
    var inputElement = $formGroup.find("input[data-validation*='"+linkID+"']")

    if (linkID == 'date-') {linkID = 'date-day'}

    errorMessages.push({ linkID, label, message: errorMessage })

    addErrorClass($formGroup, type)
    inputElement.addClass("govuk-input--error")

    appendLabelErrorMessage($formGroup, type, errorMessage)
  }

  for (var i = 0; i < invalidData.length; i++) {
    var $formGroup = $(invalidData[i])
    var type = findInputType($formGroup)
    var validationInput = $formGroup.find('input[type="text"]')
    var errorMessage = validationInput.attr('data-validation-error')
    var validationValue = validationInput.val()
    var linkID = getLinkID($formGroup)
    var label = getLabelText($formGroup, type)

    errorMessages.push({ linkID, label, message: errorMessage })

    addErrorClass($formGroup, type)
    appendLabelErrorMessage($formGroup, type, errorMessage)
  }

  for (var i = 0; i < invalidFields.length; i++) {
    var $formGroup = $(invalidFields[i])
    var type = findInputType($formGroup)
    var errorMessage = getErrorMessage($formGroup, type)
    var linkID = getLinkID($formGroup)
    var label = getLabelText($formGroup, type)

    errorMessages.push({ linkID, label, message: errorMessage })

    addErrorClass($formGroup, type)
    appendLabelErrorMessage($formGroup, type, errorMessage)
  }

  prependErrorSummary()
  addErrorLinksToSummary(errorMessages)
  $(".govuk-error-summary").focus();
}

function getLabelText ($formGroup, type) {
  if (type === 'radio' || type === 'checkbox' || type === 'date') {
    return $formGroup.find('legend span:first').text()
  }
  return $formGroup.find('label').text()
}

function addErrorLinksToSummary (errorMessages) {
  var $errorSummaryList = $('.govuk-error-summary__list:first')
  $errorSummaryList.html('')
  for (var i = 0; i < errorMessages.length; i++) {
    var message = errorMessages[i].message
    $errorSummaryList.append(
      '<li>' +
        '<a href="#' + errorMessages[i].linkID + '">' +
          message +
        '</a>' +
      '</li>'
    )
  }
}

function prependErrorSummary () {
  var notPrepended = $('.govuk-error-summary').length === 0
  var heading = $('main').attr('data-errorHeading') || 'There is a problem'
  var description = $('main').attr('data-errorDescription') || ''
  if (notPrepended) {
    $('main').prepend(
      '<div class="govuk-error-summary govuk-grid-column-two-thirds" role="alert" aria-labelledby="govuk-error-summary-title" tabindex="-1">' +
      ' <h2 class="govuk-error-summary__title" id="govuk-error-summary-title">' +
          heading +
      ' </h2>' +
      ' <p>' +
          description +
      ' </p>' +
      ' <ul class="govuk-list govuk-error-summary__list">' +
      '  </ul>' +
      '</div>'
    )
  }
}

function appendLabelErrorMessage ($formGroup, type, errorMessage) {
  var notAppended = $formGroup.find('.govuk-error-message').length === 0
  if ((type === 'text' || type === 'textarea') && notAppended) {
    return $formGroup.find('label').append(
      '<span class="govuk-error-message">' + errorMessage + '</span>'
    )
  }

  if ((type === 'radio' || type === 'checkbox' || type === 'date') && notAppended) {
    return $formGroup.find('legend').append(
      '<span class="govuk-error-message">' + errorMessage + '</span>'
    )
  }
}

function getLinkID ($formGroup) {
  return $formGroup.find('input:first').attr('id') || ''
}

function getErrorMessage ($formGroup, type) {
  var customError = $formGroup.attr('data-required')
  if (customError) {
    return customError
  }
  return (type === 'text' || type === 'textarea' || type === 'date') ? 'Cannot be blank' : 'Choose an option'
}

function addErrorClass ($formGroup, type) {
  if (type === 'text' || type === 'textarea' || type === 'date') {
    $formGroup.find('.form-control').addClass('form-control-error')
  }
  $formGroup.addClass('govuk-form-group--error')
}

function findInputType ($formGroup) {
  if ($formGroup.find('.govuk-date-input').length > 0) {
    return 'date'
  }
  if ($formGroup.find('input[type="radio"]').length > 0) {
    return 'radio'
  }
  if ($formGroup.find('input[type="checkbox"]').length > 0) {
    return 'checkbox'
  }
  if ($formGroup.find('textarea').length > 0) {
    return 'textarea'
  }
  return 'text'
}

function isNino(val){
    var exp = /^(?!BG)(?!GB)(?!NK)(?!KN)(?!TN)(?!NT)(?!ZZ)(?:[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z])(?:\d){6}([A-D]|\s)?$/;
    return (exp.test(val));
}

function isUTR(val){
    var exp = /^(?:\d){9}([0-9]|\s)?$/;
    return (exp.test(val));
}

function isNumeric(a){
	return (/^[0-9]*$/.test( a ));
}

function isNumericWithoutCommas(a){
	var aStr = a.replace(/,/g, '');
	return (/^[0-9.]*$/.test( aStr ) && aStr != null && aStr != "");
}

function isNumericWholeNumberWithoutCommas(a){
	var aStr = a.replace(/,/g, '');
	return (/^[0-9]*$/.test( aStr ) && aStr != null && aStr != "");
}

function isCharLengthExactly(a,charLimit){
    var str = a.toString();
    if (str.length == charLimit){
		return true;
    }
    else{
        return false;
    }
}

function isCharLimitReached(a,charLimit){
    var str = a.toString();
    if (str.length > charLimit){
		return true;
    }
    else{
        return false;
    }
}

function isCharLimitReachedWithoutCommas(a,charLimit){
    var aStr = a.replace(/,/g, '').toString();
    if (aStr.length > charLimit){
	    return true;
    } else {
        return false;
    }
}
//login
function isValidlogin(val){
    var exp = /^([agent])*$|^([individual])*$/;
    return (exp.test(val));
}
//login

function isValidTelephoneNumber(tel){
    var exp = /^\+[0-9 ]{1,18}$|^[0-9 ]{1,19}$/;
    return (exp.test(tel));
}

function isValidCharacters(val){
    var exp = /^[A-Za-z0-9 ,.(/)&'-]*$/;
    return (exp.test(val));
}

function isValidclientref(val){
    var exp = /^[A-Za-z0-9 ,.(/)&'-]*$/;
    return (exp.test(val));
}

function isPostCode(val){
    var exp = /^((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))( )?[0-9][A-Za-z]{2})$/;
    return (exp.test(val));
}

function isValidCountry(val) {
    var exp = /^[0-9a-zA-Z ',.()-]*$/;
    return (exp.test(val));
}

function isValidPassportOrID(val) {
    var exp = /^[0-9a-zA-Z]*$/;
    return (exp.test(val));
}

function isValidEmail(email){
    var exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (exp.test(email));
}

function isDate(dateField){
    var regExp = /^[0-3]?[0-9]\/[0-1]?[0-9]\/[1-9][0-9][0-9][0-9]$/ ;
    if (!regExp.test(dateField)){
        return false
    }
    try {
        var dateStrSplit = dateField.split(/[\/]/);
        var inputDay = parseInt(dateStrSplit[0],10),
            inputMonth = parseInt(dateStrSplit[1],10),
            inputYear = parseInt(dateStrSplit[2],10);
        var convertedDate = new Date(Date.UTC(inputYear,inputMonth-1,inputDay,0,0,0)),
            convertedDay = convertedDate.getUTCDate(),
            convertedMonth = convertedDate.getUTCMonth() + 1;
        if (convertedDay === inputDay && convertedMonth === inputMonth){
            return true;
        }
    } catch (e) {}
    return false;
}

function isDateInPast(a) {
        //formats date of birth entered
        var enteredDate = convertToUKdate(a);
        //gets todays date
        var today = new Date();
        //compares todays date and turns true or false
        return today >= enteredDate;
}

function convertToUKdate(a) {
    var aStr = a;
    var dateStrSplit = aStr.split(/[\/]/);
    var day = dateStrSplit[0];
    var month = dateStrSplit[1];
    var year = dateStrSplit[2];
    return new Date(year,month-1,day);
}

function isDateInRange(a) {
 var aStr = a;
 var dateStrSplit = aStr.split(/[\/]/);
 var year = parseInt(dateStrSplit[2],10);
 if (year > 1499 && year < 2100) {
    return true;
 } else {
    return false;
 }
}

function isPercentage(percent) {
    var exp = /^([0-9]{1,2}|100)$/;
    return (exp.test(percent));
}
