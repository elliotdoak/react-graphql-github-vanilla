import React from "react";
import { ReactionList } from "./reaction-list";

export const Repository = ({ repository, onFetchMoreIssues, onStarRepo }) => {
  return (
    <div>
      <p>
        <strong>In Repository:</strong>
        <a href={repository.url}>{repository.name}</a>
        <button
          onClick={() => onStarRepo(repository.id, repository.viewerHasStarred)}
        >
          {!repository.viewerHasStarred ? "Star" : "Unstar"} github repo
        </button>
      </p>

      <ul>
        {repository.issues.edges.map((issue) => (
          <>
            <li key={issue.node.url}>
              <a href={issue.node.url}>{issue.node.title}</a>
              <ReactionList repository={issue} />
            </li>
          </>
        ))}
      </ul>

      {repository.issues.pageInfo.hasNextPage && (
        <button onClick={onFetchMoreIssues}>More</button>
      )}
    </div>
  );
};
