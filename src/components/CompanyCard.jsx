import React, { useState } from "react";

function CompanyCard(props) {
  const [currentprice, setcurrentprice] = useState(props.baseprice);

  // console.log(props.teamData["Team-A"]);

  function increase() {
    setcurrentprice((prev) => (prev += 500));
  }
  function decrease() {
    setcurrentprice((prev) => (prev -= 500));
  }

  // function handleComp(event) {
  //   console.log(event.target.value);
  // }
  return (
    <div className="card">
      <img className="card-img-top" src={props.imageSrc} alt="Card" />
      <div className="card-body d-flex flex-column">
        <h5 class="card-title text-center">{props.companyname}</h5>
        <div className="Baseprice">
          <p className="m-1">Base Price : </p>
          <p>{props.baseprice}</p>
        </div>
        {/* <button className="btn btn-primary my-2">Base Price</button> */}
        {/* <button className="btn btn-primary my-2">Current Price</button> */}
        <label htmlFor="currentprice">Current Price</label>
        <div className="d-flex mb-4">
          <input
            type="number"
            value={currentprice}
            className="text-black"
            id="currentprice"
            // defaultValue={currentprice}
          />
          <div className="mx-2">
            <button className="mx-1" onClick={increase}>
              +
            </button>
            <button className="mx-1" onClick={decrease}>
              -
            </button>
          </div>
        </div>

        <select
          className="form-select my-2"
          aria-label="select team"
          // onChange={handleComp()}
        >
          <option selected>Open this select menu</option>
          {Object.entries(props.teamData).map(([teamName, teamId]) => (
            <option key={teamId} value={teamId}>
              {teamName}
            </option>
          ))}
        </select>
        <button className="btn btn-primary my-2">Buy</button>
      </div>
    </div>
  );
}

export default CompanyCard;
