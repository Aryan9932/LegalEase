import React from 'react';
import chatbotImg from '../assets/chatbot.png';
import policeComplaint from '../assets/policecomplaint.png'; 
import findLawyer from '../assets/findlawyer.png';// adjust path as needed

const Features = () => {
  return (
    <div className="w-full bg-white py-12 pt-50 px-6 flex justify-center items-center">
      <div className="max-w-5xl w-full">
        <img
          src={chatbotImg}
          alt="Chatbot Feature"
          className="w-full h-auto rounded-xl  object-contain"
        />
        <img
          src={policeComplaint}
          alt="Police Complaint"
          className="w-full h-auto pt-[150px] rounded-xl  object-contain"
        />
        <img
          src={findLawyer}
          alt="Find LAwyer"
          className="w-full h-auto pt-[150px] rounded-xl  object-contain"
        />
      </div>
      {/* <div className="max-w-5xl w-full">
        
      </div> */}
    </div>
  );
};

export default Features;
