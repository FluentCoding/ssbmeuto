import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { dayNames } from '../global/Global.js'
import useSwr from 'swr'
import ScrollContainer from 'react-indiana-drag-scroll'

const TournamentDay = (props) => (
  <div className={styles.column}>
    <div style={{color: '#C7493A', fontSize: 38}}>{props.day}</div>
    <div style={{marginTop: 100}} />
    <div className={styles.scroll} style={{overflowY: 'auto', height: 'calc(100% - 100px)'}}>
        {props.tournaments}
    </div>
  </div>
);

const TournamentContainer = (props) => (<>
  <div className={styles.tournament_container}>
    <span>{props.name}</span>
    {props.time && <>
    <div style={{marginTop: 25}} />
    <Image src="/clock.png" width="24" height="24" />
    <div style={{marginTop: 5}} />
    <div style={{fontSize: 18}}>{props.time}</div>
    </>}
    <div style={{marginTop: 30}} />
    {props.challonge &&
      <Link href={props.challonge}>
        <a target="_blank" rel="noreferrer" className={styles.link_button} style={{backgroundColor: '#FF9152'}}>Challonge</a>
      </Link>
    }
    {props.smashgg &&
      <Link href={props.smashgg}>
        <a target="_blank" rel="noreferrer" className={styles.link_button} style={{backgroundColor: '#CB333B'}}>SmashGG</a>
      </Link>
    }
    {props.discord &&
      <Link href={props.discord}>
        <a target="_blank" rel="noreferrer" className={styles.link_button} style={{backgroundColor: '#7289DA'}}>Discord</a>
      </Link>
    }
  </div>
</>);

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
  const { data, error } = useSwr('/api/tournaments', fetcher, {refreshInterval: 1000 * 60 * 20})

  if (error) return <>{error}</>;
  if (!data) return <div style={{width: '100vw', minHeight: '100vh', backgroundColor: '#0b0b0e'}} />;

  const items = [];
  var currentDay = new Date().getDay();
  if (currentDay == 0)
    currentDay = 7;
  currentDay--;
  const lastDayToIterate = currentDay === 0 ? 6 : currentDay - 1;
  var i = currentDay;
  var increment = 0;

  while(true) {
    items.push(<TournamentDay day={i == currentDay ? "Today" : dayNames[i]} tournaments={
        data.data[increment].map((value) => <TournamentContainer name={value.name} discord={value.discord} challonge={value.challonge} smashgg={value.smashgg} time={value.time} />)
    } />);
    if (i === lastDayToIterate)
      break;
    if (i === 6)
      i = 0;
    else
      i++;
    increment++;
  }

  return (
    <ScrollContainer style={{backgroundColor: '#0b0b0e', minHeight: '100vh'}}>
      <div style={{position: 'fixed', top: 10, left: 10}}>
        <Image src="/logo.png" width="100" height="100" />
      </div>
      <Link href={"/publish"}>
          <a target="_blank" className={[styles.link_button, styles.add_button].join(" ")}
            style={{position: 'absolute', top: 20, right: 20, maxWidth: 300, border: '3px solid lightgreen'}} rel="noreferrer">
            Add your tournaments
          </a>
      </Link>
      <div className={styles.container}>
        <Head>
          <title>SSBM EU Tournaments</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        {items}
      </div>
    </ScrollContainer>
  )
}