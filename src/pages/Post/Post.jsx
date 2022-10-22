import React from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import styles from "./Post.module.scss";

import loader from "../../assets/loader.svg";
import edit from "../../assets/edit.svg";
import trash from "../../assets/trash.svg";

import axios from "../../axios";

import { deletePost } from "../../redux/slices/postsSlice";

const Post = () => {
  const [post, setPost] = React.useState();
  const [date, setDate] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();
  const user = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHandler = () => {
    const check = window.confirm('Press "ok" to delete');

    if (check) {
      dispatch(deletePost(id));
      navigate(`/`);
    }
  };

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setIsLoading(false);
        setDate(new Date(res.data.createdAt).toDateString());
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
    return <img className="loader" src={loader} alt="Loader" />;
  }

  return (
    <>
      <Header />
      <div className={styles.post}>
        <div className="wrapper">
          <div className={styles.postBlock}>
            {post.image && (
              <div className={styles.imageBlock}>
                <img
                  src={`${process.env.REACT_APP_API_URL}${post.image}`}
                  alt="Post Img"
                />
              </div>
            )}
            {user?._id === post.user._id ? (
              <div className={styles.editButton}>
                <Link to={`/posts/${id}/edit`}>
                  <img src={edit} alt="Edit Post" />
                </Link>
                <img
                  onClick={deleteHandler}
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
                    {post.user.nickname.slice("")[0]}
                    {/* <img src={test} /> */}
                  </div>
                  <div className={styles.about}>
                    <div className={styles.name}>{post.user.nickname}</div>
                    <div className={styles.date}>{date}</div>
                  </div>
                </div>
                <div className={styles.views}>
                  <p>{post.views} views</p>
                </div>
              </div>
              <div className={styles.title}>
                <h1>{post.title}</h1>
              </div>
              <div className={styles.tags}>
                {post.tags.map((obj, index) => (
                  <p key={index}>#{obj}</p>
                ))}
              </div>
              <div className={styles.text}>
                <ReactMarkdown>{post.text}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Post;
