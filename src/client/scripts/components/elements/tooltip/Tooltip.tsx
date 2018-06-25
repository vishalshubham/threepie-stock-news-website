import * as React from 'react';
import 'src/build/client/scripts/components/elements/tooltip/styles/Tooltip.css';
import { Card, Icon, Avatar } from 'antd';
const { Meta } = Card;

export interface TooltipProps {
  label: string;
  title: string;
  className?: string;
}

export const Tooltip: React.StatelessComponent<TooltipProps> = (props) => {
  return (
    <div className={props.className || 'graph-tooltip--default'}>
      <div className="graph-tooltip__content">
        <Card
          style={{ width: 300 }}
          actions={[
            <Icon key="setting" type="setting" />,
            <Icon key="edit" type="edit" />,
            <Icon key="ellipsis" type="ellipsis" title="Read Article"/>
          ]}
        >
          <Meta
            title={props.title}
            description={props.label}
          />
        </Card>
      </div>
    </div>
  );
};

export default Tooltip;
