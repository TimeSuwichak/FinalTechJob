import React from 'react';

// คอมโพเนนต์สำหรับแสดงการ์ดงานแต่ละใบ
const JobCard = ({ job }) => (
  <div className="bg-[#2a2a2e] border border-[#333] rounded-xl p-4 flex gap-4">
    {/* แสดงรูปภาพ ถ้ามี */}
    {job.image && (
      <img src={job.image} alt={job.name} className="w-24 h-24 rounded-md object-cover" />
    )}
    {/* แสดงรายละเอียดงาน */}
    <div className="flex flex-col">
      <span className="text-xs font-semibold bg-fuchsia-900/50 text-fuchsia-300 px-2 py-1 rounded-full self-start">{job.type}</span>
      <h4 className="font-bold text-lg text-white mt-2">{job.name}</h4>
      <p className="text-sm text-gray-400 mt-1">{job.address}</p>
    </div>
  </div>
);

// คอมโพเนนต์หลักที่รับรายการงาน (jobs) ทั้งหมดมาแสดงผล
export default function JobList({ jobs }) {
  // กรองรายการงานตามสถานะ
  const newJobs = jobs.filter(job => job.status === 'ใหม่');
  const inProgressJobs = jobs.filter(job => job.status === 'กำลังดำเนินการ');
  const completedJobs = jobs.filter(job => job.status === 'เสร็จสิ้น');

  return (
    <div className="mt-8">
      <h3 className="text-2xl text-gray-100 font-bold mb-6">ภาพรวมงานทั้งหมด</h3>
      
      {/* จัด layout เป็น 3 คอลัมน์ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* คอลัมน์: งานใหม่ */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-xl text-yellow-400">งานใหม่ ({newJobs.length})</h4>
          {newJobs.length > 0 ? (
            newJobs.map(job => <JobCard key={job.id} job={job} />)
          ) : (
            <p className="text-gray-500 text-sm">ยังไม่มีงานใหม่</p>
          )}
        </div>

        {/* คอลัมน์: กำลังดำเนินการ */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-xl text-cyan-400">กำลังดำเนินการ ({inProgressJobs.length})</h4>
           {inProgressJobs.length > 0 ? (
            inProgressJobs.map(job => <JobCard key={job.id} job={job} />)
          ) : (
            <p className="text-gray-500 text-sm">ไม่มีงานที่กำลังดำเนินการ</p>
          )}
        </div>

        {/* คอลัมน์: เสร็จสิ้น */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-xl text-green-400">เสร็จสิ้น ({completedJobs.length})</h4>
          {completedJobs.length > 0 ? (
            completedJobs.map(job => <JobCard key={job.id} job={job} />)
          ) : (
            <p className="text-gray-500 text-sm">ยังไม่มีงานที่เสร็จสิ้น</p>
          )}
        </div>
      </div>
    </div>
  );
}