import { useEffect, useState } from "react";
import axios from "axios";

import "./MainContainer.css";
const MainContainer = ({ setCountry }) => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchAPI = async () => {
      const { data } = await axios.get("https://ipapi.co/json/");
      console.log(data);
      setCountry(data.country_name);

      const res = await axios.get(
        `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=e3fb13dbceaf43cea27141111222705&q=${data.country_name}&format=json&num_of_days=5&tp=24`
      );
      console.log(res);
      setData(res.data.data);
    };

    fetchAPI();
  }, []);

  return (
    <div className="container">
      <div className="temp-city">
        {console.log(data)}
        <div className="data">
          <span className="temp">
            {data?.current_condition[0].temp_C} C<sup>&#176;</sup>
          </span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="city">{data?.request[0].query}</span>
            <span>{data?.current_condition[0].observation_time}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img
              src={`${data?.current_condition[0].weatherIconUrl[0].value}`}
              alt="weather icon"
            />
            <span className="icon">
              {data?.current_condition[0].weatherDesc[0].value}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
