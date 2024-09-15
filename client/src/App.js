import React from 'react'


import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from './components/Login';
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
import Single_Lead_Profile from './components/Leads/Single_Lead_Profile';
import EmployeeManagement from './adiComponent/EmployManagement';
import EmployeeSingle from './adiComponent/EmployeSingle';
import SingleOrganization from './adiComponent/SingleOrganizaton';
import Reporting from './adiComponent/Reporting';
import Profile from './pages/Profile';


function App() {
  const user = useSelector(state => state.auth.user);
  console.log(user);
  
  return (

    <>
    <div  style={{overflow:"hidden"}} >
    <Routes>
        <Route path="/" element={user? <Dashboard />:<Login/>} />
       
        <Route path="/admincrmdoaguru" element={<Registration />} />
       
        <Route path="/leads" element={user ? <Leads/>: <Navigate to="/" />} />
        <Route path="/quotation-form" element={user ? <QuotationForm1 /> : <Navigate to="/" />} />
        <Route path="/quotation-section" element={user ? <CreateCompanyProfile /> : <Navigate to="/" />} />
        <Route path="/data-export" element={user ? <DataExport /> : <Navigate to="/" />} />
        <Route path="/final-quotation/:id" element={user ? <Final_quotation/>: <Navigate to="/" />} />
        <Route path="/quotationlist" element={user ? <QuotationList />: <Navigate to="/" />}/>
        <Route path="/print/:id" element={user ?<Print_Page />: <Navigate to="/" />} />
        <Route path="/addservices/:id" element={user ? <Addservices />: <Navigate to="/" />} />
        <Route path="/createnotes/:id" element={user ? <CreateNotes />: <Navigate to="/" />}/>
        <Route path="/deletenotes/:id" element={user ? <DeleteNotes />: <Navigate to="/" />} />
        <Route path="/update-notes/:id" element={user ? <UpdateNotes />: <Navigate to="/" />} />
        <Route path="/review/:id" element={user ? <Reviews />: <Navigate to="/" />} />
        <Route path="/updatecompanydata" element={user ? <UpdateCompanyData />: <Navigate to="/" />} />
        <Route path="/deletecompanydata" element={user ? <DeleteCompanydata />: <Navigate to="/" />} />
        <Route path="/update-quotation-name/:id" element={user ? <UpdateQuotationName />: <Navigate to="/" />} />
        <Route path="/create-invoice" element={user ? <CreateInvoice />: <Navigate to="/" />} />
        <Route path="/final-invoice/:id" element={user ? <FinalInvoice/>: <Navigate to="/" />} />
        <Route path="/invoicelist" element={user ? <Invoicelist />: <Navigate to="/" />} />
        <Route path="/update-invoice-name/:id" element={user ? <EditInvoiceName />: <Navigate to="/" />} />
        <Route path="/print-invoice/:id" element={user ?<PrintInvoice />: <Navigate to="/" />} />
        <Route path="/addservicesinvoice/:id" element={user ? <AddInvoiceServices/>: <Navigate to="/" />} />


        <Route path="/update-invoice-number/:id" element={user ? <EditInvoice_no />: <Navigate to="/" />} />
        <Route path="/update-invoice-date/:id" element={user ? <EditInvoice_date/>: <Navigate to="/" />} />         
         <Route path="/update-invoice-start-date/:id" element={user ? <EditInvoice_start_date/>: <Navigate to="/" />} />         
        <Route path="/update-invoice-end-date/:id" element={user ? <EditInvoice_end_date/>: <Navigate to="/" />} />          
        

        <Route path="/invoicecreatenotes/:id" element={user ? <CreateInvoiceNotes />: <Navigate to="/" />}/>
        <Route path="/invoicedeletenotes/:id" element={user ? <DeleteInvoiceNotes />: <Navigate to="/" />} />
        <Route path="/invoice-update-notes/:id" element={user ? <UpdateInvoiceNotes />: <Navigate to="/" />} />

        <Route path="/quotation-invoice/:id" element={user ? <QuotationInvoice/>: <Navigate to="/" />} />

        <Route path="/lead-data" element={user ? <LeadData/>: <Navigate to="/" />} />
        <Route path="/quotation-data" element={user ? <QuotationData/>: <Navigate to="/" />} />
        <Route path="/invoice-data" element={user ? <InvoiceData/>: <Navigate to="/" />} />
        <Route path="/lead-single-data/:id" element={  <Single_Lead_Profile/>} />

   {/* aditya routes */}

   <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/overview' element={<Overview/>}/>
     
        <Route path='/edit-profile' element={<UserProfile/>}/>
        <Route path='/employee-management' element={<EmployeeManagement/>}/>
        <Route path='/employee-single/:employeeId' element={<EmployeeSingle/>}/>
        <Route path='/singleOrganization/:id' element={<SingleOrganization/>}/>
        <Route path='/reporting' element={<Reporting/>}/>
        <Route path='/profile' element={<Profile/>}/>

      </Routes>
</div>




    
    </>





  )
}

export default App