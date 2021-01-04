export interface TableAction {
  onClick?: (data: any, actionKey: string | number) => void;
  icon?: React.ReactNode;
  label?: string;
  key: string | number;
  place?: 'top' | 'row';
  color?: 'default' | 'primary' | 'secondary';
  variant?: 'outlined' | 'contained';
}
