import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Typography,
  Button
} from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

function SSLCheckComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch('http://localhost:3005/testing/ssl') // replace with your API endpoint
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  };

  if (loading) {
    return <div>
        <Card className="border border-blue-gray-100 shadow-sm rounded-lg my-2">
         <CardBody className="p-4 ">
          <Typography>
            Checking SSl ...
          </Typography>
         </CardBody>
        </Card>
      </div>;
  }

  return (
    <Card className="border border-blue-gray-100 shadow-sm rounded-lg my-2">
      <CardBody className="p-4 ">
        {!data && <Button  color="lightBlue" ripple="light" onClick={fetchData}>SLL Check</Button>}
        {data && (
          <>
            <Typography variant="small" className="font-normal text-blue-gray-600">
              SSL Check Status
            </Typography>
            <Typography variant="h4" color="blue-gray" className="font-bold">
              {data.message}
            </Typography>
            <Typography variant="small" className="font-normal text-blue-gray-600 mt-2">
              Is SSL Valid
            </Typography>
            <Typography variant="h4" color="blue-gray" className="font-bold">
              {data["SSL Valid"] ? 'Yes' : 'No'}
            </Typography>
          </>
        )}
      </CardBody>
    </Card>
  );
}

export default SSLCheckComponent;
