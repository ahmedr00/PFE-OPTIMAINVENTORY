import {
  Bell,
  ClipboardList,
  FileText,
  House,
  LayoutDashboard,
  LogOut,
  Package,
  RefreshCw,
  Users,
  Warehouse,
} from "lucide-react";
import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "../components/Avatar";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { useAuthStore } from "../store/authStore";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const navItems = [
    {
      path: "/app",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Tableau de bord",
      exact: true,
    },
    {
      path: "/app/company",
      icon: <House className="w-5 h-5" />,
      label: "Entreprise",
    },
    {
      path: "/app/depots",
      icon: <Warehouse className="w-5 h-5" />,
      label: "Depots",
    },
    {
      path: "/app/sheets",
      icon: <ClipboardList className="w-5 h-5" />,
      label: "Fiches d'inventaire",
    },
    {
      path: "/app/sync",
      icon: <RefreshCw className="w-5 h-5" />,
      label: "Sync Sage 100",
    },
    {
      path: "/app/users",
      icon: <Users className="w-5 h-5" />,
      label: "Utilisateurs",
    },
    {
      path: "/app/reports",
      icon: <FileText className="w-5 h-5" />,
      label: "Rapports",
    },
  ];
  const { logout, user } = useAuthStore();
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };
  console.log("User in DashboardLayout:", user);

  return (
    <div className="w-full flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-emerald-400" />
            <div>
              <h1 className="text-xl font-bold">Optima Inventory</h1>
              <p className="text-xs text-slate-400">Back-Office</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-emerald-500 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-700">
          <div
            className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-slate-800  rounded-lg transition-colors"
            onClick={() => navigate("/app/profile")}
          >
            <Avatar>
              <AvatarFallback className="bg-emerald-500">
                {getInitials(user?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium">{user?.name || "Client Admin"}</p>
              <p className="text-xs text-slate-400 truncate w-full ">
                {user?.email || "admin@company.fr"}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full text-slate-300 border-slate-700 hover:bg-slate-800"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Gestion d'Inventaire
              </h2>
              <p className="text-sm text-slate-500">
                Système intégré avec Sage 100
              </p>
            </div>
            <div className="flex items-center gap--4">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                  3
                </Badge>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
