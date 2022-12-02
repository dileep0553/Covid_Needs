import * as React from "react";
import { Routes, BrowserRouter, Link, Route } from "react-router-dom";
import './css/App.css';
import "./css/homestyle.css"
import medic from "./image/medic.jpeg"
import teststation from "./image/teststation.png"
import testCenter from "./image/test.jpeg"
import vaccine from "./image/vaccine.jpeg"
import Ads from "./image/Google-Ads.jpeg"
import Header from './components/header';
import Table from 'react-bootstrap/Table';
import LiveStatistics from "./LiveStatistics";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { covid: [] };
  }
  componentDidMount() {
    fetch("http://20.115.41.101:4000/get_today_positive_stat")
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
            <div class="col col-8">
              <div class="row">
                <div class="col col-12">
                  <div class="vaccine_details box-vaccine">
                    <div class="medic">
                      <a href="/TestSymptoms"><img src={testCenter} width="100" height="100" alt="Test Station" /></a>
                      <p class="work-heading">Test&nbsp;Station</p>
                    </div>
                    <div class="medic">
                      <a href="/get_vaccine"><img src={vaccine} width="100" height="100" alt="Vaccination" /></a>
                      <p class="work-heading"> Vaccination</p>
                    </div>
                    {/* <div class="medic">
                <a href="/testCenters"><img src={teststation} width="50" height="60" alt="Test Station" /></a>
                <p class="work-heading">Test Station</p>
              </div> */}
                    <div class="medic">
                      <a href="/Medication"><img src={medic} width="100" height="100" alt="Medication" /></a>
                      <p class="work-heading">Medication</p>
                    </div>
                  </div>
                  <div class="col col-12">
                    <div class=" box-vaccine">
                      <LiveStatistics />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col col-3">
              <div class="row">
                <div class="col col-12 box-live-statistics" style={{ marginTop: "25px" }} >
                  <div class="live-stats">
                    <div class="live-stats-text" style={{ overflowY: "scroll", height: "300px" }}>
                      <h4>Covid Updates</h4>
                      <p></p>
                      {/* <Table striped bordered hover size="sm">
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
                  </Table> */}
                    </div>

                  </div>
                </div>
                <div class="col col-12 box-live-statistics" style={{ marginTop: "25px" }} >
                <img src={Ads} style={{width:'50%'}}  alt="Vaccination" />
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
