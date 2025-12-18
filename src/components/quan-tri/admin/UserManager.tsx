
import React from 'react';
import { User, Language, BrandSettings } from '../../../types';
import { Shield, ShieldOff } from 'lucide-react';
import { TRANSLATIONS, getLoyaltyTier } from '../../../constants';

interface UserManagerProps {
  users: User[];
  onUpdateRole: (userId: string, newRole: 'admin' | 'customer') => void;
  language: Language;
  brandSettings: BrandSettings;
  onUpdateUser: (user: User) => void;
}

const UserManager: React.FC<UserManagerProps> = ({ users, onUpdateRole, language, brandSettings, onUpdateUser }) => {
  const t = TRANSLATIONS[language];
  const SUPER_ADMIN_EMAIL = 'nt40935@gmail.com';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-coffee-900">{t.admin_users.title}</h2>
        <div className="flex flex-col items-end gap-1 text-xs">
          <div className="text-sm text-coffee-500 bg-coffee-50 px-3 py-1 rounded-full">
            Total Users: {users.length}
          </div>
          <div className="text-coffee-500">
            <span className="font-semibold">Loyalty tiers:</span>{' '}
            {`Đồng ≥ ${brandSettings.loyaltyBronzeMin ?? 0}, Bạc ≥ ${brandSettings.loyaltySilverMin ?? 500}, Vàng ≥ ${brandSettings.loyaltyGoldMin ?? 850}, Kim Cương ≥ ${brandSettings.loyaltyDiamondMin ?? 1350}`}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left min-w-[900px]">
          <thead className="bg-coffee-50 text-coffee-900 font-semibold border-b border-gray-100">
            <tr>
              <th className="p-4">{t.admin_users.name}</th>
              <th className="p-4">{t.admin_users.email}</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Address</th>
              <th className="p-4">Points</th>
              <th className="p-4">Tier</th>
              <th className="p-4">{t.admin_users.role}</th>
              <th className="p-4 text-right">{t.admin_users.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(user => {
              const tier = getLoyaltyTier(user.loyaltyPoints, {
                loyaltyBronzeMin: brandSettings.loyaltyBronzeMin,
                loyaltySilverMin: brandSettings.loyaltySilverMin,
                loyaltyGoldMin: brandSettings.loyaltyGoldMin,
                loyaltyDiamondMin: brandSettings.loyaltyDiamondMin
              });

              return (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} alt="" className="w-10 h-10 rounded-full bg-gray-100" />
                    <span className="font-medium text-coffee-800">{user.name}</span>
                  </td>
                  <td className="p-4 text-coffee-600">
                    {user.email}
                  </td>
                  <td className="p-4 text-coffee-600">
                    {user.phone || '-'}
                  </td>
                  <td className="p-4 text-coffee-600">
                    {user.address || '-'}
                  </td>
                  <td className="p-4">
                    <input
                      type="number"
                      className="w-24 px-2 py-1 border border-gray-200 rounded text-sm"
                      value={user.loyaltyPoints ?? 0}
                      onChange={e =>
                        onUpdateUser({
                          ...user,
                          loyaltyPoints: Number(e.target.value) || 0
                        })
                      }
                    />
                  </td>
                  <td className="p-4 text-sm font-semibold text-coffee-800">
                    {language === 'vi' ? tier.nameVi : tier.nameEn}
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManager;

