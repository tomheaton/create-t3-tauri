import { Command } from "@tauri-apps/api/shell";
import { useState } from "react";

import { api } from "../utils/api";

export default function Index() {
  const { data } = api.hello.useQuery({ name: "tomheaton" });

  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleFetch = async () => {
    setMessage("");
    setError("");
    try {
      const res = await fetch("http://localhost:1421/trpc");
      const json = await res.json();
      setMessage(JSON.stringify(json, null, 2));
    } catch (e: any) {
      setError(e.toString());
      // help me
    }
  };

  const handleStartServer = async () => {
    setMessage("");
    setError("");
    try {
      const command = Command.sidecar("binaries/server");
      const output = await command.execute();
      setMessage(JSON.stringify(output, null, 2));
    } catch (e: any) {
      setError(e.toString());
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-blue-200">
      <h1 className="text-5xl font-extrabold tracking-tighter">
        Create T3 Tauri
      </h1>
      <br />
      <p>{data ?? "none"}</p>
      <br />
      <button onClick={handleStartServer}>start server</button>
      <br />
      <button onClick={handleFetch}>fetch from 1421</button>
      <br />
      {error && <p>Error: {error}</p>}
      {message && <p>Message: {message}</p>}
    </div>
  );
}
