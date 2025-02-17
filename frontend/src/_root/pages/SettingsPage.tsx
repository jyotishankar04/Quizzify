import { NavLink, Outlet } from "react-router-dom";

const SettingsPage = () => {
  const _settingsLinks = [
    {
      name: "General",
      path: "/app/settings/general",
    },
    {
      name: "Security",
      path: "/app/settings/security",
    },
    {
      name: "Billing",
      path: "/app/settings/billing",
    },
    {
      name: "Help & Support",
      path: "/app/settings/help",
    },
  ];
  return (
    <div
      className={`w-full h-full p-20 flex justify-start items-start text-gray-900`}
    >
      <div className="w-1/4 h-full rounded-l-lg bg-gray-100">
        <div className="p-4 ">
          <h1 className="text-2xl font-bold mb-4">Settings</h1>
          <ul className="space-y-2 flex  flex-col items-start">
            {_settingsLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `btn  btn-ghost
                ${isActive && "btn-active"} w-full flex justify-start  px-5`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-3/4 h-full bg-gray-200 rounded-r-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsPage;
