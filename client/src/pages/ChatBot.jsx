import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState("");

  const handleSearch = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/ai/ask", {
        prompt: query,
      });

      setResults(res.data.answer || "No answer found.");
    } catch (err) {
      console.error("Search failed", err);
      setResults("Something went wrong. Please try again.");
    }
  };

  const formatOutput = (text) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      if (line.trim() === "") return null;

      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <h2 key={i} className="font-bold text-xl text-blue-800 mt-6 mb-2">
            {line.replace(/\*\*/g, "")}
          </h2>
        );
      }

      if (/^(\* |- )/.test(line)) {
        return (
          <li key={i} className="list-disc ml-6 text-red-800">
            {line.replace(/^(\* |- )/, "")}
          </li>
        );
      }

      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={i} className="list-decimal ml-6 text-gray-800">
            {line}
          </li>
        );
      }

      return (
        <p key={i} className="text-gray-700 mt-2">
          {line}
        </p>
      );
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Ask Your Legal Query</h2>
          <div className="flex flex-col gap-4">
            <input
              className="bg-white px-4 py-3 outline-none w-full text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
              name="text"
              placeholder="Enter your legal doubt"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              type="text"
            />
            <button
              className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-200"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white rounded-xl p-6 shadow-md overflow-auto max-h-[600px]">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Response</h2>
          <div className="space-y-2">{formatOutput(results)}</div>
        </div>
      </div>
    </main>
  );
};

export default Chatbot;
