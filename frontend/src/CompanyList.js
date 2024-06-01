import React, { useState} from "react";
import "./Companies.css";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input, Button } from "reactstrap";
import CompanyCard from "./CompanyCard";


const CompanyList = ({ companies, filterCompany }) => {
    
    const INITIAL_STATE = {
        searchBar: ""
    };

    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(fData => ({
            ...fData,
            [name]: value.toLowerCase()
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        setFormData(INITIAL_STATE);

        async function addItem() {
            const data = { ...formData };
            filterCompany(formData.searchBar);
        }
        addItem();
    }

    return (
        <div className="Companies">
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Input
                        id="searchBar"
                        name="searchBar"
                        value={formData.searchBar}
                        placeholder="Enter Search Term"
                        onChange={handleChange}
                    >
                    </Input>
                    <Button>Submit</Button>
                </FormGroup>
            </Form>
            {companies.map(
                company =>
                    <Link to={`/companies/${company.handle}`} key={company.handle}>
                        <CompanyCard company={company} />
                    </Link>
            )}
        </div>
    )
}


export default CompanyList;