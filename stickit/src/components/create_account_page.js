import { useContext, useState } from "react";
import { AppContext } from "./user_context";
import { Redirect } from "react-router-dom";
import { Button, TextField, ButtonGroup } from '@material-ui/core';

function CreateAccount(props) {
  const { userID, login } = useContext(AppContext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [dob, setDOB] = useState('');
  const [error, toggleError] = useState({ fname: false, lname: false, dob: false, email: false, password: false });
  const [errorMsg, setError] = useState('');

  //
  if (userID !== null) {
    return <Redirect to="/dashboard" />;
  }

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
    } else if (dob === null) {
        success = false;
        errMsg = 'Please enter your birthday';
        toggleError({ dob: true });
    } else if (email.length === 0) {
        success = false;
        errMsg = 'Please enter your email';
        toggleError({ email: true });
    } else if (password.length === 0) {
        success = false;
        errMsg = 'Please enter your password';
        toggleError({ password: true });
    } else {
        toggleError({ email: false, password: false });
    }

    // TODO: submit the login information for confirmation

    if (success) {
        login(email);
    } else {
        setError(errMsg);
    }
}

    function handleInput(event) {
        let name = event.target.name;
        let value = event.target.value;
        let errMsg = '';

        if (name === 'email') {
            if (value.trim() !== '') {
                setEmail(value);
            }
        } else if (name === 'password') {
            if (value.trim() !== '') {
                setPassword(value);
            }
        } else if (name === 'fname') {
            if (value.trim() !== '') {
                setFname(value);
            }
        }  else if (name === 'lname') {
            if (value.trim() !== '') {
                setLname(value);
            }
        }  else if (name === 'dob') {
            if (value.trim() !== '') {
                setDOB(value);
            }
        }

        setError(errMsg);
}
  return (
    <div id="create_account_page" className="create-account-page">
      <form id="create-account-form" onSubmit={handleCreate}>
                <h1 className="title">Create An Account</h1>
                <TextField
                    label="First Name"
                    name="first_name"
                    type="text"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    required= "true"
                    onChange={handleInput}
                />
                <TextField
                    label="Last Name"
                    name="last_name"
                    type="text"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    required= "true"
                    onChange={handleInput}
                />
                <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    defaultValue="2021-01-01"
                    onChange={(dob) => {
                      setDOB(dob);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    error={error.email}
                    helperText={error.email ? errorMsg : null}
                    onChange={handleInput}
                    required= "true"
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    error={error.password}
                    helperText={error.password ? errorMsg : null}
                    onChange={handleInput}
                    required= "true"
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
