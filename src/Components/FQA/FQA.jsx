
import { useEffect, useState } from 'react';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
const FQA = () => {

    const [fqa, setFqa] = useState([]);
    useEffect(() => {
        fetch("https://rw-server-gkzvfj4px-toufiqulislamtanmoy.vercel.app/fqa").then(res => res.json()).then(data => setFqa(data))
    }, [])
    return (
        <div className='my-10 mx-5'>
            <h2 className='font-mono text-3xl font-bold mb-3'>FQA</h2>
            <Accordion>
                {
                    fqa.map(sfqa =>

                        <AccordionItem key={sfqa.id}>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    {sfqa.question}
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <p>
                                    {sfqa.answer}
                                </p>
                            </AccordionItemPanel>
                        </AccordionItem>
                    )
                }
            </Accordion>
        </div>
    );
};

export default FQA;