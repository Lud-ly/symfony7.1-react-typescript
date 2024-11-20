import React from 'react';
import { Box, Typography } from '@mui/joy';
import Logout from '@mui/icons-material/Logout';
import ColorSchemeToggle from '../ui/ColorSchemeToggle';
import IconLinkButton from '../buttons/IconLinkButton';

interface HeaderProps {
    username: string;
}

export default function Header({ username }: HeaderProps) {
    return (
        <Box
            className="header"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            sx={{
                backgroundColor: 'var(--joy-palette-background-surface)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                borderBottom: '1px solid var(--joy-palette-divider)',
                width: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1000,
            }}
        >
            {/* Username */}
            <Box
                className="usernameBox"
                display="flex"
                alignItems="center"
                gap={1}
                sx={{
                    flex: 1,
                    minWidth: 0,
                }}
            >
                <Typography
                    level="h4"
                    className="username"
                    startDecorator="👤"
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {username}
                </Typography>
            </Box>

            {/* Toggle Theme and Logout */}
            <Box display="flex" alignItems="center" gap={2}>
                <ColorSchemeToggle />
                <IconLinkButton
                    href="/logout"
                    icon={<Logout color="secondary" />}
                    txtSize="12px"
                />
            </Box>
        </Box>
    );
}
