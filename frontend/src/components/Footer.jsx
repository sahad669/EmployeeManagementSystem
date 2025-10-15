import React from "react";
import { Github, Linkedin } from "lucide-react";
import { useSelector } from "react-redux";

const Footer = () => {
  const { darkMode } = useSelector((state) => state.theme);
  return (
    <footer
      className={`w-full border-t py-5  sticky bottom-0 z-40 ${
        darkMode
          ? "bg-gradient-to-r from-[#0A2540] via-[#274472] to-[#198FFF] border-[#198FFF]/30"
          : "bg-gradient-to-r from-[#E3EDF7] via-[#F6F9FC] to-[#A5CDF2] border-[#5B99ED]/20"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center px-6 gap-4">
        <div
          className={`flex space-x-1 ${
            darkMode ? "text-white" : "text-[#21314A]"
          }`}
        >
          <a
            href="https://github.com/sahad669"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#82E0FA] transition-colors"
            aria-label="GitHub"
          >
            <Github size={28} />
          </a>
          <a
            href="https://linkedin.com/in/sahadpottachiramajeed93"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#82E0FA] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={28} />
          </a>
        </div>

        <p
          className={`${
            darkMode ? "text-white" : "text-[#21314A]"
          } text-sm text-center md:text-right select-none`}
        >
          © {new Date().getFullYear()} Sahad Pottachira EMS. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
