import React from 'react';
import Featured from './Featured/Featured';
import Matches from './Matches/Matches';
import Players from '../Players/Players';
import Promotion from './Promotion/Promotion';

const Home = () => {
  return (
    <div className="bck_blue">
      <Featured />
      <Matches />
      <Players />
      <Promotion />
    </div>
  );
};

export default Home;
