import React, { useState } from 'react';
import {
    ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
    Heading,
    Textarea,
    Tag, TagLabel, TagRightIcon,
    Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption,
    Button
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import './TaskDetail.scss';

const testTags = ['tag1', 'tag2', 'tag3'];
const totalTags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'];

export default function TaskDetail({
    task: { objective, status, deadline, tags, notes, comments, users, subtasks },
    projectTitle,
    projectCategories,
    projectDeadline,
    projectTags
}) {

    const handleUpdateTags = () => {
        //this is just to remind myself that the onClose needs to update the tags
        console.log('update tags');
    }

    return (
        <>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <span className='modalTitle'>{projectTitle}</span>
                    <ModalCloseButton size='sm'/>
                </ModalHeader>
                {/* <ModalCloseButton /> */}
                <ModalBody>
                    <div className='subheader'>
                        <Heading size='lg'>{objective}</Heading>
                        {/* <div className='taskCharacteristic'>[Deadline]</div> */}
                        {/* <DatePicker
                            selected={Date.now()}
                            isClearable
                        /> */}
                        <div className='taskCharacteristic'>{status}</div>
                        {/* <div className='taskCharacteristic'>[Time Estimate]</div> */}
                    </div>
                    <div className='taskContent'>
                        <div className='taskData'>
                            <div className='tags'>
                                {tags.map((tag, index) => (
                                    <Tag key={index} size='md' className='tag'>
                                        <TagLabel>{tag}</TagLabel>
                                        <i className='bx bx-x'></i>
                                        {/* <TagRightIcon as={CloseIcon} size='sm'/> */}
                                    </Tag>
                                    ))}
                                <Menu closeOnSelect={false} onClose={handleUpdateTags}>
                                    <MenuButton
                                        as={Tag}
                                    >Add Tags</MenuButton>
                                    <MenuList>
                                        <MenuOptionGroup type='checkbox'>
                                            {projectTags.filter((tag) => !tags.includes(tag)).map((tag, index) => (
                                                <MenuItemOption key={index} value={tag}>{tag}</MenuItemOption>
                                            ))}
                                        </MenuOptionGroup>
                                    </MenuList>
                                </Menu>
                            </div>
                            <Textarea placeholder='Add Task Notes' resize='vertical'/>
                            <Heading size='md'>Subtasks</Heading>
                        </div>
                        <div className='userData'></div>
                    </div>
                </ModalBody>

            </ModalContent>
        </>
    );
}