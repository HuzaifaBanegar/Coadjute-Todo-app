import { jest } from '@jest/globals'
import { describe, it, expect, beforeEach } from '@jest/globals'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Todo from "@/components/Todo/layout"
import React from 'react'
import axios from 'axios'
import '@testing-library/jest-dom'
import Navbar from '@/components/Navbar'

describe("Navbar Component", ()=>{
    it("should render", ()=>{
        render(<Navbar/>);
        expect(screen.getByAltText("Coadjute logo")).toBeInTheDocument();
        expect(screen.getByText("TRUEDO")).toBeInTheDocument();
        expect(screen.getByText("by Coadjute")).toBeInTheDocument();
    })
})