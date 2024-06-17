const tailwindColors = [
    'red', 'orange', 'amber', 'yellow', 'lime', 'green',
    'teal', 'cyan', 'blue', 'indigo', 'pink', 'gray'
];

const tailwindShades = [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900
];

const generateRandomColors = (count) => {
    const customBgColor = [];
    
    for (let i = 0; i < count; i++) {
        const randomColorIndex = Math.floor(Math.random() * tailwindColors.length);
        const randomColor = tailwindColors[randomColorIndex];
        
        const randomShadeIndex = Math.floor(Math.random() * tailwindShades.length);
        const randomShade = tailwindShades[randomShadeIndex];
        
        customBgColor.push(`bg-${randomColor}-${randomShade}`);
    }

    return customBgColor;
}

export default generateRandomColors;
