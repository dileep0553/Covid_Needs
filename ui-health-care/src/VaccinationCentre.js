import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GeoMap from './GeoMap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Header from './components/header';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

class VaccinationCentre extends Component {
    constructor(props) {
        super(props);
        this.state = { provider: {}, guid: window.location.pathname.split("/")[2] };
    }

    componentDidMount() {
        fetch("https://api.us.castlighthealth.com/vaccine-finder/v1/provider-locations/" + this.state.guid + "?inventoryCategory=covid")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        provider: result
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
            <Container>
                <Header></Header>
                <Row>
                    <h1 style={{textAlign:"center"}}>Vaccination Centre In Detail</h1>
                </Row>
                <Row>

                    <Card style={{ width: '180rem' }}>
                        <Card.Body>
                            <Card.Title><a href={this.state.provider['website']}>{this.state.provider['name']}</a></Card.Title>
                            <Card.Text>
                                <Row>
                                    <Col sm={4}>  Address:</Col>
                                    <Col sm={4}>{this.state.provider['address1']} {" "}{this.state.provider['address2']}{" "} {this.state.provider['city']}</Col>
                                </Row>

                            </Card.Text>
                            <Card.Text>
                            <Row>
                                    <Col sm={4}>   In Stock:</Col>
                                    <Col sm={4}> {this.state.provider['in_stock']}</Col>
                                </Row>
                               
                            </Card.Text>
                            <Card.Text>
                            <Row>
                                    <Col sm={4}>   Phone:</Col>
                                    <Col sm={4}> {this.state.provider['phone']}</Col>
                                </Row>
                                
                            </Card.Text>
                            <Card.Text>
                            <Row>
                                    <Col sm={4}>   Insurance Accepted:</Col>
                                    <Col sm={4}> {this.state.provider['accepts_insurance'] ? "Yes" : "No"}</Col>
                                </Row>
                                
                            </Card.Text>
                            <Card.Text>
                            <Row>
                                    <Col sm={4}>  Appointments Available:</Col>
                                    <Col sm={4}>{this.state.provider['appointments_available'] ? "Yes" : "No"}</Col>
                                </Row>
                                
                            </Card.Text>
                            <Card.Text>
                                Visit Time:
                                <p>{this.state.provider['hours_mon']}</p>
                                <p>{this.state.provider['hours_tue']}</p>
                                <p>{this.state.provider['hours_wed']}</p>
                                <p>{this.state.provider['hours_thur']}</p>
                                <p>{this.state.provider['hours_fri']}</p>
                                <p>{this.state.provider['hours_sat']}</p>
                                <p>{this.state.provider['hours_sun']}</p>
                            </Card.Text>
                            <Card.Text>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>

                                            <th>Vaccine Name</th>
                                            <th>In Stock</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.provider['inventory'] && this.state.provider['inventory'].map((inventory) => {
                                            return (<tr>
                                                <td>{inventory['key']}</td>
                                                <td>{inventory['in_stock'] ? "Yes" : "No"}</td>

                                            </tr>


                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </Card.Text>
                            <a href={this.state.provider['website'] ? this.state.provider['website'] : ""}><Button variant="primary" style={{marginLeft:"40%"}}>Book Appointment</Button></a>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>)
    }
}

export default VaccinationCentre;