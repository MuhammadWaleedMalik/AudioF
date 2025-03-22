import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiSearch } from 'react-icons/fi';
import FilterBar from '../components/FilterBar';
import ImageCard from '../components/ImageCard';
import { Filter, Image } from '../types';

// Mock data for images
const mockImages = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 1}`,
  url: `https://cdn.midjourney.com/image-${i + 1}.png`,
  title: `Image Title ${i + 1}`,
  author: `Author ${i + 1}`,
  authorAvatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 10}.jpg`,
  likes: Math.floor(Math.random() * 2000),
  views: Math.floor(Math.random() * 10000),
  tags: ['tag1', 'tag2', 'tag3'].slice(0, Math.floor(Math.random() * 3) + 1),
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
}));

// Mock filters
const filters = [
  {
    id: 'style',
    name: 'style',
    value: 'realistic,abstract,cartoon,anime,digital,oil,watercolor'
  },
  {
    id: 'category',
    name: 'category',
    value: 'landscape,portrait,character,concept,architecture,product'
  },
  {
    id: 'timeframe',
    name: 'timeframe',
    value: 'today,week,month,year'
  }
];

const Explore = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredImages, setFilteredImages] = useState(mockImages);

  const handleFilterChange = (filterId, value) => {
    console.log(`Filter changed: ${filterId} = ${value}`);
    // In a real app, this would filter the images based on the selected filters
    // For this demo, we'll just log the filter change
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${searchQuery}`);
    // In a real app, this would search the images based on the query
    // For this demo, we'll just log the search query
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-6">{t('explore')}</h1>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full bg-secondary text-white border border-gray-700 rounded-lg py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </form>
      </div>
      
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      
      <div className="image-grid">
        {filteredImages.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
      
      <div className="text-center mt-12">
        <button className="btn btn-secondary px-8 py-3">
          {t('loadMore')}
        </button>
      </div>
    </div>
  );
};

export default Explore;