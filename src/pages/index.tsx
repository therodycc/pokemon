import type { NextPage } from "next";
import React from "react";
import Search from "../components/common/search";
import Layout from "../components/layout";
import PokemonList from "../components/pages/pokemon/pokemon-list";
import { HomePropsI } from "../interfaces/pokemon/pokemon.interface";

const Home: NextPage<HomePropsI> = () => {

  return (
    <React.Fragment>
      <Layout rightSection={<Search />} >
        <PokemonList />
      </Layout>
    </React.Fragment>
  );
};

export default Home;
