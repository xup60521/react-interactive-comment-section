import IconReply from "/images/icon-reply.svg";
import IconDelete from "/images/icon-delete.svg";
import IconEdit from "/images/icon-edit.svg";
import type { Unpacked, data } from "../utils";
import { useAtom, useSetAtom } from "jotai";
import { commentsAtom, replyIDAtom } from "../state";
import { Fragment, useEffect, useRef, useState } from "react";
import { useUser } from "./UserProvider";
import Avatar from "./Avatar";
import DeleteDialog from "./DeleteDialog";

export default function Reply(
    props: Unpacked<(typeof data.comments)[0]["replies"]> & {
        commentID: number;
    }
) {
    const [replyID, setReplyID] = useAtom(replyIDAtom);
    const [replyText, setReplyText] = useState("@" + props.user.username + " ");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { avatar, username } = useUser();
    const [open, setOpen] = useState(false);
    const setComments = useSetAtom(commentsAtom);
    const [isEditing, setIsEditing] = useState(false);
    const [editingText, setEditingText] = useState(
        props.content
    );

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
                if (comment.id === props.commentID) {
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
                if (comment.id === props.commentID) {
                    comment.replies = comment.replies.map(reply => {
                        if (reply.id === props.id) {
                            reply.content = finalContent
                        }
                        return {...reply}
                    })
                    if (comment.id === props.id) {
                        comment.content = finalContent
                    }
                }
                return { ...comment };
            });
            return [...prev];
        });
        setIsEditing(false)
    }

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
            <DeleteDialog open={open} setOpen={setOpen} id={props.id} />
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
                                <button onMouseDown={()=>setIsEditing(!isEditing)} className="flex items-center gap-2 transition hover:opacity-50">
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
                        <div className="hidden lg:flex items-center justify-end gap-4">
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
                                    <button onMouseDown={()=>setIsEditing(!isEditing)} className="flex items-center gap-2 transition hover:opacity-50">
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
                            <span className="font-rubik font-semibold text-moderate_blue">
                            {"@" + props.replyingTo + " "}
                        </span>
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
                                <button onMouseDown={updateComment} className="px-6 py-3 transition hover:opacity-70 rounded-lg bg-moderate_blue font-rubik text-white h-fit">
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
        </Fragment>
    );
}
