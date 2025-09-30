import { useEffect, useState } from "react";
import { fetchMessages } from "../../services/api.js";
import EditMessage from "../EditMessage/EditMessage.jsx";

function Messages({newMessage}) {
  const [messages, setMessages] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMessages()
      .then((data) => setMessages(data))
      .catch((err) => console.error("Fel vid hämtning av meddelanden:", err));
  }, []);

  console.log(fetchMessages())

  const handleUpdated = (updatedMessage) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === updatedMessage.id ? updatedMessage : message
      )
    );
    setEditingId(null); // Stäng redigera-läget
  };

  return (
    <div className="p-4 flex-col">
      <h2 className="text-xl font-semibold mb-2 text-center">Senaste Bulletin</h2>
      <ul className="space-y-2">
        {messages.map((msg) => (
            <li key={msg.id} className="p-2 border rounded shadow">
                {editingId === msg.id ? (
    <EditMessage
        message={msg}
        onCancel={() => setEditingId(null)}
        onUpdated={handleUpdated}
    />
    ) : (
    <>
        <p className="font-bold">{msg.username}</p>
        <p>{msg.text}</p>
        <p className="text-sm text-gray-500">{msg.createdAt}</p>
        <button
        onClick={() => setEditingId(msg.id)}
        className="text-blue-600 hover:underline text-sm mt-2"
        >
        Redigera
        </button>
    </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Messages;
