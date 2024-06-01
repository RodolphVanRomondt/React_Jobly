import React, {useState} from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import Job from "./Job";

const JobList = ({ jobs, filterJob }) => {

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
        // setFormData(INITIAL_STATE);
        filterJob(formData.searchBar);
    }

    return (
        <div className="Jobs">
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
            {jobs.map(
                job => <Job job={job} key={job.id} />
            )}
        </div>
    )
}

export default JobList;