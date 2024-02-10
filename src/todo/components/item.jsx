import { memo, useState, useCallback } from "react";
import classnames from "classnames";
import {TimeCalculate} from './input'
import { Input } from "./input";
import { useLocation } from "react-router-dom";

import { TOGGLE_ITEM, REMOVE_ITEM, UPDATE_ITEM } from "../constants";

export const Item = memo(function Item({ todo, dispatch, index, handleItems, selectedArry }) {
    const [isWritable, setIsWritable] = useState(false);
    const { title, completed, id, addedTime, completedTime } = todo;
    const { pathname: route } = useLocation();

    const toggleItem = useCallback(() => dispatch({ type: TOGGLE_ITEM, payload: { id, completedTime:TimeCalculate() } }), [dispatch]);
    const removeItem = useCallback(() => dispatch({ type: REMOVE_ITEM, payload: { id } }), [dispatch]);
    const updateItem = useCallback((id, title) => dispatch({ type: UPDATE_ITEM, payload: { id, title, addedTime:TimeCalculate() } }), [dispatch]);
    
    const handleChange = () => {
        toggleItem()
        handleItems(todo.id)
    }

    const handleChangeClose = () => {
        removeItem()
        handleItems(todo.id)
    }
    
    const handleDoubleClick = useCallback(() => {
        setIsWritable(true);
    }, []);

    const handleBlur = useCallback(() => {
        setIsWritable(false);
    }, []);

    //based on array index showing the color of completed todo lists
    const colours = () =>{
        if (route !== "/active") {
            switch (todo.id) {
            case selectedArry [2]:
              return 'yellow';
            case selectedArry[1]:
              return 'magenta';
            case selectedArry[0]:
              return 'green';
            default:
              return 'grey';
            }
          }
    }

    const handleUpdate = useCallback(
        (title) => {
            if (title.length === 0)
                removeItem(id);
            else
                updateItem(id, title);

            setIsWritable(false);
        },
        [id, removeItem, updateItem]
    );

    const classReturn = () => {
        if(completed){
            return 'completed'
        }
        else if(route !== "/active") {
            return 'activity'
        }
        return ''
    }

    return (
        <li className={classnames({ completed: todo.completed })} data-testid="todo-item">
            <div className="view">
                {isWritable ? (
                    <Input onSubmit={handleUpdate} label="Edit Todo Input" defaultValue={title} onBlur={handleBlur} />
                ) : (
                    <>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div className="todoCell">
                                <input className="toggle" type="checkbox" data-testid="todo-item-toggle" checked={completed} onChange={() => handleChange(todo)} />
                                <label style={{color: colours()}} className={classReturn()} data-testid="todo-item-label" onDoubleClick={handleDoubleClick}>
                                    {title}
                                </label>
                            </div>
                            <div className="todoAdded">
                                <label style={{color: colours(),textDecoration: 'lineThrough'}} className= 'lableTodo' data-testid="todo-item-label" onDoubleClick={handleDoubleClick}>
                                    {addedTime}
                                </label>
                            </div>
                            <div className="todoCompleted">
                                <label style={{color: colours(), textDecoration: 'lineThrough'}} className= 'lableTodo' data-testid="todo-item-label" onDoubleClick={handleDoubleClick}>
                                    {completedTime === '' ? <div style={{padding: '0 15px'}}>--</div>: completedTime}
                                </label>
                            </div>
                        </div>
                        <button className="destroy" data-testid="todo-item-button" onClick={handleChangeClose} />
                    </>
                )}
            </div>
        </li>
    );
});
