import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import framesxTheme from '../theme/Theme';
import CustomBottomNavigation from '../components/ui/CustomBottomNavigation';
import Header from '../components/base/Header';
import '../styles/app.css';

export default function MainPage({ username }: any) {
    return (
        <CssVarsProvider disableTransitionOnChange theme={framesxTheme}>
            <CssBaseline />
            <Box className="wrapper">
                <Header username={username} />
                <Box className="wbody">
                    <Typography level="body-xs">
                        Home secure page 
                    </Typography>
                </Box>
                <CustomBottomNavigation />
            </Box>
        </CssVarsProvider>
    );
}
