import React, { useState } from 'react';
const store = require('store')

export const SettingsContext = React.createContext();

export default function SettingsProvider(props) {
    // take data from local storage 
    const preferenceChoice=()=>{
        let numberOfPage;
        if (store.get('number')!== undefined) {
            numberOfPage=store.get('number')
            return numberOfPage
        };
        return 3

    }
    const [hide, setHide] = useState(false);
    const [itemNumber, setItemNumber] = useState(preferenceChoice());
    const [sort, setSort] = useState('difficulty');
    console.log(itemNumber,'numm')
    // store.set('number',itemNumber)


    return (
        <SettingsContext.Provider value={{ hide, itemNumber, sort,setItemNumber}}>
            {props.children}
        </SettingsContext.Provider>
    )
}