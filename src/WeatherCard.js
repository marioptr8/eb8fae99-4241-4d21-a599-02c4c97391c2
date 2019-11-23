import React, { Component } from 'react';
import { actions } from './_helper/actions';

export default class WeatherCard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			forecast: {},
			date: ""
		}
	}

	componentDidMount = async () => {
		let {forecast, date} = this.state
		if (this.props.day === "today") {
			forecast = await actions.retrieveWeatherToday(this.props.cityId);
			let now = new Date()
			date = now.getHours() + ":" + (now.getMinutes() < 10 ? "0" : "") + now.getMinutes()
		} else {
			forecast = await actions.retrieveWeatherTomorrow(this.props.cityId);
			date = forecast.dt_txt.substring(11, 16)
		}
		this.setState({ forecast, date })
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
		              <p className="h2">{this.state.date}</p>
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
