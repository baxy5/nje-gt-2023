import React, { useEffect } from 'react';
import prisma from '../../lib/prisma';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const csapatok = await prisma.csapat.findMany();
  return {
    props: { csapatok },
    revalidate: 10,
  };
};
//npx prisma studio
const Home = ({csapatok}) => {
  useEffect(() => {
    console.log(csapatok)
  })

  return (
    <div>
      <h1 className="uppercase underline">nje gt 2023</h1>
      <p>{csapatok[0].name}</p>
    </div>
  );
};

export default Home;
