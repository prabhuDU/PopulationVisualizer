import React from "react";
import Header from "../header/header";
import PopulationVisualizer from "../populationVisualizer/populationVisualizer";
import "./homepage.css";
export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <PopulationVisualizer />
      </div>
    );
  }
}
