import React, { Component } from 'react';
import { actions } from './_helper/actions';

export default class WeatherCard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			forecast: {}
		}
	}

	componentDidMount = async () => {
		let {forecast} = this.state
		let json = await actions.retrieveWeather(this.props.cityId);
		if (this.props.day === "today") {
			forecast = json.list[0]
		} else {
			let now = new Date()
			let tomorrow = new Date(now.setDate(now.getDate() + 1)).toLocaleDateString().split("/")
			let tomorrowCorrectDate = tomorrow[2] + "-" + tomorrow[1] + "-" + tomorrow[0] + " 15:00:00"
			for (let j of json.list) {
				if (j.dt_txt === tomorrowCorrectDate) forecast = j
			}
		}
		this.setState({ forecast })
	}

	render = () => {
		return (
			<div className="col-xs-12 col-sm-6 mt-4">
				{this.state.forecast.weather ?
		      <div className="card bg-light boxShadow">
		        <div className="card-body">
		          <div className="row text-center">
		            <div className="col-5 align-self-center">
									<img width="100%" src={"http://openweathermap.org/img/wn/" + this.state.forecast.weather[0].icon + "@2x.png"} alt={this.state.forecast.weather[0].description}/>
		            </div>
		            <div className="col-7 align-self-center">
		              <p className="h2">{this.state.forecast.dt_txt.substring(11, 16)}</p>
		              <p className="mb-0 h5">{this.props.cityName}</p>
		            </div>
		            <div className="col-12">
		              <p className="card-title mb-0 display-3">{Math.round(this.state.forecast.main.temp)}°</p>
		            </div>
		          </div>
		        </div>
		      </div>
					: false }
	    </div>
		)
	}
}
