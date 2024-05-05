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
    Grid,
    FormHelperText,
    FormControl,
    InputLabel,
    OutlinedInput
} from '@mui/material';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import { styled } from '@mui/material/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { color, mixin } from '@/shared/utils/styles';
import Filter from '@/shared/components/Filter';
import ticketsService from '@/App/services/tickets';
import attachmentsService from '@/App/services/attachments';

const CommentsAttachments = () => {

    const { t } = useTranslation("translations");
    const navigate = useNavigate();

    const [filter, setFilter] = useState('');
    const [comment, setComment] = useState([]);
    const [commentError, setCommentError] = useState('');
    const [teamList, setTeamList] = useState([]);
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    };

    const addComment = (event) => {
        setComment(event.target.value)
    };

    const isEmpty = (value) => {
        const stringValue = value && value.toString().trim()
        if (!stringValue) {
            return t('tickets.commentEmpty')
        }
        return '';
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && validateComment()) {
          event.preventDefault()
        //   document.getElementById('addComment').submit()
            setComment('')
            console.log("DUPA")
        }
      };

    const validateComment = () => {
        const errorMessage = isEmpty(comment);
        setCommentError(errorMessage)
        return !errorMessage
    };

    const filterCount = teamList.filter(member =>
        member.name.toLowerCase().includes(filter.toLowerCase()) ||
        member.email.toLowerCase().includes(filter.toLowerCase()) ||
        member.role.toLowerCase().includes(filter.toLowerCase())
    ).length;

    return(
        <Grid container spacing={2} sx={{ m: 1, height: '100%' }}>
            <Grid item xs={6}>
                <Paper style={{ height: '100%', width: '100%' }} elevation={0}>
                    <Box sx={{ boxShadow: 3, display: 'flex', flexDirection: 'column', mr: 2 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: `${color.third}`, color: `${color.mainBackground}`, p: 2 }}>
                            <Typography variant="h6" component="div">
                                {t('tickets.comments')}
                            </Typography>
                            <Box display='flex' alignItems='center'>
                                <Filter handleFilterChange={handleFilterChange} color={color.mainBackground} />
                            </Box>
                        </Box>
                        <TableContainer component={Paper} elevation={0} sx={{ width: '100%', height: '100%' }}>
                            <Table aria-label="simple table" sx={{ width: '100%' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                                {t('tickets.commenter')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                                {t('tickets.comment')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                                {t('tickets.submitted')}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filterCount !== 0 ? teamList
                                        .filter(member =>
                                            member.name.toLowerCase().includes(filter.toLowerCase()) ||
                                            member.email.toLowerCase().includes(filter.toLowerCase()) ||
                                            member.role.toLowerCase().includes(filter.toLowerCase()))
                                        .map((member) => (
                                            <TableRow key={member.id}>
                                                <TableCell component="th" scope="row">
                                                    {member.name}
                                                </TableCell>
                                                <TableCell>
                                                    {member.email}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {member.role}
                                                </TableCell>
                                            </TableRow>
                                        )) :
                                        <TableRow>
                                            <TableCell colSpan={3} align="center">
                                                {t('tickets.noComments')}
                                            </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box sx={{ m: 2 }}>
                            {/* <Typography variant='h7'>{t('tickets.addComment')}</Typography> */}
                            {/* <Grid container spacing={2}>
                                <Grid item xs={9}> */}
                                    <FormControl fullWidth error={!!commentError}>
                                        <InputLabel htmlFor="addComment">{t('tickets.addComment')}</InputLabel>
                                        <OutlinedInput
                                            error={!!commentError}
                                            id="addComment"
                                            value={comment}
                                            onChange={addComment}
                                            label={t('tickets.addComment')}
                                            onKeyDown={handleKeyDown}
                                        />
                                        {commentError && <FormHelperText>{commentError}</FormHelperText>}
                                    </FormControl>
                                {/* </Grid> */}
                                {/* <Grid item xs={3}>
                                    <Button variant="contained" sx={{ width: '100%', height: '100%' }}
                                        onClick={null}
                                    >
                                        chuj
                                    </Button>
                                </Grid> */}
                            {/* </Grid> */}
                        </Box>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper style={{ height: '100%', width: '100%' }} elevation={0}>
                    <Box sx={{ boxShadow: 3, display: 'flex', flexDirection: 'column', mr: 2 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: `${color.third}`, color: `${color.mainBackground}`, p: 2 }}>
                            <Typography variant="h6" component="div">
                                {t('tickets.attachments.attachments')}
                            </Typography>
                            <Box display='flex' alignItems='center'>
                                <Filter handleFilterChange={handleFilterChange} color={color.mainBackground} />
                            </Box>
                        </Box>
                        <TableContainer component={Paper} elevation={0} sx={{ width: '100%', height: '100%' }}>
                            <Table aria-label="simple table" sx={{ width: '100%' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                                {t('tickets.attachments.file')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                                {t('tickets.attachments.uploader')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                                {t('tickets.attachments.description')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="h6" sx={{ color: `${color.textDark}` }}>
                                                {t('tickets.attachments.created')}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filterCount !== 0 ? teamList
                                        .filter(member =>
                                            member.name.toLowerCase().includes(filter.toLowerCase()) ||
                                            member.email.toLowerCase().includes(filter.toLowerCase()) ||
                                            member.role.toLowerCase().includes(filter.toLowerCase()))
                                        .map((member) => (
                                            <TableRow key={member.id}>
                                                <TableCell component="th" scope="row">
                                                    {member.name}
                                                </TableCell>
                                                <TableCell>
                                                    {member.email}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {member.role}
                                                </TableCell>
                                            </TableRow>
                                        )) :
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
                                                {t('tickets.attachments.noAttachments')}
                                            </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box sx={{ m: 2 }}>
                            <Grid container spacing={9}>
                                <Grid item xs={5}>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="file-upload">
                                        <Button variant='contained'
                                                component='span'
                                                sx={{ 
                                                    width: '100%', 
                                                    height: '100%', 
                                                    backgroundColor: `${color.sidebar}`, 
                                                    color: `${color.third}`,
                                                    '&:hover': {
                                                        background: mixin.lighten(color.sidebar, 0.15)
                                                    }
                                                }}>
                                            <InsertDriveFileOutlinedIcon sx={{ mr: 0.5 }} /> {t('tickets.attachments.chooseFile')}
                                        </Button>
                                    </label>
                                </Grid>
                                <Grid item xs={7}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={9}>
                                            <FormControl fullWidth error={!!commentError}>
                                                <InputLabel htmlFor="addComment">{t('tickets.attachments.addDescription')}</InputLabel>
                                                <OutlinedInput
                                                    error={!!commentError}
                                                    id="add-comment"
                                                    value={comment}
                                                    onChange={addComment}
                                                    label={t('tickets.addComment')}
                                                    onKeyDown={handleKeyDown}
                                                />
                                                {commentError && <FormHelperText>{commentError}</FormHelperText>}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <input
                                                id="file-upload"
                                                type="file"
                                                onChange={handleFileChange}
                                                style={{ display: 'none' }}
                                            />
                                            <label htmlFor="file-upload">
                                                <Button variant='contained' component='span' sx={{ width: '100%', height: '100%' }}>
                                                    <PublishOutlinedIcon sx={{ color: `${color.mainBackground}` }}/>
                                                </Button>
                                            </label>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    {/* <Box sx={{ mr: 2 }}>
                        <Button variant="contained" sx={{ width: '100%', mt: 2 }}
                            onClick={null}
                        >
                            {t('projects.create')}
                        </Button>
                    </Box> */}
                </Paper>
            </Grid>
        </Grid>
    )
}

export default CommentsAttachments