import React, {useState, useEffect} from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import {useHistory} from "react-router-dom";
import Job from "./Job";
import JoblyApi from "./Api";

const JobList = ({user}) => {

    const INITIAL_STATE = {
        searchBar: ""
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [jobs, setJobs] = useState([]);

    const history = useHistory();

    if (!user) history.push("/");

    async function getJobs(name) {
        const jobs = await JoblyApi.getAllJobs(name);
        setJobs(jobs);
    }

    useEffect(() => {
        getJobs();
    }, []);

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
        getJobs(formData.searchBar);
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