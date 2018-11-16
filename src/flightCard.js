import React from 'react';
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

const FlightCard = props => {
    return (
     <Container>
      <InfoItem>{props.type}</InfoItem>
      <InfoItem>{props.time}</InfoItem>
      <InfoItem>{props.flightNumber}</InfoItem>
      <InfoItem>{props.airlineName}</InfoItem>
      <InfoItem>{props.status}</InfoItem>
     </Container>
    ); 
}

export default FlightCard;
