import React, {Component} from 'react'
import {render} from 'react-dom'

import Search from './Search'
import Table from './Table'


class WeatherApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            weather: [],
            error: null,
            message : ""
        }
    }
 clearWeatherList(){
     this.setState({
         weather: []
     })
 }
    cityHandler(e) {
        this.setState({
            city: e.target.value
        })
    }
deleteLastItem(){
    let temp =  this.state.weather.slice();
    temp.pop();
    this.setState({
        message: "city not found",
        weather: temp
    })
}
    showData(e) {

        if (this.state.city) {
            this.setState({
                error: null,
                message: ""
            });
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&lang=en,ru,uk&APPID=629cb265ccd3687ced8dce62e722025d`).then(result => {
                if (result.status == 200) {
                    return result.json()
                } else {
                    throw new Error("данные не были получены, проверте название города")
                }

            }).then(json => {
                let temp = this.state.weather.slice();
                temp.push(json);
                this.setState({
                    city: "",
                    weather: temp

                })
            }).catch(err => {
                this.setState({
                    error: err,
                    city: ""

                })
            });

        }
    }

    render() {
        const {weather,city,error,loading,message} = this.state;
        return (
            <div className="container">
                <div className="title">Get the weather!</div>
                <Search onclick={this.showData.bind(this)}
                        onchange={this.cityHandler.bind(this)}
                        city={city}
                        error={error}/>

                <Table deleteLastItem = {this.deleteLastItem.bind(this)}
                       message={message}
                       onclick = {this.clearWeatherList.bind(this)}
                       loading={loading}
                       weather={weather}/>

            </div>

        )
    }
}

render(<WeatherApp/>,
    document.getElementById("container"));
