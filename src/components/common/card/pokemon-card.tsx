import React, { FC, MouseEvent, useCallback, useState } from "react";
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
    const [image, setImage] = useState<string | null>(null);


    const getImageByEmpty = useCallback(() => {
        setImage("/assets/img/not_found.jpeg");
    }, [],)

    return (
        <div className={"card-pokemon"} onClick={onClick}>
            <img
                className={"card-pokemon-img"}
                src={image || img}
                alt=""
                onError={getImageByEmpty}
            />
            <div className={"pokemon-card-circle"} />
            <h3 className={'pokemon-card-name'}>{addSuspensivePoints(name, 13)}</h3>
        </div>
    );
};

export default PokemonCard;
