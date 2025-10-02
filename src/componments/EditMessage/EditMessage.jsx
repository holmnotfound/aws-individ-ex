import { useState } from "react";
import { updateMessage } from "../../services/api";
import { useNavigate } from "react-router-dom";

function EditMessage({ message, onCancel, onUpdated}){
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
        setError(null)
        console.log("Försöker uppdatera:", message.id, text);


        try{
            const response = await updateMessage(message.id, text);
            const updatedItem = response.updatedItem;

            const updated = {
                id: updatedItem.sk,
                username: updatedItem.username,
                text: updatedItem.text,
                createdAt: updatedItem.createdAt,
            };
            onUpdated(updated);
            console.log(updated)
        }catch(error){
            setError("Kunde inte uppdatera meddelandet, kontrollera att det finns.");
        }finally {
            setLoading(false)
        }
    };

    return(
        <form onSubmit={handleUpdate} className="space-y-2 p-4 border rounded shadow">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <div className="flex gap-2">
        <button
          type="submit"
          onClick={handleNavigate}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          {loading ? "Sparar..." : "Spara ändringar"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer"
        >
          Avbryt
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
    )
}

export default EditMessage;