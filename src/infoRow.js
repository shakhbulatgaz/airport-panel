import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  font-family: 'Comfortaa', sans-serif;
  font-weight: bold;
  padding-top: 15px;
`;

const InfoItem = styled.div`
  text-align: center;
  width: 20%;
  height: 100%;
`;

const InfoRow = props => {
    return (
     <Container>
      <InfoItem>Type</InfoItem>
      <InfoItem>Scheduled Time</InfoItem>
      <InfoItem>Flight Number</InfoItem>
      <InfoItem>Airline Name</InfoItem>
      <InfoItem>Status</InfoItem>
     </Container>
    ); 
}

export default InfoRow;
