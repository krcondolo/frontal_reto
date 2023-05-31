import { createTheme } from "@mui/material";
import { red, amber, lightBlue } from "@mui/material/colors";

export const MegoTheme = createTheme({
    palette: {
        primary: {
            main: '#06B8FA'
        },
        secondary: {
            main: '#FFF000'
        },
        error: {
            main: red.A400
        }
    }
})


