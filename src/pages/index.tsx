import React, { useEffect } from 'react';
import prisma from '../../lib/prisma';
import { GetStaticProps } from 'next';
import RankingList from '../../components/RankingList';

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

const Home = ({ csapatok }) => {
  return (
    <div>
      <div className="bg-[#F4BB44] py-4">
        <h1 className="text-[2.5rem] text-center font-bold">NJE GT 2023</h1>
        <p className="text-[1.5rem] text-center">Ranglista</p>
      </div>
      <RankingList teams={csapatok} />
    </div>
  );
};

export default Home;
