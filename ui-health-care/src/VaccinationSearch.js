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

class VaccinationSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { cityName: "", isLoaded: false, error: "", providers: [], guid: window.location.pathname.split("/")[2], markers: [], center: {} };
  }
  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({center:{lat:position.coords.latitude,lng:position.coords.longitude}})
      this.fetchVaccinationCity(position.coords.latitude, position.coords.longitude);
      fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","+position.coords.longitude+"&key=AIzaSyBD0WVGaI0T0JpmCT6eWu--bx0Q-Xsi06k")
      .then(res => res.json()).then((geocode) => {
        this.setState({cityName: geocode.results[0].formatted_address});
      })
    });
  }

  searchCity() {

    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.cityName + "&key=AIzaSyBD0WVGaI0T0JpmCT6eWu--bx0Q-Xsi06k")
      .then(res => res.json())
      .then(
        (result) => {
          this.fetchVaccinationCity(result.results[0].geometry.location.lat, result.results[0].geometry.location.lng)
          this.setState({
            isLoaded: true,
            items: result.items
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

  fetchVaccinationCity(lat, long) {


    fetch(" https://api.us.castlighthealth.com/vaccine-finder/v1/provider-locations/search?medicationGuids=" + this.state.guid + "&lat=" + lat + "&long=" + long + "&appointments=false")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)

          var markers = []
          if (result['providers']) {
            result['providers'].forEach(function (centre, index) {
              markers.push({ id: index + 1, name: centre['name'], position: { lat: parseFloat(centre['lat']), lng: centre['long'] } })
            })
          }


          this.setState({
            isLoaded: true,
            providers: result['providers'],
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

  render() {
    return (
      <div >

        <Header></Header>
        <h1 style={{textAlign:"center"}}>Search Vaccination Centers</h1>
        <Form className='container'>
          <Form.Group className="mb-3" controlId="formBasicCityName">

            <div className='row'  style={{    background: "grey", padding: "15px"}}>
              <div className='col'>
                <Form.Label>City Name</Form.Label>
              </div>
              <div className='col'>
                <Form.Control type="cityName" placeholder="Enter cityName" value={this.state.cityName} onChange={this.captureCityName.bind(this)} />
              </div>
              <div className='col'>
                <Button variant="primary" onClick={this.searchCity.bind(this)} type="button">
                  Search
                </Button>
              </div>
            </div>
          </Form.Group>

        </Form>
        <Container>
        <div className='row'>

          <div className='col'>
            <GeoMap markers={this.state.markers} center={this.state.center} zoom={10}></GeoMap>
          </div>
          <div className='col'>

            <div className='container'>
              <div className='row' style={{overflowY: "scroll",height: "500px",  paddingLeft:"70px"}}>
                {this.state.providers.map((provider) => {
                  return (<Card style={{ width: '98%',marginBottom:"8px",boxShadow:"1px 1px 3px" }}>
                    <Card.Body>
                      <Card.Title><a href={provider['website']}>{provider['name']}</a></Card.Title>
                      <Card.Text>
                        Address: {provider['address1']} {" "}{provider['address2']}{" "} {provider['city']}
                      </Card.Text>
                      {/* <Card.Text>
                        In Stock: {provider['in_stock']}
                      </Card.Text> */}
                      <Link to={'/vaccine_centre/' + provider['guid']}>
                        <Button variant="primary">Get More Details</Button></Link>
                    </Card.Body>
                  </Card>)
                }

                )}

              </div>
            </div>





          </div>
        </div>
        </Container>
      </div>

    );
  }
};

export default VaccinationSearch;