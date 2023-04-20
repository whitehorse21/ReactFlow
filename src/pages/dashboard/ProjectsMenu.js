import React, { useEffect } from 'react';
import { styled } from '@material-ui/styles';
import Page from '../../components/Page';
import ProjectsSidebar from '../../layouts/dashboard/ProjectsSideBar';
import ProjectsView from '../../components/_dashboard/projects/ProjectsView';
import { useDispatch, useSelector } from '../../redux/store';
import { getProjects } from '../../redux/slices/project';

const projects = [
  {
    _id: 1,
    name: 'Trasaction Froud Risk',
    lastRunStatus: false
  },
  {
    _id: 2,
    name: 'Trasaction Froud Risk',
    lastRunStatus: false
  },
  {
    _id: 3,
    name: 'Trasaction Froud Risk',
    lastRunStatus: false
  }
];

const StyledPage = styled(Page)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '100%'
}));

export default () => {
  const dispatch = useDispatch();
  const { isLoading, projects, error } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <StyledPage title="Projects">
      <ProjectsSidebar>
        <ProjectsView projects={projects} />
      </ProjectsSidebar>
    </StyledPage>
  );
};
