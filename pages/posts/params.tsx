import { useRouter } from 'next/router';
import * as React from 'react';

interface IParamsPageProps {
}

const ParamsPage: React.FunctionComponent<IParamsPageProps> = (props) => {
    const router = useRouter()

    return  <div>
                <h1>Params Page</h1>
                <p>Query: {JSON.stringify(router.query)}</p>
            </div>;
};

export default ParamsPage;

// ở cả 2 mode: dev, production -> khi request lên trang params -> đều gọi đến getServerSideProps ->request bao nhiêu lần -> trả về data bấy nhiêu lần
export const getServerSideProps = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    // fake slow query    
    return {
        props: {}
    }
}
