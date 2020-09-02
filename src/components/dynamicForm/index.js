import React, { useState, useEffect } from 'react';
import Form from '@rjsf/material-ui';
import './style.css';

const DynamicForm = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [schemas, setSchemas] = useState([]);

    useEffect(() => {
        // The URLs 
        let urls = [
            'https://public.zopyx.com/react-forms/form.json', // json Schema
            'https://public.zopyx.com/react-forms/ui.json',   // uiSchema
            'https://public.zopyx.com/react-forms/model.json' // formData Schema
        ];
        let requests = urls.map(url => fetch(url));

        Promise.all(requests)
            .then(
                responses =>
                    Promise.all(responses.map(r => r.json()))
            )
            .then(
                (responsedSchemas) => {
                    setSchemas(responsedSchemas);
                    setIsLoaded(true);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="container">
                <Form
                    schema={schemas[0]}
                    formData={schemas[2]}
                    uiSchema={schemas[1]}
                    onChange={() => console.log("changed")}
                    onSubmit={() => console.log("submitted")}
                    onError={() => console.log("errors")} />
            </div>
        );
    };
}
export default DynamicForm;
