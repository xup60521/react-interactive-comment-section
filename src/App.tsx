import Comment from "./components/Comment";
import { useAtomValue } from "jotai";
import { commentsAtom } from "./state";
import { Fragment, useRef, useState } from "react";
import { useSetOpenLogin, useUser } from "./components/UserProvider";
import Avatar from "./components/Avatar";

export default function App() {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [replayText, setReplyText] = useState("");
    const { username, avatar } = useUser();
    const comments = useAtomValue(commentsAtom);
    const setOpenLoginDialog = useSetOpenLogin();

    return (
        <main className="w-full min-h-screen bg-very_light_gray flex flex-col items-center">
            <div className="flex flex-col lg:w-[50vw] w-[2/3] lg:px-0 lg:py-12 px-6 py-4">
                {comments.map((item) => (
                    <Comment {...item} key={item.id} />
                ))}
                {username ? (
                    <Fragment>
                        <div
                            className={`p-5 gap-4 rounded-md mt-4 bg-white min-h-32 relative lg:flex hidden`}
                        >
                            <Avatar
                                username={username ?? ""}
                                avatar={avatar}
                                size={40}
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
                                <Avatar
                                    username={username ?? ""}
                                    avatar={avatar}
                                    size={40}
                                />

                                <button className="px-6 py-3 transition hover:opacity-70 rounded-lg bg-moderate_blue font-rubik text-white h-fit">
                                    SEND
                                </button>
                            </div>
                        </div>
                    </Fragment>
                ) : (
                    <div className="w-full rounded-md bg-white mt-4 h-48 flex justify-center items-center gap-2">
                        <span className="font-rubik text-grayish_blue border-b-[1px] border-transparent">
                            Please
                        </span>
                        <button
                            onMouseDown={() => setOpenLoginDialog(true)}
                            className="font-rubik text-grayish_blue group relative"
                        >
                            <span>Login</span>
                            <span
                                className={`absolute -bottom-1 left-1/2 h-0.5 w-0 bg-grayish_blue group-hover:w-1/2 group-hover:transition-all `}
                            ></span>
                            <span
                                className={`absolute -bottom-1 right-1/2 h-0.5 w-0 bg-grayish_blue group-hover:w-1/2 group-hover:transition-all `}
                            ></span>
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
