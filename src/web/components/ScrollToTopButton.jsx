import React, { useState, useEffect } from 'react';
import {
    Button
} from '@chakra-ui/react';
import { FiArrowUp } from "react-icons/fi";


function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!visible) return null;

    return (
        <Button
            position='fixed'
            bottom='8%'
            right='5%'
            zIndex="1000"
            background='#FFFFFF'
            color='#000000'
            border='1px solid #CED4D3'
            borderRadius='full'
            padding='0'
            width={{base: '40px', md: '48px'}}
            height={{base: '40px', md: '48px'}}
            fontSize={{base: '14px', md: '18px'}}
            display='flex'
            alignItems='center'
            justifyContent='center'
            cursor='pointer'
            boxShadow='0 2px 8px rgba(0,0,0,0.2)'
            _hover={{
                background: '#FFFFFF',
                color: '#F49040',
                border: '1px solid #F49040',
                shadow: '0 0px 12px #F4904050'
            }}
            _focus={{outline: 'none', boxShadow: 'none', bg: '#FFFFFF'}}
            onClick={scrollToTop}
            aria-label="Scroll to top"
        >
            <FiArrowUp  m="0" p="0" />
        </Button>
    );
}

export default ScrollToTopButton; 