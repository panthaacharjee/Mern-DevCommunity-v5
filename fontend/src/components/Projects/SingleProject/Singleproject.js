import React, { useEffect, useRef, useState } from "react";
import "./singleproject.css";
import { useDispatch, useSelector } from "react-redux";
import {
  applyProject,
  getSingleProject,
} from "../../../redux/actions/projectActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";
import ReactTimeAgos from "../../CustomComponent/ReactTimeAgos";
import { MdPriceChange } from "react-icons/md";
import { FcBusinessman } from "react-icons/fc";
import {
  BsPinMapFill,
  BsPinFill,
  BsFillCalendar2DateFill,
  BsCurrencyDollar,
} from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart, AiOutlinePlus } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import JoditEditor from "jodit-react";
const Singleproject = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useNavigate();
  const { project, loading } = useSelector((state) => state.project);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  // Project Lebel Text
  const [labelText, setLabelText] = useState();

  //Payment Text
  const [paymentText, setPaymentText] = useState();

  //Project Save
  const [save, setSave] = useState(true);
  const handleSave = (props) => {
    if (props === "save") {
      setSave(false);
    } else {
      setSave(true);
    }
  };

  // Project Apply
  const [applyShow, setApplyShow] = useState(false);

  const [applyPrice, setApplyPrice] = useState();
  const [pTime, setPTime] = useState();

  //Jodit Rich Text Editor
  const [showJodit, setShowJodit] = useState(false);
  const [about, setAbout] = useState(null);
  const editor = useRef(null);

  //Handle Project Apply
  const handleApply = () => {
    const data = {
      bidPrice: applyPrice,
      projectTime: pTime,
      coverLetter: about,
    };
    dispatch(applyProject(data, id));
  };

  useEffect(() => {
    const labelTextHandle = () => {
      if (project.label === "Intermideate") {
        setLabelText("I am looking for a mix of experience and value");
      } else if (project.label === "Expert") {
        setLabelText(
          "I am willing to pay higher rates for the most experienced freelancers"
        );
      } else {
        setLabelText("I am looking for freelancers with the lowest rates");
      }
    };

    const paymentTextHandle = () => {
      if (project.payment === "notverified") {
        setPaymentText("PAYMENT METHOD NOT VERIFIED");
      } else {
        setPaymentText("PAYMENT METHOD VERIFIED");
      }
    };

    labelTextHandle();
    paymentTextHandle();

    dispatch(getSingleProject(id));
  }, [id, project.label]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="single-project-container">
            <div className="single-project-left-box">
              <div className="left-box-desc">
                <h3>{project.name}</h3>
                <label>{project.category}</label>
                {project.createdAt && (
                  <p>
                    <span>Posted </span>
                    <ReactTimeAgos date={project.createdAt} />
                  </p>
                )}
                <p className="project-location">
                  <span>
                    <BsPinMapFill />
                  </span>
                  {project.location}
                </p>
              </div>
              <div className="left-box-about">
                <p dangerouslySetInnerHTML={{ __html: project.about }} />
              </div>
              <div className="left-box-price">
                <div>
                  <p>
                    <MdPriceChange />
                  </p>
                  <div>
                    <p className="left-box-p">$ {project.price}</p>
                    <p>{project.priceType}</p>
                  </div>
                </div>
                <div>
                  <p>
                    <FcBusinessman />
                  </p>
                  <div>
                    <p className="left-box-p">{project.label}</p>
                    <p>{labelText}</p>
                  </div>
                </div>
                {project.length && (
                  <div>
                    <p style={{ fontSize: "18px" }}>
                      <BsFillCalendar2DateFill />
                    </p>
                    <div>
                      <p className="left-box-p">{project.length}</p>
                      <p>Project Length</p>
                    </div>
                  </div>
                )}
              </div>
              {project.attachment && (
                <div className="left-box-attachment">
                  <p>
                    <BsPinFill />
                  </p>
                  <Link>{project.attachment}</Link>
                </div>
              )}
              {project.type && (
                <div className="left-box-type">
                  <p>Project Type:</p>
                  <span>{project.type}</span>
                </div>
              )}
              <div className="left-box-skill">
                <h4>Skills and Expertise</h4>
                <div>
                  {project.skills &&
                    project.skills.map((val, ind) => {
                      return <p key={ind}>{val.skill}</p>;
                    })}
                </div>
              </div>
              <div className="left-box-activity">
                <h4>Activity on this Project</h4>
                <div>
                  {project.bidders && (
                    <p>
                      Proposals : <span>{project.bidders.length}</span>
                    </p>
                  )}
                  <p>
                    Last viewed :
                    {project.createdAt && (
                      <span>
                        <ReactTimeAgos date={project.createdAt} />
                      </span>
                    )}
                  </p>
                  {project.interviews && (
                    <p>
                      Interviewing : <span>{project.interviews.length}</span>
                    </p>
                  )}
                  {project.invites && (
                    <p>
                      Invites sent: <span>{project.invites.length}</span>
                    </p>
                  )}
                </div>
                <h4>Upgrade your membership to see the bid range </h4>
              </div>
            </div>
            <div className="single-project-right-box">
              <div className="right-box-apply">
                {isAuthenticated && user.role === "developer" ? (
                  <button onClick={() => setApplyShow(true)}>
                    <span>Apply Now</span>
                  </button>
                ) : null}
                {save ? (
                  <button
                    onClick={() => handleSave("save")}
                    className="project-btn-style"
                  >
                    <p>
                      <AiOutlineHeart />
                    </p>
                    <span> Save Project</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleSave("unsave")}
                    className="project-btn-style"
                  >
                    <p>
                      <AiFillHeart />
                    </p>
                    <span>Saved</span>
                  </button>
                )}
              </div>
              <div className="right-box-about">
                <h3>About the client</h3>
                <div>
                  <p>{paymentText}</p>
                  {project.owner && <h5>{project.owner.location}</h5>}
                  <div className="clinet-poject">
                    {project.owner &&
                      project.owner.myProjects.map((val, ind) => {
                        return (
                          <Link key={ind} to={`/project/${val}`}>
                            {val}
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {applyShow && (
            <div className="apply-project-container">
              <div className="apply-project-box">
                <div className="apply-project-header">
                  <p>Apply</p>
                  <button onClick={() => setApplyShow(false)}>
                    <RxCross1 />
                  </button>
                </div>
                <div className="apply-project-user-box">
                  <img src={user.avatar.url} alt="user-avatar" />
                  <div>
                    <h4>{user.name}</h4>
                    <p>{user.title}</p>
                    <label>{user.location}</label>
                  </div>
                </div>
                <div className="apply-bidder-price">
                  <span>
                    <BsCurrencyDollar />
                  </span>
                  <input
                    type="text"
                    placeholder="Enter your bidding price"
                    onChange={(e) => setApplyPrice(e.target.value)}
                    value={applyPrice}
                  />
                  <span onClick={() => setApplyPrice(applyPrice * 2)}>
                    <AiOutlinePlus />
                  </span>
                </div>
                {showJodit && (
                  <div className="apply-bidder-cv">
                    <JoditEditor
                      ref={editor}
                      value={about}
                      name="caption"
                      onChange={(e) => {
                        setAbout(e);
                      }}
                    />
                  </div>
                )}
                {!showJodit ? (
                  <button
                    className="jodit-btn"
                    onClick={() => setShowJodit(true)}
                  >
                    Write Cover Letter
                  </button>
                ) : (
                  <button
                    className="jodit-btn"
                    onClick={() => setShowJodit(false)}
                  >
                    Hide Cover Letter
                  </button>
                )}
                <div className="apply-project-time">
                  <select onChange={(e) => setPTime(e.target.value)}>
                    <option>Under Three Months</option>
                    <option>Over Three Months</option>
                  </select>
                </div>
                <button className="project-applied-btn" onClick={handleApply}>
                  Apply
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Singleproject;
