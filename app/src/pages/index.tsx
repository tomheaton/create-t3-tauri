import { readTextFile } from "@tauri-apps/api/fs";
import { resolveResource } from "@tauri-apps/api/path";
import { useState, type FormEvent } from "react";
import { api } from "../utils/api";

export default function Index() {
  const context = api.useContext();

  const { data: hello } = api.hello.useQuery({ name: "tomheaton" });
  const { data: posts } = api.getPosts.useQuery();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const createPostMutation = api.createPost.useMutation({
    onSuccess: () => {
      console.log("post created");
      context.getPosts.invalidate();
      setTitle("");
      setContent("");
    },
    onError: () => {
      console.log("failed to create post");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createPostMutation.mutate({
      title,
      content,
    });
  };

  const [testData, setTestData] = useState<string>("");
  const testFiles = async () => {
    const resourcePath = await resolveResource("prisma/schema.prisma");
    const text = await readTextFile(resourcePath);

    setTestData(text);
    console.log(text);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-300 p-4">
      <h1 className="text-5xl font-extrabold tracking-tighter">
        Create T3 Tauri
      </h1>
      <br />
      <p>{hello ?? "none"}</p>
      <br />
      <p>data: {testData}</p>
      <button onClick={testFiles} className="bg-blue-500 px-2 py-1 text-white">
        test
      </button>
      <br />
      <form
        className="flex w-full max-w-sm flex-col gap-y-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="my title"
          className="rounded px-2 py-1"
          required
        />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="my content"
          className="rounded px-2 py-1"
          required
        />
        <button type="submit">Create Post</button>
      </form>
      <br />
      <div className="flex w-full max-w-sm flex-col gap-y-2">
        {posts?.map((post: any) => (
          <div
            key={post.id}
            className="rounded border-2 border-white px-2 py-1"
          >
            <p className="font-semibold">{post.title}</p>
            <p>{post.content}</p>
          </div>
        ))}
        {!posts && <p>No posts found!</p>}
      </div>
    </div>
  );
}
