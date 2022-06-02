import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Dashboard.css";
import { useParams } from "react-router-dom";
import { Table, Card } from "antd";
import {
  select,
  line,
  curveCardinal,
  scaleLinear,
  axisBottom,
  axisLeft,
} from "d3";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Max Temp",
    dataIndex: "maxtempC",
    key: "maxtempC",
  },
  {
    title: "Min Temp",
    dataIndex: "mintempC",
    key: "mintempC",
  },
  {
    title: "UV Index",
    dataIndex: "uvIndex",
    key: "uvIndex",
  },
];

export default function Dashboard() {
  let { country, cityName } = useParams();
  const [data, setData] = useState();
  const xScale = scaleLinear().domain([0, 12]).range([0, 500]);
  const yScale = scaleLinear().domain([0, 60]).range([300, 0]);
  const xAxis = axisBottom(xScale);
  const yAxis = axisLeft(yScale);

  const svgRef = useRef();
  useEffect(() => {
    const fetchAPI = async () => {
      console.log(country, cityName);

      const res = await axios.get(
        `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=e3fb13dbceaf43cea27141111222705&q=${cityName},${country}&date=2021&format=json&tp=24`
      );
      setData(res.data.data);
    };

    fetchAPI();
  }, []);

  useEffect(() => {
    const svg = select(svgRef.current);
    const myLine = line()
      .x((value, index) => xScale(index))
      .y((value) => yScale(value.absMaxTemp))
      .curve(curveCardinal)
      .defined((value) => value.absMaxTemp);
    svg.select(".x-axis").style("transform", "translateY(300px)").call(xAxis);
    svg.select(".y-axis").call(yAxis);
    svg
      .selectAll(".line")
      .data(data ? [data?.ClimateAverages[0]?.month] : [])
      .join("path")
      .attr("class", "line")
      .attr("d", (value) => myLine(value))
      .attr("fill", "none")
      .attr("stroke", "blue")
      .on("mouseover", function (d) {
        console.log(d);
      });
    svg
      .append("text")
      .attr("transform", "translate(" + 500 / 2 + " ," + (300 + 40) + ")")
      .style("text-anchor", "middle")
      .text("Month");
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -50)
      .attr("x", -120)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Value");
  }, [data]);

  return (
    <div className="dashboard">
      {console.log(data)}
      <h1>{`${cityName} Weather`}</h1>
      <Card
        title="Today Weather Summary"
        style={{
          width: "80%",
        }}
        bodyStyle={{ display: "flex", justifyContent: "center" }}
      >
        <div className="city-data">
          <div className="text-style">
            <div>
              <b>Temperature</b>: {data?.current_condition[0]?.temp_C} C
              <sup>&#176;</sup>
            </div>
            <div>
              <b> Feels Like</b>: {data?.current_condition[0]?.FeelsLikeC} C
              <sup>&#176;</sup>
            </div>
          </div>
          <div className="text-style">
            <div>
              <b> Humidity</b>: {data?.current_condition[0]?.humidity}
            </div>
            <div>
              <b> Cloud cover</b>: {data?.current_condition[0]?.cloudcover}
            </div>
          </div>
          <div>
            <b> Weather Descriptions</b>:{" "}
            {data?.current_condition[0]?.weatherDesc[0].value}
          </div>
        </div>
      </Card>
      <h3>Comming Days Degrees</h3>
      <Table
        style={{ width: "80%" }}
        columns={columns}
        dataSource={data?.weather}
      />

      <Card
        title="Last 12 Months Degrees"
        style={{
          width: "80%",
          marginBottom: "50px",
        }}
        bodyStyle={{
          display: "flex",
          justifyContent: "center",
          margin: "30px",
        }}
      >
        <svg
          ref={svgRef}
          style={{ overflow: "visible" }}
          width="50%"
          height="300px"
        >
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </Card>
    </div>
  );
}
