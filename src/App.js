import React, { PureComponent } from 'react';
import styled from 'styled-components';
import FlightList from './FlightList';

const MainContainer = styled.div`
  width: 822px;
  margin: 0 320px;
  font-family: 'Comfortaa', sans-serif;
`;

const ButtonContainer = styled.div`
  height: 60px;
  width: 100%;
`;

const Button = styled.button`
  width: 274px;
  height: 100%;
  background-color: #FFCC00;
  transition: 0.3s;
  &:active {
    background-color: #e5b700;
  }
  color: black;
  font-size: 1.5em;
  border: none;
  outline: none;
  font-family: 'Comfortaa', sans-serif;
`;

const SearchBar = styled.input`
  width: 790px;
  height: 40px;
  font-size: 1.5em;
  padding: 10px 15px;
  font-family: 'Comfortaa', sans-serif;
  border: 1px solid black;
  outline: none;
`;

const ListHeaderRow = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  font-family: 'Comfortaa', sans-serif;
  font-weight: bold;
  padding-top: 15px;
`;

const ListHeaderColumn  = styled.div`
  text-align: center;
  width: 20%;
  height: 100%;
`;

export default class App extends PureComponent {
  state = {
    flights: [],
    flightsCopy: [],
  }

  componentDidMount() {
    const request = new XMLHttpRequest();
    // Берем все рейсы, прилетающие в аэропорт Внуково
    request.open('GET', 'http://aviation-edge.com/v2/public/timetable?key=82b9d3-0b3bae&iataCode=VKO&type=arrival');
    request.onload = () => {
      let data = JSON.parse(request.response);
      //Также делаем копию данных, чтобы вернуться к ней после поиска рейсов
      this.setState({flights: data, flightsCopy: data});
    }
    request.send();
  }

  changeInfo = type => {
    const request = new XMLHttpRequest();
    if(type === 'delayed') {  
      //В API нет информации о задержанных рейсах
      //Поэтому мы берем все рейсы аэропорта и сравниваем их реальное время посадки/взлета с планируемым
      //Если они отличаются — значит самолет опаздывает
      request.open('GET', 'http://aviation-edge.com/v2/public/timetable?key=82b9d3-0b3bae&iataCode=VKO');
      request.onload = () => {
        let data = JSON.parse(request.response).filter(i => i.estimatedRunway !== i.actualRunway)
        this.setState({flights: data, flightsCopy: data});
      }
    }
    else {
      request.open('GET', `http://aviation-edge.com/v2/public/timetable?key=82b9d3-0b3bae&iataCode=VKO&type=${type}`);
      request.onload = () => {
        let data = JSON.parse(request.response);
        this.setState({flights: data, flightsCopy: data});
      }
    }
    request.send();
  };

  searchFlights = e => {
    if(e.target.value.length === 3) {
      let searchedFlights = this.state.flights.filter(i => i.flight.number === e.target.value);
      this.setState({flights: searchedFlights});
    }
    else {
      this.setState({flights: this.state.flightsCopy})
    }
  }

  render() {
    return (
      <MainContainer>
        <ButtonContainer>
          <Button onClick={() => this.changeInfo('arrival')}>Прилет</Button>
          <Button onClick={() => this.changeInfo('departure')}>Вылет</Button>
          <Button onClick={() => this.changeInfo('delayed')}>Задержанные</Button>
        </ButtonContainer>
        <SearchBar placeholder='&#128269; Введите трехзначный номер рейса для поиска...' onChange={e => this.searchFlights(e)}/>
        <ListHeaderRow>
          <ListHeaderColumn>Type</ListHeaderColumn>
          <ListHeaderColumn>Scheduled Time</ListHeaderColumn>
          <ListHeaderColumn>Flight Number</ListHeaderColumn>
          <ListHeaderColumn>Airline Name</ListHeaderColumn>
          <ListHeaderColumn>Status</ListHeaderColumn>
        </ListHeaderRow>
        <FlightList data={this.state.flights}/>
      </MainContainer>
    )
  }
}