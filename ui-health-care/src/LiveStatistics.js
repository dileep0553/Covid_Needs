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

class LiveStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = { population_vaccinated: {}, cases: {}, today_cases:{} };
  }

  componentDidMount() {
    fetch("http://20.115.41.101:4000/get_vaccinated")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            population_vaccinated: result['response']
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )


    fetch("http://20.115.41.101:4000/get_positive_case")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            cases: result['response']
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

      fetch("http://20.115.41.101:4000/get_today_positive_case")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            today_cases: result['response']
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
          text: 'Vaccinated Population',
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

    const casesoOptions = {
      plugins: {
        title: {
          display: true,
          text: 'Positive Cases & Deaths by Covid Overall History',
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

    const todayCasesOptions = {
      plugins: {
        title: {
          display: true,
          text: 'Today Positive Cases & Deaths by Covid',
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
        {/* <Header></Header> */}
        {this.state.today_cases && 'datasets' in this.state.today_cases && (
          <Bar options={todayCasesOptions} data={this.state.today_cases} />
        )}

        {this.state.population_vaccinated && 'datasets' in this.state.population_vaccinated && (
          <Bar options={options} data={this.state.population_vaccinated} />
        )}

        {this.state.cases && 'datasets' in this.state.cases && (
          <Bar options={casesoOptions} data={this.state.cases} />
        )}

      </div>
    )
  }

}

export default LiveStatistics;