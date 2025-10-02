import NavBar from "../componments/NavBar/NavBar";
import Messages from "../componments/Messages/Messages.jsx";
import { useState} from "react";
import CreateMessageBtn from "../componments/CreateMessageBtn/CreateMessageBtn.jsx";
import FilterBtn from "../componments/FilterBtn/FilterBtn.jsx";



function LandingPage() {
    const [messages, setMessages] = useState([]);


  return (
    <section className="min-h-screen flex flex-col items-center bg-gray-100">
      <NavBar />
      <div>
        <CreateMessageBtn />
      </div>
      <div className="w-full max-w-4xl mt-6 px-4">
        <Messages messages={messages} />
      </div>
    </section>
  );
}

export default LandingPage;