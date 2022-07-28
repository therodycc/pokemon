import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import PokemonPower from '../../components/pages/pokemon-power';
import pokemonProvider from '../../providers/pokemon.provider';
import Layout from '../../components/layout/index';
import ButtonCircle from '../../components/common/button/button-circle';
import { useRouter } from 'next/router';
interface PokemonPowerPagePropsI {
    pokemon: any
}
const PokemonPowerPage: NextPage<PokemonPowerPagePropsI> = ({ pokemon }) => {
    const router = useRouter()
    return (
        <React.Fragment>
            <Layout rightSection={
                <ButtonCircle props={{

                }} onClick={() => {
                    router.push(`/`)
                }} >
                    <i className="fa fa-arrow-left"></i>
                </ButtonCircle>
            }>
                <PokemonPower pokemon={pokemon} />
            </Layout>
        </React.Fragment>
    )
}
export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const data: any = await pokemonProvider.getPokemon(params!.name as string)

    if (!data?.data) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    console.log({ data });
    return {
        props: {
            pokemon: data?.data
        }
    }
}
export default PokemonPowerPage



