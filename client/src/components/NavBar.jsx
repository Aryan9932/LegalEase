import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { MessageCircle, UserPlus, Shield, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const NavBar = () => {
   const navigate = useNavigate(); 
  const navItems = [
    { icon: MessageCircle, text: "Legal Chat-Bot", path: "/chatbot" },
    { icon: UserPlus, text: "Hire Lawyer", path: "/lawyer" },
    { icon: Shield, text: "Police Complaint", path: "/policecomplaint" },
    { icon: FileText, text: "Legal Documents", path: "/agreement" }
  ];

  return (
    <nav className='w-full h-[100px] bg-[#f7f306] relative overflow-hidden'>
      {/* Glow effect */}
      <div className="absolute inset-0 bg-yellow-100/40 animate-pulse blur-sm"></div>

      <div className='relative z-10 h-full flex items-center justify-between px-6 max-w-7xl mx-auto'>

        {/* Logo */}
        <div className='h-[90px] w-[170px] flex items-center justify-center group'>
          <div className="relative transform transition-transform duration-300 group-hover:scale-110">
            <DotLottieReact
              src="https://lottie.host/ea5705d2-7fac-4013-8bf2-7698276ed277/VFpCuxqRDG.lottie"
              loop
              autoplay
              className="drop-shadow-lg"  onClick={() => navigate('/')}
            />
            <div className="absolute inset-0 bg-yellow-200/30 rounded-full blur-xl -z-10 animate-pulse"></div>
          </div>
        </div>

        {/* Center nav items */}
        <div className='flex items-center space-x-6'>
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Link
                to={item.path}
                key={index}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-2 px-3 py-2 rounded-md bg-white/30 backdrop-blur-sm border border-yellow-300 hover:bg-white/40 hover:shadow-md transition">
                  <IconComponent
                    size={16}
                    className="text-gray-800 group-hover:text-blue-700 transition-colors duration-300"
                  />
                  <span className="text-sm text-gray-800 font-semibold group-hover:text-blue-700 transition">
                    {item.text}
                  </span>
                </div>
                <div className="h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-1"></div>
              </Link>
            );
          })}
        </div>

        {/* Sign In button */}
        <button
          className="cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group"
        >
          <div className="relative overflow-hidden">
            <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
              Sign in
            </p>
            <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
              Sign in
            </p>
          </div>
        </button>

      </div>
    </nav>
  );
};

export default NavBar;
