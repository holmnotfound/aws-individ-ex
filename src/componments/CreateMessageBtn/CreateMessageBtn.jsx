import { useNavigate } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

function CreateMessageBtn() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/create`);
  };

  return (
    <section className="create-btn__wrapper cursor-pointer">
      <button
        onClick={handleNavigate}
        className="cursor-pointer fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
        aria-label="Skapa meddelande"
      >
        <PencilSquareIcon className="h-6 w-6" />
      </button>
    </section>
  );
}

export default CreateMessageBtn;
