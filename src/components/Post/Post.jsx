import React from "react";

import styles from "./Post.module.scss";

import edit from "../../assets/edit.svg";
import trash from "../../assets/trash.svg";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { deletePost } from "../../redux/slices/postsSlice";

const Post = ({ name, date, views, title, tags, id, image, userId, myId }) => {
  const dispatch = useDispatch();
  const newDate = new Date(date).toDateString();

  return (
    <div className={styles.post}>
      {image && (
        <div className={styles.imageBlock}>
          <img
            src={`${process.env.REACT_APP_API_URL}${image}`}
            alt="Post Img"
          />
        </div>
      )}
      {userId === myId ? (
        <div className={styles.editButton}>
          <Link to={`/posts/${id}/edit`}>
            <img src={edit} alt="Edit Post" />
          </Link>
          <img
            onClick={() => {
              confirm('Press "ok" to delete') ? dispatch(deletePost(id)) : null;
            }}
            className={styles.delete}
            src={trash}
            alt="Delete Post"
          />
        </div>
      ) : null}
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {name.slice("")[0]}
              {/* <img src={test} /> */}
            </div>
            <div className={styles.about}>
              <div className={styles.name}>{name}</div>
              <div className={styles.date}>{newDate}</div>
            </div>
          </div>
          <div className={styles.views}>{views} views</div>
        </div>
        <div className={styles.title}>
          <Link to={`/posts/${id}`}>
            <h1>{title}</h1>
          </Link>
        </div>
        <div className={styles.tags}>
          {tags.map((obj, index) => (
            <p key={index}>#{obj}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
