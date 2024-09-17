import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import img from '../../images/lead_profile.png'
import MainHeader from '../MainHeader';
import Sider from '../Sider';
function Single_Lead_Profile() {
    
    const {id} = useParams()
    const [leads , setLeads] = useState([]);

    useEffect(() => {
        const fetchQuotations = async () => {
          try {
            const response = await axios.get(`http://localhost:9000/api/leads/${id}`);
            setLeads(response.data);
            console.log(response);
          } catch (error) {
            console.error("Error fetching quotations:", error);
          }
        };
    
        fetchQuotations();
      }, [id]);

  return (
    <>
    <MainHeader />
    <Sider />
    <div className="container mt-5 px-2 mx-auto p-4">
     <h1 className="text-2xl text-center mt-[2rem]">Leads Profile</h1>
     <div className="mx-auto h-[3px] w-16 bg-[#34495E] my-3"></div>
    <div className="flex flex-wrap mb-4">
  <div className="w-full lg:w-1/3">
    <img
    src={img}
      alt="doctor-profile"
      className=" rounded-lg"
    />
  </div>
  {leads.map((lead, index) => (
  <div className="w-full lg:w-2/3 ">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      
    
      <div>
        <label className="text-info">Lead Number</label>
        <div className="p-2 bg-gray-100 rounded">
          <p className="m-0">{lead.lead_no}</p>
        </div>
      </div>

      <div>
        <label className="text-info">Name</label>
        <div className="p-2 bg-gray-100 rounded">
          <p className="m-0 break-words">{lead.name}</p>
        </div>
      </div>

      <div>
        <label className="text-info">Assigned To</label>
        <div className="p-2 bg-gray-100 rounded">
          <p className="m-0">{lead.assignedTo}</p>
        </div>
      </div>

      <div>
        <label className="text-info">Mobile Number</label>
        <div className="p-2 bg-gray-100 rounded">
          <p className="m-0">{lead.phone}</p>
        </div>
      </div>

      <div>
        <label className="text-info">Lead Source</label>
        <div className="p-2 bg-gray-100 rounded">
          <p className="m-0">{lead.leadSource}</p>
        </div>
      </div>
      <div>
        <label className="text-info">Subject</label>
        <div className="p-2 bg-gray-100 rounded">
          <p className="m-0">{lead.subject}</p>
        </div>
      </div>
      <div>
        <label className="text-info">Lead Status</label>
        <div className="p-2 bg-gray-100 rounded">
          <p className="m-0">{lead.lead_status}</p>
        </div>
      </div>

      <div>
        <label className="text-info">Created Date</label>
        <div className="p-2 bg-gray-100 rounded">
          <p className="m-0">{moment(lead.createdTime).format('DD/MM/YYYY')}</p>
        </div>
      </div>

      

    



    </div>
  </div>
  ))}
</div>


   <div className="overflow-x-auto mt-5">
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                            
                                <th className="px-6 py-3 border-b-2 border-gray-300">Name</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300">Assigned To</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300">Quotation</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300"> Quotation Status</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300">Invoice</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300"> Invoice Status</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300"> Deal Status</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300"> Reason</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300">Lead Working Status</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300"> Follow Up Status</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead, index) => (
                                <tr key={lead.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                   
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.name}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.assignedTo}</td>
                               
                                    <td className="px-6 py-4  border-b border-gray-200 text-gray-800">{lead.quotation}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.quotation_status}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.invoice}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.invoice_status}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.deal_status}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.reason}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.lead_working_status}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.follow_up_status}</td>
                                </tr>
                            ))}
                          
                                {/* <tr >
                                   
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800"></td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800"></td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800"></td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800"></td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800"></td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800"></td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800"></td>
                                </tr>  */}
                          
                        </tbody>
                    </table>
                </div>

    </div> 
    
    </>
  )
}

export default Single_Lead_Profile