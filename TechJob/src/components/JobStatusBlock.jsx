import React from 'react';

// รับ props เพิ่มเข้ามา: `selectedDate` และ `onDateChange`
export default function JobStatusBlock({ counts, selectedDate, onDateChange }) {

  // นำ Logic สำหรับสร้าง Dropdown กลับมา
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  // ฟังก์ชันเหล่านี้จะเรียก `onDateChange` ที่ได้รับมาจากแม่ เพื่อเปลี่ยน State ที่แม่
  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value, 10);
    onDateChange(new Date(selectedDate.getFullYear(), newMonth, 1));
  };
  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    onDateChange(new Date(newYear, selectedDate.getMonth(), 1));
  };

  const StatDisplay = ({ value, label, colorClass }) => (
    <div>
      <p className={`${colorClass} text-sm font-semibold`}>{label}</p>
      <p className="text-4xl font-bold mt-2 text-white">{value}</p>
    </div>
  );

  return (
    <div className="bg-[#2a2a2e] border border-[#333] rounded-xl p-6 flex flex-col justify-between h-56">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-xl text-white">สถานะงานทั้งหมด</h3>
        {/* นำ UI ของ Dropdown กลับมา */}
        <div className="flex gap-2">
          <select
            value={selectedDate.getMonth()}
            onChange={handleMonthChange}
            className="bg-[#3a3a3f] border border-[#555] text-white text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#5F5AFF]"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>
          <select
            value={selectedDate.getFullYear()}
            onChange={handleYearChange}
            className="bg-[#3a3a3f] border border-[#555] text-white text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#5F5AFF]"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-around text-center">
        <StatDisplay value={counts.newJobs} label="งานใหม่" colorClass="text-yellow-400" />
        <div className="border-l border-gray-600 h-16 self-center"></div>
        <StatDisplay value={counts.inProgress} label="กำลังดำเนินการ" colorClass="text-cyan-400" />
        <div className="border-l border-gray-600 h-16 self-center"></div>
        <StatDisplay value={counts.completed} label="เสร็จสิ้น" colorClass="text-green-400" />
      </div>
    </div>
  );
}