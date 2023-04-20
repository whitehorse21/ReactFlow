import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import Page from '../../components/Page';
import { WorkflowDetails } from '../../components/_dashboard/home';
import { MHidden } from '../../components/@material-extend';

const RightSide = styled(Page)({
  display: 'flex',
  flexDirection: 'row',
  height: '100%'
});

const Children = styled('div')({
  flexGrow: 1
});

const WorkflowRightSide = ({ children }) => (
  <RightSide>
    <Children>{children}</Children>
    <MHidden width="mdDown">
      <WorkflowDetails />
    </MHidden>
  </RightSide>
);

WorkflowRightSide.propTypes = {
  children: PropTypes.node
};

export default WorkflowRightSide;
