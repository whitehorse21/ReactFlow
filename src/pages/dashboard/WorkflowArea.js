import React, { useRef, useState, useContext, useImperativeHandle, forwardRef, useEffect } from 'react';
import WorkflowTabs from '../../layouts/dashboard/WorkflowTabs';
import Workflow from '../../components/_dashboard/home/Workflow';
import { FlowsContext } from '../../contexts/FlowsContext';
import { useSelector } from '../../redux/store';

const TabPanel = (props) => {
  const { children, value, current, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== current}
      id={`full-width-tabpanel-${current}`}
      aria-labelledby={`full-width-tab-${current}`}
      {...other}
      style={{ height: '100%', width: '100%' }}
    >
      {value === current && children}
    </div>
  );
};

const MemoTabpanel = React.memo(TabPanel);

const WorkflowArea = (props, ref) => {
  const elRef = useRef(null);
  const { data, status, changeCurrentFlow, addNewFlow, deleteFlow, saveToFlash, loadFlow } = useContext(FlowsContext);
  const { project } = useSelector((state) => state.project);
  useImperativeHandle(ref, () => ({
    saveToDb: () => {
      elRef.current?.saveToDb();
    },
    run: () => {
      elRef.current?.run();
    }
  }));

  useEffect(() => {
    if (project) {
      const elements = project?.elements;
      if (!elements) return;
      const newFlow = { ...project, elements: JSON.parse(elements) };
      loadFlow(newFlow);
    }
  }, [project]);

  if ((status !== 'idle' && status !== 'resolved') || !data) return null;

  const { flows, currentFlow } = data;

  const flowIds = flows.map(({ id }) => id);
  const flowNames = flows.map(({ id }) => id);
  const currentFlowId = currentFlow?.id;

  return (
    <WorkflowTabs
      flowIds={flowIds}
      flows={flows}
      currentFlow={currentFlowId}
      changeCurrentFlow={changeCurrentFlow}
      addNewFlow={addNewFlow}
      deleteFlow={deleteFlow}
    >
      {flows.map((flow, index) => (
        <MemoTabpanel current={currentFlowId} value={flow.id} key={flow.id}>
          <Workflow flow={flow} saveToFlash={saveToFlash} ref={elRef} />
        </MemoTabpanel>
      ))}
    </WorkflowTabs>
  );
};

const WorkflowAreaWithRef = forwardRef(WorkflowArea);

export default WorkflowAreaWithRef;
