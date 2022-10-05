// import { Component } from "react";
import { useState, useEffect, ChangeEvent } from 'react';

import { getData } from './utils/data.utils';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

export type Monster = {
  id: string;
  name: string;
  email: string;
};

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  console.log('rendered');

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getData<Monster[]>(
        'https://jsonplaceholder.typicode.com/users'
      );
      setMonsters(users);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter(monster =>
      monster.name.toLocaleLowerCase().includes(searchField)
    );
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = e.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className='App'>
      <h1 className='app-title'>Monsters Rolodex</h1>

      <SearchBox
        className='monster-search-box'
        placeHolder='Search monster'
        onChangeHandler={onSearchChange}
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }

//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then(response => response.json())
//       .then(users => {
//         this.setState(() => {
//           return { monsters: users };
//         });
//       });
//   }

//   onSearchChange(e) {
//     const searchField = e.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchField };
//     });
//   }

//   render() {
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter(monster =>
//       monster.name.toLocaleLowerCase().includes(searchField)
//     );

//     return (
//       <div className='App'>
//         <h1 className='app-title'>Monsters Rolodex</h1>

//         <SearchBox
//           className='monster-search-box'
//           placeholder='Search monster'
//           onChangeHandler={onSearchChange.bind(this)}
//         />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
