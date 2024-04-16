import React, { useEffect, useState } from "react";
import axios from "axios";
import CompanyCard from "../components/CompanyCard";
import image from "../assets/mahindra.png";

function Company(props) {
  const [companyData, setCompanyData] = useState(null);
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/company/getAllCompany"
        );
        const companydetails = response.data;
        const firstCompany = companydetails.data[0];
        console.log(firstCompany);
        setCompanyData((prev) => (prev = firstCompany));
        console.log(companyData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchTeam = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/teams/team/getAllTeams"
        );
        const teamdetails = response.data.data;
        // const firstCompany = teamdetails.data;
        const teamPairs = Object.fromEntries(
          teamdetails.map((key) => [key.name, key._id])
        );
        console.log(teamPairs);

        // console.log(teamdetails);
        setTeamData((prev) => (prev = teamPairs));
        // console.log(companyData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchTeam();
  }, []);

  return (
    <div className=" container d-flex justify-content-center">
      {companyData ? (
        <div className="row">
          <CompanyCard
            imageSrc={image}
            companyname={companyData.name}
            baseprice={companyData.marketCapital}
            teamData={teamData}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Company;
