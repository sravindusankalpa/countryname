import { useEffect, useState } from "react";
import { Menu, Dropdown, Avatar, Button } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    window.location.href = '/'; // Redirect to login
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <a href="/profile">Profile</a>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <header
      className={`mx-auto max-w-7xl mt-10 bg-[#D8E4D3] shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Logo */}
      <h1 className="text-2xl font-bold text-black">Logo</h1>

      {/* Nav Links */}
      <nav className="hidden sm:flex items-center space-x-8 flex-1 justify-center">
        <a href="/" className="hover:underline transition text-black">Home</a>
        <a href="#about" className="hover:underline transition text-black">About Us</a>
        <a href="#contact" className="hover:underline transition text-black">Contact Us</a>
      </nav>

      {/* Right Side */}
      {token ? (
        <Dropdown overlay={menu} placement="bottomRight">
          <div className="flex items-center space-x-2 cursor-pointer">
            <Avatar icon={<UserOutlined />} />
            <span className="text-black font-medium">My Account</span>
            <DownOutlined />
          </div>
        </Dropdown>
      ) : (
        <a
          href="/login"
          className="bg-[#347928] text-white hover:bg-[#347928]/80 hover:text-white font-semibold px-6 py-2 rounded transition"
        >
          Login
        </a>
      )}
    </header>
  );
}