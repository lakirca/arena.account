export interface Theme {
  name: string;
  properties: any;
}

export const dawn: Theme = {
  name: 'dawn',
  properties: {
    '--background-default': '#171a22',
    '--background-secondary': 'rgb(12, 16, 36)',
    '--background-teritary': '#5e636d',
    '--foreground-default': 'white',
    '--foreground-secondary': 'rgba(255, 255, 255, 0.7)',
    '--foreground-teritary': '#f74e6c',
    '--primary-default': '#3f51b5',
    '--primary-dark': 'rgb(12, 16, 36)',
    '--primary-light': 'rgba(130, 177, 255, 0.25)',
    '--primary-quanternary': 'rgba(80, 80, 80, 0.9)',
    '--primary-color': '#fff',
    '--text-color': '#fff',
    '--hover-color': '#f74e6c',
    '--card-border': '#282828',
  },
};

export const dusk: Theme = {
  name: 'dusk',
  properties: {
    '--background-default': '#FFFFFF',
    '--background-secondary': 'rgb(252, 252, 254)',
    '--background-teritary': '#5e636d',
    '--foreground-default': '#283593',
    '--foreground-secondary': 'rgba(0, 0, 0, 0.87)',
    '--foreground-teritary': '#f74e6c',
    '--primary-default': 'rgba(140, 158, 255, 0.24)',
    '--primary-dark': 'rgba(48, 79, 254, 0.3)',
    '--primary-light': 'rgba(80, 80, 80, 0.05)',
    '--primary-quanternary': 'rgba(80, 80, 80, 0.9)',
    '--primary-color': '#000',
    '--text-color': '#000',
    '--hover-color': '#f74e6c',
    '--card-border': '#edf2f9',
  },
};
