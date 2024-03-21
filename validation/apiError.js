//this class  is responible about operation errors
// const Error =require("../middleware/error")
class ApiError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";    }
  }
  module.exports = ApiError;