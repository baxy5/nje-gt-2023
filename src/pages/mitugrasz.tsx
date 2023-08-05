import React, { useEffect } from 'react';
import prisma from '../../lib/prisma';
import { GetStaticProps } from 'next';
import RankingList from '../../components/RankingList';
import Image from 'next/image';

import logo from '../../public/hoklogo.png';

export const getStaticProps: GetStaticProps = async () => {
  const csapatok = await prisma.csapat.findMany({
    orderBy: {
      points: 'desc',
    },
  });
  return {
    props: { csapatok },
    revalidate: 10,
  };
};

const Mitugrasz = ({ csapatok }) => {
  return (
    <div>
      <div className="bg-[#F4BB44] py-4 flex flex-col justify-center items-center">
        <Image src={logo} width={150} height={150} alt='logo' />
        <h1 className="text-[2.5rem] text-center font-bold">NJE GT 2023</h1>
        <p className="text-[1.5rem] text-center">Ranglista</p>
      </div>
      <RankingList teams={csapatok} />
    </div>
  );
};

export default Mitugrasz;
