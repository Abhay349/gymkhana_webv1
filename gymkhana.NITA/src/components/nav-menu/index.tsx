'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu';
import { Button } from '../ui/button';

import { FaInstagram, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';
import type { IconType } from 'react-icons/lib';
import { getSocialImage } from '~/lib/utils';

const NavMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>

        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Button asChild variant="ghost">
            <Link href="/gymkhanaPage">About</Link>
          </Button>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/clubs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Clubs
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/events" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Events
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* Forms Section Updated */}
        {/* <NavigationMenuItem>
          <a 
            href="https://docs.google.com/forms/d/1Gxv--RFYgLxoyLa3T0iSQeKIO9IiuJPTaaILDfhwLEM/edit"
            target="_blank" 
            rel="noopener noreferrer"
            className={navigationMenuTriggerStyle()}
          >
            Forms
          </a>
        </NavigationMenuItem>  */}

      </NavigationMenuList>
    </NavigationMenu>
  );
};

interface Props {
  title: string;
  href: string;
  Icon?: IconType;
}

const ListItem = ({ title, href }: Props) => {
  return (
    <NavigationMenuLink asChild>
      <Button variant='ghost' asChild className='w-full'>
        <Link href={href} className='flex flex-row items-center justify-start gap-2'>
          <Image src={getSocialImage(href)} alt={title} width={24} height={24} />
          <div>{title}</div>
        </Link>
      </Button>
    </NavigationMenuLink>
  );
};

export default NavMenu;
