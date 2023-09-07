import {Button} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";

type Props = {
    theme: string;
    onChangeTheme: (item: string) => void
};
export function Settings({theme, onChangeTheme}: Props) {
    const themes = ['light', 'dark', 'cyberpunk', 'aqua', 'coffee'];
    const navigate = useNavigate();

    return(
        <>
            <Button variant="text" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-arrow-left mr-4"></i>
                Return
            </Button>
            <h2 className="text-base-content mt-4">Themes</h2>
            <div className="flex gap-4 mt-4">
                {themes.map(item => <Button key={item} onClick={() => onChangeTheme(item)} variant="outlined" color="gray">
                    {theme === item && <i className="fa-solid fa-circle-check mr-4"></i>}
                    {item}
                </Button>)}
            </div>
        </>
    );
}