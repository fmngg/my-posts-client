import React from "react";

import styles from "./TagsBlock.module.scss";

const TagsBlock = ({ tags, setSearch }) => {
  return (
    <div className={styles.tagsBlock}>
      <p className={styles.title}>Last tags</p>
      <div className={styles.tags}>
        {tags.map((obj, index) => (
          <div
            onClick={() => setSearch({ obj })}
            key={index}
            className={styles.tag}
          >
            <h2>#</h2>
            <p>{obj}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsBlock;
