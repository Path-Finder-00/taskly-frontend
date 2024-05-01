import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback, Fragment } from 'react';

import {
    Box,
    Typography,
    Button,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Container,
    Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { color } from '@/shared/utils/styles';
import Filter from '@/shared/components/Filter';
import ticketsService from '@/App/services/tickets';
import attachmentsService from '@/App/services/attachments';

const CommentsAttachments = () => {

    const { t } = useTranslation("translations");
    const navigate = useNavigate();

    const [file, setFile] = useState(null)

    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('file', file)

        attachmentsService.uploadFile(formData)
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return(
        // <Box sx={{ width: '100%', marginLeft: '0.5%', boxShadow: 3, mb: 2 }}>
        //     <Paper>
        //         <Button
        //             component="label"
        //             role={undefined}
        //             variant="contained"
        //             tabIndex={-1}
        //             startIcon={<CloudUploadIcon />}
        //             onClick={handleSubmit}
        //         >
        //             Upload file
        //             <VisuallyHiddenInput 
        //                 type="file"
        //                 onChange={handleFileChange}
        //             />
        //         </Button>
        //     </Paper>
        // </Box>
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                    Select a file:
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <input
                    // accept="image/*" // Specify accepted file types if needed
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    />
                    <label htmlFor="file-upload">
                    <Button variant="contained" component="span">
                        Choose File
                    </Button>
                    </label>
                </Grid>
                <Grid item xs={12}>
                    {file && <Typography variant="body1">Selected file: {file.name}</Typography>}
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" disabled={!file}>
                    Upload
                    </Button>
                </Grid>
                </Grid>
            </form>
        </Container>
        // <Fragment>
        // <h2>File Upload With <code>Node.js</code></h2>
        //     <form action="/api/attachments" encType="multipart/form-data" method="post">
        //     <div>Select a file: 
        //         <input name="file" type="file" />
        //     </div>
        //     <input type="submit" value="Upload" />
        //     </form>
        // </Fragment>
    )
}

export default CommentsAttachments