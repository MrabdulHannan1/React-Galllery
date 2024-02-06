import React from "react";
import Gallery from "./components/Gallery";
import { ThemeProvider } from "./context/ThemeContext.jsx";

import "./styles/App.css"; // Import your global styles

const App = () => {
  return (
    <ThemeProvider>
      <div className="app-container">
        <Gallery />
      </div>
    </ThemeProvider>
  );
};

export default App;
