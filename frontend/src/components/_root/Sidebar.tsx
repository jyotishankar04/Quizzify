import { Link } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { Plus, TriangleAlert } from "lucide-react";
import { useLogoutUserAuthentication } from "../../lib/reactquery/react-query";
import toast from "react-hot-toast";
import LoadingModal from "../PupUploading";

const Sidebar = () => {
  const {
    mutateAsync: logoutUserAccount,
    isPending: logoutLoading,
    isSuccess,
  } = useLogoutUserAuthentication();

  if (logoutLoading) {
    return (
      <LoadingModal
        isVisible={logoutLoading}
        text="Logging out..."
        textContext="Please wait while we process your request"
      />
    );
  }
  if (isSuccess) {
    toast.success("Logout successful");
    window.location.reload();
  }

  const _sidebarLinks = [
    {
      title: "Dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      link: "/app",
    },
    {
      title: "Quizzes",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h13a2 2 0 012 2v10a2 2 0 01-2 2h-5m-1 4h2a1 1 0 001-1V7a1 1 0 00-1-1h-3a1 1 0 00-1 1v3a1 1 0 001 1h2a1 1 0 001-1v-3a1 1 0 00-1-1h-3a1 1 0 00-1 1v1h2a1 1 0 001 1h3a1 1 0 001-1v-1h-2a1 1 0 00-1-1h2a1 1 0 001 1v3a1 1 0 001 1h-3a1 1 0 00-1-1v-1h2a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1h-2a1 1 0 00-1 1h-3zM9 14h4V8h-4v6z",
      link: "/app/quizzes",
    },
    {
      title: "Profile",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      link: "/app/profile",
    },
    {
      title: "Settings",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
      link: "/app/settings",
    },
  ];

  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 z-30">
      {/* Logout Confirmation Modal */}
      <input type="checkbox" id="logoutDialog" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle" role="dialog">
        <div className="modal-box text-gray-900 flex flex-col items-center">
          <TriangleAlert className="text-yellow-500 w-16 h-16 bg-yellow-100 p-3 rounded-full" />
          <h3 className="font-bold text-lg">Warning!</h3>
          <p>Are you sure you want to logout?</p>
          <div className="modal-action w-full grid grid-cols-2">
            <button
              onClick={() => {
                document.getElementById("logoutDialog")?.click();
              }}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                await logoutUserAccount();
              }}
              disabled={logoutLoading}
              className={`btn btn-error text-white ${
                logoutLoading ? "loading" : ""
              }`}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">QuizApp</h1>
        </div>
        <nav className="flex-1 p-4">
          <Link
            to="/app/quizzes/create"
            className="w-full btn btn-outline mb-5 font-bold flex items-center justify-center"
          >
            Create Quiz
            <Plus className="ml-2" />
          </Link>

          <ul className="space-y-2">
            {_sidebarLinks.map((link, index) => (
              <SidebarItem
                key={index}
                icon={link.icon}
                title={link.title}
                link={link.link}
              />
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <label
            htmlFor="logoutDialog"
            className="flex items-center px-4 py-3 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors w-full"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
            Logout
          </label>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
