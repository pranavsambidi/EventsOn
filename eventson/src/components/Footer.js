import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-auto">
      <p className="mb-0">
        &copy; {new Date().getFullYear()} University Print & Events Management | All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer;
