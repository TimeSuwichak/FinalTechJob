import React, { useState } from "react";
import { FaWrench, FaUserShield, FaUserCog } from "react-icons/fa";

export default function LoginPage() {
  const [role, setRole] = useState("ช่าง");

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex w-[1100px]">
        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-center pr-12">
          <div className="flex items-center mb-2">
            <div className="bg-[#5F5AFF] rounded-xl p-3 mr-3">
              <FaWrench className="text-white text-3xl" />
            </div>
            <div>
              <h1 className="text-white text-3xl font-bold">Tech Job</h1>
              <div className="text-gray-300 text-lg">ระบบจัดการในงานช่าง</div>
            </div>
          </div>
          <div className="text-gray-300 mb-8 mt-2">
            ระบบจัดการงานช่างที่ทันสมัย สำหรับการติดตามและจัดการในงานซ่อมบำรุงอย่างมีประสิทธิภาพ
          </div>
          <div className="flex gap-6">
            <div className="bg-[#111014] rounded-xl p-6 flex-1 border border-[#222]">
              <div className="flex items-center mb-2">
                <FaUserCog className="text-[#5F5AFF] mr-2" />
                <span className="text-white font-semibold">สำหรับช่าง</span>
              </div>
              <div className="text-gray-400 text-sm">รับงาน ติดตาม อัปเดตสถานะ</div>
            </div>
            <div className="bg-[#111014] rounded-xl p-6 flex-1 border border-[#222]">
              <div className="flex items-center mb-2">
                <FaUserShield className="text-[#5F5AFF] mr-2" />
                <span className="text-white font-semibold">สำหรับผู้ดูแล</span>
              </div>
              <div className="text-gray-400 text-sm">สร้างงาน มอบหมาย รายงาน</div>
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="bg-[#111014] rounded-xl px-10 py-8 w-[400px] border border-[#222]">
            <h2 className="text-white text-2xl font-bold text-center mb-2">เข้าสู่ระบบ</h2>
            <div className="text-gray-400 text-center mb-6 text-sm">
              เลือกประเภทผู้ใช้และกรอกข้อมูลเพื่อเข้าสู่ระบบ
            </div>
            {/* Role Select */}
            <div className="flex mb-6 gap-2">
              <button
                className={`flex-1 py-2 rounded-l-lg font-semibold transition ${
                  role === "ช่าง"
                    ? "bg-[#19182A] text-white border border-[#5F5AFF]"
                    : "bg-[#19182A] text-gray-400"
                }`}
                onClick={() => setRole("ช่าง")}
              >
                <span className="inline-flex items-center gap-2 justify-center">
                  <FaUserCog /> ช่าง
                </span>
              </button>
              <button
                className={`flex-1 py-2 rounded-r-lg font-semibold transition ${
                  role === "ผู้ดูแล"
                    ? "bg-[#19182A] text-white border border-[#5F5AFF]"
                    : "bg-[#19182A] text-gray-400"
                }`}
                onClick={() => setRole("ผู้ดูแล")}
              >
                <span className="inline-flex items-center gap-2 justify-center">
                  <FaUserShield /> ผู้ดูแล
                </span>
              </button>
            </div>
            {/* Form */}
            <form>
              <label className="block text-gray-300 mb-1">อีเมล</label>
              <input
                type="email"
                placeholder="กรอกอีเมลของคุณ"
                className="w-full mb-4 px-4 py-2 rounded-lg bg-[#19182A] text-white border border-[#222] focus:outline-none focus:border-[#5F5AFF]"
              />
              <label className="block text-gray-300 mb-1">รหัสผ่าน</label>
              <input
                type="password"
                placeholder="••••"
                className="w-full mb-6 px-4 py-2 rounded-lg bg-[#19182A] text-white border border-[#222] focus:outline-none focus:border-[#5F5AFF]"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#5F5AFF] text-white py-2 rounded-lg font-semibold hover:bg-[#4b48c7] transition"
                >
                  เข้าสู่ระบบ
                </button>
                <button
                  type="button"
                  className="bg-[#19182A] text-white py-2 px-6 rounded-lg border border-[#5F5AFF] font-semibold hover:bg-[#222] transition"
                >
                  ช่าง
                </button>
              </div>
            </form>
            <div className="text-center mt-6 text-gray-400 text-sm">
              ยังไม่มีบัญชี?{" "}
              <a href="#" className="text-[#5F5AFF] hover:underline">
                สมัครสมาชิก
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}