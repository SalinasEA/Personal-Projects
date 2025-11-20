/*
Step 1: Implement ready event handler
Create a jQuery ready event handler that updates the options within the <select> element with ID toCurrency such that:

The first <option> element is: <option value="" disabled selected>Select currency</option>
Only the currencies listed in the rates property of the exchangeRates object should appear in the dropdown
The <option> element for each currency should show the full currency name followed by the currency's abbreviation in parentheses
Ex: Canadian Dollar (CAD)
The value for each <option> element should be the currency abbreviation
The allCurrencies object in the provided JavaScript template provides a mapping from all possible abbreviations to full currency name
Once this step is completed, the "Select currency" dropdown should display six options.

Dropdown with 6 options: Select currency, Bitcoin (BTC), Canadian Dollar (CAD), Euro (EUR), Japanese Yen (JPY), United States Dollar (USD).

Step 2: Implement change event handler
Create a jQuery change event handler for the select dropdown that:

Converts the user-entered US dollars to the selected currency using the rates listed in the exchangeRatesobject. Display the converted currency with two decimal digits.
Ex: If the user-entered US dollars is 100.00, Canadian Dollar (CAN) is elected, and the exchange rate is "CAD": 1.316853, the resulting converted currency is 131.69
Displays the resulting converted currency by updating the read-only <input> element with ID resultCurrency
Updates the associated label for resultCurrency to the selected currency's full currency name, currency abbreviation in parentheses, and colon
Ex: Canadian Dollar (CAN):
Once this step is completed, the conversion from US dollars to the selected currency will happen as soon as the currency is selected from the dropdown menu.

Step 3: Implement click event handler
Create a jQuery click handler for the Update Rates button that:

Updates the exchangeRates object by calling JSON.parse() with the JSON string provided in the <textarea> element with ID exchangeRates
Updates the select dropdown such that only the currencies listed in the rates property of the updated exchangeRates object appear in the dropdown
Resets the read-only <input> element with ID resultCurrency to display "---.--"
Resets the associated label for resultCurrency to display "To Currency ():"
Once this step is completed, clicking the Update Rates button should load the JSON from the textbox. Then the dropdown menu will show some new currency options.
*/

// Mapping of all currency abbreviations to full currency name
let allCurrencies = {
  "AED": "United Arab Emirates Dirham",
  "AFN": "Afghan Afghani",
  "ALL": "Albanian Lek",
  "AMD": "Armenian Dram",
  "ANG": "Netherlands Antillean Guilder",
  "AOA": "Angolan Kwanza",
  "ARS": "Argentine Peso",
  "AUD": "Australian Dollar",
  "AWG": "Aruban Florin",
  "AZN": "Azerbaijani Manat",
  "BAM": "Bosnia-Herzegovina Convertible Mark",
  "BBD": "Barbadian Dollar",
  "BDT": "Bangladeshi Taka",
  "BGN": "Bulgarian Lev",
  "BHD": "Bahraini Dinar",
  "BIF": "Burundian Franc",
  "BMD": "Bermudan Dollar",
  "BND": "Brunei Dollar",
  "BOB": "Bolivian Boliviano",
  "BRL": "Brazilian Real",
  "BSD": "Bahamian Dollar",
  "BTC": "Bitcoin",
  "BTN": "Bhutanese Ngultrum",
  "BWP": "Botswanan Pula",
  "BYN": "Belarusian Ruble",
  "BZD": "Belize Dollar",
  "CAD": "Canadian Dollar",
  "CDF": "Congolese Franc",
  "CHF": "Swiss Franc",
  "CLF": "Chilean Unit of Account (UF)",
  "CLP": "Chilean Peso",
  "CNH": "Chinese Yuan (Offshore)",
  "CNY": "Chinese Yuan",
  "COP": "Colombian Peso",
  "CRC": "Costa Rican Colón",
  "CUC": "Cuban Convertible Peso",
  "CUP": "Cuban Peso",
  "CVE": "Cape Verdean Escudo",
  "CZK": "Czech Republic Koruna",
  "DJF": "Djiboutian Franc",
  "DKK": "Danish Krone",
  "DOP": "Dominican Peso",
  "DZD": "Algerian Dinar",
  "EGP": "Egyptian Pound",
  "ERN": "Eritrean Nakfa",
  "ETB": "Ethiopian Birr",
  "EUR": "Euro",
  "FJD": "Fijian Dollar",
  "FKP": "Falkland Islands Pound",
  "GBP": "British Pound Sterling",
  "GEL": "Georgian Lari",
  "GGP": "Guernsey Pound",
  "GHS": "Ghanaian Cedi",
  "GIP": "Gibraltar Pound",
  "GMD": "Gambian Dalasi",
  "GNF": "Guinean Franc",
  "GTQ": "Guatemalan Quetzal",
  "GYD": "Guyanaese Dollar",
  "HKD": "Hong Kong Dollar",
  "HNL": "Honduran Lempira",
  "HRK": "Croatian Kuna",
  "HTG": "Haitian Gourde",
  "HUF": "Hungarian Forint",
  "IDR": "Indonesian Rupiah",
  "ILS": "Israeli New Sheqel",
  "IMP": "Manx pound",
  "INR": "Indian Rupee",
  "IQD": "Iraqi Dinar",
  "IRR": "Iranian Rial",
  "ISK": "Icelandic Króna",
  "JEP": "Jersey Pound",
  "JMD": "Jamaican Dollar",
  "JOD": "Jordanian Dinar",
  "JPY": "Japanese Yen",
  "KES": "Kenyan Shilling",
  "KGS": "Kyrgystani Som",
  "KHR": "Cambodian Riel",
  "KMF": "Comorian Franc",
  "KPW": "North Korean Won",
  "KRW": "South Korean Won",
  "KWD": "Kuwaiti Dinar",
  "KYD": "Cayman Islands Dollar",
  "KZT": "Kazakhstani Tenge",
  "LAK": "Laotian Kip",
  "LBP": "Lebanese Pound",
  "LKR": "Sri Lankan Rupee",
  "LRD": "Liberian Dollar",
  "LSL": "Lesotho Loti",
  "LYD": "Libyan Dinar",
  "MAD": "Moroccan Dirham",
  "MDL": "Moldovan Leu",
  "MGA": "Malagasy Ariary",
  "MKD": "Macedonian Denar",
  "MMK": "Myanma Kyat",
  "MNT": "Mongolian Tugrik",
  "MOP": "Macanese Pataca",
  "MRO": "Mauritanian Ouguiya (pre-2018)",
  "MRU": "Mauritanian Ouguiya",
  "MUR": "Mauritian Rupee",
  "MVR": "Maldivian Rufiyaa",
  "MWK": "Malawian Kwacha",
  "MXN": "Mexican Peso",
  "MYR": "Malaysian Ringgit",
  "MZN": "Mozambican Metical",
  "NAD": "Namibian Dollar",
  "NGN": "Nigerian Naira",
  "NIO": "Nicaraguan Córdoba",
  "NOK": "Norwegian Krone",
  "NPR": "Nepalese Rupee",
  "NZD": "New Zealand Dollar",
  "OMR": "Omani Rial",
  "PAB": "Panamanian Balboa",
  "PEN": "Peruvian Nuevo Sol",
  "PGK": "Papua New Guinean Kina",
  "PHP": "Philippine Peso",
  "PKR": "Pakistani Rupee",
  "PLN": "Polish Zloty",
  "PYG": "Paraguayan Guarani",
  "QAR": "Qatari Rial",
  "RON": "Romanian Leu",
  "RSD": "Serbian Dinar",
  "RUB": "Russian Ruble",
  "RWF": "Rwandan Franc",
  "SAR": "Saudi Riyal",
  "SBD": "Solomon Islands Dollar",
  "SCR": "Seychellois Rupee",
  "SDG": "Sudanese Pound",
  "SEK": "Swedish Krona",
  "SGD": "Singapore Dollar",
  "SHP": "Saint Helena Pound",
  "SLL": "Sierra Leonean Leone",
  "SOS": "Somali Shilling",
  "SRD": "Surinamese Dollar",
  "SSP": "South Sudanese Pound",
  "STD": "São Tomé and Príncipe Dobra (pre-2018)",
  "STN": "São Tomé and Príncipe Dobra",
  "SVC": "Salvadoran Colón",
  "SYP": "Syrian Pound",
  "SZL": "Swazi Lilangeni",
  "THB": "Thai Baht",
  "TJS": "Tajikistani Somoni",
  "TMT": "Turkmenistani Manat",
  "TND": "Tunisian Dinar",
  "TOP": "Tongan Pa'anga",
  "TRY": "Turkish Lira",
  "TTD": "Trinidad and Tobago Dollar",
  "TWD": "New Taiwan Dollar",
  "TZS": "Tanzanian Shilling",
  "UAH": "Ukrainian Hryvnia",
  "UGX": "Ugandan Shilling",
  "USD": "United States Dollar",
  "UYU": "Uruguayan Peso",
  "UZS": "Uzbekistan Som",
  "VEF": "Venezuelan Bolívar Fuerte",
  "VND": "Vietnamese Dong",
  "VUV": "Vanuatu Vatu",
  "WST": "Samoan Tala",
  "XAF": "CFA Franc BEAC",
  "XAG": "Silver Ounce",
  "XAU": "Gold Ounce",
  "XCD": "East Caribbean Dollar",
  "XDR": "Special Drawing Rights",
  "XOF": "CFA Franc BCEAO",
  "XPD": "Palladium Ounce",
  "XPF": "CFP Franc",
  "XPT": "Platinum Ounce",
  "YER": "Yemeni Rial",
  "ZAR": "South African Rand",
  "ZMW": "Zambian Kwacha",
  "ZWL": "Zimbabwean Dollar"
};

// Initial data for exchange rates
let exchangeRates = {
   "disclaimer": "Usage subject to terms: https://openexchangerates.org/terms",
   "license": "https://openexchangerates.org/license",
   "timestamp": 1534107604,
   "base": "USD",
   "rates": {
      "BTC": 0.000157753542,
      "CAD": 1.316853,
      "EUR": 0.879353,
      "JPY": 110.46550427,
      "USD": 1,
   }
};

// Ready event handler for options
$(function () {
   updateToCurrency();
})

// Function to populate the currency options in the dropdown
function updateToCurrency() {
   let $toCurrency = $("#toCurrency");
   let currencyArray = Object.keys(exchangeRates.rates);

   // Set the initial "Select currency" option
   $("#toCurrency").html('<option value="" disabled selected>Select currency</option>');

   // Loop through each currency and append it to the dropdown
   for (let i = 0; i < currencyArray.length; i++) {
      let currency = currencyArray[i];
      $toCurrency.append(`<option value=${currency}>${allCurrencies[currency]} (${currency})</option>`);
   }
}

// Change event handler for when a new currency is selected
$("#toCurrency").change(function () {
   // Selected currency code
   let $selectedCurrency = $("#toCurrency").val();
   // Inputted USD value from the user
   let $usdInput = parseFloat($("#usdInput").val());
   // Output field for the result
   let $resultCurrency = $("#resultCurrency");
   // Exchange rate value of selected currency
   let rate = exchangeRates.rates[$selectedCurrency];
   // Update the result by multiplying USD input by the exchange rate
   $resultCurrency.val(($usdInput * rate).toFixed(2));
});

// Update rates button handler
$("#updateRates").click(function () {
   // Parse the updated rates from the input field and update the exchange rates
   let exchangeRatesText = $("#exchangeRates").val();
   let parsedRates = JSON.parse(exchangeRatesText);
   exchangeRates = parsedRates;
   updateToCurrency();

   // Reset the result currency value
   $("#resultCurrency").val("---.--");
   $("#resultLabel").val("To Currency ():")
});