import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@/components/ui/button";

function App() {
  const [data, setData] = useState(0);
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:5173/api/expenses/total-spent");
      const data = await res.json();
      setData(data.totalSpent);
    })();
  }, []);

  return (
    <>
      <div className="bg-background">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>spent is {data}</p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Button className="bg-secondary">Hello</Button>
    </>
  );
}

export default App;
