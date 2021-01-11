import styles from '../styles/Publish.module.css'
import Modal from '../components/Modal.js'
import { providers, signIn, signOut, useSession } from 'next-auth/client'
import { useState } from 'react';
import useSwr from 'swr'
import { CETDate, twoDigitFix } from '../global/Global.js'

const VerificationBadge = (props) => {
    var text;
    var color;

    switch(props.state) {
        case 0:
            text = "Not verified";
            color = "orange";
            break;
        case 1:
            text = "Declined";
            color = "red";
            break;
        case 2:
            text = "Accepted";
            color = "lightgreen";
            break;
    }

    return (
        <div style={{display: 'inline-block', padding: 10, backgroundColor: color, color: 'black', borderRadius: 90, margin: 10, fontSize: 14}}>
            {text}
        </div>
    );
};

const CETTime = () => {
    var d = CETDate();
    return twoDigitFix(d.getHours()) + ":" + twoDigitFix(d.getMinutes());
};

const TournamentFormContainer = (props) => (
    <>
        <div style={{marginTop: 10, marginBottom: 10}}>{props.header}</div>
        {props.children}
    </>
);

const DashboardTournamentCreationContainer = (props) => {
    const [ show, setShow ] = useState(false);
    var error = "";

    const [ tournamentName, setTournamentName ] = useState("");
    const [ smashggURL, setSmashGGURL] = useState("");
    const [ challongeURL, setChallongeURL ] = useState("");
    const [ discordURL, setDiscordURL ] = useState("");
    const [ datetime, setDatetime ] = useState(0);

    if (!tournamentName) {
        error = "Tournament name is missing!";
    } else if (!smashggURL && !challongeURL && !discordURL) {
        error = "You have to specify at least one smashgg url, challonge url or a discord server!"
    } else if (!datetime) {
        error = "Time is invalid!";
    } else if (new Date(datetime).getTime() < CETDate().getTime()) {
        error = "The date and time you have specified is before the current CET time!";
    } else {
        error = "";
    }

    return (<>
        <a className={styles.button} style={{fontSize: 24, padding: 20}} onClick={() => setShow(!show)}>Add new tournament</a>
        <Modal show={show} close={() => setShow(false)} submit={() => {
                if (error)
                    return;
                fetch('/api/submittournament', {method: 'POST', body: JSON.stringify({
                    "name": tournamentName,
                    "datetime": new Date(datetime).getTime(),
                    "challonge": challongeURL,
                    "smashgg": smashggURL,
                    "discord": discordURL,
                    "authorId": props.accessToken,
                    "authorName": props.name
                })}).then(res => res.json()).then(data => {
                    if (data.error) {
                        alert(data.error);
                    }
                });
                setShow(false);
            }}>
            <TournamentFormContainer header="Tournament name">
                <input onChange={() => setTournamentName(event.target.value)} value={tournamentName} style={{width: "30%"}} maxLength={30} placeholder="x weekly #1" />
                <span style={{fontSize: 14, marginLeft: 10}}>Not more than 30 characters!</span>
            </TournamentFormContainer>
            <TournamentFormContainer header="SmashGG link (optional)"><input onChange={() => setSmashGGURL(event.target.value)} value={smashggURL} style={{width: "100%"}} placeholder="smashgg.com/tournament/..." /></TournamentFormContainer>
            <TournamentFormContainer header="Challonge link (optional)"><input onChange={() => setChallongeURL(event.target.value)} value={challongeURL} placeholder="challonge.com/..." /></TournamentFormContainer>
            <TournamentFormContainer header="Discord link (optional)"><input onChange={() => setDiscordURL(event.target.value)} value={discordURL} placeholder="discord.gg/..." /></TournamentFormContainer>
            <TournamentFormContainer header="Date and Time">
                <input type="datetime-local" onChange={() => setDatetime(event.target.value)} value={datetime} style={{backgroundColor: 'white', color: 'black'}} />
                <span style={{fontSize: 14, marginLeft: 10}}>Your time will be converted into CET! CET time right now is <u><CETTime /></u>.</span>
                <span style={{fontSize: 14, marginLeft: 10}}>Also, if you are using Firefox or you don't see the date/time picker, please use chrome for the submission.</span>
            </TournamentFormContainer>
            <div style={{marginTop: 15, fontSize: 16, color: 'darkred'}}>
                {error}
            </div>
        </Modal>
    </>);
};

const fetcher = (url) => fetch(url).then((res) => res.json())
const DashboardContainer = (props) => {
    const { data, error } = useSwr('/api/yourtournaments/' + props.accessToken, fetcher, {refreshInterval: 1000})

    if (error) {
        return "Error!";
    }
    if (!data) {
        return <div className={styles.container} />
    }

    return (
        <div className={styles.dashboard_container}>
            <span style={{fontSize: 48, color: '#C7493A'}}>Your Tournaments</span>
            <div style={{marginTop: 100}} />
            <div style={{display: 'flex'}}>
                <div style={{border: '3px solid lightgray', padding: 30, minWidth: '75vw'}}>
                    {
                    data.data.length === 0 ? <span style={{color: 'lightgray'}}>No tournaments published yet</span> :
                    <>
                    {data.data.map((value, index) => {
                        var d = new Date(Number(value.datetime));
                        d.setUTCHours(d.getUTCHours() + 1);
                        var tournamentId = value._id;
                        return (
                        <div style={{border: '2px solid lightgray', color: 'lightgray', padding: 10, marginBottom: index == data.data.length - 1 ? 0 : 10}}>
                            <u>Name:</u> {value.name}, <u>Datetime:</u> {d.toDateString()} {twoDigitFix(d.getUTCHours())}:{twoDigitFix(d.getMinutes())} CET Time
                            {value.discord && (<div><u>Discord:</u> {value.discord}</div>)}
                            {value.smashgg && (<div><u>SmashGG:</u> {value.smashgg}</div>)}
                            {value.challonge && (<div><u>Challonge:</u> {value.challonge}</div>)}
                            <VerificationBadge state={value.state} />
                            <a style={{display: 'inline-block', padding: 10, backgroundColor: 'red', color: 'black', borderRadius: 90, fontSize: 14, cursor: 'pointer'}}
                                onClick={() => fetch('/api/removetournament', {method: 'POST', body: JSON.stringify({
                                    "tournamentId": tournamentId,
                                    "authorId": props.accessToken
                                })})}>
                                Click here to delete
                            </a>
                        </div>
                        );
                    })}
                    </>
                    }
                </div>
            </div>
            <div style={{marginTop: 100}} />
            <DashboardTournamentCreationContainer name={props.name} accessToken={props.accessToken} />
        </div>);
    };

const LoginContainer = (props) => (
    <div className={styles.container}>
        <span style={{fontSize: 48, color: '#C7493A'}}>Log in</span>
        <div style={{marginTop: 100}} />
        {Object.values(props.providers).map(provider => (
        <div key={provider.name}>
            <a className={styles.button} style={{fontSize: 24, padding: 20, borderRadius: 3}} onClick={() => signIn(provider.id)}>Sign in with {provider.name}</a>
        </div>
        ))}
    </div>
);

export default function Publish({providers}) {
    const [ session, loading ] = useSession()

    if (loading)
        return <div className={styles.container} />

    return (
        session ? <DashboardContainer name={session.user.name} accessToken={session.user.email} /> : <LoginContainer providers={providers} />
    )
}

Publish.getInitialProps = async (context) => {
    return {
      providers: await providers(context)
    }
}