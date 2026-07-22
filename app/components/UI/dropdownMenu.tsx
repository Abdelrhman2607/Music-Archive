
import styles from './dropdownMenu.module.css';

type checkboxStateObject = {
  state: string[];
  setter: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function DropdownMenu({ options, isOpen, name, optionsState }:
  { options: string[], isOpen: boolean, name: string, optionsState: checkboxStateObject }) {

  function DropdownItem({ labelText, name }: { labelText: string, name: string }) {
    return (
      <label className={styles.dropdownItem}>
        <input 
        type='checkbox' 
        value={labelText} 
        name={name} 
        onChange={handleCheckBoxChange}
        checked={optionsState.state.includes(labelText)} />
        {labelText}
      </label>
    );
  }

  function handleCheckBoxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedValue = event.target.value;
    const isChecked = event.target.checked;

    const newSelection = isChecked
      ? [...optionsState.state, selectedValue]
      : optionsState.state.filter((value: string) => value !== selectedValue);

    optionsState.setter(newSelection);
  }

  return (isOpen ?
    <div className={styles.dropdownMenu}>
      <input className={styles.dropdownSearch} type='text' placeholder='Search filters'/>
      {options.map((option) => {
        return (<DropdownItem key={option} labelText={option} name={name} />);
      }
      )}
    </div>
    : null
  );

}