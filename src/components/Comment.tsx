import { Fragment, useEffect, useRef, useState } from "react";
import type { Unpacked, data } from "../utils";
import IconReply from "/images/icon-reply.svg";
import { useAtom } from "jotai";
import { replyIDAtom } from "../state";
import Reply from "./Reply";
import { useUser } from "./UserProvider";
import Avatar from "./Avatar";

export default function Comment(props: Unpacked<typeof data.comments>) {
    const [replyID, setReplyID] = useAtom(replyIDAtom);
    const [replayText, setReplyText] = useState(
        "@" + props.user.username + " "
    );
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { avatar, username } = useUser();

    useEffect(() => {
        if (replyID === props.id && textAreaRef.current) {
            textAreaRef.current.select();
            textAreaRef.current.selectionEnd =
                textAreaRef.current.selectionStart =
                    textAreaRef.current.value.length;
        }
    }, [replyID, props.id]);
    return (
        <Fragment>
            <div className="bg-white rounded-md flex p-5 gap-5 mt-4 lg:flex-row flex-col-reverse">
                <div className="lg:w-fit w-full flex justify-between">
                    <div className="flex lg:flex-col flex-row w-fit h-fit items-center rounded-lg bg-very_light_gray">
                        <button className="px-3 py-1 transition text-gray-400 hover:text-moderate_blue font-bold">
                            +
                        </button>
                        <p className="text-moderate_blue font-rubik font-medium text-center py-1">
                            {props.score}
                        </p>
                        <button className="px-3 py-1 transition text-gray-400 hover:text-moderate_blue font-bold">
                            -
                        </button>
                    </div>
                    <button
                        onMouseDown={(e) => {
                            e.preventDefault();
                            setReplyID(props.id);
                        }}
                        className="flex lg:hidden items-center gap-2 transition hover:opacity-50"
                    >
                        <img src={IconReply} alt="replay icon" />
                        <span className="text-moderate_blue font-semibold">
                            Reply
                        </span>
                    </button>
                </div>
                <div className="flex-grow flex flex-col gap-3">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-4">
                            <img
                                src={props.user.image.png}
                                alt={`${props.user.username} avatar`}
                                className="size-8"
                            />
                            <span className="font-rubik text-dark_blue font-semibold">
                                {props.user.username}
                            </span>
                            <span className="font-rubik text-grayish_blue">
                                {props.createdAt}
                            </span>
                        </div>
                        <button
                            onMouseDown={(e) => {
                                e.preventDefault();
                                setReplyID(props.id);
                            }}
                            className="lg:flex hidden items-center gap-2 transition hover:opacity-50"
                        >
                            <img src={IconReply} alt="replay icon" />
                            <span className="text-moderate_blue font-semibold">
                                Reply
                            </span>
                        </button>
                    </div>
                    <p className="font-rubik text-grayish_blue">
                        {props.content}
                    </p>
                </div>
            </div>
            <div
                className={`p-5 gap-4 rounded-md mt-2 bg-white min-h-32 hidden relative ${
                    replyID === props.id ? "lg:flex" : "lg:hidden"
                }`}
            >
                <Avatar username={username ?? ""} avatar={avatar} size={40} />
                <textarea
                    ref={textAreaRef}
                    className="rounded-lg resize-none outline-2 font-rubik ring-[1px] ring-light_gray outline-moderate_blue flex-grow px-4 py-2"
                    onChange={(e) => setReplyText(e.target.value)}
                    value={`${replayText}`}
                />
                <button className="px-6 py-3 transition hover:opacity-70 rounded-lg bg-moderate_blue font-rubik text-white h-fit">
                    REPLY
                </button>
            </div>
            <div
                className={`p-5 gap-4 rounded-md mt-4 mb-4 bg-white min-h-48 relative flex-col lg:hidden ${
                    replyID === props.id ? "flex" : "hidden"
                }`}
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
            {props.replies.length !== 0 && (
                <div className="flex lg:gap-8 gap-6">
                    <div className="lg:px-[1.15rem] border-r-[1px] border-light_grayish_blue mt-4"></div>
                    <div className="flex flex-col">
                        {props.replies.map((item) => (
                            <Reply {...item} key={item.id} />
                        ))}
                    </div>
                </div>
            )}
        </Fragment>
    );
}
