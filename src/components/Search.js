import React, {Component} from 'react';

export default class Search extends Component {

    render() {
        const { onclick, onchange, city, error} = this.props;
        return (
            <div className="weather-search">

                <input className="weather-input" value={city} type="text"
                       onChange={onchange}/>

                <button className="btn-search" onClick={onclick}>Search</button>

                {error ? error.message : null}
            </div>
        )
    }
}