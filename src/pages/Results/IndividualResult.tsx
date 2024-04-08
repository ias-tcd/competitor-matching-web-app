import { Card, Grid, Typography, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { BBox as IBoundingBox } from '../../types/interfaces';
import BoundingBoxes from '../../components/BoundingBoxes/BoundingBoxes';
import { getColour } from '../../utils/GetBrandColour';

interface IndividualResultProps {
    image: {
        src: string;
        alt?: string;
        file?: File;
    };
    boundingBoxes: IBoundingBox[];
}

const IndividualResult = ({ image, boundingBoxes }: IndividualResultProps) => {
    const brandNames = boundingBoxes?.filter(bbox => !!bbox?.brand)?.map(bbox => bbox?.brand);

    return (
        <Card variant='outlined' sx={{ mb: '1em' }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item sx={{ maxWidth: '20rem', maxHeight: '20rem' }}>
                        <BoundingBoxes boundingBoxes={boundingBoxes} image={image} />
                    </Grid>
                    <Grid item sx={{ padding: '0.5em' }}>
                        <Typography variant='h5'>Brands Identified</Typography>
                        <List>
                            {brandNames?.map(name => (
                                <ListItem key={name}>
                                    <ListItemAvatar>
                                        <div
                                            style={{
                                                backgroundColor: getColour(name),
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                            }}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={name}
                                        primaryTypographyProps={{ variant: 'body1', color: 'black' }}
                                        sx={{ ml: '-1.5rem' }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item>Lorem ipsum</Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default IndividualResult;
