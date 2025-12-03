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
                                
                            <div className="h-full flex flex-col rounded-lg bg-white dark:bg-slate-800 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 p-4">
                                <h3 className="text-lg line-clamp-3 font-semibold text-slate-900 dark:text-slate-100 mb-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-4">
                                    {post.body}
                                </p>
                            </div>

  
                        </Link>
                        ))}
                        
                    </div>
            )}
        </>
        
    )
}

export default PostsListPage