import React from "react";
import "./Home.css";
import HomeData from "./HomeData";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  AiOutlineStar,
  AiFillFacebook,
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiFillYoutube,
  AiFillInstagram,
  AiFillAndroid,
  AiFillApple,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { BsPinAngle } from "react-icons/bs";
import { Grid } from "@mui/material";
import Pic from "../../images/globe@1x.png";
import CountryPic from "../../images/ukraine-help.svg";
import Banner from "../../images/pexels-sora-shimazaki-5926386.jpg";

const Home = () => {
  return (
    <div className="home">
      <div className="home-header">
        <div>
          <p>How work should work</p>
          <label>
            Forget the old rules. You can have the best people. Right now. Right
            here.
          </label>
          <div>
            <button>Find Tallent</button>
            <button>Find Project</button>
            <button>Enterprise</button>
          </div>
        </div>
      </div>
      <div className="talent-category">
        <p>Browse talent by category</p>
        <Grid container className="talent-category-box">
          {HomeData.map((val, ind) => {
            return (
              <Grid xs={3}>
                <div key={ind} className="talent-category-content">
                  <span>{val.icon}</span>
                  <p>{val.name}</p>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
      <div className="learn-signup">
        <div className="learn-signup-left">
          <p>Up your work game, it’s free</p>
          <div className="learn-signup-left-content">
            <div>
              <span>
                <BiEdit />
              </span>
              <div>
                <p>No cost to join</p>
                <label>
                  Register and browse professionals, explore projects, or even
                  book a consultation.
                </label>
              </div>
            </div>
            <div>
              <span>
                <AiOutlineStar />
              </span>
              <div>
                <p>Post a job and hire top talent</p>
                <label>
                  Finding talent doesn’t have to be a chore. Post a job or we
                  can search for you!
                </label>
              </div>
            </div>
            <div>
              <span>
                <BsPinAngle />
              </span>
              <div>
                <p>Work with the best—without breaking the bank</p>
                <label>
                  Dev Community makes it affordable to up your work and take
                  advantage of low transaction rates.
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="learn-signup-right">
          <img src={Pic} alt="Image" />
        </div>
      </div>
      <div className="find-talent">
        <p>For Clients</p>
        <div className="find-talent-content">
          <p>
            Find talent <br />
            your way
          </p>
          <label>
            Work with the largest network of independent professionals and get
            things done—from quick turnarounds to big transformations.
          </label>
        </div>
        <Grid container className="find-talent-content">
          <Grid xs={4}>
            <Link>
              <div className="find-talent-box">
                <p>Post a job and hire a pro</p>
                <label>
                  Talent Marketplace <AiOutlineArrowRight />
                </label>
              </div>
            </Link>
          </Grid>
          <Grid xs={4}>
            <Link>
              <div className="find-talent-box">
                <p>Browse and buy projects</p>
                <label>
                  Project Catelog <AiOutlineArrowRight />
                </label>
              </div>
            </Link>
          </Grid>
          <Grid xs={4}>
            <Link>
              <div className="find-talent-box">
                <p>Let us help you find </p>
                <label>
                  Talent Scout <AiOutlineArrowRight />
                </label>
              </div>
            </Link>
          </Grid>
        </Grid>
      </div>
      <div className="support-country">
        <div>
          <p>We support Ukraine</p>
          <label>
            We are taking action to help our freelancers, our clients, and the
            people of Ukraine—and so can you.
          </label>
          <button>Learn More</button>
        </div>
        <img src={CountryPic} alt="image" />
      </div>
      <div className="footer">
        <Grid container className="footer-content">
          <Grid xs={3}>
            <div className="footer-content-box">
              <h5>For Clients</h5>
              <li>How to Hire</li>
              <li>Talent Marketplace</li>
              <li>Project Catalog</li>
              <li>Talent Scout</li>
              <li>Hire an Agency</li>
              <li>Enterprise</li>
              <li>Any Hire</li>
              <li>Contract-to-Hire</li>
              <li>Direct Contracts</li>
              <li>Hire Worldwide</li>
              <li>Hire in the USA</li>
            </div>
          </Grid>
          <Grid xs={3}>
            <div className="footer-content-box">
              <h5>For Talent</h5>
              <li>How to Find Work</li>
              <li>Direct Contracts</li>
              <li>Find Freelance Jobs Worldwide</li>
              <li>Find Freelance Jobs in the USA</li>
            </div>
          </Grid>
          <Grid xs={3}>
            <div className="footer-content-box">
              <h5>Resources</h5>
              <li>Help & Support</li>
              <li>Success Stories</li>
              <li>Upwork Reviews</li>
              <li>Resources</li>
              <li>Blog</li>
              <li>Community</li>
              <li>Affiliate Program</li>
              <li>Free Business tools</li>
            </div>
          </Grid>
          <Grid xs={3}>
            <div className="footer-content-box">
              <h5>Company</h5>
              <li>About Us</li>
              <li>Leadership</li>
              <li>Investor Relations</li>
              <li>Careers</li>
              <li>Our Impact</li>
              <li>Community</li>
              <li>Press</li>
              <li>Contact Us</li>
              <li>Trust, Safety & Security</li>
              <li>Modern Slavery Statement</li>
            </div>
          </Grid>
        </Grid>
        <div className="footer-social">
          <div>
            <li>
              <AiFillFacebook />
            </li>
            <li>
              <AiFillLinkedin />
            </li>
            <li>
              <AiFillTwitterSquare />
            </li>
            <li>
              <AiFillYoutube />
            </li>
            <li>
              <AiFillInstagram />
            </li>
          </div>
          <div>
            <li>
              <AiFillAndroid />
            </li>
            <li>
              <AiFillApple />
            </li>
          </div>
        </div>
        <div className="footer-extra">
          <li>© 2015 - 2023 DevCommunity® Global Inc.</li>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
          <li>CA Notice at Collection</li>
          <li>Cookie Settings</li>
          <li>Accessibility</li>
        </div>
      </div>
    </div>
  );
};

export default Home;
