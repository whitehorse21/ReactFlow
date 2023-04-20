import React from 'react';
import { Divider, Paper, Typography, Button, InputLabel, TextField } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import DesktopDatePicker from '../../DatePicker';
import SearchInput from '../../SearchInput';
import { Accordion, AccordionSummary, AccordionDetails } from '../../CustomAccordion';

const ProjectsFilter = () => {
  const [searchText, setSearchText] = React.useState('');
  const [openProject, setOpenProject] = React.useState(true);
  const [openLastRunBetween, setOpenLastRunBetween] = React.useState(true);
  const [openNextRunBetween, setOpenNextRunBetween] = React.useState(true);
  const [openStatus, setOpenStatus] = React.useState(true);
  const [date1, setDate1] = React.useState(null);
  const [date2, setDate2] = React.useState(null);
  const [date3, setDate3] = React.useState(null);
  const [date4, setDate4] = React.useState(null);
  const [status, setStatus] = React.useState({
    running: false,
    failed: false,
    succeeded: false,
    missedExcution: false,
    canceled: false
  });

  const handleChangeStatus = (event) => {
    const { name, checked } = event.target;
    setStatus({ ...status, [name]: checked });
  };

  const clearState = (name) => {
    switch (name) {
      case 'project':
        setSearchText('');
        break;
      case 'lastRunBetween':
        setDate1(null);
        setDate2(null);
        break;
      case 'nextRunBetween':
        setDate3(null);
        setDate4(null);
        break;
      case 'status':
        setStatus({
          running: false,
          failed: false,
          succeeded: false,
          missedExcution: false,
          canceled: false
        });
        break;
      default:
        break;
    }
  };

  const { running, failed, succeeded, missedExcution, canceled } = status;

  return (
    <Paper elevation={3}>
      <Typography variant="h6" gutterBottom component="div" style={{ padding: '10px 0 0 10px' }}>
        Filter
      </Typography>
      <Divider />
      <Accordion expanded={openProject} onChange={() => setOpenProject(!openProject)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="open-project-summary"
          id="open-project-summary"
          actiondiv={<Button onClick={() => clearState('project')}>clear</Button>}
        >
          Projects
        </AccordionSummary>
        <AccordionDetails>
          <InputLabel shrink>Name</InputLabel>
          <SearchInput value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </AccordionDetails>
      </Accordion>
      <Divider />
      <Accordion expanded={openLastRunBetween} onChange={() => setOpenLastRunBetween(!openLastRunBetween)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="open-lastrun-summary"
          id="open-lastrun-summary"
          actiondiv={<Button onClick={() => clearState('lastRunBetween')}>clear</Button>}
        >
          Last Run Between
        </AccordionSummary>
        <AccordionDetails>
          <DesktopDatePicker
            value={date1}
            minDate={new Date('2017-01-01')}
            onChange={(newValue) => {
              setDate1(newValue);
            }}
            renderInput={(params) => <TextField {...params} margin="normal" />}
          />
          <DesktopDatePicker
            value={date2}
            minDate={new Date('2017-01-01')}
            onChange={(newValue) => {
              setDate2(newValue);
            }}
            renderInput={(params) => <TextField {...params} margin="normal" />}
          />
        </AccordionDetails>
      </Accordion>
      <Divider />
      <Accordion expanded={openNextRunBetween} onChange={() => setOpenNextRunBetween(!openNextRunBetween)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="open-nextrun-summary"
          id="open-nextrun-summary"
          actiondiv={<Button onClick={() => clearState('nextRunBetween')}>clear</Button>}
        >
          Next Run Between
        </AccordionSummary>
        <AccordionDetails>
          <DesktopDatePicker
            value={date3}
            minDate={new Date('2017-01-01')}
            onChange={(newValue) => {
              setDate3(newValue);
            }}
            renderInput={(params) => <TextField {...params} margin="normal" />}
          />
          <DesktopDatePicker
            value={date4}
            minDate={new Date('2017-01-01')}
            onChange={(newValue) => {
              setDate4(newValue);
            }}
            renderInput={(params) => <TextField {...params} margin="normal" />}
          />
        </AccordionDetails>
      </Accordion>
      <Divider />
      <Accordion expanded={openStatus} onChange={() => setOpenStatus(!openStatus)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="open-status-summary"
          id="open-status-summary"
          actiondiv={<Button onClick={() => clearState('status')}>clear</Button>}
        >
          Status
        </AccordionSummary>
        <AccordionDetails>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={running} onChange={handleChangeStatus} name="running" />}
                label="Running"
              />
              <FormControlLabel
                control={<Checkbox checked={failed} onChange={handleChangeStatus} name="failed" />}
                label="Failed"
              />
              <FormControlLabel
                control={<Checkbox checked={succeeded} onChange={handleChangeStatus} name="succeeded" />}
                label="Succeeded"
              />
              <FormControlLabel
                control={<Checkbox checked={missedExcution} onChange={handleChangeStatus} name="missedExcution" />}
                label="Missed Excution"
              />
              <FormControlLabel
                control={<Checkbox checked={canceled} onChange={handleChangeStatus} name="canceled" />}
                label="Canceled"
              />
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Divider />
    </Paper>
  );
};

export default ProjectsFilter;
