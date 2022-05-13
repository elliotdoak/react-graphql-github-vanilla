import React, { useState } from "react";
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
  const [cursor, setCursor] = useState(undefined);

  const GET_ISSUES_OF_REPO = `
    query ($orgName: String!, $repo: String!, $cursor: String){ 
      organization(login: $orgName){
      name
      url
      repository(name: $repo){
        id
        name
        url
        viewerHasStarred
        issues(first:5, after: $cursor, states: [OPEN]){
          edges {
            node {
              id
              title
              url
              reactions (last:3){
                edges {
                  node {
                    id
                    content
                  }
                }
              }
            }
          }
          totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
     }} 
`;

  const callQuery = () => {
    axiosGitHubGraphQL
      .post("", {
        query: GET_ISSUES_OF_REPO,
        variables: { orgName, repo, cursor },
      })
      .then((res) => {
        setOrgData(res?.data?.data?.organization);
        setCursor(
          res?.data.data?.organization.repository.issues.pageInfo.endCursor
        );
        setErrors(res.data.errors ? res.data.errors : "");
      });
  };

  const ADD_STAR = `
  mutation($id: ID!){
    addStar(input:{starrableId: $id}){
      starrable {
        viewerHasStarred
      }
    }
  }`;

  const addStarToRepoMutation = (id) => {
    console.log(id);
    axiosGitHubGraphQL.post("", {
      query: ADD_STAR,
      variables: { id },
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const [organisation, repository] = event.target[0].value.split("/");
    setOrgName(organisation);
    setRepo(repository);
    callQuery();
  };

  const onStarRepo = (id, isStarred) => {
    console.log(id, isStarred);
    addStarToRepoMutation(id);
  };

  const onFetchMoreIssues = () => {
    console.log("FETCH");
    console.log(cursor);
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
        <Organisation
          org={orgData}
          errors={errors}
          onFetchMoreIssues={onFetchMoreIssues}
          onStarRepo={onStarRepo}
        />
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
