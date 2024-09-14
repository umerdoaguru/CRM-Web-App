import React from 'react'


import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from './components/AdminLogin';
import Registration from './components/Registration';
import Header from './components/MainHeader';
import Leads from './pages/Leads';
import QuotationForm1 from './pages/Quotation/QuotationForm1';
import CreateCompanyProfile from './pages/Quotation/CreateCompanyProfile';
import Final_quotation from './pages/Quotation/Final_quotation';
import QuotationList from './pages/Quotation/QuotationList';
import Print_Page from './pages/Quotation/Print_Page';
import Addservices from './pages/Quotation/AddServices';
import CreateNotes from './pages/Quotation/CreateNotes';
import DeleteNotes from './pages/Quotation/DeleteNotes';
import UpdateNotes from './pages/Quotation/UpdateNotes';
import Reviews from './pages/Quotation/Reviews';
import UpdateCompanyData from './pages/Quotation/UpdateCompanyData';
import DeleteCompanydata from './pages/Quotation/DeleteCompanydata';
import UpdateQuotationName from './pages/Quotation/UpdateQuotationName';
import CreateInvoice from './components/Invoice/CreateInvoice';
import FinalInvoice from './components/Invoice/FinalInvoice';
import Invoicelist from './components/Invoice/Invoicelist';
import EditInvoiceName from './components/Invoice/EditInvoiceName';
import PrintInvoice from './components/Invoice/PrintInvoice';
import EditInvoice_no from './components/Invoice/EditInvoiceData/EditInvoice_no';
import EditInvoice_date from './components/Invoice/EditInvoiceData/EditInvoice_date';
import EditInvoice_start_date from './components/Invoice/EditInvoiceData/EditInvoice_start_date';
import EditInvoice_end_date from './components/Invoice/EditInvoiceData/EditInvoice_end_date';
import CreateInvoiceNotes from './components/Invoice/CreateInvoiceNotes';
import DeleteInvoiceNotes from './components/Invoice/DeleteInvoiceNotes';
import UpdateInvoiceNotes from './components/Invoice/UpdateInvoiceNotes';
import AddInvoiceServices from './components/Invoice/AddInvoiceServices';
import QuotationInvoice from './components/Invoice/QuotationInvoice';
import DataExport from './pages/DataExport';
import LeadData from './components/DataExport/LeadData';
import QuotationData from './components/DataExport/QuotationData';
import InvoiceData from './components/DataExport/InvoiceData';
import Dashboard from './adiComponent/Dashboard';
import Overview from './adiComponent/Overview';
import UserProfile from './adiComponent/userProfile';
import EmployeeManagement from './adiComponent/EmployManagement';
import EmployeeSingle from './adiComponent/EmployeSingle';
import SingleOrganization from './adiComponent/SingleOrganizaton';
import Reporting from './adiComponent/Reporting';
import Single_Lead_Profile from './components/Leads/Single_Lead_Profile';
import Landingpage from './pages/Landingpage';
import AdminLogin from './components/AdminLogin';
import EmployeeLogin from './components/EmployeeLogin';


function App() {
  const user = useSelector(state => state.auth.user);
  console.log(user);
  
  return (

    <>
   
    <div  style={{overflow:"hidden"}} >
    <Routes>

      {/* Admin routes */}


        <Route path="/" element={user? <Dashboard/> :<Landingpage/>} />

        <Route path="/admin-login" element={<AdminLogin/>} />

        <Route path="/employee-login" element={<EmployeeLogin/>} />
       
        <Route path="/admincrmdoaguru" element={<Registration />} />
       
        <Route path="/leads" element={  <Leads/>} />
        <Route path="/quotation-form" element={  <QuotationForm1 /> } />
        <Route path="/quotation-section" element={  <CreateCompanyProfile /> } />
        <Route path="/data-export" element={  <DataExport /> } />
        <Route path="/final-quotation/:id" element={  <Final_quotation/>} />
        <Route path="/quotationlist" element={  <QuotationList />}/>
        <Route path="/print/:id" element={ <Print_Page />} />
        <Route path="/addservices/:id" element={  <Addservices />} />
        <Route path="/createnotes/:id" element={  <CreateNotes />}/>
        <Route path="/deletenotes/:id" element={  <DeleteNotes />} />
        <Route path="/update-notes/:id" element={  <UpdateNotes />} />
        <Route path="/review/:id" element={  <Reviews />} />
        <Route path="/updatecompanydata" element={  <UpdateCompanyData />} />
        <Route path="/deletecompanydata" element={  <DeleteCompanydata />} />
        <Route path="/update-quotation-name/:id" element={  <UpdateQuotationName />} />
        <Route path="/create-invoice" element={  <CreateInvoice />} />
        <Route path="/final-invoice/:id" element={  <FinalInvoice/>} />
        <Route path="/invoicelist" element={  <Invoicelist />} />
        <Route path="/update-invoice-name/:id" element={  <EditInvoiceName />} />
        <Route path="/print-invoice/:id" element={ <PrintInvoice />} />
        <Route path="/addservicesinvoice/:id" element={  <AddInvoiceServices/>} />


        <Route path="/update-invoice-number/:id" element={  <EditInvoice_no />} />
        <Route path="/update-invoice-date/:id" element={  <EditInvoice_date/>} />         
         <Route path="/update-invoice-start-date/:id" element={  <EditInvoice_start_date/>} />         
        <Route path="/update-invoice-end-date/:id" element={  <EditInvoice_end_date/>} />          
        

        <Route path="/invoicecreatenotes/:id" element={  <CreateInvoiceNotes />}/>
        <Route path="/invoicedeletenotes/:id" element={  <DeleteInvoiceNotes />} />
        <Route path="/invoice-update-notes/:id" element={  <UpdateInvoiceNotes />} />

        <Route path="/quotation-invoice/:id" element={  <QuotationInvoice/>} />

        <Route path="/lead-data" element={  <LeadData/>} />
        <Route path="/lead-single-data/:id" element={  <Single_Lead_Profile/>} />
        <Route path="/quotation-data" element={  <QuotationData/>} />
        <Route path="/invoice-data" element={  <InvoiceData/>} />

   {/* aditya routes */}

   <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/overview' element={<Overview/>}/>
     
        <Route path='/edit-profile' element={<UserProfile/>}/>
        <Route path='/employee-management' element={<EmployeeManagement/>}/>
        <Route path='/employee-single/:employeeId' element={<EmployeeSingle/>}/>
        <Route path='/singleOrganization/:id' element={<SingleOrganization/>}/>
        <Route path='/reporting' element={<Reporting/>}/>

            {/* employees routes */}


      </Routes>
</div>




    
    </>





  )
}

export default App