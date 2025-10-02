import { useState } from "react";

function SearchUser({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input.trim());
  };

  const handleReset = () => {
    setInput("");
    onSearch("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4 mt-10 px-2"
    >
      <input
        type="text"
        placeholder="Sök användare"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 border border-blue-400 rounded"
      />
      <div className="search-btn--wrapper">
        <button
          type="submit"
          className="cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
        >
          Sök
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="cursor-pointer text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Rensa
        </button>
      </div>
    </form>
  );
}

export default SearchUser;
