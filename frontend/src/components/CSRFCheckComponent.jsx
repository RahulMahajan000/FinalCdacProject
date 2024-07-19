import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Typography,
  Button
} from "@material-tailwind/react";

function CSRFCheckComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch('http://localhost:3005/testing/csrf') // replace with your API endpoint
      .then(response => response.json())
      .then(data => {
        setData(data.result); // Access the result property from the response
        setLoading(false);
      });
  };

  if (loading) {
    return <div>
      <Card className="border border-blue-gray-100 shadow-sm rounded-lg my-2">
         <CardBody className="p-4 ">
          <Typography>
            Checking Csrf ...
          </Typography>
         </CardBody>
      </Card>
    </div>;
  }

  return (
    <Card className="border border-blue-gray-100 shadow-sm rounded-lg my-2">
      <CardBody className='p-4'>
      {!data && <Button color="lightBlue" ripple="light" onClick={fetchData}>Csrf Check</Button>}
      {data && (
        <>
            <Typography variant="small" className="font-normal text-blue-gray-600">
              CSRF Check Status
            </Typography>
            <Typography variant="h4" color="blue-gray" className="font-bold">
              {data.url}
            </Typography>
            <Typography variant="small" className="font-normal text-blue-gray-600 mt-2">
              Has Insecure Cookies
            </Typography>
            <Typography variant="h4" color="blue-gray" className="font-bold">
              {data.hasInsecureCookies ? 'Yes' : 'No'}
            </Typography>
        </>
      )}
      </CardBody>
    </Card>
  );
}

export default CSRFCheckComponent;
