import type { GetStaticProps, NextPage } from "next";
import React from "react";
import Toast from "../components/common/alert/toast";
import Layout from "../components/layout";
import PokemonList from "../components/pages/pokemon/pokemon-list";
import pokemonProvider from "../providers/pokemon.provider";
interface HomePropsI {
  pokemonList: any;
}
const Home: NextPage<HomePropsI> = ({ pokemonList }) => {
  // useEffect(() => {
  //   getTasks()
  // }, []);

  // const getTasks = async () => {
  //   const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${random(1, 100)}`);
  //   const res = await data.json();
  //   setPokemon(res)
  //   console.log({ res })
  //   if (res.sprites.other.dream_world.front_default) {
  //     projects.splice(0, 1, res);
  //   }
  // }

  // const getItems = async () => {
  //   for (let index = 1; index < 100; index++) {
  //     const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
  //     const res = await data.json();
  //     if (res.sprites.other.dream_world.front_default) {
  //       if (!pokemonArray.includes(res)) {
  //         pokemonArray.push(res);
  //       }
  //     }
  //   }
  // }

  // const random = (min: number, max: number) => {
  //   return Math.floor((Math.random() * (max - min + 1)) + min);
  // }

  // const filterItems = () => {
  //   return pokemonArray.filter((item: any) => {
  //     return item.name.match(inputSearch.toLowerCase())
  //   })
  // }

  return (
    <React.Fragment>
      <Layout
        rightSection={
          <div className="menu">
            <input type="text" v-model="inputSearch" placeholder="Search" />
          </div>
        }
      >
        {/* filterItems.length === 0" */}
        {/* v-if="inputSearch.length > 0 && filterItems.length > 0" */}
        <Toast text={"No hemos encontrado nada"} />
        <div className="mt-5">-</div>
        <PokemonList pokemonArray={pokemonList?.results} />
      </Layout>
    </React.Fragment>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data: any = await pokemonProvider.getPokemonList({ limit: 100, offset: 100 })

  return {
    props: {
      pokemonList: data?.data || null,
    },
  };
};

export default Home;
