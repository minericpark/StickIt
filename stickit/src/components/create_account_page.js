import React, { useContext, useState } from 'react';
import { AppContext } from "./user_context";
import { Redirect } from "react-router-dom";
import { Button, TextField, ButtonGroup } from '@material-ui/core';
import axios from 'axios';

function CreateAccount() {
  const { userID, login } = useContext(AppContext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [error, toggleError] = useState({ fname: false, lname: false, dob: false, email: false, password: false });
  const [errorMsg, setError] = useState('');

  if (userID !== null) {
    return <Redirect to="/dashboard" />;
  }

  /** Handle login submission.
     *
     * @param {*} event - the submit event
     */
  function handleCreate(event) {
    let success = true;
    let errMsg = '';

    event.preventDefault();

    if (fname.length === 0) {
        success = false;
        errMsg = 'Please enter your first name';
        toggleError({ fname: true });
    } else if (lname.length === 0) {
        success = false;
        errMsg = 'Please enter your last name';
        toggleError({ lname: true });
    } else if (email.length === 0) {
        success = false;
        errMsg = 'Please enter your email';
        toggleError({ email: true });
    } else if (password.length === 0) {
        success = false;
        errMsg = 'Please enter your password';
        toggleError({ password: true });
    } else {
        toggleError({ email: false, password: false, fname: false, lname: false });
    }

    // TODO: submit the login information for confirmation

    if (!success) {
        setError(errMsg);
        return;
    }

    // First Send login request, if failed then create new profile
    axios
        .get('/accounts/login', {
            params: { userID: email, password: password },
        })
        .then((res) => {
            success = res.status === 200;
            console.log("account already exists");
            login(email);
        })
        .catch(() => {
            console.log("account does not exist");
            
        })
        .then(() => {
            axios.post('/profiles/create', {
                user_id: email, first_name: fname, last_name: lname ,
            })
            .then((res) => {
                success = res.status === 200;
                console.log("profile created");
            })

            login(email);

            axios.post('/accounts/createUser', {
                user_id: email, password: password ,
            })
            .then((res) => {
                success = res.status === 200;
                console.log("account created");
            })
        });
}

    /** Handle input from text fields and do some simple validation.
     *
     * @param {*} event - the text changed event
     */
    function handleInput(event) {
        let name = event.target.name;
        let value = event.target.value;
        let errMsg = '';

        if (name === 'fname') {
            if (value.trim() !== '') {
                setFname(value);
                console.log(value)
            } else {
                toggleError({ fname: true });
                setError('Enter a first name');
            }
        }  else if (name === 'lname') {
            if (value.trim() !== '') {
                setLname(value);
                console.log(value)
            } else {
                toggleError({ lname: true });
                setError('Enter a last name');
            }
        }  else if (name === 'email') {
            if (value.trim() !== '') {
                setEmail(value);
                console.log(value)
            } else {
                toggleError({ email: true });
                setError('Enter an email');
            }
        } else if (name === 'password') {
            if (value.trim() !== '') {
                setPassword(value);
                console.log(value)
            } else {
                toggleError({ password: true });
                setError('Enter a password');
            }
        }

        setError(errMsg);

}
  return (
    <div id="create_account_page" className="create-account-page">
      <form id="create-account-form" onSubmit={handleCreate}>
                <h1 className="title">Create An Account</h1>
                <TextField
                    label="Firstname"
                    name="fname"
                    type="text"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    onChange={handleInput}
                    required={true}
                />
                <TextField
                    label="Lastname"
                    name="lname"
                    type="text"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    onChange={handleInput}
                    required= {true}
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    // error={error.email}
                    // helperText={error.email ? errorMsg : null}
                    onChange={handleInput}
                    required= {true}
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    // error={error.password}
                    // helperText={error.password ? errorMsg : null}
                    onChange={handleInput}
                    required={true}
                />
                <ButtonGroup size="small" variant="contained" disableElevation>
                    {/* TODO: <Button color="default">Cancel</Button> */}
                    <Button color="primary" type="submit">
                        Create An Account
                    </Button>
                </ButtonGroup>

        </form>
      </div>
  );
  
}

export default CreateAccount;
