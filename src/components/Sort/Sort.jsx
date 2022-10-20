import React from "react";

import styles from "./Sort.module.scss";

const sortItems = [
  {
    id: 0,
    text: "Recent",
  },
  {
    id: 1,
    text: "Popularity",
  },
];

const Sort = ({ active, setActive }) => {
  return (
    <div className={styles.sort}>
      {sortItems.map((obj) => (
        <p
          key={obj.id}
          className={obj.id === active ? styles.active : null}
          onClick={() => setActive(obj.id)}
        >
          {obj.text}
        </p>
      ))}
    </div>
  );
};

export default Sort;
