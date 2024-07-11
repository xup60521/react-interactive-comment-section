import { Fragment, useEffect, useRef, useState } from "react";
import type { Unpacked, data } from "../utils";
import IconReply from "/images/icon-reply.svg";
import IconDelete from "/images/icon-delete.svg";
import IconEdit from "/images/icon-edit.svg";
import { useAtom, useSetAtom } from "jotai";
import { commentsAtom, replyIDAtom } from "../state";
import Reply from "./Reply";
import { useUser } from "./UserProvider";
import Avatar from "./Avatar";
import DeleteDialog from "./DeleteDialog";
import { useVote } from "@/lib/hooks";

export default function Comment(props: Unpacked<typeof data.comments>) {
    const [replyID, setReplyID] = useAtom(replyIDAtom);
    const [replyText, setReplyText] = useState("@" + props.user.username + " ");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { avatar, username } = useUser();
    const [open, setOpen] = useState(false);
    const setComments = useSetAtom(commentsAtom);
    const [isEditing, setIsEditing] = useState(false);
    const [editingText, setEditingText] = useState(props.content);
    const { scoreOffset, userVote, updateVote } = useVote(props.id);

    function addReply() {
        const atPerson = `@${props.user.username}`;
        const regex = new RegExp("^" + atPerson);
        if (!replyText || !username) return;
        let finalContent = "";
        if (regex.test(replyText)) {
            const { length } = atPerson;
            finalContent = replyText.substring(length);
        } else {
            finalContent = replyText;
        }
        setComments((prev) => {
            prev = prev.map((comment) => {
                if (comment.id === props.id) {
                    comment.replies = [
                        ...comment.replies,
                        {
                            id: Math.random(),
                            content: finalContent,
                            createdAt: new Date().toDateString(),
                            score: 0,
                            replyingTo: props.user.username,
                            user: {
                                username,
                            },
                        },
                    ];
                }
                return { ...comment };
            });
            return [...prev];
        });
        setReplyID(null);
        setReplyText("@" + props.user.username + " ");
    }

    function updateComment() {
        const atPerson = `@${props.user.username}`;
        const regex = new RegExp("^" + atPerson);
        if (!editingText || !username || !isEditing) return;
        let finalContent = "";
        if (regex.test(editingText)) {
            const { length } = atPerson;
            finalContent = editingText.substring(length);
        } else {
            finalContent = editingText;
        }
        setComments((prev) => {
            prev = prev.map((comment) => {
                if (comment.id === props.id) {
                    comment.replies = comment.replies.map((reply) => {
                        if (reply.id === props.id) {
                            reply.content = finalContent;
                        }
                        return { ...reply };
                    });
                    if (comment.id === props.id) {
                        comment.content = finalContent;
                    }
                }
                return { ...comment };
            });
            return [...prev];
        });
        setIsEditing(false);
    }

    useEffect(() => {
        if (replyID === props.id && textAreaRef.current) {
            textAreaRef.current.select();
            textAreaRef.current.selectionEnd =
                textAreaRef.current.selectionStart =
                    textAreaRef.current.value.length;
        }
    }, [replyID, props.id]);

    useEffect(() => {
        if (!isEditing) {
            setEditingText(props.content);
        }
    }, [isEditing, props.content, props.user.username]);
    return (
        <Fragment>
            <DeleteDialog open={open} setOpen={setOpen} id={props.id} />
            <div className="bg-white rounded-md flex p-5 gap-5 mt-4 lg:flex-row flex-col-reverse">
                <div className="lg:w-fit w-full flex justify-between">
                    <div className="flex lg:flex-col flex-row w-fit h-fit items-center rounded-lg bg-very_light_gray">
                        <button
                            className={`px-3 py-1 transition text-gray-400 hover:text-moderate_blue font-bold ${
                                userVote === "upvote" &&
                                "text-moderate_blue scale-125"
                            }`}
                            onMouseDown={() => updateVote("upvote")}
                        >
                            +
                        </button>
                        <p className="text-moderate_blue font-rubik font-medium text-center py-1">
                            {props.score + scoreOffset}
                        </p>
                        <button
                            className={`px-3 py-1 transition text-gray-400 hover:text-moderate_blue font-bold ${
                                userVote === "downvote" &&
                                "text-moderate_blue scale-125"
                            }`}
                            onMouseDown={() => updateVote("downvote")}
                        >
                            -
                        </button>
                    </div>
                    <div className="lg:hidden flex items-center gap-4">
                        {username === props.user.username ? (
                            <Fragment>
                                <button
                                    onMouseDown={() => setOpen(true)}
                                    className="flex items-center gap-2 transition hover:opacity-50"
                                >
                                    <img src={IconDelete} alt="delete icon" />
                                    <span className="font-semibold text-soft_red">
                                        Delete
                                    </span>
                                </button>
                                <button
                                    onMouseDown={() => setIsEditing(!isEditing)}
                                    className="flex items-center gap-2 transition hover:opacity-50"
                                >
                                    <img src={IconEdit} alt="edit icon" />
                                    <span className="text-moderate_blue font-semibold">
                                        Edit
                                    </span>
                                </button>
                            </Fragment>
                        ) : (
                            <button
                                onMouseDown={(e) => {
                                    if (!username) {
                                        return;
                                    }
                                    e.preventDefault();
                                    setReplyID(props.id);
                                }}
                                className="flex items-center gap-2 transition hover:opacity-50"
                            >
                                <img src={IconReply} alt="replay icon" />
                                <span className="text-moderate_blue font-semibold">
                                    Reply
                                </span>
                            </button>
                        )}
                    </div>
                </div>
                <div className="flex-grow flex flex-col gap-3">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar
                                username={props.user.username}
                                avatar={props.user.image?.png}
                                size={32}
                            />
                            <span className="font-rubik text-dark_blue font-semibold flex items-center">
                                {props.user.username}
                                {props.user.username === username && (
                                    <p className="text-xs bg-moderate_blue rounded-sm text-white ml-2 font-rubik px-[5px] pt-[1px] pb-[3px] w-fit h-fit">
                                        you
                                    </p>
                                )}
                            </span>
                            <span className="font-rubik text-grayish_blue">
                                {props.createdAt}
                            </span>
                        </div>

                        <div className="lg:flex items-center justify-end gap-4 hidden">
                            {username === props.user.username ? (
                                <Fragment>
                                    <button
                                        onMouseDown={() => setOpen(true)}
                                        className="flex items-center gap-2 transition hover:opacity-50"
                                    >
                                        <img
                                            src={IconDelete}
                                            alt="delete icon"
                                        />
                                        <span className="font-semibold text-soft_red">
                                            Delete
                                        </span>
                                    </button>
                                    <button
                                        onMouseDown={() =>
                                            setIsEditing(!isEditing)
                                        }
                                        className="flex items-center gap-2 transition hover:opacity-50"
                                    >
                                        <img src={IconEdit} alt="edit icon" />
                                        <span className="text-moderate_blue font-semibold">
                                            Edit
                                        </span>
                                    </button>
                                </Fragment>
                            ) : (
                                <button
                                    onMouseDown={(e) => {
                                        if (!username) {
                                            return;
                                        }
                                        e.preventDefault();
                                        setReplyID(props.id);
                                    }}
                                    className="flex items-center gap-2 transition hover:opacity-50"
                                >
                                    <img src={IconReply} alt="replay icon" />
                                    <span className="text-moderate_blue font-semibold">
                                        Reply
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>
                    {!isEditing ? (
                        <p className="font-rubik text-grayish_blue">
                            {props.content}
                        </p>
                    ) : (
                        <Fragment>
                            <textarea
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                                className="rounded-lg resize-none outline-2 font-rubik ring-[1px] ring-light_gray outline-moderate_blue flex-grow px-4 py-2 min-h-24"
                            />
                            <div className="flex justify-end">
                                <button
                                    onMouseDown={updateComment}
                                    className="px-6 py-3 transition hover:opacity-70 rounded-lg bg-moderate_blue font-rubik text-white h-fit"
                                >
                                    UPDATE
                                </button>
                            </div>
                        </Fragment>
                    )}
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
                    value={`${replyText}`}
                />
                <button
                    onMouseDown={addReply}
                    className="px-6 py-3 transition hover:opacity-70 rounded-lg bg-moderate_blue font-rubik text-white h-fit"
                >
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
                    value={`${replyText}`}
                />
                <div className="flex w-full justify-between">
                    <Avatar
                        username={username ?? ""}
                        avatar={avatar}
                        size={40}
                    />

                    <button
                        onMouseDown={addReply}
                        className="px-6 py-3 transition hover:opacity-70 rounded-lg bg-moderate_blue font-rubik text-white h-fit"
                    >
                        REPLY
                    </button>
                </div>
            </div>
            {props.replies.length !== 0 && (
                <div className="flex lg:gap-8 gap-6">
                    <div className="lg:px-[1.15rem] border-r-[1px] border-light_grayish_blue mt-4"></div>
                    <div className="flex flex-col flex-grow">
                        {props.replies.map((item) => (
                            <Reply
                                {...item}
                                key={item.id}
                                commentID={props.id}
                            />
                        ))}
                    </div>
                </div>
            )}
        </Fragment>
    );
}
