export const actions = {
  retrieveWeather
}

const apiKey = "637bb86c7e461caddfdcfee5cbd71a1c"

function userVerification(response) {
  if (!response.ok || response.status !== 200) {
    return Promise.reject(response.statusText);
  }
  return response.json();
}
function dataReturn(data) {
  if (!data) {
    var errorMsg = "Si è verificato un errore"
    throw new Error(errorMsg);
  }
  return data;
}
function printError(err) {
  throw err;
}


function retrieveWeather (cityId) {
  const url = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&units=metric&appid=" + apiKey
  const requestOptions = { method: "GET" };
  return fetch(url, requestOptions)
    .then(userVerification)
    .then(dataReturn)
    .catch(printError)
}
