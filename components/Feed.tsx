'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import PromptCardList from './PromptCardList';
import { PromptType } from '@models/prompt';

function Feed() {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState<PromptType[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }

    loadPosts();
  }, []);

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
}

export default Feed;
