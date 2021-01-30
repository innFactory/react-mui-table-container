import DeleteIcon from '@material-ui/icons/Delete';
import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import { TableAction, TableContainer } from '../src';

const meta: Meta = {
  title: 'TableContainer',
  component: TableContainer,
};

interface MyDataType {
  firstName: string;
  lastName: string;
  roles: string[];
}

const initialData: MyDataType[] = [
  { firstName: 'Hans', lastName: 'Dampf', roles: ['Admin'] },
  { firstName: 'Peter', lastName: 'Lustig', roles: ['Bereich1', 'Bereich2'] },
  {
    firstName: 'Pipi',
    lastName: 'Langstrumpf',
    roles: ['Bereich2', 'Viewer_XY'],
  },
];

const Template: Story<{}> = (args) => {
  const [data, setData] = React.useState(initialData);

  const addAction: TableAction = {
    key: 0,
    onClick: () =>
      setData([
        ...data,
        { firstName: 'Sepp', lastName: 'Schnell', roles: ['Admin'] },
      ]),
    label: 'Hinzufügen',
  };

  const deleteAction: TableAction = {
    key: 'delete',
    label: 'löschen',
    place: 'row',
    icon: <DeleteIcon />,
    onClick: (d) => setData(data.filter((d1) => d.lastName !== d1.lastName)),
  };

  return (
    <TableContainer<MyDataType>
      {...args}
      data={data}
      columns={[
        { name: 'firstName', header: 'Vorname' },
        { name: 'lastName', header: 'Nachname' },
        { name: 'rolesAsString', header: 'Rollen' },
      ]}
      mapTableData={(data) =>
        data.map((h) => ({
          ...h,
          rolesAsString: h.roles.join(', '),
        }))
      }
      searchKeys={['firstName', 'lastName', 'roles']}
      actions={[addAction, deleteAction]}
    />
  );
};

export default meta;

export const Default = Template.bind({});

Default.args = {};
