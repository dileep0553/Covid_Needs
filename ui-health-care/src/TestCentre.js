import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GeoMap from './GeoMap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Header from './components/header';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';


class TestCentre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "", isLoaded: false, error: "", states: [], testCentres: [], markers: [], center: {
        lat: 37.09,
        lng: 95.7
      }
    };
  }

  componentDidMount() {

    fetch("http://20.115.41.101:4000/states")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            states: result
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

  fetchTestCentre() {

    fetch("https://sheetlabs.com/NCOR/covidtestcentersinUS?state=" + this.state.cityName)
      .then(res => res.json())
      .then(
        (result) => {

          var markers = []
          result.forEach(function (centre, index) {
            markers.push({ id: index + 1, name: centre['centername'], position: { lat: parseFloat(centre['lat']), lng: centre['lon'] } })
          })

          this.setState({
            isLoaded: true,
            testCentres: result,
            markers: markers,
            center: markers.length > 0 ? markers[0]['position'] : []
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

  captureCityName(event) {
    this.setState({ cityName: event.target.value });
  }

  searchCity() {
    this.fetchTestCentre()
  }

  render() {

    return (
      <div>

        {/* <Header></Header> */}
        <div className='container'>
          <div className='row'>
            <Form>

              {/* <h1 style={{textAlign:"center"}}>Search Test Centers</h1> */}
              <p> </p>
              <Form.Group className="mb-3" controlId="formBasicCityName" style={{boxShadow: '4px 4px 10px '}}>
                <div className='row'  style={{    background: "grey", padding: "15px"}}>
                  <div className='col'> <Form.Label>City Name</Form.Label></div>
                  <div className='col'><Form.Select aria-label="Default select example" onChange={this.captureCityName.bind(this)}>
                    {Object.keys(this.state.states).map((code) => {
                      return (<option value={code}> {this.state.states[code]}</option>)
                    }
                    )}

                  </Form.Select></div>
                  <div className='col'><Button variant="primary" onClick={this.searchCity.bind(this)} type="button">
                    Search
                  </Button></div>
                </div>

              </Form.Group>



            </Form>
          </div>
          <div className='row'>
            <div className='col'>
              <GeoMap markers={this.state.markers} center={this.state.center}></GeoMap>
            </div>
            <div className='col' >

              <div className='container'>
                <div className='row' style={{overflowY: "scroll",height: "500px", paddingLeft:"70px"}}>
                  {this.state.testCentres.map((centre) => {
                    return (<Card style={{ width: '18rem' }}>
                      <Card.Body>
                        <Card.Title><a href={centre['url']}>{centre['centername']}</a></Card.Title>
                        <Card.Text>
                          Address: {centre['address']} {" "}{centre['citty']}{" "} {centre['state']}
                        </Card.Text>
                        <a href={centre['url']}>
                          <Button variant="primary">Get More Details</Button></a>
                      </Card.Body>
                    </Card>)
                  }

                  )}

                </div>
              </div>


            </div>
          </div>
        </div>
      </div>

    );
  }
};

export default TestCentre;