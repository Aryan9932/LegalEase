import React, { useState } from "react";
import { FileText, Download, Sparkles, Scale, Building, UserCheck } from "lucide-react";

const fieldsByType = {
  nda: ["partyA", "partyB", "addressA", "addressB", "date", "purpose", "confidentialScope", "useCase", "term", "governingLaw"],
  rent: ["landlord", "tenant", "landlordAddress", "tenantAddress", "propertyAddress", "date", "startDate", "endDate", "monthlyRent", "securityDeposit", "governingLaw"],
  employment: ["employer", "employee", "employerAddress", "employeeAddress", "position", "workLocation", "salary", "startDate", "date", "governingLaw"]
};

const agreementTypes = {
  nda: { 
    title: "Non-Disclosure Agreement", 
    icon: UserCheck, 
    color: "from-purple-500 to-pink-500",
    description: "Protect confidential information between parties"
  },
  rent: { 
    title: "Rental Agreement", 
    icon: Building, 
    color: "from-blue-500 to-cyan-500",
    description: "Establish terms for property rental"
  },
  employment: { 
    title: "Employment Contract", 
    icon: Scale, 
    color: "from-emerald-500 to-teal-500",
    description: "Define employment terms and conditions"
  }
};

const AgreementForm = () => {
  const [type, setType] = useState("nda");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setFormData({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulated API call - replace with actual axios call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Replace this with your actual API call:
      // const res = await axios.post("http://localhost:5000/api/agreements/generate", {
      //   type,
      //   formData,
      // }, {
      //   responseType: "blob"
      // });
      
      // const url = window.URL.createObjectURL(new Blob([res.data]));
      // const link = document.createElement("a");
      // link.href = url;
      // link.setAttribute("download", `${type}-agreement.pdf`);
      // document.body.appendChild(link);
      // link.click();
      
      alert("PDF would be generated here!");
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("Failed to generate agreement.");
    } finally {
      setLoading(false);
    }
  };

  const formatFieldLabel = (field) => {
    return field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const getFieldType = (field) => {
    if (field.includes('date') || field === 'startDate' || field === 'endDate') return 'date';
    if (field === 'salary' || field === 'monthlyRent' || field === 'securityDeposit') return 'number';
    if (field.includes('address')) return 'textarea';
    return 'text';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 shadow-lg">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
            Legal Agreement Generator
          </h1>
          <p className="text-gray-600 text-lg">Create professional legal documents in minutes</p>
        </div>

        {/* Agreement Type Selector */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {Object.entries(agreementTypes).map(([key, config]) => {
            const IconComponent = config.icon;
            const isSelected = type === key;
            
            return (
              <button
                key={key}
                onClick={() => handleTypeChange(key)}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  isSelected 
                    ? 'border-transparent bg-gradient-to-r ' + config.color + ' text-white shadow-2xl' 
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-lg'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                    isSelected ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{config.title}</h3>
                  <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                    {config.description}
                  </p>
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className={`h-2 bg-gradient-to-r ${agreementTypes[type].color}`}></div>
          
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${agreementTypes[type].color} flex items-center justify-center mr-4`}>
                {React.createElement(agreementTypes[type].icon, { className: "w-5 h-5 text-white" })}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{agreementTypes[type].title}</h2>
                <p className="text-gray-600">Fill in the details below</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {fieldsByType[type].map((field) => {
                  const fieldType = getFieldType(field);
                  const isFocused = focusedField === field;
                  
                  return (
                    <div key={field} className={`${fieldType === 'textarea' ? 'md:col-span-2' : ''}`}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {formatFieldLabel(field)}
                      </label>
                      <div className="relative">
                        {fieldType === 'textarea' ? (
                          <textarea
                            name={field}
                            value={formData[field] || ""}
                            onChange={handleChange}
                            onFocus={() => setFocusedField(field)}
                            onBlur={() => setFocusedField(null)}
                            rows={3}
                            className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 resize-none ${
                              isFocused 
                                ? 'border-blue-500 ring-4 ring-blue-500/10 bg-blue-50/50' 
                                : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                            } focus:outline-none`}
                            required
                          />
                        ) : (
                          <input
                            type={fieldType}
                            name={field}
                            value={formData[field] || ""}
                            onChange={handleChange}
                            onFocus={() => setFocusedField(field)}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${
                              isFocused 
                                ? 'border-blue-500 ring-4 ring-blue-500/10 bg-blue-50/50' 
                                : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                            } focus:outline-none`}
                            required
                          />
                        )}
                        {isFocused && (
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-gray-200">
                <button 
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full py-4 px-8 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : `bg-gradient-to-r ${agreementTypes[type].color} hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]`
                  } flex items-center justify-center space-x-3`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating Agreement...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>Generate & Download PDF</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>🔒 All data is processed securely and not stored</p>
        </div>
      </div>
    </div>
  );
};

export default AgreementForm;