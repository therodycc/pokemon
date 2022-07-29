import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import PokemonPower from '../../components/pages/pokemon-power';
import pokemonProvider from '../../providers/pokemon.provider';
import Layout from '../../components/layout/index';
import ButtonCircle from '../../components/common/button/button-circle';
import { useRouter } from 'next/router';
import { PokemonPowerPagePropsI, SpecifyPokemonI } from '../../interfaces/pokemon/pokemon.interface';

const PokemonPowerPage: NextPage<PokemonPowerPagePropsI> = ({ pokemon }) => {
    const router = useRouter()
    return (
        <React.Fragment>
            <Layout rightSection={
                <ButtonCircle
                    onClick={() => { router.push(`/`) }} >
                    <i className="fa fa-arrow-left"></i>
                </ButtonCircle>
            }>
                <PokemonPower pokemon={pokemon} />
            </Layout>
        </React.Fragment>
    )
}
export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const data = await pokemonProvider.getPokemon(params!.name as string)

    if (!data) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            pokemon: data
        }
    }
}
export default PokemonPowerPage



