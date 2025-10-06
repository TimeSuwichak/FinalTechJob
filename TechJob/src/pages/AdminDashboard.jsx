import React, { useState, useMemo } from "react";
import JobStatusBlock from '../components/JobStatusBlock';
import CreateJobModal from '../components/CreateJobModal';
import JobList from '../components/JobList';

const UsersIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>);
const ArchiveBoxIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /> </svg>);
const ChartPieIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /> <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /> </svg>);

const initialJobs = [
  { id: 1, name: 'ซ่อมท่อประปารั่วซึม', type: 'ซ่อมระบบประปา', address: '123 ถ.สุขุมวิท, กรุงเทพฯ', image: null, status: 'กำลังดำเนินการ' },
  { id: 2, name: 'ล้างแอร์ห้องนอนใหญ่', type: 'ติดตั้งแอร์', address: '456 ถ.รัชดา, กรุงเทพฯ', image: null, status: 'เสร็จสิ้น' },
];

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState(initialJobs);
  const [jobTypes, setJobTypes] = useState(['ติดตั้งแอร์', 'ซ่อมระบบประปา', 'ตรวจเช็คระบบไฟฟ้า']);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCreateJob = (newJobData) => {
    const jobToAdd = {
      ...newJobData,
      id: Date.now(),
      status: 'ใหม่',
      createdAt: new Date() // ---> เพิ่มบรรทัดนี้ <---
    };

    setJobs(prevJobs => [jobToAdd, ...prevJobs]);
    if (!jobTypes.includes(jobToAdd.type)) {
      setJobTypes(prevTypes => [...prevTypes, jobToAdd.type]);
    }
  };

  const jobCounts = useMemo(() => {
    const filteredJobs = jobs.filter(job => {
      // สำหรับข้อมูลเริ่มต้นที่ไม่มี `createdAt` ให้แสดงผลเสมอ
      if (!job.createdAt) return true;
      const jobDate = new Date(job.createdAt);
      return jobDate.getMonth() === selectedDate.getMonth() &&
        jobDate.getFullYear() === selectedDate.getFullYear();
    });

    const counts = { newJobs: 0, inProgress: 0, completed: 0 };
    filteredJobs.forEach(job => {
      if (job.status === 'ใหม่') counts.newJobs++;
      else if (job.status === 'กำลังดำเนินการ') counts.inProgress++;
      else if (job.status === 'เสร็จสิ้น') counts.completed++;
    });
    return counts;
  }, [jobs, selectedDate]); // ---> อย่าลืมเพิ่ม selectedDate ตรงนี้ <---

  return (
    <div className="flex bg-[#111014] ">
      <div className="flex-1 p-8 bg-[#1a1a1f] text-gray-200 font-sans flex flex-col overflow-hidden">

        <div className="flex-shrink-0">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl text-gray-100 font-bold">Dashboard</h2>
            <button onClick={handleOpenModal} className="bg-[#5F5AFF] text-white font-semibold px-5 py-2 rounded-lg hover:bg-[#4e4ac8] transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              CREATE JOB
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
                <JobStatusBlock 
      counts={jobCounts}
      selectedDate={selectedDate}
      onDateChange={setSelectedDate}
    />

            <div className="bg-[#1C3A3A] border border-[#2d5a5a] rounded-xl p-6 flex flex-col justify-between h-56">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl text-white">ภาพรวมทีมช่าง</h3>
                <UsersIcon />
              </div>
              <div className="flex justify-around text-center mt-4">
                <div> <p className="text-gray-300 text-sm">พร้อมรับงาน</p> <p className="text-4xl font-bold mt-2 text-emerald-400">8</p> </div>
                <div> <p className="text-gray-300 text-sm">กำลังทำงาน</p> <p className="text-4xl font-bold mt-2 text-amber-400">5</p> </div>
                <div> <p className="text-gray-300 text-sm">ออฟไลน์</p> <p className="text-4xl font-bold mt-2 text-gray-500">3</p> </div>
              </div>
            </div>

            <div className="bg-[#1D2E4D] border border-[#2a4369] rounded-xl p-6 h-56">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl text-white">วัสดุใกล้หมด</h3>
                <ArchiveBoxIcon />
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex justify-between items-center"> <span>ท่อ PVC ขนาด 4 หุน</span> <span className="font-semibold text-red-400 bg-red-900/50 px-2 py-1 rounded-md text-sm">เหลือ 2 ชิ้น</span> </li>
                <li className="flex justify-between items-center"> <span>สายไฟ VAF 2x2.5</span> <span className="font-semibold text-red-400 bg-red-900/50 px-2 py-1 rounded-md text-sm">เหลือ 5 เมตร</span> </li>
                <li className="flex justify-between items-center"> <span>เทปพันสายไฟ</span> <span className="font-semibold text-yellow-400 bg-yellow-900/50 px-2 py-1 rounded-md text-sm">เหลือ 10 ม้วน</span> </li>
              </ul>
            </div>

            <div className="bg-[#4a1d37] border border-[#6b2a4d] rounded-xl p-6 h-56">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl text-white">ประเภทงานยอดนิยม</h3>
                <ChartPieIcon />
              </div>
              <ol className="space-y-3 text-gray-300 list-decimal list-inside">
                <li> <span className="font-semibold text-white">ติดตั้งแอร์:</span> <span className="ml-2 text-fuchsia-300">35 งาน</span> </li>
                <li> <span className="font-semibold text-white">ซ่อมระบบประปา:</span> <span className="ml-2 text-fuchsia-300">28 งาน</span> </li>
                <li> <span className="font-semibold text-white">ตรวจเช็คระบบไฟฟ้า:</span> <span className="ml-2 text-fuchsia-300">19 งาน</span> </li>
              </ol>
            </div>
          </div>
        </div>


        <JobList jobs={jobs} />

      </div>

      <CreateJobModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateJob}
        jobTypes={jobTypes}
      />
    </div>
  );
}