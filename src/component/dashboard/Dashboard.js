import { useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import { useParams } from "react-router-dom";
import { Card } from "antd";
const { Meta } = Card;

export default function Dashboard() {
  let { country, cityName } = useParams();
  useEffect(() => {
    const fetchAPI = async () => {
      console.log(country, cityName);

      const { data } = await axios.get(
        `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=e3fb13dbceaf43cea27141111222705&q=${cityName},${country}&date=2021&format=json&tp=24`
      );
      console.log(data);
    };

    fetchAPI();
  }, []);
  return (
    <div className="dashboard">
      <h1>Hello</h1>
      <div className="city-data"></div>
      <div className="city-graphs"></div>
    </div>
  );
}
