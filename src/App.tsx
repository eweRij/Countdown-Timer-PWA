import React from "react";
import { Clock } from "./components/Clock/Clock";

const App: React.FC = () => {
  const id = document.getElementById("installBtn");
  console.log(id);
  return (
    <div className="App">
      <Clock></Clock>
    </div>
  );
};

export default App;
