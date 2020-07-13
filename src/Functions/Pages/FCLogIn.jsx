import React, { useState, useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import FCDatePicker from './Add_Form/FCDatePicker';
//import { Input, TextField } from '@material-ui/core';

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
    const { user, SetUser } = useContext(UserContext);
    const emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
    let local = false;
    let api = `http://proj.ruppin.ac.il/bgroup4/prod/server/api/Users/Login`;
    if (local) {
        api = `https://localhost:44377/api/Users/Login`;
    }
    const [newUser, SetNewUser] = useState({
        userId: "John@Doe.com",
        firstName: "John",
        lastName: "Doe",
        rank: 1000,
        loggedIn: false,
        userLocation: null,
        birthDate: null,
        gender: null,
        state: null,
        city: null,
        password: null
    });
    const SignUpNewUser = (e) => {
        e.preventDefault();
        console.log(newUser);
        let NewUser = {
            User_id: newUser.userId,
            First_name: newUser.firstName,
            Last_name: newUser.lastName,
            Password: newUser.password,
            Birthdate: newUser.birthDate,
            Gender: newUser.gender,
            State: newUser.state,
            City: newUser.city,
            User_rank: newUser.rank
        };
        let api = `https://localhost:44377/api/Users/SignUp`
        //let api = `http://proj.ruppin.ac.il/bgroup4/prod/server/api/Users/SignUp`;
        fetch(api, {
            method: 'POST',
            body: JSON.stringify(NewUser),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        }
        )
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    console.log("Explore fetch= ", result);
                    logUserIn(result, NewUser);
                },
                (error) => {
                    console.log("err post=", error);
                    alert("sorry, somthing went wrong")
                });
    }
    const logIn = (e) => {
        if (e) {
            e.preventDefault();
        }
        console.log("user: ", user);
        let User = {
            User_id: user.userId,
            Password: user.password
        }
        //let api = `https://localhost:44377/api/Users/Login`
        //let api = `http://proj.ruppin.ac.il/bgroup4/prod/server/api/Users/Login`;
        fetch(api, {
            method: 'POST',
            body: JSON.stringify(User),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        }
        )
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    console.log("logIn fetch= ", result);
                    logUserIn(result, User);

                },
                (error) => {
                    console.log("err post=", error);
                });
    }
    const logUserIn = async (result, User) => {
        //console.log(result.User_id == User.User_id && result.Password == User.Password);
        if (result.User_id == User.User_id && result.Password == User.Password) {
            await SetUser({
                ...user,
                //userId: result.Userid,//why is it like this suddenly?
                userId: result.User_id,//correct way
                firstName: result.First_name,
                lastName: result.Last_name,
                rank: result.User_rank,
                loggedIn: result.User_id == User.User_id && result.Password == User.Password,
                birthDate: result.Birthdate,
                gender: result.Gender,
                state: result.State,
                city: result.City,
                password: result.Password
            });
            // localStorage.setItem('user', user);
            // let temp= localStorage.getItem('user');
            // console.log("local: ",localStorage.getItem('user').);
            //console.log(temp);


        }
        else {
            alert("שם משתמש או סיסמה שגויה");
        }
    }
    return (
        <div>
            <form onSubmit={(e) => logIn(e)}>
                <fieldset>
                    <legend>Log In</legend>
                    <input type="email" name="email" id="email" placeholder="Email"
                        required
                        pattern={emailPattern}
                        onChange={(e) => SetUser({ ...user, userId: e.target.value })}
                        style={myStyles.logIn} />
                    <input type="password" name="password" id="password" placeholder="Password"
                        minLength="8"
                        maxLength="16"
                        onChange={(e) => SetUser({ ...user, password: e.target.value })}
                        style={myStyles.logIn} required />
                    <br />
                    <input type="submit" value="Log In"
                    //onClick={(e) => logIn(e)}
                    />

                </fieldset>
            </form>
            <br />
            <form onSubmit={(e) => SignUpNewUser(e)}>
                <fieldset>
                    <legend>Sign up!</legend>
                    <input type="text" placeholder="First Name" style={myStyles.name}
                        required
                        minLength="2"
                        maxLength="50"
                        onChange={(e) => SetNewUser({ ...newUser, firstName: e.target.value })}
                    />
                    <input type="text" placeholder="Last Name" style={myStyles.name}
                        required
                        minLength="2"
                        maxLength="50"
                        onChange={(e) => SetNewUser({ ...newUser, lastName: e.target.value })}
                    />
                    <br />
                    <input type="email" placeholder="Email" style={myStyles.logIn}
                        required
                        pattern={emailPattern}
                        onChange={(e) => SetNewUser({ ...newUser, userId: e.target.value })}
                    />
                    <input type="password" placeholder="Password" style={myStyles.logIn}
                        required
                        minLength="8"
                        maxLength="16"
                        onChange={(e) => SetNewUser({ ...newUser, password: e.target.value })}
                    />
                    <br />
                    <input type="text" placeholder="State" style={myStyles.logIn}
                        required
                        minLength="3"
                        maxLength="50"
                        onChange={(e) => SetNewUser({ ...newUser, state: e.target.value })}
                    />
                    <input type="text" placeholder="City" style={myStyles.logIn}
                        required
                        minLength="2"
                        maxLength="50"
                        onChange={(e) => SetNewUser({ ...newUser, city: e.target.value })}
                    /><br />
                    <FCDatePicker
                        title={"BirthDay"}
                        req={true}
                        onDateChange={(e) => SetNewUser({ ...newUser, birthDate: e })} />
                    <br />
                    {/* <TextField type="date" variant="outlined" /> */}
                    <fieldset>
                        <legend>Gender</legend>
                        <input type="radio" name="gender" value={true} required
                            onChange={(e) => SetNewUser({ ...newUser, gender: e.target.value })}
                        /> Male
                        <br />
                        <input type="radio" name="gender" value={false} required
                            onChange={(e) => SetNewUser({ ...newUser, gender: e.target.value })} /> Female
                    </fieldset>
                    <input type="submit"
                        //onClick={(e) => SignUpNewUser(e)}
                        value="Sign Up!" />

                </fieldset>
            </form>
        </div>
    );
}


