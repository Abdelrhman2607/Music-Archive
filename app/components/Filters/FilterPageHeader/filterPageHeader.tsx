
import styles from './filterPageHeader.module.css';

export default function FilterPageHeader({ filterType }: {filterType: 'tag' | 'cat' | 'artist'}){
    const text = {
        'tag': 'Tags',
        'cat': 'Categories',
        'artist': 'Artists'
    }

    const colorClass = {
        'tag': styles.tag,
        'cat': styles.cat,
        'artist': styles.artist
    }

    return(
        (<h1 className={`${styles.pageHeader} ${colorClass[filterType]}`}><span style={{ fontWeight: '600'}}> {text[filterType]}</span></h1>)

    );
}
        
