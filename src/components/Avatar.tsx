import { RandomAvatar } from "react-random-avatars";
import { Fragment } from "react/jsx-runtime";

export default function Avatar(props: {
    avatar: string | null;
    username: string;
    size: number;
}) {
    const { username, avatar, size } = props;
    return (
        <Fragment>
            {avatar ? (
                <img src={avatar} alt={`${username} avatar`} style={{
                    height: size,
                    width: size
                }} />
            ) : (
                <div style={{
                    height: size,
                    width: size
                }}>
                    <RandomAvatar key={username} name={username} size={size} />
                </div>
            )}
        </Fragment>
    );
}
