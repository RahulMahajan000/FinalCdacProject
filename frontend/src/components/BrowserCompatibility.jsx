import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import {
  Card,
  CardBody,
  Typography,
  Button
} from "@material-tailwind/react";

function BrowserCompatibility() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios.get('http://localhost:3005/testing/checkCompatibility') // replace with your API endpoint
      .then(response => {
        setData(response.data);
        setLoading(false);
      });
  };

  if (loading) {
    return <div>
      <Card className="border border-blue-gray-100 shadow-sm rounded-lg my-2">
         <CardBody className="p-4 ">
          <Typography>
            Checking Browser compatibility ...
          </Typography>
         </CardBody>
      </Card>
    </div>;
  }

  return (
    <Card className="border border-blue-gray-100 shadow-sm rounded-lg my-2">
      <CardBody className='p-4'>
      {data.length === 0 && <Button color="lightBlue" ripple="light" onClick={fetchData}>Browser check</Button>}
      {data.map((item, index) => (
        <Card key={index} className="border border-blue-gray-200 shadow-sm rounded-lg mb-4">
          <CardBody className="p-4 ">
            <Typography variant="small" className="font-normal text-blue-gray-600">
              Browser
            </Typography>
            <Typography variant="h4" color="blue-gray" className="font-bold">
              {item.browser}
            </Typography>
            <Typography variant="small" className="font-normal text-blue-gray-600 mt-2">
              User Agent
            </Typography>
            <Typography variant="h4" color="blue-gray" className="font-bold">
              {item.userAgent}
            </Typography>
          </CardBody>
        </Card>
      ))}
      </CardBody>
    </Card>
  );
}

export default BrowserCompatibility;
