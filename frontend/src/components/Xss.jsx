import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Typography,
  Button
} from "@material-tailwind/react";

function XssComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch('http://localhost:3005/testing/xss')
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
    return <div>
      <Card className="border border-blue-gray-100 shadow-sm rounded-lg my-2">
         <CardBody className="p-4 ">
          <Typography>
            Checking Xss ...
          </Typography>
         </CardBody>
      </Card>
    </div>;
  }

  return (
    <Card className="border border-blue-gray-100 shadow-sm rounded-lg my-2">
      <CardBody className="p-4 ">
        {!data && <Button color="lightBlue" ripple="light" onClick={fetchData}>Xss check</Button>}
        {data && (
          <>
            <Typography variant="small" className="font-normal text-blue-gray-600">
              URL
            </Typography>
            <Typography variant="h4" color="blue-gray" className="font-bold">
              {data.url}
            </Typography>
            <Typography variant="small" className="font-normal text-blue-gray-600 mt-2">
              Is Vulnerable
            </Typography>
            <Typography variant="h4" color="blue-gray" className="font-bold">
              {data.isVulnerable ? 'Yes' : 'No'}
            </Typography>
          </>
        )}
      </CardBody>
    </Card>
  );
}

export default XssComponent;
