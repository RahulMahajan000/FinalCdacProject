import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  Typography,
  Button
} from "@material-tailwind/react";

function PageLoadTime() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch('http://localhost:3005/testing/checkLoadTime')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  if (loading) {
    return (
      <Card className="border border-blue-gray-100 shadow-sm rounded-lg my-2">
        <CardBody className="p-4 ">
          <Typography>
            Checking Load Time...
          </Typography>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="border border-blue-gray-100 shadow-sm rounded-lg my-2">
      <CardBody className="p-4 ">
        {!data && <Button color="lightBlue" ripple="light" onClick={fetchData}>Check Load Time</Button>}
        {data && (
          <>
            <Typography variant="small" className="font-normal text-blue-gray-600 mt-2">
              URL
            </Typography>
            <Typography variant="h4" color="blue-gray" className="font-bold">
              {data.url}
            </Typography>
            <Typography variant="small" className="font-normal text-blue-gray-600 mt-2">
              Load Time
            </Typography>
            <Typography variant="h4" color="blue-gray" className="font-bold">
              {data.loadTime+" "} ms
            </Typography>
          </>
        )}
      </CardBody>
    </Card>
  );
}

export default PageLoadTime;
