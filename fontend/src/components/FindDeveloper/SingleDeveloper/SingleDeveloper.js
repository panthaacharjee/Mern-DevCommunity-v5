import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleDeveloper } from "../../../redux/actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { IoIosPeople } from "react-icons/io";
import { MdEmojiPeople, MdDateRange, MdViewTimeline } from "react-icons/md";
import { BiLocationPlus } from "react-icons/bi";
import dateFormat from "dateformat";
import MetaData from "../../MetaData";
import { RiContactsBook2Line } from "react-icons/ri";
import Hire from "../Hire";

const SingleDeveloper = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, developer } = useSelector((state) => state.singleDeveloper);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  console.log(developer);

  const date = dateFormat(developer.createdAt, " dS mmmm, yyyy");
  const [lastIndex, setLastIndex] = useState(300);

  //For Hire Developer
  const [showHire, setShowHire] = useState(false);

  useEffect(() => {
    dispatch(getSingleDeveloper(id));
  }, [id]);
  return (
    <>
      <MetaData title={developer.name} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="single-developer-container">
            <div className="single-developer-header">
              <img
                className="banner"
                src={developer.banner && developer.banner.url}
                alt="image"
              />
              <img
                className="avatar"
                src={developer.avatar && developer.avatar.url}
                alt="avatar"
              />
            </div>
            <div className="single-developer-description-box">
              <h4>{developer.name}</h4>
              {developer.title && <p>{developer.title}</p>}
              <div style={{ display: "flex" }}>
                <p>
                  <span>
                    <IoIosPeople />
                  </span>
                  2 Followers
                </p>
                <p>
                  <span>
                    <MdEmojiPeople />
                  </span>
                  6 Following
                </p>
              </div>
              <div>
                {developer.location && (
                  <p>
                    <span>
                      <BiLocationPlus />
                    </span>
                    {developer.location}
                  </p>
                )}
                {developer.contact && (
                  <p>
                    <span>
                      <RiContactsBook2Line />
                    </span>
                    {developer.contact}
                  </p>
                )}
              </div>
              <div className="developer-btn">
                <button>Message</button>
                {isAuthenticated
                  ? user.role === "client" && (
                      <button onClick={() => setShowHire(true)}>Hire</button>
                    )
                  : null}
              </div>
            </div>
            <div className="single-developer-about-box">
              <div className="about">
                <h4>About</h4>
                {developer.about && (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: developer.about.substr(0, lastIndex),
                    }}
                  />
                )}
                {lastIndex <= 300 ? (
                  <button onClick={() => setLastIndex(developer.about.length)}>
                    see more
                  </button>
                ) : (
                  <button onClick={() => setLastIndex(300)}>hide</button>
                )}
              </div>
              <div className="skill">
                <h4>Skill</h4>
                {developer.skills &&
                  developer.skills.map((val, ind) => {
                    return <p key={ind}>{val.skill}</p>;
                  })}
              </div>
              <div className="experience">
                <h4>Experience</h4>
                {developer.experiences &&
                  developer.experiences.map((val, ind) => {
                    return (
                      <div key={ind}>
                        <h5>{val.title}</h5>
                        <p>{val.description}</p>
                        <p>{val.time}</p>
                      </div>
                    );
                  })}
              </div>
              <div className="education">
                <h4>Education</h4>
                {developer.educations &&
                  developer.educations.map((val, ind) => {
                    return (
                      <div key={ind}>
                        <h5>{val.school}</h5>
                        <p>{val.degree}</p>
                        <p>{val.startDate}</p>
                        <p>{val.endDate}</p>
                      </div>
                    );
                  })}
              </div>
              <div className="portfolio">
                <h4>PortFolio</h4>
                {developer.portfolios &&
                  developer.portfolios.map((val, ind) => {
                    return (
                      <div key={ind}>
                        <h5>{val.title}</h5>
                        <p>{val.description}</p>
                        <a href={val.link}>
                          <p>{val.link}</p>
                        </a>
                        <a href={val.gitLink}>
                          <p>{val.gitLink}</p>
                        </a>
                      </div>
                    );
                  })}
              </div>
              <div className="language">
                <h4>Language</h4>
                {developer.languages &&
                  developer.languages.map((val, ind) => {
                    return <p key={ind}>{val.language}</p>;
                  })}
              </div>
            </div>
          </div>
          {showHire && <Hire developer={developer} setShowHire={setShowHire} />}
        </>
      )}
    </>
  );
};

export default SingleDeveloper;
