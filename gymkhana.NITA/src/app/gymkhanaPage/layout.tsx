import React from 'react';

import { Navbar } from '~/components';

import MobileNavbar from '~/app/(user)/components/sidebar/mobile';


import { homePageItems } from '~/lib/data';



const aboutLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='flex flex-col'>
      <div className='hidden lg:flex'>
        <Navbar />
      </div>
      <MobileNavbar items={homePageItems} />
      <div className=''>{children}</div>
    </div>
  );
};

export default aboutLayout;
