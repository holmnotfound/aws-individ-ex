import { useEffect, useState } from "react";
import { fetchMessages } from "../../services/api.js";
import EditMessage from "../EditMessage/EditMessage.jsx";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

function Messages({ newMessage }) {
  const [messages, setMessages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [sortOldestFirst, setSortOldestFirst] = useState(false); // ny state

  useEffect(() => {
    fetchMessages()
      .then((data) => setMessages(data))
      .catch((err) => console.error("Fel vid hämtning av meddelanden:", err));
  }, []);

  const handleUpdated = (updatedMessage) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === updatedMessage.id ? updatedMessage : message
      )
    );
    setEditingId(null);
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString("sv-SE", {
      dateStyle: "long",
      timeStyle: "short",
    });
  };

  const sortedMessages = [...messages].sort((a, b) => {
    if (sortOldestFirst) {
      return new Date(a.createdAt) - new Date(b.createdAt); // äldst först
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt); // nyast först
    }
  });

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setSortOldestFirst(!sortOldestFirst)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sortera {sortOldestFirst ? "nyast först" : "äldst först"}
        </button>
      </div>

      <ul className="space-y-2 flex flex-wrap gap-4 justify-center">
        {sortedMessages.map((msg) => (
          <li
            key={msg.id}
            className="w-64 p-4 border border-sky-500 rounded shadow bg-white"
            style={{
              boxShadow:
                "0 4px 6px -1px rgba(59, 130, 246, 0.5), 0 2px 4px -1px rgba(59, 130, 246, 0.06)",
            }}
          >
            {editingId === msg.id ? (
              <EditMessage
                message={msg}
                onCancel={() => setEditingId(null)}
                onUpdated={handleUpdated}
              />
            ) : (
              <>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold">{msg.username}</p>
                  <button
                    onClick={() => setEditingId(msg.id)}
                    className="text-blue-600 hover:underline text-sm mt-2"
                    aria-label="Redigera meddelandet"
                  >
                    <PencilSquareIcon className="h-5 w-5 text-blue-600" />
                  </button>
                </div>
                <p>{msg.text}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(msg.createdAt)}
                </p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Messages;

/*import { useEffect, useState } from "react";
import { fetchMessages } from "../../services/api.js";
import EditMessage from "../EditMessage/EditMessage.jsx";
import { PencilSquareIcon } from '@heroicons/react/24/outline'

function Messages({newMessage}) {
  const [messages, setMessages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  

  useEffect(() => {
    fetchMessages()
      .then((data) => setMessages(data))
      .catch((err) => console.error("Fel vid hämtning av meddelanden:", err));
  }, []);


  const handleUpdated = (updatedMessage) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === updatedMessage.id ? updatedMessage : message
      )
    );
    setEditingId(null);
  };

  const formatDate = (isoString) => {
        return new Date(isoString).toLocaleString("sv-SE", {
            dateStyle: "long",
            timeStyle: "short",
        });
    };
  return (
    <div className="p-4">
      <ul className="space-y-2 flex flex-wrap gap-4 justify-center">
        {[...messages]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // sortera nyast först
    .map((msg) => (
            <li key={msg.id} className="w-64 p-4 border border-sky-500 rounded shadow bg-white" style={{ boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.5), 0 2px 4px -1px rgba(59, 130, 246, 0.06)' }}>
                {editingId === msg.id ? (
    <EditMessage
        message={msg}
        onCancel={() => setEditingId(null)}
        onUpdated={handleUpdated}
    />
    ) : (
    <>  
        <div className="flex items-center justify-between mb-2">
        <p className="font-bold">{msg.username}</p>
        <button
        onClick={() => setEditingId(msg.id)}
        className="text-blue-600 hover:underline text-sm mt-2"
        aria-label="Redigera meddelandet"
        >
        <PencilSquareIcon className="h-5 w-5 text-blue-600" />
        </button>
        </div>
        <p>{msg.text}</p>
        <p className="text-sm text-gray-500">{formatDate(msg.createdAt)}</p>
    </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Messages;*/
