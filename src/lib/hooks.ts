import { useUser } from "@/components/UserProvider";
import { votesAtom } from "@/state";
import { useAtom } from "jotai";

export function useVote(id: number) {
    const [votes, setVotes] = useAtom(votesAtom);
    const { username } = useUser();
    const userVote = votes.find(
        (d) => d.commentID === id && d.username === username
    )?.voteType;

    function updateVote(c: "upvote" | "downvote") {
        if (!username) {
            return;
        }
        if (!userVote) {
            setVotes((prev) => [
                ...prev,
                {
                    voteID: Math.random(),
                    username,
                    commentID: id,
                    voteType: c,
                },
            ]);
            return;
        }
        if (userVote === c) {
            setVotes((prev) => [
                ...prev.filter(
                    (d) => !(d.commentID === id && d.username === username)
                ),
            ]);
            return;
        }
        setVotes((prev) => {
            const updated = prev.map((d) => {
                if (d.commentID === id && d.username === username) {
                    d.voteType = c;
                }
                return d;
            });
            return [...updated];
        });
        return;
    }

    return {
        scoreOffset:
            votes.filter((d) => d.commentID === id && d.voteType === "upvote")
                .length -
            votes.filter((d) => d.commentID === id && d.voteType === "downvote")
                .length,
        userVote,
        updateVote,
    };
}
