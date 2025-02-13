import React from "react"
import {screen, render} from "@testing-library/react"

import {ReachWidget} from "./reach-widget";

describe("ReachWidget", () => {
    it("should render the component", () => {
        render(<ReachWidget contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})
