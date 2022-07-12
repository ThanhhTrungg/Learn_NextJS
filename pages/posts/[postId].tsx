import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

interface IPostDetailProps {
    post: any
}

const PostDetail: React.FunctionComponent<IPostDetailProps> = ({post}) => {
    const router = useRouter()

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

    // fetch api phía server
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    const data = await response.json()
    console.log(data);

    return {
        props: { 
            post: data,
        }
    }
}

// Static HTML + JSON Data + Dynamic Routes
// truyền vào array paths bao nhiêu item -> gọi function getStaticProps bấy nhiêu lần -> ứng với mỗi getStaticProps sẽ tạo ra 1 file html + json tương ứng
// dynamic routes (query params) bắt buộc phải dạng String ( toString() )
export const getStaticPaths: GetStaticPaths = async ()=> {
    console.log("Get static paths");

     // fetch api phía server
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_page=1")
    const data = await response.json()

    return {
        paths: data.map((post: any) => ({params: {postId : post.id.toString()}})),
        fallback: false,
    }
}

