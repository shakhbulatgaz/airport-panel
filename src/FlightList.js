import React, {PureComponent} from 'react';
import FlightCard from './flightCard.js';

class ArrivalList extends PureComponent {
  render() {
    return(
      <div>
        {
          this.props.data.map((i, index) => {
            return <FlightCard
                key = {index.toString()}
                type={i.type}
                time={i.departure.scheduledTime.slice(11, -7)}
                flightNumber={i.flight.number.slice(-3)}
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