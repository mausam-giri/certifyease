export type TooltipProps = {
  children: React.ReactNode;
  tooltipText: string;
  position?: "right" | "left" | "top" | "bottom";
  className?: string;
};
export default function Tooltip(props: TooltipProps) {
  const { children, tooltipText, position = "bottom" } = props;
  return (
    <div className={`tooltip-trigger ${props.className}`} {...props}>
      {children}
      <p className={`tooltip tooltip-${position}`}>{tooltipText}</p>
    </div>
  );
}
