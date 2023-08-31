import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/"}>
      <h1 className="font-chewy text-primary text-4xl">Leno</h1>
    </Link>
  );
}
