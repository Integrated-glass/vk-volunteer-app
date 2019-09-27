import React, {useState} from 'react';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Search from '@vkontakte/vkui/dist/components/Search/Search';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';

const interests = [
  { id: 1, name: 'Секс' },
  { id: 2, name: 'Наркотики' },
  { id: 3, name: 'Рок-н-ролл' },
  { id: 4, name: 'Гринпис' },
  { id: 5, name: 'Шмотки' },
  { id: 6, name: 'Котики' },
  { id: 7, name: 'Фарфор' },
  { id: 8, name: 'Китайская культура' },
  { id: 9, name: 'Живопись' },
  { id: 10, name: 'Машины' },
  { id: 11, name: 'Литература' },
  { id: 12, name: 'Компьютер саенс' },
];

const Interests = () => {
  const [search, changeSearch] = useState('');
  const [results, changeResults] = useState(interests);
  const [chosen, changeChosen] = useState([]);

  const onSearchChange = (value) => {
    changeSearch(value);
    changeResults(interests.filter(({name}) => name.toLowerCase().indexOf(value) > -1));
  };

  const onSelectableChange = (value) => {
    if (chosen.find(interest => interest.id === value.id)) {
      changeChosen(chosen.filter(interest => interest.id !== value.id));
    } else {
      changeChosen(chosen.concat([value]));
    }
  };

  return (
    <FormLayout>
      <FormLayoutGroup>
        <Search value={search} onChange={onSearchChange}/>
        <Group>
          <List>
            {results.map(result => (
              <Cell key={result.id} selectable onClick={() => onSelectableChange(result)}>{ result.name }</Cell>
            ))}
          </List>
        </Group>
      </FormLayoutGroup>
    </FormLayout>
  );
};

export default Interests;
