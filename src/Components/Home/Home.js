import React from 'react';
import Featured from './Featured/Featured';
import Matches from './Matches/Matches';
import Players from '../Players/Players';

const Home = () => {
  return (
    <div className="bck_blue">
      <Featured />
      <Matches />
      <Players />
    </div>
  );
};

export default Home;
