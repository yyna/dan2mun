import React, { Component, PropTypes } from 'react';
import Chart from 'chart.js';

const propTypes = {
};
const defaultProps = {
};
class Statistics extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // test
    var count = this.props.data;
    var total = 0;
    var count_data = [];
    var count_label = [];
    Object.keys(count).forEach(function(key) {
      total += count[key];
      count_data.push(count[key]);
      count_label.push(key);
    });

    // For a pie chart
    $(document).ready(function() {
      var myPieChart = new Chart(document.getElementById("myPie"),{
        type: 'doughnut',
        data: {
          datasets: [{
            data: count_data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(34, 234, 155, 0.7)'
            ]
          }],
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: count_label
        }
      });
    });

    return(
      <div className="container">
        <div>
          <div className="row valign-wrapper">
            <div className="col s6">
              <h6>등록된 영화/드라마 수</h6>
              <h4>{total}</h4>
            </div>
            <div className="col s6">
              <h6>영화/드라마의 배경 국가</h6>
              <canvas id="myPie" width="400" height="400"></canvas>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Statistics.propTypes = propTypes;
Statistics.defaultProps = {
  data: []
};
export default Statistics;
