import NavBar from "../componments/NavBar/NavBar";
import MessageForm from "../componments/MessageForm/MessageForm.jsx";
import Footer from "../componments/Footer/index.jsx";
import { fetchMessages } from "../services/api.js";
import { useState, useEffect } from "react";

function CreatePostPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages().then((data) => setMessages(data));
  }, []);

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
      <h2 className="text-xl font-bold mt-10">Skriv ett nytt meddelande</h2>
      <MessageForm onMessageCreated={handleNewMessage} />
      <Footer/>
    </section>
  );
}

export default CreatePostPage;
