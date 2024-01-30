import { css } from 'styled-components';

export const color = {
    primary: '#3e74db', // Blue
    secondary: '#141d2f', // Dark blue
    third: '#4b6a9b', // Greyish blue

    mainBackground: '#fcfcfc', // Off white
    recessedBackground: '#d5d5d5', // Grey
    supplementaryBackground: '#f6f8ff', // Blueish white
    sidebar: '#eff1ff', // Steel

    textDark: '#545353', // Dark grey
    textLight: '#adaeb5' // Light grey
};

export const sizes = {
    sidebarWidth: 320,
    topbarHeight: 80
};

export const font = {
    book: 'font-family: "CircularStd-Book"; font-weight: normal;',
    regular: 'font-family: "OpenSans-Regular"; font-weight: normal;',
    bold: 'font-family: "OpenSans-Bold"; font-weight: bold;',
    extraBold: 'font-family: "OpenSans-ExtraBold"; font-weight: bolder;',
    size: size => `font-size: ${size}px`
};

export const styleUtils = {
    scrollableY: css`
        overflow-x: hidden;
        overflow-y: auto;
    `,
}