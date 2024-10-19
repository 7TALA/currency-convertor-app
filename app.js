let country_list = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
  };
  
  // API key from ExchangeRate API
  let apiKey = "c054993a84fb2acfade2e64b";
  
const dropList = document.querySelectorAll(".fromto select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const getBtn = document.querySelector("button");
const amount = document.querySelector("input");
const exchangeRateText = document.querySelector(".exchange-rate");
const exhangeIcon = document.querySelector(".fromto .icon");
const specificDateInput = document.querySelector(".specific-date-input");
const specificHistoricalRateText = document.querySelector(".specific-historical-rate");
const getSpecificHistoricalBtn = document.querySelector(".get-specific-historical-btn");

// Populate currency options
for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_list) {
    let selected = i == 0 ? (currency_code == "USD" ? "selected" : "") : currency_code == "EUR" ? "selected" : "";
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

// Load the selected country flag
const loadFlag = (element) => {
  for (let code in country_list) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
    }
  }
};

// Get the exchange rate
const getExchangeRate = () => {
  let amountVal = amount.value;
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }

  exchangeRateText.innerText = "Getting exchange rate...";
  exchangeRateText.style.color = "black";

  let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      if (!result.conversion_rates || !result.conversion_rates[toCurrency.value]) {
        throw new Error("Invalid currency data received");
      }
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalExRate = (amountVal * exchangeRate).toFixed(2);
      exchangeRateText.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    })
    .catch((error) => {
      exchangeRateText.innerText = `Error: ${error.message || "Something went wrong"}`;
      exchangeRateText.style.color = "red";
    });
};

// Get historical exchange rates
const getSpecificHistoricalRate = () => {
    let specificDate = new Date(specificDateInput.value);
    if (!specificDateInput.value) {
        alert("Please select a date.");
        return;
    }

    let year = specificDate.getFullYear();
    let month = specificDate.getMonth() + 1; // Months are zero-based
    let day = specificDate.getDate();

    // Format month and day to avoid leading zeros
    month = month.toString();
    day = day.toString();

    specificHistoricalRateText.innerText = "Getting historical rate...";
    specificHistoricalRateText.style.color = "black"; // Reset color

    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/history/${fromCurrency.value}/${year}/${month}/${day}`;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((result) => {
            if (!result.conversion_rates || !result.conversion_rates[toCurrency.value]) {
                throw new Error("No historical data found for the selected date.");
            }

            let rate = result.conversion_rates[toCurrency.value];
            specificHistoricalRateText.innerText = `On ${specificDate.toDateString()}, ${fromCurrency.value} to ${toCurrency.value} = ${rate}`;
        })
        .catch((error) => {
            specificHistoricalRateText.innerText = `Error: ${error.message || "Something went wrong"}`;
            specificHistoricalRateText.style.color = "red"; // Change color on error
        });
};

// Event Listener 
window.addEventListener("load", () => {
    getExchangeRate(); // Fetch initial exchange rate on page load
  });
  
  getBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate(); // Fetch exchange rate when the user clicks the button
  });
getSpecificHistoricalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getSpecificHistoricalRate(); // Fetch specific historical rate on button click
})

exhangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;

  loadFlag(fromCurrency); // Load flags after the currency switch
  loadFlag(toCurrency);
  getExchangeRate();// Re-fetch the exchange rate after swapping currencies
});
