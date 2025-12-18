import React, { useEffect, useState } from 'react';
import { Send, User, Phone, Mail, FileText, CheckCircle2, Info, Upload } from 'lucide-react';
import { Job } from '../../types';

interface ApplicationSectionProps {
  presetRole?: string;
  jobs: Job[];
  onSubmit: (payload: {
    name: string;
    email: string;
    phone: string;
    position: string;
    experience: string;
    note: string;
    cvFileName?: string;
    cvFileData?: string;
  }) => void;
}

const fallbackPositions = [
  'Barista (Full-time)',
  'Barista Part-time',
  'Cửa hàng trưởng',
  'Quản lý ca',
  'Thực tập sinh Marketing',
];

const ApplicationSection: React.FC<ApplicationSectionProps> = ({ presetRole, jobs, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: presetRole || '',
    experience: '',
    note: '',
    cvFileName: '',
    cvFileData: '',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const positionOptions = jobs.filter(j => j.isActive).map(j => j.title);

  useEffect(() => {
    if (presetRole) {
      setForm((prev) => ({ ...prev, position: presetRole }));
    }
  }, [presetRole]);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setStatus('error');
      return;
    }
    onSubmit({
      name: form.name,
      email: form.email,
      phone: form.phone,
      position: form.position || positionOptions[0] || fallbackPositions[0],
      experience: form.experience,
      note: form.note,
      cvFileName: form.cvFileName,
      cvFileData: form.cvFileData,
    });
    setStatus('success');
    setForm({
      name: '',
      email: '',
      phone: '',
      position: positionOptions[0] || fallbackPositions[0],
      experience: '',
      note: '',
      cvFileName: '',
      cvFileData: '',
    });
  };

  const handleFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        cvFileName: file.name,
        cvFileData: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="apply" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
              <FileText className="w-4 h-4" />
              Form ứng tuyển
            </span>
            <h2 className="text-4xl font-serif font-bold text-coffee-900">Ứng tuyển ngay trong 2 phút</h2>
            <p className="text-lg text-coffee-700 leading-relaxed">
              Điền thông tin ngắn gọn, đính kèm kinh nghiệm (nếu có). HR sẽ liên hệ trong 24 giờ làm việc để sắp xếp phỏng vấn thử việc.
            </p>
            <div className="p-4 rounded-xl bg-coffee-50 border border-coffee-100 flex gap-3 text-sm text-coffee-700">
              <Info className="w-4 h-4 text-amber-600 mt-1" />
              <p>
                Nếu bạn chưa có CV, chỉ cần mô tả kinh nghiệm và thời gian có thể làm việc. Chúng tôi đánh giá cao thái độ và sự phù hợp với văn hóa quán.
              </p>
            </div>
            <ul className="space-y-2 text-coffee-700">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-2 rounded-full bg-amber-500"></span>
                Cam kết trả lời tất cả hồ sơ, không bỏ sót.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-2 rounded-full bg-amber-500"></span>
                Ca làm linh hoạt cho sinh viên; hỗ trợ chuyển ca gấp.
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-coffee-900 text-white rounded-2xl p-8 shadow-2xl border border-amber-200/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2 text-sm">
                  Họ tên *
                  <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3 border border-white/10 focus-within:border-amber-400">
                    <User className="w-4 h-4 text-amber-300" />
                    <input
                      className="bg-transparent outline-none flex-1 text-white placeholder:text-white/60"
                      placeholder="Nguyễn Văn A"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  </div>
                </label>

                <label className="flex flex-col gap-2 text-sm">
                  Email *
                  <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3 border border-white/10 focus-within:border-amber-400">
                    <Mail className="w-4 h-4 text-amber-300" />
                    <input
                      className="bg-transparent outline-none flex-1 text-white placeholder:text-white/60"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  </div>
                </label>

                <label className="flex flex-col gap-2 text-sm">
                  Số điện thoại *
                  <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3 border border-white/10 focus-within:border-amber-400">
                    <Phone className="w-4 h-4 text-amber-300" />
                    <input
                      className="bg-transparent outline-none flex-1 text-white placeholder:text-white/60"
                      placeholder="0912 345 678"
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                    />
                  </div>
                </label>

                <label className="flex flex-col gap-2 text-sm">
                  Vị trí mong muốn
                  <div className="bg-white/10 rounded-xl px-4 py-3 border border-white/10 focus-within:border-amber-400">
                    <select
                      className="bg-transparent outline-none w-full text-white"
                      value={form.position || positionOptions[0] || fallbackPositions[0]}
                      onChange={(e) => handleChange('position', e.target.value)}
                    >
                      {(positionOptions.length ? positionOptions : fallbackPositions).map((p) => (
                        <option key={p} value={p} className="text-coffee-900">
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm mt-6">
                Kinh nghiệm hoặc ca làm có thể đi (nếu chưa có kinh nghiệm, ghi “chưa có”)
                <textarea
                  className="bg-white/10 rounded-xl px-4 py-3 border border-white/10 focus:border-amber-400 outline-none text-white placeholder:text-white/60 min-h-[120px]"
                  placeholder="Ví dụ: 1 năm barista, thành thạo máy espresso; có thể làm ca tối 18h-23h các ngày trong tuần."
                  value={form.experience}
                  onChange={(e) => handleChange('experience', e.target.value)}
                />
              </label>

              <label className="flex flex-col gap-2 text-sm mt-4">
                Link CV / Portfolio (tùy chọn)
                <div className="flex flex-col gap-3">
                  <input
                    className="bg-white/10 rounded-xl px-4 py-3 border border-white/10 focus:border-amber-400 outline-none text-white placeholder:text-white/60"
                    placeholder="Drive/LinkedIn/Behance..."
                    value={form.note}
                    onChange={(e) => handleChange('note', e.target.value)}
                  />
                  <label className="inline-flex items-center gap-2 text-xs text-white/80 cursor-pointer bg-white/10 px-3 py-2 rounded-lg border border-white/20 hover:border-amber-400">
                    <Upload className="w-4 h-4 text-amber-300" />
                    <span>{form.cvFileName || 'Tải CV (PDF/Doc, tùy chọn)'}</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      className="hidden"
                      onChange={(e) => handleFile(e.target.files?.[0])}
                    />
                  </label>
                </div>
              </label>

              <div className="flex flex-wrap items-center gap-3 mt-6">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-amber-500 text-coffee-900 px-5 py-3 rounded-xl font-semibold hover:bg-amber-400 transition-all"
                >
                  Gửi hồ sơ
                  <Send className="w-4 h-4" />
                </button>
                {status === 'success' && (
                  <div className="flex items-center gap-2 text-emerald-200 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Đã nhận hồ sơ! HR sẽ liên hệ sớm.
                  </div>
                )}
                {status === 'error' && (
                  <p className="text-sm text-red-200">Vui lòng điền đủ Họ tên, Email và Số điện thoại.</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationSection;

