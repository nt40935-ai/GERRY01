import React, { useState } from 'react';
import { Job, Language } from '../../../types';
import { Plus, Save, Trash2, Edit2, Globe } from 'lucide-react';

interface JobManagerProps {
  jobs: Job[];
  onAdd: (job: Job) => void;
  onUpdate: (job: Job) => void;
  onDelete: (id: string) => void;
  language: Language;
}

const emptyJob: Job = {
  id: '',
  title: '',
  location: '',
  type: '',
  salary: '',
  description: '',
  requirements: [],
  benefits: [],
  isActive: true,
};

const JobManager: React.FC<JobManagerProps> = ({ jobs, onAdd, onUpdate, onDelete, language: _language }) => {
  const [draft, setDraft] = useState<Job>(emptyJob);
  const [isEditing, setIsEditing] = useState(false);

  const reset = () => {
    setDraft(emptyJob);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!draft.title || !draft.location || !draft.type) return;
    if (isEditing) {
      onUpdate(draft);
    } else {
      onAdd({ ...draft, id: `job-${Date.now()}` });
    }
    reset();
  };

  const parseList = (value: string) =>
    value
      .split('\n')
      .map((t) => t.trim())
      .filter(Boolean);

  const joinList = (items: string[]) => items.join('\n');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-coffee-900">Danh sách tin tuyển dụng</h3>
          <span className="text-sm text-gray-500">{jobs.length} tin</span>
        </div>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="border border-gray-100 rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-600 font-semibold">{job.type}</p>
                  <h4 className="text-xl font-serif font-bold text-coffee-900">{job.title}</h4>
                  <p className="text-sm text-coffee-600">{job.location}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${job.isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                  {job.isActive ? 'Đang hiển thị' : 'Ẩn'}
                </span>
              </div>
              <p className="text-sm text-coffee-700">{job.description}</p>
              <div className="text-sm text-coffee-800 font-semibold">Lương: {job.salary}</div>
              <div className="flex flex-wrap gap-2">
                {job.requirements.slice(0, 3).map((req) => (
                  <span key={req} className="px-3 py-1 rounded-full bg-coffee-50 text-coffee-700 text-xs border border-coffee-100">{req}</span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setDraft(job);
                    setIsEditing(true);
                  }}
                  className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-600"
                >
                  <Edit2 className="w-4 h-4" /> Sửa
                </button>
                <button
                  onClick={() => onDelete(job.id)}
                  className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" /> Xóa
                </button>
              </div>
            </div>
          ))}
          {jobs.length === 0 && <p className="text-sm text-gray-500">Chưa có tin tuyển dụng.</p>}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="flex items-center gap-2 text-amber-700 font-semibold">
          <Plus className="w-4 h-4" />
          {isEditing ? 'Cập nhật tin' : 'Tạo tin mới'}
        </div>
        <input
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
          placeholder="Tiêu đề"
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        />
        <input
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
          placeholder="Địa điểm"
          value={draft.location}
          onChange={(e) => setDraft({ ...draft, location: e.target.value })}
        />
        <input
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
          placeholder="Hình thức/ca làm"
          value={draft.type}
          onChange={(e) => setDraft({ ...draft, type: e.target.value })}
        />
        <input
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
          placeholder="Lương/thu nhập"
          value={draft.salary}
          onChange={(e) => setDraft({ ...draft, salary: e.target.value })}
        />
        <textarea
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm min-h-[80px]"
          placeholder="Mô tả ngắn"
          value={draft.description}
          onChange={(e) => setDraft({ ...draft, description: e.target.value })}
        />
        <textarea
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm min-h-[80px]"
          placeholder="Yêu cầu (mỗi dòng một ý)"
          value={joinList(draft.requirements)}
          onChange={(e) => setDraft({ ...draft, requirements: parseList(e.target.value) })}
        />
        <textarea
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm min-h-[80px]"
          placeholder="Quyền lợi (mỗi dòng một ý)"
          value={joinList(draft.benefits)}
          onChange={(e) => setDraft({ ...draft, benefits: parseList(e.target.value) })}
        />
        <label className="flex items-center gap-2 text-sm font-medium text-coffee-800">
          <input
            type="checkbox"
            checked={draft.isActive}
            onChange={(e) => setDraft({ ...draft, isActive: e.target.checked })}
          />
          Hiển thị công khai
        </label>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-amber-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            {isEditing ? 'Lưu thay đổi' : 'Đăng tin'}
          </button>
          {isEditing && (
            <button onClick={reset} className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold">
              Hủy
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <Globe className="w-3 h-3" /> Tin hiển thị ngay tại trang Tuyển dụng nếu bật công khai.
        </p>
      </div>
    </div>
  );
};

export default JobManager;



