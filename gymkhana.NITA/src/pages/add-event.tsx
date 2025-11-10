'use client';
import Image from 'next/image';
import EventForm from '../components/EventF/EventForm';

import GymkhanaLogo from '~/assets/Gymkhana_logo.png';
import Link from 'next/link';
import NavMenu from '~/components/nav-menu';
import AddToHomeScreen from '~/components/install-pwa';
import { ActionBar } from '~/app/(user)/components/nav';

//import LoginPage from '../components/LoginPage';
export default function Login() {
  return (
    <div style={{padding:"10px"}}>
      <Link href="/">      <Image src={GymkhanaLogo} alt='GymkhanaLogo'
              width={70}
              height={70}
              className='rounded-full'></Image></Link>
       
      <EventForm />
    </div>
  )
  ;
}
