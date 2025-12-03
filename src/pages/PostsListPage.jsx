import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function PostsListPage () {

    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/posts');
          if (!response.ok) {
            throw new Error('Ошибка сети или сервера');
          }
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          setError(error);
          console.log('Произошла ошибка: ', error);
        } finally {
          setIsLoading(false);
        }
      };
    
      fetchPosts();
    }, [])

    return (
        <>
            {isLoading ? (
                <p className=" dark:text-white text-2xl md:text-3xl ">Loading...</p>
            ) : (
                
                    <div className="grid auto-rows-fr grid-cols-2 md:grid-cols-4 gap-3 ">
                        {posts.map(post => (
                        <Link key={post.id} to={`/posts/${post.id}`}>
                            <div className="flex text-left justify-around h-full flex-col bg-zinc-300 dark:bg-slate-950 dark:text-white pl-2 pt-1 ">
                                <p className="border-b-1 border-zinc-950 dark:border-zinc-50" >{post.title}</p>
                                <p className="">{post.body}</p>
                            </div>
                        </Link>
                        ))}
                        
                    </div>
            )}
        </>
        
    )
}

export default PostsListPage