import React from "react";

export const Repository = ({ repository }) => {
  return (
    <div>
      <p>
        <strong>In Repository:</strong>
        <a href={repository.url}>{repository.name}</a>
      </p>

      <ul>
        {repository.issues.edges.map((edge) => (
          <li key={edge.node.url}>
            <a href={edge.node.url}>{edge.node.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
