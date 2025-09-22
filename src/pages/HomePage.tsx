import {useLazyGetUserReposQuery, useSearchUsersQuery} from "../store/github/github.api.ts";
import {useEffect, useState} from "react";
import {useDebounce} from "../hooks/debounce.ts";
import RepoCart from "../components/RepoCart.tsx";


const HomePage = () => {
    const [search, setSearch] = useState('salam4ik666')
    const [dropdown, setDropdown] = useState<boolean>(false)
    const debounced = useDebounce(search);
    const{isLoading, isError, data } = useSearchUsersQuery(debounced, {
        skip: debounced.length<3,
        refetchOnFocus: true
    });

    const [fetchRepos, {isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery()
    console.log('repos',repos)
    useEffect(()=>{
        setDropdown(debounced.length>3 && data?.length!>0); // спросить про синтаксис
    },[debounced, data])

    const clickHandler = (username:string) => {
        fetchRepos(username)
        setDropdown(false)
    }

    return (
        <div className={'flex justify-center pt-10 mx-auto h-screen w-screen'}>
            {isError && <p className={'text-center, text-red-600'}>Something went wrong</p>}

            <div className={'relative w-[560]'}>
                <input
                    type="text"
                    className={"border py-2 px-4 w-full h-[42px] mb-2"}
                    placeholder="Search for github user name"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                {dropdown&&<ul className={'list-none absolute top-[42px] left-0 right-0 max-h-[300px] overflow-y-scroll shadow-md bg-white'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, provident?
                    {isLoading && <p className={'text-center'}>Loading...</p>}
                    {data?.map(user=>(
                        <li key={user.id}
                            onClick={()=>clickHandler(user.login)}
                            className={"py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"}
                        >
                            {user.login}
                        </li>
                    ))}
                </ul>}

                <div className="container">
                    {areReposLoading && <p className={"text-center"}>Repos are Loading...</p>}

                    {repos?.map(repo=>
                        <RepoCart
                            repo={repo}
                            key={repo.id}
                        />)
                    }
                </div>

            </div>



        </div>
    );
};

export default HomePage;