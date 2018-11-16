import React, {PureComponent} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 822px;
  height: 40px;
`;

const InfoItem = styled.div`
  text-align: center;
  width: 164px;
  height: 100%;
`;

class FlightListItem extends PureComponent{
  render() {
    return (
      <Container>
        <InfoItem>{this.props.type}</InfoItem>
        <InfoItem>{this.props.time}</InfoItem>
        <InfoItem>{this.props.flightNumber}</InfoItem>
        <InfoItem>{this.props.airlineName}</InfoItem>
        <InfoItem>{this.props.status}</InfoItem>
      </Container>
    ); 
  }  
}

export default FlightListItem;
