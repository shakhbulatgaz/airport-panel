import React, {PureComponent} from 'react';
import FlightListItem from './FlightListItem.js';

class ArrivalList extends PureComponent {
  render() {
    return(
      <div>
        {
          this.props.data.map((i, index) => {
            return <FlightListItem
                key = {index.toString()}
                type={i.type}
                time={i.departure.scheduledTime.slice(11, -7)}
                flightNumber={i.flight.number}
                airlineName={i.airline.name}
                status={i.status}
              />
            }) 
        }
      </div>
    )
  }
}
  
export default ArrivalList;