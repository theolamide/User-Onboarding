import React, {useState, useEffect} from "react";
import axios from "axios";
import { Form, Field, withFormik } from 'formik';
import * as Yup from "yup";

const OnboardForm = ({ errors, touched, values, status }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
      status && setUsers(users => [...users, status]);
    }, [status]);
  
    return (
      <div className="Onboard-form">
        <h1>Onboard Form</h1>
        <Form>
          <Field type="text" name="username" placeholder="username" />
          {touched.username && errors.username && (
            <p className="error">{errors.username}</p>
          )}
  
          <Field 
          type="text" 
          name="email" 
          placeholder="email" />
          {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
          )}

          <Field 
          type="text" 
          name="password" 
          placeholder="password" />
          {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
          )}

          <label className="checkbox-container">
            Terms of Service
            <Field
              type="checkbox"
              name="terms"
              checked={values.terms}
            />
            <span className="checkmark" />
          </label>

          <button type="submit">Submit!</button>
        </Form>
  
        {users.map(user => (
          <ul key={user.id}>
            <li>Username: {user.username}</li>
            <li>E-mail: {user.email}</li>
            <li>Password: {user.password}</li>
          </ul>
        ))}
      </div>
    );
  };

  const FormikOnboardForm = withFormik({mapPropsToValues({ username, email, password, terms}) {
      return {
        username: username || false,
        email: email || "",
        password: password || "",
        terms: terms || ""
      };
    },
  
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username required"),
      email: Yup.string().required("email is required"),
      password: Yup.string().required("Password is required"),
      terms: Yup.string().required("Accepting the terms and conditions is mandatory")
     }),
  
    handleSubmit(values, { setStatus }) {
      axios
        // values is our object with all our data on it.
        .post("https://reqres.in/api/users/", values)
        .then(res => {
          setStatus(res.data);
          console.log(res);
        })
        .catch(err => console.log(err.response));
    }
  })(OnboardForm); // currying functions in Javascript
  console.log("This is the HOC", FormikOnboardForm);
  export default FormikOnboardForm;
  
  
            {/* <form>
                <div className ="inputFields">
                    <label htmlFor = "name">name</label>
                        <input 
                            id = "name"
                            type = "text"
                            name = "name"
                        />
                </div>

                <div className ="inputFields">
                    <label htmlFor ="email">e-mail</label>
                    <input 
                        id = "email"
                        type = "text"
                        name = "email"                        
                    />
                </div>
                
                <div className ="inputFields">
                    <label htmlFor ="role">role</label>
                    <input 
                        id = "role"
                        type = "text"
                        name = "role"                    
                    /> 
                </div>
                <div>
                    <label className="checkbox-container">Terms of service </label>                    
                    <input 
                    id="terms"
                    type="checkbox"                 
                    name="terms" 
                    />
                    
                </div>
               
                <button type="submit">Submit!</button>
            </form> */}
//         </div>
//     )
// };

// export default OnboardForm;