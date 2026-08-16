import Panel from '../../Components/dashboard/Panel';

export default function SuperAdminSettings() {
  return (
    <div className="space-y-4">
      <p className="text-[13.5px] text-gray-500 max-w-xl">Platform-wide settings for the Inzozi Admin portal.</p>
      <Panel>
        <p className="text-[13px] text-gray-500">
          Nothing configurable here yet — settings like notification preferences and platform defaults will land
          here once they&apos;re defined.
        </p>
      </Panel>
    </div>
  );
}
