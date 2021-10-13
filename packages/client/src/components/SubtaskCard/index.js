import React from 'react';
import './SubtaskCard.scss';

export default function SubtaskCard({ index, subtask, toggleSubtask }) {
    return (
        <div className='subtaskCard'>
            <div className='subtask-content'>{subtask?.objective}</div>
            {
                subtask?.completed ?
                    (<i className='bx bx-checkbox-checked' onClick={() => toggleSubtask(index)}></i>) :
                    (<i className='bx bx-checkbox' onClick={() => toggleSubtask(index)}></i>)
            }
        </div>
    );
}