import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
interface PokemonCardPropsI {
    name: string;
    img: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

function addSuspensivePoints(text: string, maxLength: number) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    } else {
        return text;
    }
}

const PokemonCard: FC<PokemonCardPropsI> = ({ name, img, onClick }) => {
    const [attempt, setAttempt] = useState(0);

    // Las formas alternativas no tienen dream-world: se prueba official-artwork y luego el sprite.
    const sources = useMemo(() => {
        const id = img.match(/\/(\d+)\.svg$/)?.[1];
        const base = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
        return id
            ? [img, `${base}/other/official-artwork/${id}.png`, `${base}/${id}.png`, "/assets/img/not_found.jpeg"]
            : [img, "/assets/img/not_found.jpeg"];
    }, [img]);

    useEffect(() => setAttempt(0), [img]);

    const handleError = useCallback(() => {
        setAttempt((prev) => Math.min(prev + 1, sources.length - 1));
    }, [sources.length]);

    return (
        <div className={"card-pokemon"} onClick={onClick}>
            <img
                className={"card-pokemon-img"}
                src={sources[attempt]}
                alt=""
                onError={handleError}
            />
            <div className={"pokemon-card-circle"} />
            <h3 className={'pokemon-card-name'}>{addSuspensivePoints(name, 13)}</h3>
        </div>
    );
};

export default PokemonCard;
