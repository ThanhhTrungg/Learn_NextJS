import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

interface IPostDetailProps {
    post: any
}

const PostDetail: React.FunctionComponent<IPostDetailProps> = ({post}) => {
    const router = useRouter()

    if(router.isFallback) return <div style={{textAlign: "center", fontSize: "2rem"}}>Loading ...</div>

    if(!post) return null
    return  <div>
                <h1>Post Detail Page</h1> 
                <p>{post.title}</p>
                <p>{post.body}</p>
            </div>;
};

export default PostDetail;


export const getStaticProps: GetStaticProps<IPostDetailProps> = async (context: GetStaticPropsContext) => {
    console.log("Get static props", context.params?.postId); 
    const postId = context.params?.postId
    if(!postId) return {
        notFound: true,
    } 

    
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    const data = await response.json()
    console.log(data);

    return {
        props: { 
            post: data,
        },
        revalidate: 5, // Tạo ISR: chỉ cần thêm revalidate với giá trị vào SSG
    }
}

// getStaticPaths with fallback 
export const getStaticPaths: GetStaticPaths = async ()=> {
    console.log("Get static paths");

     // fetch api phía server
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_page=1")
    const data = await response.json()

    return {
        paths: data.map((post: any) => ({params: {postId : post.id.toString()}})),
        // fallback: "blocking",
        fallback: true,
    }
}

