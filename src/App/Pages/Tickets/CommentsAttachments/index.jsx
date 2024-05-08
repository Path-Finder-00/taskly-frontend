import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

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

import { color, mixin } from '@/shared/utils/styles';
import Filter from '@/shared/components/Filter';
import commentsService from '@/App/services/comments';
import attachmentsService from '@/App/services/attachments';

const CommentsAttachments = () => {

    const { t } = useTranslation("translations");
    const navigate = useNavigate();

    const [commentFilter, setCommentFilter] = useState('');
    const [attachmentFilter, setAttachmentFilter] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [commentError, setCommentError] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [description, setDescription] = useState('');
    const [commentPage, setCommentPage] = useState(0);
    const [attachmentPage, setAttachmentPage] = useState(0);
    const [file, setFile] = useState(null);
    const [isNextCommentDisabled, setIsNextCommentDisabled] = useState(false);
    const [isPrevCommentDisabled, setIsPrevCommentDisabled] = useState(true);
    const [isNextAttachmentDisabled, setIsNextAttachmentDisabled] = useState(false);
    const [isPrevAttachmentDisabled, setIsPrevAttachmentDisabled] = useState(true);

    const { ticketId } = useParams()
    const commentsNumberRef = useRef(0);

    useEffect(() => {
        commentsService.getTicketComments(ticketId)
            .then(data => {
                setComments(data)
            })
            .catch(err => {
                console.error('Error fetching comments:', err);
            })
        attachmentsService.getTicketAttachments
    }, [ticketId]);

    useEffect(() => {
        const filterCount = comments.filter(comment =>
            comment.user.name.toLowerCase().includes(commentFilter.toLowerCase()) ||
            comment.user.surname.toLowerCase().includes(commentFilter.toLowerCase()) ||
            comment.comment.toLowerCase().includes(commentFilter.toLowerCase())
        ).length;

        commentsNumberRef.current = filterCount;
        const maxPage = Math.ceil(commentsNumberRef.current / 10) - 1;
        if (commentPage > maxPage && maxPage !== -1) {
            setCommentPage(maxPage > 0 ? maxPage : 0);
        } else {
            setIsPrevCommentDisabled(commentPage <= 0);
            setIsNextCommentDisabled(commentPage >= maxPage);
        }

    }, [commentFilter, comments, commentPage]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    };

    const handleCommentFilterChange = (event) => {
        setCommentFilter(event.target.value)
    };

    const handleAttachmentFilterChange = (event) => {
        setAttachmentFilter(event.target.value)
    };

    const handleCommentPageChangeForward = () => {
        setCommentPage(current => current + 1)
    };

    const handleCommentPageChangeBackward = () => {
        setCommentPage(current => current - 1)
    };

    const changeComment = (event) => {
        setComment(event.target.value)
    };

    const changeDescription = (event) => {
        setDescription(event.target.value)
    };

    const isEmpty = (value) => {
        const stringValue = value && value.toString().trim()
        if (!stringValue) {
            return t('tickets.commentEmpty')
        }
        return '';
    };

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter' && validateComment()) {
            event.preventDefault()
            const newComment = await commentsService.createComment(ticketId, comment)
            console.log(newComment)
            setComments(prevComments => [newComment, ...prevComments])
            setComment('')
        }
    };

    const validateComment = () => {
        const errorMessage = isEmpty(comment);
        setCommentError(errorMessage)
        return !errorMessage
    };

    const commentFilterCount = comments.filter(comment =>
        comment.user.name.toLowerCase().includes(commentFilter.toLowerCase()) ||
        comment.user.surname.toLowerCase().includes(commentFilter.toLowerCase()) ||
        comment.comment.toLowerCase().includes(commentFilter.toLowerCase())
    ).length;

    const attachmentFilterCount = comments.filter(comment =>
        comment.user.name.toLowerCase().includes(commentFilter.toLowerCase()) ||
        comment.user.surname.toLowerCase().includes(commentFilter.toLowerCase()) ||
        comment.comment.toLowerCase().includes(commentFilter.toLowerCase())
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
                                <Filter handleFilterChange={handleCommentFilterChange} color={color.mainBackground} />
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
                                    {commentFilterCount !== 0 ? comments
                                        .filter(comment =>
                                            comment.user.name.toLowerCase().includes(commentFilter.toLowerCase()) ||
                                            comment.user.surname.toLowerCase().includes(commentFilter.toLowerCase()) ||
                                            comment.comment.toLowerCase().includes(commentFilter.toLowerCase()))
                                        .map((comment) => (
                                            <TableRow key={comment.id}>
                                                <TableCell component="th" scope="row">
                                                    {comment.user.name} {comment.user.surname}
                                                </TableCell>
                                                <TableCell
                                                    style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
                                                >
                                                    {comment.comment}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {new Date(comment.createdAt).toLocaleString('pl-PL')}
                                                </TableCell>
                                            </TableRow>
                                        )).slice(0 + commentPage * 10, 10 + commentPage * 10) :
                                        <TableRow>
                                            <TableCell colSpan={3} align="center">
                                                {t('tickets.noComments')}
                                            </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box display="flex" justifyContent="space-between" sx={{ p: 2, mb: -2 }}>
                            <Button disabled={isPrevCommentDisabled} variant="contained" onClick={handleCommentPageChangeBackward} sx={{ maxWidth: '133px', width: '10%', height: '40px' }} >
                                <NavigateBeforeIcon />
                            </Button>
                            <Button disabled={isNextCommentDisabled} onClick={handleCommentPageChangeForward} variant="contained" sx={{ maxWidth: '133px', width: '10%', height: '40px' }} >
                                <NavigateNextIcon />
                            </Button>
                        </Box>
                        <Box sx={{ m: 2 }}>
                            <FormControl fullWidth error={!!commentError}>
                                <InputLabel htmlFor="addComment">{t('tickets.addComment')}</InputLabel>
                                <OutlinedInput
                                    error={!!commentError}
                                    id="addComment"
                                    value={comment}
                                    onChange={changeComment}
                                    label={t('tickets.addComment')}
                                    onKeyDown={handleKeyDown}
                                    multiline
                                    rows={4}
                                />
                                {commentError && <FormHelperText>{commentError}</FormHelperText>}
                            </FormControl>
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
                                <Filter handleFilterChange={handleAttachmentFilterChange} color={color.mainBackground} />
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
                                    {attachmentFilterCount !== 0 ? attachments
                                        .filter(comment =>
                                            comment.user.name.toLowerCase().includes(attachmentFilter.toLowerCase()) ||
                                            comment.user.surname.toLowerCase().includes(attachmentFilter.toLowerCase()) ||
                                            comment.comment.toLowerCase().includes(attachmentFilter.toLowerCase()))
                                        .map((comment) => (
                                            <TableRow key={comment.id}>
                                                <TableCell component="th" scope="row">
                                                    {comment.user.name} {comment.user.surname}
                                                </TableCell>
                                                <TableCell
                                                    style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
                                                >
                                                    {comment.comment}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {new Date(comment.createdAt).toLocaleString('pl-PL')}
                                                </TableCell>
                                            </TableRow>
                                        )).slice(0 + attachmentPage * 10, 10 + attachmentPage * 10) :
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
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="addDescription">{t('tickets.attachments.addDescription')}</InputLabel>
                                                <OutlinedInput
                                                    id="add-description"
                                                    value={description}
                                                    onChange={changeDescription}
                                                    label={t('tickets.attachments.addDescription')}
                                                    onKeyDown={handleKeyDown}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Button 
                                                type='submit'
                                                variant='contained'
                                                disabled={!file}
                                                sx={{ width: '100%', height: '100%' }}
                                            >
                                                <PublishOutlinedIcon sx={{ color: `${color.mainBackground}` }}/>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                        {file && 
                            <Box sx={{ m: 2, mt: 0 }}>
                                <Typography variant="h8" sx={{ color: `${color.textDark}` }}>
                                    {t('tickets.attachments.selectedFile')}: {file.name}
                                </Typography>
                            </Box>
                        }
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default CommentsAttachments