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
  credentials: "same-origin",
});

const TITLE = "React GraphQL GitHub Client";

export const App = () => {
  const [orgName, setOrgName] = useState("");
  const [repo, setRepo] = useState("");
  const [orgData, setOrgData] = useState({});
  const [errors, setErrors] = useState([]);

  const GET_ISSUES_OF_REPO = `
    query ($orgName: String!, $repo: String!){ 
      organization(login: $orgName){
      name
      url
      repository(name: $repo){
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
     }} 
`;

  // useEffect(() => {
  //   axiosGitHubGraphQL
  //     .post("", {
  //       query: GET_ISSUES_OF_REPO,
  //       variables: { orgName, repo },
  //     })
  //     .then((res) => {
  //       setErrors(res.data.errors ? res.data.errors : "");
  //     });
  // }, []);

  const callQuery = () => {
    axiosGitHubGraphQL
      .post("", {
        query: GET_ISSUES_OF_REPO,
        variables: { orgName, repo },
      })
      .then((res) => {
        setOrgData(res?.data?.data?.organization);
        setErrors(res.data.errors ? res.data.errors : "");
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const [organisation, repository] = event.target[0].value.split("/");
    setOrgName(organisation);
    setRepo(repository);
    callQuery();
  };

  return (
    <div className="App">
      <h1 className="Page">{TITLE}</h1>
      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="url">Show open issues for https://github.com/</label>
        <input></input>
        <button type="submit">Search</button>
      </form>
      {!errors && Object.keys(orgData).length !== 0 && orgData !== null && (
        <Organisation org={orgData} errors={errors} />
      )}
      {errors.length > 0 && (
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
