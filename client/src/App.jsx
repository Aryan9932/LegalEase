import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Landing from './pages/Landing';
import ChatBot from './pages/ChatBot';
import FindLawyer from './pages/FindLawyer';
import AddLawyer from './pages/AddLawyer';
import Lawyer from './pages/Lawyer';
import RegisterComplaint from './pages/RegisterComplaint';
import AgreementForm from './pages/Agreement';


const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chatbot" element={<ChatBot/>} />
         <Route path="/lawyer" element={<Lawyer/>} />
         <Route path="/addlawyer" element={<AddLawyer/>} />
         <Route path="/findlawyer" element={<FindLawyer/>} />
          <Route path="/policecomplaint" element={<RegisterComplaint/>} />
           <Route path="/agreement" element={<AgreementForm/>} />
      </Routes>
    </>
  );
};

export default App;
