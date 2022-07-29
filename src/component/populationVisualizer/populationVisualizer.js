import React from "react";
import "./populationVisualizer.css";
import { getPopulation } from "../../services/population";
export default class PopulationVisualizer extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      filter:
        localStorage.getItem("filters") != null
          ? JSON.parse(localStorage.getItem("filters"))
          : {
              stateName: null,
              year: null,
            },
    };
  }

  getPopulationData = async () => {
    var res = await getPopulation(null);
    this.setState({
      data: res.data.data,
    });
  };

  applyFilter = (filterType) => {
    var filterValue = document.getElementById(filterType).value;
    this.setState(
      () => {
        var oldStates = { ...this.state };
        oldStates.filter[filterType] = filterValue;
        return oldStates;
      },
      () => localStorage.setItem("filters", JSON.stringify(this.state.filter))
    );
  };

  handleStateChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    this.setState(
      (prevState) => {
        var curr = { ...prevState };
        curr.filter[name] = value;
        return curr;
      },
      () => localStorage.setItem("filters", JSON.stringify(this.state.filter))
    );
  };

  checkFilters = (dataVal) => {
    if (
      this.state.filter.stateName &&
      dataVal["State"].toLowerCase() !=
        this.state.filter.stateName.toLowerCase()
    )
      return false;
    if (
      this.state.filter.year &&
      dataVal["Year"].toLowerCase() != this.state.filter.year.toLowerCase()
    )
      return false;
    return true;
  };

  render() {
    if (this.state.data == null) this.getPopulationData(null);
    return (
      <div>
        <h4 className="heading-main">Population Data</h4>
        <div className="filter-container">
          <h5 className="filters-text">Filters</h5>
          <div className="main-containers">
            <div class="input-group mb-3 p-5 ">
              <div className="search-container">
                <label style={{ paddingTop: 6 }}>State </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="State name"
                  aria-label="State name"
                  aria-describedby="button-addon2"
                  id="stateName"
                  name="stateName"
                  value={
                    this.state.filter && this.state.filter.stateName
                      ? this.state.filter.stateName
                      : ""
                  }
                  onChange={(e) => this.handleStateChange(e)}
                />
              </div>
            </div>

            <div class="input-group mb-3 p-5">
              <div className="search-container">
                <label style={{ paddingTop: 6 }}>Year</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Enter the year"
                  aria-label="year"
                  aria-describedby="button-addon2"
                  id="year"
                  name="year"
                  value={
                    this.state.filter && this.state.filter.year
                      ? this.state.filter.year
                      : ""
                  }
                  onChange={(e) => this.handleStateChange(e)}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID State</th>
                <th scope="col">ID Year</th>
                <th scope="col">Population</th>
                <th scope="col">Slug State</th>
                <th scope="col">State</th>
                <th scope="col">Year</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data ? (
                this.state.data
                  .filter((dataVal) => this.checkFilters(dataVal))
                  .map((val, index) => {
                    return (
                      <tr>
                        <th scope="row">{val["ID State"]}</th>
                        <td>{val["ID Year"]}</td>
                        <td>{val["Population"]}</td>
                        <td>{val["Slug State"]}</td>
                        <td>{val["State"]}</td>
                        <td>{val["Year"]}</td>
                      </tr>
                    );
                  })
              ) : (
                <th scope="row">No data</th>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
