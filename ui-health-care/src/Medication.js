import React, { Component } from 'react';
import Header from './components/header';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

class Medication extends Component {
  constructor(props) {
    super(props);
    this.state = { beds: {}, icu_beds: {} };
  }

  componentDidMount() {
    fetch("http://20.115.41.101:4000/get_icu_beds_graph")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            icu_beds: result['response']
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    fetch("http://20.115.41.101:4000/get_beds_graph")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            beds: result['response']
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
    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );

    const options = {
      plugins: {
        title: {
          display: true,
          text: 'Available ICU Beds',
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    };


    const options1 = {
      plugins: {
        title: {
          display: true,
          text: 'Available Normal Beds',
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    };




    return (
      <div>
        <Header></Header>
        {this.state.beds && 'datasets' in this.state.beds && (
          <Bar options={options1} data={this.state.beds} />
        )}

        {this.state.icu_beds && 'datasets' in this.state.icu_beds && (
          <Bar options={options} data={this.state.icu_beds} />
        )}

      </div>
    )
  }

}

export default Medication;