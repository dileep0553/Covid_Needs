import React, { Component } from 'react';
import Header from './components/header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import pain from "./image/pain.png"
import sore_throat from "./image/sore_throat.png"
import fever from "./image/fever.png"
import runny_nose from "./image/runny_nose.png"
import Cough from "./image/cough.png"
import tiredness from "./image/tiredness.png"
import nasal_congestion from "./image/nasal_congestion.png"
import diarrhea from "./image/diarrhea.png"
import difficulty_in_breathing from "./image/difficulty_breathing.png"
import './css/TestSymptoms.css';
import TestCentre from './TestCentre';



class TestSymptoms extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false, response: "", fever: 0, tiredness: 0, dry_Cough: 0, difficulty_in_breathing: 0, sore_throat: 0, pains: 0, nasal_congestion: 0, runny_nose: 0, diarrhea: 0 };
  }

  captureFever(event) {
    this.setState({ fever: event.target.value });
  }
  captureTiredness(event) {
    this.setState({ tiredness: event.target.value });
  }
  captureDry_Cough(event) {
    this.setState({ dry_Cough: event.target.value });
  }
  captureDifficulty_in_breathing(event) {
    this.setState({ difficulty_in_breathing: event.target.value });
  }
  captureSore_throat(event) {
    this.setState({ sore_throat: event.target.value });
  }
  capturePains(event) {
    this.setState({ pains: event.target.value });
  }
  captureNasal_congestion(event) {
    this.setState({ nasal_congestion: event.target.value });
  }
  captureRunny_nose(event) {
    this.setState({ runny_nose: event.target.value });
  }
  captureDiarrhea(event) {
    this.setState({ diarrhea: event.target.value });
  }

  predict() {
    this.setState({
      isLoaded: true,
    });
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'Fever': this.state.fever, 'Tiredness': this.state.tiredness, 'Dry-Cough': this.state.dry_Cough, 'Difficulty-in-Breathing': this.state.difficulty_in_breathing, 'Sore-Throat': this.state.sore_throat, 'Pains': this.state.pains, 'Nasal-Congestion': this.state.nasal_congestion, 'Runny-Nose': this.state.runny_nose, 'Diarrhea': this.state.diarrhea })
    };
    fetch("http://20.115.41.101:4000/get_symptom_prediction", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            response: result['prediction']
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
      <div>
        <Header></Header>

        {this.state.response != "" && (<div class="container container-custom">
          <h1 style={{textAlign: "center"}}>Prediction Result:</h1>
          <h2 style={{ "color": "green",textAlign: "center" }}>{this.state.response}</h2>
        </div>

        )}

        {this.state.isLoaded ? (<div>
          {this.state.response != "" ? (<div></div>) : (<div>...Loading. Please wait</div>)}
          <TestCentre />
        </div>) : (

          <Form>
            <h1 style={{ textAlign: "center" }}>Test Station</h1>

            <div class="container container-custom">
              <div class="row">
                <div class="col">
                  <Form.Label>Fever</Form.Label>
                  <Form.Select aria-label="Default select example" onChange={this.captureFever.bind(this)}>
                    <option value="0">No</option>
                    <option value="1">Yes</option>

                  </Form.Select>
                </div>
                <div class="col">
                  <Form.Label>

                    Tiredness</Form.Label>
                  <Form.Select aria-label="Default select example" onChange={this.captureTiredness.bind(this)}>
                    <option value="0">No</option>
                    <option value="1">Yes</option>

                  </Form.Select>
                </div>
                <div class="col">
                  <Form.Label>Dry Cough</Form.Label>
                  <Form.Select aria-label="Default select example" onChange={this.captureDry_Cough.bind(this)}>
                    <option value="0">No</option>
                    <option value="1">Yes</option>

                  </Form.Select>
                </div>
                <div class="col">
                  <Form.Label>Difficulty in breathing</Form.Label>
                  <Form.Select aria-label="Default select example" onChange={this.captureDifficulty_in_breathing.bind(this)}>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </Form.Select>
                </div>
              </div>
              <div class="row">
                <div class="col">


                  <Form.Label>Sore throat</Form.Label>
                  <Form.Select aria-label="Default select example" onChange={this.captureSore_throat.bind(this)}>
                    <option value="0">No</option>
                    <option value="1">Yes</option>

                  </Form.Select>
                </div>
                <div class="col">
                  <Form.Label>Pains</Form.Label>
                  <Form.Select aria-label="Default select example" onChange={this.capturePains.bind(this)}>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </Form.Select>
                </div>
                <div class="col">
                  <Form.Label>Nasal Congestion</Form.Label>
                  <Form.Select aria-label="Default select example" onChange={this.captureNasal_congestion.bind(this)}>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </Form.Select>
                </div>
                <div class="col">
                  <Form.Label>runny_nose</Form.Label>
                  <Form.Select aria-label="Default select example" onChange={this.captureRunny_nose.bind(this)}>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </Form.Select>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <Form.Label>Diarrhea</Form.Label>
                  <Form.Select aria-label="Default select example" onChange={this.captureDiarrhea.bind(this)}>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </Form.Select>
                </div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col"></div>
              </div>
              <div class="row">
                <div class="col"></div>
                <div class="col"><Button variant="primary" onClick={this.predict.bind(this)} type="button" style={{ marginTop: "50px", marginLeft: "25%" }}>
                  Generate Test Result
                </Button></div>
                <div class="col"></div>

              </div>
            </div>



          </Form>
        )}

      </div>
    )
  }
}

export default TestSymptoms;