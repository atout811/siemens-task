import "./CitiesList.css";
import { countries } from "../../assets/countries-cities";

export default function CitiesList({ country }) {
  return (
    <div className="cities-list">
      {countries[country].map((city) => (
        <div>{city}</div>
      ))}
      Heyyoo
    </div>
  );
}
