import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/`);
  };
  return (
    <section className="logo-wrapper" onClick={handleNavigate}>
      <p className="logo cursor-pointer text-black transition font-montserrat font-bold text-[25px]">
        BULLETIN.
      </p>
    </section>
  );
}

export default Logo;
