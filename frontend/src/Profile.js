import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./Profile.css";
import { useHistory } from "react-router-dom";


const Profile = ({ user, add, addFunc }) => {

    const [formData, setFormData] = useState(user);
    const history = useHistory();

    if (!user) history.push("/");

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        setFormData(user);

        async function addItem() {
            const data = { ...formData, id: formData.name.trim().replace(" ", "-").toLocaleLowerCase() };
            addFunc(formData);
            add();
        }
        addItem();
        history.push(`/`);
    }

    return (
        <div className="Profile">
            <h1>Profile</h1>
            <Form className="Profile-Form Form" onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Username</Label>
                    <Input
                        id="itemName"
                        name="username"
                        value={formData.username}
                        placeholder={formData.username}
                        disabled
                    >
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>First Name</Label>
                    <Input
                        id="itemDesc"
                        name="firstName"
                        value={formData.firstName}
                        placeholder="Last Name"
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Last Name</Label>
                    <Input
                        id="itemRecipe"
                        name="lastName"
                        value={formData.lastName}
                        placeholder={formData.lastName}
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        id="itemServe"
                        name="email"
                        value={formData.email}
                        placeholder={formData.email}
                        onChange={handleChange}
                    >
                    </Input>
                </FormGroup>
                <Button>Save Changes</Button>
            </Form>
        </div>
    )
}


export default Profile;