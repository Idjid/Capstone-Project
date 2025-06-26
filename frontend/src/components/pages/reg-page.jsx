import React, { useState } from 'react';
import '../../styles/reg.css';
import axios from 'axios';

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
            const res = await axios.post('http://localhost:8080/api/auth/register', forms);
            //saving token (console.log)
            localStorage.setItem('token', res.data.token);
            

            console.log('Registration:', forms);
            alert(`Registration completed! Welcome to my website, ${forms.name}!`);
            setForms({ name: '', email: '', password: ''});
        } catch (err) {
            const msg = err.response?.data?.msg || err.message || 'Unknown error';
            console.log("Registration error:", msg);
            alert(`Error: ${msg}`);
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
