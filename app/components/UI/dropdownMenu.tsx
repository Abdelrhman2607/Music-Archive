
import styles from './dropdownMenu.module.css';

export default function DropdownMenu({ options, isOpen }: {options: string[], isOpen: boolean}) {

  return ( isOpen ?
    <div>
      {options.map((option, index) => {
          return (<DropdownItem key={index} labelText={option}/>);
        }
      )}
    </div>
    : null
  );
}

function DropdownItem({labelText}: {labelText: string}) {
  return(
    <label>
      <input type='checkbox' value={labelText} />
      {labelText}
    </label>
  );
}