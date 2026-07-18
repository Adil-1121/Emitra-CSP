import React, { memo } from 'react';
import { QUICK_ACTIONS } from '../../../../../config/portfolioKnowledge';

const QuickActions = memo(({ onSelect }) => (
  <div className="chat-quick" role="group" aria-label="Quick action suggestions">
    <p className="chat-quick__label">Quick questions:</p>
    <div className="chat-quick__chips">
      {QUICK_ACTIONS.map((action, i) => (
        <button
          key={action.id}
          className="chat-quick__chip"
          onClick={() => onSelect(action.query)}
          style={{ animationDelay: `${i * 0.05}s` }}
          aria-label={action.label}
        >
          {action.label}
        </button>
      ))}
    </div>
  </div>
));

QuickActions.displayName = 'QuickActions';
export default QuickActions;
