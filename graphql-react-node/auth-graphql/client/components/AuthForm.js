import React, {useState} from "react";

function AuthForm({onSubmit,errors}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            onSubmit({email, password});
        }}>

                <label>Email</label>
                <input
                    onChange={event => setEmail(event.target.value)}
                    value={email}
                />

            <label>Password</label>
            <input
                onChange={event => setPassword(event.target.value)}
                value={password}
            />

            {errors.map(error => <div key={error}>{error}</div>)}

            <button>Submit</button>
        </form>
    );
}


export default AuthForm;
