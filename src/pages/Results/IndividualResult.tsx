import { Card, Grid, Typography, List, ListItem, ListItemText, ListItemAvatar, Paper } from '@mui/material';
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

const IndividualResult: React.FC<IndividualResultProps> = ({ image, boundingBoxes }) => {
    const brandNames = [...new Set(boundingBoxes?.filter(bbox => !!bbox?.brand)?.map(bbox => bbox?.brand))];

    return (
        <Card variant='outlined' sx={{ mb: '1em' }}>
            <CardContent>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3}>
                            <BoundingBoxes boundingBoxes={boundingBoxes} image={image} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {brandNames?.length ? (
                            <>
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
                            </>
                        ) : (
                            <Typography variant='h5'>No brands identified!</Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3}>
                            <Grid sx={{ padding: '.3em' }}>
                                <Typography variant='h5'>Our Analysis</Typography>
                                <Typography variant='body2' color='black' textAlign='justify' textOverflow='wrap'>
                                    The YOLOv7 model has proven to be an effective tool for real-time object detection,
                                    including the identification of logos in images. This capability can be incredibly
                                    useful for businesses looking to monitor brand visibility across various media
                                    channels or to analyze market trends. By leveraging YOLOv7's advanced detection
                                    algorithms, companies can gain valuable insights into how and where their brand is
                                    being represented.
                                </Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default IndividualResult;
