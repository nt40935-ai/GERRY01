
import React from 'react';
import { User, Language } from '../../types';
import { Shield, ShieldOff, User as UserIcon, AlertTriangle } from 'lucide-react';
import { TRANSLATIONS } from '../../constants';

interface UserManagerProps {
  users: User[];
  onUpdateRole: (userId: string, newRole: 'admin' | 'customer') => void;
  language: Language;
}

const UserManager: React.FC<UserManagerProps> = ({ users, onUpdateRole, language }) => {
  const t = TRANSLATIONS[language];
  const SUPER_ADMIN_EMAIL = 'nt40935@gmail.com';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-coffee-900">{t.admin_users.title}</h2>
        <div className="text-sm text-coffee-500 bg-coffee-50 px-3 py-1 rounded-full">
          Total Users: {users.length}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-coffee-50 text-coffee-900 font-semibold border-b border-gray-100">
            <tr>
              <th className="p-4">{t.admin_users.name}</th>
              <th className="p-4">{t.admin_users.email}</th>
              <th className="p-4">{t.admin_users.role}</th>
              <th className="p-4 text-right">{t.admin_users.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} alt="" className="w-10 h-10 rounded-full bg-gray-100" />
                  <span className="font-medium text-coffee-800">{user.name}</span>
                </td>
                <td className="p-4 text-coffee-600">
                  {user.email}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                      : 'bg-green-100 text-green-700 border border-green-200'
                  }`}>
                    {user.role === 'admin' ? t.admin_users.admin : t.admin_users.customer}
                  </span>
                </td>
                <td className="p-4 text-right">
                   {user.email === SUPER_ADMIN_EMAIL ? (
                     <span className="text-xs text-gray-400 italic flex items-center justify-end gap-1">
                       <Shield className="w-3 h-3" />
                       {t.admin_users.cannot_revoke_self}
                     </span>
                   ) : (
                      user.role === 'admin' ? (
                        <button 
                          onClick={() => onUpdateRole(user.id, 'customer')}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                        >
                          <ShieldOff className="w-4 h-4" />
                          {t.admin_users.revoke}
                        </button>
                      ) : (
                        <button 
                          onClick={() => onUpdateRole(user.id, 'admin')}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-coffee-900 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium"
                        >
                          <Shield className="w-4 h-4" />
                          {t.admin_users.make_admin}
                        </button>
                      )
                   )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManager;
