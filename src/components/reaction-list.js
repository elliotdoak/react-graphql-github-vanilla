import React from "react";

export const ReactionList = (issue) => {
  return (
    <ul>
      {issue.repository.node.reactions.edges?.map((reaction) => (
        <li key={reaction.node.id}>{reaction.node.content.toLowerCase()}</li>
      ))}
    </ul>
  );
};
