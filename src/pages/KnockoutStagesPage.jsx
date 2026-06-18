import Box from '@mui/material/Box'
import PageHeader from '../components/PageHeader'
import Typography from '@mui/material/Typography'
import PageContainer from '../components/PageContainer'

const KnockoutStagesPage = () => {

    return (
        <PageContainer>
            <PageHeader title="Knockout Stages" subtitle="View the current standings for the knockout stages." />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Typography variant="h4" fontWeight="bold" sx={{ color: 'var(--gold)' }}>
                    Page Under Construction
                </Typography>
                <Typography variant="h5" fontWeight="bold" sx={{ color: 'var(--gold)' }}>
                    This page is currently under construction. Please check back later for updates.
                </Typography>
            </Box>
        </PageContainer>
    )
}

export default KnockoutStagesPage