import React from "react";

export default function TodoBanner(props) {
  const { user, todo } = props;
  return (
    <div>
      <h2 className="bg-primary text-white text-center p-2">
        {user}'s To do List ({todo.filter((t) => !t.done).length} items to do)
      </h2>
    </div>
  );
}
