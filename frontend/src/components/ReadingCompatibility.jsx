import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Typography,
  Button
} from "@material-tailwind/react";

function ReadingCompatibility() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch('http://localhost:3005/testing/readCompatibility') // replace with your API endpoint
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
            Checking Reading Compatibility ...
          </Typography>
         </CardBody>
        </Card>
      </div>;
  }

  const entries = data ? Object.entries(data) : [];
  const half = Math.ceil(entries.length / 2);
  const firstHalf = entries.slice(0, half);
  const secondHalf = entries.slice(half);

  return (
    <Card className="border border-blue-gray-100 shadow-sm rounded-lg my-2">
      <CardBody className="p-4 ">
        {!data && <Button  color="lightBlue" ripple="light" onClick={fetchData}>Reading Check</Button>}
        {data && (
          <>
            <Typography variant="large" className="font-normal text-blue-gray-600">
              Reading Compatibility Check
            </Typography>
            <div className="flex">
              <div className="w-1/2 mr-4">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-blue-gray-600">Metric</th>
                      <th className="px-4 py-2 text-blue-gray-600">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {firstHalf.map(([key, value], index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2 text-blue-gray-600">{key}</td>
                        <td className="border px-4 py-2 text-blue-gray-900">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="w-1/2">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-blue-gray-600">Metric</th>
                      <th className="px-4 py-2 text-blue-gray-600">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {secondHalf.map(([key, value], index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2 text-blue-gray-600">{key}</td>
                        <td className="border px-4 py-2 text-blue-gray-900">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
}
export default ReadingCompatibility;
