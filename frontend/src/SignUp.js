import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
// import "./AddItem.css";
// import SnackOrBoozeApi from "./Api";
import { useHistory } from "react-router-dom";

import JoblyApi from "./Api";


const SignUp = ({ add, addFunc }) => {

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
        <div className="SignUp">
            <h1>Sign Up</h1>
            <Form className="SignUp-Form Form" onSubmit={handleSubmit}>
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
                <FormGroup>
                    <Label>First Name</Label>
                    <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        placeholder="First Name"
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Last Name</Label>
                    <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        placeholder="Last Name"
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        id="email"
                        name="email"
                        value={formData.email}
                        placeholder="Email"
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div>
    )
}


export default SignUp;