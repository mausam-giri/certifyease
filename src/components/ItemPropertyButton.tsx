export interface ItemPropertyButtonProps {
  className?: string;
  name?: string;
  onClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}
const ItemPropertyButton = (props: ItemPropertyButtonProps) => {
  const { name, className, onClick, children } = props;
  return (
    <button
      name={name}
      type="button"
      className={`m-0 rounded-none bg-gray-100  hover:bg-gray-200 border border-gray-300 py-2 px-3 h-10 focus:ring-gray-100 focus:ring-2 focus:outline-none z-[14] flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ItemPropertyButton;
