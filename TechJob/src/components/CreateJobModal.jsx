import React, { useState } from 'react';

// คอมโพเนนต์นี้รับ props มา 4 ตัว:
// isOpen: (boolean) เพื่อบอกว่า modal ควรจะแสดงหรือไม่
// onClose: (function) ฟังก์ชันที่จะถูกเรียกเมื่อต้องการปิด modal
// onSubmit: (function) ฟังก์ชันที่จะถูกเรียกเมื่อผู้ใช้กดยืนยันการสร้างงาน พร้อมส่งข้อมูลกลับไป
// jobTypes: (array) รายการประเภทงานที่มีอยู่ เพื่อเอามาแสดงใน dropdown
export default function CreateJobModal({ isOpen, onClose, onSubmit, jobTypes }) {
  // สร้าง State เพื่อเก็บข้อมูลจากฟอร์มแต่ละช่อง
  const [imagePreview, setImagePreview] = useState(null); // State สำหรับเก็บ URL ของรูปภาพตัวอย่าง
  const [imageFile, setImageFile] = useState(null); // State สำหรับเก็บไฟล์รูปภาพจริงๆ
  const [jobName, setJobName] = useState(''); // State สำหรับชื่องาน
  const [jobType, setJobType] = useState(jobTypes[0] || ''); // State สำหรับประเภทงาน, ค่าเริ่มต้นคือประเภทแรก
  const [newJobType, setNewJobType] = useState(''); // State สำหรับเก็บชื่อประเภทงานใหม่ที่ผู้ใช้พิมพ์
  const [details, setDetails] = useState(''); // State สำหรับรายละเอียดงาน
  const [address, setAddress] = useState(''); // State สำหรับที่อยู่

  // ถ้า prop `isOpen` ไม่ใช่ true, ไม่ต้องแสดงผลอะไรเลย
  if (!isOpen) return null;

  // ฟังก์ชันที่ทำงานเมื่อมีการเลือกไฟล์รูปภาพ
  const handleImageChange = (e) => {
    // ตรวจสอบว่ามีไฟล์ถูกเลือกหรือไม่
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file); // เก็บไฟล์จริงๆ ไว้ใน state
      // สร้าง URL ชั่วคราวสำหรับแสดงรูปภาพตัวอย่าง
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ฟังก์ชันที่ทำงานเมื่อกดปุ่ม "สร้างใบงาน"
  const handleSubmit = (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บเมื่อ submit ฟอร์ม
    
    // ตรวจสอบว่าถ้าผู้ใช้เลือก "เพิ่มประเภทใหม่" แต่ไม่ได้กรอกชื่อประเภทใหม่ ให้แจ้งเตือน
    if (jobType === 'add_new' && !newJobType.trim()) {
      alert('กรุณากรอกชื่อประเภทงานใหม่');
      return;
    }
    
    // รวบรวมข้อมูลทั้งหมดในฟอร์มเป็น object เดียว
    const finalJobType = jobType === 'add_new' ? newJobType : jobType;
    const newJobData = {
      name: jobName,
      type: finalJobType,
      details,
      address,
      image: imagePreview, // ส่ง URL ของรูปตัวอย่างไป
      // ในแอปจริง คุณอาจจะต้องส่ง imageFile ไปอัปโหลดที่ server ก่อน
    };
    
    onSubmit(newJobData); // เรียกฟังก์ชัน onSubmit ที่ได้รับมาจาก props พร้อมส่งข้อมูลกลับไป
    onClose(); // เรียกฟังก์ชัน onClose เพื่อปิด Modal
  };

  // UI ของ Modal
  return (
    // ส่วนพื้นหลังสีดำโปร่งแสง (Overlay)
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose} // เมื่อคลิกที่พื้นหลัง ให้ปิด modal
    >
      {/* ส่วนของฟอร์ม ที่จะไม่ปิดเมื่อถูกคลิก */}
      <div 
        className="bg-[#2a2a2e] text-white w-full max-w-2xl rounded-xl p-8 shadow-lg relative transform transition-all max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // ป้องกันการปิด modal เมื่อคลิกที่ตัวฟอร์ม
      >
        {/* ปุ่มปิด (X) ที่มุมขวาบน */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">&times;</button>
        <h2 className="text-2xl font-bold mb-6">สร้างใบงานใหม่</h2>
        
        {/* ฟอร์มสำหรับกรอกข้อมูล */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ช่องกรอกชื่องาน */}
          <div>
            <label className="block text-sm font-medium text-gray-300">ชื่องาน</label>
            <input type="text" value={jobName} onChange={(e) => setJobName(e.target.value)} required className="mt-1 w-full bg-[#3a3a3f] border border-[#555] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5F5AFF]" />
          </div>

          {/* Dropdown สำหรับเลือกประเภทงาน */}
          <div>
            <label className="block text-sm font-medium text-gray-300">ประเภทงาน</label>
            <select value={jobType} onChange={(e) => setJobType(e.target.value)} className="mt-1 w-full bg-[#3a3a3f] border border-[#555] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5F5AFF]">
              {jobTypes.map(type => <option key={type} value={type}>{type}</option>)}
              <option value="add_new">-- เพิ่มประเภทใหม่ --</option>
            </select>
          </div>
          
          {/* ช่องกรอกสำหรับ "ประเภทงานใหม่" (จะแสดงก็ต่อเมื่อเลือก "เพิ่มประเภทใหม่") */}
          {jobType === 'add_new' && (
             <div>
              <label className="block text-sm font-medium text-gray-300">ระบุประเภทงานใหม่</label>
              <input type="text" value={newJobType} onChange={(e) => setNewJobType(e.target.value)} required className="mt-1 w-full bg-[#3a3a3f] border border-[#555] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5F5AFF]" />
            </div>
          )}

          {/* ช่องกรอกรายละเอียดงาน */}
          <div>
            <label className="block text-sm font-medium text-gray-300">รายละเอียดงาน</label>
            <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows="3" className="mt-1 w-full bg-[#3a3a3f] border border-[#555] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5F5AFF]"></textarea>
          </div>
          
           {/* ช่องกรอกที่อยู่ */}
          <div>
            <label className="block text-sm font-medium text-gray-300">ที่อยู่ / สถานที่</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="mt-1 w-full bg-[#3a3a3f] border border-[#555] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5F5AFF]" />
          </div>

          {/* ส่วนอัปโหลดรูปภาพ */}
          <div>
            <label className="block text-sm font-medium text-gray-300">แนบรูปภาพ</label>
            <input type="file" onChange={handleImageChange} accept="image/*" className="mt-1 w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#5F5AFF] file:text-white hover:file:bg-[#4e4ac8]"/>
            {/* แสดงรูปตัวอย่าง ถ้ามี */}
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 rounded-lg max-h-40"/>}
          </div>

          {/* ปุ่มยืนยันและยกเลิก */}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-semibold px-5 py-2 rounded-lg transition-colors">ยกเลิก</button>
            <button type="submit" className="bg-[#5F5AFF] hover:bg-[#4e4ac8] text-white font-semibold px-5 py-2 rounded-lg transition-colors">สร้างใบงาน</button>
          </div>
        </form>
      </div>
    </div>
  );
}