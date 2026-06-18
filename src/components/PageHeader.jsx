import Typography from '@mui/material/Typography'
import { Box, Divider } from '@mui/material'

const PageHeader = ({title, subtitle}) => {
    return (
        <Box sx={{ textAlign: 'left', mb: 3, width: '100%'}}>
        <Typography variant="h4" component="h1" mb={1}>
            {title}
        </Typography>
        {subtitle && (
            <Typography variant="h6" mb={2} sx={{ mb: 2}}>
                {subtitle}
            </Typography>
        )}
        <Divider sx={{ mb: 3, backgroundColor: 'white' }} />
        </Box>
    )
}

export default PageHeader