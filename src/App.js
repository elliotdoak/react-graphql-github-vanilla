import React, { useState, useEffect } from "react";
import axios from "axios";
import { Organisation } from "./components/organisation";
import "./styles.css";

const axiosGitHubGraphQL = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    "Content-Type": "application/json",
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
  //withCredentials: false,
  credentials: "same-origin",
});

const GET_ISSUES_OF_REPO = `{
  organization(login: "the-road-to-learn-react"){
   name
   url
   repository(name: "the-road-to-learn-react"){
     name
     url
     issues(last:5){
       edges {
         node {
           id
           title
           url
         }
       }
     }
   }
  }
}`;

const TITLE = "React GraphQL GitHub Client";

export const App = () => {
  const [url, setUrl] = useState("no url");
  const [org, setOrg] = useState({});
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axiosGitHubGraphQL.post("", { query: GET_ISSUES_OF_REPO }).then((res) => {
      setOrg(res?.data?.data?.organization);
      setErrors(res.data.errors ? res.data.errors : "");
    });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("org: ", org);
    console.log("err: ", errors);
  };

  const onChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <div className="App">
      <h1 className="Page">{TITLE}</h1>

      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="url">Show open issues for https://github.com/</label>
        <input id="url" onChange={onChange}></input>
        <button type="submit">Search</button>
      </form>

      {org?.name && <Organisation org={org} errors={errors} />}

      {errors && (
        <div className="errorContainer">
          <strong>Something went wrong:</strong>
          <ul>
            {errors.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
