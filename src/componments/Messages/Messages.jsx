import { useEffect, useState } from "react";
import { fetchMessages } from "../../services/api.js";

function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages()
      .then((data) => setMessages(data))
      .catch((err) => console.error("Fel vid hämtning av meddelanden:", err));
  }, []);

  console.log(fetchMessages())

  return (
    <div className="p-4 flex-col">
      <h2 className="text-xl font-semibold mb-2 text-center">Senaste Bulletin</h2>
      <ul className="space-y-2">
        {messages.map((msg) => (
          <li key={msg.id} className="p-2 border rounded shadow">
            <p className="font-bold">{msg.username}</p>
            <p>{msg.text}</p>
            <p className="text-sm text-gray-500">{msg.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Messages;
