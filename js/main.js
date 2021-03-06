import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';

let mockData = [
    {
        id: 1,
        name: 'Gaurav Sharma',
        designation: 'Software Engineer',
        class: 'MG1A'
    },
    {
        id: 2,
        name: 'Gaurav Verma',
        designation: 'Senior Software Engineer',
        class: 'MG2A'
    },
    {
        id: 3,
        name: 'Saurabh Sharma',
        designation: 'Technical Lead',
        class: 'MG3A'
    },
    {
        id: 4,
        name: 'Saurabh Verma',
        designation: 'Software Engineer',
        class: 'MG1A'
    },
];

let drag = {
    start: '',
    finish: ''
};

let omu = (evt) => {
    mockData.map((data, key) => {
        if (evt.clientY >= mockData[key].start && evt.clientY <= mockData[key].end) {
            drag.finish = key;
            console.log(`draged ${drag.start} to ${drag.finish}`);
            drag = {
                start: '',
                finish: ''
            };
        }
    });
};

let omd = (evt) => {
    mockData.map((data, key) => {
        let position = document.getElementById(data.id).getBoundingClientRect();
        mockData[key].start = position.y;
        mockData[key].end = position.y + position.height;
//        console.log('***', evt.screenY, evt.clientY, document.getElementById(data.id).offsetTop);
        if (evt.clientY >= position.y && evt.clientY <= position.y + position.height) {
            drag.start = key;
        }
    });
    return false;
};

let omm = (evt) => {
    //console.log('Mouse Move Event Fired.', evt.screenX, evt.screenY);
};

const markup = (
    <div className='container'>
        {
            mockData.map((data, key) => {
                return (
                    <div id={data.id}
                         className='employee'
                         key={key}
                         onMouseUp={omu}
                         onMouseMove={omm}
                    >
                        <div>{data.name}</div>
                        <div>{data.designation}</div>
                        <div>{data.class}</div>
                        <div
                            className='sign'
                            onMouseDown={omd}
                        >|||
                        </div>
                    </div>
                )
            })
        }
    </div>
);

ReactDOM.render(markup, document.getElementById('app'));