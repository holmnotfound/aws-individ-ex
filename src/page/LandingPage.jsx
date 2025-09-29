import NavBar from "../componments/NavBar/NavBar";
import Messages from "../componments/Messages/Messages.jsx";

function LandingPage() {
  return (
    <section className="min-h-screen flex flex-col items-center bg-gray-100">
      <NavBar />
      <div className="w-full max-w-3xl mt-6 px-4">
        <Messages />
      </div>
    </section>
  );
}

export default LandingPage;