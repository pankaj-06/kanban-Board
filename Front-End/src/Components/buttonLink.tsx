import { Link } from "@mui/material";
import { NavigateFunction } from "react-router-dom";


interface IButtonLink {
    navigate: NavigateFunction
    label: string;
    path: string;
    style?: React.CSSProperties,
    onClick?: () => void;
}

const ButtonLink = (props: IButtonLink) => {
    return <Link
        component="button"
        variant="body2"
        color={"inherit"}
        underline="hover"
        style={{ ...props.style }}
        onClick={() => {
            if (props.onClick) {
                props.onClick();
            }
            props.navigate(props.path);
        }}
    >
        {props.label}
    </Link>
}

export default ButtonLink;