export type ThemeName = 'light' | 'dark';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonScheme = 'normal' | 'positive' | 'negative';

interface Props {
  name: ThemeName;
  button: {
    [key in ButtonSize]: {
      fontSize: string;
      padding: string;
    };
  };
  buttonScheme: {
    [key in ButtonScheme]: {
      color: string;
      backgroundColor: string;
      hoverColor?: string;
    };
  };
  borderRadius: {
    default: string;
  };
}

export const lightTheme: Props = {
  name: 'light',
  button: {
    small: {
      fontSize: '0.75rem',
      padding: '0.25rem 0.5rem',
    },
    medium: {
      fontSize: '1rem',
      padding: '0.5rem 1rem',
    },
    large: {
      fontSize: '1.5rem',
      padding: '1rem 2rem',
    },
  },
  buttonScheme: {
    normal: {
      color: 'black',
      backgroundColor: '#E3E3E3',
      hoverColor: '#575757',
    },
    positive: {
      color: 'black',
      backgroundColor: '#A5C8A7',
    },
    negative: {
      color: 'black',
      backgroundColor: '#DEB9B9',
    },
  },
  borderRadius: {
    default: '16px',
  },
};

export const darkTheme: Props = {
  ...lightTheme,
  name: 'dark',
};

export const getTheme = (themeName: ThemeName): Props => {
  switch (themeName) {
    case 'light':
      return lightTheme;
    case 'dark':
      return darkTheme;
  }
};
