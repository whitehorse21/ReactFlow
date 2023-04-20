import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import Box from '../../components/Page';
import { ProjectsFilter } from '../../components/_dashboard/projects';

const StyledPage = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  height: '100%'
});

const GrowDiv = styled('div')({
  flexGrow: 1,
  height: '100%'
});

const ProjectsSidebar = ({ children }) => (
  <Box
    sx={{
      display: 'flex',
      '& > :not(style)': {
        m: 1
      }
    }}
  >
    <ProjectsFilter />
    <GrowDiv>{children}</GrowDiv>
  </Box>
);

ProjectsSidebar.propTypes = {
  children: PropTypes.node
};

export default ProjectsSidebar;
