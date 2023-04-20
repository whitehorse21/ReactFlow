// elements list configure data
const sidebarConfig = [
  {
    subheader: 'INPUT',
    items: [
      {
        title: 'Element1',
        type: 'input'
      },
      { title: 'Element2', type: 'input' },
      { title: 'Element3', type: 'input' }
    ]
  },
  {
    subheader: 'TRANSFORM',
    items: [
      {
        title: 'Element4',
        type: 'default'
      },
      { title: 'Element5', type: 'default' },
      { title: 'Element6', type: 'default' },
      { title: 'Element7', type: 'default' },
      { title: 'Element8', type: 'default' },
      { title: 'Element9', type: 'default' }
    ]
  },
  {
    subheader: 'GEO DATA',
    items: [
      {
        title: 'Element10',
        type: 'output'
      },
      { title: 'Element11', type: 'output' },
      { title: 'Element12', type: 'output' }
    ]
  }
];

const method1 = () => {
  console.log('this is element 1');
};

const method2 = () => {
  console.log('this is element 2');
};

const method3 = () => {
  console.log('this is element 3');
};

const method4 = () => {
  console.log('this is element 4');
};

const method5 = () => {
  console.log('this is element 5');
};

const method6 = () => {
  console.log('this is element 6');
};

const method7 = () => {
  console.log('this is element 7');
};

const method8 = () => {
  console.log('this is element 8');
};

const method9 = () => {
  console.log('this is element 9');
};

const method10 = () => {
  console.log('this is element 10');
};

const method11 = () => {
  console.log('this is element 11');
};

const method12 = () => {
  console.log('this is element 12');
};

const elementsDetail = [
  {
    name: 'Element1',
    type: 'input',
    method: method1
  },
  {
    name: 'Element2',
    type: 'input',
    method: method2
  },
  {
    name: 'Element3',
    type: 'input',
    method: method3
  },
  {
    name: 'Element4',
    type: 'input',
    method: method4
  },
  {
    name: 'Element5',
    type: 'default',
    method: method5
  },
  {
    name: 'Element6',
    type: 'default',
    method: method6
  },
  {
    name: 'Element7',
    type: 'default',
    method: method7
  },
  {
    name: 'Element8',
    type: 'default',
    method: method8
  },
  {
    name: 'Element9',
    type: 'default',
    method: method9
  },
  {
    name: 'Element10',
    type: 'default',
    method: method10
  },
  {
    name: 'Element11',
    type: 'output',
    method: method11
  },
  {
    name: 'Element12',
    type: 'output',
    method: method12
  }
];

export default sidebarConfig;
export { elementsDetail };
