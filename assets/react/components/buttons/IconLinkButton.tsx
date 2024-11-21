import React from 'react';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { ColorPaletteProp } from '@mui/joy';
import { LmIconButtonProps } from '../../types/types';

export default function CustomIconButton({
  href,
  icon,
  txtSize = 'md',
  iconSize = 'md',
  label,
  iconColor = 'neutral',
  txtColor = 'inherit'
}: LmIconButtonProps) {

  const sizeMap: { [key: string]: string } = {
    sm: '20px',
    md: '24px',
    lg: '32px',
    xl: '48px',
    xxl: '64px',
  };

  // Taille de l'icône
  const iconSizeMapped = sizeMap[iconSize] || iconSize;

  // Taille du texte
  const txtSizeMapped = sizeMap[txtSize] || txtSize;

  const handleClick = () => {
    window.location.href = href;
  };
  return (
    <IconButton
      onClick={handleClick}
      sx={{
        color: iconColor,
        fontSize: iconSizeMapped,
        padding: 0,
      }}
    >
      {icon && React.isValidElement(icon) &&
        React.cloneElement(icon as React.ReactElement, {
          sx: { fontSize: iconSizeMapped, color: iconColor }
        })
      }
      <Typography
        level="inherit"
        color={txtColor as ColorPaletteProp}
        sx={{ fontSize: txtSizeMapped }}
      >
        {label}
      </Typography>
    </IconButton>
  );
}
