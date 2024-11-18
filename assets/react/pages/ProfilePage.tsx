import * as React from 'react';
import { useState, useEffect } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Alert from '@mui/joy/Alert';

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CustomBottomNavigation from '../components/ui/CustomBottomNavigation';
import Header from '../components/base/Header';

export default function ProfilePage({ username }) {

    // Initialisation du state avec les données de l'utilisateur
    const [formData, setFormData] = useState({
        username: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Mise à jour du formulaire quand les données utilisateur sont disponibles
    useEffect(() => {
        setFormData({
            username: username || '',
        });
    }, [username]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('/api/profile/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du profil');
            }

            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!username) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert color="warning">
                    Aucune donnée utilisateur disponible
                </Alert>
            </Box>
        );
    }

    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Header username={username} />
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'background.body',
                }}
            >
                <Stack
                    spacing={4}
                    sx={{
                        display: 'flex',
                        maxWidth: '800px',
                        width: '100%',
                        px: { xs: 2, md: 6 },
                        py: { xs: 2, md: 3 },
                    }}
                >
                    {error && (
                        <Alert color="danger" variant="soft">
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert color="success" variant="soft">
                            Profil mis à jour avec succès
                        </Alert>
                    )}

                    <Card>
                        <Box sx={{ mb: 1 }}>
                            <Typography level="title-md">
                                <Typography component="span" sx={{ color: '#0056b3', fontWeight: 'bold' }}>
                                    Profil de{' '}
                                </Typography>
                                <span>{username}</span>
                            </Typography>
                            <Typography level="body-sm">
                                Mettez à jour vos informations personnelles
                            </Typography>
                        </Box>
                        <Divider />
                        <form onSubmit={handleSubmit}>
                            <Stack
                                spacing={3}
                                sx={{ my: 1 }}
                            >
                                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                    <FormControl>
                                        <FormLabel>Nom d'utilisateur</FormLabel>
                                        <Input
                                            size="sm"
                                            name="username"
                                            value={username}
                                            onChange={handleChange}
                                            required
                                            startDecorator={<PersonRoundedIcon />}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            size="sm"
                                            type="email"
                                            name="email"
                                            value="e@mail.com"
                                            onChange={handleChange}
                                            required
                                            startDecorator={<EmailRoundedIcon />}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Mot de passe (laisser vide si inchangé)</FormLabel>
                                        <Input
                                            size="sm"
                                            type="password"
                                            name="password"
                                            value="secret"
                                            onChange={handleChange}
                                            startDecorator={<LockRoundedIcon />}
                                        />
                                    </FormControl>
                                </Stack>
                            </Stack>

                            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                    <Button
                                        size="sm"
                                        variant="outlined"
                                        color="neutral"
                                        type="button"
                                    >
                                        Annuler
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        type="submit"
                                        loading={isLoading}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Mise à jour...' : 'Mettre à jour'}
                                    </Button>
                                </CardActions>
                            </CardOverflow>
                        </form>
                    </Card>
                </Stack>
            </Box>
            <CustomBottomNavigation />
        </CssVarsProvider>
    );
}