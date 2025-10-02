import { useState } from "react";
import { postMessage } from "../../services/api";
import { useNavigate } from "react-router-dom";

function MessageForm({ onMessageCreated }) {
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = () => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newMessage = await postMessage(username, text);
      onMessageCreated(newMessage);
      setUsername("");
      setText("");
    } catch (err) {
      console.error(err);
      setError("Något gick fel vid skapandet av meddelandet.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border-1 border-blue-400 rounded shadow max-w-md mx-auto mt-5"
      style={{
        boxShadow:
          "0 4px 6px -1px rgba(59, 130, 246, 0.5), 0 2px 4px -1px rgba(59, 130, 246, 0.06)",
      }}
    >
      <input
        type="text"
        placeholder="Användarnamn"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full p-2 border border-blue-400 rounded"
      />
      <textarea
        placeholder="Skriv ditt meddelande"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        className="w-full p-2 border border-blue-400 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        onClick={handleNavigate}
        className="cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        {loading ? "Skapar..." : "Skicka meddelande"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default MessageForm;
