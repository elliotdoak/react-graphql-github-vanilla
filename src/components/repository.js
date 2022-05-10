import React from "react";
import { ReactionList } from "./reaction-list";

export const Repository = ({ repository }) => {
  return (
    <div>
      <p>
        <strong>In Repository:</strong>
        <a href={repository.url}>{repository.name}</a>
      </p>

      <ul>
        {repository.issues.edges.map((issue) => (
          <li key={issue.node.url}>
            <a href={issue.node.url}>{issue.node.title}</a>
            <ReactionList repository={issue} />
          </li>
        ))}
      </ul>
    </div>
  );
};
