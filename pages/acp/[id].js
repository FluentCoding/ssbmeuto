import styles from '../../styles/Publish.module.css'
import { useRouter } from 'next/router'
import useSwr from 'swr'
import { acp } from '../../global/Global'

const fetcher = (url) => fetch(url).then((res) => res.json())
const DashboardContainer = (props) => {
    const { data, error } = useSwr('/api/unmanagedtournaments/' + acp, fetcher, {refreshInterval: 1000})

    if (error) {
        return "Error!";
    }
    if (!data) {
        return <div className={styles.container} />
    }

    return (
        <div className={styles.dashboard_container}>
            <span style={{fontSize: 48, color: '#C7493A'}}>Unmanaged Tournaments</span>
            <div style={{marginTop: 100}} />
            <div style={{display: 'flex'}}>
                <div style={{border: '3px solid lightgray', padding: 30, minWidth: '75vw'}}>
                    {
                    data.data.length === 0 ? <span style={{color: 'lightgray'}}>No tournaments created yet</span> :
                    <>
                    {data.data.map((value, index) => {
                        var d = new Date(Number(value.datetime));
                        var tournamentId = value._id;
                        return (
                        <div style={{border: '2px solid lightgray', color: 'lightgray', padding: 10, marginBottom: index == data.data.length - 1 ? 0 : 10}}>
                            <u>Name:</u> {value.name}, <u>Datetime:</u> {d.toDateString()} {d.getHours()}:{d.getMinutes()} CET Time
                            {value.discord && (<div><u>Discord:</u>{value.discord}</div>)}
                            {value.smashgg && (<div><u>SmashGG:</u> {value.smashgg}</div>)}
                            {value.challonge && (<div><u>Challonge: </u> + {value.challonge}</div>)}
                            <a style={{display: 'inline-block', padding: 10, backgroundColor: 'lightgreen', color: 'black', borderRadius: 90, marginLeft: 10, fontSize: 14, cursor: 'pointer'}}
                                onClick={() => fetch('/api/unmanagedtournaments/' + acp, {method: 'POST', body: JSON.stringify({
                                    "tournamentId": tournamentId,
                                    "authorId": value.authorId,
                                    "action": "ACCEPT"
                                })})}>
                                Accept
                            </a>
                            <a style={{display: 'inline-block', padding: 10, backgroundColor: 'red', color: 'black', borderRadius: 90, margin: 10, fontSize: 14, cursor: 'pointer'}}
                                onClick={() => fetch('/api/unmanagedtournaments/' + acp, {method: 'POST', body: JSON.stringify({
                                    "tournamentId": tournamentId,
                                    "authorId": value.authorId,
                                    "action": "DECLINE"
                                })})}>
                                Decline
                            </a>
                            <a style={{display: 'inline-block', padding: 10, backgroundColor: 'red', color: 'black', borderRadius: 90, fontSize: 14, cursor: 'pointer'}}
                                onClick={() => fetch('/api/removetournament', {method: 'POST', body: JSON.stringify({
                                    "tournamentId": tournamentId,
                                    "authorId": value.authorId
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
        </div>);
    };

export default function Publish() {
    const router = useRouter()
    const { id } = router.query

    if (id !== acp) {
        return null;
    }

    return (
        <DashboardContainer />
    )
}