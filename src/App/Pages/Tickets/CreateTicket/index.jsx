import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router';
import { sizes, color, font } from '@/shared/utils/styles';
import projectService from '@/App/services/projects';
import priorityService from '@/App/services/priorities';
import typeService from '@/App/services/types';
import {
    Grid,
    Box,
    Typography,
    Button,
    OutlinedInput,
    FormControl,
    Select,
    MenuItem,
    FormHelperText,
} from '@mui/material'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';


const CreateTicket = () => {

    const navigate = useNavigate();

    const { t } = useTranslation("translations")
    const [projects, setProjects] = useState([])
    const [priorities, setPriorities] = useState([])
    const [types, setTypes] = useState([])
    const [projectMembers, setProjectMembers] = useState(null);
    const [ticket, setTicket] = useState({
        title: '',
        description: '',
        project: '',
        assigned: '',
        priority: '',
        type: ''
    });
    const [nameError, setNameError] = useState('');
    const [descError, setDescError] = useState('');
    const [projectError, setProjectError] = useState('');
    const [priorityError, setPriorityError] = useState('');
    const [typeError, setTypeError] = useState('');

    const handleSubmit = () => {
        const isNameValid = validateName();
        const isDescriptionValid = validateDescription();
        const isProjectValid = validateProject();
        const isPriorityValid = validatePriority();
        const isTypeValid = validateType();

        if (!isNameValid || !isDescriptionValid || !isProjectValid || !isPriorityValid || !isTypeValid) {
            return;
        }
        console.log(ticket);
    };

    const handleChange = (prop) => (event) => {
        setTicket({ ...ticket, [prop]: event.target.value });
    };

    const isEmpty = (value) => {
        const stringValue = value && value.toString().trim()
        if (!stringValue) {
            return t('projects.fieldEmpty')
        }
        return '';
    }

    const validateName = () => {
        const errorMessage = isEmpty(ticket.title);
        setNameError(errorMessage)
        return !errorMessage
    }

    const validateDescription = () => {
        let errorMessage = isEmpty(ticket.description);
        if (!errorMessage && ticket.description.length > 200) {
            errorMessage = t('tickets.descLengthError');
        }
        setDescError(errorMessage)
        return !errorMessage
    }

    const validateProject = () => {
        const errorMessage = isEmpty(ticket.project);
        setProjectError(errorMessage);
        return !errorMessage;
    };

    const validatePriority = () => {
        const errorMessage = isEmpty(ticket.priority);
        setPriorityError(errorMessage);
        return !errorMessage;
    };

    const validateType = () => {
        const errorMessage = isEmpty(ticket.type);
        setTypeError(errorMessage);
        return !errorMessage;
    };

    useEffect(() => {
        projectService
            .getUserProjects()
            .then(projects => {
                setProjects(projects)
            })
        priorityService.getPriorities()
            .then(priorities => {
                setPriorities(priorities)
            })
        typeService.getTypes()
            .then(types => {
                setTypes(types)
            })
    }, []);

    useEffect(() => {
        if (ticket.project) {
            projectService.getProjectById(ticket.project)
                .then(data => {
                    setProjectMembers(data.employees);
                })
                .catch(error => {
                    console.error('Error fetching project members:', error);
                    setProjectMembers([]);
                });
        }
    }, [ticket.project]);

    return (
        <Box sx={{ width: '100%', boxShadow: 3 }} >
            <Box sx={{ backgroundColor: `${color.third}`, color: `${color.mainBackground}`, p: 2 }}>
                <Typography variant="h6" component="div">
                    {t('tickets.newTicket')}
                </Typography>
                <Typography variant="subtitle1" component="div" sx={{ ml: 2 }}>
                    {t('tickets.addNewTicket')}
                </Typography>
            </Box>
            <Grid container spacing={4} sx={{ p: 2 }}>
                <Grid item md={6}>
                    <Typography variant='h5'>{t('tickets.title')}</Typography>
                    <FormControl fullWidth error={!!nameError}>
                        {/* <InputLabel htmlFor="title">Title</InputLabel> */}
                        <OutlinedInput
                            error={!!nameError}
                            id="title"
                            value={ticket.title}
                            onChange={handleChange('title')}
                        // label="Title"
                        />
                        {nameError && <FormHelperText>{nameError}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <Typography variant='h5'>{t('tickets.description')}</Typography>
                    <FormControl fullWidth error={!!descError}>
                        {/* <InputLabel htmlFor="description">Description</InputLabel> */}
                        <OutlinedInput
                            error={!!descError}
                            id="description"
                            value={ticket.description}
                            onChange={handleChange('description')}
                        // label="Description"
                        />
                        {descError && <FormHelperText>{descError}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <Typography variant='h8'>{t('dashboards.project')}</Typography>
                    <FormControl fullWidth error={!!projectError}>
                        {/* <InputLabel id="project-label">Project</InputLabel> */}
                        <Select
                            labelId="project-label"
                            id="project"
                            value={ticket.project}
                            onChange={handleChange('project')}
                        // label="Project"
                        >
                            {projects.map((project) => (
                                <MenuItem
                                    key={project['id']}
                                    value={project['id']}
                                >
                                    {project['name']}
                                </MenuItem>
                            ))}
                        </Select>
                        {projectError && <FormHelperText>{projectError}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <Typography variant='h8'>{t('tickets.assigned')}</Typography>
                    <FormControl fullWidth>
                        {/* <InputLabel id="assigned-label">Assigned</InputLabel> */}
                        <Select
                            labelId="assigned-label"
                            id="assigned"
                            value={ticket.assigned}
                            onChange={handleChange('assigned')}
                        // label="Assigned"
                        >
                            {projectMembers?.map((members) => (
                                <MenuItem
                                    key={members.id}
                                    value={members.id}
                                >
                                    {`${members.user.name} ${members.user.surname}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <Typography variant='h8'>{t('tickets.priority')}</Typography>
                    <FormControl fullWidth error={!!priorityError}>
                        {/* <InputLabel id="priority-label">Ticket Priority</InputLabel> */}
                        <Select
                            labelId="priority-label"
                            id="priority"
                            value={ticket.priority}
                            onChange={handleChange('priority')}
                        // label="Ticket Priority"
                        >
                            {priorities.map((priority) => (
                                <MenuItem
                                    key={priority['id']}
                                    value={priority['id']}
                                >
                                    {priority['priority']}
                                </MenuItem>
                            ))}
                        </Select>
                        {priorityError && <FormHelperText>{priorityError}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <Typography variant='h8'>{t('tickets.type')}</Typography>
                    <FormControl fullWidth error={!!typeError}>
                        {/* <InputLabel id="type-label">Ticket Type</InputLabel> */}
                        <Select
                            labelId="type-label"
                            id="type"
                            value={ticket.type}
                            onChange={handleChange('type')}
                        // label="Ticket Type"
                        >
                            {types.map((type) => (
                                <MenuItem
                                    key={type['id']}
                                    value={type['id']}
                                >
                                    {type['type']}
                                </MenuItem>
                            ))}
                        </Select>
                        {typeError && <FormHelperText>{typeError}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <Button
                        onClick={() => navigate(-1)}
                        sx={{
                            display: 'flex'
                        }}
                    >
                        <KeyboardReturnIcon />
                    </Button>
                </Grid>
                <Grid item md={6}>
                    <Button variant="contained" onClick={handleSubmit} sx={{ width: '100%' }}>
                        {t('tickets.submit')}
                    </Button>
                </Grid>
            </Grid>
        </Box>

    )
}

export default CreateTicket