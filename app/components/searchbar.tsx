import styles from './searchbar.module.css';

export default function Searchbar() {
  return (
    <form className={styles.searchbarBase}>
      <div className='flex-4'>
        <input type='text' placeholder="Search entries" className='w-full h-full'/>
      </div>
    </form>
  );
}