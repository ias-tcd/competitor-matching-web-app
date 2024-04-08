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

    const baseMessage =
        'Our analysis is provided by YOLOv7, ResNet50 and FAISS. YOLOv7 is a fast and accurate single-pass object detection model, while ResNet50 is a powerful region identification model. FAISS is an efficient algorithm for approximate nearest neighbor search. Together, these technologies enable effective object identification and matching within images.';

    const message = (() => {
        switch (true) {
            case brandNames?.length === 0 && boundingBoxes?.length === 0:
                return `Based on our analysis, we found no competitor brands or logos in the image. You can confidently post your ad on the given page without worrying about competition.`;
            case brandNames?.length === 0:
                return `We didn't identify any competitor brands in the image, but there are some logos present. It's important to review the nature of these logos to ensure they are not associated with your competitors. If they are unrelated to your industry or target market, it should be safe to post your ad on the page.`;
            case brandNames?.length !== boundingBoxes?.length:
                return `We discovered a combination of identified brands and logos in the image. However, it seems that some logos may not be associated with the brands you specified. It's crucial to examine these logos further to determine if they belong to competitors or if they represent unrelated entities. Proceed with caution and investigate the specific nature of these logos.`;
            default:
                return `Our analysis revealed that all the identified logos in the image are associated with the brands you specified. It's important to carefully review these brands to determine if any of them are direct competitors. If none of the identified brands are competitors, you can confidently post your ad on the given page, as there are no competing brands present.`;
        }
    })();

    return (
        <Card variant='outlined' sx={{ mb: '1em' }}>
            <CardContent>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3}>
                            <BoundingBoxes boundingBoxes={boundingBoxes} image={image} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3}>
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
                    <Grid item xs={12} md={5}>
                        <Paper elevation={3}>
                            <Grid sx={{ padding: '.3em' }}>
                                <Typography variant='h5'>Our Analysis</Typography>
                                <Typography variant='body2' color='black' textAlign='justify' textOverflow='wrap'>
                                    {message}
                                    <br />
                                    {baseMessage}
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
