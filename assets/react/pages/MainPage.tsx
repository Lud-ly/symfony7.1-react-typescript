import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import CssBaseline from '@mui/joy/CssBaseline';
import framesxTheme from '../Theme';
import CustomBottomNavigation from '../components/ui/CustomBottomNavigation';
import '../styles/app.css';
import Header from '../components/base/Header';

export default function MainPage({ username }: any) {
    return (
        <CssVarsProvider disableTransitionOnChange theme={framesxTheme}>
            <CssBaseline />
            <Header username={username} />
            <Typography
                level="body-xs"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    height: '100vh',
                }}
            >
                Home secure page
            </Typography>

            <CustomBottomNavigation />
        </CssVarsProvider>
    );
}
