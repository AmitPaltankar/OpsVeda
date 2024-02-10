import { useMemo, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";

import { Item } from "./item";
import classnames from "classnames";

import { TOGGLE_ALL } from "../constants";
import {TimeCalculate} from './input'

export function Main({ todos, dispatch }) {
    const { pathname: route } = useLocation();
    const [selectedArry, setselectedArry] = useState([]);

    //used for color handle of completed todo lists
    const handleItems = (id) => {
        let selectedArry1 = [...selectedArry]
        if (selectedArry1.includes(id)) {
            selectedArry1 = selectedArry1.filter(item => item !== id)
            setselectedArry(selectedArry1)
        } else {
            selectedArry1.unshift(id)
            setselectedArry(selectedArry1)
        }
    }
    
    const visibleTodos = useMemo(
        () =>
            todos.filter((todo) => {
                if (route === "/active")
                    return !todo.completed;

                if (route === "/completed")
                    return todo.completed;

                return todo;
            }),
        [todos, route]
    );

    const toggleAll = useCallback((e) => dispatch({ type: TOGGLE_ALL, payload: { completed: e.target.checked, completedTime: TimeCalculate() } }), [dispatch]);

    //to reset the color of all todo lists 
    const handleToggleAll = (e) => {
        toggleAll(e)
        setselectedArry([])
    }

    return (
        <main className="main" data-testid="main">
            {visibleTodos.length > 0 ? (
                <div className="toggle-all-container">
                    <input className="toggle-all" type="checkbox" data-testid="toggle-all" checked={visibleTodos.every((todo) => todo.completed)} onChange={handleToggleAll} />
                    <label className="toggle-all-label" htmlFor="toggle-all">
                        Toggle All Input
                    </label>
                </div>
            ) : null}
            <ul className={classnames("todo-list")} data-testid="todo-list">
                {visibleTodos.length > 0 && <div style={{display: 'flex', padding: '5px 0px'}}>
                    <div className="todoCell flex" >Todos</div>
                    <div className="todoAdded flex">Added Date & Time</div>
                    <div className="todoCompleted flex">Completed Dat & Time</div>
                </div>}
                {visibleTodos.map((todo, index) => (
                    <Item todo={todo} key={todo.id} dispatch={dispatch} index={index} handleItems={(id) => handleItems(id)} selectedArry={selectedArry} />
                ))}
            </ul>
        </main>
    );
}
