import React from "react";
import "./index.css";

const emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const countries = ["India", "USA", "UK", "Canada", "Australia"];
const cities = {
   India: ["Delhi", "Mumbai", "Chandigarh", "Haryana"],
  USA: ["New York", "Los Angeles", "Chicago", "San Francisco"],
  UK: ["London", "Manchester", "Birmingham"],
  Canada: ["Toronto", "Vancouver", "Montreal"],
  Australia: ["Sydney", "Melbourne", "Brisbane"]
};

class FormComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      emailAddress: "",
      password: "",
      showPassword: false,
      phone: "",
      country: "",
      city: "",
      pan: "",
      aadhar: "",
      errors: {},
      isFormSubmitted: false
    };
  }

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState({ [name]: type === "checkbox" ? checked : value });
  };

  validateFields = () => {
    const errors = {};
    const {
      firstName,
      lastName,
      username,
      emailAddress,
      password,
      phone,
      country,
      city,
      pan,
      aadhar
    } = this.state;

    if (!firstName.trim()) errors.firstName = "First name is required";
    if (!lastName.trim()) errors.lastName = "Last name is required";
    if (!username.trim()) errors.username = "Username is required";
    if (!emailValidator.test(emailAddress)) errors.emailAddress = "Invalid email";
    if (!passwordValidator.test(password)) errors.password = "Password must be at least 8 chars with upper, lower & digit";
    if (!/^\+\d{1,4}\d{10}$/.test(phone)) errors.phone = "Invalid phone number with country code";
    if (!country) errors.country = "Country required";
    if (!city) errors.city = "City required";
    if (!/^\w{10}$/.test(pan)) errors.pan = "PAN must be 10 characters";
    if (!/^\d{12}$/.test(aadhar)) errors.aadhar = "Aadhar must be 12 digits";

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validateFields()) {
      this.setState({ isFormSubmitted: true });
    } else {
      this.setState({ isFormSubmitted: false });
    }
  };

  render() {
    const {
      firstName,
      lastName,
      username,
      emailAddress,
      password,
      showPassword,
      phone,
      country,
      city,
      pan,
      aadhar,
      errors,
      isFormSubmitted
    } = this.state;

    return (
      <div className="form-container">
        <h3>Signup Form</h3>
        {isFormSubmitted ? (
          <div>
            <h4>Form Submitted Successfully!</h4>
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <label>First Name:</label>
            <input name="firstName" value={firstName} onChange={this.handleChange} />
            <div className="error">{errors.firstName}</div>

            <label>Last Name:</label>
            <input name="lastName" value={lastName} onChange={this.handleChange} />
            <div className="error">{errors.lastName}</div>

            <label>Username:</label>
            <input name="username" value={username} onChange={this.handleChange} />
            <div className="error">{errors.username}</div>

            <label>Email:</label>
            <input name="emailAddress" value={emailAddress} onChange={this.handleChange} />
            <div className="error">{errors.emailAddress}</div>

            <label>Password:</label>
            <input type={showPassword ? "text" : "password"} name="password" value={password} onChange={this.handleChange} />
            <div className="error">{errors.password}</div>

            <div className="checkbox-inline">
              <input type="checkbox" name="showPassword" checked={showPassword} onChange={this.handleChange} />
              <label>Show Password</label>
            </div>

            <label>Phone (+countrycode):</label>
            <input name="phone" value={phone} onChange={this.handleChange} />
            <div className="error">{errors.phone}</div>

            <label>Country:</label>
            <select name="country" value={country} onChange={this.handleChange}>
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <div className="error">{errors.country}</div>

            <label>City:</label>
            <select name="city" value={city} onChange={this.handleChange}>
              <option value="">Select City</option>
              {(cities[country] || []).map((ct) => (
                <option key={ct} value={ct}>{ct}</option>
              ))}
            </select>
            <div className="error">{errors.city}</div>

            <label>PAN Number:</label>
            <input name="pan" value={pan} onChange={this.handleChange} />
            <div className="error">{errors.pan}</div>

            <label>Aadhar Number:</label>
            <input name="aadhar" value={aadhar} onChange={this.handleChange} />
            <div className="error">{errors.aadhar}</div>

            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    );
  }
}

export default FormComponent;
