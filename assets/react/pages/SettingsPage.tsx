import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import framesxTheme from '../theme/Theme';
import CustomBottomNavigation from '../components/ui/CustomBottomNavigation';
import '../styles/app.css';
import Table from '@mui/joy/Table';
import Header from '../components/base/Header';
import { SettingsPageProps } from '../types/types';


export default function SettingsPage({ users, username }: SettingsPageProps) {
    if (!users || users.length === 0) {
        return <p>Aucun utilisateur à afficher.</p>;
    }

    return (
        <CssVarsProvider disableTransitionOnChange theme={framesxTheme}>
            <CssBaseline />
            <Header username={username} />
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                p={2}
                sx={{
                    gap: 2,
                }}
            >
                <h2 style={{ textAlign: 'center' }}>Liste des Utilisateurs</h2>

                {/* Responsive table container */}
                <Box
                    sx={{
                        width: {
                            xs: '100%',
                            sm: '90%',
                            md: '75%'
                        },
                        overflowX: 'auto',
                    }}
                >
                    <Table hoverRow>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th style={{ width: '40%' }}>Nom</th>
                                <th>Rôles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user: any) => (
                                <tr key={user.id}>
                                    <td>{user.email}</td>
                                    <td>{user.username}</td>
                                    <td>{Array.isArray(user.roles) ? user.roles.join(', ') : 'Aucun rôle'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Box>
            </Box>

            {/* Navigation inférieure */}
            <CustomBottomNavigation />
        </CssVarsProvider>
    );
}
