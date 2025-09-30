import NavBar from "../componments/NavBar/NavBar";
import MessageForm from "../componments/MessageForm/MessageForm.jsx";
import { fetchMessages } from "../services/api.js";
import { useState, useEffect } from "react";


function CreatePostPage() {
    const [messages, setMessages] = useState([]);

  // Hämta meddelanden från API vid start
  useEffect(() => {
    fetchMessages().then((data) => setMessages(data));
  }, []);

  // När nytt meddelande postas
  const handleNewMessage = (newMessage) => {
  console.log("Nytt meddelande från form:", newMessage);
  setMessages((prev) => {
    const updated = [newMessage, ...prev];
    console.log("Uppdaterad messages-array:", updated);
    return updated;
  });
};

  return (
    <section className="min-h-screen flex flex-col items-center bg-gray-100">
      <NavBar />
      <MessageForm onMessageCreated={handleNewMessage} />
    </section>
  );
}

export default CreatePostPage;