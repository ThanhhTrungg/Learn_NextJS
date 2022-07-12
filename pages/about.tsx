import { useRouter } from 'next/router';
import React from 'react';

interface IAboutPageProps {
}

const AboutPage: React.FunctionComponent<IAboutPageProps> = (props) => {
    const  router = useRouter()
    // render file html dưới server local -> Automatic Static optimization
    /* Query 2 lần:
        object ban đầu là rỗng (empty)
        khi đưa query param -> object mới có giá trị
    */
    console.log("About query: ", router.query);
    
    return <div>About Page</div>
};

export default AboutPage;

// when have function getServerSideProps => render file js dưới server local-> No automatic static optimization -> object ban đầu đã có giá trị 
export const getServerSideProps= async () => {
    return {
        props: {}
    }
}