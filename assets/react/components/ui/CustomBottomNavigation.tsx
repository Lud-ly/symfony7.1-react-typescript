import React, { useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import { Home, Settings, Person2Outlined } from '@mui/icons-material';
import IconLinkButton from '../buttons/IconLinkButton';
import DrawerFilters from '../layout/DrawerFilters';

export default function CustomBottomNavigation() {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const path = window.location.pathname;
        if (path === '/app') {
            setValue(0);
        } else if (path === '/app/profile') {
            setValue(1);
        }
        else if (path === '/app/admin/settings') {
            setValue(2);
        }
    }, []);

    return (
        <Box
            className="bottomNavigation"
            sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: '128px',
                backgroundColor: 'background.paper',
            }}
        >
            <DrawerFilters />
            <IconLinkButton
                href="/app"
                icon={<Home color={value === 0 ? 'primary' : 'secondary'} />}
                txtSize="sm"
                iconSize='xl'
                onClick={() => setValue(0)}
            />
            <IconLinkButton
                href="/app/profile"
                icon={<Person2Outlined color={value === 1 ? 'primary' : 'secondary'} />}
                txtSize="sm"
                iconSize="xl"
                onClick={() => setValue(2)}
            />
            <IconLinkButton
                href="/app/admin/settings"
                icon={<Settings color={value === 2 ? 'primary' : 'secondary'} />}
                txtSize="sm"
                iconSize="xl"
                onClick={() => setValue(1)}
            />
        </Box>
    );
}
