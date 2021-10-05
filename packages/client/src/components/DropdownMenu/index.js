import React, { useState } from 'react';
import './DropdownMenu.scss';

function DropdownItem({
    item,
    handleSelection
}) {
    const [ selected, setSelected ] = useState(false);

    const handleSelect = () => {
        if(!selected) {
            setSelected(true);
            // handleSelection(item);
        } else {
            setSelected(false);
        }
    }

    return (
        <div className='dropdown-item' onClick={handleSelect}>
            <div className='dropdown-item-text'>{item}</div>
            { selected && <i className='bx bx-check'></i> }
        </div>
    );
}

export default function DropdownMenu({
    id = '',
    className = '',
    title,
    items = [],
    selection = [],
    multiSelect = false
}) {
    const [ open, setOpen ] = useState(false);
    const [ searchCriteria, setSearchCriteria ] = useState('');
    // const [ selection, setSelection ] = useState([]);

    const handleOnClick = (item) => {}

    const handleOnCriteriaChange = (event) => {
        setSearchCriteria(event.target.value);
    }

    const toggle = () => {
        setOpen(!open);
    }

    return (
        <div id={id} className={`dropdown-wrapper${className && ` ${className}`}`}>
            <div className='dropdown-header'>
                <div className='dropdown-open' onClick={toggle}>
                    <div className='dropdown-open-text'>Add Users to Project</div>
                    <i className={`bx bxs-${!open ? 'down' : 'up'}-arrow`}></i>
                </div>
                {/* {
                    !open ?
                        (
                            <div className='dropdown-open' onClick={toggle}>
                                <div className='dropdown-open-text'>Add Users to Project</div>
                                <i className='bx bxs-down-arrow'></i>
                            </div>
                        ) : 
                        (<div className='dropdown-open'>
                            <input
                                className='dropdown-open-search'
                                type='search'
                                value={searchCriteria}
                                onChange={handleOnCriteriaChange}
                            />
                            <i className='bx bxs-up-arrow' onClick={toggle}></i>
                        </div>)
                } */}
            </div>
            {
                open && (
                    <div className='dropdown-list'>
                        {items?.map((item, index) => (
                            <DropdownItem key={index} item={item} />
                        ))}
                    </div>
                )
            }
        </div>
    );
}