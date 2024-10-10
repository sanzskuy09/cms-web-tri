import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// import { ToastContainer } from "react-toastify";
// import { BeakerIcon } from "@heroicons/react/24/solid";

// import { useSelector, useDispatch } from "react-redux";
// import { decrement, increment } from "@/redux/action/counter";

import AppLayout from "@/AppLayout";

function App() {
  // const count = useSelector((state) => state.counter.value);
  // const dispatch = useDispatch();

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const showModal = () => {
  //   setIsModalOpen((value) => !value);
  // };

  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
