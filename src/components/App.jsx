import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { useState  } from 'react';
import css from './App.module.css';


export default function App() {
  const [newsearchimg, setNewsearchimg] = useState('');
  const [page, setPage] = useState(1);

  const incrementPage = () => {
    setPage(prevState => prevState + 1);
  };

  const handlFormSubmit = newsearchimg => {
    setNewsearchimg(newsearchimg);
    setPage(1);
  };

  return (
    <section className={css.App}>
      <div>
        <Searchbar handlFormSubmirt={handlFormSubmit} />
        <ImageGallery
          page={page}
          newsearchimg={newsearchimg}
          incrementPage={incrementPage}
        />
      </div>
    </section>
  );
}