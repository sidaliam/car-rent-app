import React from "react";
import "./about.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";

function AboutPage() {
  return (
    <>
      <Navbar />
      <Header />
      <div class="container">
        <div class="contentLeft">
          <div class="row">
            <div class="imgWrapper">
              <img
                src="https://images.unsplash.com/photo-1687579521048-217e24217d53?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODg5ODcxNzl8&ixlib=rb-4.0.3&q=85"
                alt=""
              />{" "}
            </div>
            <div class="imgWrapper">
              <img
                src="https://images.unsplash.com/photo-1687579521048-217e24217d53?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODg5ODcxNzl8&ixlib=rb-4.0.3&q=85"
                alt=""
              />
            </div>
            <div class="imgWrapper">
              <img
                src="https://images.unsplash.com/photo-1687579521048-217e24217d53?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODg5ODcxNzl8&ixlib=rb-4.0.3&q=85"
                alt=""
              />
            </div>
            <div class="imgWrapper">
              <img
                src="https://images.unsplash.com/photo-1687579521048-217e24217d53?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODg5ODcxNzl8&ixlib=rb-4.0.3&q=85"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="contentRight">
          <div class="content">
            <h4>Welcome To</h4>
            <h2>About Us Title...</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex ullam
              saepe, totam dicta fuga provident. Fuga, labore porro? Dolorem
              unde, explicabo atque voluptatum laborum harum, quas velit
              voluptates sit rerum non ullam laboriosam iusto ad sequi hic
              soluta consequatur quaerat!
            </p>
            <a href="#">Read More...</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;

