import React from 'react';
import { SxProps, Theme, Typography, useMediaQuery, TypographyProps } from '@mui/material';

type Props = {
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'subtitle1'
    | 'subtitle2'
    | 'caption'
    | 'overline'; // Можливі варіанти
  sx?: SxProps<Theme>;
  title: string;
} & TypographyProps; // Додаємо TypographyProps для передачі інших пропсів

const DynamicText = ({ variant, sx, title, ...props }: Props) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isLargeScreen = useMediaQuery('(min-width:1200px)');

  let fontSize = '16px'; // Стандартний розмір для середнього екрану
  if (isSmallScreen) {
    fontSize = '12px'; // Розмір для малих екранів
  } else if (isLargeScreen) {
    fontSize = '24px'; // Розмір для великих екранів
  }

  return (
    <Typography {...props} variant={variant} sx={{ fontSize, ...sx }}>
      {title}
    </Typography>
  );
};

export default DynamicText;
