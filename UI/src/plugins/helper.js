/* eslint-disable */
import {
  DefaultPaginationLimit,
  TokenIDCookieName,
  GenderTypeCodes,
  StatusCodes,
  UserTypeCodes,
} from "./constant";

import moment from "moment";

function setCookie(cname, cvalue, exdays) {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  const name = cname;
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return "";
}

const deleteCookie = (cname) => {
  const name = cname;
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

function setLocalStorage(lname, lvalue) {
  localStorage.setItem(lname, lvalue);
  return true;
}

function removeLocalStorage(lname) {
  localStorage.removeItem(lname);
  return true;
}

function getLocalStorage(lname) {
  const stringData = localStorage.getItem(lname);
  if (!stringData) {
    return null;
  }
  return stringData;
}

function parseLocalStorage(lname) {
  const stringData = getLocalStorage(lname);
  if (!stringData) {
    return null;
  }
  return JSON.parse(stringData);
}

function buildUrl(url, query) {
  if (!query || query === {} || Array.isArray(query)) {
    return url;
  }
  for (const keyname in query) {
    if (typeof query[keyname] == "object") {
      continue;
    }
    const param = `{${keyname}}`;
    while (url.includes(param)) {
      url = url.replace(param, query[keyname]);
    }
  }
  const queries = [];
  for (const keyname in query) {
    if (typeof query[keyname] !== "object") {
      queries.push(`${keyname}=${query[keyname]}`);
      continue;
    }
    if (Array.isArray(query[keyname])) {
      queries.push(`${keyname}=${query[keyname].join(",")}`);
    } else {
      queries.push(`${keyname}=${JSON.stringify(query[keyname])}`);
    }
  }
  return `${url}?${queries.join("&")}`;
}

function getDefaultRequestHeaders() {
  return {
    page: 1,
    limit: DefaultPaginationLimit,
    "Content-Type": "application/json",
    Authorization: getLocalStorage(TokenIDCookieName),
  };
}

function buildHeaders(headers) {
  let requestHeaders = getDefaultRequestHeaders();

  if (!headers) {
    return requestHeaders;
  }
  if (Array.isArray(headers)) {
    return requestHeaders;
  }
  for (let keyname in headers) {
    requestHeaders[keyname.toLowerCase()] = headers[keyname];
  }

  return requestHeaders;
}

export default {
  getCookie,
  setCookie,
  deleteCookie,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  parseLocalStorage,
  buildUrl,
  buildHeaders,
};

export function capitalize(s) {
  if (!s) return null;
  return s[0].toUpperCase() + s.slice(1);
}

export const getNameInnitial = (string) => {
  if (!string) return "";
  var names = string.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

export const getFirstNameInnitialFullLastName = (string) => {
  if (!string) return "";
  var names = string.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += "." + names[names.length - 1];
  }
  return initials;
};

export const getGenderStatusCodeOptions = () => {
  var result = [];
  for (var codeName in GenderTypeCodes) {
    result.push({
      text: codeName,
      value: GenderTypeCodes[codeName],
    });
  }
  return result;
};

export const convertPriceString = (val, isVND = true, forceMinus = false) => {
  if (val == 0) return "0.000" + (isVND ? " VND" : "");
  if (!val || isNaN(val)) return "";

  // if val is actually < 0 => forceMinus = true
  if (val < 0) {
    return convertPriceString(Math.abs(val), isVND, true);
  }

  const valStr = typeof val === "string" ? val : val.toString();
  const valDec = valStr.split(".")[0];

  var result =
    valDec.replace(/./g, function (c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
    }) + (isVND ? " VND" : "");

  return `${forceMinus ? "- " : ""}` + result;
};

export const deconvertPriceString = (str) => {
  if (!str) return 0;
  var isMinus = str.includes("-");
  var numb = str.match(/\d/g);
  numb = numb.join("");
  if (isMinus) {
    numb = "-" + numb;
  }
  return parseInt(numb);
};

export const getNumberFromString = (str) => {
  if (!str) return 0;
  var numb = str.match(/\d/g);
  numb = numb.join("");
  return parseInt(numb);
};

export const formatNumber = (val) => {
  if (!val || isNaN(val)) return "";

  const valStr = typeof val === "string" ? val : val.toString();
  const valDec = valStr.split(",")[0];
  // const valExponent = valStr.split('.')[1] ? ',' + valStr.split('.')[1] : ''

  return valDec.replace(/,/g, function (c, i, a) {
    return i > 0 && c !== "," && (a.length - i) % 3 === 0 ? "," + c : c;
  });
};

export const getStatusCodeOptions = () => {
  var result = [];
  for (var codeName in StatusCodes) {
    result.push({
      text: codeName,
      value: StatusCodes[codeName],
    });
  }
  return result;
};

export const getUserTypeCodeOptions = () => {
  var result = [];
  for (var codeName in UserTypeCodes) {
    result.push({
      text: codeName,
      value: UserTypeCodes[codeName],
    });
  }
  return result;
};

export const getStatusColor = (statusCode) => {
  var colorCode = {
    "-1": "red",
    1: "green",
  };
  return colorCode[statusCode.toString()];
};

export const getStatusName = (statusCode) => {
  var statusName = {
    "-1": "Deleted",
    1: "Active",
  };
  return statusName[statusCode.toString()];
};

export const awaitAll = (promises) => {
  return new Promise((resolve, reject) => {
    Promise.all(promises)
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

export const makeUuid = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const currencyFormat = (num, position, char) => {
  if (num == null) {
    return 0;
  }

  var number = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

  switch (position) {
    case "head":
      number = char + number;
      break;
    case "end":
      number = number + char;
      break;

    default:
      break;
  }

  return number;
};

export const cleanDateTime = (date) => {
  var dateOutput = new Date(date);
  var day = `${dateOutput.getDate()}-${dateOutput.getMonth()}-${dateOutput.getFullYear()}`;
  var time = `${dateOutput.getHours()}:${dateOutput.getMinutes()}`;

  return day + " " + time;
};

export class FormatDate {
  constructor(dateTime) {
    this.dateTime = new Date(dateTime);
    this.year = this.dateTime.getFullYear();
    this.month = this.dateTime.getMonth(); //[0-11]
    this.date = this.dateTime.getDate(); //[1-31]
    this.day = this.dateTime.getDay();

    this.hour = this.dateTime.getHours(); // [0-23]
    this.minutes = this.dateTime.getMinutes(); // [0-59]
    this.seconds = this.dateTime.getSeconds(); // [0-59]

    this.clean();

    this.rule = [
      {
        format: "YYYY",
        val: this.year,
      },
      {
        format: "dd",
        val: this.day,
      },
      {
        format: "mm",
        val: this.month,
      },
      {
        format: "h",
        val: this.hour,
      },
      {
        format: "i",
        val: this.minutes,
      },
      {
        format: "s",
        val: this.seconds,
      },
    ];

    this.defaultFormat = "YYYY-dd-mm H:i:s";
  }

  clean() {
    let arrayKey = Object.getOwnPropertyNames(this);
    arrayKey.forEach((key) => {
      if (typeof this[key] === "number") {
        if (this[key] < 10) {
          this[key] = "0" + this[key].toString();
        }
        if (key === "month") {
          this[key] = parseInt(this[key]) + 1;
        }
      }
    });
  }

  getTime() {
    return `${this.date}-${this.month}-${this.year} ${this.hour}:${this.minutes}:${this.seconds}`;
  }

  set displayFormat(newFormat) {
    this.defaultFormat = newFormat;
  }
}

/**
 * Convert a vietnamese characters into alphabet characters to compare easily
 * @param {*} input
 * @return string alphabet
 */
export const transliterateChar = (input) => {
  var mappings = {
    ĂÂÀẰẦẢẲẨÃẴẪÁẮẤẠẶẬ: "A",
    ÊÈỀẺỂẼỄÉẾẸỆ: "E",
    ÌỈĨÍỊ: "I",
    ÔƠÒỒỜỎỔỞÕỖỠÓỐỚỌỘỢ: "O",
    ƯÙỪỦỬŨỮÚỨỤỰ: "U",
    ỲỶỸỴ: "Y",
    ăâàằầảẳẩãẵẫáắấạặậ: "a",
    êèềẻểẽễéếẹệ: "e",
    ìỉĩíị: "i",
    ôơòồờỏổởõỗỡóốớọộợ: "o",
    ưùừủửũữúứụự: "u",
    ỳỷỹỵ: "y",
  };
  for (const c of input.split(""))
    for (const mapping in mappings)
      if (mapping.includes(c)) input = input.replaceAll(c, mappings[mapping]);
  return input;
};

export const startOfDay = () =>
  moment().startOf("day").format("YYYY-MM-DD HH:mm:ss");
export const endOfDay = () =>
  moment().endOf("day").format("YYYY-MM-DD HH:mm:ss");

export const sleep = (milliseconds = 100) => {
  return new Promise((resolve) => {
    var timeout = setTimeout(() => {
      clearTimeout(timeout);
      resolve();
    }, milliseconds);
  });
};

export const applyNaIntoNullFields = (items) => {
  items.forEach((item) => {
    for (var key in item) {
      if (!item[key]) {
        item[key] = "NA";
      }
    }
  });
};

// get Key of Object by Value
export const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

// convert long string to part of string, between word is space
export const convertLongWordToEasyWord = (stringInput = "", result) => {
  let string = stringInput;
  let resultString = result;

  for (let i = 0; i < string.length; i++) {
    let char = string.charAt(i);
    if (char == " ") {
      i = i + 1;
      char = string.charAt(i).toUpperCase(); // get next char
    }
    if (char == char.toUpperCase()) {
      resultString =
        i == 0 && resultString == "" ? char : `${resultString} ${char}`;
    } else {
      if (i == 0 && resultString == "") {
        resultString = char.toUpperCase();
      } else {
        resultString += `${char}`;
      }
    }
    if (i + 1 == string.length) {
      return resultString;
    }
    let nextString = string.slice(i + 1, string.length);
    return convertLongWordToEasyWord(nextString, resultString);
  }
  return result;
};

export const calculateAverage = (items) => {
  var sum = 0;
  for (var i = 0; i < items.length; i++) {
    sum += parseInt(items[i], 10); //don't forget to add the base
  }
  return sum / items.length;
};
