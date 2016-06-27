import React, {Component} from 'react'

import '../styles/style.less'

export default class Table extends Component {


    render() {

        const {loading, onclick, weather,message,deleteLastItem} = this.props;
        const {main} = weather;
        return (
            <div className="table">
                {message ? <div className="not-found">{message}</div> : null}
                <ul>

                    {weather.length >= 1 ?

                        weather.map(item => {
                            if("sys" in item){
                                return (
                                    <li><span className="city-name">{item.name}</span>, {item.sys.country}: {item.main.temp}°C, {item.weather[0].description} </li>
                                )
                            }
                            else{
                                {deleteLastItem()}
                            }

                        })
                        :
                        null}
                </ul>

                <button className="clear-weather" onClick={onclick}>clear</button>
            </div>
        )

    }
}

