import React, { useState } from 'react';
import FCDatePicker from './Add_Form/FCDatePicker';

const myStyles = {
    logIn: {
        margin: '10px',
        width: '200px',
        height: '30px'
    },

    name: {
        height: '30px',
        width: '100px',
        margin: '10px',
    }

};
export default function FCLogIn(props) {
    
    // const [startDate, setStartDate] = useState(new Date());    //Log in
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [count, setCount] = useState(0);
     const [value/*, setValue*/] = useState();


    //Sing up
    // const NewFNameChange = (e) => {
    //     console.log(e.target.value);

    // };
    // const NewLNameChange = (e) => {
    //     console.log(e.target.value);

    // };
    // const NewEmailChange = (e) => {
    //     console.log(e.target.value);

    // };
    // const NewLPasswordChange = (e) => {
    //     console.log(e.target.value);

    // };
    // const NewLBDateChange = (e) => {
    //     console.log(e.target.value);

    // };
    // const NewDateChange = (date) => {
    //     setStartDate(date);
    //     console.log(startDate);
    // };
    // const NewGenderChange = (e) => {
    //     console.log(e.target.value);
    // };

    return (
        <div>
            <form 
            //onSubmit={() => props.LogIn(this.state.email, this.state.password)}
            >
                <fieldset>
                    <legend>Log In</legend>
                    <input type="text" name="email" id="email" placeholder="Email"
                         value={value} style={myStyles.logIn} />
                    <input type="password" name="password" id="password" placeholder="Password"
                        style={myStyles.logIn}  value={value} /><br />
                    <input type="submit" value="Log In" />
                </fieldset>
            </form>
            <br />
            <form >
                <fieldset>
                    <legend>Sign up!</legend>
                    <input type="text" placeholder="First Name" style={myStyles.name} value={value} />
                    <input type="text" placeholder="Last Name" style={myStyles.name} value={value} /><br />
                    <input type="text" placeholder="Email" style={myStyles.logIn} value={value} /><br />
                    <input type="password" placeholder="Password" style={myStyles.logIn} value={value} /><br />
                        BirthDay <br />
                    <FCDatePicker /><br />

                    <fieldset>
                        <legend>Gender</legend>
                        <input type="radio" name="gender" value="male" /*value={value}*/ /> Male <br />
                        <input type="radio" name="gender" value="female" /*value={value}*/ /> Female
                        </fieldset>
                    <input type="submit" value="Sign up" />
                </fieldset>
            </form>
        </div>
    );
}