// import axios from "axios";
// import React, { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import styled from "styled-components";


// const Invoice = () => {


//   const [loading, setLoading] = useState(false);
//   const [appointmentList, setAppointmentList] = useState([]);

//   useEffect(() => {
//     const getAppointList = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("http://localhost:9000/api/getAllInvoice");
//         setAppointmentList(response.data);
//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//         console.log(error);
//       }
//     };

//     getAppointList();
//   }, ); // Added user.token to dependencies to avoid stale closures

//   const getDate = new Date();
//   const year = getDate.getFullYear();
//   const month = String(getDate.getMonth() + 1).padStart(2, "0");
//   const firstDay = `${year}-${month}-01`;
//   const lastDay = new Date(year, month, 0).getDate(); // Last day of the current month
//   const formattedDate = `${year}-${month}`;

//   const filterByTreated = appointmentList?.filter(
//     (item) =>
//       item.treatment_provided === "OPD" &&
//       item.payment_Status === "paid" &&
//       item.appointment_dateTime?.split("T")[0]?.slice(0, 7) === formattedDate
//   );

//   // Group appointments by date and count appointments for each day
//   const dailyAppointments = filterByTreated.reduce((acc, appointment) => {
//     const date = appointment.appointment_dateTime?.split("T")[0];
//     acc[date] = acc[date] ? acc[date] + 1 : 1;
//     return acc;
//   }, {});

//   let totalAmountPerDay = {}; // Object to store total amount for each day

//   filterByTreated.forEach((item) => {
//     if (item.appointment_dateTime) {
//       const date = item.appointment_dateTime.split("T")[0];
//       totalAmountPerDay[date] =
//         (totalAmountPerDay[date] || 0) + parseInt(item.opd_amount);
//     }
//   });

//   // Create an array containing data for all days of the month
//   const data = Array.from({ length: lastDay }, (_, index) => {
//     const day = String(index + 1).padStart(2, "0");
//     const date = `${formattedDate}-${day}`;
//     return {
//       date,
//       patients: dailyAppointments[date] || 0,
//       Amount: totalAmountPerDay[date] || 0,
//     };
//   });

//   const tickValues = Object.keys(dailyAppointments)
//     .filter((date) => new Date(date).getDate() === 1)
//     .map((date) => {
//       const [yyyy, mm, dd] = date.split("-");
//       return `${yyyy}-${mm}-${dd}`;
//     });

//   const xAxisTicks = [
//     "2024-05-01",
//     ...tickValues.filter((date) => date !== "2024-05-01"),
//   ];

 

//   return (
//     <Wrapper>
//       <div className="container-fluid mt-4" id="main">
      
      
//           <>
//             <div className="row">
//               <div className="col-12 d-flex justify-content-center">
//                 <BarChart
//                   width={400}
//                   height={300}
//                   data={[
//                     { date: '2024-09-01', patients: 120, Amount: 1500 },
//                     { date: '2024-09-02', patients: 150, Amount: 1800 },
//                     { date: '2024-09-03', patients: 100, Amount: 1200 },
//                     // Add more data points as needed
//                   ]}
//                   margin={{
//                     top: 5,
//                     right: 30,
//                     left: 0,
//                     bottom: 5,
//                   }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis
//                     dataKey="date"
//                     tick={{
//                       fontSize: 0,
//                       transform: "translate(-10,0)",
//                       dy: 5,
//                       fill: "#666",
//                       fontWeight: "bold",
//                     }}
//                   />
//                   <YAxis yAxisId="left" />
//                   <YAxis yAxisId="right" orientation="right" />
//                   <Tooltip />
//                   <Legend />
//                   <Bar
//                     dataKey="patients"
//                     fill="#8884d8"
//                     yAxisId="left"
//                     name="Invoices"
//                   />
//                   <Bar
//                     dataKey="Amount"
//                     fill="#c23616"
//                     yAxisId="right"
//                     name="Amount"
//                   />
//                 </BarChart>
//               </div>
//             </div>
//           </>
      
//       </div>
//     </Wrapper>
//   );
// };

// export default Invoice;

// const Wrapper = styled.div`
//   #main {
//     background-color: #55efc4;
//     width: 100%;
//     border-radius: 5px;
//     padding: 2rem;
//     box-shadow: 0px 2px 18px #bdbaba;
//     display: flex;
//     justify-content: center;
//   }
//   @media screen and (max-width: 768px) {
//     padding: 20px;
//     font-size: small;
//   }
// `;

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
          const response = await axios.get(`http://localhost:9000/api/invoices`);
          const invoiceList = response.data;

          // Filter, group, and calculate data
          const getDate = new Date();
          const year = getDate.getFullYear();
          const month = String(getDate.getMonth() + 1).padStart(2, "0");
          const formattedDate = `${year}-${month}`;

          const filteredInvoices = invoiceList.filter(
            (item) => item.created_date?.split(" ")[0]?.slice(0, 7) === formattedDate // Matching month and year
          );

          let result = {};

          filteredInvoices.forEach((item) => {
            const date = item.created_date.split(" ")[0]; // Extract the date part
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
  
      
      
          <>
          <div className="w-full max-w-4xl mx-auto p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">Daily Invoice Overview</h2>
      <p className="text-sm text-gray-500 mb-4">Invoices for the past 28 days</p>
      <ResponsiveContainer width="100%" height={300}>
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
                      // fontWeight: "bold",
                      
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
                    barSize={15}
                  />
                  <Bar
                    dataKey="Amount"
                    fill="#c23616"
                    yAxisId="right"
                    name="Amount"
                    barSize={15}
                  />
                </BarChart>
                </ResponsiveContainer>
    </div>
           
          </>
      
     
    </Wrapper>
  );
};

export default Invoice;

const Wrapper = styled.div`
  #main {
    // background-color: #55efc4;
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
