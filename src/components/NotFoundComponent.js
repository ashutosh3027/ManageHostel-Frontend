import React from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Alert, Button } from 'react-bootstrap';

const NotFoundComponent = () => {
    // State to keep track of the redirection
    const [redirectToDefault, setRedirectToDefault] = React.useState(false);

    // Function to handle redirection to default page
    const handleRedirect = () => {
        setRedirectToDefault(true);
    };

    if (redirectToDefault) {
        return <Navigate to="/" />;
    }

    return (
        <div className='main-content'>

            <Container>
                <Alert variant="danger" >
                    <Alert.Heading>404 - Page Not Found</Alert.Heading>
                    <p>The requested page could not be found.</p>
                    <Button variant="primary" onClick={handleRedirect}>
                        Go to Default Page
                    </Button>
                </Alert>
            </Container>
        </div>
    );
};

export default NotFoundComponent;
