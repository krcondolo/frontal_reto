import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { MegoTheme } from "./"

export const AppTheme = ({ children }) => {
    return (
        <ThemeProvider theme={MegoTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
