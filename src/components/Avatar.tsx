import { RandomAvatar } from "react-random-avatars";
import { Fragment } from "react/jsx-runtime";

export default function Avatar(props: {
    avatar?: string | null;
    username: string;
    size: number;
}) {
    const { username, size } = props;
    let { avatar } = props;
    if (username === "juliusomo") {
        avatar = "/react-interactive-comment-section/images/avatars/image-juliusomo.png"
    }
    if (username === "amyrobson") {
        avatar = "/react-interactive-comment-section/images/avatars/image-amyrobson.png"
    }
    if (username === "maxblagun") {
        avatar = "/react-interactive-comment-section/images/avatars/image-maxblagun.png"
    }
    if (username === "ramsesmiron") {
        avatar = "/react-interactive-comment-section/images/avatars/image-ramsesmiron.png"
    }
    return (
        <Fragment>
            {avatar ? (
                <img
                    src={avatar}
                    alt={`${username} avatar`}
                    style={{
                        height: size,
                        width: size,
                    }}
                />
            ) : (
                <div
                    style={{
                        height: size,
                        width: size,
                    }}
                >
                    <RandomAvatar key={username} name={username} size={size} />
                </div>
            )}
        </Fragment>
    );
}
