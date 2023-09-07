import { api } from "../utils/api";

export default function Index() {
  const { data } = api.hello.useQuery({ name: "tomheaton" });

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-blue-300">
      <h1 className="text-5xl font-extrabold tracking-tighter">
        Create T3 Tauri
      </h1>
      <br />
      <p>{data ?? "none"}</p>
    </div>
  );
}
