import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { dayNames } from "../global/Global.js";
import useSwr from "swr";
import React from "react";
import ReactDOM from "react-dom";
import { useState, useRef, useEffect } from "react";

function Nav() {
  function Link(e) {
    window.location.href = "/publish";
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.navhome}>
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          class="bi bi-house-fill"
          className={styles.house}
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
          />
          <path
            fill-rule="evenodd"
            d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
          />
        </svg>{" "}
      </div>

      <div className={styles.navtournaments} onClick={Link}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="black"
          class="bi bi-people"
          className={styles.person}
          viewBox="0 0 16 16"
        >
          <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
      </div>

      <div className={styles.navsettings}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="black"
          class="bi bi-gear"
          className={styles.cogs}
          viewBox="0 0 16 16"
        >
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
        </svg>
      </div>
    </div>
  );
}

const TournamentProviderLink = (props) => (
  <Link href={props.link}>
    <a
      target="_blank"
      rel="noreferrer"
      className={styles.link_button}
      style={{ backgroundColor: props.color }}
    >
      {props.name}
    </a>
  </Link>
);

const Logo = () => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div
      style={{ position: "relative" }}
      onMouseLeave={() => setShowInfo(false)}
    >
      <div></div>
    </div>
  );
};

/*
  return (
    <div style={{position: 'fixed', top: 10, left: 10}} onMouseLeave={() => setShowInfo(false)} style={{visibility: 'hidden'}}>
      <Image src="/logo.png" width="100" height="100" onMouseEnter={() => setShowInfo(true)} />
      <div
        style={{boxShadow: 'rgba(255, 255, 255, 0.24) 0px 3px 8px', transition: 'opacity 0.1s ease-in-out', overflow: 'hidden', visibility: showInfo ? 'visible' : 'hidden', opacity: showInfo ? 1 : 0, width: 300, height: showInfo ? 250 : 0, border: '3px solid gray', backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white', borderRadius: 20, padding: 20, textAlign: 'center'}}>
        <div style={{fontSize: 28, color: '#C7493A', marginBottom: 10}}>SSBM EU</div>
        <div style={{fontSize: 16}}>Here you'll find a schedule for weekly EU Online Melee tournaments. Join the Discord to meet our community and find games.</div>
        <div style={{margin: 15}} />
        <Link href="https://discord.gg/PBZNzg6eyF">
          <a target="_blank" rel="noreferrer" className={styles.link_button} style={{backgroundColor: '#7289DA'}}>Our Discord</a>
        </Link>
      </div>
    </div>
  );
};

*/

function Arrows() {
  let translateX = 0;
  let dflt = window.matchMedia("(max-width: 419px)");
  let x = window.matchMedia("(min-width: 420px)");
  let x1 = window.matchMedia("(min-width: 500px)");
  let x2 = window.matchMedia("(min-width: 600px)");
  let x3 = window.matchMedia("(min-width: 740px)");
  let x4 = window.matchMedia("(min-width: 900px)");
  let x5 = window.matchMedia("(min-width: 1160px)");
  let x6 = window.matchMedia("(min-width: 1500px)");
  let x7 = window.matchMedia("(min-width: 1740px)");
  let x8 = window.matchMedia("(min-width: 2100px)");

  let count = 0;

  function scrollLeft() {
    count--;

    if (count == 0) {
      document.querySelector("#left").style.opacity = 0.2;
      document.querySelector("#left").style.pointerEvents = "none";
    } else {
      document.querySelector("#left").style.opacity = 1;
      document.querySelector("#left").style.pointerEvents = "auto";
    }

    if (x7.matches || x8.matches) {
      translateX += 97;
      document.querySelector("#column").style.top = "00px";
      document.querySelector("#column").style.left = translateX + "%";
    } else if (x5.matches || x6.matches || x4.matches) {
      translateX += 95;
      document.querySelector("#column").style.top = "00px";
      document.querySelector("#column").style.left = translateX + "%";
    } else if (x3.matches) {
      translateX += 101;
      document.querySelector("#column").style.top = "00px";
      document.querySelector("#column").style.left = translateX + "%";
    } else if (x.matches || x1.matches || x2.matches) {
      translateX += 730;
      document.querySelector("#column").style.top = "00px";
      document.querySelector("#column").style.left = translateX + "px";
    } else {
      translateX += 550;
      document.querySelector("#column").style.top = "00px";
      document.querySelector("#column").style.left = translateX + "px";
    }
  }

  function scrollRight() {
    count++;
    document.querySelector("#left").style.opacity = 1;
    document.querySelector("#left").style.pointerEvents = "auto";
    if (x7.matches || x8.matches) {
      translateX -= 97;
      document.querySelector("#column").style.top = "00px";
      document.querySelector("#column").style.left = translateX + "%";
    } else if (x5.matches || x6.matches || x4.matches) {
      translateX -= 95;
      document.querySelector("#column").style.top = "00px";
      document.querySelector("#column").style.left = translateX + "%";
    } else if (x3.matches) {
      translateX -= 101;
      document.querySelector("#column").style.top = "00px";
      document.querySelector("#column").style.left = translateX + "%";
    } else if (x.matches || x1.matches || x2.matches) {
      translateX -= 730;
      document.querySelector("#column").style.top = "00px";
      document.querySelector("#column").style.left = translateX + "px";
    } else {
      translateX -= 550;
      document.querySelector("#column").style.top = "00px";
      document.querySelector("#column").style.left = translateX + "px";
    }
  }

  return (
    <div className={styles.arrows} onClick={console.log(count)}>
      <div
        className={styles.arrowLeft}
        id="left"
        onClick={() => {
          scrollLeft();
        }}
      >
        <div className={styles.lefticon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            class="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </div>
      </div>
      <div className={styles.arrowRight} onClick={scrollRight}>
        <div className={styles.righticon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            class="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

const Title = () => {
  return (
    <div className={styles.title}>
      <div
        className={styles.homeTitle}
        style={{ color: "black", fontFamily: "Lato" }}
      >
        Upcoming Tournaments
      </div>
      <div className={styles.filterHeader}>Filters</div>
      <div className={styles.filterBtn}>
        <div className={styles.filterSvg}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="white"
            class="bi bi-filter-left"
            viewBox="0 0 16 16"
          >
            <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

function Filters(props) {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filter}>
        <div className={styles.removefilter}>
          <h3 className={styles.filterName}></h3>
        </div>
      </div>
    </div>
  );
}

const TournamentDay = (props) => (
  <div className={styles.column}>
    <div className={styles.days} style={{ color: "black" }}>
      {props.day}
    </div>

    <div style={{}} />
    <div className={props.info ? styles.scrollOn : styles.scroll}>
      {props.tournaments}
    </div>
  </div>
);

function AddIt(props) {
  return (
    <div className={props.info ? styles.infoOn : styles.infoOff}>
      <div
        className={props.info ? styles.backButtonOn : styles.backButton}
        onClick={props.showOff}
      >
        <div className={styles.backIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="black"
            class="bi bi-chevron-compact-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"
            />
          </svg>
        </div>
      </div>
      <img
        src="/fox.png"
        className={props.info ? styles.foxaddOn : styles.foxadd}
      ></img>
    </div>
  );
}

function TournamentContainer(props) {
  return (
    <div className={styles.fullContainer}>
      <div
        className={
          props.info
            ? styles.tournament_containerOn
            : styles.tournament_container
        }
      >
        <div
          className={props.info ? styles.tourneyDivOn : styles.tourneyDiv}
          onClick={props.showIt}
        >
          <img src="/fox.png" className={styles.fox}></img>
          {props.time && (
            <>
              <div style={{}} />
              <div style={{ fontSize: 12 }} />
              <div className={styles.cet_time}> {props.time}</div>
            </>
          )}
          <div className={styles.links}>
            {props.challonge && (
              <TournamentProviderLink
                link={props.challonge}
                color="#FF9152"
                name="Challonge"
                background="white"
                width="100px"
                height="100px"
              />
            )}
            {props.smashgg && (
              <TournamentProviderLink
                link={props.smashgg}
                color="#CB333B"
                name="SmashGG"
              />
            )}
            {props.discord && (
              <TournamentProviderLink
                link={props.discord}
                color="#7289DA"
                name="Discord"
              />
            )}
          </div>
          <div
            className={
              props.info ? styles.tourneament_nameOn : styles.tourneament_name
            }
          >
            {" "}
            {props.name}{" "}
          </div>
        </div>

        <div style={{}} />
      </div>
    </div>
  );
}

function Calendar(props) {
  return (
    <div className={props.info ? styles.calendarOn : styles.calendarContainer}>
      <div className={styles.month}>Mar, 2021</div>
      <div className={styles.calendarDiv}>
        <div className={styles.day}>
          <h3>MON</h3>
          <h3>TUE</h3>
          <h3>WED</h3>
          <h3>THU</h3>
          <h3>FRI</h3>
          <h3>SAT</h3>
          <h3>SUN</h3>
        </div>
        <div className={styles.row1}>
          <div className={styles.num}>1</div>
          <div className={styles.num}>2</div>
          <div className={styles.num}>3</div>
          <div className={styles.num}>4</div>
          <div className={styles.num}>5</div>
          <div className={styles.num}>6</div>
          <div className={styles.num}>7</div>
        </div>
        <div className={styles.row2}>
          <div className={styles.num}>8</div>
          <div className={styles.num}>9</div>
          <div className={styles.num}>10</div>
          <div className={styles.num}>11</div>
          <div className={styles.num}>12</div>
          <div className={styles.num}>13</div>
          <div className={styles.num}>14</div>
        </div>
        <div className={styles.row3}>
          <div className={styles.num}>15</div>
          <div className={styles.num}>16</div>
          <div className={styles.num}>17</div>
          <div className={styles.num}>18</div>
          <div className={styles.num}>19</div>
          <div className={styles.num}>20</div>
          <div className={styles.num}>21</div>
        </div>
        <div className={styles.row4}>
          <div className={styles.num}>22</div>
          <div className={styles.num}>23</div>
          <div className={styles.num}>24</div>
          <div className={styles.num}>25</div>
          <div className={styles.num}>26</div>
          <div className={styles.num}>27</div>
          <div className={styles.num}>28</div>
        </div>
      </div>
    </div>
  );
}

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSwr("/api/tournaments", fetcher, {
    refreshInterval: 1000 * 60 * 20,
  });
  let [info, setSidebar] = useState(false);
  let showIt = () => setSidebar((info = true));
  let showOff = () => setSidebar((info = false));
  if (error) return <>{error}</>;
  if (!data)
    return (
      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          backgroundColor: "#0b0b0e",
        }}
      />
    );

  const items = [];
  var currentDay = new Date().getDay();
  if (currentDay == 0) currentDay = 7;
  currentDay--;
  const lastDayToIterate = currentDay === 0 ? 6 : currentDay - 1;
  var i = currentDay;
  var increment = 0;

  while (true) {
    items.push(
      <TournamentDay
        info={info}
        setSidebar={setSidebar}
        day={i == currentDay ? "Today" : dayNames[i]}
        tournaments={data.data[increment].map((value) => (
          <TournamentContainer
            info={info}
            setSidebar={setSidebar}
            showIt={showIt}
            name={value.name}
            discord={value.discord}
            challonge={value.challonge}
            smashgg={value.smashgg}
            time={value.time}
          />
        ))}
      />
    );
    if (i === lastDayToIterate) break;
    if (i === 6) i = 0;
    else i++;
    increment++;
  }
  return (
    <div
      style={{ minHeight: "380px", overflowX: "hidden", overflowY: "hidden" }}
      className="scrollContain"
    >
      <Logo />

      <Link href={"/publish"}>
        <a
          target="_blank"
          className={[styles.link_button, styles.add_button].join(" ")}
          style={{
            position: "absolute",
            right: 20,
            margin: 0,
            maxWidth: 300,
            border: "3px solid lightgreen",
          }}
          rel="noreferrer"
          style={{ visibility: "hidden" }}
        >
          Add your tournaments
        </a>
      </Link>
      <div className={styles.center}>
        <Arrows />
        <Title />
        <Filters />
        <div className={styles.container}>
          <Head>
            <title>SSBM EU Tournaments</title>
            <link rel="icon" href="/logo.png" />
          </Head>
          <Head>
            <title>My page title</title>
            <meta
              name="viewport"
              content="width=375px,initial-scale=1.0"
            ></meta>
          </Head>
          <div
            className={styles.allTournaments}
            id="column"
            style={{ left: "0%" }}
          >
            {items}
          </div>
        </div>
      </div>
      <div className={styles.sideBar}>
        <Calendar info={info} setSidebar={setSidebar} />
        <Nav />
      </div>
      <AddIt info={info} setSidebar={setSidebar} showOff={showOff} />
    </div>
  );
}
