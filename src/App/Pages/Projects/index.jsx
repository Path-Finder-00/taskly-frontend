import { 
    Box,
    Typography,
    Button,
    TableContainer,
    TextField,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material'

import { sizes, color, font } from '@/shared/utils/styles';

const rows = [
    { id: 1, name: 'Demo Project I', description: 'This is the first project' },
    { id: 2, name: 'Demo Project II', description: 'This is the second project' }
];

const Projects = () => {
    
    return (
        <Box sx={{ flexGrow: 1, p: 3, height: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    paddingBottom: '20px'
                }}
            >
                <Typography variant="h4" sx={{ color: `${color.textDark}`}}>
                    My Projects
                </Typography>
                <Button variant="contained" sx={{ maxWidth: '400px', width: '30%', height: '40px' }}>
                    Create Project
                </Button>
            </Box>
            <Box sx={{ width: '100%', boxShadow: 3  }} >
                <Box sx={{ backgroundColor: `${color.third}`, color: `${color.mainBackground}`, p: 2 }}>
                <Typography variant="h6" component="div">
                    Your Projects
                </Typography>
                <Typography variant="subtitle1" component="div">
                    All the projects you participate in
                </Typography>
                </Box>
                <TableContainer component={Paper} elevation={0}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                    <TextField size="small" label="Search" variant="outlined" />
                    </Box>
                    <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Project Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell align="right">
                                <Button variant="contained" color="primary">Manage users</Button>
                                <Button variant="outlined" color="primary" sx={{ ml: 1 }}>Details</Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default Projects