import React, { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi"; // Import React Icon

export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    showButton && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 p-3 bg-orange-500 text-white rounded-full shadow-lg hover:bg-secondary transition-all"
      >
        <FiArrowUp size={24} />
      </button>
    )
  );
}
