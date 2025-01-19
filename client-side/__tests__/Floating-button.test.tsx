import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import FloatingActionButton from '@/components/Floating-button' 
import '@testing-library/jest-dom'

describe("Floating Ation button", ()=>{
    it('renders the floating action button', () => {
        render(<FloatingActionButton />);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('fixed');
      });
})