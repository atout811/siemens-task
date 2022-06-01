import "./CitiesList.css";
import { countries } from "../../assets/countries-cities";
import { Link } from "react-router-dom";
import { Typography } from "antd";

const { Title } = Typography;

export default function CitiesList({ country }) {
  return (
    <>
      <div className="cities-list">
        <h2>Other Cities</h2>
        {countries[country]?.map((city) => (
          <div>
            <Title level={3}>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/dashboard/${country}/${city}`}
              >
                {city}
              </Link>
            </Title>
          </div>
        ))}
      </div>
    </>
  );
}
