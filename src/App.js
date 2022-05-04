import React, { useState, useEffect } from "react";
import axios from "axios";

const axiosGitHubGraphQL = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    "Content-Type": "application/json",
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
  withCredentials: false,
  credentials: "same-origin",
});

const GET_ORGANISATION = `{
  organization(login: "the-road-to-learn-react"){
    name
    url
  }
}`;

const TITLE = "React GraphQL GitHub Client";

export const App = () => {
  const [url, setUrl] = useState("no url");
  const [org, setOrg] = useState("no org");
  const [err, setErr] = useState("no error");

  useEffect(() => {
    axiosGitHubGraphQL.post("", { query: GET_ORGANISATION }).then((res) => {
      setOrg(res.data.data.organization);
      setErr(res.data.errors);
      console.log(res.data);
    });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("org: ", org);
    console.log("err: ", err);
  };

  const onChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <div className="App">
      <h1>{TITLE}</h1>

      <form onSubmit={onSubmit}>
        <label htmlFor="url">Show open issues for https://github.com/</label>
        <input id="url" onChange={onChange}></input>
        <button type="submit">Search</button>
      </form>

      {url && <h2>{url}</h2>}
    </div>
  );
};

export default App;
