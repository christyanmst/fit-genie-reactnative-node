import { FormEvent, useContext, useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/home.module.scss';

import logoImg from '../../public/logo.svg';

import { Input } from '../components/ui/Input/index';
import { Button } from '../components/ui/Button/index';

import Link from 'next/link';

import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { canSSRGuest } from '../utils/canSSRGuest';
import { RiMailLine, RiLockPasswordLine } from 'react-icons/ri';


export default function Home() {
  const { signIn } = useContext(AuthContext); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    
    if(!(email && password)) {
      toast.warning('Preencha todos os campos');
      return;
    }
    
    setLoading(true);

    const data = {
      email,
      password
    }

    await signIn(data);

    setLoading(false);
  }
  return (
    <>
      <Head>
        <title>
          Fit Genie - Faça seu login
        </title>
      </Head>
      <div className={styles.containerCenter}>
        <div className={styles.login}>
          <Image src={logoImg} alt="Logo Fit Genies" className={styles.logo}/>
          <form onSubmit={handleLogin}>
            <Input icon={RiMailLine} placeholder='Digite seu e-mail' type='text' value={email} onChange={(e) => setEmail(e.target.value) } maxLength={100} required/>
            
            <Input icon={RiLockPasswordLine} placeholder='Digite sua senha' type='password' value={password} onChange={(e) => setPassword(e.target.value) } maxLength={20} required/>

            
            <Button type="submit" loading={loading}>Acessar</Button>
            
            <Link href={"/signup"} className={styles.text}>
              <span >Não possui uma conta? Cadastre-se</span>
            </Link>

          </form>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})
