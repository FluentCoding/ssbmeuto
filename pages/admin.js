import styles from '../styles/Publish.module.css'
import useSwr, { mutate } from 'swr'
import Head from 'next/head'
import { twoDigitFix } from '../global/Global'
import { providers, signIn, useSession } from 'next-auth/client'

const fetcher = (url) => fetch(url).then((res) => res.json())
const DashboardContainer = (props) => {
    const { data, error } = useSwr('/api/admin', fetcher, {refreshInterval: 10000})

    if (error) {
        return "Error!";
    }
    if (!data) {
        return <div className={styles.container} style={{backgroundColor: '#0b0b0e'}} />
    }

    if (data.error) {
        return "You're not an admin!";
    }

    return (
        <div className={styles.dashboard_container}>
            <span style={{fontSize: 48, color: '#C7493A'}}>Unmanaged Tournaments</span>
            <div style={{marginTop: 100}} />
            <div style={{display: 'flex'}}>
                <div style={{border: '3px solid lightgray', padding: 30, minWidth: '75vw'}}>
                    {
                    data.data.length === 0 ? <span style={{color: 'lightgray'}}>No new tournaments submitted yet</span> :
                    <>
                    {data.data.map((value, index) => {
                        var d = new Date(Number(value.datetime));
                        d.setUTCHours(d.getUTCHours() + 1);
                        var tournamentId = value._id;
                        return (
                        <div style={{border: '2px solid lightgray', color: 'lightgray', padding: 10, marginBottom: index == data.data.length - 1 ? 0 : 10}}>
                            <u>Name:</u> {value.name}, <u>Datetime:</u> {d.toDateString()} {twoDigitFix(d.getUTCHours())}:{twoDigitFix(d.getMinutes())} CET Time
                            <div><u>Author name:</u> {value.authorName}</div>
                            {value.discord && (<div><u>Discord:</u> {value.discord}</div>)}
                            {value.smashgg && (<div><u>SmashGG:</u> {value.smashgg}</div>)}
                            {value.challonge && (<div><u>Challonge:</u> {value.challonge}</div>)}
                            <a style={{display: 'inline-block', padding: 10, backgroundColor: 'lightgreen', color: 'black', borderRadius: 90, marginLeft: 10, fontSize: 14, cursor: 'pointer'}}
                                onClick={() => {
                                    fetch('/api/admin', {method: 'POST', body: JSON.stringify({
                                    "tournamentId": tournamentId,
                                    "authorId": value.authorId,
                                    "action": "ACCEPT"
                                    })}).then(res => mutate('/api/admin'));
                                }}>
                                Accept
                            </a>
                            <a style={{display: 'inline-block', padding: 10, backgroundColor: 'red', color: 'black', borderRadius: 90, margin: 10, fontSize: 14, cursor: 'pointer'}}
                                onClick={() => {
                                    fetch('/api/admin', {method: 'POST', body: JSON.stringify({
                                    "tournamentId": tournamentId,
                                    "authorId": value.authorId,
                                    "action": "DECLINE"
                                })}).then(res => mutate('/api/admin'));
                                }}>
                                Decline
                            </a>
                            <a style={{display: 'inline-block', padding: 10, backgroundColor: 'red', color: 'black', borderRadius: 90, fontSize: 14, cursor: 'pointer'}}
                                onClick={() => {
                                    fetch('/api/removetournament', {method: 'POST', body: JSON.stringify({
                                    "tournamentId": tournamentId,
                                    "authorId": value.authorId
                                    })}).then(res => mutate('/api/admin'));
                                }}>
                                Click here to delete the tournament permanently
                            </a>
                        </div>
                        );
                    })}
                    </>
                    }
                </div>
            </div>
            <div style={{marginTop: 100}} />
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
export default function Admin({providers}) {
    const [ session, loading ] = useSession()

    if (loading)
        return <div className={styles.container} />

    return (<>
        <Head>
          <title>Admin - SSBM EU Tournaments</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        {session ? <DashboardContainer name={session.user.name} accessToken={session.user.email} /> : <LoginContainer providers={providers} />}
    </>
    )
}

Admin.getInitialProps = async (context) => {
    return {
      providers: await providers(context)
    }
}