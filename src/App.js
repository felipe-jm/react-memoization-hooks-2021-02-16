import React, { useState } from "react";

import { likesCounter } from "./Services/expensiveCalculation";

import { HeadCounter } from "./Components/Counter";
import { FabButton } from "./Components/FabButton";
import { RepositoryList } from "./Components/RepositortList";
import Navbar from "./Components/Navbar";

const SEARCH = "https://api.github.com/search/repositories";

function App() {
  const [totalLikes, setTotalLikes] = useState(0);
  const [dark, setDark] = useState(false);

  const getRepositories = React.useCallback((query) => {
    return fetch(`${SEARCH}?q=${query}`);
  }, []);

  const likes = React.useMemo(() => likesCounter(totalLikes), [totalLikes]);

  const theme = React.useMemo(
    () => ({
      color: dark ? "#fff" : "#333",
      navbar: dark ? "#1a202c" : "#e5e7eb",
      backgroundColor: dark ? "#333" : "#fff",
    }),
    [dark]
  );

  const toogleDarkmode = () => setDark(!dark);

  React.useEffect(() => console.log("Theme changes"), [theme])

  return (
    <div style={theme} className="App">
      <Navbar theme={theme.navbar} toogleDarkmode={toogleDarkmode} />
      <HeadCounter likes={likes} />
      <RepositoryList getRepositories={getRepositories} />
      <FabButton totalLikes={totalLikes} setTotalLikes={setTotalLikes} />
    </div>
  );
}

export default App;
