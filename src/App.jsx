import { useState, useEffect } from 'react'
import PostDetailPage from './pages/PostsListPage'
import './App.css'
import PostsListPage from './pages/PostDetailPage'
import { Routes, Route } from 'react-router-dom';

function App() {
  

  return (
    <div className="container mx-auto p-4">
      <Routes>
        <Route path="/" element={<PostsListPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
