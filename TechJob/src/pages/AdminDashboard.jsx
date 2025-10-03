import React from "react";
import "./pages.css";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <div className="flex-1  p-8 bg-[#1a1a1f]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Setting Dashboard</h2>
          <button className="bg-[#5F5AFF] px-4 py-2 rounded-lg hover:bg-[#4b48c7] transition-colors">
            + CREATE JOB
          </button>
        </div>

        {/* Main content area */}
        <div className="bg-[#111014] border border-[#222] rounded-xl h-[600px] flex items-center justify-center">
          <p className="text-gray-500 text-center">
            หน้าว่างเปล่า โปรดเลือกเมนู หรือค้นหาการตั้งค่า
          </p>
        </div>
      </div>
    </div>
  );
}