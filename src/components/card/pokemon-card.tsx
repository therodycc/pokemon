import React, { FC, useState } from "react";
interface PokemonCardPropsI {
    name: string;
    img: string;
}
const PokemonCard: FC<PokemonCardPropsI> = ({ name, img }) => {
    const [image, setImage] = useState<string | null>(null);
    return (
        <div className="card-pokemon position-relative">
            <img
                src={image || img}
                alt=""
                onError={() => {
                    setImage(
                        "https://static-wp-tor15-prd.torcedores.com/wp-content/uploads/2016/08/pokeball-divulgacao.jpg"
                    );
                }}
            />
            <div className="pokemon-card-circle" />
            <h3 className="pokemon-card-name">{name}</h3>
        </div>
    );
};

export default PokemonCard;
