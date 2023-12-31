import { GetStaticProps } from 'next';
import prisma from '../../lib/prisma';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { teamColorCheck } from '../../helper/teamColorCheck';

export const getStaticProps: GetStaticProps = async () => {
  const szurke = await prisma.csapat.findMany({
    where: {
      name: 'Szürke csapat',
    },
  });
  return {
    props: { szurke },
    revalidate: 10,
  };
};

const Szurke = ({ szurke }) => {
  const [points, setPoints] = useState(0);
  const [desc, setDesc] = useState('');
  const [bonusPoints, setBonusPoints] = useState(0);
  const id = szurke[0].id;
  const prevDesc = szurke[0].description;

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/updateScore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ points, desc, bonusPoints, id, prevDesc }),
      });

      if (response.ok) {
        console.log('Data sent successfully');
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="border-2 border-black p-4" style={{ backgroundColor: teamColorCheck(szurke[0].name) }}>
        <h1 className="text-[2rem] text-center text-[#FFFFFF]">
          {szurke[0].name}:<span className="pl-2">{szurke[0].points}</span>
        </h1>
      </div>
      <div>
        <p className="text-[1.5rem] text-center pt-4">Pont hozzáadása</p>
        <form action="" className="py-4 px-4">
          <div>
            <label className="font-bold pr-2">Verseny pont:</label>
            <input
              type="number"
              min="0"
              max="25"
              placeholder="max 25"
              className="border border-black rounded-md w-16"
              onChange={event => setPoints(Number(event.target.value))}
            />
          </div>
          <div className="flex pt-6">
            <label className="font-bold pr-2">Leírás:</label>
            <textarea
              className="border border-black rounded-md w-full"
              onChange={event => setDesc(event.target.value)}
            ></textarea>
          </div>
          <div className="pt-6">
            <label className="font-bold pr-2">Plussz pont:</label>
            <input
              type="number"
              min="0"
              max="5"
              placeholder="max 5"
              className="border border-black rounded-md w-16"
              onChange={event => setBonusPoints(Number(event.target.value))}
            />
          </div>
          <div className="flex items-center justify-center gap-4 pt-6">
            <button
              className="border border-black rounded-md px-4 py-2"
              style={{ backgroundColor: teamColorCheck(szurke[0].name) }}
              onClick={() => handleSubmit()}
            >
              Hozzáad
            </button>
          </div>
        </form>
      </div>
      <div className="border-t-2 border-black px-4 pb-6">
        <p className="text-[1.5rem] text-center pt-4">Eredmények:</p>
        <p>{szurke[0].description}</p>
      </div>
      <Link href="/">
        <div
          className="border-2 border-black text-[#FFFFFF] p-4 text-center"
          style={{ backgroundColor: teamColorCheck(szurke[0].name) }}
        >
          Vissza a ranglistára
        </div>
      </Link>
    </div>
  );
};

export default Szurke;
