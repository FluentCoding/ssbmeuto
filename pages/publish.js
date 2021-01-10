import styles from '../styles/Publish.module.css'
import { providers, signIn, signOut, useSession } from 'next-auth/client'

const LoginContainer = (props) => (<>
    <span style={{fontSize: 48, color: '#C7493A'}}>Log in</span>
    <div style={{marginTop: 50}} />
    <div style={{border: '3px solid white', borderRadius: 30, padding: 50}}>
    {Object.values(props.providers).map(provider => (
        <div key={provider.name}>
          <a style={{fontSize: 24, padding: 15, borderRadius: 3}} onClick={() => signIn(provider.id)}>Sign in with {provider.name}</a>
        </div>
      ))}
    </div>
</>);

export default function Publish({providers}) {
    const [ session, loading ] = useSession()

    return (
        <div className={styles.container}>
            {session ? <></> : <LoginContainer providers={providers} />}
        </div>
    )
}

Publish.getInitialProps = async (context) => {
    return {
      providers: await providers(context)
    }
}