import React, { useState, useEffect } from 'react';

// ฟังก์ชันจำลองการดึงข้อมูลจาก API ตามวันที่ที่เลือก
// ในโปรเจกต์จริง คุณจะต้องเปลี่ยนส่วนนี้ให้เรียก API ของคุณ
const fetchJobStatusByDate = async (date) => {
  console.log("Fetching data for:", date.toLocaleDateString('th-TH'));
  // --- ส่วนจำลองข้อมูล ---
  // สร้างข้อมูลตัวเลขแบบสุ่มเพื่อให้เห็นว่าข้อมูลมีการเปลี่ยนแปลงเมื่อเลือกวันที่
  const month = date.getMonth();
  const year = date.getFullYear() % 100; // เอาแค่ 2 ตัวท้ายของปี
  
  const mockData = {
    newJobs: (month + 1) % 5 + 1, // 1-5
    inProgress: (year + month) % 8 + 2, // 2-9
    completed: (year * month + 15) % 20 + 10, // 10-29
  };

  // จำลอง delay เหมือนการเรียก API จริง
  return new Promise(resolve => setTimeout(() => resolve(mockData), 300));
  // --- จบส่วนจำลองข้อมูล ---
};


export default function JobStatusBlock() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [jobStats, setJobStats] = useState({ newJobs: 0, inProgress: 0, completed: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // useEffect จะทำงานเมื่อ selectedDate เปลี่ยนแปลง
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      // TODO: เมื่อมี API จริง ให้เปลี่ยน `fetchJobStatusByDate` เป็นการเรียก API ของคุณ
      const data = await fetchJobStatusByDate(selectedDate);
      setJobStats(data);
      setIsLoading(false);
    };
    getData();
  }, [selectedDate]);


  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value, 10);
    setSelectedDate(new Date(selectedDate.getFullYear(), newMonth, 1));
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setSelectedDate(new Date(newYear, selectedDate.getMonth(), 1));
  };

  // สร้างตัวเลือกสำหรับปี (5 ปีย้อนหลัง)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  // รายชื่อเดือนภาษาไทย
  const months = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  const StatDisplay = ({ value, label, colorClass, loading }) => (
    <div className={`transition-opacity duration-300 ${loading ? 'opacity-25' : 'opacity-100'}`}>
      <p className={`${colorClass} text-sm font-semibold`}>{label}</p>
      <p className="text-4xl font-bold mt-2 text-white">{value}</p>
    </div>
  );

  return (
    <div className="bg-[#2a2a2e] border border-[#333] rounded-xl p-6 flex flex-col justify-between h-56">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-xl text-white">สถานะงานทั้งหมด</h3>
        <div className="flex gap-2">
          {/* Dropdown สำหรับเลือกเดือน */}
          <select
            value={selectedDate.getMonth()}
            onChange={handleMonthChange}
            className="bg-[#3a3a3f] border border-[#555] text-white text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#5F5AFF]"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>
          {/* Dropdown สำหรับเลือกปี */}
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
        <StatDisplay value={jobStats.newJobs} label="งานใหม่" colorClass="text-yellow-400" loading={isLoading} />
        <div className="border-l border-gray-600 h-16 self-center"></div>
        <StatDisplay value={jobStats.inProgress} label="กำลังดำเนินการ" colorClass="text-cyan-400" loading={isLoading} />
        <div className="border-l border-gray-600 h-16 self-center"></div>
        <StatDisplay value={jobStats.completed} label="เสร็จสิ้น" colorClass="text-green-400" loading={isLoading} />
      </div>
    </div>
  );
}