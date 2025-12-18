import React from 'react';
import { Briefcase, MapPin, Sparkles, Timer, ArrowRight, ShieldCheck, Users, Coffee, Share2 } from 'lucide-react';
import { Job } from '../../types';

interface CareersProps {
  onApplyClick: (role?: string) => void;
  jobs: Job[];
  onShare: (job: Job) => void;
}

const benefits = [
  { icon: Sparkles, title: 'Đào tạo bài bản', desc: 'Onboarding 07 ngày + lộ trình nâng bậc barista.' },
  { icon: ShieldCheck, title: 'Chế độ rõ ràng', desc: 'BHXH đầy đủ, khám sức khỏe định kỳ, phụ cấp ca đêm.' },
  { icon: Users, title: 'Môi trường trẻ', desc: 'Team 9x-2k, cởi mở, kèm cặp tận tình.' },
  { icon: Coffee, title: 'Quyền lợi F&B', desc: 'Uống thử menu, giảm 30% cho gia đình & bạn bè.' },
];

const Careers: React.FC<CareersProps> = ({ onApplyClick, jobs, onShare }) => {
  return (
    <section id="careers" className="py-24 bg-coffee-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-10 mb-12 items-start">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
              <Briefcase className="w-4 h-4" />
              Tuyển dụng
            </span>
            <h2 className="text-4xl font-serif font-bold text-coffee-900">Gia nhập đội ngũ GERRY COFFEE</h2>
            <p className="text-lg text-coffee-700 leading-relaxed">
              Chúng tôi tìm kiếm những người yêu cà phê, thích phục vụ và muốn phát triển cùng thương hiệu. 
              Lộ trình thăng tiến rõ ràng, đào tạo thực chiến và quyền lợi cạnh tranh.
            </p>
          </div>
          <div className="bg-white shadow-xl rounded-2xl border border-amber-100 p-6 w-full lg:w-96 space-y-3">
            <div className="flex items-center gap-3">
              <Timer className="w-10 h-10 text-amber-600" />
              <div>
                <p className="text-sm uppercase tracking-widest text-amber-700 font-semibold">Ứng tuyển nhanh</p>
                <p className="text-coffee-900 font-bold text-xl">Phản hồi trong 24h</p>
              </div>
            </div>
            <p className="text-coffee-600 text-sm">
              Gửi CV hoặc điền form ứng tuyển để được liên hệ phỏng vấn. Ưu tiên hồ sơ nộp sớm.
            </p>
            <button
              onClick={() => onApplyClick()}
              className="w-full inline-flex items-center justify-center gap-2 bg-amber-600 text-white py-3 rounded-xl font-semibold hover:bg-amber-700 transition-all"
            >
              Đi tới form ứng tuyển
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {jobs.filter(j => j.isActive).map((job) => (
            <div key={job.id} className="bg-white rounded-2xl shadow-lg border border-coffee-100 p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-amber-600 font-semibold mb-2">Vị trí</p>
                  <h3 className="text-2xl font-serif font-bold text-coffee-900">{job.title}</h3>
                </div>
                <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold border border-amber-100">
                  {job.salary}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-coffee-600">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>{job.location}</span>
              </div>
              <p className="text-sm text-coffee-700">{job.description}</p>
              <div className="flex items-center gap-2 text-sm text-coffee-600">
                <Timer className="w-4 h-4 text-amber-600" />
                <span>{job.type}</span>
              </div>
              <ul className="space-y-2 text-coffee-700 text-sm">
                {job.requirements.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-2 rounded-full bg-amber-500"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {job.benefits.map(b => (
                  <span key={b} className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs border border-amber-100">{b}</span>
                ))}
              </div>
              <button
                onClick={() => onApplyClick(job.title)}
                className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-amber-200 text-amber-700 font-semibold hover:bg-amber-50 transition-all"
              >
                Ứng tuyển ngay
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onShare(job)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-coffee-100 text-coffee-700 font-semibold hover:bg-coffee-50 transition-all"
              >
                <Share2 className="w-4 h-4" />
                Chia sẻ với bạn bè
              </button>
            </div>
          ))}
          {jobs.filter(j => j.isActive).length === 0 && (
            <p className="text-sm text-gray-500">Hiện chưa có vị trí nào đang tuyển.</p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-coffee-100 p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="p-5 rounded-xl bg-amber-50 border border-amber-100">
                <div className="w-10 h-10 rounded-lg bg-white shadow flex items-center justify-center mb-4 text-amber-700">
                  <benefit.icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-coffee-900 mb-2">{benefit.title}</h4>
                <p className="text-sm text-coffee-700 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Careers;

