import axios from "axios";
import AppConstant from "./constant";
import Helper from "./helper";

export default class HttpClient {
  constructor(baseUrl) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: AppConstant.DefaultRequestTimeOutMs,
    });
  }

  getOptions(header = {}) {
    var options = {
      headers: Helper.buildHeaders(header),
    };
    return options;
  }

  handleError(err) {
    return {
      error: err.toString(),
    };
  }

  get(url, query = {}, headers = {}) {
    let options = this.getOptions(headers);

    url = Helper.buildUrl(url, query);

    return new Promise((resolve) => {
      this.axiosInstance
        .get(url, options)
        .then((res) => resolve(res.data))
        .catch((err) => resolve(this.handleError(err)));
    });
  }

  getFile(
    url,
    query = {},
    headers = {},
    contentType = "plain/text",
    filename = "DownloadedFile"
  ) {
    let options = this.getOptions(headers);
    options["Content-Type"] = contentType;
    options["responseType"] = "blob";
    url = Helper.buildUrl(url, query);

    return new Promise((resolve) => {
      this.axiosInstance
        .get(url, options)
        .then((res) => {
          var { data } = res;
          const url = window.URL.createObjectURL(
            new Blob([data], {
              type: contentType,
            })
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          resolve(true);
        })
        .catch((err) => resolve(this.handleError(err)));
    });
  }

  post(url, query = {}, body = {}, headers = {}) {
    let options = this.getOptions(headers);
    url = Helper.buildUrl(url, query);

    return new Promise((resolve) => {
      this.axiosInstance
        .post(url, body, options)
        .then((res) => resolve(res.data))
        .catch((err) => {
          resolve(this.handleError(err));
        });
    });
  }

  put(url, query = {}, body = {}, headers = {}) {
    let options = this.getOptions(headers);
    url = Helper.buildUrl(url, query);

    return new Promise((resolve) => {
      this.axiosInstance
        .put(url, body, options)
        .then((res) => resolve(res.data))
        .catch((err) => resolve(this.handleError(err)));
    });
  }

  postFile(
    url,
    query = {},
    file,
    body = {},
    headers = {},
    onUploadProgress = null
  ) {
    let formData = new FormData();
    formData.append("file-upload", file);

    for (let key in body) {
      formData.append(key, body[key]);
    }

    let options = this.getOptions(headers);
    if (onUploadProgress) {
      options.onUploadProgress = onUploadProgress;
    }

    url = Helper.buildUrl(url, query);

    return new Promise((resolve) => {
      this.axiosInstance
        .post(url, formData, options)
        .then((res) => resolve(res.data))
        .catch((err) => resolve(this.handleError(err)));
    });
  }
}
