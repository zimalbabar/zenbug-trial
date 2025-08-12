import React, { useState } from "react";
import FloatingButton from "./components/FloatingButton";
import './styles/widget.css';


import FeedbackModal from "./components/FeedbackModal";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FloatingButton onClick={() => setOpen(true)} />
      {open && <FeedbackModal onClose={() => setOpen(false)} />}
    </>
  );
}

export default App;
