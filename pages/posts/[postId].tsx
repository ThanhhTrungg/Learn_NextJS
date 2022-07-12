import { useRouter } from 'next/router';
import * as React from 'react';

interface IPostDetailProps {
}

const PostDetail: React.FunctionComponent<IPostDetailProps> = (props) => {
    const router = useRouter()
    console.log(router);
    

    return  <div>
                <h1>Post Detail Page</h1>
                <p>Query: {JSON.stringify(router.query)}</p>
            </div>;
};

export default PostDetail;
