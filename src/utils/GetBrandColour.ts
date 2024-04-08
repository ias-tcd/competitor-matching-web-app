type ColoursMap = {
    [key: string]: string;
};

const colours: ColoursMap = {
    'North Face': 'green',
    'New Balance': 'blue',
    'Under Armour': 'yellow',
};

export const getColour = (name: string | null) => {
    if (!name) {
        return 'red';
    }
    const colour = colours[name as keyof ColoursMap];
    return colour ?? 'red';
};
