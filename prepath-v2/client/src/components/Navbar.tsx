import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-white text-white shadow-lg py-4 px-6 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold">PrepPath</div>
          {isAuthenticated && (
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <Link to="/study-plan" className="hover:underline">
                Study Plan
              </Link>
              <Link to="/settings" className="hover:underline">
                Settings
              </Link>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <Button
              variant="solid"
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          )}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {isOpen && isAuthenticated && (
        <div className="md:hidden bg-gray-700 w-full flex flex-col items-start p-4 space-y-2">
          <Link to="/" className="block px-4 py-2 hover:bg-gray-600 w-full">
            Home
          </Link>
          <Link
            to="/study-plan"
            className="block px-4 py-2 hover:bg-gray-600 w-full"
          >
            Study Plan
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2 hover:bg-gray-600 w-full"
          >
            Settings
          </Link>
          <Button
            variant="solid"
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full text-left"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </div>
      )}
    </nav>
  );
}