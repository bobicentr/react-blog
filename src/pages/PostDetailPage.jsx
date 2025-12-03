import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function PostDetailPage() {

    const { id } = useParams()
    const [post, setPost] = useState({})
    const [commentaries, setCommentaries] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchAllData = async () => {
          setIsLoading(true);
          setError(null);
    
          try {
            const postPromise = fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            const commentsPromise = fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    
            const [postResponse, commentsResponse] = await Promise.all([postPromise, commentsPromise]);
    
            if (!postResponse.ok || !commentsResponse.ok) {
              throw new Error('Ошибка сети или сервера при загрузке данных');
            }
    
            const [postData, commentsData] = await Promise.all([
              postResponse.json(),
              commentsResponse.json()
            ]);
    
            setPost(postData);
            setCommentaries(commentsData);
    
          } catch (error) {
            setError(error);
            console.error("Произошла ошибка при загрузке данных:", error);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchAllData();
      }, [id]); 

      if (isLoading) {
        return <div className="text-center text-xl mt-20">Загрузка поста...</div>;
    }
    
    if (error) {
        return <div className="text-center text-xl text-red-500 mt-20">Ошибка: {error.message}</div>;
    }
    
    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6">
            <Link 
                to='/' 
                className="inline-flex items-center gap-2 text-sm text-sky-600 dark:text-sky-400 hover:underline mb-6"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                К списку постов
            </Link>
        
            <article className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                    {post.title}
                </h1>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                    {post.body}
                </p>
            </article>
    
            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-slate-200 dark:border-slate-700">
                    Комментарии ({commentaries.length})
                </h2>
                <div className="space-y-6">
                    {commentaries.map(comment => (
                        <div key={comment.id} className="bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow">
                            <div className="flex items-center mb-2">
                                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-sky-600 dark:text-sky-400 mr-3">
                                    {comment.email.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">{comment.name}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{comment.email}</p>
                                </div>
                            </div>
                            <p className="text-slate-700 dark:text-slate-300">
                                {comment.body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PostDetailPage