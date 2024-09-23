export type ThemeName = 'light' | 'dark';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonScheme = 'normal' | 'positive' | 'negative';

export type InputSize = 'small' | 'medium' | 'large';

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
  input: {
    [key in InputSize]: {
      fontSize: string;
      padding: string;
      width: string;
      height: string;
    };
  };
}

export const lightTheme: Props = {
  name: 'light',
  button: {
    small: {
      fontSize: '8px',
      padding: '10px 16px',
    },
    medium: {
      fontSize: '16px',
      padding: '16px 20px',
    },
    large: {
      fontSize: '20px',
      padding: '16px 24px',
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
      backgroundColor: '#E3E3E3',
      hoverColor: '#A5C8A7',
    },
    negative: {
      color: 'black',
      backgroundColor: '#E3E3E3',
      hoverColor: '#DEB9B9',
    },
  },
  borderRadius: {
    default: '16px',
  },
  input: {
    small: {
      fontSize: '8px',
      padding: '4px 8px',
      width: '250px',
      height: '20px',
    },
    medium: {
      fontSize: '12px',
      padding: '8px 10px',
      width: '300px',
      height: '30px',
    },
    large: {
      fontSize: '20px',
      padding: '10px 12px',
      width: '500px',
      height: '50px',
    },
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
