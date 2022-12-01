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

class Vaccination extends Component {
    constructor(props) {
        super(props);
        this.state = { vaccine: [], selectedVaccine:[] };
    }

    componentDidMount() {
        fetch("https://api.us.castlighthealth.com/vaccine-finder/v1/medications?category=covid")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        vaccine: result
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

    addOrRemoveChoice(event){
        let selectedVaccine =this.state.selectedVaccine
        if(event.target.checked){
            selectedVaccine.push(event.target.name);
            this.setState({selectedVaccine});
        }
        else{
            let filteredVaccine=[]
            this.state.selectedVaccine.forEach((id)=>{
                if(id!=event.target.name){
                    filteredVaccine.push(id)
                }
            })
            
            this.setState({selectedVaccine:filteredVaccine});
        }
        
       
    }

    render() {
        return (
            <Container>
                <Header></Header>
                <Row>
                    <h1 style={{textAlign:"center"}}>Select Vaccine to Search</h1>
                    </Row>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                               
                                <th>Vaccine Name</th>
                                <th>Is Booster</th>
                                <th>Is Primary</th>
                                <th>Age Range</th>
                                <th>Include in Search</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.vaccine.map((vaccineDose) => {
                    return (<tr>
                        <td>{vaccineDose['key']}</td>
                        <td>{vaccineDose['is_booster']?"Yes":"No"}</td>
                        <td>{vaccineDose['is_primary']?"Yes":"No"}</td>
                        <td>{vaccineDose['minimumAge']['months']}{" months "}{vaccineDose['minimumAge']['years']}{" years "}{"-"}{vaccineDose['maximumAge']['months']}{" months "}{vaccineDose['maximumAge']['years']}{" years "}</td> 
                        <td><input type="checkbox" name={vaccineDose['guid']} onChange={this.addOrRemoveChoice.bind(this)} ></input></td>
                    </tr>


                    )
                })}
                        </tbody>
                    </Table>
                
                
               <Link to={"/vaccine_search/"+this.state.selectedVaccine.join()}> <Button variant="primary" style={{marginLeft:"40%"}}>Search for Selected Vaccine</Button></Link>

            </Container>)
    }
}

export default Vaccination;