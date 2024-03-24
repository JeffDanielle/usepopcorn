import { useState } from "react";
import ListBox from "./ListBox";
import WatchedBox from "./WatchedBox";




const Main = ({ children }) => {


    return (
        <main className="main">
            {children}
        </main>
    );
}

export default Main;