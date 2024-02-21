import axios from "axios";
import { useState } from "react";

export default function RegisterForm() {
  const [input, setInput] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Validation
      if (input.password !== input.confirmPassword) {
        return alert("Please check confirm password");
      }

      // Send registration data to the server
      const response = await axios.post(
        "http://localhost:8889/auth/register",
        {
          username: input.username,
          password: input.password,
          confirmPassword: input.confirmPassword,
          email: input.email,
        }
      );

      console.log(response);

      if (response.status === 200) {
        alert("Registration Successful");
        // You may redirect or perform additional actions upon successful registration
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="p-5 border w-4/6 min-w-[500px] mx-auto rounded mt-5 ">
      <div className="text-3xl mb-5">Register Form</div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        {["username", "password", "confirmPassword", "email"].map((fieldName) => (
          <label key={fieldName} className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">
                {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
              </span>
            </div>
            <input
              type={fieldName === "password" || fieldName === "confirmPassword" ? "password" : "text"}
              className="input input-bordered w-full max-w-xs"
              name={fieldName}
              value={input[fieldName]}
              onChange={handleChange}
            />
          </label>
        ))}
        <div className="flex gap-5 ">
          <button type="submit" className="btn btn-outline btn-info mt-7">
            Submit
          </button>
          <button type="reset" className="btn btn-outline btn-warning mt-7">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
