import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom"; // ✅ เพิ่ม import Outlet มาด้วย
import { FaCog } from "react-icons/fa";
import { MdEngineering } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { CgFileDocument } from "react-icons/cg";
import { BsBoxes } from "react-icons/bs";
import { TbAlertHexagon } from "react-icons/tb";
import "./components.css";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // ลบ token/session ถ้ามี
    navigate("/login", { replace: true });
  };

  return (
    // ✅ แก้จาก "div w-64 fixed h-screen ..." → เป็น "flex h-screen"
    //    เพื่อแยก Sidebar กับ Main Content ไม่ให้เบี้ยว
    <div className="flex h-screen">

      {/* ✅ Sidebar (เดิมครอบ Outlet เอาออกไป) */}
      <div className="w-64 bg-[#111014] flex flex-col justify-between border-r border-[#222]">
        {/* Logo + Menu */}
        <div>
          <div className="p-4 text-white text-xl font-bold">TECH JOB</div>
          <nav className="flex flex-col gap-2 px-4">
            <Link
              to="/admin/admindashboard"
              className="bg-[#19182A] text-white py-2 px-4 rounded-lg hover:bg-[#222]"
            >
              <VscGraph className="inline mr-2" /> ข้อมูลภาพรวม
            </Link>

            <Link
              to="/admin/datauser"
              className="bg-[#19182A] text-white py-2 px-4 rounded-lg hover:bg-[#222]"
            >
              <MdEngineering className=" inline mr-2" /> ข้อมูลช่าง
            </Link>

            <Link
              to="/admin/datauser"
              className="bg-[#19182A] text-white py-2 px-4 rounded-lg hover:bg-[#222]"
            >
              <CgFileDocument className=" inline mr-2" /> ระบบใบงาน
            </Link>

            <Link
              to="/admin/datauser"
              className="bg-[#19182A] text-white py-2 px-4 rounded-lg hover:bg-[#222]"
            >
              <BsBoxes className=" inline mr-2" /> คลังอุปกรณ์/วัสดุ
            </Link>

                        <Link
              to="/admin/datauser"
              className="bg-[#19182A] text-white py-2 px-4 rounded-lg hover:bg-[#222]"
            >
              <TbAlertHexagon className=" inline mr-2" /> การแจ้งปัญหา
            </Link>

            <Link
              to="/admin/settings"
              className="bg-[#19182A] text-white py-2 px-4 rounded-lg hover:bg-[#222]"
            >
              <FaCog className="inline mr-2" /> การตั้งค่า
            </Link>
          </nav>
        </div>

        {/* Sign Out */}
        <div className="p-4">
          <button
            onClick={handleSignOut}
            className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>

      {/* ✅ Main Content (ย้าย Outlet ออกมานอก sidebar) */}
      <div className="flex-1 bg-[#1a1a1f] p-6 overflow-auto">
        <Outlet /> {/* จะ render หน้า child (dashboard, settings ฯลฯ) ตรงนี้ */}
      </div>
    </div>
  );
}
