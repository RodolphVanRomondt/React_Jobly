import React from "react";
import Company from "./Company";
import "./Companies.css";
import {Link} from "react-router-dom";


const Companies = ({companies}) => {

    return (
        <div className="Companies">
            {companies.map(
                company =>
                    <Link to={`/companies/${company.handle}`} key={company.handle}>
                        <div className="Companies-Sub">
                            <div className="Companies-Text">
                                <h3>{company.name}</h3>
                                <p>{company.description}</p>
                            </div>
                            <div className="Companies-Img">
                                <img src={company.logoUrl} />
                            </div>
                        </div>
                    </Link>
            )}
        </div>
    )
}


export default Companies;