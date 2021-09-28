import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form.js';
import { v4 as uuid } from 'uuid';

import Header from '../header/header.js';
import Form from '../form/form.js';
import List from '../list/list.js';
import { SettingsContext } from '../../context/setting/context';
import NotesPerPage from '../notesPerPage/notesPerPage.js';
import Auth from '../../context/auth/auth';
const store = require('store')


const ToDo = () => {

  const settings = useContext(SettingsContext);

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);

  //local storage 
  const data = store.get('Notes')



  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(settings.itemNumber);

  function getItem() {
    setList(data);
    // setEndPage(store.get('number'))
  }




  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);//
    console.log(list, 'liiit');
    store.set('Notes', list)
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map(item => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);

  };

  // getting element from local storage
  useEffect(() => {
    if (data !== undefined) {
      console.log('getting data')
      getItem()
    }

  }, [])

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  function pagination() {
    let result = list.slice(startPage, endPage);
    return result;
  }

  function next() {
    setStartPage(startPage + settings.itemNumber);
    setEndPage(endPage + settings.itemNumber);
  }
  function previous() {
    setEndPage(endPage - settings.itemNumber);
    setStartPage(startPage - settings.itemNumber);
  }

  return (
    <>
      <Header incomplete={incomplete} />

      <Auth capability="create">
        <Form
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />

      <NotesPerPage setEndPage={setEndPage} />
      </Auth>

      <Auth capability="read">

      <List
        pagination={pagination}
        next={next}
        previous={previous}
        toggleComplete={toggleComplete}
        deleteItem={deleteItem}
      />
      </Auth>


    </>
  );
};

export default ToDo;
