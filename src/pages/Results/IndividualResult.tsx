import { Card, Typography, Grid } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { BBox as IBoundingBox } from '../../types/interfaces';
import BoundingBoxes from '../../components/BoundingBoxes/BoundingBoxes';

interface IndividualResultProps {
    image: {
        src: string;
        alt?: string;
        file?: File;
    };
    boundingBoxes: IBoundingBox[];
}

const IndividualResult = ({ image, boundingBoxes }: IndividualResultProps) => {
    return (
        <Card variant='outlined' sx={{ mb: '1em' }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item sx={{ maxWidth: '20rem', maxHeight: '20rem' }}>
                        <BoundingBoxes boundingBoxes={boundingBoxes} image={image} colours={['yellow']} />
                    </Grid>
                    {/* <Grid>
                        <Typography variant='h4'>Lorem ipsum</Typography>
                    </Grid> */}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default IndividualResult;
