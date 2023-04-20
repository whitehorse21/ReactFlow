import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import ReactFlow, { removeElements, addEdge, Controls, Background, MiniMap } from 'react-flow-renderer';
import { useDispatch } from '../../../redux/store';
import { create as createProject } from '../../../redux/slices/project';
import runFlow from '../../../utils/runFlow';

let id = 0;
// eslint-disable-next-line no-plusplus
const getId = () => `dndnode_${id++}`;

const WorkflowDiv = styled('div')(() => ({
  height: '100%',
  borderLeft: 'solid 1px #50474747',
  borderRight: 'solid 1px #50474747'
}));

const Workflow = ({ flow, saveToFlash }, ref) => {
  const reactFlowWrapper = useRef(null);
  const [elements, setElements] = useState(flow.elements);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [openSaveDlg, setOpenSaveDlg] = useState(false);
  const [newFlowName, setNewFlowName] = useState(flow?.name);
  const dispatch = useDispatch();
  const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params) => setElements((els) => addEdge(params, els));

  const onLoad = (_reactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const data = event.dataTransfer.getData('application/reactflow');
    const { type, name } = JSON.parse(data);
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: name },
      targetPosition: 'left',
      sourcePosition: 'right',
      style: { borderColor: 'black', boxShadow: 'none' }
    };

    setElements((es) => es.concat(newNode));
  };

  const handleCloseSaveDlg = () => {
    setOpenSaveDlg(false);
  };

  const handleSaveFlow = () => {
    saveToDb();
    setOpenSaveDlg(false);
  };

  const saveToDb = () => {
    if (reactFlowInstance) {
      const newFlow = reactFlowInstance.toObject();
      dispatch(createProject({ name: newFlowName, elements: newFlow.elements }));
    }
  };

  useImperativeHandle(ref, () => ({
    saveToDb: () => {
      setOpenSaveDlg(true);
      // if (reactFlowInstance) {
      //   const newFlow = reactFlowInstance.toObject();
      //   dispatch(createProject({ name: flow.name, elements: newFlow.elements }));
      // }
    },
    run: () => {
      const newFlow = reactFlowInstance.toObject();
      const elements = newFlow?.elements;
      if (elements) {
        runFlow(elements);
      }
    }
  }));

  useEffect(() => {
    const id = flow?.id;
    const name = flow?.name;
    return () => {
      if (name && reactFlowInstance && saveToFlash) {
        const flow = reactFlowInstance.toObject();
        saveToFlash({ id, name, ...flow });
      }
    };
  }, [reactFlowInstance, flow, saveToFlash]);

  return (
    <WorkflowDiv ref={reactFlowWrapper}>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        deleteKeyCode={46} /* 'delete'-key */
        snapToGrid
        snapGrid={[15, 15]}
        onLoad={onLoad}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <Controls style={{ right: 10, left: 'inherit' }} />
        <Background color="#aaa" gap={16} />
        <MiniMap nodeStrokeWidth={3} style={{ left: 10, width: 150, height: 100 }} />
      </ReactFlow>
      <Dialog open={openSaveDlg}>
        <DialogTitle>Save</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter project name to save</DialogContentText>
          <TextField
            value={newFlowName}
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Project Name To Save"
            onChange={(event) => setNewFlowName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSaveDlg} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSaveFlow} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </WorkflowDiv>
  );
};

export default forwardRef(Workflow);
