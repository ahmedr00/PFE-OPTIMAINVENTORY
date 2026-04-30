import { ClipboardList, Home, QrCode, User } from "lucide-react";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const MobileLayout = () => {
  const navItems = [
    {
      path: "/mobile",
      icon: <Home className="w-6 h-6" />,
      label: "Accueil",
      exact: true,
    },
    {
      path: "/mobile/tasks",
      icon: <ClipboardList className="w-6 h-6" />,
      label: "Tâches",
      exact: false,
    },
    {
      path: "/mobile/scanner",
      icon: <QrCode className="w-6 h-6" />,
      label: "Scanner",
      exact: false,
    },
    {
      path: "/mobile/profile",
      icon: <User className="w-6 h-6" />,
      label: "Profil",
      exact: false,
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50 max-w-md mx-auto border-x border-slate-200">
      {/* Status Bar - iOS Style */}
      <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between text-xs">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            <div className="w-1 h-3 bg-white rounded-sm"></div>
            <div className="w-1 h-3 bg-white rounded-sm"></div>
            <div className="w-1 h-3 bg-white/50 rounded-sm"></div>
            <div className="w-1 h-3 bg-white/50 rounded-sm"></div>
          </div>
          <span className="ml-1">100%</span>
        </div>
      </div>

      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
            <ClipboardList className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Optima Inventory</h1>
            <p className="text-xs text-slate-500">Application Terrain</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation - iOS/Android Style */}
      <nav className="bg-white border-t border-slate-200 px-2 py-1 shadow-lg">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${
                  isActive ? "text-emerald-500" : "text-slate-400"
                }`
              }
            >
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MobileLayout;
