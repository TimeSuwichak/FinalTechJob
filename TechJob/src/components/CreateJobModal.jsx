import React, { useState } from 'react';

export default function CreateJobModal({ isOpen, onClose, onSubmit, jobTypes }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [jobName, setJobName] = useState('');
  const [jobType, setJobType] = useState(jobTypes[0] || '');
  const [newJobType, setNewJobType] = useState('');
  const [details, setDetails] = useState('');
  const [address, setAddress] = useState('');

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  const resetForm = () => {
    setImagePreview(null);
    setImageFile(null);
    setJobName('');
    setJobType(jobTypes[0] || '');
    setNewJobType('');
    setDetails('');
    setAddress('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jobType === 'add_new' && !newJobType.trim()) {
      alert('กรุณากรอกชื่อประเภทงานใหม่');
      return;
    }
    const finalJobType = jobType === 'add_new' ? newJobType : jobType;
    const newJobData = { name: jobName, type: finalJobType, details, address, image: imagePreview };
    onSubmit(newJobData);
    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4" onClick={handleClose}>
      <div 
        className="bg-[#2a2a2e] text-white w-full max-w-2xl rounded-xl p-8 shadow-lg relative transform transition-all max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        <h2 className="text-2xl font-bold mb-6">สร้างใบงานใหม่</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">ชื่องาน</label>
            <input type="text" value={jobName} onChange={(e) => setJobName(e.target.value)} required className="mt-1 w-full bg-[#3a3a3f] border border-[#555] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5F5AFF]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">ประเภทงาน</label>
            <select value={jobType} onChange={(e) => setJobType(e.target.value)} className="mt-1 w-full bg-[#3a3a3f] border border-[#555] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5F5AFF]">
              {jobTypes.map(type => <option key={type} value={type}>{type}</option>)}
              <option value="add_new">-- เพิ่มประเภทใหม่ --</option>
            </select>
          </div>
          {jobType === 'add_new' && (
             <div>
              <label className="block text-sm font-medium text-gray-300">ระบุประเภทงานใหม่</label>
              <input type="text" value={newJobType} onChange={(e) => setNewJobType(e.target.value)} required className="mt-1 w-full bg-[#3a3a3f] border border-[#555] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5F5AFF]" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-300">รายละเอียดงาน</label>
            <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows="3" className="mt-1 w-full bg-[#3a3a3f] border border-[#555] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5F5AFF]"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">ที่อยู่ / สถานที่</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="mt-1 w-full bg-[#3a3a3f] border border-[#555] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5F5AFF]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">แนบรูปภาพ</label>
            <input type="file" onChange={handleImageChange} accept="image/*" className="mt-1 w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#5F5AFF] file:text-white hover:file:bg-[#4e4ac8]"/>
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 rounded-lg max-h-40 object-cover"/>}
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={handleClose} className="bg-gray-600 hover:bg-gray-500 text-white font-semibold px-5 py-2 rounded-lg transition-colors">ยกเลิก</button>
            <button type="submit" className="bg-[#5F5AFF] hover:bg-[#4e4ac8] text-white font-semibold px-5 py-2 rounded-lg transition-colors">สร้างใบงาน</button>
          </div>
        </form>
      </div>
    </div>
  );
}