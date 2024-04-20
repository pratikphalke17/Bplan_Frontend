import React, { useEffect, useState } from "react";
import axios from "axios";
import CompanyCard from "../components/CompanyCard";
import image from "../assets/mahindra.png";

function Company(props) {
  const [companyData, setCompanyData] = useState(null);
  const [teamData, setTeamData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/company/getAllCompany"
        );
        const companydetails = response.data.data;
        setCompanyData(companydetails);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    const fetchTeam = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/teams/team/getAllTeams"
        );
        const teamdetails = response.data.data;
        const teamPairs = Object.fromEntries(
          teamdetails.map((key) => [key.name, key._id])
        );
        setTeamData(teamPairs);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchData();
    fetchTeam();
  }, []);

  const handleNext = () => {
    if (currentIndex < companyData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleBuy = async (companyId, teamId, currentPrice) => {
    try {
      // Make an HTTP POST request to send data to the server
      const response = await axios.post("http://localhost:5000/company/sellCompany", {
        "teamId": teamId,  
        "companyId": companyId, 
        "priceSold": currentPrice,
      });
      console.log("Buy request successful:", response.data);
      alert(`Congratulations! Team bought the company for ${currentPrice}.`);
    } catch (error) {
      console.error("Error buying:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center ">
      {companyData ? (
        <div>
          <div className="row">
            <CompanyCard
              imageSrc={image}
              companyname={companyData[currentIndex].name}
              baseprice={companyData[currentIndex].marketCapital}
              teamData={teamData}
              onBuy={handleBuy} // Pass the handleBuy function as a prop
              companyId={companyData[currentIndex]._id} // Pass company ID as a prop
            />
          </div>
          <div className="my-3 d-flex">
            <button className='w-75 mr-3 btn-dark' onClick={handlePrevious} disabled={currentIndex === 0}>
              Previous
            </button>
            <button
              className='w-75 ml-3 btn-dark'
              onClick={handleNext}
              disabled={currentIndex === companyData.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default Company;