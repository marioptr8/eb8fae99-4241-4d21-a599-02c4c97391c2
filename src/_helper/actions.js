export const actions = {
  retrieveWeatherToday,
  retrieveWeatherTomorrow
}

const apiKey = "637bb86c7e461caddfdcfee5cbd71a1c"

function userVerification(response) {
  if (!response.ok || response.status !== 200) {
    return Promise.reject(response.statusText);
  }
  return response.json();
}
function printError(err) {
  throw err;
}


function retrieveWeatherToday (cityId) {
  const url = "https://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&units=metric&appid=" + apiKey
  const requestOptions = { method: "GET" };
  return fetch(url, requestOptions)
    .then(userVerification)
    .then(data => {
      if (!data) {
        var errorMsg = "Si è verificato un errore"
        throw new Error(errorMsg);
      }
      return data;
    })
    .catch(printError)
}

function retrieveWeatherTomorrow (cityId) {
  const url = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&units=metric&appid=" + apiKey
  const requestOptions = { method: "GET" };
  return fetch(url, requestOptions)
    .then(userVerification)
    .then(data => {
      if (!data) {
        var errorMsg = "Si è verificato un errore"
        throw new Error(errorMsg);
      }
      let now = new Date()
			let tomorrow = new Date(now.setDate(now.getDate() + 1)).toLocaleDateString().split("/")
			let tomorrowCorrectDate = tomorrow[2] + "-" + tomorrow[1] + "-" + tomorrow[0] + " 15:00:00"
			for (let d of data.list) {
				if (d.dt_txt === tomorrowCorrectDate) return d
			}
    })
    .catch(printError)
}
