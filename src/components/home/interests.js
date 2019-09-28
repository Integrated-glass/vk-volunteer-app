import React, {useState, useEffect} from 'react';
import gql from 'graphql-tag';
import { useApolloClient } from '@apollo/react-hooks';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Search from '@vkontakte/vkui/dist/components/Search/Search';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';

const GET_TAGS = gql`
    {
        tags {
            id
            name
        }
    }
`;

const Interests = () => {
  const [search, changeSearch] = useState('');
  const [tags, changeTags] = useState([]);
  const [results, changeResults] = useState([]);
  const [chosen, changeChosen] = useState([]);
  const client = useApolloClient();

  const onSearchChange = (value) => {
    changeSearch(value);
    changeResults(tags.filter(({name}) => name.toLowerCase().indexOf(value) > -1));
  };

  const onSelectableChange = (value) => {
    if (chosen.find(interest => interest.id === value.id)) {
      changeChosen(chosen.filter(interest => interest.id !== value.id));
    } else {
      changeChosen(chosen.concat([value]));
    }
  };

  useEffect(() => {
    client.query({
      query: GET_TAGS,
    })
      .then(result => {
        changeTags(result.data.tags);
        changeResults(result.data.tags);
      })
  }, []);

  return (
    <FormLayout>
      <FormLayoutGroup>
        <Search value={search} onChange={onSearchChange}/>
        <Group style={{height: 300}}>
          {tags && (
            <List>
              {results.map(tag => (
                <Cell key={tag.id} selectable onClick={() => onSelectableChange(tag)}>{ tag.name }</Cell>
              ))}
            </List>
          )}
        </Group>
      </FormLayoutGroup>
    </FormLayout>
  );
};

export default Interests;
