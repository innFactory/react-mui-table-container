Live-Demo: [STORYBOOK](https://innfactory.github.io/react-mui-table-container)

# Usage

For table props and enhanced documentation: [mui-virtualized-table](https://github.com/techniq/mui-virtualized-table)

```jsx
function MyPage() {
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
    onClick: d => setData(data.filter(d1 => d.lastName !== d1.lastName)),
  };

  return (
    <TableContainer<MyDataType>
      data={data}
      columns={[
        { name: 'firstName', header: 'Vorname' },
        { name: 'lastName', header: 'Nachname' },
        { name: 'rolesAsString', header: 'Rollen' },
      ]}
      mapTableData={data =>
        data.map(h => ({
          ...h,
          rolesAsString: h.roles.join(', '),
        }))
      }
      searchKeys={['firstName', 'lastName', 'roles']}
      actions={[addAction, deleteAction]}
    />
  );
};
```
