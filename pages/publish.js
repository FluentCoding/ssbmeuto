import styles from "../styles/Publish.module.css";
import Head from "next/head";
import Modal from "../components/Modal.js";
import Link from "next/link";
import { providers, signIn, useSession } from "next-auth/client";
import { useState } from "react";
import useSwr, { mutate } from "swr";
import { CETDate, twoDigitFix } from "../global/Global.js";

const VerificationBadge = (props) => {
  var text;
  var text1;
  var text2;
  var color;

  switch (props.state) {
    case 0:
      text = "Not verified";
      color = "white";
      break;
    case 1:
      text1 = "Declined";
      color = "white";
      break;
    case 2:
      text2 = "Accepted";
      color = "white";
      break;
  }

  return (
    <div className={styles.acceptInfo} style={{}}>
      {text}
      {text1}
      {text2}
    </div>
  );
};

const CETTime = () => {
  var d = CETDate();
  return twoDigitFix(d.getHours()) + ":" + twoDigitFix(d.getMinutes());
};

const TournamentFormContainer = (props) => (
  <>
    <div style={{ marginTop: 10, marginBottom: 10 }}>{props.header}</div>
    {props.children}
  </>
);

const DashboardTournamentCreationContainer = () => {
  const [show, setShow] = useState(false);
  var error = "";

  const [tournamentName, setTournamentName] = useState("");
  const [smashggURL, setSmashGGURL] = useState("");
  const [challongeURL, setChallongeURL] = useState("");
  const [discordURL, setDiscordURL] = useState("");
  const [datetime, setDatetime] = useState(0);

  if (!tournamentName) {
    error = "Tournament name is missing!";
  } else if (!smashggURL && !challongeURL && !discordURL) {
    error =
      "You have to specify at least one smashgg url, challonge url or a discord server!";
  } else if (!datetime) {
    error = "Time is invalid!";
  } else if (new Date(datetime).getTime() < CETDate().getTime()) {
    error =
      "The date and time you have specified is before the current CET time!";
  } else {
    error = "";
  }

  return (
    <>
      <a className={styles.button} onClick={() => setShow(!show)}>
        Add new tournament
      </a>
      <Modal
        show={show}
        close={() => setShow(false)}
        submit={() => {
          if (error) return;
          fetch("/api/submittournament", {
            method: "POST",
            body: JSON.stringify({
              name: tournamentName,
              datetime: new Date(datetime).getTime(),
              challonge: challongeURL,
              smashgg: smashggURL,
              discord: discordURL,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                alert(data.error);
              } else {
                mutate("/api/yourtournaments");
              }
            });
          setShow(false);
        }}
      >
        <TournamentFormContainer>
          <div className={styles.add}>Add Tournament</div>
        </TournamentFormContainer>
        <TournamentFormContainer className={styles.form}>
          <input
            onChange={() => setTournamentName(event.target.value)}
            value={tournamentName}
            className={styles.nameIn}
            maxLength={30}
            placeholder="Name"
          />
          <span style={{ fontSize: 14, color: "black" }}></span>
        </TournamentFormContainer>
        <TournamentFormContainer>
          <input
            className={styles.entrantsIn}
            placeholder="Number of entrants"
          />
        </TournamentFormContainer>
        <TournamentFormContainer>
          <input
            type="datetime-local"
            onChange={() => setDatetime(event.target.value)}
            value={datetime}
            className={styles.dateIn}
          />
        </TournamentFormContainer>
        <TournamentFormContainer>
          <input
            onChange={() => setSmashGGURL(event.target.value)}
            value={smashggURL}
            className={styles.smashggIn}
            placeholder="Links"
          />
        </TournamentFormContainer>
        <TournamentFormContainer>
          <input
            onChange={() => setChallongeURL(event.target.value)}
            style={{ top: "5px" }}
            className={styles.challongeIn}
            value={challongeURL}
            placeholder="Links"
          />
        </TournamentFormContainer>
        <TournamentFormContainer>
          <input
            onChange={() => setDiscordURL(event.target.value)}
            style={{ top: "-90px" }}
            className={styles.discordIn}
            value={discordURL}
            placeholder="Links"
          />
        </TournamentFormContainer>

        <div
          style={{
            fontSize: 16,
            color: "black",
            marginTop: "100px",
            marginLeft: "80px",
          }}
        >
          {error}
        </div>
      </Modal>
    </>
  );
};

function Measure() {
  return <div className={styles.measure}></div>;
}

const Nav = (props) => (
  <div className={styles.navbar}>
    <Link href={"/"}>
      <div className={styles.navhome}>
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
            d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
          />
          <path
            fill-rule="evenodd"
            d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
          />
        </svg>
      </div>
    </Link>
    <div className={styles.navtournaments}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        fill="black"
        class="bi bi-people"
        className={styles.person}
        viewBox="0 0 16 16"
      >
        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        <path
          fill-rule="evenodd"
          d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
        />
        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
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

const fetcher = (url) => fetch(url).then((res) => res.json());
const DashboardContainer = (props) => {
  const { data, error } = useSwr("/api/yourtournaments", fetcher, {
    refreshInterval: 10000,
  });

  if (error) {
    return "Error!";
  }
  if (!data) {
    return <div className={styles.container} />;
  }

  return (
    <div className={styles.dashboard_container}>
      <DashboardTournamentCreationContainer
        style={{ width: "100%", height: "100%", position: "relative" }}
      />
      <span className={styles.tourneyTitle}>Your Tournaments</span>
      <div style={{ marginTop: 100 }} />
      <div style={{ display: "flex" }} className={styles.tourneyContainer}>
        <div style={{ padding: 30 }}>
          {data.data.length === 0 ? (
            <span style={{ color: "lightgray" }}>
              No tournaments submitted yet
            </span>
          ) : (
            <>
              {data.data.map((value, index) => {
                var d = new Date(Number(value.datetime));
                d.setUTCHours(d.getUTCHours() + 1);
                var tournamentId = value._id;
                return (
                  <div
                    style={{
                      color: "white",
                      marginBottom: index == data.data.length - 1 ? 0 : 10,
                    }}
                    className={styles.tourney}
                  >
                    <div className={styles.tourneyDiv}>
                      <div className={styles.name}>{value.name}</div>
                      <VerificationBadge state={value.state} />
                      <a
                        className={styles.remove}
                        style={{
                          display: "inline-block",
                          backgroundColor: "white",
                          color: "black",
                          fontSize: 14,
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          fetch(
                            "/api/removetournament/" + tournamentId
                          ).then((res) => mutate("/api/yourtournaments"));
                        }}
                      ></a>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      <div style={{ marginTop: 100 }} />
    </div>
  );
};

const LoginContainer = (props) => (
  <div className={styles.container}>
    <span style={{ fontSize: 48, color: "#C7493A" }}>Log in</span>
    <div style={{ marginTop: 100 }} />
    {Object.values(props.providers).map((provider) => (
      <div key={provider.name}>
        <a
          className={styles.button}
          style={{ fontSize: 24, padding: 20, borderRadius: 3 }}
          onClick={() => signIn(provider.id)}
        >
          Sign in with {provider.name}
        </a>
      </div>
    ))}
  </div>
);

export default function Publish({ providers }) {
  const [session, loading] = useSession();

  if (loading) return <div className={styles.container} />;

  return (
    <>
      <Head>
        <title>Publish - SSBM EU Tournaments</title>
        <link rel="icon" href="/logo.png" />

        <meta name="viewport" content="width=375px,initial-scale=1.0"></meta>
      </Head>
      <Measure />
      {session ? (
        <DashboardContainer
          name={session.user.name}
          accessToken={session.user.email}
        />
      ) : (
        <LoginContainer providers={providers} />
      )}
      <div className={styles.sideBar}>
        <Nav />
      </div>
    </>
  );
}

Publish.getInitialProps = async (context) => {
  return {
    providers: await providers(context),
  };
};

/*
<u>Datetime:</u> {d.toDateString()} {twoDigitFix(d.getUTCHours())}:{twoDigitFix(d.getMinutes())} CET Time
                            {value.discord && (<div><u>Discord:</u> {value.discord}</div>)}
                            {value.smashgg && (<div><u>SmashGG:</u> {value.smashgg}</div>)}
                            {value.challonge && (<div><u>Challonge:</u> {value.challonge}</div>)}*/
