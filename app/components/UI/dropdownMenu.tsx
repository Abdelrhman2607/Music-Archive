
import styles from './dropdownMenu.module.css';

export default function DropdownMenu({ options, isOpen, name }: {options: string[], isOpen: boolean, name: string}) {

  return ( isOpen ?
    <div className={styles.dropdownMenu}>
      {options.map((option, index) => {
          return (<DropdownItem key={index} labelText={option} name={name}/>);
        }
      )}
    </div>
    : null
  );
}

function DropdownItem({labelText, name}: {labelText: string, name: string}) {
  return(
    <label className={styles.dropdownItem}>
      <input type='checkbox' value={labelText} name={name}/>
      {labelText}
    </label>
  );
}