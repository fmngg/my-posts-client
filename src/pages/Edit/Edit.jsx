import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import "./EditorStyles.scss";
import styles from "./Edit.module.scss";

import trash from "../../assets/trash.svg";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import { isAuth } from "../../redux/slices/authSlice";

import axios from "../../axios";

const Edit = () => {
  const { id } = useParams();
  const checkIsAuth = useSelector(isAuth);
  const navigate = useNavigate();
  const inputFileRef = React.useRef();
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [text, setText] = React.useState("");
  const [image, setImage] = React.useState("");

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      const tagsArr = tags.split(" ");

      const fields = {
        title,
        tags: tagsArr,
        text,
        image,
      };

      const { data } = id
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post("/posts", fields);

      const _id = id ? id : data._id;

      navigate(`/posts/${_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then(({ data }) => {
        setTitle(data.title);
        setTags(data.tags.join(" "));
        setText(data.text);
        setImage(data.image);
      });
    }
  }, []);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImage(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "300px",
      autofocus: true,
      placeholder: "Write your thoughts...",
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem("token") && !checkIsAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.edit}>
      <Header />
      <div className="wrapper">
        <div className={styles.inputFileContainer}>
          <button
            onClick={() => inputFileRef.current.click()}
            className={styles.inputButton}
          >
            Choose image
          </button>
          <input
            onChange={handleChangeFile}
            ref={inputFileRef}
            className={styles.inputFile}
            type="file"
          />
        </div>
        <div className={styles.content}>
          {image && (
            <div className={styles.imageBlock}>
              <div className={styles.editButton}>
                <img
                  onClick={() => {
                    setImage("");
                  }}
                  className={styles.delete}
                  src={trash}
                  alt="Delete Post"
                />
              </div>
              <img
                src={`${process.env.REACT_APP_API_URL}${image}`}
                alt="Post Img"
              />
            </div>
          )}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className={styles.title}
            placeholder="Title"
          />
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            type="text"
            className={styles.tags}
            placeholder="Tags"
          />
          <SimpleMDE
            value={text}
            onChange={onChange}
            type="text"
            options={options}
          />
        </div>
      </div>
      <button onClick={onSubmit} className={styles.button} type="submit">
        {id ? "Save" : "Create"}
      </button>
      <Footer />
    </div>
  );
};

export default Edit;
