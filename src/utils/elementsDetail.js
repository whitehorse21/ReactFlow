const method1 = () => {
  alert('this is element 1');
};

const method2 = () => {
  alert('this is element 2');
};

const method3 = () => {
  alert('this is element 3');
};

const method4 = () => {
  alert('this is element 4');
};

const method5 = () => {
  alert('this is element 5');
};

const method6 = () => {
  alert('this is element 6');
};

const method7 = () => {
  alert('this is element 7');
};

const method8 = () => {
  alert('this is element 8');
};

const method9 = () => {
  alert('this is element 9');
};

const method10 = () => {
  alert('this is element 10');
};

const method11 = () => {
  alert('this is element 11');
};

const method12 = () => {
  alert('this is element 12');
};

const method13 = () => {
  alert('this is element 13');
};

const method14 = () => {
  alert('this is element 14');
};

const elementsDetail = new Map();

const detailArray = [
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
  },
  {
    name: 'Element13',
    type: 'output',
    method: method13
  },
  {
    name: 'Element14',
    type: 'output',
    method: method14
  }
];

detailArray.map((item) => elementsDetail.set(item.name, item));

export { elementsDetail };
