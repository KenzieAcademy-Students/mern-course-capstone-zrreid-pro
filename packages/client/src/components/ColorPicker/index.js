import React from 'react';
import './ColorPicker.scss';

const colors = [
    '#5D737E', '#64B6AC', '#2A324B', '#FF0000', '#FF7000',
    '#18DA00', '#008DDA', '#99CBDA', '#FCFF00', '#7171C6',
    '#004BA8', '#DC143C', '#FF3E96', '#8A2BE2', '#F0E68C',
    '#CD8500', '#A2CD5A', '#20B2AA', '#FF00FF', '#8B3A62'
]

export default function ColorPicker({ value, colorSelect }) {
    return (
        <div className='colorPicker'>
            { colors.map((color, index) => (
                <div
                    key={index}
                    className={`colorOption${color === value ? ' active' : ''}`}
                    onClick={() => colorSelect(color)}
                    style={{'backgroundColor': color}}></div>
            ))}
        </div>
    );
}