import React, { Component } from "react";
import { connect } from "react-redux";

import "../../assets/styles/ProfileFoodIndexItem.css";

class ProfileFoodIndexItem extends Component {
  constructor(props) {
    super(props);
  }
  handleDeleteEntry = event => {
    const entry = {
      id: this.props.id
    };
    event.preventDefault();
    fetch("http://localhost:3001/api/foodEntry", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry)
    }).then(response => {
      return response.json().then(json => {
        if (response.ok) {
          console.log("Deleted: " + json);
        } else {
          console.log("Failed to delete entry =[");
        }
      });
    });
  };

  render() {
    const {
      id,
      date,
      dietaryFiber,
      foodName,
      isKeto,
      netCarbs,
      servingSize,
      servingSizeGrams,
      totalCarbs
    } = this.props;
    let { isLoginSuccess, userId } = this.props;
    if (this.props.isLoginSuccess) {
      return (
        <div>
          <div className="food-idx-item">
            <p>{date}</p>
            <b>
              {foodName} &mdash; {isKeto}
            </b>
            <p>
              Serving size: {servingSize} ({servingSizeGrams} g)
            </p>
            <p>{totalCarbs} g Total Carbs</p>
            <p>&mdash; {dietaryFiber} g Dietary Fiber</p>
            <p>= {netCarbs} g Net Carbs</p>
          </div>
          <button
            className="food-idx-item-btn"
            type="submit"
            onClick={this.handleDeleteEntry}
          >
            Delete
          </button>
        </div>
      );
    } else {
      return (
        <div className="food-idx-item">
          <p>{date}</p>
          <b>
            {foodName} &mdash; {isKeto}
          </b>
          <p>
            Serving size: {servingSize} ({servingSizeGrams} g)
          </p>
          <p>{totalCarbs} g Total Carbs</p>
          <p>&mdash; {dietaryFiber} g Dietary Fiber</p>
          <p>= {netCarbs} g Net Carbs</p>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    isLoginSuccess: state.isLoginSuccess,
    userId: state.userId
  };
};

export default connect(mapStateToProps)(ProfileFoodIndexItem);