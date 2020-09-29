import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import CustomSelect from "./CustomSelect";

let container = null

beforeEach(()=>{
    container = document.createElement("div");
    document.body.appendChild(container);
})

afterEach(()=>{
    unmountComponentAtNode(container);
    container.remove();
    container = null;
})

it('select numbers in render',()=>{
    act(()=>{
        render(<CustomSelect/>, container)
    })
    expect(container.textContent).toBe("102050")
})