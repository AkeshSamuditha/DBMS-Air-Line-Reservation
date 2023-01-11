function ResponseHandler(status) {
  if (!(status instanceof Object)) {
    if (status.includes("Error")) {
      return "400";
    } else if (status.includes("AccessDenied")) {
      return "203";
    } else {
      return "200";
    }
  } else {
    console.log("2");
    return "200";
  }
}

module.exports = { ResponseHandler };
