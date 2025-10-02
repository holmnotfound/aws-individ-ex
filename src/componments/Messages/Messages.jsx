import { useEffect, useState } from "react";
import { fetchMessages, fetchUsername } from "../../services/api.js";
import SearchUser from "../SearchUser/SearchUser.jsx";
import EditMessage from "../EditMessage/EditMessage.jsx";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

function Messages({ newMessage }) {
  const [messages, setMessages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [sortOldestFirst, setSortOldestFirst] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMessagesByUsername = async (username) => {
    setLoading(true);
    setError(null);

    try {
      const data = username
        ? await fetchUsername(username)
        : await fetchMessages();
      setMessages(data);
    } catch (err) {
      setError(err.message || "Ett fel uppstod.");
    } finally {
      setLoading(false);
    }
  };

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
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  console.log(fetchMessagesByUsername);

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setSortOldestFirst(!sortOldestFirst)}
          className="cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
        >
          Sortera {sortOldestFirst ? "nyast först" : "äldst först"}
        </button>
      </div>
      <SearchUser onSearch={fetchMessagesByUsername} />
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
                    className="cursor-pointer text-blue-600 hover:underline text-sm mt-2"
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
