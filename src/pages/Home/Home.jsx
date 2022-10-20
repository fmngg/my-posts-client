import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/Header/Header";
import Post from "../../components/Post/Post";
import Sort from "../../components/Sort/Sort";
import TagsBlock from "../../components/TagsBlock/TagsBlock";
import Footer from "../../components/Footer/Footer";

import styles from "./Home.module.scss";

import loader from "../../assets/loader.svg";

import { getPosts, getTags } from "../../redux/slices/postsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.auth.data);
  const [active, setActive] = React.useState(0);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    dispatch(getPosts());
    dispatch(getTags());
  }, []);

  if (posts.loading && tags.loading) {
    return <img className="loader" src={loader} alt="Loader" />;
  }

  return (
    <>
      <Header />
      <div className={styles.home}>
        <div className="wrapper">
          <div className={styles.content}>
            <div className={styles.posts}>
              <Sort active={active} setActive={setActive} />
              {(active === 1
                ? posts.items
                    .slice()
                    .sort((a, b) => (a.views > b.views ? -1 : 1))
                : posts.items
              ).map((obj) => (
                <Post
                  key={obj._id}
                  id={obj._id}
                  myId={user?._id}
                  userId={obj.user._id}
                  name={obj.user.nickname}
                  date={obj.createdAt}
                  views={obj.views}
                  tags={obj.tags}
                  title={obj.title}
                  image={obj.image}
                />
              ))}
            </div>
            <TagsBlock
              search={search}
              setSearch={setSearch}
              tags={tags.items}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
