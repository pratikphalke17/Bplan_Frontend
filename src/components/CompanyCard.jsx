import React, { useState, useEffect } from "react";

function CompanyCard(props) {
  const [currentprice, setcurrentprice] = useState(props.baseprice);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [sold, setSold] = useState(false);

  useEffect(() => {
    // Update currentprice whenever baseprice changes
    setcurrentprice(props.baseprice);
  }, [props.baseprice]);

  function increase() {
    setcurrentprice((prev) => prev + 5000000);
  }

  function decrease() {
    setcurrentprice((prev) => prev - 5000000);
  }

  const handleBuyClick = () => {
    // Call the handleBuy function passed from props
    props.onBuy(props.companyId, selectedTeamId, currentprice);
    setSold(true)
  };

  const handleTeamSelect = (event) => {
    console.log(event.target.value);
    setSelectedTeamId(event.target.value);
  };

  return (
    <div className="card mt-5 px-3">
      <img
        className="card-img-top mx-auto"
        src={props.imageSrc}
        alt="Card"
        style={{ maxHeight: "200px", maxWidth: "200px" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-center">{props.companyname}</h5>
        <div className="Baseprice">
          <p className="m-1">Base Price : </p>
          <p>{props.baseprice}</p>
        </div>
        <label htmlFor="currentprice">Current Price</label>
        <div className="d-flex mb-3">
          <input
            type="number"
            value={currentprice}
            className="text-black"
            id="currentprice"
            readOnly // Make the input read-only to prevent manual input
          />
          <div className="mx-2">
            <button className="mx-3" onClick={increase}>
              +
            </button>
            <button onClick={decrease}>--</button>
          </div>
        </div>
        {sold ? (
          <div className="text-center text-success mb-3">Sold</div>
        ) : (
          <div className="d-flex flex-column">
            <select
              className="form-select my-2"
              aria-label="select team"
              onChange={handleTeamSelect}
            >
              <option selected disabled>
                Select a team
              </option>
              {Object.entries(props.teamData).map(([teamName, teamId]) => (
                <option key={teamId} value={teamId}>
                  {teamName}
                </option>
              ))}
            </select>
            <button
              className={"btn btn-primary my-2" + (sold ? " disabled" : "")}
              onClick={handleBuyClick}
              disabled={!selectedTeamId}
            >
              {sold ? <h1>Sold</h1> : "Buy"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyCard;




