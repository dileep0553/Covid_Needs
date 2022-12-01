import * as React from "react";
import { Routes, BrowserRouter, Link, Route } from "react-router-dom";
import './css/App.css';
import "./css/homestyle.css"
import medic from "./image/medic.jpeg"
import teststation from "./image/teststation.png"
import testCenter from "./image/testCenter.png"
import vaccine from "./image/vaccine.jpeg"
import Header from './components/header';
import Table from 'react-bootstrap/Table';

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = { covid: []};
}
  componentDidMount() {
    fetch("http://localhost:4000/get_today_positive_stat")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    covid: result['response']
                });
            },

            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )

}
render() {
  return (
    <div className="App">
      <main>
        <Header></Header>
        <div class="row">
          <div class="col">
            <div class="vaccine_details box-vaccine">
              <div class="medic">
                <a href="/get_vaccine"><img src={vaccine} width="50" height="60" alt="Vaccination" /></a>
                <p class="work-heading"> Vaccination</p>
              </div>
              <div class="medic">
                <a href="/TestSymptoms"><img src={testCenter} width="50" height="60" alt="Test Station" /></a>
                <p class="work-heading">Generate Test</p>
              </div>
              <div class="medic">
                <a href="/testCenters"><img src={teststation} width="50" height="60" alt="Test Station" /></a>
                <p class="work-heading">Test Station</p>
              </div>
              <div class="medic">
                <a href="/Medication"><img src={medic} width="50" height="60" alt="Medication" /></a>
                <p class="work-heading">Medication</p>
              </div>
            </div>

          </div>
          <div class="col box-live-statistics" style={{    marginTop: "25px"}} >
            <div class="live-stats">
              <div class="live-stats-text" style={{overflowY: "scroll",height: "500px"}}>
                <a href="/liveStatistics"><h2>Live Statistics</h2></a>
                <p></p>
                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>

                                            <th>State</th>
                                            <th>Covid Positive</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.covid && this.state.covid.map((inventory) => {
                                            return (<tr>
                                                <td>{inventory['state']}</td>
                                                <td>{inventory['positive']}</td>
                                            </tr>


                                            )
                                        })}
                                    </tbody>
                                </Table>
              </div>

            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
}
export default App;
