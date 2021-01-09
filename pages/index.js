import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import ScrollContainer from 'react-indiana-drag-scroll'
import Image from 'next/image'

const TournamentDay = (props) => (
  <div className={styles.column}>
    <div style={{color: '#C7493A', fontSize: props.day === "Today" ? 72 : 42, lineHeight: '72px'}}>{props.day}</div>
    <div style={{marginTop: 100}} />
    {props.tournaments}
  </div>
);

const TournamentContainer = (props) => (<>
  <div className={styles.tournament_container}>
    {props.name}
    {props.time && <>
    <div style={{marginTop: 25}} />
    <Image src="/clock.png" width="24" height="24" />
    <div style={{marginTop: 5}} />
    <div style={{fontSize: 18}}>{props.time}</div>
    </>}
    <div style={{marginTop: 50}} />
    {props.challonge &&
      <Link href={props.challonge}>
        <a target="_blank" rel="noreferrer" className={styles.link_button} style={{backgroundColor: '#FF9152'}}>Challonge</a>
      </Link>
    }
    {props.discord &&
      <Link href={props.discord}>
        <a target="_blank" rel="noreferrer" className={styles.link_button} style={{backgroundColor: '#7289DA'}}>Discord</a>
      </Link>
    }
    {props.smashgg &&
      <Link href={props.smashgg}>
        <a target="_blank" rel="noreferrer" className={styles.link_button} style={{backgroundColor: '#CB333B'}}>SmashGG</a>
      </Link>
    }
  </div>
</>);

const names = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
]

const tournaments = [
  [],
  [{name: "We will update this all soon!", challonge:"https://challonge.com/de/pwxhs9s0", time: "8 PM CEST"}],
  [],
  [],
  [{name: "LEVO 2", discord: "https://discord.gg/gN5ve7H", smashgg: "https://smash.gg/tournament/levo-eu-1-2", time: "5 PM CEST"}],
  [{name: "LEVO 1", discord: "https://discord.gg/gN5ve7H", smashgg: "https://smash.gg/tournament/levo-eu-1-1", time: "5 PM CEST"}],
  []
];

export default function Home() {
  const items = [];
  var currentDay = new Date().getDay();
  if (currentDay == 0)
    currentDay = 7;
  currentDay--;
  const lastDayToIterate = currentDay === 0 ? 6 : currentDay - 1;
  var i = currentDay;

  while(true) {
    items.push(<TournamentDay day={i == currentDay ? "Today" : names[i]} tournaments={
        tournaments[i].map((value) => <TournamentContainer name={value.name} discord={value.discord} challonge={value.challonge} smashgg={value.smashgg} time={value.time} />)
    } />);
    if (i === lastDayToIterate)
      break;
    if (i === 6)
      i = 0;
    else
      i++;
  }

  return (
    <ScrollContainer style={{backgroundColor: 'black'}}>
      <div className={styles.container}>
        <Head>
          <title>SSBM EU Tournaments</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {items}
      </div>
    </ScrollContainer>
  )
}