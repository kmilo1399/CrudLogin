import moment from "moment-timezone";
const helpers = {};

helpers.timeago = (timestamp) => {
  // Convertir a la zona horaria de Colombia
  const localTime = moment(timestamp).tz("America/Bogota").fromNow();
  return localTime;
};

export default helpers;
