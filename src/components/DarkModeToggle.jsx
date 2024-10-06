// Import React, which is necessary for creating React components
import React from "react";

// Import SVG icons as React components
// We're using the sun icon for light mode and the moon (cloudy) icon for dark mode
import { ReactComponent as SunIcon } from "../assets/Icons/sun.svg";
import { ReactComponent as MoonIcon } from "../assets/Icons/cloudy.svg";

// Define the DarkModeToggle functional component
// It takes two props:
// - darkMode: a boolean indicating whether dark mode is currently active
// - onToggle: a function to call when the toggle is clicked
function DarkModeToggle({ darkMode, onToggle }) {
  return (
    // The outer button element that will act as our toggle
    // We're using Tailwind CSS classes for styling
    <button
      // When the button is clicked, it will call the onToggle function
      onClick={onToggle}
      // The className is conditionally set based on the darkMode state
      // It's always a rounded button (rounded-full) with padding (p-2)
      // The background color changes based on the mode:
      // - Dark mode: bg-gray-800 (a dark gray)
      // - Light mode: bg-yellow-400 (a bright yellow)
      className={`p-2 rounded-full ${
        darkMode ? "bg-gray-800" : "bg-yellow-400"
      }`}
      // Adding an aria-label for accessibility
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* We use a ternary operator to conditionally render either the moon or sun icon */}
      {darkMode ? (
        // If darkMode is true, we show the moon icon
        // The icon is white (text-white) and has a width and height of 6 units (w-6 h-6)
        <MoonIcon className="w-6 h-6 text-white" />
      ) : (
        // If darkMode is false, we show the sun icon
        // It has the same styling as the moon icon
        <SunIcon className="w-6 h-6 text-white" />
      )}
    </button>
  );
}

// Export the component so it can be imported and used in other parts of the app
export default DarkModeToggle;
