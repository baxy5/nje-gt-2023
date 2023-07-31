import React from 'react';
import { teamColorCheck } from '../helper/teamColorCheck';

const Ranking = ({ teams }: { teams: any }) => {
  return (
    <div className="py-8 px-4 grid gap-4">
      {teams.map(team => {
        return (
          <div className="border-2 border-black rounded-sm p-4" style={{ backgroundColor: teamColorCheck(team.name) }}>
            <p
              className={`text-[1.5rem] ${
                team.name === 'Fehér csapat' || team.name === 'Sárga csapat' ? 'text-[#000000]' : 'text-[#FFFFFF]'
              }`}
            >
              {team.name}: <span>{team.points}</span>{' '}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Ranking;
