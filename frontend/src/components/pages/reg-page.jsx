import React, { useState } from 'react';
import './reg.css';

function Register() {
    //userBox
    const [forms, setForms] = useState({
        name: '',
        email: '',
        password: '',
    });

    //Allows to change labels
    const changeHandler = (event) => {
        const { name, value } = event.target;
        setForms(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    //Proceed to send labels
    const submitHandler = async (event) => {
        event.preventDefault();
        
        try {
            const res = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(forms),
            });

            const data = await res.json();

            if(!res.ok) {
                throw new Error(data.msg || "Failed registration");
            }

            console.log('Registration:', forms);
            alert(`Registration completed! Welcome to ym website, ${forms.name}!`);
            setForms({ name: '', email: '', password: ''});
        } catch (err) {
            console.log("Registration error:", err.message);
            alert(`Error: ${err.message}`);
        }

        
    };

    return (
        <div className='container'>
            <h2>Registration</h2>
            <form className="form" onSubmit={submitHandler}>
                <label htmlFor='name'>User name</label>
                <input type="text" id="name" name="name" value={forms.name} onChange={changeHandler} required placeholder="Name" />

                <label htmlFor='email'>Email</label>
                <input type="email" id="email" name="email" value={forms.email} onChange={changeHandler} required placeholder="Example@gmail.com" />

                <label htmlFor='password'>Password</label>
                <input type="password" id="password" name="password" value={forms.password} onChange={changeHandler} required placeholder="Registration"></input>

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
