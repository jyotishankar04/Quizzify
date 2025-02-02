import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  icon: string;
  title: string;
  link: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, title, link }) => {
  return (
    <li>
      <NavLink
        to={link}
        end
        className={({ isActive }) => {
          let className =
            "flex items-center px-4 py-3 text-gray-700 bg-gray-100 rounded-lg";
          if (isActive) {
            className += " bg-indigo-600 text-white";
          }
          return className;
        }}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={icon}
          />
        </svg>
        <span className="ml-3">{title}</span>
      </NavLink>
    </li>
  );
};

export default SidebarItem;
