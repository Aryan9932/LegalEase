import React from "react";
import { Users, Plus } from "lucide-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from "react-router-dom"; // ✅ Corrected

const Lawyer = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C7D0FF] via-[#E8EEFF] to-[#F0F4FF] flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="w-35 h-35 mr-6">
              <div
                className="w-full h-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] items-center justify-center"
                style={{
                  backgroundImage: `url("https://lottie.host/5a638c97-fb18-4308-a6a5-6c93d263a46e/y47Ui7f0R7.lottie")`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <DotLottieReact
                  src="https://lottie.host/5a638c97-fb18-4308-a6a5-6c93d263a46e/y47Ui7f0R7.lottie"
                  loop
                  autoplay
                />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-5xl font-bold text-gray-800 mb-3">
                Find Your Lawyer
              </h1>
              <p className="text-2xl text-gray-600 font-medium">
                According to your case type
              </p>
            </div>
          </div>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Connect with experienced legal professionals who specialize in your
            specific area of need. Choose from our comprehensive list of
            practice areas below.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            className="bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 text-lg min-w-[200px]"
            onClick={() => navigate('/findlawyer')}
          >
            <Users className="w-6 h-6" />
            Show Lawyers
          </button>

          <button
            className="bg-white hover:bg-gray-50 text-[#4F46E5] font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 text-lg border-2 border-[#4F46E5] min-w-[200px]"
            onClick={() => navigate('/addlawyer')}
          >
            <Plus className="w-6 h-6" />
            Add Lawyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lawyer;
