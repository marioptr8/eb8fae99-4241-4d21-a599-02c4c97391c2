import React from 'react';
import { BrowserRouter, Link, Route, Switch, useParams } from "react-router-dom"
import WeatherCard from './WeatherCard'

const cities = [
  { name: 'Milano', id: '3173435' },
  { name: 'Berlino', id: '6545310' },
]

export default function App() {
  let urlActive = window.location.pathname
  return (
    <BrowserRouter forceRefresh={true}>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mt-5 boxShadow">
          <ul className="navbar-nav">
            <li className={"nav-item " + (urlActive === "/today" ? "active": "")}>
              <Link className="nav-link" to="/today">Today</Link>
            </li>
            <li className={"nav-item " + (urlActive === "/tomorrow" ? "active": "")}>
              <Link className="nav-link" to="/tomorrow">Tomorrow</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/:day" children={<ShowForecasts/>}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}


function ShowForecasts() {
  let { day } = useParams();
  return (
    <div className="row">{
      cities.map( (city, i) => (
        <WeatherCard key={i} cityName={city.name} cityId={city.id} day={day}/>
      ))
    }</div>
  )
}
