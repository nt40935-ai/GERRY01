import React from 'react';
import { JobApplication, Language } from '../../../types';
import { Download, Mail, Phone, Clock } from 'lucide-react';

interface ApplicationManagerProps {
  applications: JobApplication[];
  language: Language;
}

const ApplicationManager: React.FC<ApplicationManagerProps> = ({ applications, language: _language }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-coffee-900">Hồ sơ ứng tuyển</h3>
        <span className="text-sm text-gray-500">{applications.length} hồ sơ</span>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="text-sm text-coffee-600 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                {new Date(app.submittedAt).toLocaleString()}
              </p>
              <p className="text-lg font-semibold text-coffee-900">{app.name}</p>
              <p className="text-sm text-coffee-700">{app.position}</p>
              <div className="flex gap-3 text-sm text-coffee-700">
                <span className="inline-flex items-center gap-1"><Mail className="w-4 h-4 text-amber-600" />{app.email}</span>
                <span className="inline-flex items-center gap-1"><Phone className="w-4 h-4 text-amber-600" />{app.phone}</span>
              </div>
              {app.experience && <p className="text-sm text-coffee-700">Kinh nghiệm: {app.experience}</p>}
              {app.note && <p className="text-sm text-coffee-700">Ghi chú: {app.note}</p>}
            </div>
            <div className="flex items-center gap-3">
              {app.cvFileData && (
                <a
                  href={app.cvFileData}
                  download={app.cvFileName || 'cv.pdf'}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-200 text-amber-700 font-semibold hover:bg-amber-50"
                >
                  <Download className="w-4 h-4" />
                  Tải CV
                </a>
              )}
            </div>
          </div>
        ))}
        {applications.length === 0 && <p className="text-sm text-gray-500">Chưa có hồ sơ ứng tuyển.</p>}
      </div>
    </div>
  );
};

export default ApplicationManager;



