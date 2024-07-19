import React, { useState } from 'react';
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button
} from "@material-tailwind/react";

const StressChartComponent = () => {
  const [data, setData] = useState({});

  function handleGraph(){
    fetch('http://localhost:3005/testing/stress')
      .then(response => response.json())
      .then(data => setData(data));
  }

  const options = {
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      categories: data.requests ? data.requests.sort((a, b) => a.request - b.request).map(item => item.request) : []
    }
  };

  const series = [
    {
      name: 'series-1',
      data: data.requests ? data.requests.sort((a, b) => a.request - b.request).map(item => parseFloat(item.time)) : []
    }
  ];

  return (
    <Card className="border border-blue-gray-100 shadow-sm my-2">
      <Button color="lightBlue" ripple="light" onClick={handleGraph} className='m-2'>
        Stress Testing
      </Button>
      <CardHeader variant="gradient" color="white" floated={false} shadow={false}>
        <Chart options={options} series={series} type="line" />
      </CardHeader>
      <CardBody className="px-6 pt-0">
        <Typography variant="h6" color="blue-gray">
          Stress Chart
        </Typography>
        <Typography variant="small" className="font-normal text-blue-gray-600">
          This chart shows the stress levels based on the number of requests.
        </Typography>
      </CardBody>
    </Card>
  );
};

export default StressChartComponent;
