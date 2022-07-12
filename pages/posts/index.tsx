import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import * as React from 'react';

interface IPostListProps {
    posts: any[]
}

// Static HTML Generation: function render dữ liệu phía client
const PostList: React.FunctionComponent<IPostListProps> = ({posts}) => {
    console.log("posts: ", posts);

    return  <div>
                <h1>Post List Page</h1>
                <ul>
                    {posts.map(post => <li key={post.id}>
                        <Link href={`/posts/${post.id}`}>
                            <a>{post.title}</a>
                        </Link>
                    </li>)}
                </ul>
            </div>;
};

export default PostList;

// Static HTML + JSON Data: sử dụng function getStaticProps 
// Server side: run lúc build time, hàm này chỉ đc chạy phía server, ko chạy phía client -> viết được code phía server
// chạy môi trường dev: mỗi lần request lại chạy lại hàm này
// chạy môi trường build product: chạy đúng 1 lần lúc build, các lần request sau ko chạy lại đã có sẵn
// không được dùng chung vs hàm getServerSideProps 
export const getStaticProps: GetStaticProps<IPostListProps> = async (context: GetStaticPropsContext) => {
    console.log("static props");

    // fetch api phía server
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_page=1")
    const data = await response.json()
    console.log(data);

    return {
        props: {
            posts: data.map((x: any) => ({id: x.id, title: x.title}))
        }
    }
} 