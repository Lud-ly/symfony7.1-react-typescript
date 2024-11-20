import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';

import framesxTheme from '../theme/Theme';
import Hero from '../components/layout/Hero';
import ColorSchemeToggle from '../components/ui/ColorSchemeToggle';

export default function WelcomePage(props: any) {
  return (
    <CssVarsProvider disableTransitionOnChange theme={framesxTheme}>
      <CssBaseline />
      <ColorSchemeToggle />
      <Box
        sx={{
          height: '100vh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          '& > div': {
            scrollSnapAlign: 'start',
          },
        }}
      >
        <Hero {...props} />
      </Box>
    </CssVarsProvider>
  );
}