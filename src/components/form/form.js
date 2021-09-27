'use strict';
import React from "react";
import { Button } from '@mui/material';
import './form.scss'
import Form from 'react-bootstrap/Form'

function Form1(props) {
    return (
        <Form onSubmit={props.handleSubmit}>

            <h2>Add To Do Item</h2>

            <Form.Label>
                <span>To Do Item</span>
                <input onChange={props.handleChange} name="text" type="text" placeholder="Item Details" />
            </Form.Label>

            <Form.Label>
                <span>Assigned To</span>
                <input onChange={props.handleChange} name="assignee" type="text" placeholder="Assignee Name" />
            </Form.Label>
            <br/>
            <Form.Label>
            <span>Difficulty</span>
            <input onChange={props.handleChange} defaultValue={3} type ="range" min={1} max={5} name="difficulty" />
            </Form.Label>

            <Form.Label>
            <Button  variant="contained" type ="submit"  >Add Item</Button>
            </Form.Label>
        </Form>
    )
}

export default Form1