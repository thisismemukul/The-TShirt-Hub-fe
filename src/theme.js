import { createTheme } from '@mui/material/styles';
const theme = createTheme({
    palette: {
        primary: {
            main: '#FFAA2A',
            dark: '#202023',
        },
        secondary: {
            light: '#FF5166',
            main: '#FF5166',
            dark: '#FF5166',
            contrastText: '#000',
        },
    },
});
export default theme;