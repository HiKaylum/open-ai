import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button, Heading, Input, ConvoBox } from '@/components';

import styles from '@/styles/Home.module.scss';

const DEFAULT_STATUS = 'Note: Conversations are saved to your browser\'s local storage, they are not saved to a database. (Press Delete to clear)';

export default function Home() {
  const { user, error, isLoading } = useUser();
  const [ title, setTitle ] = useState('Welcome, have a chat with OpenAI.');
  const [ subTitle, setSubTitle ] = useState('Login to use OpenAI.');
  const [ headingProps, setHeadingProps ] = useState({ subTitle });
  const [ conversation, setConversation ] = useState([]);
  const [ response, setResponse ] = useState();
  const [ isFetching, setIsFetching ] = useState(false);
  const [ status, setStatus ] = useState(DEFAULT_STATUS);

  useEffect(() => {
    if(!user) return;
    
    const storedConversation = localStorage.getItem(user.sub);

    if (!storedConversation) {
      localStorage.setItem(user.sub, JSON.stringify(conversation));
    } else {
      setConversation(JSON.parse(storedConversation));
    }

    const deletLocal = (evt) => {
      const key = evt.key;

      if (key === 'Delete') {
        setConversation([]);
        localStorage.setItem(user.sub, JSON.stringify([]));
      }
    };

    document.addEventListener('keyup', deletLocal);

    return () => {
      document.removeEventListener('keyup', deletLocal);
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!user) return;

    setTitle(`Hi ${user.name}.`);
    setSubTitle('Click to logout.');

    setHeadingProps({
      subTitle,
      asLink: true,
      href: 'api/auth/logout'
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, subTitle]);

  useEffect(() => {
    if (!user) return;

    localStorage.setItem(user.sub, JSON.stringify(conversation));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation]);

  useEffect(() => {
    if (!response) return;
    setConversation([
      ...conversation,
      response
    ]);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  async function handleForm(evt) {
    evt.preventDefault();
    const prompt = evt.target.prompt.value;

    evt.target.reset();

    setConversation([
      ...conversation,
      {
        isUser: true,
        name: user.name,
        picture: user.picture,
        text: prompt,
        time: new Date()
      }
    ]);

    setIsFetching(true);
    setStatus('OpenAI is thinking...');
    const res = await fetch('api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({prompt})
    });

    const data = await res.json();
    setResponse(data);
    setIsFetching(false);
    setStatus(DEFAULT_STATUS);
  }


  if(isLoading) return;
  return (
    <section className={styles.section}>
      <div className={styles.banner}>
        <Heading {...headingProps}>
          <h1>{ title }</h1>
        </Heading>
        { !user && (
          <Button href="api/auth/login">Login</Button>
        ) }
      </div>
      <form onSubmit={handleForm}>
        <Input id="prompt" type="text" placeholder="Say that this is a test" minLength="4" disabled={!user || isFetching} autoComplete="off" required />
        {
          user && (
            <abbr>{ status }</abbr>
          )
        }
      </form>
      <ConvoBox conversation={conversation} />
    </section>
  )
}
