import * as React from 'react';
import 'src/build/client/scripts/components/elements/tooltip/styles/Tooltip.css';

export interface TooltipProps {
  label: string;
  title: string;
  className?: string;
}

export const Tooltip: React.StatelessComponent<TooltipProps> = (props) => {
  return (
    <div className={props.className || 'graph-tooltip--default'}>
      <div className="graph-tooltip__content">
        <h6 className="graph-tooltip__title">
          {props.title}
        </h6>
        <p className="graph-tooltip__label">
          {props.label}
        </p>
      </div>
    </div>
  );
};

export default Tooltip;

