import { useContext, useState } from "react";
import { AppContext } from "./user_context";
import { Redirect } from "react-router-dom";
import { Button, TextField, ButtonGroup } from '@material-ui/core';

function CreateAccount(props) {
  const { userID, login } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, toggleError] = useState({ email: false, password: false });
  const [errorMsg, setError] = useState('');

  //
  if (userID !== null) {
    return <Redirect to="/dashboard" />;
  }

  function handleLogin(event) {
    let success = true;
    let errMsg = '';

    event.preventDefault();

    if (email.length === 0) {
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
        }

        setError(errMsg);
}
  return (
    <div id="create_account_page" className="create-account-page">
      <form id="creat-account-form" onSubmit={CreateAccount}>
                <h1 className="title">Create An Account</h1>
                <TextField
                    label="First Name"
                    name="first_name"
                    type="text"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    onChange={CreateAccount}
                />
                <TextField
                    label="Last Name"
                    name="last_name"
                    type="text"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    onChange={CreateAccount}
                />
                <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    defaultValue="2017-05-24"
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
