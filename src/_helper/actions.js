export const actions = {
  retrieveCurrentWeather
}

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

/*******************************************************************************
  LISTA ANNI ACCADEMICI
*******************************************************************************/

function retrieveCurrentWeather (cityId) {
  const url = "api.openweathermap.org/data/2.5/weather?id=" + cityId
  const requestOptions = {
    method: "GET"
  };
  return fetch(url, requestOptions)
    .then(userVerification)
    .then(dataReturn)
    .catch(printError)
}
