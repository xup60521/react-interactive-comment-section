import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { commentsAtom } from "@/state";
import { useSetAtom } from "jotai";

export default function DeleteDialog(props: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: number;
}) {
    const { open, setOpen, id } = props;
    const setComments = useSetAtom(commentsAtom);
    function handleDelete() {
        setComments((prev) => {
            prev = prev
                .map((comment) => {
                    comment.replies = comment.replies.filter(
                        (d) => d.id !== id
                    );
                    return { ...comment };
                })
                .filter((comment) => comment.id !== id);
            return [...prev];
        });
        setOpen(false);
    }
    return (
        <AlertDialog open={open} onOpenChange={(e) => setOpen(e)}>
            <AlertDialogContent className="lg:w-96">
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-rubik">
                        Delete comment
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this comment? This will
                        remove the comment and can't be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onMouseDown={() => setOpen(false)}
                        className="rounded-md transition font-medium hover:opacity-80 bg-grayish_blue text-white py-2 font-rubik"
                    >
                        NO, CANCEL
                    </button>
                    <button
                        onMouseDown={handleDelete}
                        className="rounded-md transition font-medium hover:opacity-80 bg-soft_red text-white py-2 font-rubik"
                    >
                        YES, DELETE
                    </button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}
