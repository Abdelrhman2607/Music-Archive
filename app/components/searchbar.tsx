import styles from './searchbar.module.css';

export default function Searchbar() {
  return (
    <form className={styles.searchbarBase}>
      <div className='flex-4'>
        <input type='text' placeholder="Search entries" className='w-full h-full'/>
      </div>

      <div className='flex-1 px-5 bg-blue-300'>
        <label>
          <input type='radio' name='searchType' defaultChecked/>
          By Title
        </label>
        <br />
        <label>
          <input type='radio' name='searchType' />
          By Category
        </label>
        <br />
        <label>
          <input type='radio' name='searchType' />
          By Tags
        </label>
        <br />

      </div>
    </form>
  );
}