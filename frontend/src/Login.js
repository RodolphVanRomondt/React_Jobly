import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
// import "./AddItem.css";
// import SnackOrBoozeApi from "./Api";
import { useHistory } from "react-router-dom";

import JoblyApi from "./Api";


const Login = ({ add, addFunc }) => {

    const INITIAL_STATE = {
        username: "",
        password: ""
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const history = useHistory();

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        setFormData(INITIAL_STATE);

        async function addItem() {
            const data = { ...formData, id: formData.name.trim().replace(" ", "-").toLocaleLowerCase() };
            addFunc(formData);
            add();
        }
        addItem();
        history.push(`/`);
    }

    return (
        <div className="Login">
            <h1>Log In</h1>
            <Form className="Login-Form Form" onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Username</Label>
                    <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        placeholder="Username"
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        placeholder="Password"
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div>
    )
}


export default Login;