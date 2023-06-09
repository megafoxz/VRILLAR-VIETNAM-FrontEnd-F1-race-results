import { convertLongWordToEasyWord } from "./helper";
import {
  ApplicationCookieTokenIDName,
  ApplicationLocalStorageUserDataName,
} from "./setting";

import moment from "moment";
export const TokenIDCookieName = ApplicationCookieTokenIDName;
export const UserDataLocalStorageName = ApplicationLocalStorageUserDataName;
export const CookieExpireDates = 365;
export const DefaultPaginationLimit = 10;
export const DefaultRequestTimeOutMs = 30000;
export const GenderTypeCodes = {
  Male: 1,
  Female: 2,
};

export const StatusCodes = {
  Deleted: -1,
  Active: 1,
};
export const StatusItems = [
  {
    value: StatusCodes.Active,
    text: "Active",
  },
  {
    value: StatusCodes.Deleted,
    text: "Deleted",
  },
];
export const UserTypeCodes = {
  Root: 1,
  Admin: 2,
  Doctor: 3,
  Optomologist: 4,
  Nurse: 5,
  Receptionist: 6,
  Technician: 6,
};
export const AllUserTypeCodes = Object.values(UserTypeCodes);
export const AllUserTypeNames = Object.keys(UserTypeCodes);
export const AlertType = {
  CheckIn: 1,
  Emergency: 2,
};
export const TABLE_OPTS = {
  itemsPerPage: 10,
};
//export const TimeStringsOptions = ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"];
export const TimeStringsOptions = [
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];
export const TABLE_ROWS_PER_PAGE = [2, 5, 10, 20, 50];
export const TABLE_FOOTER_PROPS = {
  itemsPerPageOptions: TABLE_ROWS_PER_PAGE,
};
export default {
  StatusCodes,
  StatusItems,
  UserTypeCodes,
  TokenIDCookieName,
  UserDataLocalStorageName,
  CookieExpireDates,
  DefaultPaginationLimit,
  DefaultRequestTimeOutMs,
};
export const CRUD_TYPE = {
  Create: 1,
  Read: 2,
  Update: 3,
  Delete: 4,
};

export const DiagnosisType = {
  Primary: "Primary",
  Additional: "Additional",
  Suspected: "Suspected",
};

export const TreatmentType = {
  Proceduce: "Proceduce/Accessment",
};

export const EyeType = {
  Right: 1,
  Left: 2,
};

export const ConclusionType = {
  Symptoms: 1,
  Normal: 2,
};

export const MED_UNIT_TYPES = {
  Tablet: 1,
  Bottle: 2,
  Tube: 3,
  Gram: 4,
  mGram: 5,
  Lit: 6,
  mLit: 7,
};

export const TypeEventCalendar = {
  Booking: 1,
  Roster: 2,
  RegisterEvent: 3,
};
export const OptionPrint = {
  Hover: 1,
  Horizontal: 2,
  Vertical: 3,
};

export const EventCategory = [
  {
    id: 1,
    bgColor: "#039be5",
    textColor: "#000000",
    text: "In Office",
  },
  {
    id: 2,
    bgColor: "#FF9800",
    textColor: "#000000",
    text: "Out of Office",
  },
  {
    id: 3,
    bgColor: "#4285f4",
    textColor: "#ffffff",
    text: "Vacation",
  },
  {
    id: 4,
    bgColor: "#F44336",
    textColor: "#ffffff",
    text: "Absence",
  },
  {
    id: 5,
    bgColor: "#616161",
    textColor: "#ffffff",
    text: "Reserved",
  },
];

export const MomentNearestMinutes = (minutes = 30) => {
  const start = moment();
  const remainder = minutes - (start.minute() % minutes);
  return moment(start).add(remainder, "minutes");
};

export const DefaultCalendarEventDto = {
  id: 0,
  categoryID: EventCategory[0].id,
  title: "",
  description: "",
  startDate: moment().startOf("day").format(),
  endDate: moment().endOf("day").format(),
  timeStart: MomentNearestMinutes(30).format(),
  timeEnd: MomentNearestMinutes(30).add(1, "hours").format(),
  isFullday: false,
  attendeeIDs: [],
  recurrence: null,
};

export const ListDayOfWeek = [
  {
    text: "Sunday",
    value: 1,
  },
  {
    text: "Monday",
    value: 2,
  },
  {
    text: "Tuesday",
    value: 3,
  },
  {
    text: "Wednesday",
    value: 4,
  },
  {
    text: "Thursday",
    value: 5,
  },
  {
    text: "Friday",
    value: 6,
  },
  {
    text: "Saturday",
    value: 7,
  },
];

export const ListWeekOfMonth = [
  {
    text: "1st",
    value: 1,
  },
  {
    text: "2nd",
    value: 2,
  },
  {
    text: "3rd",
    value: 3,
  },
  {
    text: "Last",
    value: 4,
  },
];

export const ListMonthOfYear = [
  {
    text: "January",
    value: 1,
  },
  {
    text: "February",
    value: 2,
  },
  {
    text: "March",
    value: 3,
  },
  {
    text: "April",
    value: 4,
  },
  {
    text: "May",
    value: 5,
  },
  {
    text: "June",
    value: 6,
  },
  {
    text: "July",
    value: 7,
  },
  {
    text: "August",
    value: 8,
  },
  {
    text: "September",
    value: 9,
  },
  {
    text: "October",
    value: 10,
  },
  {
    text: "November",
    value: 11,
  },
  {
    text: "December",
    value: 12,
  },
];

export const CalendarColor = {
  notComing: {
    statusID: "notComming",
    text: "Not Comming",
    color: "#de350b",
  },
  late: {
    statusID: "late",
    text: "Late",
    color: "#ff991f",
  },
  inComming: {
    statusID: "inComming",
    text: "In Comming",
    color: "#0052cc",
  },
};

// handler for axios
export class ApiResponse {
  StatusAPI = {
    //
    100: "Continue",
    101: "Switching Protocol",
    102: "Processing",
    103: "Early Hints",
    //
    200: "OK",
    201: "Created",
    202: "Accept",
    203: "Non-Authoritative Information",
    204: "No content",
    //
    300: "Multiple choices",
    301: "Moved Permanently",
    302: "Found",
    303: "See Other",
    304: "Not Modified",
    307: "Temporary Redirect",
    //
    400: "Bad request! Or some inputs are missing",
    401: "Unauthorized! You are not allowed to access!",
    403: "Forbidden",
    404: "Not found! Or the url is not correct!",
    405: "Method not allowed!",
    406: "Not acceptable!",
    412: "Precondition failed",
    415: "Unsupported media type",
    //
    500: "Internal Server Error! Or something makes it broken",
    501: "Not Implemented",
    0: "Unknown status code",
  };

  statusCode;
  data = null;
  header = "";
  message = "";
  error;
  axiosInstance;

  constructor(axiosInstance, error = false) {
    this.axiosInstance = axiosInstance;
    this.error = error;
  }
  // format response
  formatResponse() {
    if (this.error) {
      if (this.axiosInstance.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        this.statusCode = this.axiosInstance.response.status;
        this.data = this.axiosInstance.response.data;
        this.header = this.axiosInstance.response.headers;
        // format message
        // this.data: from Back end return
        if (this.data != null) {
          if (this.data.errorMessage) {
            this.message = convertLongWordToEasyWord(
              this.data.errorMessage,
              ""
            );
          } else {
            this.message = this.data.errorName
              ? convertLongWordToEasyWord(this.data.errorName, "")
              : this.StatusAPI[this.statusCode];
          }
        } else {
          this.message = this.StatusAPI[this.statusCode]
            ? this.StatusAPI[this.statusCode]
            : "Something went wrong!";
        }
      } else if (this.axiosInstance.request) {
        // the request was made but no response was received
        this.message = "Not response from server! Something went wrong!";
        this.statusCode = 0;
      } else {
        // Something happened in setting up the request that triggered an Error
        this.message = this.axiosInstance.message;
        this.statusCode = 0;
      }
    }
    return this;
  }

  getResult() {
    return {
      error: this.axiosInstance.toString(),
      message: this.message,
      statusCode: this.statusCode,
      header: this.header,
    };
  }
}

export const BookingAdditionalStatType = {
  Allergy: 1,
  ChronicDisease: 2,
  PersonalBehaviour: 3,
  PastHistory: 4,
  FamilyHistory: 5,
};

export const PaymentMethodType = {
  Cash: 1,
  Card: 2,
  Transfer: 3,
  App: 4,
  Others: 5,
};

export const AnalysisStatusType = {
  All: "",
  Queued: 1,
  Processing: 2,
  Success: 3,
  Failed: 0,
  Deleted: -1,
};
