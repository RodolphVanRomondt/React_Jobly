import React from "react";
import "./Job.css";

const Job = ({ job }) => {

    return (
        <div className="Job">
            <div className="Job-Text">
                <h3>{job.title}</h3>
                <p>{job.companyName}</p>
                <p>Salary: {job.salary ? job.salary : "NULL" }</p>
                <p>Equity: {job.equity ? job.equity : "NULL"}</p>
            </div>
            <button>Apply</button>
        </div>
    )
}


export default Job;