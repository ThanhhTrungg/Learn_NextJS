import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// import Header from '~/components/common/header';

// Dynamic component: chỉ render phía client khi ssr: false, còn khi ssr: true sẽ render cả phía client và server
const Header = dynamic(()=> import("../components/common/header"), {ssr: false})

interface IAboutPageProps {
}

const AboutPage: React.FunctionComponent<IAboutPageProps> = (props) => {
    const [postList, setPostList] = useState([])

    const  router = useRouter()
    // render file html dưới server local -> Automatic Static optimization
    /* Query 2 lần:
        object ban đầu là rỗng (empty)
        khi đưa query param -> object mới có giá trị
    */
    console.log("About query: ", router.query);

    const page =  router.query?.page

    // SSG with Data fetching on client side
    useEffect(()=> {
        if(!page) return;

        const fetchApi = async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)
        const data = await response.json()

        setPostList(data)
        }
        fetchApi()
    },[page])

    // Router push with Shallow routing
    const handleNextClick = () => {
        router.push({
        pathname: "/about", query: {
            page: (Number(page) || 1) + 1,
        }
        }, undefined, {shallow: true}) // có shallow routing: true -> ko gọi lại hàm getStaticProps -> render phía client
    }
    
    return  <div>
                <h1>About Page</h1>
                <Header/>

                <ul className='post-list'>
                {postList.map((post: any) => <li key={post.id}>{post.title}</li>)}
                </ul>

                <button onClick={handleNextClick}>Next Page</button>
            </div>
};

export default AboutPage;

export const getStaticProps = async () => {
    console.log("Get Static Props");
    return {
        props: {}
    }
}

// when have function getServerSideProps => render file js dưới server local-> No automatic static optimization -> object ban đầu đã có giá trị 
// export const getServerSideProps= async () => {
//     return {
//         props: {}
//     }
// }