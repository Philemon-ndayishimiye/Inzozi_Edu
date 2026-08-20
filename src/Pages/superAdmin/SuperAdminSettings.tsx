import { useTranslation } from 'react-i18next';
import Panel from '../../Components/dashboard/Panel';

export default function SuperAdminSettings() {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <p className="text-[13.5px] text-gray-500 max-w-xl">{t('superAdminSettingsPage.intro')}</p>
      <Panel>
        <p className="text-[13px] text-gray-500">
          {t('superAdminSettingsPage.nothingYet')}
        </p>
      </Panel>
    </div>
  );
}
