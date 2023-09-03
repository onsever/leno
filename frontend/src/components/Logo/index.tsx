import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";

export default function Logo() {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <Link to={`${token ? "/feed" : "/"}`}>
      <h1 className="font-chewy text-primary text-4xl">Leno</h1>
    </Link>
  );
}
