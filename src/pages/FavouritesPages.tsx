import {useAppSelector} from "../hooks/redux";


const FavouritesPages = () => {

    const {favourites} = useAppSelector(state => state.github)

    if (favourites.length === 0) {
        return <p className={"text-center"}>No items</p>
    }
    console.log(favourites)
    return (
        <div className={'flex justify-center pt-10 mx-auto h-screen w-screen'}>
            <ul className="list-none ">
                {favourites.map(fav => (
                    <li key={fav} className={"text-center"}>
                        <a href={fav} target="_blank">{fav}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavouritesPages;