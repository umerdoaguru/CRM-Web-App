import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";


const Invoice = () => {
  const [loading, setLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState([]); // Update to store structured data

  useEffect(() => {
    const getAppointList = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:9000/api/get-employee-invoice/${1}`);
        const invoiceList = response.data;

        // Filter, group, and calculate data
        const getDate = new Date();
        const year = getDate.getFullYear();
        const month = String(getDate.getMonth() + 1).padStart(2, "0");
        const formattedDate = `${year}-${month}-${getDate.getDate()}`;

        const filteredInvoices = invoiceList.filter(
          (item) => item.created_date?.split("T")[0]?.slice(0, 10) === formattedDate // Matching month and year
        );

        console.log(filteredInvoices);

        let result = {};

        filteredInvoices.forEach((item) => {
          const date = item.created_date.split("T")[0]; // Extract the date part
          if (!result[date]) {
            result[date] = { date, invoices: 0, Amount: 0 }; // Initialize
          }
          result[date].invoices += 1; // Count invoices
          result[date].Amount += parseFloat(item.offer_price); // Sum amounts
        });
        
        // Convert the result object to an array of objects
        const structuredData = Object.values(result);

        setInvoiceData(structuredData); // Set the structured data in state
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    getAppointList();
  }, []);

  return (
    <Wrapper>
      <div className="container-fluid mt-4" id="main">
      
      
          <>
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <BarChart
                  width={400}
                  height={300}
                  data={invoiceData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tick={{
                      fontSize: 0,
                      transform: "translate(-10,0)",
                      dy: 5,
                      fill: "#666",
                      fontWeight: "bold",
                    }}
                  />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="invoices"
                    fill="#8884d8"
                    yAxisId="left"
                    name="Invoices"
                  />
                  <Bar
                    dataKey="Amount"
                    fill="#c23616"
                    yAxisId="right"
                    name="Amount"
                  />
                </BarChart>
              </div>
            </div>
          </>
      
      </div>
    </Wrapper>
  );
};

export default Invoice;

const Wrapper = styled.div`
  #main {
    background-color: #55efc4;
    width: 100%;
    border-radius: 5px;
    padding: 2rem;
    box-shadow: 0px 2px 18px #bdbaba;
    display: flex;
    justify-content: center;
  }
  @media screen and (max-width: 768px) {
    padding: 20px;
    font-size: small;
  }
`;