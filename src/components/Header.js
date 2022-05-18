import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const Header = () => {

    const dispatch = useDispatch();

    const { beers } = useSelector((state) => state);

    // Call menu and build
    useEffect(() => {
        dispatch({ type: 'BUILD_MENU_REQUEST'})
    }, [])

    return (
        <nav>
            {
                beers.loaded ? 
                <ul>
                    {beers.data.map((item) => {
                        return (<li key={item.path.trim()}>
                            <Link href={`/github${item.path}`}>{item.path}</Link>
                        </li>)
                    })}
                    
                </ul>: 'Carregando'
            }
        </nav>
    )
}

export default Header;