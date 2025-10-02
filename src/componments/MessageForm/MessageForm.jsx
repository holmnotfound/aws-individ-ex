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
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow max-w-md mx-auto">
      <input
        type="text"
        placeholder="Användarnamn"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Skriv ditt meddelande"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        onClick={handleNavigate}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Skapar..." : "Skicka meddelande"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default MessageForm;