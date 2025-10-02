import { useState } from "react";
import { updateMessage } from "../../services/api";
import { useNavigate } from "react-router-dom";

function EditMessage({ message, onCancel, onUpdated }) {
  const [text, setText] = useState(message.text);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = () => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("Försöker uppdatera:", message.id, text);

    try {
      const response = await updateMessage(message.id, text);
      const updatedItem = response.updatedItem;

      const updated = {
        id: updatedItem.sk,
        username: updatedItem.username,
        text: updatedItem.text,
        createdAt: updatedItem.createdAt,
      };
      onUpdated(updated);
      console.log(updated);
    } catch (error) {
      setError("Kunde inte uppdatera meddelandet, kontrollera att det finns.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-2 p-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex justify-center w-full p-2 border border-blue-400 rounded"
        required
      />
      <div className="flex justify-center gap-2 mt-4">
        <button
          type="submit"
          onClick={handleNavigate}
          disabled={loading}
          className="cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-md font-medium rounded-md text-sm px-3 py-1.5 text-center"
        >
          {loading ? "Sparar..." : "Spara ändringar"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-md font-medium rounded-md text-sm px-3 py-1.5 text-center"
        >
          Avbryt
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default EditMessage;
