import React from "react";
import { Repository } from "./repository";

export const Organisation = ({
  org,
  errors,
  onFetchMoreIssues,
  onStarRepo,
  isStarred,
  stargazerCount,
}) => {
  if (errors) {
    return (
      <p>
        <strong>Something went wrong:</strong>
        {errors.map((error) => error.message).join("")}
      </p>
    );
  }
  return (
    <div>
      <p>
        <strong>Issues from Organisation:</strong>
        <a href={org.url}>{org.name}</a>
      </p>
      {org.repository && (
        <Repository
          repository={org.repository}
          onFetchMoreIssues={onFetchMoreIssues}
          onStarRepo={onStarRepo}
          isStarred={isStarred}
          stargazerCount={stargazerCount}
        ></Repository>
      )}
    </div>
  );
};
