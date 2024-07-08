import { RandomAvatar } from "react-random-avatars";
import { Fragment } from "react/jsx-runtime";
import J from "/images/avatars/image-juliusomo.png";
import A from "/images/avatars/image-amyrobson.png";
import M from "/images/avatars/image-maxblagun.png";
import R from "/images/avatars/image-ramsesmiron.png";

export default function Avatar(props: {
    avatar?: string | null;
    username: string;
    size: number;
}) {
    const { username, size } = props;
    let { avatar } = props;
    if (username === "juliusomo") {
        avatar = J;
    }
    if (username === "amyrobson") {
        avatar = A;
    }
    if (username === "maxblagun") {
        avatar = M;
    }
    if (username === "ramsesmiron") {
        avatar = R;
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
