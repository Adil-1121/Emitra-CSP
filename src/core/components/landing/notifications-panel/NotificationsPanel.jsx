import React from 'react';
import './NotificationsPanel.scss';

const NOTIFICATIONS = [
  { id: 1, bold: 'Service Update:', text: ' Online Birth Certificate Print Facility Added.', inlineTag: 'Update', tag: 'Update', color: 'green' },
  { id: 2, bold: 'Security:', text: ' OTP Sharing Strictly Not Allowed for Any CSC Services.', inlineTag: 'Security', tag: 'Security', color: 'orange' },
  { id: 3, bold: 'Notice:', text: ' Online PAN Card Correction Service Now Available.', inlineTag: 'Notice', tag: 'Notice', color: 'blue' },
  { id: 4, bold: 'CSC Camp:', text: ' Special Digital Seva Camp This Weekend at Center.', inlineTag: 'Update', tag: 'Update', color: 'green' },
  { id: 5, bold: 'New Service:', text: ' Online Land Records Portal Now Active.', inlineTag: 'Update', tag: 'Update', color: 'green' },
  { id: 6, bold: 'Alert:', text: ' Scheduled Maintenance on Oct 26th for PAN Portal.', inlineTag: 'Alert', tag: 'Alert', color: 'red' },
  { id: 7, bold: 'Important Notice:', text: ' Deadline for Scholarship Application Extended.', inlineTag: 'Notice', tag: 'Notice', color: 'blue' },
  { id: 8, bold: 'Security Tip:', text: ' Protect Your Digital Identity - 2FA Guide.', inlineTag: 'Security', tag: 'Security', color: 'orange' },
];

const NotificationsPanel = () => (
  <aside className="notif-panel">
    <div className="notif-panel__header">
      <div className="notif-panel__bell" aria-hidden="true">🔔</div>
      <h3 className="notif-panel__title">Latest Notifications</h3>
    </div>

    <ul className="notif-panel__list">
      {NOTIFICATIONS.map((n) => (
        <li className="notif-panel__item" key={n.id}>
          <div className="notif-panel__text">
            <strong>{n.bold}</strong>
            {n.text}
            <span className={`notif-panel__inline ${n.color}`}>
              &nbsp;({n.inlineTag})
            </span>
          </div>
          <div className="notif-panel__right">
            <span className={`notif-panel__tag notif-panel__tag--${n.color}`}>
              {n.tag}
            </span>
            <span className="notif-panel__arrow" aria-hidden="true">›</span>
          </div>
        </li>
      ))}
    </ul>
  </aside>
);

export default NotificationsPanel;
