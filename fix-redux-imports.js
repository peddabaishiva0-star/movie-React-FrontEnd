const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/components/Layout/Header.tsx',
  'src/components/Layout/Sidebar.tsx',
  'src/components/MovieCard/MovieCard.tsx',
  'src/pages/MovieDetails.tsx',
  'src/pages/MoviesByYear.tsx',
  'src/pages/MoviesByGenre.tsx',
  'src/pages/Genres.tsx',
  'src/pages/Search.tsx',
  'src/pages/Favorites.tsx',
  'src/pages/Watchlist.tsx'
];

filesToFix.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace imports
    content = content.replace(
      /import { useDispatch, useSelector } from 'react-redux';\nimport { RootState } from '\.\.\/\.\.\/store';/g,
      "import { useAppDispatch, useAppSelector } from '../hooks/redux';"
    );
    
    content = content.replace(
      /import { useDispatch, useSelector } from 'react-redux';\nimport { RootState } from '\.\.\/store';/g,
      "import { useAppDispatch, useAppSelector } from '../hooks/redux';"
    );
    
    content = content.replace(
      /import { useDispatch, useSelector } from 'react-redux';\nimport { RootState } from '\.\.\/\.\.\/\.\.\/store';/g,
      "import { useAppDispatch, useAppSelector } from '../../hooks/redux';"
    );
    
    // Replace usage
    content = content.replace(/const dispatch = useDispatch\(\);/g, 'const dispatch = useAppDispatch();');
    content = content.replace(/useSelector\(\(state: RootState\) =>/g, 'useAppSelector((state) =>');
    
    fs.writeFileSync(fullPath, content);
    console.log(`Fixed ${filePath}`);
  }
});

console.log('All files fixed!');
