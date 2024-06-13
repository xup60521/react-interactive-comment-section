import Comment from "./components/Comment";
import { useAtomValue } from "jotai";
import { commentsAtom } from "./state";
import { data } from "./utils";
import { useRef, useState } from "react";
import { useUser } from "./components/UserProvider";

export default function App() {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [replayText, setReplyText] = useState("");
    const {avatar} = useUser()
    const comments = useAtomValue(commentsAtom);
    return (
        <main className="w-full min-h-screen bg-very_light_gray flex flex-col items-center">
            <div className="flex flex-col lg:w-[50vw] w-full lg:px-0 lg:py-12 px-6 py-4">
                {comments.map((item) => (
                    <Comment {...item} key={item.id} />
                ))}
                <div
                    className={`p-5 gap-4 rounded-md mt-4 bg-white min-h-32 relative lg:flex hidden`}
                >
                    <img
                        src={avatar ?? ""}
                        alt="my avatar"
                        className="size-10"
                    />
                    <textarea
                        ref={textAreaRef}
                        placeholder="Add a comment..."
                        className="rounded-lg resize-none outline-2 ring-[1px] ring-light_gray outline-moderate_blue font-rubik flex-grow px-4 py-2"
                        onChange={(e) => setReplyText(e.target.value)}
                        value={`${replayText}`}
                    />
                    <button className="px-6 py-3 transition hover:opacity-70 rounded-lg bg-moderate_blue font-rubik text-white h-fit">
                        SEND
                    </button>
                </div>
                <div
                    className={`p-5 gap-4 rounded-md mt-4 mb-4 bg-white min-h-48 relative flex flex-col lg:hidden`}
                >
                    <textarea
                        ref={textAreaRef}
                        placeholder="Add a comment..."
                        className="rounded-lg resize-none outline-2 ring-[1px] ring-light_gray outline-moderate_blue font-rubik flex-grow px-4 py-2"
                        onChange={(e) => setReplyText(e.target.value)}
                        value={`${replayText}`}
                    />
                    <div className="flex w-full justify-between">
                        <img
                            src={data.currentUser.image.png}
                            alt="my avatar"
                            className="size-10"
                        />

                        <button className="px-6 py-3 transition hover:opacity-70 rounded-lg bg-moderate_blue font-rubik text-white h-fit">
                            SEND
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
