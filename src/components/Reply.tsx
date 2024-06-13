import IconReply from "/images/icon-reply.svg";
import type { Unpacked, data } from "../utils";
import { useAtom } from "jotai";
import { replyIDAtom } from "../state";
import { Fragment, useEffect, useRef, useState } from "react";
import { useUser } from "./UserProvider";
import Avatar from "./Avatar";

export default function Reply(
    props: Unpacked<(typeof data.comments)[0]["replies"]>
) {
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
                <div className="flex lg:w-fit justify-between w-full">
                    <div className="flex lg:flex-col h-fit rounded-lg bg-very_light_gray">
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
                            if (!username) {
                                return;
                            }
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
                            <Avatar
                                username={props.user.username}
                                avatar={props.user.image.png}
                                size={32}
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
                                if (!username) {
                                    return;
                                }
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
                        <span className="font-rubik font-semibold text-moderate_blue">
                            {"@" + props.replyingTo + " "}
                        </span>
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
        </Fragment>
    );
}
